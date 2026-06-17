export const runtime = "nodejs";

type IntakeBody = {
  source_type?: string;
  source_label?: string;
  signal?: string;
  ecosystem_need?: string;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as IntakeBody;

  return Response.json({
    status: "value_prepared",
    mode: "mock_first",
    rule: "Signal is reviewed first. Only curated value is returned to the feed.",
    becoming_value: {
      value_id: `becoming_value_${Date.now()}`,
      source_type: body.source_type ?? "unknown_source",
      source_label: body.source_label ?? "unlabeled_signal",
      value: body.signal ? `Curated review prepared for: ${body.signal}` : "Curated review prepared for incoming signal.",
      why_now: body.ecosystem_need ?? "Potential ecosystem route detected.",
      route: "Review",
      risk: "unknown",
      proof_needed: "Verify source, claims, consent, and next-step permission.",
      next_action: "Return one safe action after classification.",
      expected_pulse: "verified, rejected, advanced, archived, or escalated",
      state: "candidate"
    },
    timestamp: new Date().toISOString()
  });
}
