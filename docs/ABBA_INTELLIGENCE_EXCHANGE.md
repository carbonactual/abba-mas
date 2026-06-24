# ABBA Intelligence Exchange

The ABBA Intelligence Exchange is the governed intelligence-routing layer of Carbon Actual. OpenRouter is one replaceable model-access rail inside it.

## Components

- `registry/intelligence-exchange/models.json`: capability registry.
- `registry/intelligence-exchange/policies.json`: routing and product defaults.
- `registry/intelligence-exchange/schemas.json`: versioned structured outputs.
- `lib/intelligence-exchange.ts`: resolver, value scoring and proof envelope helpers.
- `POST /api/swarm/resolve`: selects policy, capabilities, schema and limits.
- `GET /api/swarm/registry`: returns model, policy and schema registries.
- `POST /api/swarm/context`: minimizes context and checks consent references.
- `POST /api/swarm/council`: plans primary, critic, verifier and resolver roles.
- `POST /api/swarm/evaluate`: ranks candidates and detects disagreement.
- `POST /api/swarm/openrouter`: streams model output and enforces provider preferences and structured output.
- `POST /api/swarm/usage`: calculates a value signal.
- `POST /api/swarm/feedback`: accepts correction and rating signals.
- `POST /api/swarm/proof`: generates a hashable metadata envelope.
- `supabase/migrations/002_intelligence_exchange.sql`: data foundation.

## Runtime sequence

1. Resolve the product task.
2. Select only relevant permitted context.
3. Plan the model council where verification is required.
4. Execute through the selected model rail.
5. Validate the output schema.
6. Compare results and detect disagreement.
7. calculate the usage and value signal.
8. generate proof metadata.
9. capture human feedback for adaptive routing.

## Boundaries

ABBA owns routing and resolution. SEAL governs permission and release. HAPI retains final human authority. Root, Index, ATLAS, Vault, Continuum and Proof retain their distinct ecosystem functions.

OpenRouter supplies model access only. It does not own ecosystem identity, memory, permissions, proof, policy or value.

## Activation checklist

1. Apply the Supabase migration.
2. Add application database policies.
3. Load tested model metadata and pricing.
4. Create product evaluation datasets.
5. Validate schemas for each allowed model.
6. Test interruption, fallback and retry behavior.
7. Connect metadata persistence without recording raw private prompts.
8. Connect Continuum through scoped retrieval adapters.
9. Keep `OPENROUTER_PRODUCTION_ENABLED=false` until testing and SEAL review are complete.
