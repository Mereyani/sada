"""Sada — local, offline speech-to-text.

A tiny localhost server (stdlib) + a native window (pywebview, falls back to the browser).
Links are fetched with yt-dlp, audio is transcribed on-device with faster-whisper.
"""
import json
import multiprocessing
import os
import queue
import shutil
import socket
import sys
import tempfile
import threading
import time
import uuid
import webbrowser
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from fnmatch import fnmatch
from pathlib import Path
from urllib.parse import parse_qs, urlparse

VERSION = "1.0.2"
WEB = Path(getattr(sys, "_MEIPASS", Path(__file__).parent)) / "web"
# Downloaded/uploaded media lives here only while a job runs. Named per process and created
# lazily, so child processes (model downloads) never create stray folders.
TMP = Path(tempfile.gettempdir()) / f"sada-{os.getpid()}"
STALE_AFTER = 6 * 3600  # leftovers of a crashed run older than this are removed at startup
# What faster-whisper downloads for a model (mirrors faster_whisper.utils.download_model).
MODEL_FILES = ["config.json", "preprocessor_config.json", "model.bin", "tokenizer.json", "vocabulary.*"]

# Disk sizes are the CTranslate2 checkpoints on Hugging Face; RAM is what int8 on CPU needs.
MODELS = [
    {"id": "tiny", "size_mb": 75, "ram_gb": 1, "quality": 1, "speed": 5},
    {"id": "base", "size_mb": 145, "ram_gb": 1, "quality": 2, "speed": 5},
    {"id": "small", "size_mb": 485, "ram_gb": 2, "quality": 3, "speed": 4},
    {"id": "large-v3-turbo", "size_mb": 1620, "ram_gb": 4, "quality": 4, "speed": 3},
    {"id": "large-v3", "size_mb": 3090, "ram_gb": 6, "quality": 5, "speed": 1},
]
MODEL_IDS = {m["id"] for m in MODELS}


def tmp():
    TMP.mkdir(parents=True, exist_ok=True)
    return TMP


def clean_stale_tmp(now=None):
    now = now or time.time()
    for d in Path(tempfile.gettempdir()).glob("sada-*"):
        try:
            if d != TMP and d.is_dir() and now - d.stat().st_mtime > STALE_AFTER:
                shutil.rmtree(d, ignore_errors=True)
        except OSError:
            pass


def total_ram_gb():
    try:
        if sys.platform == "win32":
            import ctypes

            class MS(ctypes.Structure):
                _fields_ = [("len", ctypes.c_ulong), ("load", ctypes.c_ulong)] + [
                    (n, ctypes.c_ulonglong)
                    for n in ("total", "avail", "tpage", "apage", "tvirt", "avirt", "aext")
                ]

            ms = MS(len=ctypes.sizeof(MS))
            ctypes.windll.kernel32.GlobalMemoryStatusEx(ctypes.byref(ms))
            return ms.total / 2**30
        return os.sysconf("SC_PHYS_PAGES") * os.sysconf("SC_PAGE_SIZE") / 2**30
    except (OSError, ValueError, AttributeError):
        return None  # unknown: the UI says so instead of showing a made-up number


def cuda_available():
    try:
        import ctranslate2

        return ctranslate2.get_cuda_device_count() > 0
    except Exception:
        return False


def recommend(ram, cuda, cores):
    ram = ram or 8
    if cuda or (ram >= 16 and cores >= 8):
        return "large-v3-turbo"
    if ram >= 8:
        return "small"
    return "base" if ram >= 4 else "tiny"


def is_cached(model_id):
    from faster_whisper.utils import download_model

    try:
        download_model(model_id, local_files_only=True)
        return True
    except Exception:
        return False


def repo_dir(model_id):
    from faster_whisper.utils import _MODELS
    from huggingface_hub.constants import HF_HUB_CACHE

    return Path(HF_HUB_CACHE) / ("models--" + _MODELS[model_id].replace("/", "--"))


def shared_refs():
    """How many model repos link to each blob in the Hugging Face shared store (Xet downloads
    keep the real file in hub/blobs/ and only a symlink inside the repo)."""
    from huggingface_hub.constants import HF_HUB_CACHE

    refs = {}
    for link in Path(HF_HUB_CACHE).glob("models--*/blobs/*"):
        if link.is_symlink():
            target = link.resolve()
            refs[target] = refs.get(target, 0) + 1
    return refs


