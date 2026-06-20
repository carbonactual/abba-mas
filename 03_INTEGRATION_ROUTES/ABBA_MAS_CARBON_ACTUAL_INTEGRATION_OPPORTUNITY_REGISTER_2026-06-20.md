# ABBA MAS / Carbon Actual Integration Opportunity Register

Date researched: 2026-06-20

Purpose: identify lawful, low-friction integration routes for ABBA MAS and the Carbon Actual ecosystem. This register records route type, function class, access method, cost notes, risk level, SEAL level, secret names, and activation path. Do not store raw API secrets in this file or in chat.

## SEAL mapping used

- SEAL 0: discover/reference only.
- SEAL 1: self-use, drafting, testing, sandbox, local prototype.
- SEAL 2: bounded reversible operations, automation, routing, notifications, publishing approved content.
- SEAL 3: consequential actions affecting money, identity, records, certification, access, status, customer communication, or third-party accounts.
- SEAL 4: ecosystem-wide governance, sovereign identity root, irreversible authority, protocol rule changes.

## Priority activation lanes

1. Foundation lane: GitHub + Supabase + Cloudflare/Vercel + OpenAI.
2. Automation lane: n8n + GitHub Actions + scheduled agents + webhooks.
3. Communication lane: Twilio + SendGrid/Brevo/WhatsApp + CRM/event logs.
4. Identity/proof lane: W3C DID/VC + OpenAttestation/SpruceID + Sign Protocol/EAS + GitHub artifact attestations.
5. Data/impact lane: KoboToolbox/OpenDataKit + IoT/MQTT + Postgres + dashboards.
6. Revenue lane: Stripe/Paystack/Flutterwave + metered billing + partner white-label licensing.

---

## Integration opportunities

