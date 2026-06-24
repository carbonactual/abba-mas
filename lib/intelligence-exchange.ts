import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

export type DataClass = "public" | "masked" | "sandbox" | "sensitive";
export type ExchangeRequest = {
  product?: string;
  operation?: string;
  task_type?: string;
  required_capabilities?: string[];
  preferred_policy?: string;
  response_schema_id?: string;
  data_class?: DataClass;
  seal_level?: number;
  consent_ref?: string;
  max_cost_usd?: number;
  maximum_latency_ms?: number;
  minimum_confidence?: number;
  retry_budget?: number;
  evidence_refs?: string[];
  allowed_tools?: string[];
  forbidden_tools?: string[];
};

type Registry = Record<string, unknown>;

function readRegistry(file: string): Registry {
  const target = path.join(process.cwd(), "registry", "intelligence-exchange", file);
  return JSON.parse(fs.readFileSync(target, "utf8")) as Registry;
}

export function getModelRegistry() {
  return readRegistry("models.json");
}

export function getPolicyRegistry() {
  return readRegistry("policies.json");
}

export function getSchemaRegistry() {
  return readRegistry("schemas.json");
}

export function getSchema(schemaId?: string) {
  if (!schemaId) return undefined;
  const registry = getSchemaRegistry() as { schemas?: Record<string, Record<string, unknown>> };
  return registry.schemas?.[schemaId];
}

export function resolveExchange(input: ExchangeRequest) {
  const registry = getPolicyRegistry() as {
    default_policy?: string;
    policies?: Record<string, Record<string, unknown>>;
    products?: Record<string, {
      default_policy?: string;
      required_capabilities?: string[];
      default_schema?: string;
    }>;
  };

  const productKey = input.product ?? "abba";
  const product = registry.products?.[productKey] ?? registry.products?.abba ?? {};
  const policyKey = input.preferred_policy ?? product.default_policy ?? registry.default_policy ?? "balanced";
  const policy = registry.policies?.[policyKey] ?? registry.policies?.balanced ?? {};
  const requiredCapabilities = Array.from(new Set([
    ...(product.required_capabilities ?? []),
    ...(input.required_capabilities ?? [])
  ]));
  const schemaId = input.response_schema_id ?? product.default_schema ?? "abba.task-result.v1";
  const minimumSeal = Number(policy.minimum_seal_level ?? 1);
  const providedSeal = input.seal_level ?? 0;
  const sensitive = input.data_class === "sensitive";
  const sealSatisfied = !sensitive || (providedSeal >= Math.max(4, minimumSeal) && Boolean(input.consent_ref));

  return {
    request_id: crypto.randomUUID(),
    product: productKey,
    operation: input.operation ?? input.task_type ?? "general",
    selected_policy: policyKey,
    provider_policy: String(policy.provider_policy ?? policyKey),
    objective: String(policy.objective ?? "maximum_value"),
    required_capabilities: requiredCapabilities,
    response_schema_id: schemaId,
    response_schema: getSchema(schemaId),
    limits: {
      max_cost_usd: input.max_cost_usd ?? null,
      maximum_latency_ms: input.maximum_latency_ms ?? null,
      minimum_confidence: input.minimum_confidence ?? policy.minimum_confidence ?? 0.75,
      retry_budget: input.retry_budget ?? policy.max_retries ?? 1
    },
    permissions: {
      data_class: input.data_class ?? "masked",
      seal_level: providedSeal,
      consent_ref_present: Boolean(input.consent_ref),
      seal_satisfied: sealSatisfied,
      allowed_tools: input.allowed_tools ?? [],
      forbidden_tools: input.forbidden_tools ?? []
    },
    verification: policy.verification ?? "on_low_confidence",
    human_final_authority: true,
    production_allowed: sealSatisfied
  };
}

export function scoreRoute(input: {
  quality: number;
  cost: number;
  latency: number;
  privacy: number;
  reliability: number;
}) {
  const clamp = (value: number) => Math.max(0, Math.min(1, value));
  const score =
    clamp(input.quality) * 0.35 +
    clamp(1 - input.cost) * 0.15 +
    clamp(1 - input.latency) * 0.15 +
    clamp(input.privacy) * 0.2 +
    clamp(input.reliability) * 0.15;
  return Number(score.toFixed(4));
}

export function buildProofEnvelope(input: {
  request_id: string;
  product: string;
  operation: string;
  model?: string;
  provider?: string;
  policy: string;
  schema?: string;
  latency_ms?: number;
  estimated_cost_usd?: number;
  confidence?: number;
  evidence_refs?: string[];
  seal_level?: number;
  status: string;
}) {
  const createdAt = new Date().toISOString();
  const publicPayload = {
    request_id: input.request_id,
    product: input.product,
    operation: input.operation,
    model: input.model ?? null,
    provider: input.provider ?? null,
    policy: input.policy,
    schema: input.schema ?? null,
    latency_ms: input.latency_ms ?? null,
    estimated_cost_usd: input.estimated_cost_usd ?? null,
    confidence: input.confidence ?? null,
    evidence_refs: input.evidence_refs ?? [],
    seal_level: input.seal_level ?? 0,
    status: input.status,
    created_at: createdAt
  };
  const hash = crypto.createHash("sha256").update(JSON.stringify(publicPayload)).digest("hex");
  return { ...publicPayload, proof_hash: hash, raw_prompt_included: false, raw_response_included: false };
}
