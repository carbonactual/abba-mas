# ABBA MAS OpenAlternative Activation Guide

OpenAlternative is added as a Scout Layer source for free, open-source, and self-hostable alternatives. It is not a production deployment authority.

## Purpose

Use this layer to discover cheaper/free/open-source alternatives for Carbon Actual, ABBA MAS, InstituteGPT, Direct Bank OS, Open Ballot, ATLAS, HAPI, I/O, and future products.

## Operating doctrine

1. Discover public tools.
2. Verify official repository and documentation.
3. Check license, stars, forks, last commit, issues, security posture, Docker support, API support, and commercial use limits.
4. Classify by Carbon layer.
5. Assign SEAL level.
6. Sandbox.
7. Promote only after human SEAL approval.

## Carbon Actual layer mapping

| Layer | Best free/open-source routes |
|---|---|
| ABBA MAS Core | n8n, Dify, Langflow, Open WebUI, Parlant |
| Scout / ATLAS | OpenAlternative, Firecrawl, Browser Use, Excalidraw |
| Index / Registry | Baserow, Supabase, Hoppscotch |
| Communication | Novu, Postiz, Dub |
| Identity / Web9 | Hanko, Veramo, EAS, DID/VC routes |
| Monitoring | Uptime Kuma, OpenPanel |
| Compliance | Openlane, Probo-style evidence trackers, internal control desk |
| Education / InstituteGPT | Dify, Langflow, Tolgee, Cap, Excalidraw |
| Operations | n8n, Baserow, Hoppscotch, RustDesk with strict consent |

## SEAL gate

- SEAL-1: public discovery only.
- SEAL-2: sandbox, no sensitive data.
- SEAL-3: authenticated workflows with masked data.
- SEAL-4: identity, compliance, remote access, browser agents, public proof, customer-facing AI.
- SEAL-5: Actual value reveal, private value, regulated financial movement, irreversible external execution.

## Immediate activation sequence

1. Keep `registry/openalternative/free-open-source-provider-registry.json` as source of truth.
2. Create Supabase table `integration_opportunities` mirroring the JSON fields.
3. Use Baserow as no-code operator view.
4. Add `/api/swarm/providers` to expose approved providers only.
5. Add `/api/swarm/ingest` to accept new candidate tools from OpenAlternative.
6. Add n8n workflow `OpenAlternative Candidate Intake`.
7. Add Uptime Kuma for service monitoring.
8. Add OpenPanel for privacy-aware analytics.
9. Promote n8n, Dify, Langflow, Baserow, Hoppscotch, Novu, Firecrawl, Uptime Kuma as first sandbox tools.
10. Keep Browser Use, RustDesk, Hanko, Openlane behind SEAL-4 review.

## Database schema

```sql
create table if not exists integration_opportunities (
  id text primary key,
  name text not null,
  category text,
  route_type jsonb default '[]'::jsonb,
  function_classification jsonb default '[]'::jsonb,
  access_method text,
  cost_notes text,
  risk_level text,
  seal_level int default 1,
  secret_names jsonb default '[]'::jsonb,
  setup_links jsonb default '[]'::jsonb,
  activation_path jsonb default '[]'::jsonb,
  source text default 'openalternative',
  status text default 'candidate',
  production_blocked boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

## API route sketch

`GET /api/swarm/providers`

Returns approved provider records. Public response must exclude secret values. Secret names are allowed.

`POST /api/swarm/ingest/openalternative`

Accepts candidate provider records, validates schema, sets `production_blocked=true`, then stores in Supabase/Baserow.

## n8n workflow

Name: `OpenAlternative Candidate Intake`

Flow:

```text
Manual/Webhook Trigger
  -> Validate candidate fields
  -> Check duplicate provider id
  -> License/Maintenance review queue
  -> Assign SEAL level
  -> Insert into Supabase/Baserow
  -> Notify ABBA operator via Novu/Slack/Telegram
```

## Security rules

- Do not clone and run unknown tools on production servers.
- Do not put real API keys into Hoppscotch, Postiz, Dify, Langflow, Open WebUI, Browser Use, or n8n test flows.
- Browser Use and RustDesk require screen/session consent and must never handle banking, legal, or identity actions without explicit human SEAL.
- Compliance tools do not create certification by themselves. They only support evidence and controls.
- Analytics tools must not collect sensitive identity, private value, legal facts, health facts, or financial movement data by default.

## First sandbox stack

```text
Vercel frontend
Supabase registry/database
n8n automation router
Baserow operator table
Dify/Langflow AI workflow lab
Open WebUI private model console
Hoppscotch API test bench
Novu notification router
Uptime Kuma monitor
OpenPanel analytics
Firecrawl public web extraction
```

## Blocked from automatic activation

```text
payments
banking
direct debit
identity issuance
public proof issuance
remote desktop unattended access
browser-agent credential entry
legal commitment
customer-facing AI without approval
Actual value reveal
```
