import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { ProjectItem } from '../types';
import { initialProjects } from '../data/initialData';

// Local in-memory cache for fallback and offline continuity
let localProjects: ProjectItem[] = [...initialProjects];

export async function getProjects(): Promise<ProjectItem[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [...localProjects];
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return [...localProjects];
    }

    return data as ProjectItem[];
  } catch (err) {
    console.warn('Fallback to initial projects:', err);
    return [...localProjects];
  }
}

export async function getFeaturedProjects(): Promise<ProjectItem[]> {
  const all = await getProjects();
  return all.filter(p => p.featured);
}

export async function getProjectBySlug(slug: string): Promise<ProjectItem | null> {
  if (!isSupabaseConfigured || !supabase) {
    return localProjects.find(p => p.slug === slug) || null;
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return localProjects.find(p => p.slug === slug) || null;
    }

    return data as ProjectItem;
  } catch {
    return localProjects.find(p => p.slug === slug) || null;
  }
}

export async function saveProject(project: Partial<ProjectItem>): Promise<{ data: ProjectItem | null; error: string | null }> {
  if (!isSupabaseConfigured || !supabase) {
    const existingIndex = localProjects.findIndex(p => p.id === project.id || p.slug === project.slug);
    if (existingIndex >= 0) {
      localProjects[existingIndex] = { ...localProjects[existingIndex], ...project, updated_at: new Date().toISOString() } as ProjectItem;
      return { data: localProjects[existingIndex], error: null };
    } else {
      const newProj: ProjectItem = {
        id: project.id || `proj-${Date.now()}`,
        title: project.title || 'Nuevo Proyecto',
        slug: project.slug || `proyecto-${Date.now()}`,
        short_description: project.short_description || '',
        full_description: project.full_description || '',
        technologies: project.technologies || [],
        category: project.category || 'Technology',
        status: project.status || 'In Development',
        cover_image: project.cover_image || '',
        gallery: project.gallery || [],
        github_url: project.github_url || '',
        live_url: project.live_url || '',
        featured: Boolean(project.featured),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      localProjects = [newProj, ...localProjects];
      return { data: newProj, error: null };
    }
  }

  try {
    if (project.id && !project.id.startsWith('proj-')) {
      const { data, error } = await supabase
        .from('projects')
        .update({
          ...project,
          updated_at: new Date().toISOString()
        })
        .eq('id', project.id)
        .select()
        .single();

      if (error) return { data: null, error: error.message };
      return { data: data as ProjectItem, error: null };
    } else {
      const { id, ...insertPayload } = project;
      const { data, error } = await supabase
        .from('projects')
        .insert([insertPayload])
        .select()
        .single();

      if (error) return { data: null, error: error.message };
      return { data: data as ProjectItem, error: null };
    }
  } catch (err: any) {
    return { data: null, error: err.message || 'Error al guardar el proyecto' };
  }
}

export async function deleteProject(id: string): Promise<{ success: boolean; error: string | null }> {
  if (!isSupabaseConfigured || !supabase) {
    localProjects = localProjects.filter(p => p.id !== id);
    return { success: true, error: null };
  }

  try {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) return { success: false, error: error.message };
    return { success: true, error: null };
  } catch (err: any) {
    return { success: false, error: err.message || 'Error al eliminar el proyecto' };
  }
}
