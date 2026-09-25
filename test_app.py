"""Smoke checks: python test_app.py  (no model download, no network)."""
import threading
import urllib.request
from http.server import ThreadingHTTPServer

import app


def req(port, path, method="GET", headers=None, host="127.0.0.1"):
    r = urllib.request.Request(f"http://127.0.0.1:{port}{path}", method=method,
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
    print("ok")
