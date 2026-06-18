#!/usr/bin/env bash
set -euo pipefail

OWNER="carbonactual"
VISIBILITY="public"

# Consolidated core only.
# Deferred modules remain inside ABBA MAS, Actual Value Engine, HAPI Protocol, Ecosystem Governance, SDK, or Entity Graph until separation is justified.

repos=(
  "actual-value-engine|Combined PULSE and VALUE engine for value accounting, token classification, asset-liability inversion, loss recovery, replenishment, and value creation."
  "hapi-protocol|Human API protocol for # formation, HAPI identity, consent, SEAL, personal AI assignment, and function capsules."
  "ecosystem-governance|Master governance, SEAL policy, repo lattice, ATLAS, Vault, public-private boundaries, and ecosystem architecture."
  "carbonactual-sdk|Developer SDKs, API clients, adapters, event helpers, integration helpers, and starter kits."
  "entity-graph|Graph layer for HAPI, products, companies, apps, organizations, tools, roots, values, pulses, swarms, and relationships."
)

for entry in "${repos[@]}"; do
  IFS="|" read -r name description <<< "$entry"
  echo "Creating $OWNER/$name"
  gh repo create "$OWNER/$name" \
    --$VISIBILITY \
    --description "$description" \
    --add-readme \
    --confirm || true

done

echo "Consolidated core repo lattice creation attempt complete. ABBA MAS already exists and remains the integration/swarm command center."
