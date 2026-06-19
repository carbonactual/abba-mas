# Continuous Build-as-We-Integrate Rule

ABBA MAS will evolve continuously as integrations are discovered, verified, connected, tested, and activated.

## Operating rule

Every new integration opportunity must improve the control plane rather than remain a static catalog entry.

For each provider, app, SDK, API, webhook, repository, agent, workflow, hardware route, or platform added, ABBA MAS must also add or update the relevant:

- provider registry record
- capability classification
- route type and access method
- setup and documentation links
- secret names only, never raw secret values
- cost or free-tier notes
- risk level and SEAL level
- health-check method
- fallback route
- activation state
- evidence and proof reference
- dashboard and census count

## Lifecycle

```text
Discovered
→ Verified
→ Sandboxed
→ Connected
→ Tested
→ Active
→ Observed
→ Proven
→ Optimized
→ Paused or Retired
```

## Swarm rule

A provider may support one or more swarms. A swarm is counted as operational only when it has:

- defined purpose and scope
- assigned workers or agents
- provider bindings
- current health evidence
- at least one successful task receipt
- cost and rate-limit controls
- fallback behavior
- proof reference

Generated manifests, templates, or placeholders must not be counted as operational swarms.

## Build priority while integrating

1. Keep command routing and result return working.
2. Add truthful provider and swarm census counts.
3. Add health, retry, failure, and fallback handling.
4. Add security and observability before production activation.
5. Add provider-specific adapters only after registry and policy classification.
6. Keep the operator dashboard aligned with APIs and registry evidence.
7. Never claim scale that is not supported by machine-readable evidence.

## Result rule

After each instruction from ChatGPT, return only the useful outcome and direct result links unless a failure requires a brief explanation.
