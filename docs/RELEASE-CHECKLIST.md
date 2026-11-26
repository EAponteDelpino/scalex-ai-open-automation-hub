# Release checklist / Lista de publicación

Version: **0.1.0-beta**. No live production claims.

## Completed
- [x] Public MIT-licensed repository
- [x] 30 sample n8n webhook flows
- [x] 10 prompt-only agent definitions
- [x] 15 GHL demonstration modules
- [x] Spanish and English documentation
- [x] Offline structural tests via GitHub Actions (passed on PR #1 as of 26 November 2026)
- [x] Corrected literal escaped JavaScript delimiters in ten GHL snippets
- [x] Removed real payment links, credentials and customer data from examples

## Not completed / Requires real environments
- [ ] Import the 30 n8n flows into a compatible n8n test instance and capture outcomes
- [ ] Validate GHL custom code blocks, forms, mobile layout and custom field mapping in a test subaccount
- [ ] Validate the external payment handoff using a sandbox provider
- [ ] Confirm payment status server-to-server before any enrollment is fulfilled
- [ ] Browser functional and accessibility tests beyond structural checks
- [ ] Human review of terms, consent, privacy and documentation
- [ ] Public release tag and changelog after functional checks

A successful structural test **does not establish compatibility with live n8n or GHL**.

## Contributor-friendly paths
- Translate technical docs precisely
- Improve reproducible examples and error messages
- Add browser unit tests for standalone UI
- Test real import behavior and document versions (using dummy data)
- Add reproducible bug reports with anonymized steps

Contributions must be genuine; no artificial PR activity, star exchanges or fake users.
