-- Preserve existing contact_messages and site_settings tables.
create table if not exists public.tool_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  tool_name text not null,
  input text not null default '',
  output text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists tool_history_user_created_at_idx
  on public.tool_history (user_id, created_at desc);

alter table public.tool_history enable row level security;

create policy "Users can view their own tool history"
on public.tool_history for select to authenticated
using (auth.uid() = user_id);

create policy "Users can create their own tool history"
on public.tool_history for insert to authenticated
with check (auth.uid() = user_id);

create policy "Users can delete their own tool history"
on public.tool_history for delete to authenticated
using (auth.uid() = user_id);