def own_files(model_id, refs=None):
    """Files that belong to this model alone: exactly what deleting it removes and frees."""
    from huggingface_hub.constants import HF_HUB_CACHE

    refs = shared_refs() if refs is None else refs
    cache = Path(HF_HUB_CACHE).resolve()
    out = []
    for f in (repo_dir(model_id) / "blobs").glob("*"):
        if f.is_symlink():
            target = f.resolve()
            if target.is_file() and target.is_relative_to(cache) and refs.get(target) == 1:
                out.append(target)
        elif f.is_file():  # includes a partial .incomplete download
            out.append(f)
    return out


def disk_bytes(model_id, refs=None):
    return sum(f.stat().st_size for f in own_files(model_id, refs))


def system_info():
    from faster_whisper.tokenizer import _LANGUAGE_CODES

    ram, cuda, threads = total_ram_gb(), cuda_available(), os.cpu_count()
    refs = shared_refs()
    return {
        "version": VERSION,
        "ram_gb": round(ram, 1) if ram else None,
        "threads": threads,  # logical CPUs (hardware threads), as reported by the OS
        "gpu": cuda,
        "recommended": recommend(ram, cuda, threads or 4),
        "models": [{**m, "cached": is_cached(m["id"]), "disk_mb": round(disk_bytes(m["id"], refs) / 1e6)}
                   for m in MODELS],
        "languages": list(_LANGUAGE_CODES),
    }


# ---------------------------------------------------------------- jobs

class Cancelled(Exception):
    pass


jobs = {}
work = queue.Queue()
loaded = {"id": None, "model": None}


def _fetch(model_id):
    # Runs in a child process so Stop can end a multi-GB download immediately.
    os.environ["HF_HUB_DISABLE_XET"] = "1"  # plain HTTP: a growing .incomplete file we can measure
    from faster_whisper.utils import download_model

    download_model(model_id)


def fetch_model(job, model_id):
    if is_cached(model_id):
        return
    from faster_whisper.utils import _MODELS
    from huggingface_hub import HfApi

    job.update(stage="fetch", progress=0.0)
    try:
        info = HfApi().model_info(_MODELS[model_id], files_metadata=True)
        total = sum(f.size or 0 for f in info.siblings if any(fnmatch(f.rfilename, p) for p in MODEL_FILES))
    except Exception:
        total = 0  # progress stays indeterminate, the download itself still runs
    proc = multiprocessing.get_context("spawn").Process(target=_fetch, args=(model_id,), daemon=True)
    proc.start()
    while proc.is_alive():
        if job["cancel"]:
            proc.terminate()
            proc.join()
            raise Cancelled()
        if total:
            job["progress"] = min(0.99, disk_bytes(model_id) / total)
        proc.join(0.4)
    if proc.exitcode != 0 or not is_cached(model_id):
        raise RuntimeError("Could not download the model. Check your internet connection and try again.")


def delete_model(model_id):
    if any(j["model"] == model_id and j["status"] in ("queued", "running") for j in jobs.values()):
        raise ValueError("model is in use")
    if loaded["id"] == model_id:
        loaded.update(id=None, model=None)
    from huggingface_hub.constants import HF_HUB_CACHE

    for f in own_files(model_id):  # frees shared-store blobs no other model links to
        f.unlink(missing_ok=True)
    shutil.rmtree(repo_dir(model_id), ignore_errors=True)
    shutil.rmtree(Path(HF_HUB_CACHE) / ".locks" / repo_dir(model_id).name, ignore_errors=True)


def load_model(model_id):
    if loaded["id"] == model_id:
        return loaded["model"]
    from faster_whisper import WhisperModel

    loaded.update(id=None, model=None)  # free the old one before loading a new one
    model = None
    if cuda_available():
        try:
            model = WhisperModel(model_id, device="cuda", compute_type="float16")
        except Exception:  # missing cuBLAS/cuDNN etc. -> CPU
            model = None
    if model is None:
        model = WhisperModel(model_id, device="cpu", compute_type="int8",
                             cpu_threads=min(8, os.cpu_count() or 4))
    loaded.update(id=model_id, model=model)
    return model


