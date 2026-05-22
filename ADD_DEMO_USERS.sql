-- Demo user seed for Blessing School
-- Run this in the Supabase SQL Editor after the auth users already exist.
-- If the auth users do not exist yet, create them first via Authentication > Users.

-- Enable UUID generation if needed
create extension if not exists pgcrypto;

-- Create demo tables if they do not already exist
create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  role text not null,
  created_at timestamptz not null default now(),
  constraint fk_user_roles_user foreign key(user_id) references auth.users(id) on delete cascade,
  constraint user_roles_user_id_unique unique (user_id)
);
create unique index if not exists idx_user_roles_user_id on public.user_roles(user_id);

create table if not exists public.profiles (
  id uuid primary key,
  full_name text,
  avatar_url text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint fk_profiles_user foreign key(id) references auth.users(id) on delete cascade
);

-- Assign or update roles for existing auth users
insert into public.user_roles (user_id, role, created_at)
select id, 'admin', now() from auth.users where email = 'admin@blessingschool.com'
union all
select id, 'teacher', now() from auth.users where email = 'teacher@blessingschool.com'
union all
select id, 'finance', now() from auth.users where email = 'finance@blessingschool.com'
union all
select id, 'library', now() from auth.users where email = 'library@blessingschool.com'
union all
select id, 'stock', now() from auth.users where email = 'stock@blessingschool.com'
on conflict (user_id) do update set role = excluded.role, created_at = excluded.created_at;

-- Create or update matching profile rows for those users
insert into public.profiles (id, full_name, updated_at)
select id, 'School Admin', now() from auth.users where email = 'admin@blessingschool.com'
union all
select id, 'Demo Teacher', now() from auth.users where email = 'teacher@blessingschool.com'
union all
select id, 'Finance Manager', now() from auth.users where email = 'finance@blessingschool.com'
union all
select id, 'Library Manager', now() from auth.users where email = 'library@blessingschool.com'
union all
select id, 'Stock Manager', now() from auth.users where email = 'stock@blessingschool.com'
on conflict (id) do update set full_name = excluded.full_name, updated_at = excluded.updated_at;
