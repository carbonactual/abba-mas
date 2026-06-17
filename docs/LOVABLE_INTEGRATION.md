# Lovable Integration — ABBA MAS / Carbon Actual

Lovable is now registered as a candidate product-builder provider inside the ABBA MAS swarm.

## Position

Lovable is a builder surface, not a custody layer and not the final authority.

It should be used for fast interface creation, landing pages, dashboard screens, investor/demo experiences, and prototype routes for Carbon Actual, ABBA MAS, InstituteGPT, HAPI, Web9, Direct Bank previews, Open Ballot previews, and future product modules.

GitHub remains the source of truth. Vercel remains the deployment gate. ABBA reviews movement. SEAL approves production/public release.

## Files added

```txt
data/lovable-provider.json
app/api/swarm/lovable/route.ts
docs/LOVABLE_INTEGRATION.md
```

## Endpoint

```txt
GET /api/swarm/lovable
```

This endpoint returns the Lovable provider record, masked credential presence, allowed data, forbidden data, and handoff rules.

## Environment variables

No secret was committed. Use only environment variables inside Vercel/GitHub secrets if Lovable issues workspace, project, or webhook identifiers.

```env
LOVABLE_WORKSPACE_ID_IF_ISSUED=
LOVABLE_PROJECT_ID_IF_ISSUED=
LOVABLE_GITHUB_REPO=carbonactual/abba-mas
LOVABLE_WEBHOOK_SECRET_IF_USED=
```

## Allowed Lovable input

- Public product briefs
- Masked interface specs
- Non-secret component requirements
- Landing page copy
- Dashboard UX plans
- Prototype routes
- Demo/investor flows
- mint_id, proof_ref, token_ref

## Forbidden Lovable input

- Raw secrets
- Private keys
- Banking credentials
- Production API tokens
- Unredacted identity documents
- Vault documents
- Customer banking data
- Actual value computation or reveal

## Recommended workflow

1. Build or update screens in Lovable.
2. Sync/export to GitHub on a prototype branch.
3. Open a GitHub pull request.
4. Run Vercel preview build.
5. Review code for secrets, unsafe logic, broken routes, and design drift.
6. ABBA resolves readiness.
7. SEAL approves public or production release.
8. Merge to main.
9. Vercel deploys.

## Lovable role in Web9

Lovable belongs under the product-builder layer of Web9. It helps convert doctrine, product scope, and interface ideas into usable prototypes. It does not own Root, Vault, Actual, SEAL, or settlement.

## Immediate Carbon Actual use cases

- Carbon Actual immersive website iterations
- ABBA MAS swarm dashboard cards
- InstituteGPT portal and course dashboard
- HAPI onboarding and identity intake
- Web9 layer explorer
- Direct Bank demo screens only, not real banking logic
- Open Ballot demo screens only, not real voting custody
- Investor deck companion microsites
