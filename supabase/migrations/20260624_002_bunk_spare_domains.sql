create type public.market_item_status as enum (
  'draft','submitted','under_review','verified','available','reserved','committed','fulfilled','managed','maintained','transferred','disputed','archived'
);

create table public.market_items (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null references public.subjects(id) on delete cascade,
  product_branch text not null check (product_branch in ('bunk','spare')),
  item_type text not null,
  title text not null,
  summary text,
  status public.market_item_status not null default 'draft',
  price_amount numeric,
  price_currency text,
  location jsonb not null default '{}'::jsonb,
  attributes jsonb not null default '{}'::jsonb,
  proof_state text not null default 'unverified',
  proof_refs jsonb not null default '[]'::jsonb,
  owner_subject_id uuid references public.subjects(id),
  provider_subject_id uuid references public.subjects(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.saved_demands (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null references public.subjects(id) on delete cascade,
  product_branch text not null check (product_branch in ('bunk','spare')),
  query_text text,
  filters jsonb not null default '{}'::jsonb,
  notify boolean not null default true,
  status public.record_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.offers (
  id uuid primary key default gen_random_uuid(),
  market_item_id uuid not null references public.market_items(id) on delete cascade,
  actor_subject_id uuid not null references public.subjects(id),
  offer_type text not null,
  amount numeric,
  currency text,
  terms jsonb not null default '{}'::jsonb,
  status public.record_status not null default 'pending',
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.portfolio_items (
  id uuid primary key default gen_random_uuid(),
  portfolio_subject_id uuid not null references public.subjects(id) on delete cascade,
  owned_subject_id uuid not null references public.subjects(id) on delete cascade,
  product_branch text not null check (product_branch in ('bunk','spare')),
  relationship_type text not null,
  acquisition_data jsonb not null default '{}'::jsonb,
  current_value jsonb not null default '{}'::jsonb,
  obligations jsonb not null default '[]'::jsonb,
  status public.record_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(portfolio_subject_id, owned_subject_id, relationship_type)
);

create table public.bunk_properties (
  subject_id uuid primary key references public.subjects(id) on delete cascade,
  property_type text not null,
  tenure_type text,
  development_stage text,
  address_public jsonb not null default '{}'::jsonb,
  address_protected jsonb not null default '{}'::jsonb,
  land_area numeric,
  floor_area numeric,
  area_unit text,
  bedrooms integer,
  bathrooms integer,
  title_status text,
  occupancy_status text,
  total_cost_breakdown jsonb not null default '{}'::jsonb,
  management_state jsonb not null default '{}'::jsonb,
  future_habitat_state text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.bunk_property_evidence (
  id uuid primary key default gen_random_uuid(),
  property_subject_id uuid not null references public.bunk_properties(subject_id) on delete cascade,
  evidence_type text not null,
  storage_ref text,
  metadata jsonb not null default '{}'::jsonb,
  submitted_by uuid references public.subjects(id),
  verification_state text not null default 'submitted',
  proof_id uuid references public.proofs(id),
  created_at timestamptz not null default now()
);

create table public.spare_products (
  subject_id uuid primary key references public.subjects(id) on delete cascade,
  category text not null,
  manufacturer text,
  brand text,
  model text,
  serial_number text,
  barcode text,
  year_or_version text,
  ownership_state text,
  condition_state text,
  warranty_data jsonb not null default '{}'::jsonb,
  documentation_refs jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.spare_components (
  subject_id uuid primary key references public.subjects(id) on delete cascade,
  parent_product_subject_id uuid references public.spare_products(subject_id) on delete cascade,
  component_type text not null,
  manufacturer_part_number text,
  alternate_part_numbers jsonb not null default '[]'::jsonb,
  specifications jsonb not null default '{}'::jsonb,
  condition_state text,
  authenticity_state text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.spare_compatibility (
  id uuid primary key default gen_random_uuid(),
  component_subject_id uuid not null references public.spare_components(subject_id) on delete cascade,
  target_product_subject_id uuid not null references public.spare_products(subject_id) on delete cascade,
  compatibility_type text not null,
  constraints jsonb not null default '{}'::jsonb,
  evidence_refs jsonb not null default '[]'::jsonb,
  confidence numeric check (confidence is null or (confidence >= 0 and confidence <= 1)),
  verification_state text not null default 'unverified',
  proof_id uuid references public.proofs(id),
  created_at timestamptz not null default now(),
  unique(component_subject_id, target_product_subject_id, compatibility_type)
);

create table public.spare_service_events (
  id uuid primary key default gen_random_uuid(),
  product_subject_id uuid not null references public.spare_products(subject_id) on delete cascade,
  component_subject_id uuid references public.spare_components(subject_id),
  event_type text not null,
  provider_subject_id uuid references public.subjects(id),
  pulse_id uuid references public.pulses(id),
  proof_id uuid references public.proofs(id),
  details jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now()
);

create index idx_market_items_branch_status on public.market_items(product_branch, status);
create index idx_market_items_attributes on public.market_items using gin(attributes);
create index idx_saved_demands_branch on public.saved_demands(product_branch, status);
create index idx_bunk_property_type on public.bunk_properties(property_type);
create index idx_spare_products_model on public.spare_products(manufacturer, model);
create index idx_spare_components_mpn on public.spare_components(manufacturer_part_number);
create index idx_spare_compat_target on public.spare_compatibility(target_product_subject_id);

alter table public.market_items enable row level security;
alter table public.saved_demands enable row level security;
alter table public.offers enable row level security;
alter table public.portfolio_items enable row level security;
alter table public.bunk_properties enable row level security;
alter table public.bunk_property_evidence enable row level security;
alter table public.spare_products enable row level security;
alter table public.spare_components enable row level security;
alter table public.spare_compatibility enable row level security;
alter table public.spare_service_events enable row level security;
