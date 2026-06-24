export const runtime = "nodejs";

import {
  getModelRegistry,
  getPolicyRegistry,
  getSchemaRegistry
} from "../../../../lib/intelligence-exchange";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const type = url.searchParams.get("type") ?? "all";

  if (type === "models") return Response.json(getModelRegistry());
  if (type === "policies") return Response.json(getPolicyRegistry());
  if (type === "schemas") return Response.json(getSchemaRegistry());

  return Response.json({
    models: getModelRegistry(),
    policies: getPolicyRegistry(),
    schemas: getSchemaRegistry(),
    human_final_authority: true,
    timestamp: new Date().toISOString()
  });
}
