export const runtime = "nodejs";

const sampleValues = [
  {
    value_id: "becoming_value_demo_001",
    source_type: "dm_or_document",
    source_label: "incoming signal",
    value: "Review this signal because it may contain a useful HAPI route, proof item, product input, or opportunity.",
    why_now: "ABBA presents only curated value, not raw noise.",
    route: "Review",
    risk: "unknown",
    proof_needed: "Confirm source, claims, intent, and permission before action.",
    next_action: "Classify and prepare one safe next step.",
    expected_pulse: "verified, rejected, advanced, archived, or escalated",
    state: "presented"
  }
];

export async function GET() {
  return Response.json({
    status: "becoming_feed_online",
    mode: "mock_first",
    doctrine: "Only curated value enters the Becoming Feed. Value acted upon produces PULSE.",
    values: sampleValues,
    timestamp: new Date().toISOString()
  });
}
