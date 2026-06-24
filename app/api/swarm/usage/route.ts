export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: {
    request_id?: string;
    model?: string;
    provider?: string;
    product?: string;
    latency_ms?: number;
    estimated_cost_usd?: number;
    confidence?: number;
    retries?: number;
    schema_valid?: boolean;
    completed?: boolean;
  };

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  if (!body.request_id) return Response.json({ error: "request_id_required" }, { status: 400 });

  const confidence = Math.max(0, Math.min(1, body.confidence ?? 0));
  const latencyPenalty = Math.min(1, (body.latency_ms ?? 0) / 30000);
  const retryPenalty = Math.min(1, (body.retries ?? 0) / 5);
  const schemaScore = body.schema_valid === false ? 0 : 1;
  const completionScore = body.completed === false ? 0 : 1;
  const valueScore = Number((
    confidence * 0.35 +
    (1 - latencyPenalty) * 0.15 +
    (1 - retryPenalty) * 0.15 +
    schemaScore * 0.15 +
    completionScore * 0.20
  ).toFixed(4));

  return Response.json({
    accepted: true,
    request_id: body.request_id,
    model: body.model ?? null,
    provider: body.provider ?? null,
    product: body.product ?? null,
    value_score: valueScore,
    estimated_cost_usd: body.estimated_cost_usd ?? null,
    raw_prompt_recorded: false,
    raw_response_recorded: false,
    persistence_target: "model_calls"
  });
}
