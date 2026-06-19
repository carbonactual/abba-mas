# Integration Scout Update — 2026-06-19

Purpose: add lawful, low-hassle integration opportunities for ABBA MAS and Carbon Actual without recording raw secrets. Only secret variable names and setup links are listed.

## Classification key

- Route type: API, SDK, webhook, workflow, cloud, identity, proof, communication, no-code, low-code, open-source, hardware/software bridge.
- Function classification: PULSE intake, pledge/commitment, tokenization, ledger/proof, Actual reveal, AI agent, group/entity AI, communication, admin dashboard, automation, customer support, hardware bridge.
- Risk level: Low, Medium, High.
- SEAL level: SEAL-1 public, SEAL-2 authenticated, SEAL-3 sensitive workflow, SEAL-4 proof/ledger, SEAL-5 identity/financial/critical control.

---

## 1. LiveKit Agents

- Setup link: https://docs.livekit.io/agents/
- GitHub/source link: https://github.com/livekit/agents
- Route type: SDK, realtime agent framework, WebRTC, telephony, voice/video agent, open-source.
- Function classification: AI call-center agent, group/entity AI voice route, field support, onboarding voice assistant, customer support, realtime translation, remote advisory, physical AI route.
- Access method: Python or Node.js SDK; LiveKit Cloud; self-hosted LiveKit server; WebRTC; SIP/telephony routes.
- Secret names only: LIVEKIT_API_KEY, LIVEKIT_API_SECRET, LIVEKIT_URL, OPENAI_API_KEY or chosen model provider key.
- Cost/free-tier notes: Cloud path is low-hassle; self-hosted path can reduce platform lock-in but requires server operations. Confirm current cloud pricing before production.
- Risk level: Medium.
- SEAL level: SEAL-3 for general support; SEAL-5 if handling identity, financial, medical, or legal calls.
- Recommended activation path: Build `ABBA Voice Intake Agent` first. Route calls to `/api/pulse/release`, `/api/pledge/release`, and `/api/ledger/write`. Add consent prompt, recording policy, transcript redaction, and human escalation before production.

## 2. Appsmith

- Setup link: https://docs.appsmith.com/getting-started/setup/installation-guides/docker
- GitHub/source link: https://github.com/appsmithorg/appsmith
- Route type: open-source low-code builder, internal dashboard, workflow/admin UI.
- Function classification: founder/admin console, PULSE review desk, ledger moderation dashboard, entity onboarding panel, vendor management, support operations.
- Access method: Docker Compose, Kubernetes, AWS, Azure, Google Cloud Run, DigitalOcean, REST/GraphQL/Postgres connections.
- Secret names only: APPSMITH_ENCRYPTION_PASSWORD, APPSMITH_ENCRYPTION_SALT, SUPABASE_SERVICE_ROLE_KEY, DATABASE_URL, SMTP_PASSWORD.
- Cost/free-tier notes: Self-hosted community/commercial free plan available; infrastructure cost depends on VPS/cloud. Docker docs note all-in-one deployment should plan for at least 8 GB RAM.
- Risk level: Medium.
- SEAL level: SEAL-3; SEAL-4 if directly connected to token ledger/proof tables.
- Recommended activation path: Deploy a private admin console for PULSE review, Actual reveal approvals, SEAL audit views, and integration switchboard. Do not expose public write access.

## 3. n8n self-hosted workflow automation

- Setup link: https://docs.n8n.io/hosting/
- Security note source: https://github.com/n8n-io/n8n/security/advisories
- Route type: workflow automation, webhook receiver, API orchestrator, open-source/self-hosted option.
- Function classification: webhook router, CRM sync, PULSE trigger, email/SMS automations, vendor workflows, proof notification, daily scout jobs.
- Access method: Docker, npm, cloud, webhook URLs, credentials vault, REST connectors.
- Secret names only: N8N_ENCRYPTION_KEY, N8N_BASIC_AUTH_PASSWORD, SUPABASE_SERVICE_ROLE_KEY, GITHUB_TOKEN, PAYSTACK_SECRET_KEY, STRIPE_SECRET_KEY.
- Cost/free-tier notes: Self-host path can be low-cost on VPS; managed n8n has paid plans. Verify current plan limits before production.
- Risk level: High until hardened.
- SEAL level: SEAL-3 by default; SEAL-5 if it can move funds, delete records, or write ledger/proof state.
- Recommended activation path: Use n8n only behind authentication, disable untrusted user workflow creation, isolate workers, pin versions, enable backups, and avoid arbitrary code nodes for public operators. Start with read-only notifications and non-critical automations.

