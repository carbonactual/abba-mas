import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const requestSchema = z.object({
  message: z.string().min(2),
  active_role: z.string().optional(),
  location: z.string().optional(),
  context: z.record(z.any()).optional()
});

function chooseSwarms(message: string) {
  const text = message.toLowerCase();
  const swarms = new Set<string>();
  if (text.includes('find') || text.includes('search') || text.includes('near')) swarms.add('Discovery Swarm');
  if (text.includes('list') || text.includes('property')) swarms.add('Listing Swarm');
  if (text.includes('verify') || text.includes('proof') || text.includes('document')) swarms.add('Verification Swarm');
  if (text.includes('inspection') || text.includes('visit')) swarms.add('Inspection Swarm');
  if (text.includes('offer') || text.includes('agreement') || text.includes('pay')) swarms.add('Transaction Swarm');
  if (text.includes('maintenance') || text.includes('repair')) swarms.add('Property Operations Swarm');
  if (text.includes('dispute') || text.includes('fraud') || text.includes('suspicious')) swarms.add('Risk and Redress Swarm');
  if (swarms.size === 0) swarms.add('Support Swarm');
  return [...swarms];
}

export async function POST(request: NextRequest) {
  const parsed = requestSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: { code: 'validation_error', issues: parsed.error.flatten() } }, { status: 400 });
  }

  const selected_swarms = chooseSwarms(parsed.data.message);
  const high_impact = /approve|reject|publish|verify ownership|release|transfer|investment|dispute decision/i.test(parsed.data.message);

  return NextResponse.json({
    ok: true,
    data: {
      intent: parsed.data.message,
      active_role: parsed.data.active_role || 'unresolved',
      selected_swarms,
      seal_required: high_impact ? 'SEAL_3_HUMAN' : 'SEAL_2_ROUTING',
      ai_authority: 'recommend_only',
      next_actions: high_impact
        ? ['Prepare evidence summary', 'Route to authorized human SEAL approver', 'Block automatic execution']
        : ['Collect missing details', 'Recommend route', 'Create Pulse event'],
      confidence: 0.72
    }
  });
}
