# Provider Lifecycle and Health Contract

Status: active control standard for ABBA MAS / Carbon Actual integrations.

## Lifecycle states

1. `candidate` — discovered but not reviewed.
2. `scouted` — lawful/relevant route identified.
3. `registry_ready` — setup links, function, risk, SEAL and secret names recorded.
4. `credentials_pending` — provider needs API key/OAuth/service account entered outside GitHub.
5. `sandboxed` — tested in safe/local/dev mode.
6. `connected` — authenticated connection exists.
7. `pilot_active` — controlled external use with limited scope.
8. `production_active` — live provider with health evidence, audit receipt, rollback/revocation route.
9. `strengthened` — monitored, hardened, documented.
10. `core` — strategic infrastructure dependency.
11. `paused` — intentionally stopped.
12. `blocked` — cannot be used until risk/compliance is resolved.
13. `retired` — no longer used.

## Production-active requirements

A provider can only be counted as `production_active` when all are true:

- credentials stored outside GitHub/chat
- health check passed
- successful task receipt exists
- audit event recorded
- SEAL level satisfied
- rate limit known
- webhook signature or auth verified where relevant
- rollback or revocation route documented
- owner/contact known
- cost exposure understood

## Health evidence object

```json
{
  "provider_key": "supabase",
  "swirms": ["data_swirm", "identity_swirm"],
  "status": "connected",
  "checked_at": "ISO-8601",
  "environment": "development|staging|production",
  "health_result": "pass|warn|fail|unknown",
  "task_receipt": "reference-or-url",
  "audit_event_id": "uuid-or-reference",
  "seal_level": "SEAL_0|SEAL_1|SEAL_2|SEAL_3|SEAL_4",
  "missing_items": [],
  "risk_notes": [],
  "next_action": "text"
}
```

## Secret handling

Allowed in repo:
- secret variable names
- setup links
- provider docs
- environment template keys

Forbidden in repo/chat:
- API key values
- OAuth client secrets
- private keys
- passwords
- webhook signing secrets
- database service-role values
- wallet private keys

## SEAL rule

AI may recommend state changes, but cannot approve a provider as production-active. Human approval is required for SEAL 3+ integrations.
