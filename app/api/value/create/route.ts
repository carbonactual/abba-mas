export const runtime = "nodejs";

type CreateValueBody = {
  token_id?: string;
  token_class?: string;
  proof_strength?: number;
  route?: string;
  expected_return_pulse?: string;
};

function score(value: unknown) {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? Math.min(Math.max(parsed, 0), 10) : 0;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as CreateValueBody;
  const proof = score(body.proof_strength);
  const tokenClass = body.token_class ?? "pending";
  const qualified = proof >= 5 && tokenClass !== "pending" && tokenClass !== "unclassified";

  return Response.json({
    status: qualified ? "value_created" : "value_blocked",
    mode: "mock_first",
    rule: "Ecosystem value is created only after token classification and routing.",
    value: {
      value_id: qualified ? `value_${Date.now()}` : null,
      token_id: body.token_id ?? "unknown_token",
      token_class: tokenClass,
      proof_strength: proof,
      route: body.route ?? "Review",
      expected_return_pulse: body.expected_return_pulse ?? "return pulse pending",
      value_state: qualified ? "created" : "blocked_pending_classification_or_proof"
    },
    timestamp: new Date().toISOString()
  });
}

export async function GET() {
  return Response.json({
    status: "classified_value_create_online",
    mode: "mock_first",
    law: "PULSE is tokenized. Token is classified. Ecosystem value is created after classification.",
    timestamp: new Date().toISOString()
  });
}
