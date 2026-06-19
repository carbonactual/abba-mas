import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

type LeagueConfig = {
  scoreWeights: Record<string, number>;
  penalties: Record<string, number>;
};

type TeamResult = {
  teamId: string;
  metrics: Record<string, number>;
  penalties?: string[];
  evidence?: string[];
};

async function loadConfig(): Promise<LeagueConfig> {
  const file = path.join(process.cwd(), "config", "engine-league.json");
  return JSON.parse(await readFile(file, "utf8")) as LeagueConfig;
}

function clamp(value: number) {
  return Math.max(0, Math.min(100, value));
}

export async function POST(request: Request) {
  const body = await request.json() as { matchId: string; teams: TeamResult[] };
  if (!body.matchId || !Array.isArray(body.teams) || body.teams.length < 2) {
    return Response.json({ error: "matchId and at least two teams are required" }, { status: 400 });
  }

  const config = await loadConfig();
  const totalWeight = Object.values(config.scoreWeights).reduce((sum, weight) => sum + weight, 0);

  const standings = body.teams.map((team) => {
    const weighted = Object.entries(config.scoreWeights).reduce((sum, [metric, weight]) => {
      return sum + clamp(Number(team.metrics[metric] ?? 0)) * weight;
    }, 0) / totalWeight;

    const penaltyTotal = (team.penalties ?? []).reduce((sum, penalty) => {
      return sum + Number(config.penalties[penalty] ?? 0);
    }, 0);

    return {
      teamId: team.teamId,
      baseScore: Number(weighted.toFixed(2)),
      penaltyTotal,
      finalScore: Number(Math.max(0, weighted + penaltyTotal).toFixed(2)),
      evidenceCount: team.evidence?.length ?? 0,
      penalties: team.penalties ?? []
    };
  }).sort((a, b) => b.finalScore - a.finalScore || b.evidenceCount - a.evidenceCount);

  return Response.json({
    matchId: body.matchId,
    winner: standings[0]?.teamId ?? null,
    standings,
    rule: "The winner is determined by weighted outcomes, declared penalties and evidence, not by app count or brand popularity."
  });
}