| # | Route / platform | Route type | Function classification | Access method | Setup links | Cost/free-tier notes | Secret names only | Risk | SEAL | Recommended activation path |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | OpenAI API, Responses API, Agents SDK, Realtime, Webhooks | API, SDK, agent runtime, webhook | ABBA MAS reasoning, drafting, agent orchestration, voice agent, structured outputs, tool use | API key, SDK, server webhook endpoint | https://developers.openai.com/api/docs/quickstart ; https://developers.openai.com/api/docs/guides/webhooks ; https://openai.com/api/pricing/ | Usage-based; no raw free-tier assumption. Use low-cost models and spending limits. | OPENAI_API_KEY, OPENAI_WEBHOOK_SECRET | Medium | SEAL 2 for drafts/routing; SEAL 3 for record updates; SEAL 4 forbidden without governance approval | Start with server-side Responses API wrapper. Add webhook verification. Expose MAS tools only through scoped service functions with audit logs. |
| 2 | ChatGPT Apps SDK / MCP apps | App SDK, MCP server | User-facing Carbon Actual assistant, marketplace-style app, authenticated actions | OAuth/MCP server, signed tool calls | https://developers.openai.com/api/docs/quickstart ; https://developers.openai.com/api/docs/guides/tools-mcp | Build cost mainly hosting + API usage. | OPENAI_API_KEY, APP_OAUTH_CLIENT_SECRET | Medium | SEAL 2/3 | Build read-only MCP first: search registry, explain #/SEAL, draft proposals. Add write tools after SEAL gates. |
| 3 | Supabase | Backend-as-a-service, Postgres, Auth, Realtime, Edge Functions, Storage | Identity registry, SEAL ledger, audit logs, user/org auth, product/app data | Dashboard, CLI, REST/GraphQL, client SDKs, service role key | https://supabase.com/docs ; https://supabase.com/pricing | Free project path available, but quotas change; production likely Pro. Self-host possible. | SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_JWT_SECRET | Medium | SEAL 2 for app data; SEAL 3 for identity/authority ledger | Create `identities`, `seals`, `delegations`, `proofs`, `audit_events`. Enforce Row Level Security and never expose service role key client-side. |
| 4 | n8n | Low-code automation, webhook, self-host/cloud | Workflow engine for intake, routing, notifications, research scouts, CRM sync | Cloud account or self-host Docker, webhooks, credentials vault | https://docs.n8n.io/ ; https://docs.n8n.io/hosting/ ; https://n8n.io/pricing/ ; https://github.com/n8n-io/n8n | Cloud trial/paid; self-host can be low-cost. n8n is fair-code, not classic permissive OSS. | N8N_ENCRYPTION_KEY, N8N_BASIC_AUTH_USER, N8N_BASIC_AUTH_PASSWORD, N8N_WEBHOOK_SECRET | High if public/self-hosted poorly; recent security reports require strict upgrades | SEAL 2 for routing; SEAL 3 only with human approval node | Use n8n only behind auth, latest version, HTTPS, restricted webhooks, no unrestricted Code/Execute Command nodes. Connect to Supabase and GitHub. |
| 5 | GitHub Actions | CI/CD, automation, workflow, attestations | Repository automation, tests, docs generation, scheduled scouts, deployments | YAML workflows, GitHub App/token, secrets, OIDC | https://docs.github.com/en/actions ; https://docs.github.com/en/webhooks ; https://docs.github.com/en/rest | Free minutes for many public/private use cases; paid at scale. | GITHUB_TOKEN, GH_APP_PRIVATE_KEY, GH_APP_ID, GH_WEBHOOK_SECRET | Medium | SEAL 2; SEAL 3 for release/deploy; SEAL 4 for governance docs | Add workflows for linting, schema validation, doc index generation, artifact attestations, and deployment. Require protected branches and approvals. |
| 6 | GitHub Webhooks / GitHub Apps | Webhook/API | Convert repo events into MAS actions, audit, issue routing, PR review | GitHub App, webhook secret, REST API | https://docs.github.com/en/webhooks ; https://docs.github.com/en/rest | GitHub App is free; compute/storage elsewhere. | GH_WEBHOOK_SECRET, GH_APP_PRIVATE_KEY | Medium | SEAL 2 | Build `repo_event_ingest` endpoint; validate signatures; map repo events to `audit_events`. |
| 7 | Cloudflare Workers | Edge compute, API gateway, cron, queue, durable objects, KV/R2/D1 | Public API edge, webhook receiver, proof resolver, MAS microservices, rate limiting | Cloudflare dashboard, Wrangler CLI, Workers secrets | https://developers.cloudflare.com/workers/ ; https://www.cloudflare.com/products/workers/ | Free/low-cost developer path; paid for scale and advanced quotas. | CLOUDFLARE_API_TOKEN, CF_ACCOUNT_ID, CF_WORKER_SECRET | Medium | SEAL 2/3 | Deploy edge API gateway with request signing, rate limits, webhook verification, and audit forwarding to Supabase. |
| 8 | Vercel | Frontend/cloud functions/deployment | ABBA MAS web app, dashboards, landing pages, admin console | Git integration, environment variables, serverless/edge functions | https://vercel.com/docs ; https://vercel.com/pricing | Hobby/free for early prototype; Pro for team/production. | VERCEL_TOKEN, VERCEL_PROJECT_ID, VERCEL_ORG_ID | Medium | SEAL 1/2; SEAL 3 for admin console | Deploy Next.js app with Supabase Auth, public landing pages, protected dashboard, and server-only MAS tools. |
| 9 | Twilio Voice, Messaging, Verify, Flex, Studio, SendGrid | Communications API, call-center, visual workflows | SMS/WhatsApp/voice, OTP, contact center, agent handoff, campaign/email | Twilio console, API keys, webhooks, Studio builder | https://www.twilio.com/docs ; https://www.twilio.com/en-us/pricing | Trial credits often available; production is usage-based and compliance-bound. | TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_API_KEY, TWILIO_API_SECRET, TWILIO_WEBHOOK_SECRET, SENDGRID_API_KEY | High because communication, consent, telecom compliance | SEAL 3 | Start with Verify OTP and inbound support number. Add Studio flows. Require consent logs, opt-out handling, and jurisdiction review. |
| 10 | Stripe | Payments, billing, webhooks | Subscriptions, usage billing, invoices, marketplace-like payments | API keys, Checkout, Billing, webhooks | https://docs.stripe.com/ ; https://stripe.com/pricing | No monthly fee for basic API; transaction fees apply. | STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, STRIPE_PRICE_ID | High because money | SEAL 3 | Use Checkout first, then Billing. Store only Stripe customer/subscription IDs. Every payment action must be auditable and reversible where possible. |
| 11 | Paystack | Payments, Africa-friendly checkout | Nigeria/Africa payment collection for Carbon Actual services | API keys, webhooks, dashboard | https://paystack.com/docs/ ; https://paystack.com/pricing | Transaction fees; local rails. | PAYSTACK_SECRET_KEY, PAYSTACK_WEBHOOK_SECRET | High | SEAL 3 | Use for Nigerian market payments; reconcile to Supabase ledger; no card data storage. |
| 12 | Flutterwave | Payments, Africa/global checkout | Multi-country African payments, payouts, subscriptions | API keys, webhooks | https://developer.flutterwave.com/docs ; https://flutterwave.com/us/pricing | Transaction fees; country-specific rules. | FLUTTERWAVE_SECRET_KEY, FLUTTERWAVE_WEBHOOK_SECRET | High | SEAL 3 | Keep as secondary African payment rail after Paystack; activate only with finance controls. |
| 13 | Airtable | No-code database/CRM | Lightweight partner CRM, grant pipeline, integration tracker | API token, bases, webhooks/automations | https://airtable.com/developers/web/api/introduction ; https://airtable.com/pricing | Free plan exists with limits; paid for scale. | AIRTABLE_API_KEY, AIRTABLE_BASE_ID | Medium | SEAL 2 | Use as quick operator CRM while canonical authority records remain in Supabase. |
| 14 | Baserow | Open-source/no-code database | Open-source alternative to Airtable for internal registry/admin | Self-host/cloud API | https://baserow.io/docs/index ; https://gitlab.com/baserow/baserow | Free self-host path; paid hosted plans. | BASEROW_API_TOKEN | Medium | SEAL 2 | Use if Airtable cost/data residency becomes blocker. |
| 15 | Appwrite | Open-source backend | Alternative backend for auth, functions, storage, database | Cloud/self-host SDKs | https://appwrite.io/docs ; https://github.com/appwrite/appwrite | Free/self-host path; cloud has quotas. | APPWRITE_API_KEY, APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID | Medium | SEAL 2 | Keep as fallback to Supabase for apps needing all-in-one open-source backend. |
| 16 | Hasura | GraphQL API over Postgres | Agent-ready GraphQL layer for Carbon Actual data | Docker/cloud, admin secret, metadata | https://hasura.io/docs/latest/index/ ; https://github.com/hasura/graphql-engine | Open-source/community + paid cloud/enterprise. | HASURA_GRAPHQL_ADMIN_SECRET, HASURA_JWT_SECRET | Medium | SEAL 2/3 | Use after Supabase schema stabilizes; expose strictly scoped GraphQL views for agents and dashboards. |
| 17 | PostHog | Product analytics/open-source | User journey analytics, funnels, feature flags, session replay | JS SDK, backend SDK, self-host/cloud | https://posthog.com/docs ; https://github.com/PostHog/posthog | Free tier/cloud and self-host options; paid at scale. | POSTHOG_KEY, POSTHOG_HOST | Medium | SEAL 2; SEAL 3 if personally identifiable analytics | Track activation, conversion, retention. Avoid sensitive identity/SEAL details in analytics events. |
| 18 | Metabase | BI/dashboard open-source | Operator dashboards, impact dashboards, governance metrics | DB connection, self-host/cloud | https://www.metabase.com/docs/latest/ ; https://github.com/metabase/metabase | Open-source self-host; paid cloud. | METABASE_SECRET_KEY, METABASE_DB_PASS | Medium | SEAL 2 | Deploy read-only dashboards from Supabase replica/views. |
| 19 | Grafana + Prometheus/Loki | Observability | System monitoring, logs, traces for MAS services | Agents/exporters, dashboards, cloud/self-host | https://grafana.com/docs/ ; https://prometheus.io/docs/introduction/overview/ | Free OSS; cloud free tiers vary. | GRAFANA_TOKEN, PROMETHEUS_REMOTE_WRITE_KEY | Medium | SEAL 2 | Monitor uptime, webhook errors, agent latency, payment failures. |
| 20 | Sentry | Error monitoring | Runtime error tracking for frontend/backend/agents | SDK DSN, release integration | https://docs.sentry.io/ | Developer free tier commonly available; paid at scale. | SENTRY_DSN, SENTRY_AUTH_TOKEN | Medium | SEAL 2 | Add to Vercel/Cloudflare/Supabase functions; scrub PII and secrets. |
| 21 | OpenTelemetry | Open standard observability | Vendor-neutral traces across agents, APIs, workers | SDK/collector | https://opentelemetry.io/docs/ | Open-source; hosting cost only. | OTEL_EXPORTER_OTLP_HEADERS | Low | SEAL 2 | Add trace IDs to every final action and proof event. |
| 22 | W3C Decentralized Identifiers (DID) | Identity standard | Web9-style identity route for # identity records | DID methods, DID documents, resolvers | https://www.w3.org/TR/did-core/ | Standard is free; implementation cost varies. | DID_CONTROLLER_PRIVATE_KEY_REF | High | SEAL 3/4 | Use DID as optional external proof layer, not as sole identity root. Map internal # to DID where lawful and useful. |
| 23 | W3C Verifiable Credentials | Credential/proof standard | Credentials for membership, certification, authority delegation, impact claims | VC issuer/verifier libraries, wallets | https://www.w3.org/TR/vc-data-model-2.0/ | Standard is free; wallet/issuer tools vary. | VC_ISSUER_KEY_REF | High | SEAL 3/4 | Issue test credentials only for non-critical claims first. Require revocation registry and dispute route. |
| 24 | SpruceID / DIDKit / SSI tools | Open-source SSI libraries/platform | DID/VC issuance, signing, verification | SDKs, CLI, hosted services | https://www.spruceid.com/ ; https://github.com/spruceid/didkit | OSS tools plus commercial services. | SPRUCE_API_KEY, SSI_SIGNING_KEY_REF | High | SEAL 3 | Pilot VC issuance for ABBA MAS member/partner credentials. |
| 25 | OpenAttestation | Document proof/open-source | Tamper-evident certificates, credentials, governance docs | CLI, smart contract/document store | https://www.openattestation.com/ ; https://github.com/Open-Attestation/open-attestation | Open-source; blockchain/document store costs vary. | OA_DOCUMENT_STORE_PRIVATE_KEY_REF | High | SEAL 3/4 | Use for public certificates or institutional docs only after legal review. |
| 26 | Ethereum Attestation Service (EAS) | Blockchain attestation protocol | On-chain/off-chain attestations for proofs, claims, SEAL receipts | SDK, schemas, attestation registry | https://attest.org/ ; https://github.com/ethereum-attestation-service/eas-sdk | Gas fees if on-chain; off-chain path lower cost. | EAS_PRIVATE_KEY_REF, EAS_SCHEMA_UID | High | SEAL 3/4 | Start off-chain/private attestations; publish only non-sensitive proofs. |
| 27 | Sign Protocol | Attestation/proof protocol | Multi-chain attestations for proof receipts and partner claims | SDK/API, schemas | https://docs.sign.global/ | Costs vary by chain/API plan. | SIGN_PROTOCOL_API_KEY, SIGNER_PRIVATE_KEY_REF | High | SEAL 3/4 | Evaluate against EAS; use one canonical attestation model to avoid proof fragmentation. |
| 28 | OpenZeppelin | Smart contract libraries/security | Governance/proof contracts, access control, tokenized proof experiments | npm packages, Defender services | https://docs.openzeppelin.com/ ; https://github.com/OpenZeppelin/openzeppelin-contracts | OSS libraries; Defender paid tiers may apply. | OZ_DEFENDER_API_KEY, OZ_DEFENDER_SECRET | High | SEAL 4 for governance contracts | Use only when a blockchain contract is genuinely needed. Start with audited templates and testnet only. |
| 29 | Chainlink Functions / Automation | Oracle, automation, proof bridge | Bring external data/proofs into chain workflows | Chainlink docs, smart contracts, subscriptions | https://docs.chain.link/ | Testnet free-ish; mainnet oracle/gas costs. | CHAINLINK_SUBSCRIPTION_ID, WALLET_PRIVATE_KEY_REF | High | SEAL 3/4 | Keep as later-stage bridge for verifiable environmental/market data, not MVP. |
| 30 | IPFS / Filecoin / Pinata / web3.storage | Decentralized storage/proof | Store public proof artifacts, hashes, media evidence | APIs, pinning services, CIDs | https://docs.ipfs.tech/ ; https://docs.pinata.cloud/ ; https://docs.filecoin.io/ | Free/paid pinning tiers vary. | PINATA_JWT, WEB3_STORAGE_TOKEN | Medium | SEAL 2/3 | Store hashes publicly, sensitive documents privately. Link proof CID to Supabase `proofs`. |
| 31 | Ceramic / ComposeDB | Decentralized data/identity graph | Portable identity/profile streams, reputation graph | Nodes, SDKs | https://developers.ceramic.network/ | OSS/protocol; hosted node costs vary. | CERAMIC_SEED_REF | Medium/High | SEAL 3 | Research route only until internal #/SEAL model is stable. |
| 32 | Keycloak | Open-source identity and access management | Enterprise SSO, roles, OIDC/SAML, realm governance | Self-host, OIDC/SAML | https://www.keycloak.org/documentation ; https://github.com/keycloak/keycloak | Free OSS; hosting/maintenance cost. | KEYCLOAK_ADMIN_PASSWORD, KEYCLOAK_CLIENT_SECRET | Medium | SEAL 3 | Use when Supabase Auth is insufficient for enterprise SSO and role complexity. |
| 33 | Auth0 / Okta | Identity platform | Enterprise login, OAuth, organizations, MFA | Dashboard/API/OIDC/SAML | https://auth0.com/docs ; https://developer.okta.com/docs/ | Free developer tiers may exist; paid for production/enterprise. | AUTH0_CLIENT_SECRET, OKTA_CLIENT_SECRET | Medium/High | SEAL 3 | Use for buyers requiring enterprise identity; keep internal # authority in MAS database. |
| 34 | Clerk | Developer auth platform | Fast user/org auth for Next.js apps | SDK, dashboard, webhooks | https://clerk.com/docs | Free/developer path; paid for scale. | CLERK_SECRET_KEY, CLERK_WEBHOOK_SECRET | Medium | SEAL 2/3 | Alternative to Supabase Auth for polished SaaS onboarding. |
| 35 | Resend | Email API | Transactional emails, onboarding, proof notices | API, SMTP, webhooks | https://resend.com/docs | Free/developer tier usually available; paid at scale. | RESEND_API_KEY, RESEND_WEBHOOK_SECRET | Medium | SEAL 2/3 | Use for system emails; keep marketing emails in separate consented channel. |
| 36 | Brevo | Email/SMS/CRM automation | Newsletters, CRM sequences, SMS | API, SMTP, automation builder | https://developers.brevo.com/ ; https://www.brevo.com/pricing/ | Free email tier historically available; paid for volume/features. | BREVO_API_KEY | Medium | SEAL 2/3 | Use for consent-based newsletters and partner nurturing. |
| 37 | WhatsApp Business Cloud API | Communication API | Community support, reminders, identity verification conversations | Meta developer app, webhooks, templates | https://developers.facebook.com/docs/whatsapp/cloud-api/ | Conversation/template pricing varies by region. | WHATSAPP_TOKEN, META_APP_SECRET, WHATSAPP_VERIFY_TOKEN | High | SEAL 3 | Activate after opt-in and template approval. Log consent and opt-outs. |
| 38 | Slack / Discord | Community automation | Team alerts, community bots, support routing | Apps/bots/webhooks | https://api.slack.com/ ; https://discord.com/developers/docs/intro | Free workspaces/servers; paid features vary. | SLACK_BOT_TOKEN, SLACK_SIGNING_SECRET, DISCORD_BOT_TOKEN | Medium | SEAL 2 | Use internal alerts first; public bot only after moderation policy. |
| 39 | Matrix / Element | Open communication protocol | Sovereign/community chat, federation-friendly support | Homeserver, bots, bridges | https://matrix.org/docs/ ; https://github.com/element-hq/synapse | OSS self-host path; hosting cost. | MATRIX_ACCESS_TOKEN, MATRIX_HOMESERVER_SECRET | Medium | SEAL 2 | Good Web9-aligned route for community-owned communication. |
| 40 | Mautic | Open-source marketing automation | Email journeys, campaigns, lead scoring | Self-host, API, webhooks | https://docs.mautic.org/ ; https://github.com/mautic/mautic | Free OSS; hosting/maintenance. | MAUTIC_CLIENT_SECRET, MAUTIC_DB_PASSWORD | Medium | SEAL 2/3 | Use if SaaS marketing tools become too costly or data control is key. |
| 41 | HubSpot | CRM/API | Sales pipeline, partner CRM, support, marketing | OAuth/private app token, webhooks | https://developers.hubspot.com/docs/api/overview | Free CRM available; paid hubs scale quickly. | HUBSPOT_PRIVATE_APP_TOKEN | Medium | SEAL 2/3 | Use for external sales CRM; sync essential records back to Supabase. |
| 42 | ERPNext / Frappe | Open-source ERP/CRM | Accounting, inventory, projects, HR, CRM | Self-host/cloud, REST API | https://frappeframework.com/docs ; https://docs.erpnext.com/ | OSS self-host; paid hosting available. | ERPNEXT_API_KEY, ERPNEXT_API_SECRET | Medium/High | SEAL 3 | Consider for cooperative/enterprise operations after MVP. |
| 43 | Odoo | ERP/CRM/app builder | CRM, accounting, inventory, website, helpdesk | SaaS/self-host, XML-RPC/JSON-RPC/API | https://www.odoo.com/documentation/ | Community and paid enterprise editions. | ODOO_API_KEY, ODOO_DB_PASSWORD | Medium/High | SEAL 3 | Good white-label operational backbone if Carbon Actual becomes multi-tenant service provider. |
| 44 | Retool | Internal tools builder | Admin panels, dashboards, ops workflows | SaaS/self-host, connectors | https://docs.retool.com/ | Free developer/team tiers may exist; paid for production. | RETOOL_API_KEY, RETOOL_DB_PASSWORD | Medium/High | SEAL 2/3 | Fast admin MVP; restrict dangerous write actions behind approval. |
| 45 | Appsmith | Open-source internal tools | Admin dashboards and CRUD tools | Self-host/cloud, connectors | https://docs.appsmith.com/ ; https://github.com/appsmithorg/appsmith | Free OSS/self-host; cloud tiers. | APPSMITH_DB_PASSWORD, APPSMITH_ENCRYPTION_PASSWORD | Medium | SEAL 2/3 | Use as open-source alternative to Retool. |
| 46 | Budibase | Open-source low-code | Internal apps, forms, workflows | Self-host/cloud | https://docs.budibase.com/ ; https://github.com/Budibase/budibase | Free OSS/self-host; paid cloud. | BUDIBASE_JWT_SECRET, BUDIBASE_API_KEY | Medium | SEAL 2 | Build early operator forms/admin tools. |
| 47 | Bubble | No-code app builder | Rapid SaaS prototype, portals, marketplaces | Visual builder, plugins, APIs | https://manual.bubble.io/ | Free/dev plan likely; paid for live apps. | BUBBLE_API_TOKEN | Medium | SEAL 1/2 | Use only for quick demonstrations; avoid making it the authority ledger. |
| 48 | FlutterFlow | Low-code mobile/web app builder | Mobile MVP for communities/field agents | Visual builder, Firebase/Supabase/API | https://docs.flutterflow.io/ | Free/pro tiers vary. | FLUTTERFLOW_API_TOKEN, FIREBASE_SERVICE_ACCOUNT_REF | Medium | SEAL 1/2 | Build field app prototype with Supabase backend. |
| 49 | WeWeb | No-code frontend | SaaS dashboard/frontend over Supabase/Xano | Visual builder, API connectors | https://docs.weweb.io/ | Free/dev and paid production plans vary. | WEWEB_API_TOKEN | Medium | SEAL 1/2 | Use for fast web dashboards if custom Next.js delays launch. |
| 50 | Xano | No-code backend/API | Backend API builder, auth, database | SaaS builder, API/webhooks | https://docs.xano.com/ | Free/dev path; paid scale. | XANO_API_KEY | Medium | SEAL 2 | Alternative backend for non-core MVPs; not preferred for SEAL authority root. |
| 51 | KoboToolbox | Data collection/forms | Field surveys, community data, environmental reports | Forms, API, exports | https://support.kobotoolbox.org/api.html ; https://www.kobotoolbox.org/ | Humanitarian-friendly free paths; quotas vary. | KOBO_API_TOKEN | Medium | SEAL 2/3 | Use for field data collection. Mark unverifiable submissions as pending until reviewed/proven. |
| 52 | Open Data Kit (ODK) | Open-source field data | Offline mobile forms, surveys, evidence capture | ODK Central, mobile Collect app, API | https://docs.getodk.org/ ; https://github.com/getodk | Free OSS; hosting cost. | ODK_API_TOKEN, ODK_ADMIN_PASSWORD | Medium | SEAL 2/3 | Best open-source route for low-connectivity field programs. |
| 53 | Home Assistant | Open-source IoT automation | Device integrations, sensors, local automations | Self-host, MQTT, REST/WebSocket | https://www.home-assistant.io/docs/ ; https://github.com/home-assistant/core | Free OSS; hardware/hosting. | HOME_ASSISTANT_TOKEN | Medium | SEAL 2 | Use for local pilots and hardware integration lab. No safety-critical automation without human review. |
| 54 | MQTT / Mosquitto | IoT messaging protocol/broker | Sensor ingestion, device events, field telemetry | Broker, topics, TLS credentials | https://mosquitto.org/documentation/ | Free OSS; hosting cost. | MQTT_USERNAME, MQTT_PASSWORD, MQTT_CA_CERT_REF | Medium/High | SEAL 2/3 | Use topic naming tied to # identity. Require TLS, ACLs, retained-message rules. |
| 55 | Node-RED | Low-code hardware/IoT workflow | Hardware prototyping, local automations, device routing | Self-host, nodes, MQTT/HTTP | https://nodered.org/docs/ ; https://github.com/node-red/node-red | Free OSS; hosting. | NODE_RED_CREDENTIAL_SECRET | Medium | SEAL 2 | Good lab bridge between IoT and MAS webhooks. Harden admin access. |
| 56 | Raspberry Pi / Arduino / ESP32 | Hardware/software integration | Field sensors, proof devices, community kiosks | GPIO, microcontroller SDKs, MQTT/HTTP | https://www.raspberrypi.com/documentation/ ; https://docs.arduino.cc/ ; https://docs.espressif.com/projects/esp-idf/en/latest/esp32/ | Hardware cost only; OSS tooling. | DEVICE_PROVISIONING_KEY_REF | Medium/High | SEAL 2/3 | Prototype tamper-aware sensor kits. Bind device # to owner # and calibration proof. |
| 57 | OpenStreetMap / Mapbox | Mapping/geospatial | Project maps, field locations, dashboards | APIs, tiles, geocoding | https://wiki.openstreetmap.org/wiki/API ; https://docs.mapbox.com/ | OSM data free with attribution; Mapbox free tier/paid use. | MAPBOX_TOKEN | Medium | SEAL 2; SEAL 3 if sensitive locations | Use OSM-first for public maps; protect sensitive community/resource locations. |
| 58 | QGIS | Open-source GIS | Spatial analysis, offline map production | Desktop plugins, data files | https://docs.qgis.org/ | Free OSS. | None | Low/Medium | SEAL 1/2 | Use for planning and reports; export only approved layers. |
| 59 | Hugging Face | Models, datasets, Spaces, inference | Open-source models, demos, embeddings, evaluation | API token, Spaces, libraries | https://huggingface.co/docs ; https://github.com/huggingface/transformers | Free community path; paid inference/hosting at scale. | HUGGINGFACE_TOKEN | Medium | SEAL 1/2 | Use for non-sensitive model experiments and public demos. Avoid uploading private data. |
| 60 | LangChain / LangGraph | Agent orchestration open-source | Agent workflows, tools, memory, graph states | Python/JS packages, LangSmith optional | https://python.langchain.com/docs/ ; https://langchain-ai.github.io/langgraph/ | OSS; LangSmith paid/free tiers vary. | LANGSMITH_API_KEY | Medium/High | SEAL 2/3 | Use only where deterministic state machines are needed. Add guardrails and approval nodes. |
| 61 | LlamaIndex | Data/agent framework | Retrieval over docs, knowledge graph, data connectors | Python/TS packages | https://docs.llamaindex.ai/ | OSS; hosted services optional. | LLAMA_CLOUD_API_KEY | Medium | SEAL 1/2 | Build Carbon Actual doctrine retrieval and integration scouts from repo docs. |
| 62 | Ollama / llama.cpp | Local model runtime | Offline/private inference, low-cost demos | Local runtime, API endpoint | https://github.com/ollama/ollama ; https://github.com/ggerganov/llama.cpp | Free OSS; hardware cost. | OLLAMA_HOST | Low/Medium | SEAL 1/2 | Use for private/local drafting and classification, not final authority. |
| 63 | Documenso | Open-source e-signature | Agreements, partner MOUs, SEAL approvals | Self-host/cloud, API | https://docs.documenso.com/ ; https://github.com/documenso/documenso | OSS/self-host; paid hosted options. | DOCUMENSO_API_KEY | High | SEAL 3 | Use for signed approvals; hash signed PDFs into `proofs`. |
| 64 | Cal.com | Open-source scheduling | Booking meetings, partner onboarding, callbacks | Hosted/self-host, API/webhooks | https://cal.com/docs ; https://github.com/calcom/cal.com | Free/open-source routes; paid hosted plans. | CAL_API_KEY, CAL_WEBHOOK_SECRET | Medium | SEAL 2 | Use for discovery calls and support scheduling. |
| 65 | Typeform / Tally / Fillout | Form builders | Intake forms, waitlists, surveys | Webhooks, API, embeds | https://www.typeform.com/developers/ ; https://tally.so/help ; https://www.fillout.com/help/api | Free tiers usually available; paid for branding/volume. | TYPEFORM_TOKEN, TALLY_WEBHOOK_SECRET, FILLOUT_API_KEY | Medium | SEAL 1/2 | Use Tally/Fillout for low-cost intake; sync to Supabase with review status. |
| 66 | Make.com / Zapier / Pipedream | Automation SaaS | Fast integrations where n8n custom nodes are slow | OAuth connectors, webhooks | https://www.make.com/en/help ; https://platform.zapier.com/ ; https://pipedream.com/docs | Free tiers with task limits; paid at scale. | MAKE_API_KEY, ZAPIER_WEBHOOK_SECRET, PIPEDREAM_API_KEY | Medium/High | SEAL 2; SEAL 3 with approval | Use only for non-sensitive bridges or quick proof-of-concept; avoid authority root in third-party black boxes. |
| 67 | Directus | Headless CMS/data platform | Admin UI over SQL, content/API management | Self-host/cloud, REST/GraphQL | https://docs.directus.io/ ; https://github.com/directus/directus | OSS/self-host and paid cloud. | DIRECTUS_TOKEN, DIRECTUS_SECRET | Medium | SEAL 2/3 | Good admin CMS for doctrine, products, partner pages, and controlled records. |
| 68 | Strapi | Open-source headless CMS | Website/content/product catalog | Self-host/cloud, REST/GraphQL | https://docs.strapi.io/ ; https://github.com/strapi/strapi | OSS/community; paid cloud/enterprise. | STRAPI_ADMIN_JWT_SECRET, STRAPI_API_TOKEN | Medium | SEAL 2 | Use for public content if Supabase schema should stay clean. |
| 69 | WordPress + WooCommerce | CMS/ecommerce | Low-cost public site, store, content marketing | Plugins, REST API, webhooks | https://developer.wordpress.org/rest-api/ ; https://woocommerce.github.io/woocommerce-rest-api-docs/ | OSS; hosting/plugins/payment fees. | WORDPRESS_APP_PASSWORD, WOOCOMMERCE_CONSUMER_KEY, WOOCOMMERCE_CONSUMER_SECRET | Medium/High | SEAL 2/3 | Good if speed/content ecosystem matters; keep core MAS logic outside plugins. |
| 70 | Shopify | Commerce platform | Storefront, product sales, partner kits | Admin API, webhooks, apps | https://shopify.dev/docs/api | Paid plans; app ecosystem. | SHOPIFY_ADMIN_ACCESS_TOKEN, SHOPIFY_WEBHOOK_SECRET | Medium/High | SEAL 3 | Use if physical/digital commerce becomes central. Sync orders to Supabase. |

