# OMNII Conformance Contract — ABBA MAS

Status: CONFORMING PRODUCT BOUNDARY
Common Layer: OMNII Common Layer v1.0.0
Architectural class: reusable capability / orchestration product

ABBA MAS is the command, routing, proof and execution-coordination surface. It consumes OMNII semantics and never becomes a competing authority or universal runtime.

Shared contracts: Identity, Relationship, Intent, Capability, Discovery, Matching, Context, Availability, Authority, Authorization, Workflow, Execution, Evidence, Outcome, Settlement, Audit, Interoperability.

Execution rule: `Intent → Authority → Authorization → Action → Execution → Evidence → Outcome → Ledger`.

ABBA MAS may route and coordinate only within delegated authority. SEAL/human approval remains authoritative where required. Provider routes, workers, APIs and GitHub workflows are integration adapters beneath OMNII contracts.

Hard boundaries: capability != authority; intelligence != authority; routing != authorization; proof != authority; execution != outcome; vendor != constitutional dependency.
