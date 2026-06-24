# BUNK — Product Operating Definition

Status: repo-ready seed package. Move this folder into `carbonactual/bunk` when the dedicated repo is created.

## 1. Executive product definition

BUNK is the property and housing route of the Carbon Actual ecosystem. It is a production-grade property operating system and marketplace for finding, listing, verifying, renting, buying, managing, operating, investing in, and proving property activity.

Positioning: **Property, properly connected.**

BUNK is not a generic listing site. It connects property identity, humans, permissions, evidence, agreements, payments, operations, intelligence, and value.

## 2. Assumptions and constraints

- First operational market: Nigeria.
- First pilot should use a controlled city/district cluster, not nationwide fake coverage.
- BUNK is not a bank, law firm, mortgage lender, escrow provider, or investment manager unless supported by licensed partners and jurisdiction-specific approvals.
- AI may recommend, classify, summarize, warn, and route; it cannot approve, reject, release funds, verify ownership, decide disputes, or grant SEAL.
- Public proof disclosure requires human SEAL approval.
- Investment pooling, mortgage orchestration, rent-to-own, and tokenized property routes stay behind feature flags until legal structure is ready.

## 3. Carbon Actual alignment

BEING: person, property, need, claim, condition, or opportunity exists.

BECOMING: the property route is being verified, matched, negotiated, inspected, funded, occupied, managed, improved, or transferred.

ACTUAL: verified outcome has formed, such as completed inspection, signed agreement, confirmed rent payment, verified occupancy, completed maintenance, paid commission, or resolved dispute.

Required shared layers:

- # identity
- ABBA resolver
- HAPI relationship route
- SEAL human authority
- ROOT lineage
- INDEX classification
- VAULT protected custody
- PROOF evidence and verification
- PULSE event stream
- ACTUAL formed state
- ATLAS permitted knowledge
- I/O money and value route

## 4. User-role matrix

A user can hold multiple roles. Active role is resolved per context.

| Role | Interface | High-risk actions | SEAL |
|---|---|---|---|
| Property seeker | Customer | application, payment, offer | 2-3 |
| Tenant | Customer | agreement, rent, maintenance claims | 3 |
| Buyer | Customer | offer, purchase, due diligence | 3-4 |
| Landlord/Owner | Partner | property claims, listing authority, agreements | 3 |
| Agent/Agency | Partner | listing publication, leads, commissions | 3 |
| Affiliate | Partner | lead attribution, commission | 2-3 |
| Property manager | Partner | rent, maintenance, notices | 3 |
| Developer/Sponsor | Partner | inventory, investment opportunities | 3-4 |
| Inspector/Valuer/Surveyor | Partner | evidence, reports | 3 |
| Lawyer/Legal reviewer | Partner/Admin | agreement review | 3-4 |
| Vendor | Partner | work orders, completion evidence | 2-3 |
| Investor | Customer/Partner | subscription, documents, distributions | 3-4 |
| Verification officer | Admin | verification decisions | 3 |
| Compliance officer | Admin | restrictions, disclosure gates | 3-4 |
| Finance officer | Admin | reconciliation, commission, payouts | 3 |
| Human SEAL approver | Admin | final authority | 3-4 |
| Super admin | Admin | platform control | 4 |
| ABBA/product AI agents | Internal | recommendations only | no final approval |

## 5. Complete feature map

Core modules:

1. Authentication and onboarding
2. Property registry
3. Units
4. Listings
5. Wanted requests
6. Search, discovery, map
7. AI matching
8. Lead and CRM management
9. Inspections
10. Applications and screening
11. Offers and negotiation
12. Agreements
13. Payments and ledger
14. Tenancy and occupancy
15. Property management
16. Maintenance and property services
17. Agent and agency system
18. Affiliate system
19. Investment and portfolio module
20. Rent-to-own
21. Mortgage and finance matching
22. Shortlets and serviced accommodation
23. Disputes and redress
24. Reviews and reputation
25. Notifications and communications
26. Analytics and reporting
27. ABBA interaction layer
28. Swarm operations
29. Admin command center
30. Provider and integration health

## 6. Information architecture

Public:
- Home, Search, Map, Property, Unit, Agent Directory, Agent Profile, Agency Profile, Developer Profile, Investments, Shortlets, Rent-to-own, Wanted, About, How it Works, Verification Guide, Safety, Pricing, Help, Insights, Legal, Contact.

Authentication:
- Sign up, Sign in, OTP, Forgot password, MFA, Role setup, Identity setup, Organization setup.

Customer app:
- Dashboard, Saved, Searches, Matches, Wanted, Inspections, Applications, Offers, Agreements, Payments, Tenancy, Maintenance, Messages, Documents, Proof timeline, Notifications, Settings, Privacy.

Partner portal:
- Dashboard, Properties, Units, Listings, Leads, CRM, Inspections, Applications, Offers, Agreements, Tenancies, Payments, Commissions, Maintenance, Vendors, Portfolio, Reports, Team, Compliance, Documents, Profile, Billing, Integrations.

