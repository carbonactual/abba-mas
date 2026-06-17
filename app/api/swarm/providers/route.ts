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

type CandidateProvider = {
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
  status?: string;
  abba_policy?: {
    allowed_data?: string[];
    forbidden_data?: string[];
  };
};

type CandidateRegistry = {
  providers: CandidateProvider[];
};

async function readJsonFile<T>(...segments: string[]): Promise<T> {
  const file = path.join(process.cwd(), ...segments);
  const raw = await readFile(file, "utf8");
  return JSON.parse(raw) as T;
}

async function loadProviders(): Promise<SwarmProvider[]> {
  return readJsonFile<SwarmProvider[]>("data", "abba-swarm-providers.json");
}

function slug(input: string) {
  return input.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
}

function mapCandidate(provider: CandidateProvider, source: string, status: string): SwarmProvider {
  return {
    provider_key: `${source}_${provider.id}`,
    display_name: provider.name,
    swarm_layer: `${source}_${slug(provider.category)}`,
    route_type: provider.route_type.join(", "),
    function: provider.function_classification.join("; "),
    seal_level_default: `SEAL-${provider.seal_level}`,
    risk_level: provider.risk_level,
    credential_names: provider.secret_names,
    setup_links: provider.setup_links,
    cost_note: provider.cost_notes,
    status: provider.status ?? status,
    allowed_data: provider.abba_policy?.allowed_data ?? [
      "public documentation",
      "masked test data",
      "sandbox events",
      "integration metadata",
      "proof references"
    ],
    forbidden_data: provider.abba_policy?.forbidden_data ?? [
      "raw secrets",
      "private keys",
      "banking credentials",
      "unredacted identity files",
      "actual_value",
      "vault documents",
      "irreversible external actions without SEAL"
    ],
    activation_path: provider.activation_path.join(" -> "),
    source
  };
}

async function loadCandidateRegistry(
  fileSegments: string[],
  source: string,
  status = "candidate_production_blocked"
): Promise<SwarmProvider[]> {
  const registry = await readJsonFile<CandidateRegistry>(...fileSegments);
  return registry.providers.map((provider) => mapCandidate(provider, source, status));
}

async function loadOpenRouterProvider(): Promise<SwarmProvider> {
  const provider = await readJsonFile<CandidateProvider>("registry", "model-routers", "openrouter-provider.json");
  return mapCandidate(provider, "model_router", "candidate_model_router_production_blocked");
}

function credentialPresence(credentialNames: string[]) {
  return credentialNames.reduce<Record<string, boolean>>((acc, name) => {
    acc[name] = Boolean(process.env[name]);
    return acc;
  }, {});
}

export async function GET() {
  const coreProviders = await loadProviders();
  const openAlternativeProviders = await loadCandidateRegistry(
    ["registry", "openalternative", "free-open-source-provider-registry.json"],
    "openalternative_free_oss",
    "candidate_free_oss_production_blocked"
  );
  const expandedAppSwarm = await loadCandidateRegistry(
    ["registry", "openalternative", "openalternative-app-swarm-expanded.json"],
    "openalternative_app_swarm",
    "candidate_app_swarm_production_blocked"
  );
  const openRouterProvider = await loadOpenRouterProvider();

  const providers = [...coreProviders, ...openAlternativeProviders, ...expandedAppSwarm, openRouterProvider];

  const safeProviders = providers.map((provider) => ({
    ...provider,
    value_visibility_default: "masked",
    actual_call_required_for_value: true,
    production_blocked_by_default: provider.source !== "abba_core",
    credential_presence: credentialPresence(provider.credential_names),
    credential_values_hidden: true
  }));

  return Response.json({
    status: "ABBA MAS swarm provider registry online",
    doctrine: "Memory stores masked references. Actual reveals value only after ABBA resolution and SEAL approval.",
    provider_count: safeProviders.length,
    openalternative_free_oss_count: openAlternativeProviders.length,
    openalternative_app_swarm_count: expandedAppSwarm.length,
    model_router_count: 1,
    layers: Array.from(new Set(safeProviders.map((provider) => provider.swarm_layer))),
    sources: Array.from(new Set(safeProviders.map((provider) => provider.source ?? "abba_core"))),
    providers: safeProviders,
    timestamp: new Date().toISOString()
  });
}
