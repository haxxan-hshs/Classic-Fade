-- ============================================
-- CLASSIC FADE — Complete System with Reviews, Community & Expiry
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. BARBERS TABLE (Enhanced)
create table if not exists barbers (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  photo_url text,
  experience_years int default 1,
  specialties text[] default '{}',
  rating numeric(3,2) default 5.0,
  total_cuts int default 0,
  total_reviews int default 0,
  is_available boolean default true,
  bio text,
  created_at timestamptz default now()
);

-- 2. SERVICES TABLE (NO PRICES - as per requirement)
create table if not exists services (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  category text not null, -- Low Fade, Mid Fade, High Fade, Beard Trim, etc.
  duration_mins int default 30,
  img_url text, -- User's uploaded images will go here
  description text,
  is_active boolean default true,
  badge text, -- Trending, Popular, etc.
  tags text[] default '{}',
  face_shapes text[] default '{}',
  created_at timestamptz default now()
);

-- 3. BOOKINGS TABLE (Enhanced with Expiry)
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
  status text default 'pending', -- pending, confirmed, completed, cancelled, expired
  style_img text,
  booking_time timestamptz default now(),
  expiry_time timestamptz, -- Auto-calculated: slot_date + slot_time + 5 minutes
  arrived_at timestamptz, -- When customer arrives
  completed_at timestamptz,
  cancelled_at timestamptz,
  expired_at timestamptz,
  created_at timestamptz default now()
);

-- 4. REVIEWS TABLE (New)
create table if not exists reviews (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  user_name text not null,
  barber_id uuid references barbers(id) on delete cascade,
  booking_id uuid references bookings(id) on delete set null,
  rating int not null check (rating >= 1 and rating <= 5),
  comment text,
  before_photo text,
  after_photo text,
  likes_count int default 0,
  created_at timestamptz default now()
);

