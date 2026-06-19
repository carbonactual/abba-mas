import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

type Rules = {
  capabilityMap: Record<string, string[]>;
  scoring: {
    directCapabilityMatch: number;
    minimumMembershipScore: number;
    primarySwarmMinimumScore: number;
  };
};

type ClassificationRequest = {
  providerId: string;
  name?: string;
  capabilities?: string[];
  functions?: string[];
  deliveryClasses?: string[];
  dataClasses?: string[];
  ecosystemLayers?: string[];
  sealLevel?: number;
  riskLevel?: string;
};

async function loadRules(): Promise<Rules> {
  const file = path.join(process.cwd(), "config", "swarm-classification-rules.json");
  return JSON.parse(await readFile(file, "utf8")) as Rules;
}

function normalized(values: string[] = []) {
  return values.map((value) => value.toLowerCase().trim()).filter(Boolean);
}

export async function POST(request: Request) {
  const body = (await request.json()) as ClassificationRequest;
  if (!body.providerId) {
    return Response.json({ error: "providerId is required" }, { status: 400 });
  }

  const rules = await loadRules();
  const signals = new Set(normalized([
    ...(body.capabilities ?? []),
    ...(body.functions ?? []),
    ...(body.deliveryClasses ?? []),
    ...(body.dataClasses ?? []),
    ...(body.ecosystemLayers ?? [])
  ]));

  const scores = Object.entries(rules.capabilityMap).map(([swarmId, keywords]) => {
    const matches = keywords.filter((keyword) => signals.has(keyword.toLowerCase()));
    return {
      swarmId,
      score: matches.length * rules.scoring.directCapabilityMatch,
      matches
    };
  }).filter((item) => item.score >= rules.scoring.minimumMembershipScore)
    .sort((a, b) => b.score - a.score || a.swarmId.localeCompare(b.swarmId));

  const primary = scores.find((item) => item.score >= rules.scoring.primarySwarmMinimumScore) ?? scores[0] ?? null;

  return Response.json({
    providerId: body.providerId,
    primarySwarm: primary?.swarmId ?? null,
    memberships: scores,
    dimensions: {
      deliveryClasses: body.deliveryClasses ?? [],
      dataClasses: body.dataClasses ?? [],
      ecosystemLayers: body.ecosystemLayers ?? [],
      sealLevel: body.sealLevel ?? null,
      riskLevel: body.riskLevel ?? null
    },
    rule: "One provider may belong to multiple swarms. Membership is evidence-based and score-driven."
  });
}
