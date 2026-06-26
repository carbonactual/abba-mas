# I/O Gap Report

## Repository decision

`carbonactual/abba-mas` is the correct foundation repository because it already owns command routing, SEAL policy, provider routing, proof coordination, and the product registry. `carbonactual/Carbon-Actual-` currently contains the ZUJID website and must not be used for I/O. `carbonactual/direct-bank-app` remains the first operational product container.

## Present before this branch

- ABBA MAS command lifecycle
- SEAL policy registry
- provider registry pattern
- product ownership registry
- Direct Bank product registration
- proof-oriented operating model

## Added in this branch

- I/O registered as the common financial and value foundation
- Direct Bank remapped as the first operational I/O container
- canonical I/O foundation doctrine
- truth-state, provider-state, pathway-state, and BE lifecycle contracts
- disabled-by-default provider candidates for Monnify, Paystack, Flutterwave, Polygon Amoy, and OpenRouter
- explicit reservation of collectible classes 2–9

## Missing implementation gates

### Foundation code

- monorepo package expansion
- command, index, financial-body, path, nano, PabloPay, Earn-to-Pay, subscription, provider, settlement, ledger, treasury, risk, SHIELD, BE, proof, blockchain, media, and resource-accounting packages
- OpenAPI specification and SDK

### Data

- Supabase migrations for the canonical I/O tables
- RLS, consent joins, immutable audit records, idempotency, and reconciliation structures
- seed data and policy rules

### Product surfaces

- Entry Orb user experience
- admin control room
- provider dashboard
- Direct Bank integration
- local simulation demo

### Assurance

- unit, integration, API, policy, ledger-balance, fee, repayment, fraud, RLS, webhook, provider-contract, blockchain-simulation, BE, rights, reconciliation, treasury, concurrency, and failure-injection tests
- CI validation for migrations, manifests, schemas, security, secrets, dependencies, builds, and previews

### External and regulated dependencies

- payment-provider onboarding and credentials
- KYC and compliance approvals
- treasury and reserve policies
- partner agreements
- production key management
- regulated lending, custody, settlement, investment, tokenization, and collateral policies

## Activation rule

Registry presence is not integration. Code presence is not activation. Testnet is not production. No provider, payment rail, blockchain signing route, DeFi route, credit route, or external settlement route is production-active from this branch.
