# Foundation Audit Checklist

Status: final cleanup before products.

## Locked decisions

- [x] SEAL is fully human-controlled.
- [x] AI suggests, drafts, routes, and warns only.
- [x] # is the internal identity and authority root.
- [x] DID, VC, ENS, HNS, OAuth, wallets, phone, email, SSO, and biometrics are external bindings only.
- [x] Every product must share identity, SEAL, proof, memory, ranking, Swirm, and integration rules.
- [x] Swirms are overlapping classifications and can form inter-Swirm teams.
- [x] Active integrations require health evidence and task receipts.
- [x] Raw secrets are forbidden in GitHub and chat.
- [x] Value movement and tokenization require SEAL 3+ and financial controls.

## Missing but not blocking product scoping

- [ ] Database migrations.
- [ ] API routes.
- [ ] Dashboard views.
- [ ] Provider health runners.
- [ ] Product registry UI.

## Blocking before production launch

- [ ] Human approval flow for SEAL 3+.
- [ ] Audit event storage.
- [ ] Proof receipt storage.
- [ ] Provider credential storage outside GitHub.
- [ ] Revocation path for identity, authority, credentials, and public proofs.
- [ ] Rollback path for workflows and deployments.

## Contradiction scan

No unresolved contradiction remains in the locked doctrine. Any future contradiction must be recorded as a foundation issue and resolved before it affects products.
