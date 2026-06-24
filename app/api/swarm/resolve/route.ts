export const runtime = "nodejs";

import { resolveExchange, type ExchangeRequest } from "../../../../lib/intelligence-exchange";

export async function GET() {
  return Response.json({
    route: "/api/swarm/resolve",
    role: "ABBA capability, policy, schema and permission resolver",
    raw_prompt_storage: false,
    human_final_authority: true,
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: Request) {
  let input: ExchangeRequest;
  try {
    input = (await request.json()) as ExchangeRequest;
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const result = resolveExchange(input);
  if (!result.production_allowed) {
    return Response.json({
      ok: false,
      error: "seal_or_consent_requirement_not_satisfied",
      resolution: result
    }, { status: 403 });
  }

  return Response.json({ ok: true, resolution: result });
}
