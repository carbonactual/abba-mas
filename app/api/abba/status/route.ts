export const runtime = "nodejs";

export async function GET() {
  return Response.json({
    status: "ABBA operating core online",
    mode: "mock_first",
    doctrine: "ABBA resolves. SEAL permits. Actual reveals.",
    routes: [
      "/api/ai/registry",
      "/api/ai/mint",
      "/api/hapi/assign-ai",
      "/api/seal/check",
      "/api/pulse/receive"
    ],
    timestamp: new Date().toISOString()
  });
}
