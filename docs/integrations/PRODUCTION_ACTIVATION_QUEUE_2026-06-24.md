# Production Integration Activation Queue

Source register: `docs/integrations/INTEGRATION_OPPORTUNITIES_2026-06-24.md`
Swirm classification: `docs/integrations/INTEGRATION_SWIRM_CLASSIFICATION_2026-06-24.json`

## Stage 1 — Foundation spine

Activate first because all products depend on them.

| Swirm | Providers | Target state | Evidence required |
|---|---|---|---|
| Infrastructure | GitHub, Vercel, Cloudflare, Docker, Sentry | connected | deployment check, CI check, error route |
| Data | Supabase, Postgres, Storage, Redis optional | connected | read/write test, RLS test, storage signed URL test |
| Identity | Supabase Auth, # table, roles/permissions | sandboxed → connected | create identity, role check, revocation test |
| Intelligence | OpenAI, Gemini, OpenRouter fallback | sandboxed | model route test, cost log, safe output test |
| Automation | n8n, GitHub Actions | connected | webhook receipt, job receipt, audit event |
| Proof | Supabase proofs, GitHub attestations, EAS test route | sandboxed | proof receipt generated and linked |

## Stage 2 — Product interface layer

| Swirm | Providers | Target state | Evidence required |
|---|---|---|---|
| Builder | Lovable, Base44, Appsmith, Directus | registry_ready/sandboxed | generated UI or dashboard route |
| Communication | Resend, Telegram, Matrix, LiveKit | sandboxed | internal-only notification receipt |
| Memory | Memorae, Supermemory, Zep/Graphiti, Qdrant | sandboxed | remember/recall test with value masking |
| Knowledge | LlamaIndex, Typesense, Neo4j | sandboxed | retrieval with source proof |
| Agent | LangGraph, CrewAI, MCP Gateway | sandboxed | tool-call receipt with allowlist |

## Stage 3 — Controlled expansion

| Swirm | Providers | Gate |
|---|---|---|
| Value | Paystack, Monnify, Flutterwave, Stripe, Safe, Thirdweb | SEAL 3, sandbox first, no fund movement without human approval |
| Hardware / Reality | MQTT, ODK, KoboToolbox, Home Assistant, ESP32 | SEAL 3 for field/private data |

## Immediate next actions

1. Create provider registry table/migration.
2. Add `/api/swarm/providers`.
3. Add `/api/swarm/health`.
4. Add `/api/swarm/ingest`.
5. Add `/api/swarm/actual-call`.
6. Add dashboard cards for Swirm readiness.
7. Connect first product, BUNK, to the Swirm router.

## Do not count as active

Do not count any integration as active only because it appears in a list, has a GitHub repo, has a setup link, or has a placeholder env variable. Active requires proof.
