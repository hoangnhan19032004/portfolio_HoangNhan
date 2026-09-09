create table if not exists public.visitor_questions (
  id uuid primary key default gen_random_uuid(),
  visitor_token uuid not null unique default gen_random_uuid(),
  visitor_name text not null default 'Khách truy cập',
  visitor_email text not null,
  question text not null,
  answer text,
  status text not null default 'pending' check (status in ('pending', 'answered')),
  created_at timestamptz not null default now(),
  answered_at timestamptz
);

alter table public.visitor_questions enable row level security;

alter table public.visitor_questions
  add column if not exists visitor_token uuid default gen_random_uuid();

update public.visitor_questions
set visitor_token = gen_random_uuid()
where visitor_token is null;

alter table public.visitor_questions
  alter column visitor_token set not null;

create unique index if not exists visitor_questions_visitor_token_idx
  on public.visitor_questions(visitor_token);