## 4. Cloudflare Workers + Workers AI + Queues + Cron Triggers

- Setup link: https://developers.cloudflare.com/workers/
- Secrets link: https://developers.cloudflare.com/workers/configuration/secrets/
- Route type: cloud edge functions, API gateway, scheduled automation, queue worker, AI binding.
- Function classification: public PULSE intake gateway, webhook firewall, rate limiter, lightweight AI classifier, Actual reveal edge route, bot endpoint, scheduled scout.
- Access method: Wrangler CLI, dashboard, HTTP fetch handlers, environment bindings, service bindings, queues, cron triggers.
- Secret names only: CLOUDFLARE_API_TOKEN, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, OPENAI_API_KEY, WEBHOOK_SIGNING_SECRET.
- Cost/free-tier notes: Strong low-hassle/free-tier candidate for edge routing; verify current Workers/AI/Queue limits before production.
- Risk level: Low to Medium.
- SEAL level: SEAL-2 for public gateway; SEAL-4 if signing ledger/proof events.
- Recommended activation path: Put Cloudflare in front of public endpoints as `/pulse-intake`, `/webhook/verify`, `/actual/read`, and `/seal/check`. Use Workers for validation/rate-limit and Supabase for persistent state.

## 5. Supabase Edge Functions

- Setup link: https://supabase.com/docs/guides/functions
- Example links: https://supabase.com/docs/guides/functions/examples
- Route type: API, webhook, serverless function, Deno/TypeScript, database-adjacent backend.
- Function classification: PULSE mint route, pledge route, token classifier route, Base Value updater, Stripe/Paystack webhook handler, bot backend.
- Access method: Supabase CLI, dashboard deploy, HTTP endpoints, Supabase Auth, Postgres RLS, project secrets.
- Secret names only: SUPABASE_SERVICE_ROLE_KEY, SUPABASE_DB_URL, STRIPE_WEBHOOK_SECRET, PAYSTACK_SECRET_KEY, OPENAI_API_KEY, RESEND_API_KEY.
- Cost/free-tier notes: Good free/low-hassle path for MVP; confirm current project and function limits before production.
- Risk level: Medium.
- SEAL level: SEAL-4 for token/value routes; SEAL-5 if financial or identity webhooks are processed.
- Recommended activation path: Keep foundation APIs here first: `/api/pulse/release`, `/api/token/classify`, `/api/scale/read`, `/api/base-value/update`, `/api/ledger/write`. Use RLS and signed webhooks.

## 6. GitHub Actions

- Setup link: https://docs.github.com/en/actions
- Secrets link: https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions
- Route type: CI/CD, automation, scheduled workflow, repository proof trail.
- Function classification: documentation build, integration scout commits, schema validation, API tests, deployment, changelog, governance file proof.
- Access method: YAML workflows, repository secrets, environments, scheduled cron, pull request triggers.
- Secret names only: GH_TOKEN, SUPABASE_ACCESS_TOKEN, CLOUDFLARE_API_TOKEN, VERCEL_TOKEN, DOCKERHUB_TOKEN.
- Cost/free-tier notes: Public repos typically have generous free usage; private repo minutes/storage vary by plan. Verify current account limits.
- Risk level: Medium.
- SEAL level: SEAL-3; SEAL-5 if deployment secrets can change production.
- Recommended activation path: Add CI to validate foundation Markdown, JSON schemas, API route contracts, and deployment health. Use protected environments for production.

## 7. OpenTimestamps

- Setup link: https://opentimestamps.org
- GitHub/source link: https://github.com/opentimestamps
- Route type: blockchain proof, timestamping, open-source, independent verification.
- Function classification: ledger proof, governance file proof, Actual reveal proof, commitment timestamp, document existence proof.
- Access method: CLI, Python, Java, JavaScript, Rust implementations; timestamp files and verify independently.
- Secret names only: none required for basic timestamping.
- Cost/free-tier notes: Free/open-source for basic use; operational cost is mainly automation/storage.
- Risk level: Low.
- SEAL level: SEAL-4.
- Recommended activation path: Stamp governance docs, ledger snapshots, token formula updates, and major ecosystem releases. Store `.ots` proof files in a proof directory.

