export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const level = Math.min(Math.max(Number(body.level ?? 1), 0), 5);
  return Response.json({
    status: "checked",
    level,
    allowed: level <= 3,
    review_required: level > 3,
    timestamp: new Date().toISOString()
  });
}
