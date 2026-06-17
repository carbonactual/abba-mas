export const runtime = "nodejs";

type ValueOutBody = {
  io_id?: string;
  value?: string;
  route?: string;
  action?: string;
  expected_pulse?: string;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as ValueOutBody;

  return Response.json({
    status: "value_sent",
    mode: "mock_first",
    io: {
      io_id: body.io_id ?? `io_${Date.now()}`,
      value_out: body.value ?? "Curated value prepared from received pulse.",
      route: body.route ?? "Review",
      action: body.action ?? "Take one safe next step.",
      expected_return: body.expected_pulse ?? "return pulse pending",
      value_state: "value_sent"
    },
    next_state: "waiting_for_return_pulse",
    timestamp: new Date().toISOString()
  });
}
