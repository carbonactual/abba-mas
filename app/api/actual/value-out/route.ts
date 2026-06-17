export const runtime = "nodejs";

type ActualValueBody = {
  value?: string;
  target_swarm?: string;
  reason?: string;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as ActualValueBody;

  return Response.json({
    status: "actual_value_prepared",
    mode: "mock_first",
    rule: "Actual value is routed to swarms for maximum ecosystem energy.",
    actual_value: {
      value_id: `actual_value_${Date.now()}`,
      value: body.value ?? "curated Actual value",
      target_swarm: body.target_swarm ?? "swarm_review",
      reason: body.reason ?? "select swarm with strongest proof, utility, protection, trust, timing, liquidity, and future upside",
      value_state: "prepared_for_swarm_routing",
      next_route: "/api/swarm/value-route"
    },
    timestamp: new Date().toISOString()
  });
}

export async function GET() {
  return Response.json({
    status: "actual_value_out_online",
    mode: "mock_first",
    rule: "ABBA gives value from Actual into swarms, not isolated fragments.",
    next_route: "/api/swarm/value-route",
    timestamp: new Date().toISOString()
  });
}
