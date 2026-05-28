from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path


HOST = "0.0.0.0"
PORT = 8091
ROOT = Path(__file__).resolve().parent


class QuietHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)


def main() -> None:
    server = ThreadingHTTPServer((HOST, PORT), QuietHandler)
    print(f"Serving PepsiCo route prototype at http://0.0.0.0:{PORT}")
    print("Use your computer's Wi-Fi IP address from an iPhone on the same network.")
    server.serve_forever()


if __name__ == "__main__":
    main()