def download(job):
    import yt_dlp

    def hook(d):
        if job["cancel"]:
            raise Cancelled()
        if d["status"] == "downloading":
            total = d.get("total_bytes") or d.get("total_bytes_estimate")
            if total:
                job["progress"] = min(0.99, d.get("downloaded_bytes", 0) / total)

    opts = {
        # a single audio stream when the site has one, otherwise the smallest full file;
        # never ask yt-dlp to merge, so no ffmpeg is needed (PyAV decodes everything).
        "format": "bestaudio/best[height<=480]/best",
        "outtmpl": str(tmp() / f"{job['id']}.%(ext)s"),
        "noplaylist": True,
        "quiet": True,
        "noprogress": True,
        "no_warnings": True,
        "progress_hooks": [hook],
    }
    with yt_dlp.YoutubeDL(opts) as ydl:
        info = ydl.extract_info(job["url"], download=True)
    job["title"] = info.get("title") or job["url"]
    return info["requested_downloads"][0]["filepath"]


def run(job):
    if job["url"]:
        job.update(stage="download", progress=0.0)
        try:
            job["file"] = download(job)
        except Exception:
            if job["cancel"]:
                raise Cancelled()
            raise
    fetch_model(job, job["model"])
    job.update(stage="model", progress=0.0)
    model = load_model(job["model"])
    if job["cancel"]:
        raise Cancelled()

    job.update(stage="transcribe", progress=0.0)
    segments, info = model.transcribe(
        job["file"],
        language=job["language"] or None,
        task=job["task"],
        beam_size=5,
        vad_filter=True,  # skips silence: faster and far fewer hallucinations
    )
    job.update(language=info.language, language_prob=round(info.language_probability, 3),
               duration=info.duration)
    for s in segments:
        if job["cancel"]:
            raise Cancelled()
        job["segments"].append({"start": round(s.start, 2), "end": round(s.end, 2),
                                "text": s.text.strip()})
        if info.duration:
            job["progress"] = min(0.999, s.end / info.duration)
    job.update(stage="done", progress=1.0, status="done")


def worker():
    while True:
        job = work.get()
        try:
            if job["cancel"]:
                raise Cancelled()
            job["status"] = "running"
            run(job)
        except Cancelled:
            job["status"] = "cancelled"
        except Exception as e:  # surfaced to the UI as-is
            job.update(status="error", error=str(e).strip() or type(e).__name__)
        finally:
            if job.get("file"):
                Path(job["file"]).unlink(missing_ok=True)


def new_job(opts, url=None, file=None, title=None):
    model = opts.get("model") or "small"
    if model not in MODEL_IDS:
        raise ValueError("unknown model")
    job = {
        "id": uuid.uuid4().hex[:12], "url": url, "file": file, "title": title or url,
        "model": model, "language": opts.get("language") or None,
        "task": "translate" if opts.get("task") == "translate" else "transcribe",
        "status": "queued", "stage": "queued", "progress": 0.0, "segments": [],
        "language_prob": None, "duration": None, "error": None, "cancel": False,
        "fetch": not is_cached(model),  # the model will be downloaded first
    }
    jobs[job["id"]] = job
    work.put(job)
    return job


def public(job, since=0):
    out = {k: v for k, v in job.items() if k not in ("file", "cancel", "segments")}
    out["stopping"] = job["cancel"] and job["status"] in ("queued", "running")
    out["segments"] = job["segments"][since:]
    out["total_segments"] = len(job["segments"])
    return out


# ---------------------------------------------------------------- http

