# Foundation API Map

This file defines the general API routes every product should use before product design begins.

The APIs are conceptual foundation endpoints. Products should call these shared routes instead of inventing separate value systems.

## PULSE routes

/api/pulse/release
/api/pulse/mint
/api/pulse/return

Purpose: release, mint, and update PULSE.

## Pledge and commitment routes

/api/pledge/release
/api/commitment/value

Purpose: pledge releases PULSE and commitment creates value.

## Terminal and token routes

/api/terminal/sort
/api/token/classify
/api/token/state

Purpose: sort PULSE, classify token state, and track token lifecycle.

## Scale routes

/api/scale/read
/api/scale/update

Purpose: read the scale of PULSE and update scale after return PULSE.

## Value routes

/api/value/read
/api/value/recover
/api/base-value/update

Purpose: interpret value, recover value from liability or residue, and update Base Value Token.

## Ledger routes

/api/ledger/write
/api/ledger/state
/api/ledger/proof

Purpose: record token state, proof, scale, field status, and Base Value effect.

## Foundation layer routes

/api/root/write
/api/index/write
/api/vault/write
/api/actual/reveal
/api/field/check
/api/seal/check
/api/io/move

Purpose: route value to Root, Index, Vault, Actual, Field, SEAL, and I/O.

## AI routes

/api/group-ai/form
/api/entity-ai/form
/api/hapi-ai/update
/api/swarm/assign

Purpose: form and update HAPI AI, group AI, entity AI, and SWARM assignment.

## Product rule

Every product must call the foundation APIs for PULSE, token, scale, value, ledger, SEAL, and Actual reveal.

No product should create a separate value logic outside the foundation.

## Final law

Products sit on top of the foundation.
The foundation receives PULSE, tokenizes it, scales it, classifies it, applies inverted economics, updates Base Value, records ledger state, and reveals value through Actual.
