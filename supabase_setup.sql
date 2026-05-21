-- Classic Fade Bookings Table
create table if not exists bookings (
  id bigint generated always as identity primary key,
  style_name text not null,
  style_img text,
  status text not null default 'pending',
  created_at timestamptz default now()
);

-- Allow anyone to insert (customers booking)
alter table bookings enable row level security;

create policy "Anyone can insert bookings"
  on bookings for insert
  with check (true);

create policy "Anyone can read bookings"
  on bookings for select
  using (true);

create policy "Anyone can update bookings"
  on bookings for update
  using (true);

-- Enable realtime
alter publication supabase_realtime add table bookings;
