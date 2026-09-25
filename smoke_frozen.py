"""End-to-end check of the *built* app, run in CI on every OS:  python smoke_frozen.py

Starts dist/Sada headless with an empty model cache (a first run on a fresh machine), then:
real transcription with a first-time model download, Stop during a download, model delete,
and the RAM/thread readout cross-checked against psutil.
"""
import json
import os
import socket
import subprocess
import sys
import tempfile
import time
import urllib.request
from pathlib import Path

BIN = {"darwin": "dist/Sada.app/Contents/MacOS/Sada", "win32": "dist/Sada/Sada.exe"}.get(sys.platform, "dist/Sada/Sada")


def call(port, path, method="GET", body=None):
    r = urllib.request.Request(f"http://127.0.0.1:{port}{path}", data=body, method=method, headers={"X-Sada": "1"})
    with urllib.request.urlopen(r, timeout=30) as res:
        return json.loads(res.read())


def wait_job(port, jid, until, timeout):
    stages, end = set(), time.time() + timeout
    while time.time() < end:
        j = call(port, f"/api/jobs/{jid}")
        stages.add(j["stage"])
        if until(j):
            return j, stages
        time.sleep(0.3)
    raise AssertionError(f"timeout, last state: {j}")


def wait_up(port):
    for _ in range(120):
        try:
            return call(port, "/api/info")
        except OSError:
            time.sleep(0.5)
    raise AssertionError("app did not start")


def main():
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        port = s.getsockname()[1]
    hf_home = tempfile.mkdtemp(prefix="sada-smoke-hf-")
    data = tempfile.mkdtemp(prefix="sada-smoke-data-")
    env = {**os.environ, "SADA_PORT": str(port), "HF_HOME": hf_home, "SADA_DATA": data}
    proc = subprocess.Popen([BIN, "--headless"], env=env)
    try:
        info = wait_up(port)
        # the UI files are bundled and served (index + the model dropdown, styles, script)
        page = urllib.request.urlopen(f"http://127.0.0.1:{port}/", timeout=10).read().decode()
        assert '<select id="model"' in page and "app.js" in page, "UI not bundled"
        assert 'id="task"' not in page, "translation option should be gone"
        for asset in ("app.js", "app.css", "logo.svg"):
            assert urllib.request.urlopen(f"http://127.0.0.1:{port}/{asset}", timeout=10).status == 200
        print("info:", info["ram_gb"], "GB,", info["threads"], "threads, gpu:", info["gpu"], "recommended:", info["recommended"])
        import psutil
        assert abs(psutil.virtual_memory().total / 2**30 - info["ram_gb"]) < 0.2, "RAM readout is wrong"
        assert info["threads"] == psutil.cpu_count(logical=True), "thread readout is wrong"
        assert not any(m["cached"] for m in info["models"]), "cache should start empty"

        sample = Path("tests/sample.wav").read_bytes()
        job = call(port, "/api/jobs/file?name=sample.wav&model=tiny", "POST", sample)
        assert job["fetch"] is True
        job, stages = wait_job(port, job["id"], lambda j: j["status"] in ("done", "error"), 600)
        text = " ".join(s["text"] for s in job["segments"]).lower()
        print("transcript:", text, "| language:", job["language"], "| stages:", sorted(stages))
        assert job["status"] == "done", job["error"]
        assert "fetch" in stages and "transcribe" in stages
        assert job["language"] == "en" and "test" in text and "computer" in text

        tiny = next(m for m in call(port, "/api/info")["models"] if m["id"] == "tiny")
        assert tiny["cached"] and tiny["disk_mb"] > 30, tiny

        # the finished transcript is in the history on disk, and an edit is saved
        for _ in range(20):
            hist = call(port, "/api/history")
            if hist:
                break
            time.sleep(0.2)
        assert [h["id"] for h in hist] == [job["id"]], hist
        texts = [seg["text"] for seg in job["segments"]]
        texts[0] = "Edited line."
        call(port, f"/api/history/{job['id']}", "POST", json.dumps({"texts": texts}).encode())
        saved = call(port, f"/api/history/{job['id']}")
        assert saved["segments"][0]["text"] == "Edited line." and saved["segments"][0]["start"] == job["segments"][0]["start"]
        assert (Path(data) / "history" / f"{job['id']}.json").is_file()
        call(port, "/api/settings", "POST", json.dumps({"sada.lang": "ar", "sada.model": "small"}).encode())
        assert json.loads((Path(data) / "settings.json").read_text(encoding="utf-8"))["sada.lang"] == "ar"
        print("history: saved, edited, on disk; settings saved")
        done_id = job["id"]

        job = call(port, "/api/jobs/file?name=sample.wav&model=base", "POST", sample)
        wait_job(port, job["id"], lambda j: j["stage"] == "fetch", 120)
        call(port, f"/api/jobs/{job['id']}/cancel", "POST")
        t0 = time.time()
        job, _ = wait_job(port, job["id"], lambda j: j["status"] != "running", 15)
        print(f"stop during model download: {job['status']} after {time.time() - t0:.1f}s")
        assert job["status"] == "cancelled"
        base = next(m for m in call(port, "/api/info")["models"] if m["id"] == "base")
        assert not base["cached"]

        call(port, f"/api/history/{done_id}/delete", "POST")
        left = call(port, "/api/history")
        assert left == [], left  # the stopped job had no text yet, so it was never saved
        assert not (Path(data) / "history" / f"{done_id}.json").exists()
        call(port, "/api/models/tiny/delete", "POST")
        tiny = next(m for m in call(port, "/api/info")["models"] if m["id"] == "tiny")
        assert not tiny["cached"] and tiny["disk_mb"] == 0, tiny
        # quit and relaunch: preferences survive a restart
        proc.terminate()
        proc.wait(10)
        proc = subprocess.Popen([BIN, "--headless"], env=env)
        wait_up(port)
        prefs = call(port, "/api/settings")
        assert prefs.get("sada.lang") == "ar" and prefs.get("sada.model") == "small", prefs
        print("settings survive a restart")
        print("smoke ok")
    finally:
        proc.terminate()
        proc.wait(10)


if __name__ == "__main__":
    main()
