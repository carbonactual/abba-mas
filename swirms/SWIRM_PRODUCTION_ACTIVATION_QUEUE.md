# ABBA MAS Swirm Production Activation Queue

Status: activated in GitHub control layer.

## Active control files

1. `swirms/ABBA_SWIRM_ACTIVATION_MANIFEST_2026-06-23.json`
2. `swirms/SWIRM_COMMAND_ROUTER.json`
3. `swirms/SWIRM_PRODUCTION_ACTIVATION_QUEUE.md`

## Activation truth state

- GitHub control layer: active.
- Swirm definitions: active.
- Team templates: active.
- Command routing rules: active.
- SEAL gates: active.
- Provider credentials: pending per provider.
- Production health evidence: required before any provider is counted as production active.

## Priority 1: production spine

### Infrastructure Swirm
Minimum providers: GitHub, Vercel, Cloudflare, Docker, Sentry.
Status: connected partial.
Next evidence: deployment health, workflow check, error logging.

### Data Swirm
Minimum providers: Supabase/Postgres, Storage, audit_events, integration_routes.
Status: credentials pending / schema required.
Next evidence: successful database write and read.

### Intelligence Swirm
Minimum providers: OpenAI, Gemini, OpenRouter fallback, Ollama sandbox.
Status: credentials pending.
Next evidence: model route test with audit event.

### Agent Swirm
Minimum providers: LangGraph, OpenAI Agents SDK, allowlisted MCP Gateway.
Status: sandboxed.
Next evidence: successful tool call with approval gate.

### Automation Swirm
Minimum providers: GitHub Actions, n8n webhook, Supabase audit log.
Status: credentials pending.
Next evidence: n8n-to-GitHub or GitHub-to-Supabase route receipt.

### Proof Swirm
Minimum providers: GitHub artifact attestation, Supabase proofs, EAS off-chain test.
Status: registry ready.
Next evidence: proof receipt linked to action ID.

## Priority 2: ecosystem interface

### Identity Swirm
Minimum providers: Supabase Auth, internal # identity table, SEAL grants.
Status: registry ready.
Next evidence: identity create, consent state, revocation route.

### Memory Swirm
Minimum providers: Memorae route, Qdrant/pgvector, Graphiti pilot.
Status: registry ready.
Next evidence: remember and recall without exposing Actual value.

### Knowledge Swirm
Minimum providers: LlamaIndex, Qdrant, Typesense, GitHub docs index.
Status: registry ready.
Next evidence: doctrine retrieval with source proof.

### Communication Swirm
Minimum providers: Resend, Telegram, Matrix, LiveKit.
Status: credentials pending.
Next evidence: internal notification only. External send requires SEAL 3.

### Builder Swirm
Minimum providers: Lovable, Base44, Appsmith, Directus.
Status: registry ready.
Next evidence: app/dashboard generated or updated from command.

## Priority 3: controlled expansion

### Value Swirm
Minimum providers: ledger schema, Paystack/Stripe sandbox, reconciliation proof.
Status: blocked until controls.
Next evidence: sandbox payment flow only.

### Hardware / Reality Swirm
Minimum providers: MQTT sandbox, ODK/Kobo pilot, device # registry.
Status: registry ready.
Next evidence: device or form event logged to proof queue.

## Production rule

A Swirm becomes `production_active` only when it has:

1. At least one provider connected.
2. Required secrets stored outside GitHub.
3. Health check passed.
4. Successful task receipt.
5. Audit event recorded.
6. SEAL level satisfied.
7. Rollback or revocation path documented.
