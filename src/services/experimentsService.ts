import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { ExperimentItem } from '../types';
import { initialExperiments } from '../data/initialData';

let localExperiments: ExperimentItem[] = [...initialExperiments];

export async function getExperiments(): Promise<ExperimentItem[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [...localExperiments];
  }

  try {
    const { data, error } = await supabase
      .from('experiments')
      .select('*')
      .order('publication_date', { ascending: false });

    if (error || !data || data.length === 0) {
      return [...localExperiments];
    }

    return data as ExperimentItem[];
  } catch (err) {
    console.warn('Fallback to initial experiments:', err);
    return [...localExperiments];
  }
}

export async function getLatestExperiments(limit = 3): Promise<ExperimentItem[]> {
  const all = await getExperiments();
  return all.slice(0, limit);
}

export async function getExperimentBySlug(slug: string): Promise<ExperimentItem | null> {
  if (!isSupabaseConfigured || !supabase) {
    return localExperiments.find(e => e.slug === slug) || null;
  }

  try {
    const { data, error } = await supabase
      .from('experiments')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return localExperiments.find(e => e.slug === slug) || null;
    }

    return data as ExperimentItem;
  } catch {
    return localExperiments.find(e => e.slug === slug) || null;
  }
}

export async function saveExperiment(experiment: Partial<ExperimentItem>): Promise<{ data: ExperimentItem | null; error: string | null }> {
  if (!isSupabaseConfigured || !supabase) {
    const existingIndex = localExperiments.findIndex(e => e.id === experiment.id || e.slug === experiment.slug);
    if (existingIndex >= 0) {
      localExperiments[existingIndex] = { ...localExperiments[existingIndex], ...experiment } as ExperimentItem;
      return { data: localExperiments[existingIndex], error: null };
    } else {
      const newItem: ExperimentItem = {
        id: experiment.id || `exp-${Date.now()}`,
        title: experiment.title || 'Nuevo Experimento',
        slug: experiment.slug || `experimento-${Date.now()}`,
        description: experiment.description || '',
        content: experiment.content || '',
        technologies: experiment.technologies || [],
        category: experiment.category || 'Technology',
        cover_image: experiment.cover_image || '',
        github_url: experiment.github_url || '',
        status: experiment.status || 'Experimental',
        publication_date: experiment.publication_date || new Date().toISOString().split('T')[0],
        featured: Boolean(experiment.featured),
        created_at: new Date().toISOString()
      };
      localExperiments = [newItem, ...localExperiments];
      return { data: newItem, error: null };
    }
  }

  try {
    if (experiment.id && !experiment.id.startsWith('exp-')) {
      const { data, error } = await supabase
        .from('experiments')
        .update(experiment)
        .eq('id', experiment.id)
        .select()
        .single();

      if (error) return { data: null, error: error.message };
      return { data: data as ExperimentItem, error: null };
    } else {
      const { id, ...insertPayload } = experiment;
      const { data, error } = await supabase
        .from('experiments')
        .insert([insertPayload])
        .select()
        .single();

      if (error) return { data: null, error: error.message };
      return { data: data as ExperimentItem, error: null };
    }
  } catch (err: any) {
    return { data: null, error: err.message || 'Error al guardar el experimento' };
  }
}

export async function deleteExperiment(id: string): Promise<{ success: boolean; error: string | null }> {
  if (!isSupabaseConfigured || !supabase) {
    localExperiments = localExperiments.filter(e => e.id !== id);
    return { success: true, error: null };
  }

  try {
    const { error } = await supabase
      .from('experiments')
      .delete()
      .eq('id', id);

    if (error) return { success: false, error: error.message };
    return { success: true, error: null };
  } catch (err: any) {
    return { success: false, error: err.message || 'Error al eliminar experimento' };
  }
}
