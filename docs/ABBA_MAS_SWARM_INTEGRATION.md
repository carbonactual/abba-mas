# ABBA MAS Swarm Integration

This document is the source-of-truth for the ABBA MAS swarm layer.

## Core law

Memory remembers. ABBA resolves. SEAL permits. Actual reveals value.

Everything entering the swarm is minted and tokenized as a reference. Memory providers store masked summaries, source pointers, mint IDs, token references, proof references, SEAL level, and route status. Memory providers do not store or reveal true value.

True value is only called, resolved, priced, routed, settled, or activated in Actual.

## Swarm architecture

```text
Continuum Capture
→ HAPI Root
→ ABBA Memory API
→ Temporal Index
→ Curation
→ ABBA Resolution
→ SEAL Approval
→ Actual Value Call
→ I/O / Vault / ATLAS / Product Route
→ Continuum Return
```

## Provider roles

### HAPI Root

- Memorae.ai
- Personal AI

Role: human memory root, relationship continuity, masked HAPI memory, mint/token/proof references.

### ABBA Memory API

- Supermemory
- Mem0
- Letta

Role: agent memory, retrieval, stateful ABBA recall, workflow memory.

### Temporal Index

- Zep
- Graphiti

Role: temporal facts, provenance, relationship changes, source trails, event chronology.

### Curation and capture

- Tana
- Fabric
- Readwise Reader
- Heptabase
- mymind
- Obsidian
- Capacities
- Raindrop.io
- Recall.ai
- Fireflies.ai
- Plaud

Role: intake, research, meetings, notes, files, signals, tasks, decisions, and context curation.

### ATLAS

- OriginTrail DKG
- Fabric Publish
- Obsidian Publish

Role: public knowledge surface and public proof graph after SEAL approval.

### Actual proof and identity

- Ethereum Attestation Service
- Ceramic
- Veramo
- SpruceID

Role: proof references, attestations, decentralized identity, credentials, portable records, and Actual value-call evidence.

## Active files

- `data/abba-swarm-providers.json`
- `app/api/swarm/providers/route.ts`
- `app/api/swarm/ingest/route.ts`
- `app/api/swarm/actual-call/route.ts`
- `supabase/migrations/001_abba_mas_swarm.sql`
- `docs/n8n/ABBA_MAS_SWARM_INTAKE_ROUTER.json`
- `tests/fixtures/swarm/founder-memory-test.json`

## API routes

### `GET /api/swarm/providers`

Returns provider registry, layers, route types, risk levels, SEAL levels, setup links, and credential presence booleans. It never returns raw credential values.

### `POST /api/swarm/ingest`

Accepts masked memory events only. It rejects payloads containing value or secret fields such as `actual_value`, `true_value`, `private_key`, `api_key`, or `secret`.

Required fields:

```json
{
  "source_provider": "memorae",
  "source_layer": "hapi_root",
  "event_type": "founder_memory_test",
  "summary": "Masked approved memory summary.",
  "seal_level": "SEAL-3"
}
```

### `POST /api/swarm/actual-call`

Accepts a request for value reveal status only. It requires SEAL approval and ABBA resolution. It does not return true value.

Required gates:

```json
{
  "seal_status": "approved",
  "seal_approval_id": "seal_approval_reference",
  "resolved_by": "ABBA"
}
```

## Supabase tables

- `swarm_providers`
- `swarm_events`
- `swarm_seal_approvals`
- `swarm_actual_calls`
- `swarm_proof_refs`

RLS is enabled. No public policies are created in the first migration. Server routes use service-role access only.

## Environment variable names

Only names belong in code/docs. Raw values belong only in Vercel, GitHub Secrets, n8n credentials, or provider dashboards.

```text
ABBA_SWARM_WEBHOOK_SECRET
ABBA_SWARM_INGEST_URL
ABBA_SWARM_ACTUAL_CALL_URL
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
MEMORAE_ACCOUNT_ID
MEMORAE_WORKSPACE_ID
MEMORAE_API_TOKEN_IF_ISSUED
MEMORAE_WEBHOOK_SECRET_IF_ISSUED
PERSONAL_AI_API_KEY
PERSONAL_AI_PERSONA_ID
SUPERMEMORY_API_KEY
SUPERMEMORY_PROJECT_ID
ZEP_API_KEY
GRAPHITI_GRAPH_URL
GRAPHITI_DB_URL
MEM0_API_KEY
LETTA_API_KEY
TANA_API_KEY_IF_ISSUED
FABRIC_API_KEY_IF_ISSUED
READWISE_TOKEN
RAINDROP_API_TOKEN
RECALL_API_KEY
FIREFLIES_API_KEY
EAS_RPC_URL
EAS_SCHEMA_UID
CERAMIC_NODE_URL
VERAMO_DB_URL
SPRUCEID_API_KEY
```

## Activation sequence

1. Static provider registry.
2. `/api/swarm/providers`.
3. Supabase swarm tables.
4. `/api/swarm/ingest`.
5. `/api/swarm/actual-call`.
6. Dashboard cards.
7. n8n Swarm Intake Router.
8. Pilot with Memorae + Supermemory + Zep/Graphiti.
9. Add EAS testnet proof references.
10. Add ATLAS public proof only after SEAL approval.

## First safe pilot

Use `tests/fixtures/swarm/founder-memory-test.json` against `/api/swarm/ingest`.

The test event must not trigger Actual because `actual_call_required` is false.

## Hard boundaries

Do not store in memory providers:

- raw API keys
- private keys
- banking credentials
- unredacted BVN/NIN/passport files
- court-sensitive records
- health records
- minors' sensitive records
- Vault contracts
- true value
- liquidity value
- settlement value
- ownership value
- legal value
- financial value

## Final doctrine sentence

Memorae and the swarm remember masked reality. ABBA resolves meaning. SEAL permits action. Actual reveals value.
