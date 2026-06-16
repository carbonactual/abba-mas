-- ABBA MAS Swarm Registry
-- Memory stores masked references. Actual is the only value reveal route.

create table if not exists public.swarm_providers (
  id uuid primary key default gen_random_uuid(),
  provider_key text not null unique,
  display_name text not null,
  swarm_layer text not null,
  route_type text not null,
  seal_level_default text not null default 'SEAL-3',
  risk_level text not null default 'medium',
  credential_names text[] not null default '{}',
  setup_links text[] not null default '{}',
  status text not null default 'candidate' check (status in (
    'candidate',
    'scouted',
    'setup_required',
    'credentials_pending',
    'connected',
    'pilot_active',
    'active',
    'paused',
    'blocked',
    'rejected'
  )),
  allowed_data text[] not null default '{}',
  forbidden_data text[] not null default '{}',
  activation_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.swarm_events (
  id uuid primary key default gen_random_uuid(),
  swarm_event_id text not null unique,
  source_provider text not null,
  source_layer text not null,
  event_type text not null,
  summary text not null,
  source_pointer text,
  mint_id text,
  token_ref text,
  proof_ref text,
  value_visibility text not null default 'masked' check (value_visibility = 'masked'),
  actual_call_required boolean not null default false,
  actual_route text not null default 'ACTUAL_VALUE_ENGINE',
  actual_value_status text not null default 'not_requested',
  seal_level text not null default 'SEAL-3',
  risk_level text not null default 'not_set',
  metadata jsonb not null default '{}'::jsonb,
  status text not null default 'accepted',
  received_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists idx_swarm_events_source_provider on public.swarm_events(source_provider);
create index if not exists idx_swarm_events_source_layer on public.swarm_events(source_layer);
create index if not exists idx_swarm_events_mint_id on public.swarm_events(mint_id);
create index if not exists idx_swarm_events_token_ref on public.swarm_events(token_ref);
create index if not exists idx_swarm_events_proof_ref on public.swarm_events(proof_ref);

create table if not exists public.swarm_seal_approvals (
  id uuid primary key default gen_random_uuid(),
  seal_approval_id text not null unique,
  swarm_event_id text,
  requested_by text,
  approved_by text,
  seal_level text not null,
  seal_status text not null default 'pending' check (seal_status in ('pending', 'approved', 'rejected', 'revoked')),
  approval_scope text not null default 'swarm_memory',
  reason text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  approved_at timestamptz
);

create table if not exists public.swarm_actual_calls (
  id uuid primary key default gen_random_uuid(),
  actual_call_id text not null unique,
  source_provider text,
  swarm_event_id text,
  mint_id text,
  token_ref text,
  proof_ref text,
  requested_value_class text not null default 'not_set',
  requested_route text not null default 'ACTUAL_VALUE_ENGINE',
  seal_level text not null default 'SEAL-4',
  seal_status text not null check (seal_status = 'approved'),
  seal_approval_id text not null,
  resolved_by text not null default 'ABBA',
  abba_resolution_id text,
  reason text,
  metadata jsonb not null default '{}'::jsonb,
  actual_value_status text not null default 'pending_actual_engine',
  value_visibility text not null default 'hidden_until_authorized_actual_flow',
  status text not null default 'accepted',
  created_at timestamptz not null default now()
);

create index if not exists idx_swarm_actual_calls_event on public.swarm_actual_calls(swarm_event_id);
create index if not exists idx_swarm_actual_calls_mint on public.swarm_actual_calls(mint_id);
create index if not exists idx_swarm_actual_calls_token on public.swarm_actual_calls(token_ref);

create table if not exists public.swarm_proof_refs (
  id uuid primary key default gen_random_uuid(),
  proof_ref text not null unique,
  source_provider text not null,
  proof_system text not null,
  proof_network text,
  schema_ref text,
  attestation_ref text,
  offchain_uri text,
  public_visibility text not null default 'private_until_seal' check (public_visibility in ('private_until_seal', 'public_after_seal', 'internal_only')),
  seal_level text not null default 'SEAL-5',
  seal_status text not null default 'pending' check (seal_status in ('pending', 'approved', 'rejected', 'revoked')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.swarm_providers enable row level security;
alter table public.swarm_events enable row level security;
alter table public.swarm_seal_approvals enable row level security;
alter table public.swarm_actual_calls enable row level security;
alter table public.swarm_proof_refs enable row level security;

-- No public policies are created here. Use service-role server routes first.
-- Add user-scoped policies only after HAPI identity and SEAL rules are finalized.
