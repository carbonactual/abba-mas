export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: {
    request_id?: string;
    rating?: number;
    corrected?: boolean;
    correction_type?: string;
    notes?: string;
  };

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  if (!body.request_id) return Response.json({ error: "request_id_required" }, { status: 400 });
  if (typeof body.rating === "number" && (body.rating < 1 || body.rating > 5)) {
    return Response.json({ error: "rating_must_be_between_1_and_5" }, { status: 400 });
  }

  return Response.json({
    accepted: true,
    request_id: body.request_id,
    learning_signal: {
      rating: body.rating ?? null,
      corrected: body.corrected ?? false,
      correction_type: body.correction_type ?? null,
      notes_present: Boolean(body.notes)
    },
    persistence_state: "database_migration_required",
    recorded_at: new Date().toISOString()
  });
}
