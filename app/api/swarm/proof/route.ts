export const runtime = "nodejs";

import { buildProofEnvelope } from "../../../../lib/intelligence-exchange";

export async function POST(request: Request) {
  let body: Parameters<typeof buildProofEnvelope>[0];
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  if (!body.request_id || !body.product || !body.operation || !body.policy || !body.status) {
    return Response.json({ error: "missing_required_proof_fields" }, { status: 400 });
  }

  return Response.json({
    ok: true,
    proof: buildProofEnvelope(body),
    minting_state: "reference_ready",
    public_release_state: "seal_required"
  });
}
