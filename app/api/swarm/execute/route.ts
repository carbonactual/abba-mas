export const runtime = "nodejs";

import { buildProofEnvelope, resolveExchange, type ExchangeRequest } from "../../../../lib/intelligence-exchange";
import { insertExchangeRecord } from "../../../../lib/exchange-store";

type ExecuteRequest = ExchangeRequest & {
  messages?: Array<Record<string, unknown>>;
  model?: string;
  stream?: boolean;
  temperature?: number;
  max_tokens?: number;
  tools?: Array<Record<string, unknown>>;
  tool_choice?: unknown;
  confidence?: number;
};

export async function POST(request: Request) {
  let body: ExecuteRequest;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return Response.json({ error: "messages_required" }, { status: 400 });
  }

  const resolution = resolveExchange(body);
  if (!resolution.production_allowed) {
    return Response.json({
      ok: false,
      error: "resolution_not_authorized",
      resolution
    }, { status: 403 });
  }

  const origin = new URL(request.url).origin;
  const startedAt = Date.now();
  const gatewayResponse = await fetch(`${origin}/api/swarm/openrouter`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: body.model,
      messages: body.messages,
      stream: body.stream ?? false,
      response_schema: resolution.response_schema ? {
        name: resolution.response_schema_id.replace(/[^a-zA-Z0-9_-]/g, "_"),
        strict: true,
        schema: resolution.response_schema
      } : undefined,
      provider_policy: resolution.provider_policy,
      fallback_enabled: true,
      temperature: body.temperature,
      max_tokens: body.max_tokens,
      tools: body.tools,
      tool_choice: body.tool_choice,
      data_class: resolution.permissions.data_class,
      seal_approved: resolution.permissions.seal_satisfied
    }),
    signal: request.signal
  });

  const latencyMs = Date.now() - startedAt;
  const model = gatewayResponse.headers.get("x-abba-model") ?? body.model ?? "openrouter/auto";

  if (body.stream) {
    if (!gatewayResponse.body) {
      return Response.json({ error: "empty_gateway_stream" }, { status: 502 });
    }

    await insertExchangeRecord("model_calls", {
      request_id: resolution.request_id,
      product_key: resolution.product,
      operation_key: resolution.operation,
      model_id: model,
      provider: "openrouter",
      policy_key: resolution.selected_policy,
      schema_key: resolution.response_schema_id,
      data_class: resolution.permissions.data_class,
      latency_ms: latencyMs,
      status: gatewayResponse.ok ? "streaming" : "failed",
      metadata: {
        required_capabilities: resolution.required_capabilities,
        objective: resolution.objective,
        raw_prompt_stored: false,
        raw_response_stored: false
      }
    });

    return new Response(gatewayResponse.body, {
      status: gatewayResponse.status,
      headers: {
        "Content-Type": gatewayResponse.headers.get("content-type") ?? "text/event-stream",
        "Cache-Control": "no-store",
        "X-ABBA-Request-Id": resolution.request_id,
        "X-ABBA-Policy": resolution.selected_policy,
        "X-ABBA-Schema": resolution.response_schema_id
      }
    });
  }

  const responseText = await gatewayResponse.text();
  let parsed: unknown = responseText;
  try {
    parsed = JSON.parse(responseText);
  } catch {
    // Preserve upstream text while still returning a governed envelope.
  }

  const proof = buildProofEnvelope({
    request_id: resolution.request_id,
    product: resolution.product,
    operation: resolution.operation,
    model,
    provider: "openrouter",
    policy: resolution.selected_policy,
    schema: resolution.response_schema_id,
    latency_ms: latencyMs,
    confidence: body.confidence,
    evidence_refs: body.evidence_refs,
    seal_level: body.seal_level,
    status: gatewayResponse.ok ? "completed" : "failed"
  });

  const [callStore, proofStore] = await Promise.all([
    insertExchangeRecord("model_calls", {
      request_id: resolution.request_id,
      product_key: resolution.product,
      operation_key: resolution.operation,
      model_id: model,
      provider: "openrouter",
      policy_key: resolution.selected_policy,
      schema_key: resolution.response_schema_id,
      data_class: resolution.permissions.data_class,
      latency_ms: latencyMs,
      confidence: body.confidence ?? null,
      disagreement_detected: false,
      review_required: false,
      status: gatewayResponse.ok ? "completed" : "failed",
      metadata: {
        required_capabilities: resolution.required_capabilities,
        objective: resolution.objective,
        raw_prompt_stored: false,
        raw_response_stored: false
      }
    }),
    insertExchangeRecord("proof_envelopes", {
      request_id: proof.request_id,
      proof_hash: proof.proof_hash,
      product_key: proof.product,
      operation_key: proof.operation,
      evidence_refs: proof.evidence_refs,
      seal_level: proof.seal_level,
      release_state: "review_required",
      metadata: {
        model: proof.model,
        provider: proof.provider,
        policy: proof.policy,
        schema: proof.schema,
        latency_ms: proof.latency_ms,
        confidence: proof.confidence,
        status: proof.status
      }
    })
  ]);

  return Response.json({
    ok: gatewayResponse.ok,
    resolution,
    result: parsed,
    proof,
    persistence: {
      model_call: callStore,
      proof: proofStore
    }
  }, { status: gatewayResponse.status });
}
