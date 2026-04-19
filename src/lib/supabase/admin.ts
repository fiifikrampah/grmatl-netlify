import { createClient } from '@supabase/supabase-js'

/**
 * Service-role Supabase client for server-side admin operations.
 *
 * Bypasses RLS, so only call from routes that have already verified the
 * caller is an admin (e.g. via the cookie client's auth.getUser()).
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  return createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}
