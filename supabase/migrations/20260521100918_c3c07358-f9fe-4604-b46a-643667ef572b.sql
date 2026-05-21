
-- Roles enum
create type public.app_role as enum (
  'admin','teacher','staff','employee','finance','stock','library','parent','student'
);

-- Profiles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

create policy "profiles_select_authenticated"
on public.profiles for select to authenticated using (true);

create policy "profiles_update_own"
on public.profiles for update to authenticated
using (auth.uid() = id) with check (auth.uid() = id);

create policy "profiles_insert_own"
on public.profiles for insert to authenticated
with check (auth.uid() = id);

-- user_roles
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  );
$$;

create policy "user_roles_select_authenticated"
on public.user_roles for select to authenticated using (true);

create policy "user_roles_admin_insert"
on public.user_roles for insert to authenticated
with check (public.has_role(auth.uid(), 'admin'));

create policy "user_roles_admin_delete"
on public.user_roles for delete to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- updated_at trigger
create or replace function public.tg_set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.tg_set_updated_at();

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.email));
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- Seed demo accounts
do $$
declare
  admin_id uuid := gen_random_uuid();
  teacher_id uuid := gen_random_uuid();
begin
  if not exists (select 1 from auth.users where email = 'admin@blessingschool.com') then
    insert into auth.users (
      instance_id, id, aud, role, email, encrypted_password,
      email_confirmed_at, created_at, updated_at,
      raw_app_meta_data, raw_user_meta_data,
      is_super_admin, confirmation_token, email_change, email_change_token_new, recovery_token
    ) values (
      '00000000-0000-0000-0000-000000000000', admin_id, 'authenticated', 'authenticated',
      'admin@blessingschool.com', crypt('Admin@12345', gen_salt('bf')),
      now(), now(), now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{"full_name":"School Admin"}'::jsonb,
      false, '', '', '', ''
    );
    insert into auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at)
    values (gen_random_uuid(), admin_id,
      jsonb_build_object('sub', admin_id::text, 'email', 'admin@blessingschool.com', 'email_verified', true),
      'email', admin_id::text, now(), now(), now());
    insert into public.user_roles (user_id, role) values (admin_id, 'admin');
  end if;

  if not exists (select 1 from auth.users where email = 'teacher@blessingschool.com') then
    insert into auth.users (
      instance_id, id, aud, role, email, encrypted_password,
      email_confirmed_at, created_at, updated_at,
      raw_app_meta_data, raw_user_meta_data,
      is_super_admin, confirmation_token, email_change, email_change_token_new, recovery_token
    ) values (
      '00000000-0000-0000-0000-000000000000', teacher_id, 'authenticated', 'authenticated',
      'teacher@blessingschool.com', crypt('Teacher@12345', gen_salt('bf')),
      now(), now(), now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{"full_name":"Demo Teacher"}'::jsonb,
      false, '', '', '', ''
    );
    insert into auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at)
    values (gen_random_uuid(), teacher_id,
      jsonb_build_object('sub', teacher_id::text, 'email', 'teacher@blessingschool.com', 'email_verified', true),
      'email', teacher_id::text, now(), now(), now());
    insert into public.user_roles (user_id, role) values (teacher_id, 'teacher');
  end if;
end $$;
