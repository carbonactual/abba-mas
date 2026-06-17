export const runtime = "nodejs";

export async function GET() {
  return Response.json({
    status: "registry online",
    mode: "mock_first",
    doctrine: "ABBA resolves. SEAL permits. Actual reveals.",
    records: [
      {
        id: "abba_core_000001",
        name: "ABBA Core",
        layer: "ABBA",
        seal: 4,
        state: "active_mock_first"
      },
      {
        id: "hapi_template_000001",
        name: "HAPI Personal Template",
        layer: "HAPI",
        seal: 3,
        state: "template"
      }
    ],
    timestamp: new Date().toISOString()
  });
}
