import { NextResponse } from 'next/server';

const providers = [
  { key: 'supabase', swarms: ['Data', 'Identity', 'Vault'], status: 'credentials_pending', seal: 'SEAL_2' },
  { key: 'vercel', swarms: ['Infrastructure'], status: 'registry_ready', seal: 'SEAL_2' },
  { key: 'openai', swarms: ['Intelligence', 'ABBA'], status: 'credentials_pending', seal: 'SEAL_2' },
  { key: 'gemini', swarms: ['Intelligence'], status: 'credentials_pending', seal: 'SEAL_2' },
  { key: 'n8n', swarms: ['Automation', 'Pulse'], status: 'credentials_pending', seal: 'SEAL_2' },
  { key: 'paystack', swarms: ['Finance', 'I/O'], status: 'blocked_until_sandbox', seal: 'SEAL_3' },
  { key: 'monnify', swarms: ['Finance', 'I/O'], status: 'blocked_until_sandbox', seal: 'SEAL_3' },
  { key: 'resend', swarms: ['Communication'], status: 'credentials_pending', seal: 'SEAL_2' },
  { key: 'typesense', swarms: ['Discovery', 'Search'], status: 'registry_ready', seal: 'SEAL_2' },
  { key: 'map_provider', swarms: ['Discovery', 'Map'], status: 'registry_ready', seal: 'SEAL_2' }
];

export async function GET() {
  return NextResponse.json({
    ok: true,
    data: providers,
    truth_rule: 'Provider is not production_active until credentials, health evidence, task receipt, audit event, and SEAL gate are satisfied.'
  });
}
