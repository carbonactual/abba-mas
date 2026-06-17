export const runtime = "nodejs";

type PulseInBody = {
  source?: string;
  signal?: string;
  context?: string;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as PulseInBody;

  return Response.json({
    status: "pulse_received",
    mode: "mock_first",
    io: {
      io_id: `io_${Date.now()}`,
      pulse_in: {
        source: body.source ?? "unknown_source",
        signal: body.signal ?? "incoming_signal",
        context: body.context ?? "none"
      },
      abba_read: "Signal received for curation into possible value.",
      value_state: "pulse_received"
    },
    next_route: "/api/io/value-out",
    timestamp: new Date().toISOString()
  });
}
