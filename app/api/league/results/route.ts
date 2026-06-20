export const runtime = "nodejs";

type ResultInput = {
  matchId: string;
  productId: string;
  championTeamId: string;
  reserveTeamId?: string;
  verified: boolean;
  proofRefs?: string[];
  kpiUpdates?: Array<{ providerId: string; fractionId: string; metrics: Record<string, number> }>;
  lessons?: string[];
};

export async function POST(request: Request) {
  const body = (await request.json()) as ResultInput;
  if (!body.matchId || !body.productId || !body.championTeamId) {
    return Response.json({ error: "matchId, productId and championTeamId are required" }, { status: 400 });
  }

  if (!body.verified) {
    return Response.json({
      status: "pending-verification",
      matchId: body.matchId,
      acceptedAsFinal: false,
      reason: "A league result must be verified before promotion or learning return."
    }, { status: 202 });
  }

  return Response.json({
    status: "verified-result-accepted",
    matchId: body.matchId,
    productId: body.productId,
    engineRoom: {
      championTeamId: body.championTeamId,
      reserveTeamId: body.reserveTeamId ?? null
    },
    returnPackage: {
      proofRefs: body.proofRefs ?? [],
      kpiUpdates: body.kpiUpdates ?? [],
      lessons: body.lessons ?? [],
      privateProductDataReturned: false
    },
    nextActions: [
      "update app and fraction rankings",
      "return authorized learning to home swarms",
      "retain champion assignment while needed",
      "release unused fractions",
      "schedule future rechallenge when evidence or conditions change"
    ]
  });
}
