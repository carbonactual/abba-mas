# BUNK Product Definition and Swarm Activation

## Product identity

BUNK is the campus and community layer for shelter, student life, local support, services, and trusted coordination.

It also extends into housing, construction, property, build proofs, and real-estate service pathways.

BUNK is not only a listing marketplace.
It is the trusted living and build environment around where people stay, study, work, build, repair, manage, and connect.

## First users

- students looking for safe and suitable accommodation
- landlords and property owners
- hostels and campus housing providers
- agents and verified property managers
- artisans, builders, repairers, and service providers
- schools and campus communities
- guardians and sponsors
- local businesses supporting student and community life

## Core problem

Housing and local support are fragmented, unverified, hard to compare, and difficult to trust.

Students and communities need one place to discover shelter, verify claims, inspect proof, coordinate services, manage tenancy, track repairs, and connect to nearby support.

## Product scope

### Shelter

- room, hostel, apartment, shared accommodation, and temporary stay discovery
- availability and occupancy
- price, deposits, fees, and payment terms
- distance to campus or destination
- amenities, utilities, safety, and access
- inspection and verification status

### Community

- trusted local contacts
- roommates and shared living coordination
- campus and neighborhood services
- transport, food, laundry, internet, health, study, and emergency support
- groups, notices, and community updates

### Property and build

- property and project registry
- ownership and management records
- documents and proof
- construction and renovation timelines
- inspection milestones
- contractor, artisan, supplier, and service-provider coordination
- repairs, maintenance, defects, and completion proof

### Tenancy and operations

- applications
- agreements
- rent schedules
- receipts
- issue reporting
- maintenance requests
- check-in and check-out
- inventory and condition records
- disputes and resolution records

## First MVP

The first BUNK release should support:

1. verified property and accommodation listings
2. search by location, price, room type, distance, and availability
3. listing proof and inspection status
4. landlord, agent, hostel, and service-provider profiles
5. viewing or inspection requests
6. application and interest flow
7. tenancy documents and receipts
8. maintenance and issue reporting
9. trusted local services around the property
10. HAPI connection for identity, consent, context, and PULSE

## HAPI boundary

BUNK remains a standalone product.

HAPI provides:

- shared # identity
- human and personal AI continuity
- consent through SEAL
- Actual context
- Becoming recommendations
- PULSE return
- permitted Root, Index, Continuum, merit, value, and ATLAS references

BUNK owns:

- listings
- properties
- units and rooms
- landlords and managers
- applications
- inspections
- tenancy
- maintenance
- service providers
- build projects
- local community operations

## Swarm activation

### Product swarm

Owns product definition, priorities, user journeys, and release scope.

### Housing and property swarm

Owns property, unit, listing, tenancy, inspection, document, and maintenance models.

### Campus and community swarm

Owns student life, local support, roommates, services, groups, and neighborhood coordination.

### Trust, proof, and safety swarm

Owns verification, fraud controls, inspection proof, dispute handling, safety signals, and audit trails.

### HAPI adapter swarm

Owns # identity, SEAL, Actual, Becoming, PULSE, and external verification integration.

### I/O value swarm

Owns lawful payment references, rent schedules, receipts, escrow readiness, fees, and settlement interfaces.

### Experience swarm

Owns mobile-first search, map, listing, viewing, application, tenancy, and maintenance experience.

### Data and intelligence swarm

Owns search, ranking, recommendation, location intelligence, availability, price comparison, and Index connections.

### Build and deployment swarm

Owns repository bootstrap, application architecture, database, APIs, tests, CI, deployment, monitoring, and security.

## Repository rule

BUNK must live in its own repository:

`B3C0M1NG/BUNK`

The repository should contain product code, domain contracts, HAPI adapter, database migrations, tests, documentation, deployment configuration, and monitoring.

## First build sequence

1. Create BUNK repository
2. Add product README and architecture
3. Build listing, property, unit, inspection, application, tenancy, maintenance, service-provider, and community schemas
4. Add HAPI adapter
5. Build Supabase schema and API routes
6. Build mobile-first web shell
7. Add search, filters, maps, and verification status
8. Add application, viewing, tenancy, and maintenance flows
9. Add tests, CI, monitoring, and deployment
10. Pilot with one campus or community