Admin:
- Command center, Users, Organizations, Properties, Units, Listings, Verification, SEAL, Proof, Payments, Reconciliation, Commissions, Cases, Disputes, Risk, Content, Notifications, Support, Providers, Swarms, AI Activity, Audit, Analytics, Feature flags, Configuration, Data requests, Health.

## 7. Main journeys

1. Tenant searches, saves, books inspection, applies, signs, pays, and enters tenancy.
2. Owner creates property, submits proof, receives human review, publishes listing, receives lead.
3. Agent receives lead, schedules inspection, records outcome, negotiates offer, earns commission.
4. Admin detects duplicate/suspicious listing, suspends it, preserves evidence.
5. Tenant reports maintenance, vendor completes work, proof is formed.
6. Landlord views rent, arrears, maintenance, and monthly property report.
7. Investor reviews opportunity, sees risk disclosure, submits interest under compliance gate.
8. ABBA recommends action but human SEAL remains final.

## 8. Technical architecture

Frontend:
- Next.js App Router, TypeScript, React, Tailwind, shadcn/ui-compatible components, React Hook Form, Zod, TanStack Query, PWA.

Backend:
- Next.js server routes, TypeScript service layer, REST v1 API, event-driven Pulse, background workers.

Database:
- PostgreSQL/Supabase, PostGIS, RLS, migrations, seed data, audit tables, append-only ledger.

Storage:
- Supabase Storage or S3-compatible storage, MinIO path, signed URLs, document hashing, malware scanning hook.

AI:
- ABBA provider router for OpenAI, Gemini, Anthropic, OpenRouter, structured outputs, prompt versioning, tool authorization, cost tracking, human escalation.

Search:
- Postgres full text for MVP, PostGIS for geospatial, Typesense for scalable discovery, vector search for semantic matching.

Automation:
- n8n workflows, webhooks, queue jobs, scheduled reminders, retry logic.

Payments:
- provider abstraction: Monnify, Paystack, Flutterwave, Stripe where supported. Webhook verification, idempotency, reconciliation.

Monitoring:
- Sentry, OpenTelemetry-ready logs, provider health, audit logs, uptime checks.

Deployment:
- Vercel, Supabase, GitHub Actions, preview environments, staging/production separation, Coolify-compatible path. Do not use DreamHost.

## 9. Database ER summary

Major domains:

- Identity and access: profiles, organizations, roles, permissions, identities, verification profiles, consent, SEAL, sessions, devices.
- Property: properties, addresses, locations, owners, managers, buildings, units, amenities, media, documents, relationships, valuations.
- Listings: listings, prices, fees, terms, views, saves, shares, wanted requests, matches.
- CRM: leads, sources, assignments, activities, referrals, affiliate links, attribution.
- Inspections: inspections, attendees, checklists, evidence, reports.
- Deals: applications, guarantors, offers, negotiations, agreements, signatures, handovers.
- Tenancy: tenancies, occupants, rent schedules, obligations, notices, renewals, move-in/out.
- Finance: accounts, invoices, payments, ledger entries, reconciliation, commissions, payouts, expenses.
- Maintenance: requests, evidence, work orders, vendors, estimates, completion.
- Investment: opportunities, documents, subscriptions, contributions, units, updates, distributions.
- Communication: conversations, messages, notifications, logs.
- Trust/governance: root, index, proof, pulse, actual, atlas, vault, audit, risk, cases.
- AI/swarm: agents, versions, permissions, runs, tool calls, swarms, providers, health, escalations.
- System: feature flags, settings, webhooks, job queue, integrations, exports, privacy requests.

## 10. API contract outline

All APIs are versioned under `/api/v1`. They require auth middleware, authorization middleware, input validation, rate limiting, correlation IDs, idempotency for writes, audit logging, structured errors, pagination, filtering, sorting, webhook verification, and transaction boundaries.

Families:
- auth and identity
- properties
- listings
- search and matching
- CRM
- inspections
- applications and deals
- payments
- tenancy and management
- maintenance
- investment
- trust and cases
- ABBA and swarms
- admin

## 11. Security and permission model

Controls:
- least privilege, RLS, organization isolation, secure cookies, CSRF where applicable, rate limiting, MFA for privileged roles, session expiry, device history, signed URLs, file restrictions, malware scan hook, CSP, input sanitization, SSRF/XSS/SQL injection protections, webhook signatures, idempotency, immutable audit logs, sensitive-action reauthentication, backups, retention, privacy export, deletion workflow, redaction, AI prompt-injection defenses, AI tool authorization.

Property-specific controls:
- protect precise locations when sensitive, hide access instructions until authorized, protect tenant identity, protect owner documents, watermark sensitive documents, detect duplicate imagery, suspicious pricing, fake listing bursts, unauthorized changes, emergency listing suspension, evidence preservation.

## 12. AI agents and swarm architecture

BUNK swarms:
- Discovery, Listing, Verification, Match, Inspection, Transaction, Tenancy, Property Operations, Investment, Finance, Risk and Redress, Growth, Support, Compliance, Portfolio Intelligence.

