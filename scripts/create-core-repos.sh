#!/usr/bin/env bash
set -euo pipefail

OWNER="carbonactual"
VISIBILITY="public"

repos=(
  "ecosystem-architecture|Master map for Carbon Actual organizations, repos, doctrines, products, AI, HAPI, pulse, value, governance, and integration lattice."
  "actual-value-engine|Universal value accounting, token classification, asset-liability inversion, loss recovery, replenishment, and value creation gate."
  "hapi-protocol|Human API protocol for HAPI identity, entry, consent, route, SEAL, training, and personal AI assignment."
  "pulse-token-protocol|Pulse capture, tokenization, classification, proof routing, return signal, and pulse-to-value lifecycle."
  "io-layer|I/O movement layer for PULSE received, VALUE sent, return PULSE, settlement, escrow, value state, and swarm movement."
  "becoming-feed|Curated value feed where raw signals are filtered into actionable Becoming values with route, proof need, risk, and expected PULSE."
  "actual-reveal-engine|Actual layer for qualified value reveal, public/private boundary, proof approval, and final activation."
  "seal-governance|SEAL policy, consent, permission, approval, internal/external gates, review rules, and human authority model."
  "atlas-public|Public visibility, public proof, biography, map, opportunity, and approved world-facing knowledge layer."
  "vault-protocol|Sensitive proof custody, private records, contract references, treasury references, and protected value records."
  "swarm-registry|Registry for product swarms, AI swarms, HAPI swarms, value swarms, tool swarms, proof swarms, and integration swarms."
  "integration-scout|Research, test, and gap-finding engine for APIs, SDKs, webhooks, no-code routes, open-source adapters, and partner integration paths."
  "ai-minting-engine|AI minting, AI assignment, website/function capsules, personal AI core, permissions, memory references, and SEAL-scoped activation."
  "entity-graph|Graph layer for HAPI, products, companies, apps, groups, organizations, tools, roots, values, pulses, and swarms."
  "carbonactual-sdk|Developer SDKs, API clients, integration helpers, event helpers, and app adapters for Carbon Actual ecosystem integration."
  "carbonactual-docs|Public and internal documentation hub for all Carbon Actual protocols, SDKs, build guides, doctrines, and integration manuals."
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

echo "Core repo lattice creation attempt complete."
