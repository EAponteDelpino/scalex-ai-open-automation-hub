import json
import pathlib
import unittest

ROOT = pathlib.Path(__file__).resolve().parents[1]

class CatalogTests(unittest.TestCase):
    def test_30_workflows(self):
        files = sorted((ROOT / "workflows" / "n8n").glob("*.json"))
        self.assertEqual(len(files), 30)
        paths = []
        for file in files:
            data = json.loads(file.read_text(encoding="utf-8"))
            self.assertEqual(len(data["nodes"]), 3, file.name)
            self.assertEqual(len(data["connections"]["Webhook"]["main"][0]), 1)
            self.assertEqual(len(data["connections"]["Transform"]["main"][0]), 1)
            kinds = [n["type"] for n in data["nodes"]]
            self.assertEqual(kinds, ["n8n-nodes-base.webhook", "n8n-nodes-base.code", "n8n-nodes-base.respondToWebhook"])
            self.assertIn("return", data["nodes"][1]["parameters"]["jsCode"])
            paths.append(data["nodes"][0]["parameters"]["path"])
        self.assertEqual(len(paths), len(set(paths)))

    def test_10_agents(self):
        agents = list((ROOT / "agents").glob("*-agent.md"))
        agents += list((ROOT / "agents").glob("landing-page-reviewer.md"))
        self.assertEqual(len(agents), 10)
        for file in agents:
            content = file.read_text(encoding="utf-8")
            self.assertIn("## Guardrails", content)

if __name__ == "__main__":
    unittest.main()
