# Component catalog — 15 modules

| # | Module | What it actually does | File |
|---|---|---|---|
| 1 | Dynamic Pricing Selector | Browser-only plan selection and formatted total | [index.html](../checkout/dynamic-pricing-selector/index.html) |
| 2 | Multi-Currency Checkout | Switch currency and country-specific checkout URLs | [index.html](../checkout/multi-currency-checkout/index.html) |
| 3 | Payment Instructions | Accessible payment handoff confirmation dialog | [index.html](../checkout/payment-instructions/index.html) |
| 4 | Bold Payment Handoff | HTTPS redirect pattern to configured provider link; not an API integration | [index.html](../checkout/bold-payment-handoff/index.html) |
| 5 | WhatsApp Smart Button | Creates a prefilled wa.me link, never sends silently | [index.html](../whatsapp/smart-button/index.html) |
| 6 | Custom Fields Manager | Maps allowed form values to matching native GHL field inputs | [index.html](../forms/custom-fields-manager/index.html) |
| 7 | Lead Tracking | Reads UTM parameters into explicitly named hidden fields | [index.html](../tracking/lead-tracking/index.html) |
| 8 | Responsive Pricing Cards | Accessible pricing comparison cards | [index.html](../custom-code/responsive-pricing-cards/index.html) |
| 9 | FAQ Accordion | Native accessible details/summary controls | [index.html](../custom-code/faq-accordion/index.html) |
| 10 | Countdown Timer | Factual deadline countdown (no rolling fake scarcity) | [index.html](../custom-code/countdown-timer/index.html) |
| 11 | Course Registration | Client-side course picker / email validation; no CRM submission | [index.html](../forms/course-registration/index.html) |
| 12 | Payment Verification Flow | UI for **pending verification** and backend requirements, no false success | [index.html](../checkout/payment-verification/index.html) |
| 13 | Form Validation | Client-side validation patterns and error summary | [index.html](../forms/custom-form-validation/index.html) |
| 14 | Funnel Templates | Funnel section starter and single CTA layout | [index.html](../funnels/basic-landing/index.html) |
| 15 | Webhook Integration Toolkit | Example server-side signed webhook receiver and n8n payload mapping | [README.md](../webhooks/integration-toolkit/README.md) |

## Tested?
Source code and static markup can be inspected, and pure functions have offline tests. **No live GHL, Bold or WhatsApp end-to-end tests have been performed.** Browser and GHL editor behavior needs manual verification.