class Handler(BaseHTTPRequestHandler):
    server_version = "Sada"

    def log_message(self, *a):
        pass

    def send(self, code, body, ctype="application/json; charset=utf-8"):
        data = body if isinstance(body, bytes) else json.dumps(body, ensure_ascii=False).encode()
        self.send_response(code)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(data)

    def guard(self):
        # Localhost only, and no DNS-rebinding hosts. Mutating calls need a custom header,
        # which a cross-site page can't send without a CORS preflight we never answer.
        host = (self.headers.get("Host") or "").rsplit(":", 1)[0]
        if host not in ("127.0.0.1", "localhost"):
            self.send(403, {"error": "forbidden"})
            return False
        if self.command == "POST" and self.headers.get("X-Sada") != "1":
            self.send(403, {"error": "forbidden"})
            return False
        return True

    def do_GET(self):
        if not self.guard():
            return
        u = urlparse(self.path)
        parts = u.path.strip("/").split("/")
        if u.path == "/api/info":
            return self.send(200, system_info())
        if len(parts) == 3 and parts[:2] == ["api", "jobs"]:
            job = jobs.get(parts[2])
            if not job:
                return self.send(404, {"error": "not found"})
            since = int(parse_qs(u.query).get("since", ["0"])[0] or 0)
            return self.send(200, public(job, since))
        name = u.path.lstrip("/") or "index.html"
        f = (WEB / name).resolve()
        if not f.is_relative_to(WEB.resolve()) or not f.is_file():
            return self.send(404, {"error": "not found"})
        types = {".html": "text/html", ".css": "text/css", ".js": "text/javascript",
                 ".svg": "image/svg+xml", ".png": "image/png"}
        self.send(200, f.read_bytes(), types.get(f.suffix, "application/octet-stream") + "; charset=utf-8")

    def do_POST(self):
        if not self.guard():
            return
        u = urlparse(self.path)
        opts = {k: v[0] for k, v in parse_qs(u.query).items()}
        parts = u.path.strip("/").split("/")
        try:
            length = int(self.headers.get("Content-Length") or 0)
            if u.path == "/api/jobs/url":
                body = json.loads(self.rfile.read(length) or b"{}")
                url = (body.get("url") or "").strip()
                if not url.startswith(("http://", "https://")):
                    return self.send(400, {"error": "invalid url"})
                return self.send(200, public(new_job(body, url=url)))
            if u.path == "/api/jobs/file":
                if length <= 0:
                    return self.send(400, {"error": "empty file"})
                name = Path(opts.get("name") or "audio").name
                dest = tmp() / f"{uuid.uuid4().hex}{Path(name).suffix[:10]}"
                with open(dest, "wb") as out:
                    left = length
                    while left:
                        chunk = self.rfile.read(min(1 << 20, left))
                        if not chunk:
                            break
                        out.write(chunk)
                        left -= len(chunk)
                return self.send(200, public(new_job(opts, file=str(dest), title=name)))
            if len(parts) == 4 and parts[:2] == ["api", "models"] and parts[3] == "delete":
                if parts[2] not in MODEL_IDS:
                    return self.send(404, {"error": "not found"})
                try:
                    delete_model(parts[2])
                except ValueError as e:
                    return self.send(409, {"error": str(e)})
                return self.send(200, {"ok": True})
            if len(parts) == 4 and parts[:2] == ["api", "jobs"] and parts[3] == "cancel":
                job = jobs.get(parts[2])
                if not job:
                    return self.send(404, {"error": "not found"})
                job["cancel"] = True
                return self.send(200, {"ok": True})
        except ValueError as e:
            return self.send(400, {"error": str(e)})
        self.send(404, {"error": "not found"})


class Api:
    """Exposed to JS inside the native window (window.pywebview.api)."""

    def save(self, filename, content):
        import webview

        path = webview.windows[0].create_file_dialog(webview.SAVE_DIALOG, save_filename=filename)
        if not path:
            return False
        Path(path if isinstance(path, str) else path[0]).write_text(content, encoding="utf-8")
        return True


def free_port():
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


def main():
    # Windowed builds have no console: give libraries (tqdm, yt-dlp) somewhere harmless to write.
    sys.stdout = sys.stdout or open(os.devnull, "w")
    sys.stderr = sys.stderr or open(os.devnull, "w")
    clean_stale_tmp()
    port = int(os.environ.get("SADA_PORT") or free_port())
    server = ThreadingHTTPServer(("127.0.0.1", port), Handler)
    threading.Thread(target=worker, daemon=True).start()
    threading.Thread(target=server.serve_forever, daemon=True).start()
    url = f"http://127.0.0.1:{port}/"
    try:
        if "--browser" in sys.argv or "--headless" in sys.argv:
            raise RuntimeError("no window requested")
        import webview

        webview.create_window("Sada — صدى", url, width=1180, height=800, min_size=(760, 560),
                              js_api=Api(), background_color="#0d1017")
        webview.start()
    except Exception as e:  # no native webview (e.g. Linux without GTK/Qt) -> browser
        print(f"Sada running at {url}  ({e})")
        if "--headless" not in sys.argv:
            webbrowser.open(url)
        try:
            threading.Event().wait()
        except KeyboardInterrupt:
            pass
    finally:
        shutil.rmtree(TMP, ignore_errors=True)


if __name__ == "__main__":
    import multiprocessing

    multiprocessing.freeze_support()  # frozen builds: child processes must not re-run main()
    main()
