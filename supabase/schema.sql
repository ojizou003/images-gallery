-- Enable pg_trgm extension for fuzzy search
create extension if not exists pg_trgm;

-- Create images table
create table public.images (
  id uuid not null default gen_random_uuid(),
  style text not null default '',
  caption text not null default '',
  image_url text not null,
  created_at timestamp with time zone not null default now(),
  constraint images_pkey primary key (id)
);

-- Enable Row Level Security (RLS)
alter table public.images enable row level security;

-- Create policies (MVP: Public access)
-- Allow public read access
create policy "Public images are viewable by everyone"
  on public.images for select
  using (true);

-- Allow public insert access
create policy "Anyone can upload an image"
  on public.images for insert
  with check (true);

-- Allow public delete access (MVP requirement)
create policy "Anyone can delete an image"
  on public.images for delete
  using (true);

-- Create indexes for search
create index images_style_trgm_idx on public.images using gin (style gin_trgm_ops);
create index images_caption_trgm_idx on public.images using gin (caption gin_trgm_ops);
create index images_created_at_idx on public.images (created_at desc);
