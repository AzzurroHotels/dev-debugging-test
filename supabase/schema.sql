-- Run this in your Supabase SQL Editor
-- Dashboard → SQL Editor → New Query → paste & run

create table assessments (
  id uuid default gen_random_uuid() primary key,
  candidate_name text not null,
  candidate_email text not null,
  total_score integer not null,
  grade text not null,
  flagged_questions integer[] default '{}',
  answers jsonb,
  grading jsonb,
  submitted_at timestamptz default now()
);

-- Optional: lock down access so only your Edge Function can insert
alter table assessments enable row level security;

create policy "Service role only"
  on assessments
  for all
  using (auth.role() = 'service_role');
