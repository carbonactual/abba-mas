import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

async function getProviderCount() {
  try {
    const file = path.join(process.cwd(), "data", "abba-swarm-providers.json");
    const raw = await readFile(file, "utf8");
    const providers = JSON.parse(raw) as unknown[];
    return providers.length;
  } catch {
    return 0;
  }
}

export async function GET() {
  const providerCount = await getProviderCount();

  const checks = {
    openai: Boolean(process.env.OPENAI_API_KEY),
    gemini: Boolean(process.env.GEMINI_API_KEY),
    supabaseUrl: Boolean(process.env.SUPABASE_URL),
    supabaseAnon: Boolean(process.env.SUPABASE_ANON_KEY),
    supabaseService: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    swarmWebhookSecret: Boolean(process.env.ABBA_SWARM_WEBHOOK_SECRET),
    easRpc: Boolean(process.env.EAS_RPC_URL),
    easSchema: Boolean(process.env.EAS_SCHEMA_UID)
  };

  return Response.json({
    status: "ABBA MAS online",
    environment: checks,
    swarm: {
      swarmRegistry: providerCount > 0,
      swarmProviders: providerCount,
      swarmProvidersRoute: true,
      swarmIngestRoute: true,
      swarmActualRoute: true,
      memoryValueMasked: true,
      actualOnlyValueReveal: true,
      atlasPublicProofRequiresSeal: true
    },
    note: "Values are hidden. Environment checks show presence only.",
    timestamp: new Date().toISOString()
  });
}
