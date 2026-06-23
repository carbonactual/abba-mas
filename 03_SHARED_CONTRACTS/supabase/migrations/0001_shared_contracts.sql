create extension if not exists pgcrypto;

create type lifecycle_status as enum ('pending','active','restricted','suspended','revoked','expired','under_review');
create type seal_status as enum ('active','revoked','expired');
create type actual_status as enum ('active','paused','completed','abandoned');
create type pulse_direction as enum ('inward','outward','bidirectional');

create table if not exists hash_identities (
  hash_id uuid primary key default gen_random_uuid(),
  human_id uuid not null unique,
  personal_ai_id uuid not null unique,
  subject_kind text not null default 'human_ai_pair' check (subject_kind = 'human_ai_pair'),
  status lifecycle_status not null default 'active',
  public_key text,
  proof_refs jsonb not null default '[]'::jsonb,
  tags text[] not null default '{}',
  minted_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists personal_ai_mints (
  mint_id uuid primary key default gen_random_uuid(),
  hash_id uuid not null references hash_identities(hash_id) on delete cascade,
  human_id uuid not null,
  personal_ai_id uuid not null,
  status text not null check (status in ('requested','minting','minted','failed')),
  model_route text,
  memory_route text,
  capability_profile text[] not null default '{}',
  proof_ref jsonb,
  failure_reason text,
  requested_at timestamptz not null default now(),
  completed_at timestamptz
);

create table if not exists seal_grants (
  seal_grant_id uuid primary key default gen_random_uuid(),
  hash_id uuid not null references hash_identities(hash_id) on delete cascade,
  granted_by uuid not null,
  audience text not null,
  scopes text[] not null,
  claims text[] not null default '{}',
  constraints jsonb not null default '{}'::jsonb,
  status seal_status not null default 'active',
  granted_at timestamptz not null default now(),
  expires_at timestamptz,
  revoked_at timestamptz
);

create table if not exists actual_sessions (
  actual_session_id uuid primary key default gen_random_uuid(),
  hash_id uuid not null references hash_identities(hash_id) on delete cascade,
  status actual_status not null default 'active',
  surfaces text[] not null,
  context_refs uuid[] not null default '{}',
  goal_refs uuid[] not null default '{}',
  location_ref uuid,
  group_refs uuid[] not null default '{}',
  pulse_ids uuid[] not null default '{}',
  started_at timestamptz not null default now(),
  ended_at timestamptz
);

create table if not exists becoming_cards (
  becoming_card_id uuid primary key default gen_random_uuid(),
  hash_id uuid not null references hash_identities(hash_id) on delete cascade,
  card_type text not null,
  title text not null,
  summary text,
  reason_codes text[] not null,
  surface text not null,
  priority numeric not null check (priority between 0 and 1),
  valid_from timestamptz not null,
  valid_until timestamptz,
  action jsonb,
  source_refs text[] not null,
  seal_grant_id uuid references seal_grants(seal_grant_id),
  proof_refs jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists pulse_events (
  pulse_id uuid primary key default gen_random_uuid(),
  hash_id uuid not null references hash_identities(hash_id) on delete cascade,
  actor_id text not null,
  actor_kind text not null,
  source text not null,
  event_type text not null,
  direction pulse_direction not null,
  context jsonb not null default '{}'::jsonb,
  payload jsonb not null,
  proof_refs jsonb not null default '[]'::jsonb,
  seal_grant_id uuid references seal_grants(seal_grant_id),
  correlation_id text,
  occurred_at timestamptz not null,
  received_at timestamptz not null default now()
);

create table if not exists root_updates (
  update_id uuid primary key default gen_random_uuid(),
  hash_id uuid not null references hash_identities(hash_id) on delete cascade,
  pulse_id uuid not null references pulse_events(pulse_id) on delete cascade,
  category text not null,
  operation text not null check (operation in ('append','amend','supersede','remove')),
  data_ref text not null,
  proof_refs jsonb not null default '[]'::jsonb,
  seal_grant_id uuid references seal_grants(seal_grant_id),
  occurred_at timestamptz not null
);

create table if not exists index_updates (
  update_id uuid primary key default gen_random_uuid(),
  source_pulse_id uuid not null references pulse_events(pulse_id) on delete cascade,
  topic text not null,
  operation text not null check (operation in ('upsert','link','unlink','reclassify')),
  entity_refs text[] not null,
  confidence numeric check (confidence between 0 and 1),
  proof_refs jsonb not null default '[]'::jsonb,
  occurred_at timestamptz not null
);

create table if not exists atlas_projections (
  atlas_id uuid primary key default gen_random_uuid(),
  subject_id text not null,
  subject_kind text not null,
  public_handle text not null unique,
  display_name text not null,
  headline text,
  summary text,
  public_claims jsonb not null default '{}'::jsonb,
  relationship_refs text[] not null default '{}',
  achievement_refs text[] not null default '{}',
  activity_refs text[] not null default '{}',
  proof_refs jsonb not null default '[]'::jsonb,
  visibility text not null check (visibility in ('public','limited','unlisted')),
  published_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_hash_identities_human on hash_identities(human_id);
create index if not exists idx_actual_sessions_hash on actual_sessions(hash_id, started_at desc);
create index if not exists idx_becoming_cards_hash on becoming_cards(hash_id, priority desc, valid_from desc);
create index if not exists idx_pulse_events_hash on pulse_events(hash_id, occurred_at desc);
create index if not exists idx_pulse_events_type on pulse_events(event_type, occurred_at desc);

alter table hash_identities enable row level security;
alter table personal_ai_mints enable row level security;
alter table seal_grants enable row level security;
alter table actual_sessions enable row level security;
alter table becoming_cards enable row level security;
alter table pulse_events enable row level security;
alter table root_updates enable row level security;
alter table index_updates enable row level security;
alter table atlas_projections enable row level security;
