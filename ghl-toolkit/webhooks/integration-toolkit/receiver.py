"""Educational receiver for messages signed by a sender YOU CONTROL.
This is NOT a HighLevel, Bold or Meta signature implementation.
"""
import hashlib
import hmac
import json
import os
from http.server import BaseHTTPRequestHandler, HTTPServer

MAX_BODY = 16 * 1024


def valid_signature(payload: bytes, supplied: str, secret: str) -> bool:
    if not secret or not isinstance(supplied, str) or len(supplied) != 64:
        return False
    expected = hmac.new(secret.encode("utf-8"), payload, hashlib.sha256).hexdigest()
    return hmac.compare_digest(supplied.lower(), expected)


class Handler(BaseHTTPRequestHandler):
    def do_POST(self):
        secret = os.environ.get("SCALEX_WEBHOOK_SECRET", "")
        length_raw = self.headers.get("Content-Length", "")
        try:
            size = int(length_raw)
        except ValueError:
            self.send_error(411, "Content-Length required")
            return
        if size <= 0 or size > MAX_BODY:
            self.send_error(413, "Invalid request size")
            return
        payload = self.rfile.read(size)
        signature = self.headers.get("X-ScaleX-Signature", "")
        if not valid_signature(payload, signature, secret):
            self.send_error(401, "Invalid signature")
            return
        try:
            obj = json.loads(payload)
            if not isinstance(obj, dict):
                raise ValueError("Expected JSON object")
        except (ValueError, UnicodeDecodeError):
            self.send_error(400, "Invalid JSON object")
            return
        response = json.dumps({"accepted": True, "processed": False}).encode()
        self.send_response(202)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(response)))
        self.end_headers()
        self.wfile.write(response)


if __name__ == "__main__":
    if not os.environ.get("SCALEX_WEBHOOK_SECRET"):
        raise SystemExit("Set SCALEX_WEBHOOK_SECRET; never use an empty secret")
    print("Educational receiver on http://127.0.0.1:8765 (local only)")
    HTTPServer(("127.0.0.1", 8765), Handler).serve_forever()
