import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    ok: true,
    product: 'BUNK',
    service: 'bunk-web',
    status: 'foundation_active',
    swarms: {
      discovery: 'ready',
      listing: 'ready',
      verification: 'ready',
      match: 'ready',
      inspection: 'ready',
      transaction: 'ready',
      tenancy: 'ready',
      operations: 'ready',
      finance: 'gated',
      compliance: 'ready'
    },
    gates: {
      ai_approvals_allowed: false,
      public_proof_requires_seal: true,
      investment_module_enabled: process.env.INVESTMENT_MODULE_ENABLED === 'true'
    }
  });
}
