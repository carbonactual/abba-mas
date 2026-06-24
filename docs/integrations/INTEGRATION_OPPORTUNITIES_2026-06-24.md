# Carbon Actual / ABBA MAS Integration Opportunities Register

Date checked: 2026-06-24

Purpose: lawful integration routes for ABBA MAS and Carbon Actual. This register records setup links, route type, access method, cost/free-tier notes, risk level, SEAL level, secret names only, and activation path. No raw API secrets are included.

## SEAL guide

- SEAL 1: public/content utility, low-risk read-only route.
- SEAL 2: authenticated workflow, messaging, analytics, build/deploy, or user-data route.
- SEAL 3: payments, identity verification, privileged automation, production infrastructure, sensitive records.
- SEAL 4: regulated finance, public proof issuance, identity root, treasury, legal/compliance final authority.

## Activation priority

1. Activate immediately: Supabase, Vercel, GitHub, n8n, OpenAI, Google Identity, Resend, Sentry, PostHog, Paystack.
2. Activate after MVP gate: Twilio/WhatsApp, LiveKit, Typesense, Mapbox/OSM, Stripe, Cloudflare, IPFS/Filecoin, SignWell/DocuSign.
3. Activate under compliance gate: Civic/Persona/Smile ID, Veriff, regulated payment/escrow partners, blockchain attestation/public proof, investor/subscription routes.

## Integration table

