export const runtime = "nodejs";

const secretNames = [
  "OPENROUTER_API_KEY",
  "OPENROUTER_SITE_URL",
  "OPENROUTER_APP_TITLE",
  "OPENROUTER_DEFAULT_MODEL",
  "OPENROUTER_ALLOWED_MODELS"
];

function credentialPresence() {
  return secretNames.reduce<Record<string, boolean>>((acc, name) => {
    acc[name] = Boolean(process.env[name]);
    return acc;
  }, {});
}

export async function GET() {
  return Response.json({
    status: "OpenRouter swarm route registered",
    role: "ABBA MAS model router and multi-model gateway",
    default_model: process.env.OPENROUTER_DEFAULT_MODEL ?? "openrouter/auto",
    secret_names: secretNames,
    credential_presence: credentialPresence(),
    credential_values_hidden: true,
    setup_links: [
      "https://openrouter.ai/docs/quickstart",
      "https://openrouter.ai/docs/guides/routing/routers/auto-router",
      "https://openrouter.ai/docs/guides/routing/model-fallbacks",
      "https://openrouter.ai/docs/guides/routing/routers/free-models-router",
      "https://openrouter.ai/models"
    ],
    seal_level_default: "SEAL-4",
    production_blocked_by_default: true,
    allowed_data: [
      "public prompts",
      "masked task context",
      "sandbox test prompts",
      "non-sensitive summaries",
      "model routing metadata"
    ],
    forbidden_data: [
      "raw secrets",
      "private keys",
      "banking credentials",
      "unredacted identity files",
      "vault documents",
      "Actual value",
      "irreversible execution instructions without SEAL"
    ],
    doctrine: "OpenRouter routes model calls. ABBA resolves. SEAL approves. Actual reveals value only after permission.",
    timestamp: new Date().toISOString()
  });
}
