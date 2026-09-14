import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { User, Session } from '@supabase/supabase-js';

export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
}

export async function signInAdmin(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
  if (!isSupabaseConfigured || !supabase) {
    // Demo / mock authentication mode for local development before Supabase keys are configured
    if (email.trim() === 'alexis.martinez_systems.engineer@outlook.com' && password.length >= 6) {
      const mockUser = {
        id: 'admin-local',
        email,
        app_metadata: {},
        user_metadata: { role: 'admin', name: 'Jair Alexis Martinez' },
        aud: 'authenticated',
        created_at: new Date().toISOString()
      } as unknown as User;
      localStorage.setItem('blacktechsec_local_admin', JSON.stringify(mockUser));
      return { user: mockUser, error: null };
    }
    return { user: null, error: 'Credenciales inválidas. (En modo local utilice su email oficial y clave de al menos 6 caracteres)' };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return { user: null, error: error.message };
    }

    return { user: data.user, error: null };
  } catch (err: any) {
    return { user: null, error: err.message || 'Error al iniciar sesión' };
  }
}

export async function signOutAdmin(): Promise<void> {
  localStorage.removeItem('blacktechsec_local_admin');
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('Sign out warning:', err);
    }
  }
}

export async function getCurrentSession(): Promise<{ user: User | null; session: Session | null }> {
  if (!isSupabaseConfigured || !supabase) {
    const local = localStorage.getItem('blacktechsec_local_admin');
    if (local) {
      try {
        const user = JSON.parse(local);
        return { user, session: null };
      } catch {
        return { user: null, session: null };
      }
    }
    return { user: null, session: null };
  }

  try {
    const { data } = await supabase.auth.getSession();
    return { user: data.session?.user || null, session: data.session || null };
  } catch {
    return { user: null, session: null };
  }
}
