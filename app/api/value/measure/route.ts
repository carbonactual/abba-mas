export const runtime = "nodejs";

type MeasureBody = {
  source?: string;
  event_type?: string;
  description?: string;
  time_minutes?: number;
  data_mb?: number;
  battery_percent?: number;
  distance_km?: number;
  money?: number;
  opportunity?: string;
};

function n(value: unknown) {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? Math.max(parsed, 0) : 0;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as MeasureBody;

  const resources = {
    time_minutes: n(body.time_minutes),
    data_mb: n(body.data_mb),
    battery_percent: n(body.battery_percent),
    distance_km: n(body.distance_km),
    money: n(body.money)
  };

  const residue_score = Number(
    (
      resources.time_minutes * 0.4 +
      resources.data_mb * 0.05 +
      resources.battery_percent * 0.2 +
      resources.distance_km * 0.3 +
      resources.money * 1
    ).toFixed(2)
  );

  return Response.json({
    status: "value_measured",
    mode: "mock_first",
    law: "Nothing is lost if it can be sensed, recorded, estimated, classified, or proven.",
    record: {
      value_record_id: `value_record_${Date.now()}`,
      source: body.source ?? "unknown_source",
      event_type: body.event_type ?? "general_action",
      description: body.description ?? "value event recorded",
      resources_used: resources,
      opportunity: body.opportunity ?? "unknown",
      residue_score,
      state: residue_score > 0 ? "measured" : "pending_more_signal",
      next_route: "/api/value/reclaim"
    },
    timestamp: new Date().toISOString()
  });
}

export async function GET() {
  return Response.json({
    status: "value_measure_online",
    mode: "mock_first",
    measured_dimensions: ["time", "data", "battery", "distance", "money", "opportunity", "wear", "attention", "trust", "residue"],
    timestamp: new Date().toISOString()
  });
}
