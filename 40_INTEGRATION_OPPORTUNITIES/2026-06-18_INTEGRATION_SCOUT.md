# ABBA MAS / Carbon Actual Integration Scout

Purpose: record lawful API, SDK, webhook, workflow, agent, identity, proof, communication, cloud, no-code, low-code, open-source, and hardware/software routes that can become ABBA MAS and Carbon Actual integration opportunities.

No raw secrets are recorded here. Only recommended secret names and setup links are listed.

## SEAL level key

- SEAL-1: public data, sandbox, low-risk connector
- SEAL-2: user-authenticated route, non-sensitive operational data
- SEAL-3: payments, identity, communication, CRM, or customer data route
- SEAL-4: proof, compliance, regulated data, financial-grade, or legal evidence route
- SEAL-5: critical ecosystem infrastructure, root identity, governance ledger, token value, or high-impact automation

## Opportunity register

| # | Opportunity | Route type | Function classification | Access method | Setup links | Cost/free-tier notes | Risk | SEAL | Secret names only | Recommended activation path |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Supabase | API, SDK, webhooks, Postgres backend | HAPI registry, PULSE event store, auth, storage, realtime, edge functions | REST, GraphQL, JS/Python SDK, OAuth, service role | Docs: https://supabase.com/docs ; Pricing: https://supabase.com/pricing | Free project tier available; paid for scale | Medium | SEAL-4 | SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY | Activate as first ABBA MAS data backbone. Create tables for hapi, pulse_events, tokens, proofs, groups, organizations, commitments, pledges. Enable RLS before production. |
| 2 | Cloudflare Workers | Serverless API, edge webhooks, queues, AI, KV, D1, R2 | Public gateway, webhook receiver, event router, anti-abuse edge layer | Wrangler CLI, HTTP fetch, bindings, API token | Docs: https://developers.cloudflare.com/ ; Workers pricing: https://developers.cloudflare.com/workers/platform/pricing/ | Generous free route; paid for higher usage | Medium | SEAL-4 | CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID | Use as Carbon Actual edge router: /pulse/emit, /proof/verify, /webhook/inbound, /identity/resolve. Keep secrets in Workers secrets. |
| 3 | n8n | Workflow automation, self-hosted or cloud | Integration command center, webhook orchestration, CRM/payment/AI flows | Webhooks, built-in nodes, credentials vault, HTTP node, API | Docs: https://docs.n8n.io/ ; Pricing: https://n8n.io/pricing/ | Self-host route lowers cost; cloud trial/paid plans | Medium | SEAL-3 | N8N_ENCRYPTION_KEY, N8N_API_KEY, N8N_BASIC_AUTH_PASSWORD | Self-host for ecosystem automations. Start with PULSE intake, lead capture, WhatsApp/SMS alerts, proof stamping, GitHub sync. |
| 4 | Pipedream | Hosted workflow automation, serverless code steps | Fast API glue, webhook experiments, event enrichment | OAuth apps, webhooks, Node/Python steps | Docs: https://pipedream.com/docs ; Pricing: https://pipedream.com/pricing | Free developer usage available; paid for volume | Low-Medium | SEAL-2 | PIPEDREAM_API_KEY | Use for quick prototypes before migrating stable flows to n8n/Workers. Best for testing APIs without building backend first. |
| 5 | Make | No-code automation | Business workflows, notifications, forms, Airtable/Sheets/CRM bridge | Webhooks, app modules, OAuth connections | Docs: https://www.make.com/en/help ; Pricing: https://www.make.com/en/pricing | Free plan usually limited by operations | Low-Medium | SEAL-2 | MAKE_WEBHOOK_SECRET | Use for non-critical marketing, onboarding and reporting flows. Avoid core proof ledger dependency. |
| 6 | Zapier | No-code automation and app connectors | Business automation, MVP launch workflows, lead routing | Zaps, webhooks, OAuth app connections | Developer: https://developer.zapier.com/ ; Pricing: https://zapier.com/pricing | Free plan supports limited simple workflows | Low-Medium | SEAL-2 | ZAPIER_WEBHOOK_SECRET | Use for quick external customer integrations; do not use as final core data backbone. |
| 7 | GitHub Actions | CI/CD, automation, repository webhooks | Deploy ABBA MAS services, run scheduled scouts, proof build artifacts | YAML workflows, repo secrets, Actions API | Docs: https://docs.github.com/actions ; Marketplace: https://github.com/marketplace?type=actions | Free minutes for public repos; private quotas vary | Medium | SEAL-3 | GH_TOKEN, GH_DEPLOY_KEY, GH_APP_PRIVATE_KEY | Use for deployment, docs generation, schema checks, proof file generation and changelog automation. |
| 8 | OpenAI Agents SDK | AI agent SDK | ABBA MAS agent orchestration, HAPI assistant, PULSE interpreter, guardrailed tool use | Python SDK, Responses API, tools, MCP, tracing | Docs: https://openai.github.io/openai-agents-python/ | SDK open; model/API usage billed by provider | Medium-High | SEAL-4 | OPENAI_API_KEY | Use for classified agents: HAPI Agent, Group AI Agent, Proof Agent, Vendor Agent, Governance Agent. Keep action tools permissioned. |
| 9 | LangChain / LangGraph | AI agent framework and observability | Multi-agent workflows, graph state, RAG, evaluation, monitoring | Python/JS SDK, LangSmith, tool calling | Docs: https://docs.langchain.com/ | Open-source libs; hosted LangSmith free/paid | Medium | SEAL-3 | LANGSMITH_API_KEY, OPENAI_API_KEY | Use for complex stateful PULSE routing and multi-step proof workflows where graph control matters. |
| 10 | CrewAI | Multi-agent automation framework | Team/role based AI crews for sales, ops, research, compliance, onboarding | Python SDK, cloud console, triggers, integrations | Docs: https://docs.crewai.com/ ; GitHub: https://github.com/crewAIInc/crewAI | Open-source and cloud paths | Medium | SEAL-3 | CREWAI_API_KEY, OPENAI_API_KEY | Use for operational crews: Integration Scout, Vendor Outreach Crew, Proposal Crew, Event Crew. |
| 11 | Dify | Open-source LLM app builder | Chatflows, workflow agents, knowledge apps, internal tools | Self-host, API, workflows, web app publishing | Docs: https://docs.dify.ai/ ; GitHub: https://github.com/langgenius/dify | Open-source self-host; cloud paid options | Medium | SEAL-3 | DIFY_API_KEY, MODEL_PROVIDER_API_KEY | Use as low-code AI product factory for internal demos, client chatbots, knowledge assistants and workflow apps. |
| 12 | LiveKit Agents | Realtime voice/video and agent platform | Voice agents, call routing, meeting agents, realtime HAPI assistant | SDKs, WebRTC, SIP, Agents framework, API keys | Agents: https://docs.livekit.io/agents/ ; Pricing: https://livekit.com/pricing | Open-source + cloud free/paid tiers | Medium-High | SEAL-3 | LIVEKIT_API_KEY, LIVEKIT_API_SECRET | Use for ABBA MAS realtime voice agents and event rooms. Pair with Twilio/SIP for phone bridge. |
| 13 | Twilio | Communication APIs, voice, SMS, WhatsApp, call center | Call center, SMS alerts, OTP, AI voice bridge, WhatsApp engagement | REST API, webhooks, TwiML, OAuth/keys | API: https://www.twilio.com/docs/usage/api ; Voice pricing: https://www.twilio.com/en-us/voice/pricing | Free trial; usage billed by channel/country | High | SEAL-4 | TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WEBHOOK_SIGNING_SECRET | Use for paid communication layer only after consent, opt-out, country rules, and logging are implemented. |
| 14 | Asterisk + FreePBX | Open-source PBX/call center | Low-cost telephony, IVR, internal lines, local call-center stack | SIP, ARI/AMI, dialplan, PBX UI | Asterisk: https://www.asterisk.org/ ; FreePBX: https://www.freepbx.org/ ; FreePBX GitHub: https://github.com/FreePBX | Open-source; telecom carrier/SIP trunk costs apply | High | SEAL-4 | ASTERISK_ARI_USER, ASTERISK_ARI_PASSWORD, SIP_TRUNK_SECRET | Use where telecom cost/control matters. Start in lab; secure SIP, firewall, fail2ban, call recording policy. |
| 15 | WhatsApp Cloud API | Messaging API | HAPI support channel, vendor onboarding, event notifications | Meta app, Graph API, webhooks | Docs: https://developers.facebook.com/docs/whatsapp/cloud-api | Conversation-based billing; test numbers available | High | SEAL-4 | WHATSAPP_ACCESS_TOKEN, WHATSAPP_PHONE_NUMBER_ID, META_APP_SECRET | Activate only with consent, templates, opt-out handling, and message classification. |
| 16 | Telegram Bot API | Bot and webhook API | Community support bot, alerts, lightweight group workflows | HTTPS Bot API, webhook, bot token | Docs: https://core.telegram.org/bots/api | Free API; operational risk from public groups | Medium | SEAL-2 | TELEGRAM_BOT_TOKEN, TELEGRAM_WEBHOOK_SECRET | Use for internal admin alerts and community experiments, not sensitive identity or payment flows. |
| 17 | Discord Developer Platform | Bots, webhooks, community automation | Developer/community channel, support rooms, event coordination | Bot tokens, webhooks, OAuth2 | Docs: https://discord.com/developers/docs/intro | Free base platform; paid Nitro unrelated | Medium | SEAL-2 | DISCORD_BOT_TOKEN, DISCORD_WEBHOOK_SECRET | Use for builder community, internal alerts and integration testing. Keep PII out. |
| 18 | Stripe | Payments, billing, checkout, webhooks | Global payments, subscriptions, invoices, marketplace experiments | API, Checkout, Billing, webhooks | Docs: https://docs.stripe.com/ ; Pricing: https://stripe.com/pricing | No monthly fee for core payments; transaction fees | High | SEAL-4 | STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET | Use for global card/payment flows where available. Connect PULSE return events from payment webhooks. |
| 19 | Paystack | African payments, webhooks | Nigeria/Africa payments, donations, vendor payments, subscriptions | API, checkout, transfer, webhooks | Docs: https://paystack.com/docs/ ; Pricing: https://paystack.com/pricing | Transaction fees; strong Africa route | High | SEAL-4 | PAYSTACK_SECRET_KEY, PAYSTACK_WEBHOOK_SECRET | Use as primary Nigeria-friendly payment rail. Map successful transaction to Asset Token/PULSE return. |
| 20 | FlutterFlow | Low-code mobile/web builder | Fast HAPI app MVP, dashboards, onboarding, forms | Visual builder, Firebase/Supabase/API integrations | Docs: https://docs.flutterflow.io/ ; Pricing: https://www.flutterflow.io/pricing | Free build path; paid for exports/team features | Medium | SEAL-2 | FLUTTERFLOW_API_KEY, SUPABASE_ANON_KEY | Use to build HAPI mobile MVP quickly. Avoid locking core logic inside builder. |
| 21 | Bubble | No-code web app builder | Admin portals, marketplaces, dashboards, client MVPs | Visual builder, plugins, API connector, workflows | Docs: https://manual.bubble.io/ ; Pricing: https://bubble.io/pricing | Free development; paid deployment | Medium | SEAL-2 | BUBBLE_API_TOKEN | Use for quick marketplaces/admin demos; keep core Base Value logic in external API. |
| 22 | Appsmith | Open-source internal tool builder | Operations dashboard, CRM panel, proof review desk | Self-host, REST/GraphQL/database connectors | Docs: https://docs.appsmith.com/ ; GitHub: https://github.com/appsmithorg/appsmith | Open-source self-host; cloud paid | Medium | SEAL-3 | APPSMITH_ADMIN_PASSWORD, SUPABASE_SERVICE_ROLE_KEY | Use for internal ABBA MAS owner dashboards and support tools. |
| 23 | Baserow | Open-source no-code database | Lightweight CRM, opportunity register, manual operations back office | API, webhooks, database UI | Docs: https://baserow.io/docs ; GitLab/GitHub links from site | Open-source self-host; hosted free/paid | Medium | SEAL-2 | BASEROW_TOKEN | Use for non-critical tables and human-operated workflows while core DB matures. |
| 24 | NocoDB | Open-source Airtable alternative | Spreadsheet-like interface on existing SQL data | REST API, webhooks, DB connectors | Docs: https://docs.nocodb.com/ ; GitHub: https://github.com/nocodb/nocodb | Open-source self-host; cloud free/paid | Medium | SEAL-2 | NOCODB_API_TOKEN | Use as admin spreadsheet layer over Postgres without exposing raw database to operators. |
| 25 | Web5 JS | Decentralized identity + DWN SDK | Web9/Web5 identity route, HAPI-owned data, decentralized web node experiments | TypeScript SDK, DIDs, VCs, DWNs | GitHub: https://github.com/decentralized-identity/web5-js | Open-source Apache-2.0 | Medium-High | SEAL-5 | WEB5_DWN_ENDPOINT, WEB5_DID_PRIVATE_KEY_REF | Prototype HAPI self-owned identity and portable PULSE proof wallets. Keep keys in secure vault, not database rows. |
| 26 | W3C DID + Verifiable Credentials | Open standards | Root identity, credentials, claims, proofs, trust model | Standards, DID methods, VC signing/verifying libraries | DID: https://www.w3.org/TR/did-core/ ; VC 2.0: https://www.w3.org/TR/vc-data-model-2.0/ | Standards are free; implementation cost varies | High | SEAL-5 | DID_ISSUER_KEY_REF, VC_SIGNING_KEY_REF | Adopt as ecosystem proof language. Start with VC schemas for HAPI, organization, pledge, vendor, event attendance and proof-of-service. |
| 27 | ACA-Py / OpenWallet Foundation | Decentralized identity agent | Credential issuer/verifier agent, Aries-compatible proof exchange | Python service, admin API, wallets, DIDComm | GitHub: https://github.com/openwallet-foundation/acapy | Open-source; hosting/ops cost | High | SEAL-5 | ACAPY_ADMIN_API_KEY, ACAPY_WALLET_KEY, ACAPY_SEED_REF | Use after DID/VC schemas are defined. Good for enterprise-grade credential issuing and verification. |
| 28 | OpenTimestamps | Bitcoin timestamp proof | Proof-of-existence for documents, commitments, contracts, governance files | CLI/library, timestamp files, Bitcoin anchoring | Website: https://opentimestamps.org/ ; GitHub: https://github.com/opentimestamps/opentimestamps-client | Open-source; low/no direct cost for timestamping | Medium | SEAL-4 | OTS_CALENDAR_URLS | Use to timestamp governance files, Base Value laws, proof bundles, contracts and signed exports. |
| 29 | IPFS / Pinata | Decentralized file storage gateway | Proof bundle storage, public artifacts, content addressing | API, SDK, CID addressing, gateway | IPFS docs: https://docs.ipfs.tech/ ; Pinata docs: https://docs.pinata.cloud/ | IPFS open; hosted pinning free/paid | Medium-High | SEAL-4 | PINATA_JWT, IPFS_GATEWAY_TOKEN | Store public proof bundles and hashes. Do not put private PII on public IPFS. Encrypt or avoid sensitive payloads. |
| 30 | Home Assistant + MQTT | Open-source hardware/software automation | IoT, environmental sensors, office/lab automation, hardware PULSE | MQTT, REST, webhooks, local integrations | Home Assistant docs: https://www.home-assistant.io/docs/ ; MQTT: https://mqtt.org/ | Open-source; hardware costs | Medium | SEAL-3 | MQTT_USERNAME, MQTT_PASSWORD, HOME_ASSISTANT_TOKEN | Use for sensor-based PULSE: energy, environment, attendance device, lab equipment, proof-of-presence pilots. |
| 31 | Raspberry Pi / Arduino | Hardware prototyping | Low-cost devices, field kits, attendance devices, sensor proofs | GPIO, serial, Wi-Fi, MQTT/HTTP | Raspberry Pi docs: https://www.raspberrypi.com/documentation/ ; Arduino docs: https://docs.arduino.cc/ | Hardware cost only; open ecosystem | Medium | SEAL-3 | DEVICE_PROVISIONING_KEY_REF, MQTT_PASSWORD | Build Carbon Actual field kits. All devices need signed device identity and revocation list. |
| 32 | OpenStreetMap + Mapbox | Mapping/geospatial route | Community assets, vendor locations, event maps, route value | Open data, APIs, SDKs | OSM: https://www.openstreetmap.org/ ; Mapbox docs: https://docs.mapbox.com/ | OSM free; Mapbox free tier/paid usage | Low-Medium | SEAL-2 | MAPBOX_ACCESS_TOKEN | Use for public location layers and logistics. Avoid exposing private HAPI locations. |

