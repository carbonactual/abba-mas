# ABBA MAS / Carbon Actual Integration Activation Board

Status date: 2026-06-20
Source register: `ABBA_MAS_CARBON_ACTUAL_INTEGRATION_OPPORTUNITY_REGISTER_2026-06-20.md`
Total registered routes: **70**

## GitHub setup status

| Asset | Status | Purpose |
|---|---:|---|
| Integration opportunity register | Done | Master route register |
| `integration-routes.registry.json` | Done | Machine-readable count, lanes, controls |
| `integration-secrets.example.env` | Done | Secret names only; no raw values |
| `.github/workflows/integration-registry-check.yml` | Done | Validates JSON, route count, and secret hygiene |
| Activation board | Done | Tracks next activation order |

## Activation order

1. Foundation: OpenAI, Supabase, GitHub Actions, GitHub Webhooks, Cloudflare Workers, Vercel.
2. Automation: n8n, GitHub Actions schedules, Make, Zapier, Pipedream fallback.
3. Communication: Resend and Brevo first, then Twilio and WhatsApp after consent and templates.
4. Identity/proof: DID/VC research, then SpruceID, OpenAttestation, EAS testnet or off-chain.
5. Data/impact: KoboToolbox, ODK, OSM, MQTT, Node-RED.
6. Revenue: Paystack, Stripe, Flutterwave after SEAL 3 approval.
7. Commerce/content/admin: Directus, Strapi, WordPress, WooCommerce, Shopify when product motion requires them.

## SEAL gate

- SEAL 0: research/reference only.
- SEAL 1: local/sandbox prototype.
- SEAL 2: reversible automation, routing, notifications, approved publishing.
- SEAL 3: identity, money, customer communication, legal records, access/status changes.
- SEAL 4: governance/root authority/protocol changes.

## Current count

- Registered integration routes: **70**
- GitHub setup/scaffold files added now: **4**
- Live external accounts activated by GitHub: **0**
- Ready for secret entry and sandbox activation: **Yes**
