# WhatsApp AI Sales Framework

**Ten locally usable tools** for drafting, classifying and simulating WhatsApp customer journeys. This is **not a WhatsApp API integration, deployed AI agent, customer database, bulk messaging tool or automated sender**. It requires no credentials and makes no network requests except when a user independently opens the generated `wa.me` link.

## Start

Open [index.html](index.html) in a browser or visit this folder through GitHub Pages once deployed. Select a tool, edit the example data and run a demonstration. All data remains in browser memory, no local storage or telemetry.

## Ten tools

1. Conversation Builder: deterministic branching outline.
2. Lead Scoring: 45% intent, 35% budget match, 20% urgency; all **user-supplied**.
3. Sales Agent: fact-based sales **draft** with no LLM inference.
4. Objection Handler: guidance and editable scripts for five objection types.
5. Lead Recovery: consent-gated example message.
6. Follow-up Builder: opt-in follow-up draft; never auto-sends.
7. WhatsApp Link Generator: percent-encoded wa.me URL.
8. Message Template Builder: text draft needing approval where applicable.
9. Knowledge Base Builder: structured, explicitly sourced FAQ draft.
10. Sales Simulator: basic keyword routing; not an AI inference engine.

## Testing

Requires Node.js 18+; `cd whatsapp-framework && npm test`. No third-party libraries. Automated tests verify pure logic and negative consent cases, **not** real WhatsApp provider policy or browser integration.

## Safety constraints

- No unsolicited messages, mass outreach or auto-sending.
- The opt-in field is a **user-supplied example**, not proof of consent.
- Real outbound messages must obey current WhatsApp Business Platform policies, approved templates when required, service-window rules, opt-out signals and applicable privacy law.
- Production credentials must never be placed in a public website or repo.
- Never fabricate product information, success stories, urgency or discounts.
- No guarantee of platform acceptance, deliverability or conversion.

See [Spanish guide](docs/README.es.md), [English guide](docs/README.en.md), and [security guidance](docs/SECURITY.md).
