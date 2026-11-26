# ScaleX AI — GHL Developer Toolkit

[Español](docs/README.es.md) · [English](docs/README.en.md) · [Component catalog](docs/COMPONENTS.md) · [Security](docs/SECURITY.md)

A practical library of **15 configurable GoHighLevel (GHL) frontend and integration examples** for funnels, ecommerce lead capture, course enrollment, payment handoffs and attribution.

**Status: beta / examples.** This is **not an official HighLevel integration**, a verified Bold plugin, or a production-ready payment processing system. Examples run in a browser where noted. GHL field mapping, workflow triggers, API access and checkout settings vary by account and must be tested.

## Quick start

1. Create a test funnel page in HighLevel Sites → Funnels.
2. Add an **HTML / Custom Code** element and paste a chosen example's HTML. Include `assets/scalex.css` and `assets/scalex.js` or copy them into the page's custom CSS/JS areas. In the HighLevel editor, copy stylesheet and script contents inline if external hosting is not configured.
3. Replace every `example.com` URL, placeholder phone and demo plan with **your own test values**. Never commit a real private checkout URL, token or client data to this public repository.
4. Preview in mobile and desktop, then verify **all state changes, redirects and GHL workflow mappings** in a sandbox subaccount before publishing.
5. For GHL native forms, use documented form settings / automation actions. Custom HTML examples do not automatically create CRM contacts or native orders.

### Supported modules
- Pricing and checkout handoffs (no card data collection)
- Opt-in WhatsApp draft links, safe plan summaries and payment instructions
- Client-side validation, attribution and lightweight funnel UI
- Integration payload examples (webhook signatures and server-side verification guidelines)

See the [component catalog](docs/COMPONENTS.md) for install paths and known limitations.

### Payment integrity
**A screenshot or manually submitted transaction reference is not proof of payment.** Only a verified server-side confirmation from the payment provider can establish a successful payment before granting access. See [payment verification](checkout/payment-verification/README.md).

### Data privacy
Never expose private API keys, client identifiers, customer data, access tokens, or production webhook URLs in client-side scripts. Collect consent and follow local privacy law and GHL/Meta policies.

### License
MIT, as used by the parent repository. Not affiliated with or endorsed by HighLevel, Meta or Bold.
