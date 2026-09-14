import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { ContentItem } from '../types';
import { initialContent } from '../data/initialData';

let localContent: ContentItem[] = [...initialContent];

export async function getContent(): Promise<ContentItem[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [...localContent];
  }

  try {
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .order('publication_date', { ascending: false });

    if (error || !data || data.length === 0) {
      return [...localContent];
    }

    return data as ContentItem[];
  } catch (err) {
    console.warn('Fallback to initial content:', err);
    return [...localContent];
  }
}

export async function getFeaturedContent(limit: number = 4): Promise<ContentItem[]> {
  const all = await getContent();
  const featured = all.filter(c => c.featured && c.published);
  if (featured.length > 0) {
    return featured.slice(0, limit);
  }
  const published = all.filter(c => c.published);
  return published.slice(0, limit);
}

export async function getContentBySlug(slug: string): Promise<ContentItem | null> {
  if (!isSupabaseConfigured || !supabase) {
    return localContent.find(c => c.slug === slug) || null;
  }

  try {
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return localContent.find(c => c.slug === slug) || null;
    }

    return data as ContentItem;
  } catch {
    return localContent.find(c => c.slug === slug) || null;
  }
}

export async function saveContent(content: Partial<ContentItem>): Promise<{ data: ContentItem | null; error: string | null }> {
  if (!isSupabaseConfigured || !supabase) {
    const existingIndex = localContent.findIndex(c => c.id === content.id || c.slug === content.slug);
    if (existingIndex >= 0) {
      localContent[existingIndex] = { ...localContent[existingIndex], ...content, updated_at: new Date().toISOString() } as ContentItem;
      return { data: localContent[existingIndex], error: null };
    } else {
      const newItem: ContentItem = {
        id: content.id || `content-${Date.now()}`,
        title: content.title || 'Nueva Publicación',
        slug: content.slug || `publicacion-${Date.now()}`,
        description: content.description || '',
        content: content.content || '',
        category: content.category || 'Technology',
        tags: content.tags || [],
        cover_image: content.cover_image || '',
        publication_date: content.publication_date || new Date().toISOString().split('T')[0],
        external_url: content.external_url || '',
        platform: content.platform || 'Website',
        featured: Boolean(content.featured),
        published: content.published !== undefined ? content.published : true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      localContent = [newItem, ...localContent];
      return { data: newItem, error: null };
    }
  }

  try {
    if (content.id && !content.id.startsWith('content-')) {
      const { data, error } = await supabase
        .from('content')
        .update({
          ...content,
          updated_at: new Date().toISOString()
        })
        .eq('id', content.id)
        .select()
        .single();

      if (error) return { data: null, error: error.message };
      return { data: data as ContentItem, error: null };
    } else {
      const { id, ...insertPayload } = content;
      const { data, error } = await supabase
        .from('content')
        .insert([insertPayload])
        .select()
        .single();

      if (error) return { data: null, error: error.message };
      return { data: data as ContentItem, error: null };
    }
  } catch (err: any) {
    return { data: null, error: err.message || 'Error al guardar el contenido' };
  }
}

export async function deleteContent(id: string): Promise<{ success: boolean; error: string | null }> {
  if (!isSupabaseConfigured || !supabase) {
    localContent = localContent.filter(c => c.id !== id);
    return { success: true, error: null };
  }

  try {
    const { error } = await supabase
      .from('content')
      .delete()
      .eq('id', id);

    if (error) return { success: false, error: error.message };
    return { success: true, error: null };
  } catch (err: any) {
    return { success: false, error: err.message || 'Error al eliminar contenido' };
  }
}