| # | Integration | Route type | Function classification | Access method | Setup/docs link | Cost/free-tier notes | Secret names only | Risk | SEAL | Recommended activation path |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Supabase | Cloud/BaaS/API/SDK/Webhooks | Postgres, Auth, Storage, Realtime, Edge Functions, RLS | JS SDK, SQL, REST, PostgREST, webhooks | https://supabase.com/docs / https://supabase.com/pricing | Free project path available; paid when storage/compute grows | SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY | Medium | 3 | Make Carbon Actual default backend; enforce RLS and audit-first schema. |
| 2 | Vercel | Cloud deploy/CI/CD/functions | Next.js hosting, serverless, previews, workflows | GitHub import, CLI, API, env vars | https://vercel.com/docs / https://vercel.com/pricing | Hobby free; Pro starts paid with usage controls | VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID | Medium | 3 | Use for app frontends and preview deployments; add spend limits. |
| 3 | GitHub | Repository/API/webhooks/actions | Source control, issues, PRs, CI, release automation | REST/GraphQL API, Actions, webhooks, GitHub Apps | https://docs.github.com/en/rest / https://docs.github.com/en/webhooks | Free private/public repos with limits; Actions usage limits apply | GITHUB_TOKEN, GITHUB_APP_ID, GITHUB_WEBHOOK_SECRET | Medium | 3 | Treat GitHub as build root; connect issue-to-actual workflows. |
| 4 | n8n | Automation/workflow/self-host | Multi-app automations, triggers, webhooks, AI workflows | Self-host Docker, cloud, webhook endpoints, credentials vault | https://docs.n8n.io/hosting/ | Self-host low cost; cloud paid | N8N_BASE_URL, N8N_WEBHOOK_SECRET, N8N_API_KEY | Medium | 3 | Run internal ABBA MAS workflow bus; all critical automations require SEAL review. |
| 5 | OpenAI API | AI API/agents/tooling | ABBA reasoning, classification, extraction, copilots, structured outputs | API key, SDKs, Responses/Assistants-style tool routes | https://developers.openai.com/api/docs/quickstart | Usage-based; no secrets in chat | OPENAI_API_KEY | Medium | 3 | Primary AI provider for ABBA; tool authorization middleware required. |
| 6 | Google Gemini API | AI API | Multimodal reasoning, document analysis, fallback AI provider | API key, SDKs | https://ai.google.dev/gemini-api/docs | Free/paid tiers vary; check console | GEMINI_API_KEY | Medium | 3 | Secondary AI provider in ABBA router; use for multimodal and redundancy. |
| 7 | Anthropic Claude API | AI API | Long-context review, safe reasoning, document intelligence | API key, SDKs | https://docs.anthropic.com/ | Usage-based | ANTHROPIC_API_KEY | Medium | 3 | Add as governance/review model for sensitive summaries. |
| 8 | OpenRouter | AI gateway/API | Multi-model routing, fallback, cost arbitrage | API key, OpenAI-compatible API | https://openrouter.ai/docs | Usage-based; some free models may exist | OPENROUTER_API_KEY | Medium | 3 | Use only behind provider router, budget caps, and model allowlist. |
| 9 | Vercel AI SDK | SDK | AI chat/UI/tool calls/model abstraction | npm package, provider adapters | https://sdk.vercel.ai/docs | Open-source SDK; model usage separate | MODEL_PROVIDER_KEYS | Low | 2 | Use for ABBA frontends and provider-agnostic streaming. |
| 10 | Google Identity / Passkeys | Identity/OAuth/Web9 route | Sign-in, OAuth consent, account linking, passkeys | OAuth client, Google Identity Services SDK | https://developers.google.com/identity | Free to start; verification required for sensitive scopes | GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET | Medium | 3 | Use for low-friction identity; sensitive scopes require consent ledger. |
| 11 | Supabase Auth | Identity/API | Email/password, magic link, OTP, social login | Supabase SDK/config | https://supabase.com/docs/guides/auth | Included in Supabase quotas | SUPABASE_AUTH_* | Medium | 3 | Default auth for MVP; map users to Carbon Actual identity table. |
| 12 | Civic Auth | Web3/Web9 identity | Wallet/user identity and gated access | SDK/API | https://docs.civic.com/ | Free/paid varies | CIVIC_CLIENT_ID, CIVIC_CLIENT_SECRET | High | 4 | Evaluate for proof-gated communities and identity attestations only after policy review. |
| 13 | Ceramic / ComposeDB | Decentralized identity/data | Verifiable profiles, portable graph data | SDK, nodes, schemas | https://developers.ceramic.network/ | Open network/self-host paths; operational overhead | CERAMIC_NODE_URL, CERAMIC_SEED_SECRET | High | 4 | Research for Web9 identity memory; do not use for sensitive personal data without legal design. |
| 14 | WalletConnect / Reown | Wallet connection | User wallet linking, signatures, proof routes | SDK/project ID | https://docs.reown.com/ | Free tier usually available; check current pricing | WALLETCONNECT_PROJECT_ID | Medium | 3 | Use for optional wallet-bound proof, not required onboarding. |
| 15 | Ethereum Attestation Service | Blockchain proof | Public/private attestations, schema registry | SDK, smart contracts, indexer | https://docs.attest.org/ | Chain gas + infra | EAS_PRIVATE_KEY, EAS_RPC_URL | High | 4 | Use only for public proof after SEAL 4 and privacy redaction. |
| 16 | Polygon / Ethereum RPC | Blockchain proof/payments | On-chain proofs, token routes, settlement experiments | RPC API, smart contracts | https://docs.polygon.technology/ / https://ethereum.org/developers/docs/ | RPC providers free/paid; gas applies | RPC_URL, DEPLOYER_PRIVATE_KEY | High | 4 | Keep feature-flagged; no treasury automation without human approval. |
| 17 | IPFS / Filecoin / web3.storage alternatives | Proof/storage | Content-addressed evidence, immutable hashes | API/SDK, CIDs | https://docs.ipfs.tech/ / https://docs.filecoin.io/ | Free/self-host/paid storage options vary | IPFS_API_KEY, FILECOIN_API_KEY | High | 4 | Store hashes publicly, not raw sensitive documents. |
| 18 | Arweave | Permanent proof storage | Permanent records, public archives | SDK/API | https://docs.arweave.org/ | Pay once storage; AR token cost | ARWEAVE_WALLET_JSON_REF | High | 4 | Use only for public non-sensitive proof and public manifest records. |
| 19 | Paystack | Payments/API/webhooks | Cards, bank transfer, dedicated virtual accounts, subscriptions, splits | REST API, dashboard, webhooks | https://paystack.com/docs/api/ | Transaction fees; setup low-hassle in supported markets | PAYSTACK_SECRET_KEY, PAYSTACK_WEBHOOK_SECRET | High | 3 | Primary Nigeria payment route; ledger + webhook signature verification required. |
| 20 | Flutterwave | Payments/API | African payments, transfers, collections | API, SDK, webhooks | https://developer.flutterwave.com/docs | Transaction fees | FLUTTERWAVE_SECRET_KEY, FLUTTERWAVE_WEBHOOK_SECRET | High | 3 | Secondary African payment provider after reconciliation abstraction. |
| 21 | Monnify | Payments/API | Bank transfer, reserved accounts, collections | API, webhooks | https://developers.monnify.com/ | Transaction fees | MONNIFY_API_KEY, MONNIFY_SECRET_KEY, MONNIFY_CONTRACT_CODE | High | 3 | Useful for Nigeria virtual-account collections and rent/property ledgers. |
| 22 | Stripe | Payments/API/no-code | Global cards, billing, checkout, subscriptions, marketplaces | API, SDK, Checkout, webhooks, no-code links | https://docs.stripe.com/api | Transaction fees; test sandbox available | STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET | High | 3 | Use where supported; avoid unsupported Nigeria-native assumptions. |
| 23 | Resend | Communication/API | Transactional email, domain auth | API, SMTP | https://resend.com/docs | Free tier commonly available; paid by volume | RESEND_API_KEY | Low | 2 | Default email route for onboarding, proof notices, receipts. |
| 24 | Twilio Voice | Communication/API/call center | Programmable voice, IVR, call recordings, SIP, AI calls | REST API, SDKs, webhooks, TwiML | https://www.twilio.com/docs/voice/api | Pay-as-you-go; phone number/call charges | TWILIO_API_KEY, TWILIO_API_KEY_SECRET, TWILIO_ACCOUNT_SID | Medium | 3 | Use for call-center, inspections, verification callbacks; consent and recording notices required. |
| 25 | WhatsApp Cloud API | Communication/API | WhatsApp messaging, templates, support automation | Meta app, Graph API, webhooks | https://developers.facebook.com/docs/whatsapp/cloud-api/ | Conversation/template fees may apply | WHATSAPP_ACCESS_TOKEN, WHATSAPP_PHONE_NUMBER_ID, META_APP_SECRET | Medium | 3 | Activate for Nigeria support and property leads after template approval. |
| 26 | LiveKit | Realtime/hardware/software | Video, audio rooms, WebRTC, agents, telepresence | SDKs, server API, self-host/cloud | https://docs.livekit.io/ | Open-source/self-host; cloud paid/free limits vary | LIVEKIT_API_KEY, LIVEKIT_API_SECRET, LIVEKIT_URL | Medium | 3 | Use for inspections, remote support, AI voice rooms, campus/class rooms. |
| 27 | Jitsi Meet | Open-source realtime | Free video meetings, embeds | Self-host or public meet links/API | https://jitsi.github.io/handbook/ | Free open-source/self-host | JITSI_APP_ID, JITSI_JWT_SECRET | Medium | 2 | Low-cost backup for video calls and demos. |
| 28 | Cal.com | Scheduling/open-source | Bookings, availability, routing | API/webhooks/self-host/cloud | https://cal.com/docs | Open-source/self-host; cloud paid/free tiers vary | CAL_API_KEY, CAL_WEBHOOK_SECRET | Low | 2 | Use for founder calls, inspections, partner onboarding. |
| 29 | Google Calendar API | Scheduling/API | Calendar availability, booking, reminders | OAuth API | https://developers.google.com/calendar/api | Free quotas; OAuth verification may apply | GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET | Medium | 3 | Use only with user consent; map events to Pulse records. |
| 30 | Typesense | Search/open-source | Fast search, filtering, typo tolerance | Self-host/cloud API | https://typesense.org/docs/ | Open-source self-host; cloud paid | TYPESENSE_API_KEY, TYPESENSE_HOST | Low | 2 | Search engine for properties, knowledge, institutions, directories. |
| 31 | Meilisearch | Search/open-source | Fast search, indexes, simple deployment | Self-host/cloud API | https://www.meilisearch.com/docs | Open-source self-host; cloud paid | MEILI_MASTER_KEY, MEILI_HOST | Low | 2 | Alternative to Typesense for knowledge and marketplace MVP. |
| 32 | Qdrant | Vector DB/open-source | Semantic search, memory, embeddings | API/SDK/self-host/cloud | https://qdrant.tech/documentation/ | Open-source self-host; cloud free/paid | QDRANT_API_KEY, QDRANT_URL | Medium | 3 | Use for ATLAS/ABBA memory with privacy partitioning. |
| 33 | pgvector | Database extension | Semantic search inside Postgres | SQL extension | https://github.com/pgvector/pgvector | Free/open-source | DATABASE_URL | Medium | 3 | Use first before external vector DB for low-hassle setup. |
| 34 | OpenStreetMap / Nominatim | Maps/geocoding/open data | Maps, location, geocoding | Open data/API/self-host | https://www.openstreetmap.org/ / https://nominatim.org/release-docs/latest/api/Overview/ | Free with usage policy; self-host for scale | OSM_TILE_URL, NOMINATIM_URL | Low | 2 | First map route for BUNK and field ops; respect usage limits. |
| 35 | Mapbox | Maps/API/SDK | Maps, geocoding, routes, visual layers | SDK/API/token | https://docs.mapbox.com/ | Free tier then usage-based | MAPBOX_TOKEN | Low | 2 | Use for polished marketplace UX once traffic grows. |
| 36 | Google Maps Platform | Maps/API | Places, geocoding, maps, routes | API keys, SDKs | https://developers.google.com/maps/documentation | Monthly credit/usage pricing; key restrictions needed | GOOGLE_MAPS_API_KEY | Medium | 2 | Use for places/geocoding where accuracy matters; restrict keys. |
| 37 | Canva Connect API | Design/API | Brand/design generation, templates, export, media workflows | OAuth/API | https://www.canva.dev/docs/connect/ | Developer access; usage depends on Canva plan | CANVA_CLIENT_ID, CANVA_CLIENT_SECRET | Low | 2 | Use for launch kits, partner assets, property cards, campaign templates. |
| 38 | Figma API | Design/API | Design files, tokens, prototypes, handoff | OAuth/personal access token/API | https://www.figma.com/developers/api | Free/paid plan constraints | FIGMA_ACCESS_TOKEN | Low | 2 | Use for design-system sync and investor/demo assets. |
| 39 | Plunk / Listmonk | Open-source email marketing | Campaigns, newsletters, transactional mail alternative | Self-host/API | https://github.com/useplunk/plunk / https://listmonk.app/docs/ | Open-source self-host | PLUNK_API_KEY, LISTMONK_API_KEY | Low | 2 | Use for ecosystem newsletters if Resend/CRM cost grows. |
| 40 | PostHog | Product analytics/open-source | Events, funnels, feature flags, recordings | JS SDK/API/self-host/cloud | https://posthog.com/docs | Free tier/self-host available; paid by events | POSTHOG_KEY, POSTHOG_HOST | Medium | 3 | Use for growth and activation analytics; disable sensitive session capture. |
| 41 | Sentry | Observability | Error tracking, tracing, release health | SDK/API | https://docs.sentry.io/ | Free/paid tiers | SENTRY_DSN, SENTRY_AUTH_TOKEN | Low | 2 | Default error reporting for every product app. |
| 42 | OpenTelemetry | Observability/open standard | Logs, metrics, traces | SDK/collector/exporters | https://opentelemetry.io/docs/ | Free standard; infra cost varies | OTEL_EXPORTER_OTLP_ENDPOINT, OTEL_HEADERS | Low | 2 | Add observability standard across swarms/services. |
| 43 | Grafana / Prometheus | Observability/open-source | Metrics, dashboards, alerts | Self-host/cloud | https://grafana.com/docs/ / https://prometheus.io/docs/ | Open-source self-host; cloud paid/free options | GRAFANA_API_KEY, PROMETHEUS_URL | Medium | 3 | Use for infra and provider-health dashboards. |
| 44 | Cloudflare | Edge/security/cloud | DNS, CDN, WAF, Turnstile, Workers, R2, D1 | Dashboard/API/SDK | https://developers.cloudflare.com/ | Generous free tiers; paid security/usage | CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID | Medium | 3 | Use DNS/security edge, bot protection, media cache, proof manifests. |
| 45 | MinIO | Storage/open-source | S3-compatible object storage | Self-host/S3 SDK | https://min.io/docs/minio/container/index.html | Open-source self-host | MINIO_ACCESS_KEY, MINIO_SECRET_KEY | Medium | 3 | Local/dev/private storage route; integrate with VAULT abstraction. |
| 46 | AWS S3 | Cloud storage/API | Object storage, backup, static assets | S3 API/IAM | https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html | Free tier limited; usage-based | AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION | Medium | 3 | Production archival storage where compliance requires mature controls. |
| 47 | Tailscale | Secure networking | Private network, admin access, webhook private delivery | Auth key, ACLs, subnet routers | https://tailscale.com/kb | Free personal/team tiers; paid business | TAILSCALE_AUTHKEY | Medium | 3 | Secure internal admin, n8n, DB tools, private agents. |
| 48 | Coolify | Open-source PaaS | Self-host deployments, apps, databases, backups | Docker/server install | https://coolify.io/docs | Open-source/self-host; server cost | COOLIFY_API_TOKEN | Medium | 3 | Backup low-cost deployment route for non-Vercel apps. |
| 49 | Appwrite | Open-source BaaS | Auth, DB, functions, storage | SDK/API/self-host/cloud | https://appwrite.io/docs | Free/self-host/cloud paid | APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, APPWRITE_API_KEY | Medium | 3 | Alternative BaaS for products that need vendor diversity. |
| 50 | Directus | Open-source data/admin | Headless CMS, data studio, admin layer | API/self-host/cloud | https://docs.directus.io/ | Open-source self-host; cloud paid | DIRECTUS_TOKEN, DIRECTUS_URL | Medium | 3 | Use for admin CMS over structured data, not as authority for high-risk records. |
| 51 | Strapi | Open-source CMS | Content, APIs, website CMS | Self-host/API | https://docs.strapi.io/ | Open-source self-host; cloud paid | STRAPI_API_TOKEN | Low | 2 | Use for public content sites, media, launch pages. |
| 52 | WordPress REST API | CMS/API | Content publishing, ecosystem blogs | REST API, plugins | https://developer.wordpress.org/rest-api/ | Open-source; hosting/plugin costs | WORDPRESS_APP_PASSWORD, WORDPRESS_URL | Low | 2 | Use if nontechnical editors need content workflow. |
| 53 | Medusa | Open-source commerce | Commerce backend, products, orders, marketplace experiments | API/self-host | https://docs.medusajs.com/ | Open-source self-host; hosting cost | MEDUSA_BACKEND_URL, MEDUSA_ADMIN_TOKEN | Medium | 3 | Use for marketplace/storefront routes, not regulated finance. |
| 54 | Odoo Community | Open-source ERP/CRM | CRM, invoicing, inventory, helpdesk, HR | Self-host/API/XML-RPC/JSON-RPC | https://www.odoo.com/documentation/ | Community/self-host path; enterprise paid | ODOO_URL, ODOO_API_KEY | Medium | 3 | Candidate back-office for ABBA MAS ops if custom admin is delayed. |
| 55 | ERPNext / Frappe | Open-source ERP | Accounting, CRM, HR, assets, support | Self-host/API | https://frappeframework.com/docs / https://docs.erpnext.com/ | Open-source self-host; cloud paid | ERPNEXT_API_KEY, ERPNEXT_API_SECRET | Medium | 3 | Strong low-cost operations backbone; evaluate before custom ERP build. |
| 56 | Twenty CRM | Open-source CRM | Relationship management, pipeline, contacts | Self-host/API | https://twenty.com/developers | Open-source/cloud options | TWENTY_API_KEY | Low | 2 | Lightweight CRM for partners/investor/founder network. |
| 57 | SuiteCRM | Open-source CRM | Sales/support CRM | Self-host/API | https://docs.suitecrm.com/developer/api/ | Open-source self-host | SUITECRM_CLIENT_ID, SUITECRM_CLIENT_SECRET | Medium | 3 | Consider for enterprise CRM if Twenty is too light. |
| 58 | DocuSign | E-signature/API | Contracts, envelopes, signatures | API/OAuth/webhooks | https://developers.docusign.com/docs/ | Sandbox; paid production | DOCUSIGN_CLIENT_ID, DOCUSIGN_PRIVATE_KEY_REF | High | 3 | Use for legal agreements where enforceability matters. |
| 59 | SignWell | E-signature/API | Simpler e-signature workflows | API/webhooks | https://developers.signwell.com/ | Free/paid plans; API may require paid | SIGNWELL_API_KEY | Medium | 3 | Lower-friction signature route for pilots. |
| 60 | PDF generation stack: Playwright/React-PDF | Open-source software | Receipts, agreements, proposals, proof sheets | npm packages/server jobs | https://playwright.dev/ / https://react-pdf.org/ | Free/open-source | None; storage keys only | Medium | 3 | Use for generated documents stored in VAULT with hashes. |
| 61 | Tesseract OCR | Open-source software | OCR for documents/images | Library/CLI | https://tesseract-ocr.github.io/ | Free/open-source | None | Medium | 3 | Use only as assistant evidence extraction, not final verification. |
| 62 | Docling | Open-source document AI | Parse PDFs/docs for knowledge ingestion | Python package | https://github.com/docling-project/docling | Free/open-source | None | Medium | 3 | Use for ATLAS ingestion pipeline with redaction and review. |
| 63 | Unstructured | Document ETL | Parse documents into chunks/metadata | Open-source/API | https://docs.unstructured.io/ | Open-source + paid API | UNSTRUCTURED_API_KEY | Medium | 3 | Use for knowledge ingestion and document normalization. |
| 64 | LangGraph | AI agents/open-source | Durable agent workflows, state machines | Python/JS SDK | https://langchain-ai.github.io/langgraph/ | Open-source; LangSmith optional paid | LANGSMITH_API_KEY | Medium | 3 | Use for complex ABBA swarm workflows with explicit state. |
| 65 | CrewAI | AI agents/open-source | Multi-agent orchestration | Python package/cloud | https://docs.crewai.com/ | Open-source + paid platform | CREWAI_API_KEY | Medium | 3 | Prototype internal swarms; production only after tool-permission hardening. |
| 66 | AutoGen | AI agents/open-source | Agent collaboration, tool use | Python package | https://microsoft.github.io/autogen/ | Open-source | None/provider keys | Medium | 3 | Research route for ABBA swarm experiments. |
| 67 | Dify | AI app builder/open-source | AI workflows, RAG, agents, app publishing | Self-host/cloud/API | https://docs.dify.ai/ | Open-source self-host; cloud paid | DIFY_API_KEY | Medium | 3 | Low-code ABBA assistant builder for prototypes. |
| 68 | Flowise | AI workflow builder/open-source | Visual LLM chains and agents | Self-host/API | https://docs.flowiseai.com/ | Open-source self-host | FLOWISE_API_KEY | Medium | 3 | Fast prototyping for AI routes; keep behind internal auth. |
| 69 | Langfuse | LLM observability/open-source | Prompt traces, evaluations, cost tracking | SDK/API/self-host/cloud | https://langfuse.com/docs | Open-source self-host; cloud tiers | LANGFUSE_PUBLIC_KEY, LANGFUSE_SECRET_KEY | Medium | 3 | Required for ABBA AI audit trail and cost governance. |
| 70 | Rasa | Open-source conversational AI | Intent routing, support bots, on-prem assistants | Python/self-host/API | https://rasa.com/docs/ | Open-source/pro options | RASA_TOKEN | Medium | 3 | Consider for deterministic support flows where LLMs are too risky. |
| 71 | Botpress | AI agent/bot builder | Chatbots, workflows, webchat | Cloud/API | https://botpress.com/docs | Free/paid tiers | BOTPRESS_TOKEN | Medium | 3 | Use for customer support prototypes if faster than custom. |
| 72 | Retool | Low-code internal tools | Admin panels, ops consoles | SaaS/self-host, DB/API connectors | https://docs.retool.com/ | Free/paid tiers; self-host options | RETOOL_API_KEY | Medium | 3 | Rapid admin panels while custom admin matures. |
| 73 | Appsmith | Open-source low-code | Internal tools over DB/APIs | Self-host/cloud | https://docs.appsmith.com/ | Open-source self-host; paid cloud | APPSMITH_TOKEN | Medium | 3 | Low-cost admin console for operational teams. |
| 74 | Budibase | Open-source low-code | Internal apps, forms, approvals | Self-host/cloud/API | https://docs.budibase.com/ | Open-source self-host; paid plans | BUDIBASE_API_KEY | Medium | 3 | Build SEAL queues and ops panels quickly. |
| 75 | ToolJet | Open-source low-code | Internal dashboards and tools | Self-host/cloud/API | https://docs.tooljet.com/ | Open-source self-host; paid cloud | TOOLJET_API_KEY | Medium | 3 | Alternative internal-tool builder. |
| 76 | NocoDB | Open-source Airtable alternative | Spreadsheet UI over DB, quick data apps | Self-host/API | https://docs.nocodb.com/ | Open-source self-host | NOCODB_API_TOKEN | Medium | 3 | Quick data workspace for early ops; not system of record for proof. |
| 77 | Baserow | Open-source no-code DB | Airtable-like tables and APIs | Self-host/cloud/API | https://baserow.io/docs | Open-source self-host; cloud tiers | BASEROW_TOKEN | Medium | 3 | Nontechnical back-office tables for pilot ops. |
| 78 | Airtable | No-code database/API | CRM, lightweight ops databases | API/webhooks/automations | https://airtable.com/developers/web/api/introduction | Free/paid tiers | AIRTABLE_API_KEY, AIRTABLE_BASE_ID | Medium | 3 | Use only for non-sensitive MVP ops; sync to system records. |
| 79 | Notion API | Knowledge/workspace/API | Docs, lightweight databases, dashboards | OAuth/API | https://developers.notion.com/ | Free/paid workspace tiers | NOTION_API_KEY | Low | 2 | Use for planning/wiki; do not store secrets or regulated data. |
| 80 | Google Drive/Docs/Sheets APIs | Workspace/API | Docs, spreadsheets, forms, uploads | OAuth/API | https://developers.google.com/workspace | Free quotas; OAuth verification may apply | GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET | Medium | 3 | Use for controlled document workflows and exports only with consent. |
| 81 | Slack API | Communication/workflow | Internal alerts, commands, approvals | OAuth/app/webhooks | https://api.slack.com/docs | Free/paid workspace tiers | SLACK_BOT_TOKEN, SLACK_SIGNING_SECRET | Medium | 3 | Optional team alert channel for SEAL queues and provider health. |
| 82 | Discord API | Community/API | Community, bots, support rooms | Bot token/webhooks | https://discord.com/developers/docs/intro | Free to start | DISCORD_BOT_TOKEN | Low | 2 | Use for builder/community channels, not high-risk approvals. |
| 83 | Telegram Bot API | Messaging/API | Notifications, support bots | Bot token/webhooks | https://core.telegram.org/bots/api | Free | TELEGRAM_BOT_TOKEN | Low | 2 | Lightweight internal alerts and community bots. |
| 84 | Matrix / Element | Open communication | Secure federated chat | Self-host/API | https://matrix.org/docs/ | Open-source/self-host | MATRIX_ACCESS_TOKEN | Medium | 3 | Consider for sovereign ecosystem communication. |
| 85 | Mattermost | Open-source team chat | Internal chat, incident ops | Self-host/API/webhooks | https://developers.mattermost.com/ | Open-source self-host; paid enterprise | MATTERMOST_TOKEN | Medium | 3 | Self-host alternative to Slack for sensitive ops. |
| 86 | Keycloak | Open-source identity/IAM | SSO, realm management, federation | Self-host/OIDC/SAML/API | https://www.keycloak.org/documentation | Free/open-source; ops overhead | KEYCLOAK_CLIENT_SECRET | High | 4 | Mature IAM path when ABBA MAS needs enterprise identity. |
| 87 | Zitadel | Open-source identity | OIDC, login, orgs, machine users | Cloud/self-host/API | https://zitadel.com/docs | Free/self-host/cloud tiers | ZITADEL_CLIENT_SECRET | High | 4 | Alternative enterprise IAM with modern org/project model. |
| 88 | Ory | Open-source identity stack | Auth, permissions, consent | Cloud/self-host/API | https://www.ory.sh/docs | Open-source/cloud paid | ORY_API_KEY | High | 4 | Advanced identity/privacy route; useful for Web9 architecture. |
| 89 | OpenFGA | Authorization/open-source | Relationship-based access control | API/self-host/cloud | https://openfga.dev/docs | Open-source; cloud options | OPENFGA_API_TOKEN | High | 4 | Use for HAPI relationship permissions and cross-product access. |
| 90 | Casbin | Authorization/open-source | Policy enforcement library | Library/adapters | https://casbin.org/docs/overview | Free/open-source | None | Medium | 3 | Lightweight authorization engine for products before OpenFGA. |
| 91 | MinIO + ClamAV | Storage/security | Malware scanning and quarantine for uploads | Self-host containers/hooks | https://docs.clamav.net/ | Free/open-source | CLAMAV_HOST | Medium | 3 | Add to VAULT before accepting property/legal docs at scale. |
| 92 | YOLO/Ultralytics | Vision/open-source | Object detection, field inspection support | Python package/API | https://docs.ultralytics.com/ | Open-source/commercial considerations | None/provider keys | Medium | 3 | Use for assisted inspection, never final proof without human review. |
| 93 | OpenCV | Vision/open-source | Image analysis, duplicate detection, media processing | Library | https://docs.opencv.org/ | Free/open-source | None | Medium | 3 | Use for duplicate property images and document preprocessing. |
| 94 | ESPHome / Home Assistant | Hardware/software | IoT sensors, property devices, energy/occupancy | Self-host integrations/MQTT/API | https://esphome.io/ / https://developers.home-assistant.io/ | Open-source hardware/software | MQTT_USERNAME, MQTT_PASSWORD | High | 4 | Future property ops route; explicit consent and safety policy required. |
| 95 | MQTT / Mosquitto | Hardware protocol | IoT messaging, devices, sensors | Broker/protocol | https://mosquitto.org/documentation/ | Open-source self-host | MQTT_USERNAME, MQTT_PASSWORD | High | 4 | Use for controlled pilots, not public consumer devices yet. |
| 96 | WebAuthn / Passkeys | Web9 identity standard | Device-bound login, phishing-resistant auth | Browser APIs/server library | https://webauthn.guide/ | Free standard | PASSKEY_RP_ID, PASSKEY_RP_ORIGIN | Medium | 3 | Add after base auth; ideal for admins and SEAL approvers. |
| 97 | OpenAPI / Scalar / Swagger UI | API documentation | API schemas, docs, client generation | Spec, UI packages | https://spec.openapis.org/oas/latest.html / https://scalar.com/docs | Free/open-source options | None | Low | 2 | Document every ABBA MAS API and expose partner-safe endpoints. |
| 98 | Temporal | Workflow engine | Durable workflows, retries, stateful orchestration | SDK/server/cloud | https://docs.temporal.io/ | Open-source self-host; cloud paid | TEMPORAL_ADDRESS, TEMPORAL_NAMESPACE | Medium | 3 | Use for mission-critical workflows after n8n prototypes stabilize. |
| 99 | BullMQ / Redis | Queue/open-source | Background jobs, notifications, retries | Node package/Redis | https://docs.bullmq.io/ / https://redis.io/docs/ | Open-source/self-host/cloud paid | REDIS_URL | Medium | 3 | First-code queue for jobs that should not live in request handlers. |
| 100 | Hasura | GraphQL API | Instant GraphQL over Postgres, permissions | Self-host/cloud/API | https://hasura.io/docs/latest/index/ | Free/open-source/cloud paid | HASURA_GRAPHQL_ADMIN_SECRET | High | 4 | Useful for partner APIs; ensure permission model aligns with SEAL. |

