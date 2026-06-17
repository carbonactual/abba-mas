import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

type SwarmProvider = {
  provider_key: string;
  display_name: string;
  swarm_layer: string;
  route_type: string;
  function: string;
  seal_level_default: string;
  risk_level: string;
  credential_names: string[];
  setup_links: string[];
  cost_note: string;
  status: string;
  allowed_data: string[];
  forbidden_data: string[];
  activation_path: string;
  source?: string;
};

type OpenAlternativeProvider = {
  id: string;
  name: string;
  category: string;
  route_type: string[];
  function_classification: string[];
  access_method: string;
  cost_notes: string;
  risk_level: string;
  seal_level: number;
  secret_names: string[];
  setup_links: string[];
  activation_path: string[];
};

type OpenAlternativeRegistry = {
  providers: OpenAlternativeProvider[];
};

async function readJsonFile<T>(...segments: string[]): Promise<T> {
  const file = path.join(process.cwd(), ...segments);
  const raw = await readFile(file, "utf8");
  return JSON.parse(raw) as T;
}

async function loadProviders(): Promise<SwarmProvider[]> {
  return readJsonFile<SwarmProvider[]>("data", "abba-swarm-providers.json");
}

async function loadOpenAlternativeProviders(): Promise<SwarmProvider[]> {
  const registry = await readJsonFile<OpenAlternativeRegistry>(
    "registry",
    "openalternative",
    "free-open-source-provider-registry.json"
  );

  return registry.providers.map((provider) => ({
    provider_key: `openalternative_${provider.id}`,
    display_name: provider.name,
    swarm_layer: `openalternative_${provider.category.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "")}`,
    route_type: provider.route_type.join(", "),
    function: provider.function_classification.join("; "),
    seal_level_default: `SEAL-${provider.seal_level}`,
    risk_level: provider.risk_level,
    credential_names: provider.secret_names,
    setup_links: provider.setup_links,
    cost_note: provider.cost_notes,
    status: "candidate_free_oss_production_blocked",
    allowed_data: [
      "public documentation",
      "masked test data",
      "sandbox events",
      "integration metadata",
      "proof references"
    ],
    forbidden_data: [
      "raw secrets",
      "private keys",
      "banking credentials",
      "unredacted identity files",
      "actual_value",
      "vault documents",
      "irreversible external actions without SEAL"
    ],
    activation_path: provider.activation_path.join(" -> "),
    source: "openalternative_free_oss"
  }));
}

function credentialPresence(credentialNames: string[]) {
  return credentialNames.reduce<Record<string, boolean>>((acc, name) => {
    acc[name] = Boolean(process.env[name]);
    return acc;
  }, {});
}

export async function GET() {
  const coreProviders = await loadProviders();
  const openAlternativeProviders = await loadOpenAlternativeProviders();
  const providers = [...coreProviders, ...openAlternativeProviders];

  const safeProviders = providers.map((provider) => ({
    ...provider,
    value_visibility_default: "masked",
    actual_call_required_for_value: true,
    production_blocked_by_default: provider.source === "openalternative_free_oss",
    credential_presence: credentialPresence(provider.credential_names),
    credential_values_hidden: true
  }));

  return Response.json({
    status: "ABBA MAS swarm provider registry online",
    doctrine: "Memory stores masked references. Actual reveals value only after ABBA resolution and SEAL approval.",
    provider_count: safeProviders.length,
    openalternative_free_oss_count: openAlternativeProviders.length,
    layers: Array.from(new Set(safeProviders.map((provider) => provider.swarm_layer))),
    sources: Array.from(new Set(safeProviders.map((provider) => provider.source ?? "abba_core"))),
    providers: safeProviders,
    timestamp: new Date().toISOString()
  });
}