---

## Immediate build sequence

### Week 1: secure foundation

1. Create Supabase project and tables: `identities`, `seals`, `delegations`, `proofs`, `integration_routes`, `activation_requests`, `audit_events`.
2. Deploy Vercel or Cloudflare Worker API gateway with `/health`, `/webhooks/github`, `/webhooks/openai`, `/webhooks/stripe`, `/integrations/register`.
3. Add GitHub Actions for schema checks and documentation linting.
4. Configure secret names only in docs; store real secrets in GitHub Actions, Vercel, Cloudflare, or Supabase vault.
5. Define SEAL middleware: every write action must include actor #, affected #, SEAL scope, issuer, proof reference, validity, revocation route.

### Week 2: automation and communications

1. Deploy n8n behind HTTPS and auth, or use n8n Cloud for lower maintenance.
2. Add workflows: integration scout, contact intake, GitHub issue routing, proof review queue.
3. Connect Twilio Verify for OTP and one inbound support route.
4. Add Resend/Brevo transactional email and consented newsletter.

### Week 3: proof and identity pilot

1. Implement internal # identity first in Supabase.
2. Add optional DID/VC test credential for a low-risk claim, such as `ABBA_MAS_EARLY_PARTNER`.
3. Add EAS or OpenAttestation proof experiments only for public, non-sensitive artifacts.
4. Add GitHub artifact attestations to release pipeline.