-- 5. REVIEW LIKES TABLE
create table if not exists review_likes (
  id uuid default gen_random_uuid() primary key,
  review_id uuid references reviews(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  created_at timestamptz default now(),
  unique(review_id, user_id)
);

-- 6. REVIEW REPLIES TABLE
create table if not exists review_replies (
  id uuid default gen_random_uuid() primary key,
  review_id uuid references reviews(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  user_name text not null,
  reply_text text not null,
  created_at timestamptz default now()
);

-- 7. COMMUNITY POSTS TABLE (New)
create table if not exists community_posts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  user_name text not null,
  title text not null,
  content text not null,
  images text[] default '{}',
  post_type text default 'discussion', -- discussion, experience, question, tip
  likes_count int default 0,
  comments_count int default 0,
  is_trending boolean default false,
  created_at timestamptz default now()
);

-- 8. POST LIKES TABLE
create table if not exists post_likes (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references community_posts(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  created_at timestamptz default now(),
  unique(post_id, user_id)
);

-- 9. POST COMMENTS TABLE
create table if not exists post_comments (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references community_posts(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  user_name text not null,
  comment_text text not null,
  created_at timestamptz default now()
);

-- 10. GROOMING HISTORY TABLE (New)
create table if not exists grooming_history (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  service_type text not null, -- haircut, beard, facial, etc.
  service_name text not null,
  barber_name text,
  service_date date not null,
  notes text,
  created_at timestamptz default now()
);

-- 11. USER PREFERENCES TABLE (For reminders)
create table if not exists user_preferences (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade unique,
  favorite_barber_id uuid references barbers(id) on delete set null,
  favorite_style text,
  reminder_enabled boolean default true,
  reminder_days int default 21, -- Remind after 3 weeks
  last_haircut_date date,
  last_beard_date date,
  created_at timestamptz default now()
);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to auto-expire bookings
create or replace function expire_old_bookings()
returns void as $$
begin
  update bookings
  set status = 'expired',
      expired_at = now()
  where status in ('pending', 'confirmed')
    and expiry_time < now()
    and status != 'expired';
end;
$$ language plpgsql;

-- Function to calculate expiry time
create or replace function set_booking_expiry()
returns trigger as $$
begin
  -- Calculate expiry: slot_date + slot_time + 5 minutes
  new.expiry_time := (new.slot_date || ' ' || new.slot_time)::timestamp + interval '5 minutes';
  return new;
end;
$$ language plpgsql;

-- Trigger to set expiry time on booking insert
drop trigger if exists set_expiry_trigger on bookings;
create trigger set_expiry_trigger
  before insert on bookings
  for each row
  execute function set_booking_expiry();

-- Function to update barber rating
create or replace function update_barber_rating()
returns trigger as $$
begin
  update barbers
  set rating = (
    select round(avg(rating)::numeric, 2)
    from reviews
    where barber_id = new.barber_id
  ),
  total_reviews = (
    select count(*)
    from reviews
    where barber_id = new.barber_id
  )
  where id = new.barber_id;
  return new;
end;
$$ language plpgsql;

-- Trigger to update barber rating on new review
drop trigger if exists update_rating_trigger on reviews;
create trigger update_rating_trigger
  after insert on reviews
  for each row
  execute function update_barber_rating();

-- Function to update review likes count
create or replace function update_review_likes()
returns trigger as $$
begin
  if tg_op = 'INSERT' then
    update reviews set likes_count = likes_count + 1 where id = new.review_id;
  elsif tg_op = 'DELETE' then
    update reviews set likes_count = likes_count - 1 where id = old.review_id;
  end if;
  return null;
end;
$$ language plpgsql;

-- Trigger for review likes
drop trigger if exists review_likes_trigger on review_likes;
create trigger review_likes_trigger
  after insert or delete on review_likes
  for each row
  execute function update_review_likes();

-- Function to update post likes count
create or replace function update_post_likes()
returns trigger as $$
begin
  if tg_op = 'INSERT' then
    update community_posts set likes_count = likes_count + 1 where id = new.post_id;
  elsif tg_op = 'DELETE' then
    update community_posts set likes_count = likes_count - 1 where id = old.post_id;
  end if;
  return null;
end;
$$ language plpgsql;

-- Trigger for post likes
drop trigger if exists post_likes_trigger on post_likes;
create trigger post_likes_trigger
  after insert or delete on post_likes
  for each row
  execute function update_post_likes();

-- Function to update post comments count
create or replace function update_post_comments()
returns trigger as $$
begin
  if tg_op = 'INSERT' then
    update community_posts set comments_count = comments_count + 1 where id = new.post_id;
  elsif tg_op = 'DELETE' then
    update community_posts set comments_count = comments_count - 1 where id = old.post_id;
  end if;
  return null;
end;
$$ language plpgsql;

-- Trigger for post comments
drop trigger if exists post_comments_trigger on post_comments;
create trigger post_comments_trigger
  after insert or delete on post_comments
  for each row
  execute function update_post_comments();

-- ============================================
-- RLS POLICIES
-- ============================================

-- Barbers: public read
alter table barbers enable row level security;
drop policy if exists "Public read barbers" on barbers;
create policy "Public read barbers" on barbers for select using (true);
drop policy if exists "Admin manage barbers" on barbers;
create policy "Admin manage barbers" on barbers for all using (true);

-- Services: public read
alter table services enable row level security;
drop policy if exists "Public read services" on services;
create policy "Public read services" on services for select using (true);
drop policy if exists "Admin manage services" on services;
create policy "Admin manage services" on services for all using (true);

-- Bookings: users see own, admin sees all
alter table bookings enable row level security;
drop policy if exists "Anyone can insert booking" on bookings;
create policy "Anyone can insert booking" on bookings for insert with check (true);
drop policy if exists "Anyone can read bookings" on bookings;
create policy "Anyone can read bookings" on bookings for select using (true);
drop policy if exists "Anyone can update bookings" on bookings;
create policy "Anyone can update bookings" on bookings for update using (true);

-- Reviews: public read, authenticated users can create
alter table reviews enable row level security;
drop policy if exists "Public read reviews" on reviews;
create policy "Public read reviews" on reviews for select using (true);
drop policy if exists "Authenticated users create reviews" on reviews;
create policy "Authenticated users create reviews" on reviews for insert with check (auth.uid() = user_id);
drop policy if exists "Users update own reviews" on reviews;
create policy "Users update own reviews" on reviews for update using (auth.uid() = user_id);

-- Review likes
alter table review_likes enable row level security;
drop policy if exists "Public read review likes" on review_likes;
create policy "Public read review likes" on review_likes for select using (true);
drop policy if exists "Users manage own likes" on review_likes;
create policy "Users manage own likes" on review_likes for all using (auth.uid() = user_id);

-- Review replies
alter table review_replies enable row level security;
drop policy if exists "Public read replies" on review_replies;
create policy "Public read replies" on review_replies for select using (true);
drop policy if exists "Authenticated users create replies" on review_replies;
create policy "Authenticated users create replies" on review_replies for insert with check (auth.uid() = user_id);

-- Community posts
alter table community_posts enable row level security;
drop policy if exists "Public read posts" on community_posts;
create policy "Public read posts" on community_posts for select using (true);
drop policy if exists "Authenticated users create posts" on community_posts;
create policy "Authenticated users create posts" on community_posts for insert with check (auth.uid() = user_id);
drop policy if exists "Users update own posts" on community_posts;
create policy "Users update own posts" on community_posts for update using (auth.uid() = user_id);

-- Post likes
alter table post_likes enable row level security;
drop policy if exists "Public read post likes" on post_likes;
create policy "Public read post likes" on post_likes for select using (true);
drop policy if exists "Users manage own post likes" on post_likes;
create policy "Users manage own post likes" on post_likes for all using (auth.uid() = user_id);

-- Post comments
alter table post_comments enable row level security;
drop policy if exists "Public read comments" on post_comments;
create policy "Public read comments" on post_comments for select using (true);
drop policy if exists "Authenticated users create comments" on post_comments;
create policy "Authenticated users create comments" on post_comments for insert with check (auth.uid() = user_id);

-- Grooming history
alter table grooming_history enable row level security;
drop policy if exists "Users read own history" on grooming_history;
create policy "Users read own history" on grooming_history for select using (auth.uid() = user_id);
drop policy if exists "Users manage own history" on grooming_history;
create policy "Users manage own history" on grooming_history for all using (auth.uid() = user_id);

-- User preferences
alter table user_preferences enable row level security;
drop policy if exists "Users read own preferences" on user_preferences;
create policy "Users read own preferences" on user_preferences for select using (auth.uid() = user_id);
drop policy if exists "Users manage own preferences" on user_preferences;
create policy "Users manage own preferences" on user_preferences for all using (auth.uid() = user_id);

-- ============================================
-- REALTIME
-- ============================================
alter publication supabase_realtime add table bookings;
alter publication supabase_realtime add table reviews;
alter publication supabase_realtime add table community_posts;

-- ============================================
-- SEED DATA — Updated Services (NO PRICES)
-- ============================================
-- Note: Replace img_url with your uploaded images

insert into services (name, category, duration_mins, description, badge, tags, face_shapes, img_url) values
-- FADE STYLES
('Low Fade', 'fade', 35, 'Subtle fade starting just above the ear — clean, professional look.', '⭐ Popular', array['popular'], array['oval', 'round', 'square'], 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=500&fit=crop&q=80'),
('Mid Fade', 'fade', 35, 'Balanced fade at mid-ear level — versatile and stylish.', '🔥 Trending', array['trending', 'popular'], array['oval', 'heart', 'diamond'], 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=500&fit=crop&q=80'),
('High Fade', 'fade', 40, 'Bold fade starting high on the sides — sharp and modern.', '🔥 Trending', array['trending'], array['round', 'square'], 'https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?w=500&fit=crop&q=80'),

-- BEARD STYLES
('Beard Trim', 'beard', 20, 'Shape and trim your beard to perfection — clean and defined.', '⭐ Popular', array['popular'], array['oval', 'round', 'square', 'heart', 'diamond'], 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=500&fit=crop&q=80'),
('Royal Shave', 'shave', 55, 'Multi-pass straight razor shave with hot towels and aftercare.', '👑 Royal', array['premium'], array['oval', 'round', 'square', 'heart', 'diamond'], 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=500&fit=crop&q=80'),
('Hot Towel Shave', 'shave', 40, 'Relaxing hot towel prep with straight razor — luxury experience.', '👑 Premium', array['premium', 'popular'], array['oval', 'round', 'square', 'heart', 'diamond'], 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=500&fit=crop&q=80'),
('Viking Beard', 'beard', 60, 'Long, full beard with braids or waves — warrior aesthetic.', '👑 Epic', array['premium'], array['oval', 'square', 'diamond'], 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=500&fit=crop&q=80'),

-- MODERN CUTS
('French Crop', 'modern', 30, 'Short textured top with a defined fringe — effortlessly cool.', '🔥 Trending', array['trending', 'popular'], array['oval', 'round', 'square'], 'https://images.unsplash.com/photo-1534297635766-a262cdcb8ee4?w=500&fit=crop&q=80'),
('Slick Back', 'modern', 40, 'Hair combed straight back — sleek, sophisticated, powerful.', '👑 Premium', array['premium'], array['oval', 'square', 'diamond'], 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=500&fit=crop&q=80')

on conflict do nothing;

-- ============================================
-- CRON JOB (Optional - requires pg_cron extension)
-- ============================================
-- Run this to auto-expire bookings every minute:
-- select cron.schedule('expire-bookings', '* * * * *', 'select expire_old_bookings()');
