create extension if not exists "pgcrypto";

create table if not exists public.restaurants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  phone text,
  address text,
  email text,
  menu_url text not null,
  google_maps_url text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.restaurant_admins (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'owner' check (role in ('owner', 'staff')),
  created_at timestamptz not null default now(),
  unique (restaurant_id, user_id)
);

create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  status text not null default 'pending'
    check (status in ('pending', 'accepted', 'rejected', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  cancellation_token text not null unique default encode(gen_random_bytes(32), 'hex'),
  date date not null,
  time time without time zone not null,
  guests integer not null check (guests between 1 and 40),
  name text not null,
  phone text not null,
  email text,
  notes text,
  allergies text,
  high_chair boolean not null default false,
  seating_preference text not null default 'no_preference'
    check (seating_preference in ('terrace', 'inside', 'no_preference')),
  internal_notes text,
  is_group_request boolean not null default false,
  group_details text,
  privacy_accepted_at timestamptz not null default now(),
  reminder_sent boolean not null default false
);

alter table public.reservations
  add column if not exists reminder_sent boolean not null default false;

create table if not exists public.blocked_slots (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  date date not null,
  start_time time without time zone,
  end_time time without time zone,
  reason text,
  block_type text not null check (block_type in ('slot', 'shift', 'day')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint blocked_slots_window_check check (
    (block_type = 'day' and start_time is null and end_time is null)
    or
    (block_type in ('slot', 'shift') and start_time is not null and end_time is not null and start_time < end_time)
  )
);

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid references public.restaurants(id) on delete set null,
  event_name text not null check (
    event_name in (
      'web_visit',
      'reservation_button_click',
      'menu_button_click',
      'directions_button_click',
      'reservation_started',
      'reservation_completed',
      'reservation_accepted',
      'reservation_rejected',
      'reservation_cancelled'
    )
  ),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.is_restaurant_admin(target_restaurant_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.restaurant_admins admin
    where admin.restaurant_id = target_restaurant_id
      and admin.user_id = auth.uid()
  );
$$;

drop trigger if exists set_restaurants_updated_at on public.restaurants;
create trigger set_restaurants_updated_at
before update on public.restaurants
for each row execute function public.set_updated_at();

drop trigger if exists set_reservations_updated_at on public.reservations;
create trigger set_reservations_updated_at
before update on public.reservations
for each row execute function public.set_updated_at();

drop trigger if exists set_blocked_slots_updated_at on public.blocked_slots;
create trigger set_blocked_slots_updated_at
before update on public.blocked_slots
for each row execute function public.set_updated_at();

create index if not exists restaurants_slug_idx
  on public.restaurants(slug);

create index if not exists reservations_restaurant_date_idx
  on public.reservations(restaurant_id, date);

create index if not exists reservations_restaurant_status_idx
  on public.reservations(restaurant_id, status);

create unique index if not exists reservations_unique_active_phone_slot_idx
  on public.reservations(restaurant_id, date, time, phone)
  where status in ('pending', 'accepted');

create index if not exists reservations_cancellation_token_idx
  on public.reservations(cancellation_token);

create index if not exists blocked_slots_restaurant_date_idx
  on public.blocked_slots(restaurant_id, date);

create unique index if not exists blocked_slots_unique_window_idx
  on public.blocked_slots(
    restaurant_id,
    date,
    coalesce(start_time, time '00:00'),
    coalesce(end_time, time '23:59'),
    block_type
  );

create index if not exists analytics_events_restaurant_created_idx
  on public.analytics_events(restaurant_id, created_at desc);

alter table public.restaurants enable row level security;
alter table public.restaurant_admins enable row level security;
alter table public.reservations enable row level security;
alter table public.blocked_slots enable row level security;
alter table public.analytics_events enable row level security;

drop policy if exists "Public can read restaurants" on public.restaurants;
create policy "Public can read restaurants"
on public.restaurants
for select
to anon, authenticated
using (true);

drop policy if exists "Admins can update their restaurants" on public.restaurants;
create policy "Admins can update their restaurants"
on public.restaurants
for update
to authenticated
using (public.is_restaurant_admin(id))
with check (public.is_restaurant_admin(id));

drop policy if exists "Admins can read their memberships" on public.restaurant_admins;
create policy "Admins can read their memberships"
on public.restaurant_admins
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "Admins can read reservations" on public.reservations;
create policy "Admins can read reservations"
on public.reservations
for select
to authenticated
using (public.is_restaurant_admin(restaurant_id));

drop policy if exists "Admins can update reservations" on public.reservations;
create policy "Admins can update reservations"
on public.reservations
for update
to authenticated
using (public.is_restaurant_admin(restaurant_id))
with check (public.is_restaurant_admin(restaurant_id));

drop policy if exists "Admins can manage blocked slots" on public.blocked_slots;
create policy "Admins can manage blocked slots"
on public.blocked_slots
for all
to authenticated
using (public.is_restaurant_admin(restaurant_id))
with check (public.is_restaurant_admin(restaurant_id));

drop policy if exists "Public can insert analytics events" on public.analytics_events;
create policy "Public can insert analytics events"
on public.analytics_events
for insert
to anon, authenticated
with check (true);

drop policy if exists "Admins can read analytics events" on public.analytics_events;
create policy "Admins can read analytics events"
on public.analytics_events
for select
to authenticated
using (
  restaurant_id is null
  or public.is_restaurant_admin(restaurant_id)
);

grant usage on schema public to anon, authenticated;
grant select on public.restaurants to anon, authenticated;
grant select on public.restaurant_admins to authenticated;
grant select, update on public.reservations to authenticated;
grant select, insert, update, delete on public.blocked_slots to authenticated;
grant insert on public.analytics_events to anon, authenticated;
grant select on public.analytics_events to authenticated;

insert into public.restaurants (
  name,
  slug,
  description,
  menu_url,
  google_maps_url
)
values (
  'Restaurante Rincón del Puerto',
  'rincon-del-puerto',
  'Cocina mediterránea y tradicional junto al puerto.',
  'https://www.flipsnack.com/restauranterincondelpuerto/carta-ingles.html',
  'https://share.google/G6rthQkXG7LqNFKGU'
)
on conflict (slug) do update
set
  name = excluded.name,
  description = excluded.description,
  menu_url = excluded.menu_url,
  google_maps_url = excluded.google_maps_url,
  updated_at = now();

-- After creating the admin user in Supabase Auth, link it to the restaurant:
-- insert into public.restaurant_admins (restaurant_id, user_id, role)
-- select id, 'AUTH_USER_UUID_HERE', 'owner'
-- from public.restaurants
-- where slug = 'rincon-del-puerto';
