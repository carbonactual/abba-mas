# Carbon Actual / ABBA MAS Foundation Lock

Date: 2026-06-23
Status: foundation cleanup before product builds

## 1. SEAL is human-controlled

SEAL is not an AI approval system.

AI may:
- classify risk
- recommend a SEAL level
- draft approval requests
- detect missing evidence
- prepare proof receipts
- warn about contradictions
- route to the right human authority

AI must never:
- approve a SEAL action
- reject a human request as final authority
- override a human owner
- self-authorize external action
- move money without human-controlled financial approval
- issue irreversible identity, value, or proof changes alone

Final SEAL authority remains with the authorized human, family, institution, organization, or governance body attached to the relevant # identity.

## 2. # identity and authority rules

# is the internal identity and authority root of the ecosystem.

External systems such as DID, ENS, HNS, VC, OAuth, wallets, email, phone, government IDs, enterprise SSO, and biometrics may attach to #, but none of them replaces #.

A # record must support:
- subject identity
- controller or owner
- authority scope
- consent state
- delegation
- revocation
- proof references
- audit history
- external identity bindings
- dispute route

Authority flows from the recognized human or institution to agents, products, integrations, and proofs. ABBA MAS only resolves, routes, records, and recommends.

## 3. Common product rules

Every product must use the shared foundation:

- # identity
- SEAL classification
- Proof receipts
- Audit events
- Swirm team selection
- Memory rules
- Integration lifecycle states
- Data minimization
- Human approval for SEAL 3+
- Revocation route
- Rollback route where possible
- No raw secrets in GitHub or chat

No product may create a separate identity, proof, approval, memory, ranking, or integration logic that contradicts the common foundation.

## 4. Foundation audit result

Resolved contradictions:

- ABBA is not final authority; ABBA is a resolver/coordinator under SEAL.
- SEAL is not automated approval; it is human-controlled governance.
- External identity systems support # but do not replace it.
- Integration count is not equal to active integrations. Counts must be lifecycle-based.
- Swirms are not fixed departments; they are overlapping capability classifications that can form inter-Swirm teams.
- Products are not isolated apps; they are formed from shared ecosystem layers.
- Memory systems must not reveal Actual value unless SEAL and proof rules allow it.
- Value, money, tokenization, and financial movement require SEAL 3+ controls.

Open items before production scale:

- Add database migrations for #, SEAL, swirms, providers, proofs, audit events, and product registry.
- Add health evidence checks for active provider claims.
- Add command router API.
- Add product registry API.
- Add dashboard for Swirms, integrations, proofs, and products.

## Foundation closure rule

After this file, product work can begin. Future foundation changes must be treated as protocol changes and require explicit human SEAL approval.
