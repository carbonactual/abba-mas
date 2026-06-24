# SPARE API Contract

Base path: `/api/v1`

Every write route requires validation, authorization, audit logging, Pulse emission where meaningful, and SEAL gates for high-impact actions.

## Identification and discovery

- POST /identify/image
- POST /identify/barcode
- POST /identify/serial
- POST /identify/document
- POST /assist/problem

## Search

- POST /search
- POST /search/visual
- POST /search/similar

## Products

- GET /products/:id
- GET /products/:id/components
- GET /products/:id/manuals
- GET /products/:id/compatibility
- GET /products/:id/lifecycle

## Compatibility

- POST /compatibility/check
- POST /compatibility/claim
- POST /compatibility/review
- POST /compatibility/outcome

## Ownership

- POST /owned-products
- GET /owned-products
- GET /owned-products/:id
- PATCH /owned-products/:id
- POST /owned-products/:id/transfer
- POST /owned-products/:id/maintenance
- POST /owned-products/:id/service-record
- POST /owned-products/:id/status-report

## Marketplace

- GET /listings
- POST /listings
- GET /listings/:id
- PATCH /listings/:id
- POST /listings/:id/review
- POST /listings/:id/check-fit
- POST /orders
- GET /orders/:id
- POST /orders/:id/initialize-payment
- POST /orders/:id/cancel
- POST /orders/:id/return-request
- POST /orders/:id/case

## Repair and service

- POST /service/requests
- POST /service/quotes
- POST /service/jobs
- PATCH /service/jobs/:id/status
- POST /service/jobs/:id/report

## Verification and recovery

- POST /verification/requests
- GET /verification/requests/:id
- POST /verification/requests/:id/evidence
- POST /verification/requests/:id/decision
- POST /recovery/reports
- POST /recovery/found
- POST /recovery/match
- POST /recovery/claim

## Fabrication

- POST /fabrication/requests
- POST /fabrication/quotes
- POST /fabrication/jobs

## Vendor and enterprise

- GET /vendor/inventory
- POST /vendor/inventory
- POST /vendor/inventory/import
- GET /vendor/analytics
- GET /enterprise/assets
- POST /enterprise/assets
- POST /enterprise/work-orders
- POST /enterprise/procurement
- GET /enterprise/reports

## Webhooks

- POST /webhooks/payments
- POST /webhooks/logistics
- POST /webhooks/marketplace
- POST /webhooks/manufacturer

## Compatibility result shape

```json
{
  "status": "confirmed_compatible",
  "confidence": 0.94,
  "compatibility_type": "direct_fit",
  "evidence": [],
  "matched_attributes": [],
  "mismatched_attributes": [],
  "unknown_attributes": [],
  "required_adapters": [],
  "required_modifications": [],
  "safety_notes": [],
  "installation_notes": [],
  "verified_outcomes": 41,
  "failed_outcomes": 2,
  "review_required": false
}
```

Compatibility must never be reduced to a single boolean.
