export const runtime = "nodejs";

type ActualCallPayload = {
  source_provider?: string;
  swarm_event_id?: string;
  mint_id?: string | null;
  token_ref?: string | null;
  proof_ref?: string | null;
  requested_value_class?: string;
  requested_route?: string;
  seal_level?: string;
  seal_status?: string;
  seal_approval_id?: string;
  resolved_by?: string;
  abba_resolution_id?: string;
  reason?: string;
  metadata?: Record<string, unknown>;
  [key: string]: unknown;
};

const forbiddenRequestKeys = new Set([
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

function json(status: number, body: Record<string, unknown>) {
  return Response.json(body, { status });
}

function hasForbiddenKeys(payload: Record<string, unknown>) {
  return Object.keys(payload).filter((key) => forbiddenRequestKeys.has(key.toLowerCase()));
}

async function persistToSupabase(call: Record<string, unknown>) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return { persisted: false, reason: "supabase_not_configured" };
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/swarm_actual_calls`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal"
    },
    body: JSON.stringify(call)
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

  let payload: ActualCallPayload;
  try {
    payload = (await request.json()) as ActualCallPayload;
  } catch {
    return json(400, { accepted: false, error: "invalid_json" });
  }

  const forbiddenKeys = hasForbiddenKeys(payload as Record<string, unknown>);
  if (forbiddenKeys.length > 0) {
    return json(400, {
      accepted: false,
      error: "forbidden_actual_call_payload_keys",
      forbidden_keys: forbiddenKeys,
      doctrine: "Request value reveal status only. Do not submit true value through external provider payloads."
    });
  }

  if (payload.seal_status !== "approved" || !payload.seal_approval_id) {
    return json(403, {
      accepted: false,
      error: "seal_approval_required",
      actual_value_status: "blocked_until_seal_approval"
    });
  }

  if (payload.resolved_by !== "ABBA" && !payload.abba_resolution_id) {
    return json(409, {
      accepted: false,
      error: "abba_resolution_required",
      actual_value_status: "blocked_until_abba_resolution"
    });
  }

  const now = new Date().toISOString();
  const actualCall = {
    actual_call_id: `actual_${crypto.randomUUID()}`,
    source_provider: payload.source_provider ?? null,
    swarm_event_id: payload.swarm_event_id ?? null,
    mint_id: payload.mint_id ?? null,
    token_ref: payload.token_ref ?? null,
    proof_ref: payload.proof_ref ?? null,
    requested_value_class: payload.requested_value_class ?? "not_set",
    requested_route: payload.requested_route ?? "ACTUAL_VALUE_ENGINE",
    seal_level: payload.seal_level ?? "SEAL-4",
    seal_status: payload.seal_status,
    seal_approval_id: payload.seal_approval_id,
    resolved_by: payload.resolved_by ?? "ABBA",
    abba_resolution_id: payload.abba_resolution_id ?? null,
    reason: payload.reason ?? null,
    metadata: payload.metadata ?? {},
    actual_value_status: "pending_actual_engine",
    value_visibility: "hidden_until_authorized_actual_flow",
    created_at: now,
    status: "accepted"
  };

  const persistence = await persistToSupabase(actualCall);

  return json(202, {
    accepted: true,
    actual_call: actualCall,
    persistence,
    doctrine: "Actual call accepted. This route returns value status only, not true value.",
    timestamp: now
  });
}
