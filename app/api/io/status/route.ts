export const runtime = "nodejs";

export async function GET() {
  return Response.json({
    status: "io_online",
    mode: "mock_first",
    law: "PULSE received. VALUE sent. Return signal updates I/O.",
    sequence: [
      "pulse_received",
      "value_prepared",
      "value_sent",
      "action_pending",
      "return_received",
      "resolved",
      "archived"
    ],
    timestamp: new Date().toISOString()
  });
}
