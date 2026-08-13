# ABBA MAS — Ecosystem Role & Consolidation v1

## Canonical role

ABBA MAS is the governed execution, command, routing, SEAL, and proof coordination layer of Carbon Actual. It is not a second Carbon Actual constitution, a replacement for the Core/Foundation/Floor, or an independent sovereign AI.

## Authority hierarchy

```text
Being / Constitution
        ↓
Core / Foundation / Floor
        ↓
Human authority + SEAL
        ↓
ABBA / ABBA MAS interpretation and orchestration
        ↓
Workers / adapters / providers
        ↓
Execution
        ↓
Proof / Pulse / Actual
```

ABBA MAS may interpret, classify, route, validate, monitor, and coordinate. It must not self-issue authority or bypass SEAL.

## Repository boundaries

- `B3C0M1NG/carbon_actual` — canonical Carbon Actual ecosystem operating spine.
- `carbonactual/abba` — ABBA agent/runtime and master-doctrine implementation; must consume the canonical ecosystem contract rather than redefine it.
- `carbonactual/abba-mas` — command/routing/execution-control layer.
- Product repositories — product-specific implementations that inherit Core/Foundation/Floor.
- External providers — execution destinations or upstream dependencies, not Carbon Actual constitutional components.

## Consolidation rule

If a capability exists in multiple ABBA repositories, classify it as one of:

1. Canonical runtime capability.
2. MAS orchestration capability.
3. Shared Foundation/Floor capability.
4. Product capability.
5. Adapter/provider integration.
6. Historical/experimental implementation.

Do not maintain parallel implementations merely because their names differ.

## Economic boundary

I/O may be coordinated through MAS, but MAS is not itself the financial ledger. Canonical value movement, ledger, tokenization, minting, provenance, and economic authority must remain governed by the ecosystem Foundation/Floor contracts.

## Security boundary

SEAL is the authority boundary. Vault/protected stores hold sensitive custody. Ash records compromised, revoked, retired, or quarantined states. Phoenix governs verified recovery and re-authorization. Raw credentials must never enter repository content.

## Command lifecycle

```text
Human / authorized source
→ instruction
→ structured command
→ classification
→ policy validation
→ SEAL evaluation
→ worker/provider route
→ execution
→ verification
→ proof
→ Pulse
→ Actual
```

## Anti-duplication rule

ABBA MAS should strengthen the ecosystem by routing existing capabilities before creating new ones. New shared capabilities should be promoted to Foundation/Floor when multiple products require them.

## Freeze requirement

Future ABBA MAS changes must pass the Carbon Actual Common Denominator / Product Inheritance / Conformance contracts before becoming production behavior.
