# SPARE — Product Operating Definition

Status: repo-ready seed package. Move this folder into `carbonactual/spare` when the dedicated repo is created.

## Executive product definition

SPARE is the product continuity route of the Carbon Actual ecosystem. It is a production-ready, modular, intelligent infrastructure for product discovery, compatibility, ownership, repair, replacement, procurement, recovery, aftermarket commerce, and product-life records.

SPARE answers: What is this? What fits? Where can I get it? Who can fix it? Is it original? Is repair worth it? Who owns it? What happened to it? What should happen next?

SPARE is not only a spare-parts marketplace. It is a universal product intelligence and continuity system.

## Core positioning

**Find what fits. Prove what lasts. Keep products alive.**

Internal positioning: From product to part, from repair to proof, from ownership to continuity.

## Carbon Actual alignment

- # gives every product, part, owner, listing, repair, proof, technician, vendor, transaction, warranty, and lifecycle event an identity.
- ABBA resolves user intent and routes work to SPARE swarms.
- HAPI connects owners, technicians, vendors, manufacturers, insurers, logistics providers, buyers, and enterprises.
- SEAL controls consent, verification, protected documents, ownership transfer, warranty claims, funds, and high-risk decisions.
- ROOT preserves provenance: who claimed, uploaded, scanned, verified, repaired, sold, transferred, or retired an item.
- INDEX classifies products, parts, fitment, vendors, technicians, categories, conditions, risks, and locations.
- VAULT protects receipts, invoices, manuals, warranties, serials, certificates, private images, ownership records, and service reports.
- PROOF records identity, authenticity, compatibility, ownership, repair, purchase, warranty, recovery, and transaction evidence.
- PULSE emits lifecycle events.
- ACTUAL represents formed states such as confirmed identity, verified compatibility, completed repair, confirmed ownership, or completed sale.
- ATLAS exposes permitted public product knowledge, repair maps, vendor maps, compatibility graphs, and guides.
- I/O handles marketplace payments, escrow-like states through licensed providers, refunds, commissions, procurement, warranty payouts, and reconciliation.
- Institute GPT certifies technicians, vendors, inspectors, and product knowledge.

## Primary modules

1. SPARE Vision — camera-first product and component identification.
2. SPARE Search — multimodal search by text, image, barcode, serial, VIN, IMEI, SKU, OEM number, dimensions, symptom, error code, voice, or video frame.
3. SPARE Match — compatibility and fitment engine.
4. SPARE Graph — product/part/compatibility/lifecycle knowledge graph.
5. SPARE Market — commerce for new, used, refurbished, OEM, aftermarket, fabricated, salvage parts and services.
6. SPARE Repair — diagnosis, technician marketplace, booking, quotations, repair tracking, reports.
7. SPARE Own — ownership, warranty, receipts, manuals, product passports, lifecycle history.
8. SPARE Procure — enterprise procurement, RFQ, inventory, approval workflows, vendor comparison.
9. SPARE Recover — lost/stolen/abandoned product reporting and recovery.
10. SPARE Verify — authenticity, serial checks, condition grading, vendor claims, technician confirmation.
11. SPARE Logistics — pickup, delivery, heavy transport, warehousing, cross-border routing.
12. SPARE Intelligence — repair/replace/upgrade/salvage/retire recommendations.

## User groups

- Everyday product owners
- Vehicle owners
- Technicians and repair professionals
- Vendors and merchants
- Manufacturers and brands
- Fabricators
- Logistics providers
- Enterprises
- Insurers and warranty providers
- Recyclers and salvage operators
- Collectors and restorers
- Inspectors and verification partners

## Three-interface model

### Customer interface
Scan, search, identify, compare, buy, book repair, track ownership, retrieve manual, report missing, store proof.

### Partner/operator interface
Vendor inventory, technician jobs, workshop bookings, manufacturer data upload, fabricator RFQs, logistics assignments, enterprise procurement, warranty/insurance verification.

### Admin interface
Verification queues, duplicate detection, compatibility dispute review, marketplace moderation, vendor compliance, fraud/risk, SEAL approvals, provider health, AI activity, audit, analytics, feature flags.

## Core user journeys

