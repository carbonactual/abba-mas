create extension if not exists pgcrypto;

create type public.subject_kind as enum (
  'hapi','ai','entity','department','role','appointment','product','asset','project','initiative','place','document','agent','service','market_object'
);

create type public.record_status as enum (
  'draft','pending','active','paused','restricted','suspended','completed','expired','revoked','disputed','archived'
);

create table public.subjects (
  id uuid primary key default gen_random_uuid(),
  hash_id text not null unique check (hash_id like '#%'),
  kind public.subject_kind not null,
  display_name text,
  status public.record_status not null default 'active',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.roots (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null references public.subjects(id) on delete cascade,
  version integer not null default 1,
  root_type text not null,
  payload jsonb not null,
  proof_refs jsonb not null default '[]'::jsonb,
  is_current boolean not null default true,
  created_at timestamptz not null default now(),
  unique(subject_id, version)
);

create table public.vectors (
  id uuid primary key default gen_random_uuid(),
  vector_hash text not null unique check (vector_hash like '#%'),
  subject_id uuid not null references public.subjects(id) on delete cascade,
  title text not null,
  purpose text,
  origin_state jsonb not null default '{}'::jsonb,
  desired_state jsonb not null default '{}'::jsonb,
  beneficiaries jsonb not null default '[]'::jsonb,
  value_paths jsonb not null default '[]'::jsonb,
  constraints jsonb not null default '[]'::jsonb,
  dependencies jsonb not null default '[]'::jsonb,
  risks jsonb not null default '[]'::jsonb,
  milestones jsonb not null default '[]'::jsonb,
  proof_requirements jsonb not null default '[]'::jsonb,
  stage text not null default 'draft',
  status public.record_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.capabilities (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null references public.subjects(id) on delete cascade,
  capability_key text not null,
  scope jsonb not null default '{}'::jsonb,
  level integer not null default 1 check (level >= 0),
  status public.record_status not null default 'pending',
  evidence_refs jsonb not null default '[]'::jsonb,
  restrictions jsonb not null default '[]'::jsonb,
  supervisor_subject_id uuid references public.subjects(id),
  valid_from timestamptz,
  valid_until timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(subject_id, capability_key)
);

create table public.commitments (
  id uuid primary key default gen_random_uuid(),
  commitment_hash text not null unique check (commitment_hash like '#%'),
  subject_id uuid not null references public.subjects(id),
  beneficiary_subject_id uuid references public.subjects(id),
  vector_id uuid references public.vectors(id),
  title text not null,
  obligation_type text not null,
  success_conditions jsonb not null default '[]'::jsonb,
  proof_requirements jsonb not null default '[]'::jsonb,
  due_at timestamptz,
  status public.record_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.relationships (
  id uuid primary key default gen_random_uuid(),
  source_subject_id uuid not null references public.subjects(id) on delete cascade,
  relationship_type text not null,
  target_subject_id uuid not null references public.subjects(id) on delete cascade,
  scope jsonb not null default '{}'::jsonb,
  authority jsonb not null default '[]'::jsonb,
  restrictions jsonb not null default '[]'::jsonb,
  consent_ref text,
  valid_from timestamptz,
  valid_until timestamptz,
  status public.record_status not null default 'active',
  created_at timestamptz not null default now()
);

create table public.allocations (
  id uuid primary key default gen_random_uuid(),
  resource_subject_id uuid not null references public.subjects(id),
  provider_subject_id uuid references public.subjects(id),
  recipient_subject_id uuid not null references public.subjects(id),
  vector_id uuid references public.vectors(id),
  purpose text not null,
  quantity numeric,
  unit text,
  conditions jsonb not null default '[]'::jsonb,
  proof_requirements jsonb not null default '[]'::jsonb,
  status public.record_status not null default 'pending',
  valid_from timestamptz,
  valid_until timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.consents (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null references public.subjects(id) on delete cascade,
  actor_subject_id uuid not null references public.subjects(id),
  purpose text not null,
  scope jsonb not null default '{}'::jsonb,
  status public.record_status not null default 'active',
  granted_at timestamptz not null default now(),
  expires_at timestamptz,
  revoked_at timestamptz
);

create table public.pulses (
  id uuid primary key default gen_random_uuid(),
  pulse_hash text not null unique check (pulse_hash like '#%'),
  subject_id uuid not null references public.subjects(id) on delete cascade,
  actor_subject_id uuid references public.subjects(id),
  vector_id uuid references public.vectors(id),
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  evidence_refs jsonb not null default '[]'::jsonb,
  verification_state text not null default 'unverified',
  occurred_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table public.proofs (
  id uuid primary key default gen_random_uuid(),
  proof_hash text not null unique check (proof_hash like '#%'),
  subject_id uuid not null references public.subjects(id) on delete cascade,
  pulse_id uuid references public.pulses(id),
  claim_type text not null,
  claim jsonb not null,
  evidence_refs jsonb not null default '[]'::jsonb,
  verifier_subject_ids uuid[] not null default '{}',
  verification_method text,
  confidence numeric check (confidence is null or (confidence >= 0 and confidence <= 1)),
  status public.record_status not null default 'pending',
  issued_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.actual_states (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null references public.subjects(id) on delete cascade,
  state_type text not null,
  state jsonb not null,
  proof_id uuid not null references public.proofs(id),
  effective_at timestamptz not null default now(),
  supersedes_id uuid references public.actual_states(id),
  is_current boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.agents (
  id uuid primary key default gen_random_uuid(),
  agent_subject_id uuid not null unique references public.subjects(id) on delete cascade,
  parent_subject_id uuid not null references public.subjects(id),
  purpose text not null,
  allowed_tools jsonb not null default '[]'::jsonb,
  allowed_data jsonb not null default '[]'::jsonb,
  prohibited_actions jsonb not null default '[]'::jsonb,
  supervisor_subject_id uuid references public.subjects(id),
  status public.record_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.audit_logs (
  id bigserial primary key,
  actor_subject_id uuid references public.subjects(id),
  subject_id uuid references public.subjects(id),
  action text not null,
  resource_type text not null,
  resource_id text,
  decision text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index idx_vectors_subject on public.vectors(subject_id);
create index idx_capabilities_subject on public.capabilities(subject_id);
create index idx_relationships_source on public.relationships(source_subject_id);
create index idx_relationships_target on public.relationships(target_subject_id);
create index idx_pulses_subject_time on public.pulses(subject_id, occurred_at desc);
create index idx_proofs_subject on public.proofs(subject_id);
create index idx_actual_subject_current on public.actual_states(subject_id, is_current);
create index idx_audit_subject_time on public.audit_logs(subject_id, created_at desc);

alter table public.subjects enable row level security;
alter table public.roots enable row level security;
alter table public.vectors enable row level security;
alter table public.capabilities enable row level security;
alter table public.commitments enable row level security;
alter table public.relationships enable row level security;
alter table public.allocations enable row level security;
alter table public.consents enable row level security;
alter table public.pulses enable row level security;
alter table public.proofs enable row level security;
alter table public.actual_states enable row level security;
alter table public.agents enable row level security;
alter table public.audit_logs enable row level security;