## Priority activation sequence

1. Foundation: Supabase + Cloudflare Workers + GitHub Actions.
2. Automation control: n8n self-host, with Pipedream for experiments.
3. AI layer: OpenAI Agents SDK, LangGraph, CrewAI, Dify.
4. Identity/proof layer: W3C DID/VC, Web5 JS, OpenTimestamps, later ACA-Py.
5. Communication layer: Telegram/Discord first, then WhatsApp/Twilio after consent and compliance.
6. Payment layer: Paystack for Nigeria/Africa, Stripe for global routes.
7. Owner dashboards: Appsmith or NocoDB over Supabase.
8. Hardware pilots: Home Assistant + MQTT + Raspberry Pi/Arduino.

## Immediate ABBA MAS route map

- /pulse/emit: Cloudflare Worker receives event, validates request, writes to Supabase.
- /pulse/classify: AI agent classifies PULSE as asset, liability, mixed, pending, recovery, or scale.
- /proof/stamp: OpenTimestamps hashes and timestamps proof bundle.
- /identity/issue: DID/VC issuer creates HAPI, organization, vendor, event, pledge, or proof credential.
- /notify/send: n8n routes approved notifications to Telegram, Discord, WhatsApp, SMS, or email.
- /payment/return: Paystack/Stripe webhooks write return PULSE and update Base Value contribution.
- /dashboard/owner: Appsmith/NocoDB view for human review and intervention.
- /agent/run: OpenAI Agents SDK or LangGraph invokes controlled tools with SEAL permissions.

