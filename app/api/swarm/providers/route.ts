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
};

async function loadProviders(): Promise<SwarmProvider[]> {
  const file = path.join(process.cwd(), "data", "abba-swarm-providers.json");
  const raw = await readFile(file, "utf8");
  return JSON.parse(raw) as SwarmProvider[];
}

function credentialPresence(credentialNames: string[]) {
  return credentialNames.reduce<Record<string, boolean>>((acc, name) => {
    acc[name] = Boolean(process.env[name]);
    return acc;
  }, {});
}

export async function GET() {
  const providers = await loadProviders();

  const safeProviders = providers.map((provider) => ({
    ...provider,
    value_visibility_default: "masked",
    actual_call_required_for_value: true,
    credential_presence: credentialPresence(provider.credential_names),
    credential_values_hidden: true
  }));

  return Response.json({
    status: "ABBA MAS swarm provider registry online",
    doctrine: "Memory stores masked references. Actual reveals value only after ABBA resolution and SEAL approval.",
    provider_count: safeProviders.length,
    layers: Array.from(new Set(safeProviders.map((provider) => provider.swarm_layer))),
    providers: safeProviders,
    timestamp: new Date().toISOString()
  });
}
