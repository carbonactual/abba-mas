import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

type LovableProvider = {
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
  carbon_actual_position: {
    role: string;
    best_use: string[];
    not_for: string[];
  };
};

async function loadLovableProvider(): Promise<LovableProvider> {
  const file = path.join(process.cwd(), "data", "lovable-provider.json");
  const raw = await readFile(file, "utf8");
  return JSON.parse(raw) as LovableProvider;
}

function credentialPresence(credentialNames: string[]) {
  return credentialNames.reduce<Record<string, boolean>>((acc, name) => {
    acc[name] = Boolean(process.env[name]);
    return acc;
  }, {});
}

export async function GET() {
  const provider = await loadLovableProvider();

  return Response.json({
    status: "Lovable integration registered for ABBA MAS",
    doctrine: "Lovable can build and iterate interfaces. GitHub remains source of truth. SEAL and ABBA review govern production movement.",
    provider: {
      ...provider,
      value_visibility_default: "masked",
      actual_call_required_for_value: true,
      credential_presence: credentialPresence(provider.credential_names),
      credential_values_hidden: true
    },
    handoff: {
      source_of_truth: "GitHub",
      production_gate: "ABBA review + SEAL approval + Vercel build check",
      recommended_branch_flow: "Lovable prototype branch -> GitHub PR -> review -> merge -> Vercel deploy",
      secret_rule: "No keys, tokens, private documents, or regulated customer data inside Lovable prompts or committed code. Use environment variables only."
    },
    timestamp: new Date().toISOString()
  });
}