## 8. W3C DID + Verifiable Credentials

- Setup links: https://www.w3.org/TR/did-core/ and https://www.w3.org/TR/vc-data-model-2.0/
- Route type: Web9 identity, decentralized identity, verifiable credential standard.
- Function classification: HAPI identity, agent identity, organization/entity credential, vendor proof, pledge credential, role-based SEAL access.
- Access method: DID methods, VC issuer/verifier libraries, wallet integrations, credential registries.
- Secret names only: DID_ISSUER_PRIVATE_KEY, VC_SIGNING_KEY, KMS_KEY_ID.
- Cost/free-tier notes: Standards are open; cost depends on DID method, wallet, key management, and verifier infrastructure.
- Risk level: High if keys or credentials are mishandled.
- SEAL level: SEAL-5.
- Recommended activation path: Begin with test credentials: `HAPI_BASIC_ID`, `ENTITY_MEMBERSHIP`, `VENDOR_VERIFIED`, `PLEDGE_COMMITMENT`. Keep private keys in managed KMS or hardware-backed vault. Do not put raw keys in repo.

## 9. DIAP-style decentralized agent identity research route

- Research link: https://arxiv.org/abs/2511.11619
- Route type: agent identity protocol, ZKP, Rust SDK concept, IPFS/IPNS, libp2p, Iroh.
- Function classification: AI agent identity, autonomous agent communication, Web9 route, privacy-preserving proof.
- Access method: research/reference implementation review; Rust SDK pattern if available; IPFS/IPNS; DID-Key; ZKP circuit route.
- Secret names only: AGENT_DID_PRIVATE_KEY, ZKP_PROVER_KEY, IPFS_API_TOKEN.
- Cost/free-tier notes: Mostly open-source components; implementation effort is high.
- Risk level: High.
- SEAL level: SEAL-5.
- Recommended activation path: Treat as R&D, not MVP. Use W3C DID/VC first, then test agent-to-agent proof envelopes in sandbox.

## 10. Agent delegation trust gateway route

- Research link: https://arxiv.org/abs/2601.14982
- Related deployment research: https://arxiv.org/abs/2605.06738
- Route type: AI agent authorization, delegation grant, policy gateway, blockchain anchoring optional.
- Function classification: SWARM authority control, group/entity AI permissions, bounded agent delegation, audit trail, SEAL enforcement.
- Access method: policy engine, credential verifier, API gateway middleware, signed delegation grant, revocation list.
- Secret names only: DELEGATION_SIGNING_KEY, POLICY_ENGINE_ADMIN_TOKEN, REVOCATION_REGISTRY_KEY.
- Cost/free-tier notes: Standards-based route can begin with open-source policy tools; production hardening requires engineering.
- Risk level: High.
- SEAL level: SEAL-5.
- Recommended activation path: Define `Agent Authorization Envelope` for every AI action that writes ledger, sends communication, spends money, or changes identity/proof state.

## 11. SeaTable

- Setup link: https://seatable.com/help/installation-seatable-server-community-edition/
- GitHub/source link: https://github.com/seatable/seatable
- Route type: no-code database, low-code app platform, self-hosted option.
- Function classification: lightweight PULSE tables, vendor registry, opportunity tracker, community operations, form intake.
- Access method: API, self-hosted server, web UI, automations.
- Secret names only: SEATABLE_API_TOKEN, SEATABLE_DB_TOKEN, SMTP_PASSWORD.
- Cost/free-tier notes: Community/self-hosted path may reduce cost; verify current edition limits.
- Risk level: Medium.
- SEAL level: SEAL-2 for public/non-sensitive data; SEAL-3 for operational data.
- Recommended activation path: Use only for non-critical operational tables or public forms. Keep canonical ledger in Supabase/Postgres.

## 12. Spree Commerce

- Setup link: https://spreecommerce.org/docs/developer/getting-started/quickstart
- GitHub/source link: https://github.com/spree/spree
- Route type: open-source headless commerce, REST APIs, SDK/storefront.
- Function classification: Carbon Actual marketplace, vendor products, event commerce, service checkout, inventory route.
- Access method: Ruby on Rails backend, Store API, Admin API, Next.js storefront starter.
- Secret names only: SPREE_SECRET_KEY_BASE, DATABASE_URL, PAYMENT_PROVIDER_SECRET_KEY, WEBHOOK_SIGNING_SECRET.
- Cost/free-tier notes: Community edition open-source; hosting and payment processing costs apply.
- Risk level: Medium.
- SEAL level: SEAL-4; SEAL-5 for payments and customer identity.
- Recommended activation path: Do not start marketplace here unless commerce becomes immediate. For MVP, use Paystack/Stripe checkout links first, then migrate to headless commerce when catalog complexity grows.

