# HAPI Shared Data Contracts

Version: 0.1.0

This directory defines the common contracts used by HAPI to carry the human, the personal AI, and every connected product through one continuous relationship.

These contracts are not a replacement for product-specific domain models.

HAPI owns the shared human-facing connection layer:

- shared # identity
- human entry
- personal AI minting
- SEAL consent
- Actual activity context
- Becoming curation context
- PULSE return
- Root and Index update references
- ATLAS publication references
- external verification

Each product keeps its own business logic, records, workflows, permissions, and schemas.

A product connects to HAPI through an adapter contract that carries only the information needed to:

- identify the human–AI pair
- request or verify consent
- open the relevant Actual context
- deliver contextual Becoming
- return activity and proof through PULSE
- update permitted Root, Index, Continuum, merit, value, or ATLAS references

The core relationship is:

human and personal AI
→ HAPI
→ connected product
→ activity
→ PULSE
→ HAPI continuity

Contracts:

- HashIdentity
- HumanAIEntry
- PersonalAIMint
- SealGrant
- PulseEvent
- RootUpdateEvent
- IndexUpdateEvent
- ActualSession
- BecomingCard
- AtlasProjection
- VerificationRequest
- VerificationResponse

Files:

- contracts.ts
- contracts.schema.json
- openapi.yaml
- src/validator.ts
- src/orchestrator.ts
- tests/contracts.test.ts
- supabase/migrations/0001_shared_contracts.sql

## Ownership boundary

HAPI carries the person across products.

Products do not become HAPI.
HAPI does not absorb the products.

The product remains itself while HAPI provides the shared human connection, identity, consent, continuity, curation, and return path.