BUNK agents:
- BUNK Guide, Match, Verify, List, Agent, Landlord, Tenant, Manager, Inspect, Maintain, Deal, Ledger, Invest, Risk, Redress, Growth, Admin.

Agent law:
- unique identity, explicit scope, least privilege, tool-call logging, confidence/evidence return, escalation, no impersonation, no self-SEAL, no silent verified-record modification, Pulse events, Root lineage.

## 13. MVP scope

Deployable MVP:
1. Auth and role onboarding
2. Public search
3. Property/unit registry
4. Listing creation
5. Listing review/publication
6. Map search
7. Wanted requests
8. AI matching
9. Saved properties/searches
10. Lead CRM
11. Inspection booking
12. Offers
13. Basic agreements
14. Payment links/tracking
15. Tenant and landlord dashboards
16. Maintenance requests
17. Agent and affiliate profiles
18. Proof and Pulse timelines
19. Human SEAL queue
20. Admin verification/moderation
21. ABBA property assistant
22. Notifications
23. Analytics
24. Audit logs
25. Deployment

Feature-flagged: investment pooling, mortgage orchestration, rent-to-own, advanced tokenization.

## 14. Build phases

1. Foundation
2. Marketplace
3. Deals
4. Living Property
5. Growth
6. Financial Expansion
7. Ecosystem Expansion

## 15. Integration registry

Core integrations:
- Supabase/Postgres/PostGIS/Auth/Storage
- Vercel
- GitHub Actions
- n8n
- OpenAI/Gemini/Anthropic/OpenRouter
- Typesense
- Map provider abstraction: OSM/Mapbox/Google Maps
- Monnify/Paystack/Flutterwave/Stripe
- Resend/SMS/WhatsApp provider abstraction
- Sentry/PostHog/OpenTelemetry
- E-signature provider abstraction
- Document scanning/malware scan provider abstraction
- InstituteGPT certification route for agents/vendors

## 16. Compliance gates

- Legal templates jurisdiction-aware.
- Investment opportunities disabled until structure and disclosures are approved.
- Mortgage matching uses regulated partners.
- Payment/escrow-like states use licensed providers and correct terms.
- Data protection follows Nigeria-first privacy configuration and export/delete flows.
- Public proof requires SEAL approval.

Nigeria’s data-protection authority is the NDPC, so privacy operations must be designed for NDPA/NDPC expectations from the start. Current implementation should keep consent, retention, audit, access control, privacy exports, and deletion workflows explicit.

## 17. Monetization model

Revenue routes:
- premium listings, verified-listing fees, agent/agency subscriptions, landlord management subscriptions, tenant convenience services, inspection coordination, transaction success fees, property management fees, commission sharing, affiliate margin, maintenance marketplace fee, shortlet booking fee, developer packages, enterprise accommodation, portfolio analytics, due-diligence packages, permitted referrals, rent collection/reconciliation service, compliant investment administration, API/data services, white-label property OS.

## 18. Launch plan

Pilot Nigeria in one city/district cluster. Recommended start: verified residential rentals, student/young-professional housing, agent/landlord operations, inspections, rent collection, maintenance. Shortlets after rental workflows stabilize.

Trust launch:
- say exactly what verification means
- show fees clearly
- show listing lineage
- show last verification date
- easy reporting
- remove stale listings
- track inspection outcomes
- avoid inflated inventory claims

## 19. Testing plan

Tests:
- unit, API integration, database policy, permissions, payment webhook, event, AI structured output, AI permission, search, geospatial, file access, audit log, e2e, accessibility, mobile, load, security.

Critical e2e scenarios:
- tenant route, owner route, agent route, suspicious listing, maintenance, landlord report, dispute, AI recommendation with human approval, public proof blocked before SEAL, org isolation.

## 20. Deployment plan

Environments:
- development
- staging
- production

Deployment:
- Vercel app
- Supabase project
- GitHub Actions CI
- env validation
- migration workflow
- seed workflow
- preview deployments
- monitoring and alerting

## 21. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Fake listings | verification queue, duplicate detection, human moderation |
| Hidden fees | required fee disclosure fields |
| AI overreach | SEAL middleware and tool authorization |
| Sensitive document exposure | Vault signed URLs, watermarking, audit logs |
| Investment compliance | feature flags and legal gates |
| Payment disputes | immutable ledger, proof, reconciliation |
| Stale listings | expiry reminders, availability checks |
| Role confusion | active role resolver |
| Data breach | RLS, least privilege, monitoring |

## 22. Definition of done

BUNK MVP is done only when the full route works: account, property creation, evidence submission, human review, listing publication, search, save, wanted request, explainable AI match, inspection booking/completion, offer, human acceptance/counter, agreement review/signing, payment confirmation, tenancy activation, rent tracking, maintenance completion, Proof/Pulse records, Vault protection, admin audit, AI cannot approve its own work, public disclosure requires SEAL, tests pass, documented deployment works, and no fake active buttons remain.