## 13. OpenClaw-style local agent route

- Source/repo link: https://github.com/openclaw/openclaw
- Route type: open-source autonomous assistant, local/private agent runtime, skill-based automation.
- Function classification: private founder assistant, local operations agent, CRM updater, research scout, GitHub/documentation assistant.
- Access method: local gateway, messaging platform connectors, LLM API provider, custom skills.
- Secret names only: OPENAI_API_KEY, ANTHROPIC_API_KEY, GITHUB_TOKEN, GMAIL_OAUTH_CLIENT_SECRET, TELEGRAM_BOT_TOKEN.
- Cost/free-tier notes: Software may be free/open-source, but model/API and hosting costs apply.
- Risk level: High if granted broad tool access.
- SEAL level: SEAL-5 when connected to Gmail, GitHub, payments, or production systems.
- Recommended activation path: Sandbox first. Give read-only repo/docs access before any write actions. Require human approval for commits, emails, payments, and identity changes.

## 14. App builder route — Base44 / Lovable / Replit / Bolt-style builders

- Setup links: https://base44.com/ , https://lovable.dev/ , https://replit.com/ , https://bolt.new/
- Route type: AI app builder, no-code/low-code/custom-code accelerator, prototype generator.
- Function classification: MVP prototyping, landing pages, demos, dashboards, investor prototypes, admin apps.
- Access method: browser builder, GitHub export where supported, cloud deploy, environment variables.
- Secret names only: SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, STRIPE_SECRET_KEY, OPENAI_API_KEY.
- Cost/free-tier notes: Useful for fast demos; long-term costs and code ownership/export rules must be verified per platform.
- Risk level: Medium.
- SEAL level: SEAL-2 for demos; SEAL-4 if connected to real ledger or customer records.
- Recommended activation path: Use builders only for UI prototypes and demo flows. Keep foundation APIs, ledger, identity, proof, and payment logic outside the builder.

## 15. Hardware/software bridge route — WebRTC + MQTT + Node-RED pattern

- Setup links: https://nodered.org/docs/getting-started/ and https://mqtt.org/
- Route type: open-source workflow, IoT/hardware bridge, webhook/MQTT integration.
- Function classification: field device PULSE, sensor/event intake, environmental proof, kiosk route, community hardware terminal.
- Access method: Node-RED flows, MQTT broker, HTTP webhook, device SDKs, edge gateway.
- Secret names only: MQTT_USERNAME, MQTT_PASSWORD, DEVICE_SIGNING_KEY, NODE_RED_CREDENTIAL_SECRET.
- Cost/free-tier notes: Open-source software; hardware, hosting, broker, and maintenance costs vary.
- Risk level: High when connected to physical devices.
- SEAL level: SEAL-4 for proof data; SEAL-5 if controlling physical systems.
- Recommended activation path: Start read-only with sensor/event ingestion. Require signed device messages and replay protection before any device control.

---

# Recommended activation order

1. Cloudflare Workers as public gateway and webhook firewall.
2. Supabase Edge Functions as foundation API implementation.
3. GitHub Actions for schema validation and deployment checks.
4. Appsmith for private admin and review console.
5. OpenTimestamps for governance/ledger snapshot proofs.
6. LiveKit Agents for voice intake and call-center prototypes.
7. n8n for non-critical automation only after hardening.
8. W3C DID/VC for HAPI, entity, vendor, and agent credentials.
9. Agent delegation gateway for SEAL-5 AI authority.
10. Commerce, hardware, and decentralized agent routes only after the foundation API is stable.

# Integration rule

No integration should bypass the foundation routes:

- `/api/pulse/release`
- `/api/pulse/mint`
- `/api/pulse/return`
- `/api/pledge/release`
- `/api/commitment/value`
- `/api/token/classify`
- `/api/scale/read`
- `/api/base-value/update`
- `/api/ledger/write`
- `/api/actual/reveal`
- `/api/seal/check`

Every external tool must enter through SEAL, write through the ledger, and reveal only through Actual.
