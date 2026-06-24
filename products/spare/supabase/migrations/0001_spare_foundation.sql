-- SPARE foundation schema
-- Product continuity route of Carbon Actual

create extension if not exists pgcrypto;

create type spare_subject_type as enum ('human','organization','product','product_model','product_instance','part','listing','repair','order','proof','case','asset','system');
create type verification_state as enum ('unverified','self_declared','evidence_submitted','ai_assisted_review','expert_reviewed','manufacturer_verified','proof_backed','disputed','rejected','expired');
create type compatibility_status as enum ('exact_fit','confirmed_compatible','adapter_required','modification_required','functionally_equivalent','visually_similar_incompatible','unknown','unsafe','not_recommended');
create type condition_grade as enum ('new_sealed','new_open_box','new_old_stock','manufacturer_refurbished','seller_refurbished','professionally_tested_used','used_working','used_untested','repairable','for_parts','salvage','custom_fabricated');
create type safety_class as enum ('low','moderate','professional_recommended','certified_professional_required','restricted_guidance');
create type visibility as enum ('private','restricted','public','sealed');

create table profiles (
  id uuid primary key default gen_random_uuid(),
  public_reference text unique not null,
  display_name text not null,
  email text,
  phone text,
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
  organization_type text not null,
  country text default 'NG',
  verification_state verification_state not null default 'unverified',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table identities (
  id uuid primary key default gen_random_uuid(),
  public_reference text unique not null,
  hash_reference text unique not null,
  subject_type spare_subject_type not null,
  subject_id uuid,
  controller_profile_id uuid references profiles(id),
  controller_organization_id uuid references organizations(id),
  authority_scope jsonb not null default '{}'::jsonb,
  consent_state text not null default 'pending',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table brands (
  id uuid primary key default gen_random_uuid(),
  public_reference text unique not null,
  name text not null,
  country text,
  verification_state verification_state not null default 'unverified',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table product_categories (
  id uuid primary key default gen_random_uuid(),
  public_reference text unique not null,
  name text not null,
  parent_id uuid references product_categories(id),
  safety_class safety_class not null default 'low',
  metadata jsonb not null default '{}'::jsonb
);

create table products (
  id uuid primary key default gen_random_uuid(),
  public_reference text unique not null,
  name text not null,
  category_id uuid references product_categories(id),
  brand_id uuid references brands(id),
  product_family text,
  description text,
  verification_state verification_state not null default 'unverified',
  safety_class safety_class not null default 'low',
  visibility visibility not null default 'public',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table product_models (
  id uuid primary key default gen_random_uuid(),
  public_reference text unique not null,
  product_id uuid references products(id),
  model_name text not null,
  model_number text,
  generation text,
  release_year integer,
  region text,
  specs jsonb not null default '{}'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table product_instances (
  id uuid primary key default gen_random_uuid(),
  public_reference text unique not null,
  product_model_id uuid references product_models(id),
  owner_identity_id uuid references identities(id),
  serial_number text,
  imei text,
  vin text,
  barcode text,
  qr_code text,
  condition_grade condition_grade,
  verification_state verification_state not null default 'self_declared',
  visibility visibility not null default 'private',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table product_identifiers (
  id uuid primary key default gen_random_uuid(),
  subject_type spare_subject_type not null,
  subject_id uuid not null,
  identifier_type text not null,
  identifier_value text not null,
  source text,
  confidence numeric(5,2) default 0,
  created_at timestamptz not null default now(),
  unique(identifier_type, identifier_value)
);

create table parts (
  id uuid primary key default gen_random_uuid(),
  public_reference text unique not null,
  name text not null,
  category_id uuid references product_categories(id),
  brand_id uuid references brands(id),
  part_function text,
  safety_class safety_class not null default 'low',
  verification_state verification_state not null default 'unverified',
  specs jsonb not null default '{}'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table part_numbers (
  id uuid primary key default gen_random_uuid(),
  part_id uuid not null references parts(id),
  number_type text not null,
  number_value text not null,
  issuer text,
  confidence numeric(5,2) default 0,
  unique(number_type, number_value)
);

create table compatibility_claims (
  id uuid primary key default gen_random_uuid(),
  public_reference text unique not null,
  source_product_model_id uuid references product_models(id),
  target_part_id uuid references parts(id),
  status compatibility_status not null default 'unknown',
  compatibility_type text,
  confidence numeric(5,2) not null default 0,
  matched_attributes jsonb not null default '[]'::jsonb,
  mismatched_attributes jsonb not null default '[]'::jsonb,
  unknown_attributes jsonb not null default '[]'::jsonb,
  required_adapters jsonb not null default '[]'::jsonb,
  required_modifications jsonb not null default '[]'::jsonb,
  safety_notes jsonb not null default '[]'::jsonb,
  installation_notes jsonb not null default '[]'::jsonb,
  evidence jsonb not null default '[]'::jsonb,
  verified_outcomes integer not null default 0,
  failed_outcomes integer not null default 0,
  review_required boolean not null default true,
  created_by uuid references identities(id),
  created_at timestamptz not null default now()
);

create table product_passports (
  id uuid primary key default gen_random_uuid(),
  public_reference text unique not null,
  product_instance_id uuid not null references product_instances(id),
  purchase_date date,
  purchase_price numeric(18,2),
  currency text default 'NGN',
  vendor_identity_id uuid references identities(id),
  warranty_until date,
  receipt_vault_id uuid,
  manual_vault_id uuid,
  estimated_current_value numeric(18,2),
  remaining_useful_life_months integer,
  status text not null default 'active',
  visibility visibility not null default 'private',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table vendors (
  id uuid primary key default gen_random_uuid(),
  public_reference text unique not null,
  organization_id uuid references organizations(id),
  display_name text not null,
  vendor_type text not null default 'merchant',
  trust_score numeric(5,2) not null default 0,
  verification_state verification_state not null default 'unverified',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table technicians (
  id uuid primary key default gen_random_uuid(),
  public_reference text unique not null,
  profile_id uuid references profiles(id),
  display_name text not null,
  specialties text[] not null default '{}',
  trust_score numeric(5,2) not null default 0,
  verification_state verification_state not null default 'unverified',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table listings (
  id uuid primary key default gen_random_uuid(),
  public_reference text unique not null,
  vendor_id uuid references vendors(id),
  part_id uuid references parts(id),
  product_instance_id uuid references product_instances(id),
  listing_type text not null default 'part',
  headline text not null,
  description text,
  condition_grade condition_grade not null,
  price numeric(18,2),
  currency text default 'NGN',
  quantity integer not null default 1,
  authenticity_confidence numeric(5,2) default 0,
  compatibility_confidence numeric(5,2) default 0,
  warranty_terms text,
  return_policy text,
  status text not null default 'draft',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table repair_requests (
  id uuid primary key default gen_random_uuid(),
  public_reference text unique not null,
  requester_identity_id uuid references identities(id),
  product_instance_id uuid references product_instances(id),
  product_model_id uuid references product_models(id),
  symptom text,
  error_code text,
  description text,
  safety_class safety_class not null default 'low',
  status text not null default 'opened',
  diagnosis jsonb not null default '{}'::jsonb,
  assigned_technician_id uuid references technicians(id),
  created_at timestamptz not null default now()
);

create table proof_records (
  id uuid primary key default gen_random_uuid(),
  public_reference text unique not null,
  subject_type spare_subject_type not null,
  subject_id uuid,
  claim text not null,
  evidence_type text not null,
  evidence_location text,
  status verification_state not null default 'evidence_submitted',
  confidence numeric(5,2) default 0,
  evidence_hash text,
  visibility visibility not null default 'private',
  seal_reference uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table pulse_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  actor_type text,
  actor_id uuid,
  subject_type spare_subject_type not null,
  subject_id uuid,
  proof_reference uuid references proof_records(id),
  payload jsonb not null default '{}'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now()
);

create table ai_sessions (
  id uuid primary key default gen_random_uuid(),
  public_reference text unique not null,
  agent_key text not null,
  actor_identity_id uuid references identities(id),
  purpose text not null,
  confidence numeric(5,2),
  evidence jsonb not null default '[]'::jsonb,
  output jsonb not null default '{}'::jsonb,
  escalated boolean not null default false,
  created_at timestamptz not null default now()
);

create table audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_identity_id uuid references identities(id),
  action text not null,
  subject_type spare_subject_type,
  subject_id uuid,
  risk_level text not null default 'unknown',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index products_category_idx on products(category_id);
create index product_models_model_idx on product_models(model_number);
create index part_numbers_value_idx on part_numbers(number_value);
create index compatibility_source_target_idx on compatibility_claims(source_product_model_id, target_part_id);
create index listings_status_idx on listings(status, listing_type, condition_grade);
