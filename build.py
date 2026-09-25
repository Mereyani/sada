"""Build a standalone app for the current OS:  python build.py  ->  dist/Sada-<OS>-<arch>.zip"""
import platform
import shutil
import subprocess
import sys

import PyInstaller.__main__

PyInstaller.__main__.run([
    "app.py", "--noconfirm", "--windowed", "--name", "Sada",
    "--icon", "assets/icon.png", "--add-data", "web:web",
    "--collect-data", "faster_whisper", "--collect-all", "ctranslate2", "--collect-all", "onnxruntime",
    "--osx-bundle-identifier", "io.github.mereyani.sada",
])

os_name = {"darwin": "macOS", "win32": "Windows"}.get(sys.platform, "Linux")
arch = {"x86_64": "x64", "amd64": "x64", "aarch64": "arm64"}.get(platform.machine().lower(), platform.machine().lower())
out = f"dist/Sada-{os_name}-{arch}"
if sys.platform == "darwin":  # ditto keeps the .app's symlinks and permissions
    subprocess.run(["ditto", "-c", "-k", "--keepParent", "dist/Sada.app", out + ".zip"], check=True)
else:
    shutil.make_archive(out, "zip", "dist", "Sada")
print("built", out + ".zip")
