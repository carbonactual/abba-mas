export const runtime = "nodejs";

export async function GET() {
  return Response.json({
    status: "value_examples_online",
    mode: "mock_first",
    examples: [
      {
        event_type: "download_interrupted",
        description: "A file download stopped halfway and disappeared.",
        measured_loss: ["time", "data", "battery", "attention", "opportunity", "trust"],
        next_action: "Measure residue and route for retry, restoration, provider score update, or prevention."
      },
      {
        event_type: "page_not_loaded",
        description: "A website delayed and failed to load.",
        measured_loss: ["time", "data", "battery", "attention", "opportunity"],
        next_action: "Record leakage, update route intelligence, and prefer better provider paths."
      },
      {
        event_type: "wear_and_tear",
        description: "Movement, device use, transport, and human effort consumed resources.",
        measured_loss: ["distance", "energy", "wear", "time", "cost"],
        next_action: "Add residue to value state and apply replenishment or prevention logic."
      }
    ],
    doctrine: "Even ash has residual value.",
    timestamp: new Date().toISOString()
  });
}
