-- ============================================
-- CLASSIC FADE — Phase 1 Database Setup
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. BARBERS TABLE
create table if not exists barbers (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  photo_url text,
  experience_years int default 1,
  specialties text[] default '{}',
  rating numeric(3,2) default 5.0,
  total_cuts int default 0,
  is_available boolean default true,
  bio text,
  created_at timestamptz default now()
);

-- 2. SERVICES TABLE
create table if not exists services (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  category text not null, -- fade, haircut, beard, shave
  price int not null, -- in PKR
  duration_mins int default 30,
  img_url text,
  description text,
  is_active boolean default true
);

-- 3. BOOKINGS TABLE (replace old one)
drop table if exists bookings cascade;
create table bookings (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete set null,
  user_name text,
  user_phone text,
  barber_id uuid references barbers(id) on delete set null,
  service_id uuid references services(id) on delete set null,
  service_name text,
  barber_name text,
  slot_date date not null,
  slot_time text not null,
  notes text,
  status text default 'pending', -- pending, confirmed, rejected, completed
  style_img text,
  created_at timestamptz default now()
);

-- 4. TIME SLOTS TABLE
create table if not exists time_slots (
  id uuid default gen_random_uuid() primary key,
  barber_id uuid references barbers(id) on delete cascade,
  slot_date date not null,
  slot_time text not null, -- e.g. "10:00 AM"
  is_booked boolean default false,
  booking_id uuid references bookings(id) on delete set null
);

-- ============================================
-- RLS POLICIES
-- ============================================

-- Barbers: public read
alter table barbers enable row level security;
create policy "Public read barbers" on barbers for select using (true);
create policy "Admin manage barbers" on barbers for all using (true);

-- Services: public read
alter table services enable row level security;
create policy "Public read services" on services for select using (true);
create policy "Admin manage services" on services for all using (true);

-- Bookings: users see own, admin sees all
alter table bookings enable row level security;
create policy "Anyone can insert booking" on bookings for insert with check (true);
create policy "Anyone can read bookings" on bookings for select using (true);
create policy "Anyone can update bookings" on bookings for update using (true);

-- Time slots: public read
alter table time_slots enable row level security;
create policy "Public read slots" on time_slots for select using (true);
create policy "Anyone update slots" on time_slots for update using (true);
create policy "Anyone insert slots" on time_slots for insert with check (true);

-- ============================================
-- REALTIME
-- ============================================
alter publication supabase_realtime add table bookings;
alter publication supabase_realtime add table time_slots;

-- ============================================
-- SEED DATA — Barbers
-- ============================================
insert into barbers (name, experience_years, specialties, rating, total_cuts, bio, photo_url) values
(
  'Usman Malik',
  6,
  array['Skin Fade', 'Drop Fade', 'Beard Khat'],
  4.9,
  1240,
  'Classic Fade ka head barber. Skin fade aur beard khat mein expert.',
  'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=300&h=300&fit=crop&q=80'
),
(
  'Hassan Raza',
  4,
  array['Pompadour', 'Textured Crop', 'Hot Shave'],
  4.7,
  890,
  'Modern cuts aur hot towel shave ka specialist.',
  'https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=300&h=300&fit=crop&q=80'
),
(
  'Ali Khan',
  3,
  array['Full Beard', 'Beard Sculpting', 'Fade'],
  4.6,
  560,
  'Beard styling aur sculpting mein mahir.',
  'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=300&h=300&fit=crop&q=80'
);

-- ============================================
-- SEED DATA — Services
-- ============================================
insert into services (name, category, price, duration_mins, description, img_url) values
('Premium Skin Fade', 'fade', 500, 45, 'Clean skin fade with sharp lines', 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&fit=crop&q=80'),
('Low Drop Fade', 'fade', 450, 40, 'Low drop fade with modern finish', 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&fit=crop&q=80'),
('Modern Pompadour', 'haircut', 600, 50, 'Classic pompadour with volume', 'https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?w=400&fit=crop&q=80'),
('Textured Crop', 'haircut', 400, 35, 'Short textured crop with fade', 'https://images.unsplash.com/photo-1534297635766-a262cdcb8ee4?w=400&fit=crop&q=80'),
('Executive Beard Trim (Khat)', 'beard', 350, 30, 'Sharp beard khat with clean lines', 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&fit=crop&q=80'),
('Full Beard Sculpting', 'beard', 500, 45, 'Full beard shaping and sculpting', 'https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=400&fit=crop&q=80'),
('Hot Towel Clean Shave', 'shave', 400, 40, 'Relaxing hot towel straight razor shave', 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&fit=crop&q=80');
