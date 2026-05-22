-- ============================================
-- CLASSIC FADE — Phase 2: Community & Reviews
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. REVIEWS TABLE
create table if not exists reviews (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete set null,
  user_name text not null,
  user_photo text,
  barber_id uuid references barbers(id) on delete cascade,
  booking_id uuid references bookings(id) on delete set null,
  rating numeric(2,1) not null check (rating >= 1 and rating <= 5),
  comment text,
  before_photo text,
  after_photo text,
  likes_count int default 0,
  created_at timestamptz default now()
);

-- 2. REVIEW LIKES TABLE
create table if not exists review_likes (
  id uuid default gen_random_uuid() primary key,
  review_id uuid references reviews(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  created_at timestamptz default now(),
  unique(review_id, user_id)
);

-- 3. REVIEW REPLIES TABLE
create table if not exists review_replies (
  id uuid default gen_random_uuid() primary key,
  review_id uuid references reviews(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  user_name text not null,
  user_photo text,
  reply_text text not null,
  created_at timestamptz default now()
);

-- 4. COMMUNITY POSTS TABLE
create table if not exists community_posts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete set null,
  user_name text not null,
  user_photo text,
  title text not null,
  content text not null,
  post_type text default 'discussion', -- discussion, question, experience, recommendation
  images text[] default '{}',
  likes_count int default 0,
  comments_count int default 0,
  is_trending boolean default false,
  created_at timestamptz default now()
);

-- 5. POST LIKES TABLE
create table if not exists post_likes (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references community_posts(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  created_at timestamptz default now(),
  unique(post_id, user_id)
);

-- 6. POST COMMENTS TABLE
create table if not exists post_comments (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references community_posts(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  user_name text not null,
  user_photo text,
  comment_text text not null,
  created_at timestamptz default now()
);

-- 7. USER GROOMING HISTORY TABLE
create table if not exists grooming_history (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  service_type text not null, -- haircut, beard, facial, etc.
  service_name text not null,
  barber_id uuid references barbers(id) on delete set null,
  barber_name text,
  service_date date not null,
  notes text,
  next_reminder_date date,
  created_at timestamptz default now()
);

-- 8. NOTIFICATIONS TABLE
create table if not exists notifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  message text not null,
  type text not null, -- booking_confirmed, booking_reminder, booking_expired, review_reply, grooming_reminder
  is_read boolean default false,
  related_id uuid, -- booking_id, review_id, etc.
  created_at timestamptz default now()
);

-- 9. UPDATE BOOKINGS TABLE — Add expiry tracking
alter table bookings add column if not exists expires_at timestamptz;
alter table bookings add column if not exists is_expired boolean default false;

-- Function to auto-expire bookings after 5 minutes
create or replace function check_booking_expiry()
returns trigger as $$
begin
  -- Set expiry time to 5 minutes after slot time
  if new.status = 'confirmed' and new.slot_date is not null and new.slot_time is not null then
    new.expires_at := (new.slot_date || ' ' || new.slot_time)::timestamp + interval '5 minutes';
  end if;
  return new;
end;
$$ language plpgsql;

-- Trigger to set expiry time on booking confirmation
drop trigger if exists set_booking_expiry on bookings;
create trigger set_booking_expiry
  before insert or update on bookings
  for each row
  execute function check_booking_expiry();

-- Function to mark expired bookings
create or replace function mark_expired_bookings()
returns void as $$
begin
  update bookings
  set status = 'expired', is_expired = true
  where status = 'confirmed'
    and expires_at < now()
    and is_expired = false;
end;
$$ language plpgsql;

-- 10. RLS POLICIES

-- Reviews
alter table reviews enable row level security;
create policy "Anyone can read reviews" on reviews for select using (true);
create policy "Authenticated users can create reviews" on reviews for insert with check (auth.uid() = user_id);
create policy "Users can update own reviews" on reviews for update using (auth.uid() = user_id);
create policy "Users can delete own reviews" on reviews for delete using (auth.uid() = user_id);

-- Review Likes
alter table review_likes enable row level security;
create policy "Anyone can read review likes" on review_likes for select using (true);
create policy "Authenticated users can like reviews" on review_likes for insert with check (auth.uid() = user_id);
create policy "Users can unlike reviews" on review_likes for delete using (auth.uid() = user_id);

-- Review Replies
alter table review_replies enable row level security;
create policy "Anyone can read replies" on review_replies for select using (true);
create policy "Authenticated users can reply" on review_replies for insert with check (auth.uid() = user_id);
create policy "Users can delete own replies" on review_replies for delete using (auth.uid() = user_id);

-- Community Posts
alter table community_posts enable row level security;
create policy "Anyone can read posts" on community_posts for select using (true);
create policy "Authenticated users can create posts" on community_posts for insert with check (auth.uid() = user_id);
create policy "Users can update own posts" on community_posts for update using (auth.uid() = user_id);
create policy "Users can delete own posts" on community_posts for delete using (auth.uid() = user_id);

-- Post Likes
alter table post_likes enable row level security;
create policy "Anyone can read post likes" on post_likes for select using (true);
create policy "Authenticated users can like posts" on post_likes for insert with check (auth.uid() = user_id);
create policy "Users can unlike posts" on post_likes for delete using (auth.uid() = user_id);

-- Post Comments
alter table post_comments enable row level security;
create policy "Anyone can read comments" on post_comments for select using (true);
create policy "Authenticated users can comment" on post_comments for insert with check (auth.uid() = user_id);
create policy "Users can delete own comments" on post_comments for delete using (auth.uid() = user_id);

-- Grooming History
alter table grooming_history enable row level security;
create policy "Users can read own history" on grooming_history for select using (auth.uid() = user_id);
create policy "Users can insert own history" on grooming_history for insert with check (auth.uid() = user_id);
create policy "Users can update own history" on grooming_history for update using (auth.uid() = user_id);

-- Notifications
alter table notifications enable row level security;
create policy "Users can read own notifications" on notifications for select using (auth.uid() = user_id);
create policy "Users can update own notifications" on notifications for update using (auth.uid() = user_id);
create policy "System can create notifications" on notifications for insert with check (true);

-- 11. REALTIME SUBSCRIPTIONS
alter publication supabase_realtime add table reviews;
alter publication supabase_realtime add table community_posts;
alter publication supabase_realtime add table notifications;
alter publication supabase_realtime add table grooming_history;

-- 12. INDEXES for Performance
create index if not exists idx_reviews_barber on reviews(barber_id);
create index if not exists idx_reviews_user on reviews(user_id);
create index if not exists idx_posts_trending on community_posts(is_trending, created_at desc);
create index if not exists idx_notifications_user on notifications(user_id, is_read);
create index if not exists idx_bookings_expiry on bookings(expires_at) where status = 'confirmed';

-- 13. SEED DATA — Sample Community Posts
insert into community_posts (user_name, user_photo, title, content, post_type, is_trending) values
(
  'Ahmed Khan',
  null,
  'Best Barber for Skin Fade?',
  'Bhai log, mujhe skin fade karwani hai. Kaunsa barber best hai Classic Fade mein? Recommendations please!',
  'question',
  true
),
(
  'Hassan Ali',
  null,
  'Amazing Beard Trim Experience!',
  'Just got my beard trim done by Usman bhai. Ekdum perfect khat! Highly recommended 💯',
  'experience',
  true
),
(
  'Bilal Ahmed',
  null,
  'Tips for Maintaining Fade?',
  'Fade karwane ke baad kaise maintain karein? Kitne din baad dobara trim karwani chahiye?',
  'question',
  false
);

-- 14. FUNCTION to Create Grooming Reminder
create or replace function create_grooming_reminder(
  p_user_id uuid,
  p_service_type text,
  p_service_name text,
  p_barber_name text,
  p_service_date date
)
returns void as $$
declare
  v_reminder_date date;
begin
  -- Calculate next reminder based on service type
  case p_service_type
    when 'haircut' then v_reminder_date := p_service_date + interval '3 weeks';
    when 'beard' then v_reminder_date := p_service_date + interval '2 weeks';
    when 'facial' then v_reminder_date := p_service_date + interval '4 weeks';
    else v_reminder_date := p_service_date + interval '3 weeks';
  end case;

  -- Insert into grooming history
  insert into grooming_history (user_id, service_type, service_name, barber_name, service_date, next_reminder_date)
  values (p_user_id, p_service_type, p_service_name, p_barber_name, p_service_date, v_reminder_date);

  -- Create notification for future reminder
  insert into notifications (user_id, title, message, type)
  values (
    p_user_id,
    'Grooming Reminder',
    format('Time for your next %s! Last service was %s weeks ago.', p_service_type, extract(week from now() - p_service_date)),
    'grooming_reminder'
  );
end;
$$ language plpgsql;

-- ============================================
-- USAGE NOTES
-- ============================================
-- 1. Run this SQL in Supabase SQL Editor
-- 2. This adds community features, reviews, and booking expiry
-- 3. Bookings will auto-expire 5 minutes after confirmed time
-- 4. Users can post, like, comment, and review
-- 5. Grooming history tracks user's service history
-- 6. Notifications system for reminders and updates

