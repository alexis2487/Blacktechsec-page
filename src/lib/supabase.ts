import { createClient, SupabaseClient } from '@supabase/supabase-js';

const getEnvOrStorage = (envKey: string, storageKey: string, fallback = ''): string => {
  try {
    const envVal = (import.meta.env as any)[envKey];
    if (envVal && !envVal.includes('tu_supabase_anon_key') && envVal.length > 5) {
      return envVal;
    }
  } catch {}

  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored && stored.trim().length > 5) {
        return stored.trim();
      }
    } catch {}
  }

  return fallback;
};

export const getSupabaseUrl = () => 
  getEnvOrStorage('VITE_SUPABASE_URL', 'blacktechsec_supabase_url', 'https://rqawfhijrokvefzaaxof.supabase.co');

export const getSupabaseAnonKey = () => 
  getEnvOrStorage('VITE_SUPABASE_ANON_KEY', 'blacktechsec_supabase_anon_key', '');

const supabaseUrl = getSupabaseUrl();
const supabaseAnonKey = getSupabaseAnonKey();

// Validates whether Supabase credentials have been configured
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

export function saveSupabaseConfig(url: string, anonKey: string) {
  if (typeof window !== 'undefined') {
    if (url) localStorage.setItem('blacktechsec_supabase_url', url.trim());
    if (anonKey) localStorage.setItem('blacktechsec_supabase_anon_key', anonKey.trim());
    window.location.reload();
  }
}

export function clearSupabaseConfig() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('blacktechsec_supabase_url');
    localStorage.removeItem('blacktechsec_supabase_anon_key');
    window.location.reload();
  }
}
