# OpenAlternative Provider Validation Checklist

Every free/open-source provider discovered from OpenAlternative must pass this checklist before activation.

## Required fields

- Provider ID
- Provider name
- Official website
- Official GitHub repository
- Category
- Alternative-to product
- License
- Stars
- Forks
- Last commit date
- Self-hosted availability
- Docker availability
- API availability
- Authentication model
- Secret names required
- Carbon Actual layer fit
- ABBA MAS function
- Risk level
- SEAL level
- Activation status

## Status values

- candidate
- researching
- sandbox-approved
- sandbox-active
- blocked
- production-review
- production-approved
- deprecated

## Risk rules

Low: public research, diagrams, documentation, no secrets.

Medium: internal workflow, analytics, notifications, API testing, non-sensitive data.

High: browser automation, remote desktop, authentication, compliance, finance, public proof, regulated or irreversible actions.

## SEAL rules

SEAL-1: public discovery.

SEAL-2: sandbox with non-sensitive data.

SEAL-3: authenticated business workflow with masked data.

SEAL-4: identity, compliance, public proof, remote support, customer-facing AI, browser agents.

SEAL-5: Actual value reveal, money movement, irreversible external commitment, regulated private value.

## Production blockers

A provider is blocked from production if any of these are unknown:

- License terms
- Maintenance status
- Security posture
- Data retention behavior
- Secret storage model
- Backup/export route
- Admin access model
- Logs and auditability
- Deployment rollback route
- Human SEAL owner

## Secret rule

Commit only secret names, never secret values.

Allowed example:

```text
FIRECRAWL_API_KEY
N8N_ENCRYPTION_KEY
SUPABASE_SERVICE_ROLE_KEY
```

Blocked example:

```text
sk_live_...
api_abc123...
real tokens, passwords, private keys, cookies, sessions
```

## ABBA MAS approval path

```text
Candidate
  -> ABBA classification
  -> License check
  -> Maintenance check
  -> Security check
  -> SEAL score
  -> Sandbox
  -> Human approval
  -> Controlled activation
```
