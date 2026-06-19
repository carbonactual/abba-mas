# ABBA MAS Completion Standard

ABBA MAS is complete only when every control-plane layer below is implemented, tested, observable, and recoverable.

## 1. Command plane
- ChatGPT-originated instruction contract
- command validation
- repository and product routing
- allowlisted execution
- idempotency and retry rules
- durable result return

## 2. SEAL and trust plane
- source trust registry
- capability-level SEAL policy
- protected-action technical gates
- human final authority for regulated or irreversible execution
- immutable approval and rejection references

## 3. Provider plane
- machine-readable provider registry
- provider capability registry
- health checks
- cost and quota metadata
- fallback routes
- credential metadata without raw secrets
- lifecycle states: discovered, verified, sandboxed, active, degraded, paused, retired

## 4. Swarm plane
- swarm definition schema
- swarm factory
- worker membership
- capability assignment
- provider bindings
- budget and rate limits
- health, fallback, proof, and retirement behavior
- at least 1,000 generated swarm manifests does not equal 1,000 operational swarms; operational status requires runtime health evidence

## 5. Memory and Continuum plane
- memory ingestion contract
- retrieval contract
- provenance
- retention and deletion policy
- Memorae/Supermemory/Zep-Graphiti adapters or approved equivalents
- Vault exclusion rules

## 6. Proof plane
- deterministic execution receipt
- content hash
- timestamp route
- optional attestation route
- ATLAS publication only after SEAL

## 7. Observability plane
- structured logs
- traces
- provider health
- swarm health
- cost events
- failure queue
- retry queue
- incident records

## 8. Security plane
- CodeQL
- dependency updates
- secret scanning
- supply-chain pinning
- least-privilege workflow permissions
- protected environments
- backup and restore test

## 9. Data plane
- migrations
- row-level access policies
- command, provider, swarm, proof, cost, health, and audit tables
- retention controls
- export and recovery

## 10. Interface plane
- operator dashboard
- provider and swarm registry views
- health and cost views
- command results
- proof links
- pause and retirement controls

## 11. Scale truth rules
- Candidate integration: discovered record with source link
- Verified integration: license, maintenance, access, and security checked
- Connected integration: credentials/configuration present and health check reachable
- Active integration: successful production-safe call within policy
- Operational swarm: configured workers, provider routes, health evidence, and successful task receipt
- Counts must be generated from registries and evidence, never manually claimed

## Exit criteria
ABBA MAS may be described as production-complete only when:
1. all critical workflows pass on the default branch;
2. at least one end-to-end command succeeds from ChatGPT to proof return;
3. provider and swarm census files are generated automatically;
4. no raw secret is present in repository history after the security baseline date;
5. restore, fallback, and incident procedures have been tested;
6. dashboard and API expose the same verified counts;
7. every operational claim links to evidence.
