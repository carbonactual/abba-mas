import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const propertySchema = z.object({
  name: z.string().min(2).optional(),
  property_type: z.string().min(2),
  description: z.string().optional(),
  country: z.string().default('NG'),
  state: z.string().optional(),
  city: z.string().optional(),
  district: z.string().optional(),
  neighborhood: z.string().optional(),
  address_line: z.string().optional(),
  bedrooms: z.number().int().nonnegative().optional(),
  bathrooms: z.number().int().nonnegative().optional(),
  visibility: z.enum(['private', 'restricted', 'public', 'sealed']).default('private')
});

const demoProperties = [
  {
    public_reference: 'BUNK-PROP-000001',
    slug: 'verified-two-bedroom-wuse-2',
    name: 'Verified 2-bedroom apartment',
    property_type: 'apartment',
    city: 'Abuja',
    district: 'Wuse 2',
    verification_state: 'partially_verified',
    occupancy_state: 'vacant',
    risk_state: 'moderate'
  }
];

export async function GET() {
  return NextResponse.json({ ok: true, data: demoProperties });
}

export async function POST(request: NextRequest) {
  const parsed = propertySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: { code: 'validation_error', issues: parsed.error.flatten() } }, { status: 400 });
  }

  const property = {
    public_reference: `BUNK-PROP-${String(Date.now()).slice(-6)}`,
    slug: `${parsed.data.property_type}-${Date.now()}`.toLowerCase(),
    verification_state: 'unsubmitted',
    occupancy_state: 'vacant',
    risk_state: 'unknown',
    ...parsed.data
  };

  return NextResponse.json({
    ok: true,
    data: property,
    pulse: { event_type: 'property.created', subject: property.public_reference },
    next: 'Submit ownership or authority-to-list proof before publication.'
  }, { status: 201 });
}
