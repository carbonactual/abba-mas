# AI Records Doctrine

AI records in Carbon Actual are structured operating records.

They define identity, role, owner, layer, scope, model route, approved tools, restricted tools, memory policy, SEAL level, status, proof references, and review path.

## Classes

- master_ai
- foundation_ai
- hapi_ai
- product_ai
- integration_ai
- calling_ai
- account_officer_ai

## Required fields

- ai_id
- name
- ai_class
- assigned_to_type
- assigned_to_id
- layer
- purpose
- model_route
- allowed_tools
- restricted_tools
- memory_policy
- seal_level
- value_visibility
- human_review_required
- certification_status
- status
- created_by
- proof_refs
- pulse_refs

## Default state

New AI records begin as candidates.
External execution begins blocked.
Repository files store secret names only, never secret values.
Private memory is represented by masked references unless SEAL grants a higher route.

## Control phrase

ABBA resolves.
SEAL permits.
Actual reveals.
