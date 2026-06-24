export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: {
    task_type?: string;
    required_capabilities?: string[];
    verification?: "off" | "on_low_confidence" | "always";
    expected_confidence?: number;
    data_class?: string;
  };

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const verification = body.verification ?? "on_low_confidence";
  const confidence = body.expected_confidence ?? 0.75;
  const needsVerifier = verification === "always" || (verification === "on_low_confidence" && confidence < 0.85);

  const stages = [
    { role: "primary", purpose: "produce the first structured result", capabilities: body.required_capabilities ?? [] },
    { role: "critic", purpose: "identify unsupported claims and contradictions", capabilities: ["reasoning", "evidence"] }
  ];

  if (needsVerifier) {
    stages.push({ role: "verifier", purpose: "independently check the result and evidence", capabilities: ["verification", "structured_output"] });
  }

  stages.push({ role: "resolver", purpose: "combine accepted findings under ABBA policy", capabilities: ["routing", "resolution"] });

  return Response.json({
    task_type: body.task_type ?? "general",
    data_class: body.data_class ?? "masked",
    council_mode: stages.length > 3 ? "primary_critic_verifier_resolver" : "primary_critic_resolver",
    stages,
    parallelizable: ["critic", "verifier"],
    raw_context_should_be_minimized: true,
    human_final_authority: true
  });
}
