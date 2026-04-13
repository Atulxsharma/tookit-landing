import { createClient } from '@supabase/supabase-js';

export type Segment = 'solo' | 'family' | 'caregiver';

export const FALLBACK_WAITLIST_COUNT = 200;

type WaitlistResult =
  | { ok: true }
  | { ok: false; code: 'config' | 'duplicate' | 'unknown'; message: string };

function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    return null;
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}

export async function getWaitlistCount() {
  const supabase = createServiceClient();

  if (!supabase) {
    return { count: FALLBACK_WAITLIST_COUNT, fallback: true };
  }

  const { count, error } = await supabase.from('waitlist').select('*', {
    count: 'exact',
    head: true
  });

  if (error || typeof count !== 'number') {
    return { count: FALLBACK_WAITLIST_COUNT, fallback: true };
  }

  return { count, fallback: false };
}

export async function insertWaitlistEntry(email: string, segment: Segment): Promise<WaitlistResult> {
  const supabase = createServiceClient();

  if (!supabase) {
    return {
      ok: false,
      code: 'config',
      message: 'Waitlist is not configured yet.'
    };
  }

  const { error } = await supabase.from('waitlist').insert({
    email,
    segment,
    source: 'landing_page'
  });

  if (!error) {
    return { ok: true };
  }

  if (error.code === '23505') {
    return {
      ok: false,
      code: 'duplicate',
      message: "You're already on the list!"
    };
  }

  return {
    ok: false,
    code: 'unknown',
    message: 'Something went wrong. Try again.'
  };
}