### Week 4: dashboards and go-to-market

1. Add Metabase or PostHog dashboards.
2. Build landing pages for: ABBA MAS identity, Carbon Actual integration partners, field data pilots, white-label MAS operations.
3. Build admin dashboard for reviewing activation requests.
4. Package a partner onboarding kit with API scopes, SEAL levels, evidence requirements, and revocation policy.

---

## Recommended database schema sketch

```sql
create table integration_routes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  route_type text not null,
  function_classification text not null,
  access_method text not null,
  setup_links text[] not null default '{}',
  cost_notes text,
  secret_names text[] not null default '{}',
  risk_level text not null check (risk_level in ('low','medium','high')),
  seal_level int not null check (seal_level between 0 and 4),
  activation_status text not null default 'scouted',
  recommended_activation_path text not null,
  last_verified_on date not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table activation_requests (
  id uuid primary key default gen_random_uuid(),
  route_id uuid references integration_routes(id),
  actor_hash text not null,
  requested_scope text not null,
  requested_seal_level int not null check (requested_seal_level between 0 and 4),
  justification text not null,
  status text not null default 'pending',
  proof_ref text,
  approved_by_hash text,
  approved_at timestamptz,
  expires_at timestamptz,
  revocation_route text not null default 'governance_review',
  created_at timestamptz not null default now()
);
```

---

## Security and risk notes

- Never commit raw secrets. Use environment secret stores and secret names only.
- Treat n8n, GitHub Actions, and agentic workflows as high-risk if they can read secrets and act on untrusted text.
- All public webhooks must validate signatures and reject unsigned or replayed events.
- Public communications require consent, opt-out, regional telecom compliance, and message templates where required.
- Payments require reconciliation, refund route, invoice records, and restricted admin access.
- Identity/proof systems require revocation and redress. A proof that cannot be challenged is not acceptable for Carbon Actual governance.
- Blockchain should be used for proofs and attestations only when public immutability is worth the privacy, cost, and correction tradeoff.

## Next recommended repository additions

1. `03_INTEGRATION_ROUTES/integration_routes.seed.json`
2. `03_INTEGRATION_ROUTES/integration_route_schema.sql`
3. `03_INTEGRATION_ROUTES/seal_middleware_spec.md`
4. `.github/workflows/integration-register-validate.yml`
5. `apps/mas-api/src/routes/webhooks/*`
