import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Graceful fallback — app won't crash if env vars missing
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase env variables missing. Bookings will not sync.')
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey, {
      realtime: { params: { eventsPerSecond: 10 } },
    })
  : null