## Recommended first implementation bundle

### Bundle A: Carbon Actual Core OS

- Supabase: database/auth/storage/realtime.
- Vercel: deployment and previews.
- GitHub: source, issues, PRs, Actions, webhooks.
- n8n: workflow and integration bus.
- OpenAI + Gemini + Anthropic + OpenRouter: ABBA provider router.
- Resend: email.
- Sentry + PostHog + Langfuse: observability and AI audit.
- Paystack: Nigeria payment activation.

### Bundle B: Trust, identity, and proof

- Google Identity and passkeys for low-friction auth.
- OpenFGA/Casbin for relationship permissions.
- EAS/IPFS/Arweave only for public proof after SEAL 4.
- ClamAV/OpenCV/Tesseract/Docling for evidence ingestion and review.

### Bundle C: Growth and operations

- Canva + Figma for launch assets.
- Cal.com + Google Calendar for scheduling.
- Twilio/WhatsApp/Telegram/Slack for communications.
- Retool/Appsmith/Budibase/NocoDB for temporary admin tools.

## Standard secret naming policy

- Never paste raw keys into chat, docs, issues, or commits.
- Use environment variable names only.
- Store secrets in Vercel Environment Variables, GitHub Actions Secrets, Supabase Vault/edge secrets, or an approved secret manager.
- Rotate keys immediately if any raw value is exposed.
- Use separate development, staging, and production credentials.

## Activation checklist per integration

1. Confirm lawful use and territory support.
2. Create provider account under Carbon Actual-controlled email/domain.
3. Enable MFA on provider account.
4. Create least-privilege API key.
5. Store key in approved secrets manager.
6. Add `.env.example` name only.
7. Create adapter module in `/packages/integrations/<provider>`.
8. Add webhook signature verification where applicable.
9. Add audit and Pulse events.
10. Add SEAL gate for high-risk actions.
11. Add test/sandbox credentials only in non-production.
12. Add provider health check.
13. Add cost guardrail and usage alert.

## Notes

- Payments, identity verification, public proof, and treasury actions need higher SEAL and jurisdiction-specific review.
- Blockchain proof should begin with hashes/attestations only, not raw personal or sensitive records.
- No-code tools should accelerate pilots, but verified records should sync into Carbon Actual systems of record.
- AI agents may recommend, classify, and route. They must not approve, reject, release funds, publish public proof, or modify verified records without human SEAL.
