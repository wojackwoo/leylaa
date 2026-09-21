create extension if not exists "pgcrypto";

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  movie_title text not null,
  movie_year integer not null,
  event_date date not null,
  start_time time not null,
  venue text not null,
  city text not null,
  capacity integer not null default 210,
  first_price integer not null default 80,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  full_name text not null,
  phone text not null,
  status text not null default 'pending'
    check (status in ('pending', 'contacted', 'confirmed', 'cancelled')),
  created_at timestamptz not null default now()
);

create index if not exists reservations_event_status_idx
  on public.reservations(event_id, status);

create unique index if not exists reservations_active_phone_key
  on public.reservations(event_id, phone)
  where status <> 'cancelled';

alter table public.events enable row level security;
alter table public.reservations enable row level security;

insert into public.events (
  slug,
  title,
  movie_title,
  movie_year,
  event_date,
  start_time,
  venue,
  city,
  capacity,
  first_price,
  is_active
)
values (
  'tuner',
  'LEYLAA Movie Night',
  'Tuner',
  2025,
  '2026-10-02',
  '17:30',
  'City Club Park',
  'Oujda',
  210,
  80,
  true
)
on conflict (slug) do update
set
  title = excluded.title,
  movie_title = excluded.movie_title,
  movie_year = excluded.movie_year,
  event_date = excluded.event_date,
  start_time = excluded.start_time,
  venue = excluded.venue,
  city = excluded.city,
  capacity = excluded.capacity,
  first_price = excluded.first_price,
  is_active = excluded.is_active;

create or replace function public.reserve_event_spot(
  p_event_slug text,
  p_full_name text,
  p_phone text
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_event public.events;
  v_reservation_id uuid;
  v_reserved_count integer;
begin
  select *
    into v_event
    from public.events
   where slug = p_event_slug
     and is_active = true
   for update;

  if not found then
    raise exception using message = 'EVENT_NOT_FOUND';
  end if;

  select id
    into v_reservation_id
    from public.reservations
   where event_id = v_event.id
     and phone = p_phone
     and status <> 'cancelled'
   limit 1;

  if v_reservation_id is not null then
    raise exception using message = 'ALREADY_RESERVED';
  end if;

  select count(*)
    into v_reserved_count
    from public.reservations
   where event_id = v_event.id
     and status <> 'cancelled';

  if v_reserved_count >= v_event.capacity then
    raise exception using message = 'EVENT_FULL';
  end if;

  insert into public.reservations (
    event_id,
    full_name,
    phone,
    status
  )
  values (
    v_event.id,
    trim(p_full_name),
    p_phone,
    'pending'
  )
  returning id into v_reservation_id;

  return v_reservation_id;
end;
$$;

revoke all on function public.reserve_event_spot(text, text, text) from public;
grant execute on function public.reserve_event_spot(text, text, text) to anon, authenticated;
