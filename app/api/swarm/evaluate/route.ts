export const runtime = "nodejs";

import { scoreRoute } from "../../../../lib/intelligence-exchange";

type Candidate = {
  id: string;
  quality: number;
  cost: number;
  latency: number;
  privacy: number;
  reliability: number;
  confidence?: number;
};

export async function POST(request: Request) {
  let body: { candidates?: Candidate[]; disagreement_threshold?: number };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const candidates = Array.isArray(body.candidates) ? body.candidates : [];
  if (candidates.length === 0) {
    return Response.json({ error: "candidates_required" }, { status: 400 });
  }

  const ranked = candidates
    .map((candidate) => ({ ...candidate, routing_score: scoreRoute(candidate) }))
    .sort((a, b) => b.routing_score - a.routing_score);

  const confidences = ranked
    .map((item) => item.confidence)
    .filter((value): value is number => typeof value === "number");
  const spread = confidences.length > 1 ? Math.max(...confidences) - Math.min(...confidences) : 0;
  const threshold = body.disagreement_threshold ?? 0.2;

  return Response.json({
    selected: ranked[0],
    ranked,
    disagreement_detected: spread >= threshold,
    confidence_spread: Number(spread.toFixed(4)),
    verifier_required: spread >= threshold,
    human_final_authority: true
  });
}