1. User scans unknown part, receives probable identity, compatibility options, nearby vendors, and repair advice.
2. Vehicle owner enters VIN/model/year and gets exact/compatible parts with evidence.
3. Technician diagnoses symptom, creates quote, orders likely parts, completes repair, and produces proof.
4. Vendor uploads inventory, maps OEM numbers, receives fitment-linked leads.
5. Enterprise uploads assets, tracks maintenance cycles, procurement, downtime, and stock risk.
6. Owner stores receipts, warranty, manuals, serials, service history, and resale proof.
7. User reports product missing; recovery route protects ownership data and disclosure boundaries.
8. Manufacturer publishes official compatibility data and documentation.
9. Fabricator receives request for discontinued part and submits quote with tolerances.
10. Insurer validates damage, repair estimate, replacement cost, and proof.

## MVP scope

1. Camera/upload/text search entry.
2. Product identity records.
3. Part records.
4. Compatibility records.
5. Marketplace listings.
6. Vendor/technician profiles.
7. Repair requests.
8. Ownership vault records.
9. Proof and Pulse timelines.
10. ABBA resolve route.
11. Admin verification/moderation queue.
12. Search and filtering.
13. Compatibility explanation.
14. Nigerian demo data.
15. Supabase/Postgres schema.
16. API scaffolds.
17. App shell.
18. Deployment-ready config.

Feature-flagged for later: insurance claims, escrow-like states, financing, warranty payout automation, IoT device telemetry, tokenized lifecycle value, advanced manufacturer APIs.

## Swarms

- Vision Swarm: image, OCR, barcode, QR, label, shape, connector, damage detection.
- Search Swarm: text, semantic, vector, category, serial, SKU, VIN, IMEI, OEM search.
- Match Swarm: compatibility, fitment, alternatives, unsafe flags.
- Graph Swarm: product graph, part graph, lifecycle graph.
- Market Swarm: listings, offers, RFQs, inventory, orders.
- Repair Swarm: diagnosis, technicians, bookings, quotes, reports.
- Ownership Swarm: product passport, receipts, warranty, transfer, recovery.
- Vendor Swarm: merchants, distributors, manufacturers, fabricators, inventory.
- Logistics Swarm: delivery, pickup, warehousing, tracking.
- Enterprise Swarm: procurement, assets, maintenance, approvals, stock.
- Proof Swarm: authenticity, ownership, repair, compatibility, transaction proof.
- Risk Swarm: fake parts, unsafe fitment, stolen items, suspicious vendors.
- Growth Swarm: SEO, affiliate, creator demos, repair communities, vendor acquisition.
- Support Swarm: user triage, knowledge base, escalation.
- Compliance Swarm: privacy, safety, regulated products, warranty/insurance gates.

## AI agents

- SPARE Guide
- SPARE Vision
- SPARE Match
- SPARE Repair
- SPARE Vendor
- SPARE Procure
- SPARE Own
- SPARE Recover
- SPARE Verify
- SPARE Ledger
- SPARE Risk
- SPARE Admin

Agent law: no agent grants its own SEAL, verifies final ownership alone, approves funds, declares fitment without evidence, impersonates technicians, or silently modifies verified records.

## Technical architecture

Frontend: Next.js App Router, TypeScript, Tailwind, camera-first PWA, accessible components.
Backend: Next.js API routes first, TypeScript service packages, event-driven Pulse, worker-ready.
Database: Supabase/Postgres, pgvector-ready, graph tables, audit, proof, append-only lifecycle events.
Storage: Supabase/S3-compatible Vault with signed URLs, hashes, redaction, scan hook.
AI: OpenAI/Gemini/Anthropic/OpenRouter provider router, vision route, structured outputs, tool authorization.
Search: Postgres FTS MVP, Typesense/OpenSearch later, vector image/text embeddings later.
Commerce: provider abstraction for Paystack, Monnify, Flutterwave, Stripe where supported.
Automation: n8n workflows for intake, missing info, quote, booking, delivery, proof, alerts.
Monitoring: Sentry, PostHog, OpenTelemetry-ready logs.
Deployment: Vercel + Supabase + GitHub Actions, Coolify-compatible. Do not use DreamHost.

## Definition of done

SPARE MVP is complete when a user can scan/upload/ask, create a product identity, receive explainable candidates, compare compatible parts, save ownership records, create a repair request, contact or book a technician/vendor, buy or request a quote, generate Proof and Pulse, and admins can audit, moderate, and gate high-risk claims with SEAL.
