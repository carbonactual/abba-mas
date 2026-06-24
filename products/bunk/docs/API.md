# BUNK API Contract Outline

Base path: `/api/v1`

## Middleware required on all routes

- authentication where route is non-public
- authorization and active-role resolver
- Zod input validation
- rate limiting
- correlation ID
- idempotency key on financial and workflow writes
- audit logging
- Pulse emission for meaningful actions
- SEAL gate for high-impact actions
- structured error response

## Route families

### Auth and identity
- POST /auth/register
- POST /auth/login
- POST /auth/otp/request
- POST /auth/otp/verify
- GET /me
- PATCH /me
- GET /me/roles
- POST /consents
- GET /seal/requests
- POST /seal/requests
- POST /seal/requests/:id/decide

### Properties
- GET /properties
- POST /properties
- GET /properties/:id
- PATCH /properties/:id
- POST /properties/:id/media
- POST /properties/:id/documents
- POST /properties/:id/verify
- GET /properties/:id/proof
- GET /properties/:id/pulse
- GET /properties/:id/units

### Listings
- GET /listings
- POST /listings
- GET /listings/:id
- PATCH /listings/:id
- POST /listings/:id/submit
- POST /listings/:id/publish
- POST /listings/:id/pause
- POST /listings/:id/save
- POST /listings/:id/share
- GET /listings/:id/similar

### Search and matching
- GET /search
- POST /search/semantic
- POST /search/map
- POST /wanted
- GET /wanted/:id/matches
- POST /matches/explain

### CRM
- GET /leads
- POST /leads
- PATCH /leads/:id
- POST /leads/:id/assign
- POST /leads/:id/activity
- POST /referrals

### Inspections
- GET /inspections
- POST /inspections
- PATCH /inspections/:id
- POST /inspections/:id/check-in
- POST /inspections/:id/complete
- POST /inspections/:id/evidence
- GET /inspections/:id/report

### Applications and deals
- POST /applications
- GET /applications/:id
- POST /applications/:id/documents
- POST /offers
- PATCH /offers/:id
- POST /offers/:id/counter
- POST /offers/:id/accept
- POST /agreements
- GET /agreements/:id
- POST /agreements/:id/review
- POST /agreements/:id/sign

### Payments
- POST /invoices
- GET /invoices/:id
- POST /payments/initialize
- POST /payments/webhooks/:provider
- GET /payments/:id
- POST /refunds
- GET /ledger
- POST /reconciliation/run

### Tenancy and management
- GET /tenancies
- POST /tenancies
- GET /tenancies/:id
- GET /tenancies/:id/rent
- POST /tenancies/:id/notices
- POST /tenancies/:id/renew
- POST /tenancies/:id/move-out

### Maintenance
- GET /maintenance
- POST /maintenance
- GET /maintenance/:id
- POST /maintenance/:id/assign
- POST /maintenance/:id/estimate
- POST /maintenance/:id/approve
- POST /maintenance/:id/complete

### Investment gated
- GET /investments/opportunities
- POST /investments/opportunities
- GET /investments/opportunities/:id
- POST /investments/opportunities/:id/subscribe
- POST /investments/contributions
- GET /investments/portfolio
- GET /investments/distributions

### Trust and cases
- POST /proof
- GET /proof/:id
- POST /proof/:id/verify
- POST /proof/:id/dispute
- GET /pulse
- POST /cases
- GET /cases/:id
- POST /cases/:id/evidence
- POST /cases/:id/actions

### ABBA and swarms
- POST /abba/resolve
- POST /abba/chat
- GET /swarm/providers
- POST /swarm/ingest
- POST /swarm/tasks
- POST /swarm/actual-call
- GET /swarm/tasks/:id
- GET /agents
- POST /agents/:id/run

### Admin
- GET /admin/dashboard
- GET /admin/verification-queue
- GET /admin/seal-queue
- GET /admin/risk
- GET /admin/audit
- GET /admin/system-health
- PATCH /admin/feature-flags/:key

## Structured error format

```json
{
  "ok": false,
  "error": {
    "code": "permission_denied",
    "message": "Human SEAL approval is required for this action.",
    "correlation_id": "uuid"
  }
}
```
