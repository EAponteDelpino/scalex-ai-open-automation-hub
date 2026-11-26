# Payment verification flow: required backend design

The static UI deliberately shows **pending** only. Never infer payment success from a GHL funnel redirect, URL query parameter, WhatsApp photo, or manually entered transaction ID.

Secure architecture:
1. Your backend creates a checkout session through the **documented** provider API (not included here).
2. Customer completes payment on the provider's domain.
3. Provider sends a signed notification to your **server**; verify signature with a server-side secret **using that provider's current documentation**.
4. Query payment status from provider API if required, verify amount/currency/order ID, reject replay, use idempotency to prevent duplicate fulfillment.
5. Only then update order state and trigger an authenticated GHL workflow/API action to issue access.
6. Maintain audit logs without storing sensitive payment information.

**No provider-specific endpoint or signature method is asserted in this example.** You must implement and test the one documented for your provider.
