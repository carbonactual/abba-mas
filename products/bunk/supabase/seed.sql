-- BUNK demo seed data. Fictional records only.

insert into profiles(public_reference, display_name, email, phone, active_role) values
('BUNK-HAPI-000001','Aisha Bello','aisha.demo@bunk.example','+2348000000001','tenant'),
('BUNK-HAPI-000002','Musa Danladi','musa.demo@bunk.example','+2348000000002','landlord'),
('BUNK-HAPI-000003','Ngozi Okafor','ngozi.demo@bunk.example','+2348000000003','agent'),
('BUNK-HAPI-000004','Tunde Adeyemi','tunde.demo@bunk.example','+2348000000004','verification_officer'),
('BUNK-HAPI-000005','Fatima Sani','fatima.demo@bunk.example','+2348000000005','seal_approver')
on conflict(public_reference) do nothing;

insert into organizations(public_reference, name, organization_type, country, verification_state) values
('BUNK-ORG-000001','Fictional Prime Shelter Agency','agency','NG','submitted'),
('BUNK-ORG-000002','Fictional Northside Property Managers','property_manager','NG','partially_verified'),
('BUNK-ORG-000003','Fictional Student Homes Ltd','developer','NG','submitted')
on conflict(public_reference) do nothing;

insert into identities(public_reference, hash_reference, subject_type, subject_id, consent_state, authority_scope)
select 'BUNK-ID-000001','#bunk-human-aisha','human', id, 'active', '{"roles":["tenant"]}'::jsonb from profiles where public_reference='BUNK-HAPI-000001'
on conflict(public_reference) do nothing;

insert into identities(public_reference, hash_reference, subject_type, subject_id, consent_state, authority_scope)
select 'BUNK-ID-000002','#bunk-human-musa','human', id, 'active', '{"roles":["landlord"]}'::jsonb from profiles where public_reference='BUNK-HAPI-000002'
on conflict(public_reference) do nothing;

insert into identities(public_reference, hash_reference, subject_type, subject_id, consent_state, authority_scope)
select 'BUNK-ID-000003','#bunk-human-ngozi','human', id, 'active', '{"roles":["agent"]}'::jsonb from profiles where public_reference='BUNK-HAPI-000003'
on conflict(public_reference) do nothing;

insert into properties(public_reference, slug, name, property_type, description, country, state, city, district, neighborhood, address_line, bedrooms, bathrooms, furnishing, condition, amenities, verification_state, occupancy_state, risk_state, visibility)
values
('BUNK-PROP-000001','wuse-2-two-bedroom-demo','Verified 2-bedroom apartment','apartment','Fictional apartment record for controlled demo.', 'NG','FCT','Abuja','Wuse 2','Zone A','Demo address withheld',2,2,'semi-furnished','good','["water","security","parking"]','partially_verified','vacant','moderate','public'),
('BUNK-PROP-000002','samaru-student-hostel-demo','Student hostel cluster','hostel','Fictional student housing for Samaru pilot.', 'NG','Kaduna','Zaria','Samaru','ABU Area','Demo address withheld',1,1,'furnished','fair','["water","generator","study-area"]','submitted','vacant','unknown','public'),
('BUNK-PROP-000003','lekki-shortlet-demo','Serviced shortlet apartment','serviced_apartment','Fictional shortlet record for Lagos demo.', 'NG','Lagos','Lagos','Lekki Phase 1','Admiralty','Demo address withheld',1,1,'furnished','excellent','["wifi","power","cleaning"]','submitted','vacant','moderate','public')
on conflict(public_reference) do nothing;

insert into units(public_reference, property_id, unit_code, unit_type, floor, bedrooms, bathrooms, rent_amount, service_charge, occupancy_state, verification_state)
select 'BUNK-UNIT-000001', id, 'A2', 'flat', '2', 2, 2, 3800000, 250000, 'vacant', 'partially_verified' from properties where public_reference='BUNK-PROP-000001'
on conflict(public_reference) do nothing;

insert into listings(public_reference, property_id, unit_id, listing_type, headline, public_description, price, currency, billing_frequency, negotiable, service_charge, agency_fee, legal_fee, inspection_fee, total_estimated_move_in_cost, verification_state, status)
select 'BUNK-LIST-000001', p.id, u.id, 'rent', 'Verified 2-bedroom apartment near Wuse 2', 'Fictional controlled listing with partial verification.', 3800000, 'NGN', 'year', true, 250000, 380000, 100000, 10000, 4540000, 'partially_verified', 'awaiting_human_approval'
from properties p join units u on u.property_id=p.id where p.public_reference='BUNK-PROP-000001'
on conflict(public_reference) do nothing;

insert into wanted_requests(public_reference, requester_identity_id, preferred_locations, budget_min, budget_max, property_types, bedrooms, urgency, match_consent, structured_criteria)
select 'BUNK-WANTED-000001', id, '["Wuse 2","Maitama","Garki"]', 2500000, 4000000, '["apartment","flat"]', 2, 'this_month', true, '{"need":"2-bedroom apartment near work with clear fees"}'::jsonb
from identities where public_reference='BUNK-ID-000001'
on conflict(public_reference) do nothing;
