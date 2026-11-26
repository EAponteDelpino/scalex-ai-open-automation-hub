# ScaleX AI Open Automation Hub

**Open-source business automation starter kit · Kit de automatización empresarial de código abierto**

[Español](docs/README.es.md) · [English](docs/README.en.md) · [GHL Developer Toolkit](ghl-toolkit/README.md) · [Security](SECURITY.md) · [Contributing](CONTRIBUTING.md)

A practical library of **30 importable n8n webhook workflows** and **10 configurable AI-agent role definitions**, focused on ecommerce, marketing, lead management, support and WhatsApp consent. Created by **ScaleX AI**.

> **Status: Starter / beta.** The 30 workflows are standalone, deterministic examples, **not** complete CRM or WhatsApp integrations. They do not send messages, charge customers, or call external APIs. The 10 agent files are prompt/configuration templates, **not** deployed agents. No production-readiness or Anthropic program eligibility is claimed.

## Quick start

1. Import any JSON under `workflows/n8n/` using n8n **Import from file**.
2. Open the Webhook node and enable the workflow in a development n8n instance.
3. POST JSON to its test webhook URL, for example `{"name":"Ana","email":"ANA@example.com","source":"instagram"}` for `lead-capture`.
4. Review the output and authentication, consent, privacy and data-retention needs before connecting to real services.

Each example has a Webhook → Code → Respond to Webhook chain. The Code node returns deterministic JSON. Paths are prefixed with `scalex-demo/`. Treat webhook URLs as public endpoints unless secured.

## Catalog

| Area | Examples |
| --- | --- |
| Leads and CRM | capture, qualification, routing, deduplication, follow-up planning |
| Ecommerce | abandoned carts, order summaries, inventory reorder flags |
| Marketing | UTM links, campaign metrics, landing-page checklists |
| WhatsApp | consent checks, template previews (**no outbound messages**) |
| Support | triage, urgency and FAQ lookups |

See [full catalog](docs/CATALOG.md), [AI agents](agents/README.md), and the [15-module GHL toolkit](ghl-toolkit/docs/COMPONENTS.md).

## Safety and privacy

- No secrets, access tokens, or production credentials are stored in this project.
- Sample data only. Use the minimum personal information required; redact logs; configure retention.
- For WhatsApp, use approved Meta APIs/templates where applicable and document lawful consent and opt-out handling before sending.
- Review individual node and n8n version compatibility before deployment.

## Testing

Run `python -m unittest discover -s tests -v` to check JSON structures, flow topology, unique paths, and the presence of all ten agent definitions. This **does not replace testing in a running n8n environment**.

## License

MIT — see [LICENSE](LICENSE). Contributions welcome; see [CONTRIBUTING.md](CONTRIBUTING.md).
