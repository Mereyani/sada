"""Smoke checks: python test_app.py  (no model download, no network)."""
import os
import tempfile
import threading
import time
import urllib.request
from http.server import ThreadingHTTPServer

import app


def req(port, path, method="GET", headers=None, host="127.0.0.1", body=None):
    r = urllib.request.Request(f"http://127.0.0.1:{port}{path}", method=method, data=body,
                               headers={"Host": f"{host}:{port}", **(headers or {})})
    try:
        with urllib.request.urlopen(r) as res:
            return res.status
    except urllib.error.HTTPError as e:
        return e.code


if __name__ == "__main__":
    assert app.recommend(32, False, 16) == "large-v3-turbo"
    assert app.recommend(8, False, 4) == "small"
    assert app.recommend(4, False, 4) == "base"
    assert app.recommend(2, False, 2) == "tiny"
    assert app.recommend(4, True, 4) == "large-v3-turbo"

    srv = ThreadingHTTPServer(("127.0.0.1", 0), app.Handler)
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
    print("ok")
