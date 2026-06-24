create or replace function public.current_subject_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select s.id
  from public.subjects s
  where s.metadata->>'auth_user_id' = auth.uid()::text
  limit 1
$$;

create or replace function public.is_platform_operator()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.capabilities c
    where c.subject_id = public.current_subject_id()
      and c.capability_key in ('platform-admin','market-operator','verifier')
      and c.status = 'active'
  )
$$;

create or replace function public.has_subject_authority(target_subject uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select target_subject = public.current_subject_id()
  or exists (
    select 1
    from public.relationships r
    where r.source_subject_id = public.current_subject_id()
      and r.target_subject_id = target_subject
      and r.status = 'active'
      and r.relationship_type in ('owner','manager','authorized-agent','mandated-professional')
  )
  or public.is_platform_operator()
$$;

create policy market_items_public_read
on public.market_items for select
using (
  (status in ('verified','available','reserved') and proof_state <> 'restricted')
  or public.has_subject_authority(subject_id)
);

create policy market_items_owner_insert
on public.market_items for insert
with check (
  owner_subject_id = public.current_subject_id()
  or public.has_subject_authority(subject_id)
);

create policy market_items_owner_update
on public.market_items for update
using (
  owner_subject_id = public.current_subject_id()
  or public.has_subject_authority(subject_id)
)
with check (
  owner_subject_id = public.current_subject_id()
  or public.has_subject_authority(subject_id)
);

create policy saved_demands_private
on public.saved_demands for all
using (subject_id = public.current_subject_id() or public.is_platform_operator())
with check (subject_id = public.current_subject_id() or public.is_platform_operator());

create policy offers_participant_read
on public.offers for select
using (
  actor_subject_id = public.current_subject_id()
  or exists (
    select 1 from public.market_items mi
    where mi.id = offers.market_item_id
      and (mi.owner_subject_id = public.current_subject_id() or public.has_subject_authority(mi.subject_id))
  )
);

create policy offers_actor_insert
on public.offers for insert
with check (actor_subject_id = public.current_subject_id());

create policy offers_participant_update
on public.offers for update
using (
  actor_subject_id = public.current_subject_id()
  or exists (
    select 1 from public.market_items mi
    where mi.id = offers.market_item_id
      and (mi.owner_subject_id = public.current_subject_id() or public.has_subject_authority(mi.subject_id))
  )
);

create policy portfolio_items_private
on public.portfolio_items for all
using (portfolio_subject_id = public.current_subject_id() or public.is_platform_operator())
with check (portfolio_subject_id = public.current_subject_id() or public.is_platform_operator());

create policy bunk_properties_public_or_authorized
on public.bunk_properties for select
using (
  exists (
    select 1 from public.market_items mi
    where mi.subject_id = bunk_properties.subject_id
      and mi.product_branch = 'bunk'
      and mi.status in ('verified','available','reserved')
  )
  or public.has_subject_authority(subject_id)
);

create policy bunk_properties_authorized_write
on public.bunk_properties for all
using (public.has_subject_authority(subject_id))
with check (public.has_subject_authority(subject_id));

create policy bunk_evidence_authorized
on public.bunk_property_evidence for all
using (
  public.has_subject_authority(property_subject_id)
  or submitted_by = public.current_subject_id()
)
with check (
  public.has_subject_authority(property_subject_id)
  or submitted_by = public.current_subject_id()
);

create policy spare_products_public_or_authorized
on public.spare_products for select
using (
  exists (
    select 1 from public.market_items mi
    where mi.subject_id = spare_products.subject_id
      and mi.product_branch = 'spare'
      and mi.status in ('verified','available','reserved')
  )
  or public.has_subject_authority(subject_id)
);

create policy spare_products_authorized_write
on public.spare_products for all
using (public.has_subject_authority(subject_id))
with check (public.has_subject_authority(subject_id));

create policy spare_components_public_read
on public.spare_components for select
using (true);

create policy spare_components_operator_write
on public.spare_components for all
using (public.is_platform_operator() or public.has_subject_authority(subject_id))
with check (public.is_platform_operator() or public.has_subject_authority(subject_id));

create policy spare_compatibility_public_read
on public.spare_compatibility for select
using (verification_state in ('verified','proven') or public.is_platform_operator());

create policy spare_compatibility_operator_write
on public.spare_compatibility for all
using (public.is_platform_operator())
with check (public.is_platform_operator());

create policy spare_service_events_private
on public.spare_service_events for all
using (
  public.has_subject_authority(product_subject_id)
  or provider_subject_id = public.current_subject_id()
)
with check (
  public.has_subject_authority(product_subject_id)
  or provider_subject_id = public.current_subject_id()
);
