# Hash Minted Identity and External Verification Law

# is the minted identity of every human and AI that enters the ecosystem.

It is created at ecosystem entry and becomes the privacy-preserving identity credential used across internal and external systems.

## Core identity rule

A human enters the ecosystem and receives a minted # identity.

An AI enters the ecosystem and receives a minted # identity.

The # represents the verified identity state of that human or AI without exposing the underlying private data.

## Privacy-preserving signup

When a human or AI signs up to an external application, the external application should not need the person's full personal data or the AI's internal system data.

The external application requests verification from #.

# responds with a verification result.

The minimum response is:

VERIFIED

The response may also include only the specific approved claims needed for the function, such as:

- human or AI
- active or inactive
- age threshold met
- residency verified
- role verified
- qualification verified
- organization membership verified
- permission granted
- risk status acceptable
- SEAL present

No additional data should be disclosed unless the subject permits it through SEAL.

## External app flow

External app requests signup or access
→ human or AI presents #
→ external app sends verification request
→ # checks identity state, permissions, proof, and SEAL
→ # returns VERIFIED, NOT VERIFIED, or a limited approved claim
→ external app grants or denies access

## Data minimization

# must reveal the minimum necessary information.

The external app should receive proof of the required fact, not the full underlying record.

Examples:

- confirm that the person is over the required age without revealing date of birth
- confirm that identity is verified without revealing identity documents
- confirm professional certification without revealing unrelated education history
- confirm that an AI is certified for a function without exposing its full model, memory, or owner data

## Human and AI identity parity

Both humans and AI receive # identity.

The identity type differs, but the verification structure is shared.

A human # proves a human identity state.
An AI # proves an AI identity state.

Each may hold different claims, permissions, roles, proofs, and restrictions.

## SEAL relationship

# proves identity.
SEAL governs consent and disclosure.

# must not disclose protected information without valid SEAL.

SEAL may approve:

- one-time verification
- recurring verification
- specific claim disclosure
- app-specific access
- time-limited access
- revocable access

## Trust and revocation

A # identity may be active, restricted, suspended, revoked, expired, or under review.

External verification must return the current identity state.

Verification is not permanent if the underlying proof, permission, safety, or trust state changes.

## Signing and proof

# may be used to sign:

- app access requests
- commitments
- pledges
- agreements
- credentials
- transactions
- attestations
- API calls
- AI actions

The signature should prove who or what acted without exposing unnecessary private data.

## Final law

# is the minted identity of the human and AI in the ecosystem.

# is sufficient for signup and verification where the external app only needs proof of identity or an approved claim.

The external app asks #.
# replies with VERIFIED, NOT VERIFIED, or the minimum approved claim.

Private data remains protected.
SEAL controls disclosure.
Proof supports trust.
Revocation protects the ecosystem.
