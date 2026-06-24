-- BUNK foundation database migration
-- Property, properly connected.

create extension if not exists pgcrypto;
create extension if not exists postgis;

create type bunk_subject_type as enum ('human','organization','property','unit','listing','agreement','payment','proof','case','maintenance','portfolio','opportunity','agent','system');
create type bunk_seal_status as enum ('requested','approved','rejected','amended','expired','revoked');
create type bunk_visibility as enum ('private','restricted','public','sealed');
create type verification_state as enum ('unsubmitted','submitted','pending','partially_verified','verified','expired','rejected','disputed','suspended','archived');
create type occupancy_state as enum ('vacant','reserved','inspection_pending','offer_pending','occupied','notice_issued','renewal_pending','maintenance_hold','off_market');
create type risk_state as enum ('low','moderate','high','critical','unknown');
create type listing_status as enum ('draft','awaiting_information','awaiting_verification','awaiting_human_approval','published','paused','reserved','closed','rejected','suspended','archived');

create table profiles (
  id uuid primary key default gen_random_uuid(),
  public_reference text unique not null,
  display_name text not null,
  email text,
  phone text,
  default_country text default 'NG',
  active_role text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table organizations (
  id uuid primary key default gen_random_uuid(),
  public_reference text unique not null,
  name text not null,
  organization_type text not null default 'agency',
  country text default 'NG',
  verification_state verification_state not null default 'unsubmitted',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table organization_members (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id),
  profile_id uuid not null references profiles(id),
  role_key text not null,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  unique (organization_id, profile_id, role_key)
);

create table identities (
  id uuid primary key default gen_random_uuid(),
  public_reference text unique not null,
  hash_reference text unique not null,
  subject_type bunk_subject_type not null,
  subject_id uuid,
  controller_profile_id uuid references profiles(id),
  controller_organization_id uuid references organizations(id),
  authority_scope jsonb not null default '{}'::jsonb,
  consent_state text not null default 'pending',
  external_bindings jsonb not null default '{}'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table seal_requests (
  id uuid primary key default gen_random_uuid(),
  public_reference text unique not null,
  requested_by uuid references identities(id),
  authority_identity_id uuid references identities(id),
  action_key text not null,
  subject_type bunk_subject_type not null,
  subject_id uuid,
  requested_scope jsonb not null default '{}'::jsonb,
  status bunk_seal_status not null default 'requested',
  reason text,
  expires_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table seal_decisions (
  id uuid primary key default gen_random_uuid(),
  seal_request_id uuid not null references seal_requests(id),
  decided_by uuid not null references identities(id),
  decision bunk_seal_status not null,
  decision_reason text,
  evidence_reviewed jsonb not null default '[]'::jsonb,
  applies_once boolean not null default true,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create table root_records (
  id uuid primary key default gen_random_uuid(),
  public_reference text unique not null,
  subject_type bunk_subject_type not null,
  subject_id uuid,
  source_type text not null,
  source_reference text,
  created_by uuid references identities(id),
  lineage jsonb not null default '[]'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table properties (
  id uuid primary key default gen_random_uuid(),
  public_reference text unique not null,
  slug text unique not null,
  name text,
  property_type text not null,
  description text,
  country text not null default 'NG',
  state text,
  lga text,
  city text,
  district text,
  neighborhood text,
  address_line text,
  location geography(Point,4326),
  geolocation_confidence numeric(5,2) default 0,
  land_size_sqm numeric(14,2),
  building_size_sqm numeric(14,2),
  bedrooms integer,
  bathrooms integer,
  toilets integer,
  parking integer,
  floors integer,
  furnishing text,
  condition text,
  amenities jsonb not null default '[]'::jsonb,
  verification_state verification_state not null default 'unsubmitted',
  occupancy_state occupancy_state not null default 'vacant',
  risk_state risk_state not null default 'unknown',
  visibility bunk_visibility not null default 'private',
  created_by uuid references identities(id),
  organization_id uuid references organizations(id),
  root_reference uuid references root_records(id),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index properties_location_gix on properties using gist(location);
create index properties_city_idx on properties(country, state, city, district);
create index properties_status_idx on properties(verification_state, occupancy_state, risk_state);

create table units (
  id uuid primary key default gen_random_uuid(),
  public_reference text unique not null,
  property_id uuid not null references properties(id),
  unit_code text not null,
  unit_type text not null,
  floor text,
  bedrooms integer,
  bathrooms integer,
  size_sqm numeric(12,2),
  amenities jsonb not null default '[]'::jsonb,
  furnishing text,
  condition text,
  availability_date date,
  rent_amount numeric(18,2),
  sale_price numeric(18,2),
  service_charge numeric(18,2),
  deposit_amount numeric(18,2),
  occupancy_state occupancy_state not null default 'vacant',
  verification_state verification_state not null default 'unsubmitted',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  unique(property_id, unit_code)
);

create table listings (
  id uuid primary key default gen_random_uuid(),
  public_reference text unique not null,
  property_id uuid references properties(id),
  unit_id uuid references units(id),
  listing_type text not null,
  headline text not null,
  public_description text,
  price numeric(18,2),
  currency text not null default 'NGN',
  billing_frequency text,
  negotiable boolean not null default true,
  deposit_amount numeric(18,2),
  service_charge numeric(18,2),
  agency_fee numeric(18,2),
  legal_fee numeric(18,2),
  inspection_fee numeric(18,2),
  total_estimated_move_in_cost numeric(18,2),
  availability_date date,
  terms jsonb not null default '{}'::jsonb,
  restrictions jsonb not null default '{}'::jsonb,
  target_profile jsonb not null default '{}'::jsonb,
  verification_state verification_state not null default 'unsubmitted',
  status listing_status not null default 'draft',
  listed_by uuid references identities(id),
  authority_proof_id uuid,
  expires_at timestamptz,
  view_count integer not null default 0,
  save_count integer not null default 0,
  lead_count integer not null default 0,
  inspection_count integer not null default 0,
  offer_count integer not null default 0,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  check(property_id is not null or unit_id is not null)
);

create index listings_public_idx on listings(status, listing_type, price, currency);
create index listings_property_idx on listings(property_id, unit_id);

create table wanted_requests (
  id uuid primary key default gen_random_uuid(),
  public_reference text unique not null,
  requester_identity_id uuid references identities(id),
  preferred_locations jsonb not null default '[]'::jsonb,
  budget_min numeric(18,2),
  budget_max numeric(18,2),
  currency text default 'NGN',
  property_types jsonb not null default '[]'::jsonb,
  bedrooms integer,
  move_in_date date,
  required_amenities jsonb not null default '[]'::jsonb,
  urgency text,
  privacy_level bunk_visibility not null default 'private',
  match_consent boolean not null default false,
  structured_criteria jsonb not null default '{}'::jsonb,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table leads (
  id uuid primary key default gen_random_uuid(),
  public_reference text unique not null,
  source text not null default 'organic',
  listing_id uuid references listings(id),
  wanted_request_id uuid references wanted_requests(id),
  seeker_identity_id uuid references identities(id),
  assigned_identity_id uuid references identities(id),
  stage text not null default 'new',
  budget numeric(18,2),
  timeline text,
  consent_scope jsonb not null default '{}'::jsonb,
  duplicate_of uuid references leads(id),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table inspections (
  id uuid primary key default gen_random_uuid(),
  public_reference text unique not null,
  listing_id uuid references listings(id),
  property_id uuid references properties(id),
  requested_by uuid references identities(id),
  assigned_to uuid references identities(id),
  inspection_type text not null default 'physical',
  scheduled_at timestamptz,
  status text not null default 'requested',
  meeting_point text,
  access_instructions_vault_ref uuid,
  fee_amount numeric(18,2),
  payment_status text default 'unpaid',
  route jsonb not null default '{}'::jsonb,
  checklist jsonb not null default '{}'::jsonb,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table offers (
  id uuid primary key default gen_random_uuid(),
  public_reference text unique not null,
  listing_id uuid references listings(id),
  offered_by uuid references identities(id),
  offered_to uuid references identities(id),
  proposed_price numeric(18,2),
  currency text default 'NGN',
  payment_schedule jsonb not null default '{}'::jsonb,
  conditions jsonb not null default '{}'::jsonb,
  status text not null default 'pending',
  seal_request_id uuid references seal_requests(id),
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table agreements (
  id uuid primary key default gen_random_uuid(),
  public_reference text unique not null,
  agreement_type text not null,
  subject_type bunk_subject_type not null,
  subject_id uuid,
  current_version integer not null default 1,
  status text not null default 'draft',
  vault_object_id uuid,
  seal_request_id uuid references seal_requests(id),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table ledger_entries (
  id uuid primary key default gen_random_uuid(),
  public_reference text unique not null,
  entry_type text not null,
  subject_type bunk_subject_type not null,
  subject_id uuid,
  account_key text not null,
  debit numeric(18,2) not null default 0,
  credit numeric(18,2) not null default 0,
  currency text not null default 'NGN',
  status text not null default 'posted',
  provider text,
  provider_reference text,
  idempotency_key text unique,
  seal_request_id uuid references seal_requests(id),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  check (debit >= 0 and credit >= 0 and not (debit > 0 and credit > 0))
);

create table maintenance_requests (
  id uuid primary key default gen_random_uuid(),
  public_reference text unique not null,
  property_id uuid references properties(id),
  unit_id uuid references units(id),
  tenancy_id uuid,
  reported_by uuid references identities(id),
  category text not null,
  severity text not null default 'normal',
  description text not null,
  status text not null default 'opened',
  responsible_party uuid references identities(id),
  assigned_vendor uuid references identities(id),
  seal_request_id uuid references seal_requests(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table proof_records (
  id uuid primary key default gen_random_uuid(),
  public_reference text unique not null,
  subject_type bunk_subject_type not null,
  subject_id uuid,
  claim text not null,
  evidence_type text not null,
  evidence_location text,
  issuer uuid references identities(id),
  submitter uuid references identities(id),
  verifier uuid references identities(id),
  verification_method text,
  status verification_state not null default 'submitted',
  confidence numeric(5,2) default 0,
  expires_at timestamptz,
  evidence_hash text,
  visibility bunk_visibility not null default 'private',
  seal_request_id uuid references seal_requests(id),
  notes text,
  dispute_status text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table pulse_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  event_version integer not null default 1,
  occurred_at timestamptz not null default now(),
  actor_type text,
  actor_id uuid,
  subject_type bunk_subject_type not null,
  subject_id uuid,
  organization_id uuid references organizations(id),
  property_id uuid references properties(id),
  seal_reference uuid references seal_requests(id),
  proof_reference uuid references proof_records(id),
  root_reference uuid references root_records(id),
  payload jsonb not null default '{}'::jsonb,
  metadata jsonb not null default '{}'::jsonb
);

create table actual_records (
  id uuid primary key default gen_random_uuid(),
  public_reference text unique not null,
  actual_type text not null,
  subject_type bunk_subject_type not null,
  subject_id uuid,
  formed_from_pulse uuid references pulse_events(id),
  proof_reference uuid references proof_records(id),
  seal_reference uuid references seal_requests(id),
  status text not null default 'formed',
  created_at timestamptz not null default now()
);

create table vault_objects (
  id uuid primary key default gen_random_uuid(),
  public_reference text unique not null,
  owner_identity_id uuid references identities(id),
  storage_provider text not null default 'supabase',
  storage_path text not null,
  object_hash text,
  mime_type text,
  visibility bunk_visibility not null default 'private',
  access_policy jsonb not null default '{}'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table ai_agents (
  id uuid primary key default gen_random_uuid(),
  public_reference text unique not null,
  name text not null,
  scope text not null,
  least_privilege_policy jsonb not null default '{}'::jsonb,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table ai_runs (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid references ai_agents(id),
  actor_identity_id uuid references identities(id),
  purpose text not null,
  input_summary text,
  output_summary text,
  confidence numeric(5,2),
  evidence jsonb not null default '[]'::jsonb,
  escalated boolean not null default false,
  created_at timestamptz not null default now()
);

create table swarm_definitions (
  id uuid primary key default gen_random_uuid(),
  public_reference text unique not null,
  name text not null,
  purpose text not null,
  labels text[] not null default '{}',
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table provider_health (
  id uuid primary key default gen_random_uuid(),
  provider_key text not null,
  swarm_key text,
  status text not null default 'unknown',
  last_checked_at timestamptz,
  evidence jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_identity_id uuid references identities(id),
  action text not null,
  subject_type bunk_subject_type,
  subject_id uuid,
  risk_level risk_state not null default 'unknown',
  seal_request_id uuid references seal_requests(id),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table feature_flags (
  key text primary key,
  enabled boolean not null default false,
  description text,
  metadata jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

insert into feature_flags(key, enabled, description) values
('investment_module', false, 'Compliance-gated investment route'),
('mortgage_module', false, 'Regulated mortgage partner matching'),
('rent_to_own_module', false, 'Rent-to-own route'),
('public_proof_publication', false, 'Public ATLAS proof publication')
on conflict (key) do nothing;
