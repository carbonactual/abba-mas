import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

type Membership = {
  providerId: string;
  primarySwarm: string;
  swarms: string[];
  fractions: string[];
};

type Brief = {
  productId: string;
  preferredSwarms?: string[];
  requiredCapabilities?: string[];
};

async function loadMemberships(): Promise<Membership[]> {
  const file = path.join(process.cwd(), "registry", "swarm-memberships.json");
  const raw = JSON.parse(await readFile(file, "utf8")) as { memberships: Membership[] };
  return raw.memberships;
}

export async function POST(request: Request) {
  const brief = (await request.json()) as Brief;
  if (!brief.productId) {
    return Response.json({ error: "productId is required" }, { status: 400 });
  }

  const preferred = new Set(brief.preferredSwarms ?? []);
  const capabilityTerms = (brief.requiredCapabilities ?? []).map((value) => value.toLowerCase());
  const memberships = await loadMemberships();

  const candidates = memberships.map((entry) => {
    const swarmMatches = entry.swarms.filter((swarm) => preferred.has(swarm));
    const fractionMatches = entry.fractions.filter((fraction) =>
      capabilityTerms.some((term) => fraction.toLowerCase().includes(term) || term.includes(fraction.toLowerCase()))
    );
    return { ...entry, score: swarmMatches.length * 5 + fractionMatches.length * 4, swarmMatches, fractionMatches };
  }).filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.providerId.localeCompare(b.providerId));

  return Response.json({
    productId: brief.productId,
    candidateCount: candidates.length,
    teams: [
      { teamId: `${brief.productId}-alpha`, members: candidates.filter((_, index) => index % 2 === 0).slice(0, 8) },
      { teamId: `${brief.productId}-beta`, members: candidates.filter((_, index) => index % 2 === 1).slice(0, 8) }
    ],
    reserves: candidates.slice(16),
    note: "Candidate formation only. Live use requires provider readiness, health evidence, SEAL approval and task receipts."
  });
}
