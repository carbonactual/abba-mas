export const runtime = "nodejs";

type TeamInput = {
  teamId: string;
  metrics: Record<string, number>;
  evidence?: string[];
};

type MatchInput = {
  matchId: string;
  productId: string;
  teams: TeamInput[];
};

const weights: Record<string, number> = {
  outcomeQuality: 20,
  taskSuccessRate: 15,
  deliverySpeed: 10,
  reliability: 10,
  costEfficiency: 10,
  securityAndSeal: 10,
  proofQuality: 8,
  humanImpact: 7,
  ecosystemReuse: 5,
  growthPathway: 5
};

function clamp(value: number) {
  return Math.max(0, Math.min(100, value));
}

export async function POST(request: Request) {
  const body = (await request.json()) as MatchInput;
  if (!body.matchId || !body.productId || !Array.isArray(body.teams) || body.teams.length < 2) {
    return Response.json({ error: "matchId, productId and at least two teams are required" }, { status: 400 });
  }

  const weightTotal = Object.values(weights).reduce((sum, value) => sum + value, 0);
  const standings = body.teams.map((team) => {
    const score = Object.entries(weights).reduce((sum, [metric, weight]) => {
      return sum + clamp(Number(team.metrics[metric] ?? 0)) * weight;
    }, 0) / weightTotal;
    return {
      teamId: team.teamId,
      score: Number(score.toFixed(2)),
      evidenceCount: team.evidence?.length ?? 0,
      confidence: (team.evidence?.length ?? 0) >= 3 ? "reliable" : "emerging"
    };
  }).sort((a, b) => b.score - a.score || b.evidenceCount - a.evidenceCount);

  return Response.json({
    matchId: body.matchId,
    productId: body.productId,
    status: "scored",
    championCandidate: standings[0]?.teamId ?? null,
    reserveCandidate: standings[1]?.teamId ?? null,
    standings,
    verificationRequired: true
  });
}
