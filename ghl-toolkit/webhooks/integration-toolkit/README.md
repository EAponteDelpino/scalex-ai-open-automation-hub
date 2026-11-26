# GHL webhook integration toolkit (backend example)

**Not a GHL API client.** Includes a Python standard-library demo receiver that checks a locally configured HMAC signature over the exact raw body, for **your own sender** (for instance, a service you control). **Do not treat its header/signature algorithm as HighLevel's**, Meta's, n8n's, or Bold's: every provider defines its own authentication method. You must check the provider's current webhook signature docs and implement their scheme.

To run locally: set `SCALEX_WEBHOOK_SECRET` to a random secret, then run `python receiver.py`. POST to `http://127.0.0.1:8765/` with a hex SHA-256 HMAC in `X-ScaleX-Signature`. It outputs an acknowledgement only and does not store or forward data.

Example event payload (fictional):
```json
{"event":"lead.created","contact":{"email":"demo@example.com"},"source":"landing","consent":true}
```

**Production requirements:** TLS, sender-specific signature verification, timestamp + replay protection, idempotency, rate limiting, minimal logging, queueing/retries, consent checks, secure GHL API credentials and per-tenant isolation. Demo binds to localhost only.
