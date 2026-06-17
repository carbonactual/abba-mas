export const runtime = "nodejs";

type SwarmValueBody = {
  swarm_type?: string;
  pulse?: string;
  actual_value?: string;
  route_goal?: string;
  proof_strength?: number;
  utility?: number;
  liquidity?: number;
  protection?: number;
  trust?: number;
  future_upside?: number;
};

function clampScore(value: unknown, fallback = 0) {
  const score = Number(value ?? fallback);
  if (Number.isNaN(score)) return fallback;
  return Math.min(Math.max(score, 0), 10);
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as SwarmValueBody;

  const scores = {
    proof_strength: clampScore(body.proof_strength),
    utility: clampScore(body.utility),
    liquidity: clampScore(body.liquidity),
    protection: clampScore(body.protection),
    trust: clampScore(body.trust),
    future_upside: clampScore(body.future_upside),
    eight_year_positioning: 8
  };

  const energy_score = Number(
    ((scores.proof_strength + scores.utility + scores.liquidity + scores.protection + scores.trust + scores.future_upside) / 6).toFixed(2)
  );

  return Response.json({
    status: "swarm_value_route_prepared",
    mode: "mock_first",
    law: "PULSE in. Swarm read. Actual value out. Return PULSE.",
    route: {
      route_id: `swarm_route_${Date.now()}`,
      swarm_type: body.swarm_type ?? "value_swarm",
      pulse_in: body.pulse ?? "incoming swarm pulse",
      actual_value_out: body.actual_value ?? "curated Actual value",
      route_goal: body.route_goal ?? "maximum ecosystem energy",
      scores,
      energy_score,
      recommendation: energy_score >= 6 ? "route_to_swarm" : "hold_for_more_proof",
      expected_return_pulse: "activation_result, proof_update, value_movement, rejection, or escalation",
      value_state: "swarm_review"
    },
    timestamp: new Date().toISOString()
  });
}

export async function GET() {
  return Response.json({
    status: "swarm_value_route_online",
    mode: "mock_first",
    law: "ABBA receives PULSE through swarms and sends VALUE through swarms.",
    benchmark: {
      formation_gap_years: 8,
      value_components: ["proof_strength", "utility", "liquidity", "protection", "trust", "future_upside", "eight_year_positioning"]
    },
    timestamp: new Date().toISOString()
  });
}
