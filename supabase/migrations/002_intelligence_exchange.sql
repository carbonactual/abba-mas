create table if not exists model_registry (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  model_id text not null unique,
  capabilities jsonb not null default '{}'::jsonb,
  pricing jsonb not null default '{}'::jsonb,
  privacy_profile jsonb not null default '{}'::jsonb,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists routing_policies (
  id uuid primary key default gen_random_uuid(),
  policy_key text not null unique,
  product_key text,
  rules jsonb not null default '{}'::jsonb,
  seal_level integer not null default 1,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists output_schemas (
  id uuid primary key default gen_random_uuid(),
  schema_key text not null unique,
  version text not null,
  product_key text,
  schema_body jsonb not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists model_calls (
  id uuid primary key default gen_random_uuid(),
  request_id text not null unique,
  product_key text,
  operation_key text,
  agent_key text,
  model_id text,
  provider text,
  policy_key text,
  schema_key text,
  data_class text not null default 'masked',
  latency_ms integer,
  estimated_cost numeric,
  confidence numeric,
  disagreement_detected boolean not null default false,
  review_required boolean not null default false,
  status text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists model_feedback (
  id uuid primary key default gen_random_uuid(),
  request_id text not null,
  rating integer check (rating between 1 and 5),
  corrected boolean not null default false,
  correction_type text,
  feedback jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists provider_metrics (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  model_id text,
  latency_ms integer,
  error_rate numeric,
  schema_success_rate numeric,
  availability_rate numeric,
  health_score numeric,
  status text,
  measured_at timestamptz not null default now()
);

create table if not exists model_evaluations (
  id uuid primary key default gen_random_uuid(),
  evaluation_key text not null,
  product_key text,
  task_type text,
  candidate_model text,
  score numeric,
  dimensions jsonb not null default '{}'::jsonb,
  passed boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists proof_envelopes (
  id uuid primary key default gen_random_uuid(),
  request_id text not null,
  proof_hash text not null unique,
  product_key text,
  operation_key text,
  evidence_refs jsonb not null default '[]'::jsonb,
  seal_level integer not null default 0,
  release_state text not null default 'review_required',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_model_calls_product_created on model_calls(product_key, created_at desc);
create index if not exists idx_model_feedback_request on model_feedback(request_id);
create index if not exists idx_provider_metrics_provider_time on provider_metrics(provider, measured_at desc);
create index if not exists idx_proof_envelopes_request on proof_envelopes(request_id);
