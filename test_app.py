"""Smoke checks: python test_app.py  (no model download, no network)."""
import json
import os
import tempfile
import threading
import time
import urllib.request

import app


def req(port, path, method="GET", headers=None, host="127.0.0.1", body=None):
    r = urllib.request.Request(f"http://127.0.0.1:{port}{path}", method=method, data=body,
                               headers={"Host": f"{host}:{port}", **(headers or {})})
    try:
        with urllib.request.urlopen(r) as res:
            return res.status
    except urllib.error.HTTPError as e:
        return e.code


def get(port, path):
    r = urllib.request.Request(f"http://127.0.0.1:{port}{path}", headers={"Host": f"127.0.0.1:{port}"})
    with urllib.request.urlopen(r) as res:
        return res.read()


if __name__ == "__main__":
    assert app.recommend(32, False, 16) == "large-v3-turbo"
    assert app.recommend(8, False, 4) == "small"
    assert app.recommend(4, False, 4) == "base"
    assert app.recommend(2, False, 2) == "tiny"
    assert app.recommend(4, True, 4) == "large-v3-turbo"

    srv = app.Server(("127.0.0.1", 0), app.Handler)  # the real server class, backlog included
    port = srv.server_address[1]
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    assert req(port, "/") == 200
    assert req(port, "/api/info") == 200
    assert req(port, "/../app.py") == 404                          # no path traversal
    assert req(port, "/", host="evil.example") == 403              # DNS rebinding
    assert req(port, "/api/jobs/url", "POST") == 403               # cross-site POST without header
    assert req(port, "/api/jobs/file", "POST", {"X-Sada": "1"}) == 400  # empty upload
    assert req(port, "/api/models/nope/delete", "POST", {"X-Sada": "1"}) == 404
    assert req(port, "/api/models/tiny/delete", "POST") == 403    # needs the header too

    info = app.system_info()  # the device line must come from the OS, never a default
    assert info["ram_gb"] and info["ram_gb"] > 0.5 and info["threads"] == os.cpu_count()

    # a model in use can't be deleted
    app.jobs["x"] = {"model": "tiny", "status": "running"}
    assert req(port, "/api/models/tiny/delete", "POST", {"X-Sada": "1"}) == 409
    del app.jobs["x"]

    # stale temp folders from a crashed run are removed, recent ones and our own are kept
    base = tempfile.gettempdir()
    old, fresh = os.path.join(base, "sada-test-old"), os.path.join(base, "sada-test-fresh")
    for d in (old, fresh):
        os.makedirs(d, exist_ok=True)
    past = time.time() - app.STALE_AFTER - 60
    os.utime(old, (past, past))
    app.tmp()
    app.clean_stale_tmp()
    assert not os.path.exists(old) and os.path.exists(fresh) and app.TMP.exists()
    os.rmdir(fresh)
    os.rmdir(app.TMP)

    # deleting a model frees its real files, including a Xet shared-store blob only it uses,
    # and never a blob another model still links to
    import huggingface_hub.constants as hfc
    real_cache, hfc.HF_HUB_CACHE = hfc.HF_HUB_CACHE, tempfile.mkdtemp()
    try:
        cache = hfc.HF_HUB_CACHE
        def blob(model, name, data=None, link=None):
            d = app.repo_dir(model) / "blobs"
            d.mkdir(parents=True, exist_ok=True)
            if link:
                os.symlink(link, d / name)
            else:
                (d / name).write_bytes(data)
        shared = os.path.join(cache, "blobs", "ab")
        os.makedirs(shared)
        only, both = os.path.join(shared, "only"), os.path.join(shared, "both")
        open(only, "wb").write(b"x" * 3000)
        open(both, "wb").write(b"y" * 5000)
        blob("tiny", "a", b"z" * 100)
        blob("tiny", "b", link=only)
        blob("tiny", "c", link=both)
        blob("base", "c", link=both)
        assert app.disk_bytes("tiny") == 3100 and app.disk_bytes("base") == 0
        app.delete_model("tiny")
        assert not os.path.exists(only) and os.path.exists(both) and not app.repo_dir("tiny").exists()
        assert app.disk_bytes("base") == 5000  # now the only owner
    finally:
        hfc.HF_HUB_CACHE = real_cache

    # history: saved to disk when a job ends, listed newest first, words editable, timestamps not
    os.environ["SADA_DATA"] = tempfile.mkdtemp()
    job = {"id": "a1b2c3d4e5f6", "title": "clip", "url": None, "model": "small", "language": "ar",
           "language_prob": 0.99, "duration": 4.0, "status": "done",
           "segments": [{"start": 0.0, "end": 2.0, "text": "مرحبا"}, {"start": 2.0, "end": 4.0, "text": "<b>x</b>"}]}
    app.save_history(job)
    listed = json.loads(get(port, "/api/history"))
    assert [h["id"] for h in listed] == ["a1b2c3d4e5f6"] and listed[0]["words"] == 2 and not listed[0]["partial"]
    edit = json.dumps({"texts": ["مرحباً بكم", "<b>x</b>"]}).encode()
    assert req(port, "/api/history/a1b2c3d4e5f6", "POST", {"X-Sada": "1"}, body=edit) == 200
    h = json.loads(get(port, "/api/history/a1b2c3d4e5f6"))
    assert h["segments"][0] == {"start": 0.0, "end": 2.0, "text": "مرحباً بكم"} and h["edited"]
    wrong = json.dumps({"texts": ["only one"]}).encode()
    assert req(port, "/api/history/a1b2c3d4e5f6", "POST", {"X-Sada": "1"}, body=wrong) == 400
    assert req(port, "/api/history/..%2F..%2Fx", "GET") == 404            # ids are validated
    assert req(port, "/api/history/000000000000", "POST", {"X-Sada": "1"}, body=edit) == 404
    assert req(port, "/api/history/a1b2c3d4e5f6/delete", "POST") == 403  # needs the header
    assert req(port, "/api/history/a1b2c3d4e5f6/delete", "POST", {"X-Sada": "1"}) == 200
    assert json.loads(get(port, "/api/history")) == []

    # preferences persist on disk; unknown keys and odd values are ignored
    body = json.dumps({"sada.lang": "tr", "sada.theme": "dark", "evil": "x", "sada.model": 5}).encode()
    assert req(port, "/api/settings", "POST", {"X-Sada": "1"}, body=body) == 200
    assert json.loads(get(port, "/api/settings")) == {"sada.lang": "tr", "sada.theme": "dark"}
    assert req(port, "/api/settings", "POST", {"X-Sada": "1"}, body=b"[1]") == 400

    # many saves at the same moment (the UI does this) must never corrupt the file or lose a key
    codes = []
    def hit(k, v):
        codes.append(req(port, "/api/settings", "POST", {"X-Sada": "1"}, body=json.dumps({k: v}).encode()))
    threads = [threading.Thread(target=hit, args=(k, f"{k}-{i}"))
               for i in range(20) for k in ("sada.lang", "sada.theme", "sada.model")]
    for th in threads:
        th.start()
    for th in threads:
        th.join()
    final = json.loads(get(port, "/api/settings"))  # raises if the file is corrupt
    assert codes.count(200) == 60 and set(final) == {"sada.lang", "sada.theme", "sada.model"}, (codes, final)
    assert not list((app.data_dir()).glob("*.tmp"))
    print("ok")
