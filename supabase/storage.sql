-- Create a public bucket named 'images'
insert into storage.buckets (id, name, public)
values ('images', 'images', true)
on conflict (id) do nothing;

-- Policy to allow public access to view files
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'images' );

-- Policy to allow public upload
create policy "Public Upload"
  on storage.objects for insert
  with check ( bucket_id = 'images' );

-- Policy to allow public delete
create policy "Public Delete"
  on storage.objects for delete
  using ( bucket_id = 'images' );
