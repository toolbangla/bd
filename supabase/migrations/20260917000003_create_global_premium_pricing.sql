-- Global pricing for every premium tool. Existing tables remain untouched.
create table if not exists public.premium_pricing (
  id integer primary key default 1 check (id = 1),
  single_use_price numeric,
  five_use_price numeric,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id)
);

insert into public.premium_pricing (id)
values (1)
on conflict (id) do nothing;

-- The legacy columns are not used by the application; all new payments read this global row.
alter table if exists public.premium_products drop column if exists single_use_price;
alter table if exists public.premium_products drop column if exists five_use_price;

alter table public.premium_pricing enable row level security;

do $$
begin
  if not exists (select 1 from pg_policies where tablename = 'premium_pricing' and policyname = 'Authenticated users can read global premium pricing') then
    create policy "Authenticated users can read global premium pricing"
      on public.premium_pricing for select to authenticated using (true);
  end if;
  if not exists (select 1 from pg_policies where tablename = 'premium_pricing' and policyname = 'Admin can update global premium pricing') then
    create policy "Admin can update global premium pricing"
      on public.premium_pricing for update to authenticated
      using (lower(coalesce(auth.email(), '')) = 'neway995@gmail.com')
      with check (lower(coalesce(auth.email(), '')) = 'neway995@gmail.com');
  end if;
end $$;
