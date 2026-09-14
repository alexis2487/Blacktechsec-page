import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { NoteItem } from '../types';
import { initialNotes } from '../data/initialData';

let localNotes: NoteItem[] = [...initialNotes];

export async function getNotes(): Promise<NoteItem[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [...localNotes];
  }

  try {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('publication_date', { ascending: false });

    if (error || !data || data.length === 0) {
      return [...localNotes];
    }

    return data as NoteItem[];
  } catch (err) {
    console.warn('Fallback to initial notes:', err);
    return [...localNotes];
  }
}

export async function getLatestNotes(limit = 3): Promise<NoteItem[]> {
  const all = await getNotes();
  return all.filter(n => n.published).slice(0, limit);
}

export async function getNoteBySlug(slug: string): Promise<NoteItem | null> {
  if (!isSupabaseConfigured || !supabase) {
    return localNotes.find(n => n.slug === slug) || null;
  }

  try {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return localNotes.find(n => n.slug === slug) || null;
    }

    return data as NoteItem;
  } catch {
    return localNotes.find(n => n.slug === slug) || null;
  }
}

export async function saveNote(note: Partial<NoteItem>): Promise<{ data: NoteItem | null; error: string | null }> {
  if (!isSupabaseConfigured || !supabase) {
    const existingIndex = localNotes.findIndex(n => n.id === note.id || n.slug === note.slug);
    if (existingIndex >= 0) {
      localNotes[existingIndex] = { ...localNotes[existingIndex], ...note } as NoteItem;
      return { data: localNotes[existingIndex], error: null };
    } else {
      const newItem: NoteItem = {
        id: note.id || `note-${Date.now()}`,
        title: note.title || 'Nueva Nota Técnica',
        slug: note.slug || `nota-${Date.now()}`,
        content: note.content || '',
        category: note.category || 'Technology',
        tags: note.tags || [],
        cover_image: note.cover_image || '',
        publication_date: note.publication_date || new Date().toISOString().split('T')[0],
        published: note.published !== undefined ? note.published : true,
        created_at: new Date().toISOString()
      };
      localNotes = [newItem, ...localNotes];
      return { data: newItem, error: null };
    }
  }

  try {
    if (note.id && !note.id.startsWith('note-')) {
      const { data, error } = await supabase
        .from('notes')
        .update(note)
        .eq('id', note.id)
        .select()
        .single();

      if (error) return { data: null, error: error.message };
      return { data: data as NoteItem, error: null };
    } else {
      const { id, ...insertPayload } = note;
      const { data, error } = await supabase
        .from('notes')
        .insert([insertPayload])
        .select()
        .single();

      if (error) return { data: null, error: error.message };
      return { data: data as NoteItem, error: null };
    }
  } catch (err: any) {
    return { data: null, error: err.message || 'Error al guardar la nota' };
  }
}

export async function deleteNote(id: string): Promise<{ success: boolean; error: string | null }> {
  if (!isSupabaseConfigured || !supabase) {
    localNotes = localNotes.filter(n => n.id !== id);
    return { success: true, error: null };
  }

  try {
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', id);

    if (error) return { success: false, error: error.message };
    return { success: true, error: null };
  } catch (err: any) {
    return { success: false, error: err.message || 'Error al eliminar nota' };
  }
}
