-- Legacy schema: the app now uses data/visitor-questions.json for local storage.
-- Keep this file only if you later migrate the inbox to Supabase.
create table if not exists public.visitor_questions (
  id uuid primary key default gen_random_uuid(),
  visitor_name text not null default 'Khách truy cập',
  visitor_email text not null,
  question text not null,
  answer text,
  status text not null default 'pending' check (status in ('pending', 'answered')),
  created_at timestamptz not null default now(),
  answered_at timestamptz
);

alter table public.visitor_questions enable row level security;
