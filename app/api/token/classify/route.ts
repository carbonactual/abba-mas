export const runtime = "nodejs";

type ClassifyBody = {
  pulse_type?: string;
  description?: string;
  success?: boolean;
  proof_strength?: number;
  time_cost?: number;
  data_cost?: number;
  money_cost?: number;
  opportunity_cost?: number;
  risk_exposure?: number;
  recoverability?: number;
  ecosystem_usefulness?: number;
};

function score(value: unknown) {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? Math.min(Math.max(parsed, 0), 10) : 0;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as ClassifyBody;

  const positive = {
    proof_strength: score(body.proof_strength),
    recoverability: score(body.recoverability),
    ecosystem_usefulness: score(body.ecosystem_usefulness)
  };

  const negative = {
    time_cost: score(body.time_cost),
    data_cost: score(body.data_cost),
    money_cost: score(body.money_cost),
    opportunity_cost: score(body.opportunity_cost),
    risk_exposure: score(body.risk_exposure)
  };

  const positive_score = Number(((positive.proof_strength + positive.recoverability + positive.ecosystem_usefulness) / 3).toFixed(2));
  const liability_score = Number(((negative.time_cost + negative.data_cost + negative.money_cost + negative.opportunity_cost + negative.risk_exposure) / 5).toFixed(2));

  let token_class = "mixed";
  if (positive_score >= 6 && liability_score < 5) token_class = "asset";
  if (liability_score >= 6 && positive_score < 5) token_class = "liability";
  if (positive_score < 3 && liability_score < 3) token_class = "neutral";
  if (body.success === false && positive.recoverability >= 5) token_class = "recoverable_liability";

  return Response.json({
    status: "token_classified",
    mode: "mock_first",
    rule: "PULSE is tokenized. Token is classified before value is minted.",
    token: {
      token_id: `token_${Date.now()}`,
      pulse_type: body.pulse_type ?? "general_pulse",
      description: body.description ?? "pulse token classification",
      success: body.success ?? null,
      positive,
      negative,
      positive_score,
      liability_score,
      token_class,
      inversion_note: "Real-life asset can become ecosystem liability. Real-life liability can become ecosystem asset.",
      value_state: "classified_before_value",
      next_route: "/api/value/mint"
    },
    timestamp: new Date().toISOString()
  });
}

export async function GET() {
  return Response.json({
    status: "token_classify_online",
    mode: "mock_first",
    classes: ["asset", "liability", "mixed", "neutral", "residue", "risk", "proof", "pending", "recoverable_liability"],
    law: "No token is general by default.",
    timestamp: new Date().toISOString()
  });
}
