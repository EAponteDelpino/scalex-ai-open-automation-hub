"""Offline, structural checks. Run python -m unittest discover -s ghl-toolkit/tests -v."""
import pathlib
import unittest
import json

ROOT = pathlib.Path(__file__).resolve().parents[1]
MODULES = [
"checkout/dynamic-pricing-selector/index.html",
"checkout/multi-currency-checkout/index.html",
"checkout/payment-instructions/index.html",
"checkout/bold-payment-handoff/index.html",
"whatsapp/smart-button/index.html",
"forms/custom-fields-manager/index.html",
"tracking/lead-tracking/index.html",
"custom-code/responsive-pricing-cards/index.html",
"custom-code/faq-accordion/index.html",
"custom-code/countdown-timer/index.html",
"forms/course-registration/index.html",
"checkout/payment-verification/index.html",
"forms/custom-form-validation/index.html",
"funnels/basic-landing/index.html",
"webhooks/integration-toolkit/receiver.py",
]

class IntegrityTests(unittest.TestCase):
    def test_15_modules(self):
        self.assertEqual(len(MODULES), 15)
        for path in MODULES:
            with self.subTest(path=path):
                self.assertTrue((ROOT / path).is_file(), path)

    def test_html_basics(self):
        for path in MODULES:
            if path.endswith(".html"):
                html=(ROOT/path).read_text(encoding="utf-8")
                self.assertIn("<main", html)
                self.assertIn('lang="es"', html)

    def test_json_example(self):
        data=json.loads((ROOT/"examples/colombia-ecuador/sample-config.json").read_text(encoding="utf-8"))
        self.assertEqual(data["mode"],"demo-only")


if __name__ == "__main__":
    unittest.main()
