import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://rqawfhijrokvefzaaxof.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Validates whether Supabase credentials have been properly configured by the developer/owner
export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseAnonKey.includes('tu_supabase_anon_key') &&
  supabaseAnonKey.length > 20
);

let client: SupabaseClient | null = null;

try {
  if (isSupabaseConfigured) {
    client = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      }
    });
  }
} catch (error) {
  console.warn('Supabase client initialization warning:', error);
  client = null;
}

export const supabase = client;
