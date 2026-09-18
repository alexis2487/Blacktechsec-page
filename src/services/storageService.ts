import { supabase, isSupabaseConfigured, getSupabaseAnonKey } from '../lib/supabase';
import { getCurrentSession } from './authService';

const DEFAULT_WORKER_URL = 'https://blacktechsec-storage-worker.jairalexis2487.workers.dev';

export const getStorageWorkerUrl = (): string => {
  try {
    const envVal = (import.meta.env as any).VITE_STORAGE_WORKER_URL;
    if (envVal && envVal.length > 5) return envVal;
  } catch {}

  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('blacktechsec_storage_worker_url');
      if (stored && stored.trim().length > 5) return stored.trim();
    } catch {}
  }

  return DEFAULT_WORKER_URL;
};

export async function uploadFile(
  file: File,
  folder = 'uploads'
): Promise<{ url: string | null; error: string | null }> {
  // 1. Validar tipo de archivo (Imágenes o documentos PDF)
  const isImage = file.type.startsWith('image/');
  const isPdf = file.type === 'application/pdf';

  if (!isImage && !isPdf) {
    return { url: null, error: 'Solo se permiten imágenes (PNG, JPG, WebP, SVG) o documentos PDF.' };
  }

  // 2. Validar tamaño (máximo 15MB)
  const maxBytes = 15 * 1024 * 1024;
  if (file.size > maxBytes) {
    return { url: null, error: 'El archivo excede el tamaño máximo permitido de 15MB.' };
  }

  // 3. Fallback para previsualización local si Supabase no está configurado
  if (!isSupabaseConfigured || !supabase) {
    const localUrl = URL.createObjectURL(file);
    return { url: localUrl, error: null };
  }

  // 4. Subida a Cloudflare R2 a través del Cloudflare Worker
  const workerUrl = getStorageWorkerUrl();

  try {
    const { session } = await getCurrentSession();
    if (!session?.access_token) {
      return { url: null, error: 'Se requiere una sesión activa de administrador para subir archivos a Cloudflare R2.' };
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const res = await fetch(workerUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'apikey': getSupabaseAnonKey(),
      },
      body: formData,
    });

    const data = await res.json();
    if (!res.ok || data.error) {
      throw new Error(data.error || `Error HTTP ${res.status} al comunicarse con el Worker de R2`);
    }

    return { url: data.url, error: null };
  } catch (workerErr: any) {
    console.warn('Subida primaria a Cloudflare R2 no completada, intentando contingencia con Supabase Storage:', workerErr);

    // 5. Fallback de contingencia a Supabase Storage
    try {
      const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const path = `${folder}/${Date.now()}_${cleanName}`;

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(path, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        return { 
          url: null, 
          error: `Fallo en Cloudflare R2: ${workerErr.message}. Fallback Supabase: ${uploadError.message}` 
        };
      }

      const { data } = supabase.storage
        .from('media')
        .getPublicUrl(path);

      return { url: data.publicUrl, error: null };
    } catch (fallbackErr: any) {
      return { 
        url: null, 
        error: workerErr.message || 'Error al procesar el archivo en el servicio de almacenamiento' 
      };
    }
  }
}
