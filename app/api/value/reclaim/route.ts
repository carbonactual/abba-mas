export const runtime = "nodejs";

type ReclaimBody = {
  value_record_id?: string;
  residue_score?: number;
  loss_type?: string;
  proof_available?: boolean;
};

function score(value: unknown) {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? Math.max(parsed, 0) : 0;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as ReclaimBody;
  const residue_score = score(body.residue_score);
  const proof = Boolean(body.proof_available);

  const recovery_route = proof
    ? residue_score >= 10
      ? "replenish_and_proof"
      : "record_and_optimize"
    : "hold_for_more_proof";

  return Response.json({
    status: "reclamation_routed",
    mode: "mock_first",
    record: {
      value_record_id: body.value_record_id ?? `value_record_${Date.now()}`,
      loss_type: body.loss_type ?? "general_loss",
      residue_score,
      proof_available: proof,
      recovery_route,
      replenishment_action: recovery_route === "replenish_and_proof" ? "prepare credit, retry, restore, or route correction" : "record learning and reduce future leakage",
      expected_return_pulse: "recovered, prevented, optimized, rejected, or archived",
      state: "reclamation_routed"
    },
    timestamp: new Date().toISOString()
  });
}

export async function GET() {
  return Response.json({
    status: "value_reclaim_online",
    mode: "mock_first",
    rule: "Measured loss is routed for recovery, replenishment, prevention, learning, or proof.",
    timestamp: new Date().toISOString()
  });
}
