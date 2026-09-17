-- Additive security migration. Existing tables are preserved.
-- Run this in Supabase SQL Editor or through the Supabase migration workflow.

alter table if exists public.tool_history add column if not exists tool_id text;

alter table if exists public.contact_messages enable row level security;
alter table if exists public.site_settings enable row level security;

-- Visitors may submit messages, but only the designated admin may read or change them.
do $$
begin
  if to_regclass('public.contact_messages') is not null then
    if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'contact_messages' and policyname = 'Public can submit contact messages') then
      create policy "Public can submit contact messages"
        on public.contact_messages for insert
        to anon, authenticated
        with check (true);
    end if;
    if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'contact_messages' and policyname = 'Admin can read contact messages') then
      create policy "Admin can read contact messages"
        on public.contact_messages for select
        to authenticated
        using (lower(coalesce(auth.email(), '')) = 'neway995@gmail.com');
    end if;
    if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'contact_messages' and policyname = 'Admin can update contact messages') then
      create policy "Admin can update contact messages"
        on public.contact_messages for update
        to authenticated
        using (lower(coalesce(auth.email(), '')) = 'neway995@gmail.com')
        with check (lower(coalesce(auth.email(), '')) = 'neway995@gmail.com');
    end if;
    if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'contact_messages' and policyname = 'Admin can delete contact messages') then
      create policy "Admin can delete contact messages"
        on public.contact_messages for delete
        to authenticated
        using (lower(coalesce(auth.email(), '')) = 'neway995@gmail.com');
    end if;
  end if;
end $$;

-- Public pages can read the configured logo. Only the designated admin can update it.
do $$
begin
  if to_regclass('public.site_settings') is not null then
    if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'site_settings' and policyname = 'Public can read site settings') then
      create policy "Public can read site settings"
        on public.site_settings for select
        to anon, authenticated
        using (true);
    end if;
    if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'site_settings' and policyname = 'Admin can update site settings') then
      create policy "Admin can update site settings"
        on public.site_settings for update
        to authenticated
        using (lower(coalesce(auth.email(), '')) = 'neway995@gmail.com')
        with check (lower(coalesce(auth.email(), '')) = 'neway995@gmail.com');
    end if;
  end if;
end $$;

-- Storage buckets are added only when absent; existing buckets are reused.
insert into storage.buckets (id, name, public)
values ('qr-media', 'qr-media', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('site-assets', 'site-assets', true)
on conflict (id) do nothing;

alter table storage.objects enable row level security;

-- QR media is public by design because QR codes contain public URLs.
do $$
begin
  if not exists (select 1 from pg_policies where schemaname = 'storage' and tablename = 'objects' and policyname = 'Anyone can upload QR media') then
    create policy "Anyone can upload QR media"
      on storage.objects for insert
      to anon, authenticated
      with check (bucket_id = 'qr-media');
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'storage' and tablename = 'objects' and policyname = 'Anyone can read QR media') then
    create policy "Anyone can read QR media"
      on storage.objects for select
      to anon, authenticated
      using (bucket_id = 'qr-media');
  end if;
end $$;

-- Logo assets may be read publicly, but only the designated admin can manage them.
do $$
begin
  if not exists (select 1 from pg_policies where schemaname = 'storage' and tablename = 'objects' and policyname = 'Anyone can read site assets') then
    create policy "Anyone can read site assets"
      on storage.objects for select
      to anon, authenticated
      using (bucket_id = 'site-assets');
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'storage' and tablename = 'objects' and policyname = 'Admin can upload site assets') then
    create policy "Admin can upload site assets"
      on storage.objects for insert
      to authenticated
      with check (bucket_id = 'site-assets' and lower(coalesce(auth.email(), '')) = 'neway995@gmail.com');
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'storage' and tablename = 'objects' and policyname = 'Admin can update site assets') then
    create policy "Admin can update site assets"
      on storage.objects for update
      to authenticated
      using (bucket_id = 'site-assets' and lower(coalesce(auth.email(), '')) = 'neway995@gmail.com')
      with check (bucket_id = 'site-assets' and lower(coalesce(auth.email(), '')) = 'neway995@gmail.com');
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'storage' and tablename = 'objects' and policyname = 'Admin can delete site assets') then
    create policy "Admin can delete site assets"
      on storage.objects for delete
      to authenticated
      using (bucket_id = 'site-assets' and lower(coalesce(auth.email(), '')) = 'neway995@gmail.com');
  end if;
end $$;
