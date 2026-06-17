export const runtime = "nodejs";

type PrepareRequest = {
  name?: string;
  layer?: string;
  assigned_to?: string;
  purpose?: string[];
  seal?: number;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as PrepareRequest;
  const seal = Math.min(Math.max(Number(body.seal ?? 3), 0), 5);

  return Response.json({
    status: "record_prepared",
    mode: "mock_first",
    doctrine: "ABBA resolves. SEAL permits. Actual reveals.",
    record: {
      id: `prepared_${Date.now()}`,
      name: body.name ?? "Prepared ABBA Record",
      layer: body.layer ?? "ABBA",
      assigned_to: body.assigned_to ?? "unassigned",
      purpose: body.purpose ?? ["classification", "routing", "support"],
      seal,
      state: "candidate"
    },
    review_required: seal >= 4,
    timestamp: new Date().toISOString()
  });
}
