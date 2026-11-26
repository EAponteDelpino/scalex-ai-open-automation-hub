"""Offline tests: receiver signature helper; not a live GHL test."""
import importlib.util
import pathlib
import hashlib
import hmac
import unittest

TARGET = pathlib.Path(__file__).parents[1] / "webhooks" / "integration-toolkit" / "receiver.py"
spec = importlib.util.spec_from_file_location("scalex_receiver", TARGET)
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class WebhookTests(unittest.TestCase):
    def test_valid_signature(self):
        b = b'{"event":"test"}'
        secret = "local-testing-secret"
        signature = hmac.new(secret.encode(), b, hashlib.sha256).hexdigest()
        self.assertTrue(module.valid_signature(b, signature, secret))
        self.assertFalse(module.valid_signature(b + b" ", signature, secret))
        self.assertFalse(module.valid_signature(b, signature, ""))

    def test_reject_malformed(self):
        self.assertFalse(module.valid_signature(b"abc", "bad", "secret"))


if __name__ == "__main__":
    unittest.main()
