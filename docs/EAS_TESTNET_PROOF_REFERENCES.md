# EAS Testnet Proof References for ABBA MAS

## Purpose

Ethereum Attestation Service is used in ABBA MAS as a proof reference route for Actual. The first phase must use testnet or off-chain attestations only.

## Rule

Do not put private human data, raw memories, identity documents, health records, bank records, or true value on public chains.

Use EAS first for:

- proof schema references
- off-chain attestation references
- hashed proof pointers
- public-safe provenance records
- SEAL-approved ATLAS proof references

## Environment names

```text
EAS_RPC_URL
EAS_SCHEMA_UID
EAS_PRIVATE_KEY_IF_SIGNING
```

Do not commit raw signing keys.

## Suggested first schema

Name: `ABBA MAS Swarm Proof Reference`

Fields:

```text
string sourceProvider
string sourceLayer
string mintId
string tokenRef
string proofRef
string valueVisibility
string sealLevel
string actualValueStatus
bool publicAtlasApproved
```

## First testnet proof event

```json
{
  "sourceProvider": "memorae",
  "sourceLayer": "hapi_root",
  "mintId": "mint_test_001",
  "tokenRef": "token_test_001",
  "proofRef": "proof_test_001",
  "valueVisibility": "masked",
  "sealLevel": "SEAL-3",
  "actualValueStatus": "not_requested",
  "publicAtlasApproved": false
}
```

## Activation path

1. Create EAS testnet schema.
2. Store `EAS_SCHEMA_UID` in Vercel/GitHub secrets.
3. Submit one off-chain/testnet attestation for the safe founder test.
4. Record returned proof reference in `swarm_proof_refs`.
5. Do not publish to ATLAS until SEAL status is approved.

## Actual boundary

EAS records proof that a masked event exists. EAS does not reveal true value. Actual remains the value reveal engine.
