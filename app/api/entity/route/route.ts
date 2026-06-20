import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

type EntityRequest = {
  entityType: string;
  ageBand?: "child" | "young-person" | "adult" | "older-person";
  hasRepresentative?: boolean;
  accessibilityNeeds?: string[];
  languagePreferences?: string[];
  digitalAccess?: "full" | "limited" | "none";
  requestedPurpose?: string[];
};

type Architecture = {
  entityTypes: string[];
  entryRoutes: string[];
};

async function loadArchitecture(): Promise<Architecture> {
  const file = path.join(process.cwd(), "config", "universal-entry-architecture.json");
  return JSON.parse(await readFile(file, "utf8")) as Architecture;
}

export async function POST(request: Request) {
  const body = (await request.json()) as EntityRequest;
  const architecture = await loadArchitecture();

  if (!architecture.entityTypes.includes(body.entityType)) {
    return Response.json({ error: "Unsupported entityType" }, { status: 400 });
  }

  const routes = new Set<string>();
  const requirements = new Set<string>();

  if (body.entityType === "human") routes.add("self-service");
  if (["club","association","cooperative","enterprise","nonprofit","professional-body","school","university","traditional-institution","government-body","international-organization"].includes(body.entityType)) {
    routes.add("organization-admin");
    routes.add("representative");
    requirements.add("representation-authority-proof");
  }
  if (["product","device","ai-agent"].includes(body.entityType)) {
    routes.add("api");
    routes.add("device-registration");
    requirements.add("accountable-human-or-organization");
  }
  if (body.ageBand === "child" || body.ageBand === "young-person") {
    routes.add("guardian-supported");
    requirements.add("safeguarding-review");
  }
  if (body.ageBand === "older-person" || (body.accessibilityNeeds?.length ?? 0) > 0) {
    routes.add("assisted-human");
    requirements.add("accessibility-support");
  }
  if (body.digitalAccess === "limited") routes.add("offline-assisted");
  if (body.digitalAccess === "none") routes.add("physical-service-point");
  if (body.hasRepresentative) routes.add("delegated-authority");

  return Response.json({
    entityType: body.entityType,
    recommendedRoutes: Array.from(routes),
    requirements: Array.from(requirements),
    languagePreferences: body.languagePreferences ?? [],
    requestedPurpose: body.requestedPurpose ?? [],
    defaultRules: {
      sensitiveAttributesPrivate: true,
      humanReviewAvailable: true,
      redressRequired: true,
      revocationRequired: true,
      progressiveVerification: true
    },
    note: "Routing recommendation only. Identity, authority, consent and risk checks are required before activation."
  });
}
