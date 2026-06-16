import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

type SwarmProvider = {
  provider_key: string;
  swarm_layer: string;
};

type SwarmIngestPayload = {
  source_provider?: string;
  source_layer?: string;
  event_type?: string;
  summary?: string;
  source_pointer?: string | null;
  mint_id?: string | null;
  token_ref?: string | null;
  proof_ref?: string | null;
  value_visibility?: string;
  actual_call_required?: boolean;
  actual_route?: string;
  seal_level?: string;
  risk_level?: string;
  metadata?: Record<string, unknown>;
  [key: string]: unknown;
};

const forbiddenPayloadKeys = new Set([
  "actual_value",
  "true_value",
  "liquidity_value",
  "settlement_value",
  "ownership_value",
  "vault_value",
  "private_key",
  "api_key",
  "secret"
]);

async function loadProviders(): Promise<SwarmProvider[]> {
  const file = path.join(process.cwd(), "data", "abba-swarm-providers.json");
  const raw = await readFile(file, "utf8");
  return JSON.parse(raw) as SwarmProvider[];
}

function json(status: number, body: Record<string, unknown>) {
  return Response.json(body, { status });
}

function hasForbiddenKeys(payload: Record<string, unknown>) {
  return Object.keys(payload).filter((key) => forbiddenPayloadKeys.has(key.toLowerCase()));
}

async function persistToSupabase(event: Record<string, unknown>) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return { persisted: false, reason: "supabase_not_configured" };
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/swarm_events`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal"
    },
    body: JSON.stringify(event)
  });

  if (!response.ok) {
    return {
      persisted: false,
      reason: "supabase_insert_failed",
      status: response.status,
      details: await response.text()
    };
  }

  return { persisted: true };
}

export async function POST(request: Request) {
  const configuredSecret = process.env.ABBA_SWARM_WEBHOOK_SECRET;
  const providedSecret = request.headers.get("x-abba-swarm-secret");

  if (configuredSecret && configuredSecret !== providedSecret) {
    return json(401, {
      accepted: false,
      error: "invalid_swarm_secret",
      note: "Webhook secret is required but values are hidden."
    });
  }

  let payload: SwarmIngestPayload;
  try {
    payload = (await request.json()) as SwarmIngestPayload;
  } catch {
    return json(400, { accepted: false, error: "invalid_json" });
  }

  const forbiddenKeys = hasForbiddenKeys(payload as Record<string, unknown>);
  if (forbiddenKeys.length > 0) {
    return json(400, {
      accepted: false,
      error: "forbidden_memory_payload_keys",
      forbidden_keys: forbiddenKeys,
      doctrine: "Memory providers store masked references only. Actual reveals value through /api/swarm/actual-call."
    });
  }

  const required = ["source_provider", "source_layer", "event_type", "summary", "seal_level"] as const;
  const missing = required.filter((key) => !payload[key]);
  if (missing.length > 0) {
    return json(400, { accepted: false, error: "missing_required_fields", missing });
  }

  const providers = await loadProviders();
  const provider = providers.find((item) => item.provider_key === payload.source_provider);
  if (!provider) {
    return json(400, {
      accepted: false,
      error: "unknown_source_provider",
      source_provider: payload.source_provider
    });
  }

  const now = new Date().toISOString();
  const event = {
    swarm_event_id: `swarm_${crypto.randomUUID()}`,
    source_provider: payload.source_provider,
    source_layer: payload.source_layer ?? provider.swarm_layer,
    event_type: payload.event_type,
    summary: payload.summary,
    source_pointer: payload.source_pointer ?? null,
    mint_id: payload.mint_id ?? null,
    token_ref: payload.token_ref ?? null,
    proof_ref: payload.proof_ref ?? null,
    value_visibility: "masked",
    actual_call_required: Boolean(payload.actual_call_required),
    actual_route: payload.actual_route ?? "ACTUAL_VALUE_ENGINE",
    actual_value_status: payload.actual_call_required ? "actual_call_required" : "not_requested",
    seal_level: payload.seal_level,
    risk_level: payload.risk_level ?? "not_set",
    metadata: payload.metadata ?? {},
    received_at: now,
    status: "accepted"
  };

  const persistence = await persistToSupabase(event);

  return json(202, {
    accepted: true,
    event,
    persistence,
    doctrine: "Swarm memory accepted as masked context. True value remains hidden until Actual call.",
    timestamp: now
  });
}
