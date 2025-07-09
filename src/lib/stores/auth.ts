import { writable } from 'svelte/store';
import { supabase } from '$lib/supabase';
import type { User } from '@supabase/supabase-js';

export const user = writable<User | null>(null);

// Initialize auth state
export async function initAuth() {
  const {
    data: { session }
  } = await supabase.auth.getSession();
  user.set(session?.user ?? null);

  const {
    data: { subscription }
  } = supabase.auth.onAuthStateChange((event, session) => {
    user.set(session?.user ?? null);
  });

  return () => subscription.unsubscribe();
}
