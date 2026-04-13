create table if not exists public.waitlist (
  id bigint generated always as identity primary key,
  email text not null unique,
  segment text not null check (segment in ('solo', 'family', 'caregiver')),
  created_at timestamptz not null default now()
);

alter table public.waitlist enable row level security;

-- Server-side inserts use the service role key, so no public insert policy is required.
