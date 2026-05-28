import subprocess
import sys
from pathlib import Path


DETACHED_PROCESS = 0x00000008
CREATE_NEW_PROCESS_GROUP = 0x00000200

ROOT = Path(__file__).resolve().parent
SERVER = ROOT / "serve_iphone.py"


def main() -> None:
    process = subprocess.Popen(
        [sys.executable, str(SERVER)],
        cwd=str(ROOT),
        creationflags=DETACHED_PROCESS | CREATE_NEW_PROCESS_GROUP,
        close_fds=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    print(process.pid)


if __name__ == "__main__":
    main()
