import { supabase, isSupabaseConfigured } from '../lib/supabase';

const BUCKET_NAME = 'media';

export async function uploadFile(file: File, folder = 'uploads'): Promise<{ url: string | null; error: string | null }> {
  // Validate file type
  const isImage = file.type.startsWith('image/');
  const isPdf = file.type === 'application/pdf';

  if (!isImage && !isPdf) {
    return { url: null, error: 'Solo se permiten imágenes (PNG, JPG, WebP, SVG) o documentos PDF.' };
  }

  // Validate size (max 5MB)
  const maxBytes = 5 * 1024 * 1024;
  if (file.size > maxBytes) {
    return { url: null, error: 'El archivo excede el tamaño máximo permitido de 5MB.' };
  }

  const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const path = `${folder}/${Date.now()}_${cleanName}`;

  if (!isSupabaseConfigured || !supabase) {
    // Return local object URL for preview/testing
    const localUrl = URL.createObjectURL(file);
    return { url: localUrl, error: null };
  }

  try {
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) {
      return { url: null, error: uploadError.message };
    }

    const { data } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(path);

    return { url: data.publicUrl, error: null };
  } catch (err: any) {
    return { url: null, error: err.message || 'Error al subir archivo a Supabase Storage' };
  }
}
