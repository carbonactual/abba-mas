import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const listingSchema = z.object({
  property_id: z.string().optional(),
  unit_id: z.string().optional(),
  listing_type: z.string().min(2),
  headline: z.string().min(4),
  public_description: z.string().optional(),
  price: z.number().nonnegative(),
  currency: z.string().default('NGN'),
  billing_frequency: z.string().optional(),
  negotiable: z.boolean().default(true),
  inspection_fee: z.number().nonnegative().optional()
}).refine((value) => value.property_id || value.unit_id, 'property_id or unit_id is required');

const demoListings = [
  {
    public_reference: 'BUNK-LIST-000001',
    headline: 'Verified 2-bedroom apartment near Wuse 2',
    listing_type: 'rent',
    price: 3800000,
    currency: 'NGN',
    billing_frequency: 'year',
    status: 'awaiting_human_approval',
    verification_state: 'partially_verified'
  }
];

export async function GET() {
  return NextResponse.json({ ok: true, data: demoListings });
}

export async function POST(request: NextRequest) {
  const parsed = listingSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: { code: 'validation_error', issues: parsed.error.flatten() } }, { status: 400 });
  }

  const listing = {
    public_reference: `BUNK-LIST-${String(Date.now()).slice(-6)}`,
    status: 'draft',
    verification_state: 'unsubmitted',
    hidden_fee_warning: false,
    ...parsed.data
  };

  return NextResponse.json({
    ok: true,
    data: listing,
    pulse: { event_type: 'listing.created', subject: listing.public_reference },
    next: 'Submit for verification and human publication approval.'
  }, { status: 201 });
}
