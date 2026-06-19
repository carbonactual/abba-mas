# ABBA MAS

ABBA MAS is the command, routing, SEAL, and proof coordination layer for Carbon Actual.

## Operating model

```text
ChatGPT = human-facing instruction interface
ABBA MAS = interpretation, classification, routing, and policy
GitHub = command center, code authority, workflow engine, and execution ledger
SEAL = consent and approval boundary
GitHub Actions / Apps = workers
External providers = execution destinations
Supabase / Vault = operational state and sensitive custody
Actual = returned user-facing result
```

## Command lifecycle

```text
ChatGPT instruction
→ structured command
→ GitHub inbox
→ schema and policy validation
→ SEAL evaluation
→ approved worker route
→ execution
→ result verification
→ proof record
→ Actual response
```

## Foundation structure

- `config/products.json` — product-to-repository ownership registry
- `config/providers.json` — provider routes, access methods, risk, SEAL, and secret names
- `config/seal-policy.json` — SEAL levels and execution rules
- `schemas/command.schema.json` — machine-readable command contract
- `commands/inbox/` — newly registered commands
- `.github/workflows/command-router.yml` — safe validation router

## Security rule

Raw API keys, private keys, passwords, tokens, and signing secrets must never be committed. Only secret names and setup metadata belong in GitHub. Secret values belong in protected environment stores or Vault.

## Current phase

Foundation validation is active. External execution remains disabled until provider-specific protected workflows and SEAL gates are installed.
