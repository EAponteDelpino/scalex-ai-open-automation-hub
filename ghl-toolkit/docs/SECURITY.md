# Security checklist for GHL funnel components

- [ ] No payment card numbers, CVVs, government IDs, real tokens or API secrets stored in HTML.
- [ ] Payment redirect destinations are HTTPS, preconfigured and allowlisted.
- [ ] Server-to-server payment notifications are verified with the payment provider, include replay protection and idempotency; access is granted only after verification.
- [ ] CRM webhooks use server-side authentication; never embed private webhook credentials in public page code.
- [ ] Contact and WhatsApp marketing consent is documented and revocable.
- [ ] Form input validation is repeated server-side; browser validation is only a convenience.
- [ ] Ads attribution respects user consent, data minimization and retention policy.
- [ ] Page tests cover accessibility, mobile layout, language/currency variations and error states.
- [ ] Social proof, timers and inventory statements are truthful and not artificially fabricated.
- [ ] Templates reviewed against the GHL editor and provider APIs currently in use.

**Disclaimer:** example code is provided 'as is' and has not been tested on a live HighLevel site.
