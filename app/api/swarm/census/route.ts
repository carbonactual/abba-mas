import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

type Taxonomy = {
  swarms: Array<{ id: string; name: string; layer: string; purpose: string; capabilities: string[] }>;
};

type MembershipRegistry = {
  memberships: Array<{
    providerId: string;
    primarySwarm: string;
    swarms: string[];
    fractions: string[];
  }>;
};

async function readJson<T>(...segments: string[]): Promise<T> {
  const file = path.join(process.cwd(), ...segments);
  return JSON.parse(await readFile(file, "utf8")) as T;
}

export async function GET() {
  const taxonomy = await readJson<Taxonomy>("config", "swarm-taxonomy.json");
  const registry = await readJson<MembershipRegistry>("registry", "swarm-memberships.json");

  const census = taxonomy.swarms.map((swarm) => {
    const members = registry.memberships.filter((entry) => entry.swarms.includes(swarm.id));
    return {
      swarmId: swarm.id,
      name: swarm.name,
      layer: swarm.layer,
      purpose: swarm.purpose,
      providerCount: members.length,
      primaryProviderCount: members.filter((entry) => entry.primarySwarm === swarm.id).length,
      fractionCount: members.reduce((total, entry) => total + entry.fractions.length, 0),
      providers: members.map((entry) => ({
        providerId: entry.providerId,
        primary: entry.primarySwarm === swarm.id,
        fractions: entry.fractions
      }))
    };
  });

  const totalMemberships = registry.memberships.reduce((total, entry) => total + entry.swarms.length, 0);
  const totalFractions = registry.memberships.reduce((total, entry) => total + entry.fractions.length, 0);

  return Response.json({
    status: "ABBA MAS swarm census online",
    swarmCount: taxonomy.swarms.length,
    classifiedProviderCount: registry.memberships.length,
    totalMemberships,
    totalFractions,
    averageSwarmsPerProvider: registry.memberships.length ? totalMemberships / registry.memberships.length : 0,
    truthRule: "Membership count is not operational swarm count. Operational status requires runtime health evidence and successful task receipts.",
    census,
    timestamp: new Date().toISOString()
  });
}
