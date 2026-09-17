-- Additive premium usage schema. Existing tables are untouched.
create table if not exists public.premium_products (
  tool_id text primary key,
  tool_name text not null,
  single_use_price numeric,
  five_use_price numeric,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.premium_payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  tool_id text not null references public.premium_products(tool_id),
  package_name text not null check (package_name in ('single', 'five')),
  purchased_uses integer not null check (purchased_uses in (1, 5)),
  amount numeric,
  payment_provider text not null check (payment_provider in ('bkash', 'nagad')),
  provider_payment_id text,
  payment_status text not null default 'pending' check (payment_status in ('pending', 'paid', 'failed', 'cancelled', 'refunded')),
  created_at timestamptz not null default now(),
  verified_at timestamptz
);

create unique index if not exists premium_payments_provider_id_idx
  on public.premium_payments(payment_provider, provider_payment_id)
  where provider_payment_id is not null;

create table if not exists public.premium_entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  tool_id text not null references public.premium_products(tool_id),
  payment_id uuid not null references public.premium_payments(id),
  purchased_uses integer not null check (purchased_uses in (1, 5)),
  remaining_uses integer not null check (remaining_uses >= 0),
  payment_provider text not null check (payment_provider in ('bkash', 'nagad')),
  payment_status text not null check (payment_status = 'paid'),
  created_at timestamptz not null default now()
);

create unique index if not exists premium_entitlements_payment_idx on public.premium_entitlements(payment_id);

insert into public.premium_products (tool_id, tool_name)
values
  ('image-compressor', 'Premium Image Compressor'),
  ('pdf-compressor', 'Premium PDF Compressor'),
  ('background-remover', 'Premium Background Remover')
on conflict (tool_id) do nothing;

alter table public.premium_products enable row level security;
alter table public.premium_payments enable row level security;
alter table public.premium_entitlements enable row level security;

do $$
begin
  if not exists (select 1 from pg_policies where tablename = 'premium_products' and policyname = 'Anyone can read active premium products') then
    create policy "Anyone can read active premium products" on public.premium_products for select to anon, authenticated using (active = true);
  end if;
  if not exists (select 1 from pg_policies where tablename = 'premium_payments' and policyname = 'Users can create pending own payments') then
    create policy "Users can create pending own payments" on public.premium_payments for insert to authenticated with check (auth.uid() = user_id and payment_status = 'pending');
  end if;
  if not exists (select 1 from pg_policies where tablename = 'premium_payments' and policyname = 'Users can view own payments') then
    create policy "Users can view own payments" on public.premium_payments for select to authenticated using (auth.uid() = user_id);
  end if;
  if not exists (select 1 from pg_policies where tablename = 'premium_entitlements' and policyname = 'Users can view own entitlements') then
    create policy "Users can view own entitlements" on public.premium_entitlements for select to authenticated using (auth.uid() = user_id);
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_policies where tablename = 'premium_payments' and policyname = 'Admin can inspect premium payments') then
    create policy "Admin can inspect premium payments" on public.premium_payments for select to authenticated using (lower(coalesce(auth.email(), '')) = 'neway995@gmail.com');
  end if;
  if not exists (select 1 from pg_policies where tablename = 'premium_entitlements' and policyname = 'Admin can inspect premium entitlements') then
    create policy "Admin can inspect premium entitlements" on public.premium_entitlements for select to authenticated using (lower(coalesce(auth.email(), '')) = 'neway995@gmail.com');
  end if;
end $$;

create or replace function public.consume_premium_usage(requested_tool_id text)
returns table(remaining_uses integer)
language plpgsql
security invoker
set search_path = public
as $$
begin
  update public.premium_entitlements
  set remaining_uses = remaining_uses - 1
  where id = (
    select entitlement.id
    from public.premium_entitlements entitlement
    where entitlement.user_id = auth.uid()
      and entitlement.tool_id = requested_tool_id
      and entitlement.payment_status = 'paid'
      and entitlement.remaining_uses > 0
    order by entitlement.created_at
    for update skip locked
    limit 1
  )
  returning premium_entitlements.remaining_uses into remaining_uses;

  if remaining_uses is null then
    raise exception 'No verified premium usage remains for this tool';
  end if;

  return next;
end;
$$;

grant execute on function public.consume_premium_usage(text) to authenticated;

-- Only a trusted server-side webhook using the service role should call this function.
create or replace function public.grant_verified_premium_payment(payment_uuid uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare payment_row public.premium_payments%rowtype;
begin
  select * into payment_row from public.premium_payments where id = payment_uuid for update;
  if payment_row.id is null or payment_row.payment_status <> 'paid' then
    raise exception 'Payment is not verified as paid';
  end if;

  insert into public.premium_entitlements (user_id, tool_id, payment_id, purchased_uses, remaining_uses, payment_provider, payment_status)
  values (payment_row.user_id, payment_row.tool_id, payment_row.id, payment_row.purchased_uses, payment_row.purchased_uses, payment_row.payment_provider, 'paid')
  on conflict (payment_id) do nothing;
end;
$$;

revoke all on function public.grant_verified_premium_payment(uuid) from public, anon, authenticated;
grant execute on function public.grant_verified_premium_payment(uuid) to service_role;