## Risk controls

- Never store raw secrets in Markdown, chat, spreadsheets, or public repos.
- Use platform secret stores: GitHub Secrets, Cloudflare Secrets, n8n credentials, Supabase Vault where available.
- Separate sandbox, staging, and production keys.
- Require webhook signature verification for Stripe, Paystack, Twilio, Meta/WhatsApp and custom gateways.
- Enable Supabase RLS before real user data.
- Keep public proof hashes separate from private proof content.
- Treat DID root keys and VC issuer keys as SEAL-5 assets.
- Keep AI tools permissioned by route, SEAL level, rate limit, and human approval threshold.

## Best low-hassle MVP path

Build a lawful, low-cost MVP with:

- Supabase for database/auth/storage.
- Cloudflare Workers for public APIs and webhooks.
- n8n for orchestration.
- OpenAI Agents SDK for PULSE interpretation and controlled agents.
- Paystack for Nigeria payment return PULSE.
- Telegram or Discord for internal alerts.
- OpenTimestamps for governance/proof bundles.
- Appsmith for owner dashboard.

This creates a working ABBA MAS foundation without heavy enterprise contracts, while leaving clean upgrade routes to Twilio, WhatsApp Cloud API, ACA-Py, LiveKit, and deeper Web5/DID infrastructure.
