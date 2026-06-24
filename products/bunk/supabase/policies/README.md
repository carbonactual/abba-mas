# BUNK Row-Level Security Plan

Status: policy plan before live Supabase enforcement.

## Core rules

1. Public users may read only published public listings and public-safe property fields.
2. Precise addresses, access instructions, ownership documents, tenant details, payment records, and dispute records are private by default.
3. Organization members may access records owned by their organization according to role.
4. Admin users require explicit BUNK admin role.
5. SEAL approvers require explicit human authority identity.
6. AI agents never bypass RLS; they receive scoped service functions only.
7. Public proof requires SEAL approval.
8. Vault objects require signed URLs and audit logging.

## MVP policy priorities

- profiles: user can read/update self; admins can read with role.
- organizations: members can read; admins can manage.
- properties: public-safe read if visibility=public; owner/org can manage; admin can review.
- units: follows property visibility and ownership.
- listings: public read only if status=published; draft/private visible to owner/org/admin.
- wanted_requests: requester only plus assigned agent/admin with consent.
- seal_requests: requester, authority, admin.
- proof_records: visibility + SEAL + subject relationship.
- pulse_events: subject relationship and visibility.
- vault_objects: owner/admin/specific grant only.
- ledger_entries: subject relationship plus finance/admin role.

## Required before production

- SQL RLS policies committed.
- Role resolver implemented.
- Permission tests added.
- Unauthorized cross-organization access test passing.
