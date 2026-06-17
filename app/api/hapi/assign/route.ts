export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  return Response.json({
    status: "assignment_prepared",
    mode: "mock_first",
    input: body,
    review_required: true,
    timestamp: new Date().toISOString()
  });
}
