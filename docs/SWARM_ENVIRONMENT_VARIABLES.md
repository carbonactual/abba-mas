# ABBA MAS Swarm Environment Variables

Only variable names are documented here. Raw values must be stored in Vercel, GitHub Secrets, n8n credentials, or provider dashboards.

## Core routes

```text
ABBA_SWARM_WEBHOOK_SECRET
ABBA_SWARM_INGEST_URL
ABBA_SWARM_ACTUAL_CALL_URL
```

## Supabase

```text
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

## HAPI Root

```text
MEMORAE_ACCOUNT_ID
MEMORAE_WORKSPACE_ID
MEMORAE_API_TOKEN_IF_ISSUED
MEMORAE_WEBHOOK_SECRET_IF_ISSUED
PERSONAL_AI_API_KEY
PERSONAL_AI_PERSONA_ID
```

## ABBA Memory API

```text
SUPERMEMORY_API_KEY
SUPERMEMORY_PROJECT_ID
MEM0_API_KEY
LETTA_API_KEY
```

## Temporal Index

```text
ZEP_API_KEY
GRAPHITI_GRAPH_URL
GRAPHITI_DB_URL
```

## Curation and capture

```text
TANA_API_KEY_IF_ISSUED
FABRIC_API_KEY_IF_ISSUED
READWISE_TOKEN
HEPTABASE_TOKEN_IF_ISSUED
MYMIND_EXPORT_TOKEN_IF_ISSUED
OBSIDIAN_VAULT_PATH_IF_LOCAL
OBSIDIAN_PUBLISH_TOKEN_IF_ISSUED
CAPACITIES_API_KEY_IF_ISSUED
RAINDROP_API_TOKEN
RECALL_API_KEY
FIREFLIES_API_KEY
PLAUD_EXPORT_TOKEN_IF_ISSUED
```

## Proof, identity, ATLAS

```text
EAS_RPC_URL
EAS_SCHEMA_UID
EAS_PRIVATE_KEY_IF_SIGNING
CERAMIC_NODE_URL
CERAMIC_DID_PRIVATE_KEY_IF_ISSUED
ORIGINTRAIL_NODE_URL
ORIGINTRAIL_WALLET_KEY_IF_SIGNING
VERAMO_DB_URL
VERAMO_SECRET_KEY
SPRUCEID_API_KEY
```

## Vercel setup order

1. Add Supabase variables first.
2. Add `ABBA_SWARM_WEBHOOK_SECRET`.
3. Add only the first-wave provider credentials: Memorae, Supermemory, Zep, Graphiti.
4. Deploy.
5. Check `/api/health` and `/api/swarm/providers`.
6. Add proof and ATLAS variables after SEAL/proof pilot is ready.

## Safety rule

Never paste raw values into GitHub issues, docs, pull requests, public logs, or chat.
