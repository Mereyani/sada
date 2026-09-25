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


def main():
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        port = s.getsockname()[1]
    hf_home = tempfile.mkdtemp(prefix="sada-smoke-hf-")
    env = {**os.environ, "SADA_PORT": str(port), "HF_HOME": hf_home}
    proc = subprocess.Popen([BIN, "--headless"], env=env)
    try:
        for _ in range(120):
            try:
                info = call(port, "/api/info")
                break
            except OSError:
                time.sleep(0.5)
        else:
            raise AssertionError("app did not start")
        # the UI files are bundled and served (index + the model dropdown, styles, script)
        page = urllib.request.urlopen(f"http://127.0.0.1:{port}/", timeout=10).read().decode()
        assert '<select id="model"' in page and "app.js" in page, "UI not bundled"
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

        job = call(port, "/api/jobs/file?name=sample.wav&model=base", "POST", sample)
        wait_job(port, job["id"], lambda j: j["stage"] == "fetch", 120)
        call(port, f"/api/jobs/{job['id']}/cancel", "POST")
        t0 = time.time()
        job, _ = wait_job(port, job["id"], lambda j: j["status"] != "running", 15)
        print(f"stop during model download: {job['status']} after {time.time() - t0:.1f}s")
        assert job["status"] == "cancelled"
        base = next(m for m in call(port, "/api/info")["models"] if m["id"] == "base")
        assert not base["cached"]

        call(port, "/api/models/tiny/delete", "POST")
        tiny = next(m for m in call(port, "/api/info")["models"] if m["id"] == "tiny")
        assert not tiny["cached"] and tiny["disk_mb"] == 0, tiny
        print("smoke ok")
    finally:
        proc.terminate()
        proc.wait(10)


if __name__ == "__main__":
    main()
