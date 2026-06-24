export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: {
    task?: string;
    context_items?: Array<{ id: string; summary?: string; sensitivity?: string; consent_ref?: string; relevance?: number }>;
    maximum_items?: number;
    minimum_relevance?: number;
  };

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const maximumItems = Math.max(1, Math.min(body.maximum_items ?? 8, 20));
  const minimumRelevance = body.minimum_relevance ?? 0.5;
  const items = Array.isArray(body.context_items) ? body.context_items : [];

  const selected = items
    .filter((item) => (item.relevance ?? 0) >= minimumRelevance)
    .filter((item) => item.sensitivity !== "sensitive" || Boolean(item.consent_ref))
    .sort((a, b) => (b.relevance ?? 0) - (a.relevance ?? 0))
    .slice(0, maximumItems)
    .map((item) => ({
      id: item.id,
      summary: item.summary ?? "",
      relevance: item.relevance ?? 0,
      consent_ref_present: Boolean(item.consent_ref)
    }));

  return Response.json({
    task_present: Boolean(body.task),
    selected_context: selected,
    selected_count: selected.length,
    excluded_count: Math.max(0, items.length - selected.length),
    full_memory_exported: false,
    minimization_applied: true
  });
}
