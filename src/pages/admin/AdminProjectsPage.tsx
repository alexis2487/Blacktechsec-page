import React, { useEffect, useState } from 'react';
import { Layers, Plus, Edit2, Trash2, Star, Check, X, Save, AlertCircle } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { getProjects, saveProject, deleteProject } from '../../services/projectsService';
import { ProjectItem, ProjectStatus } from '../../types';

export const AdminProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Partial<ProjectItem> | null>(null);
  const [techInput, setTechInput] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    const data = await getProjects();
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStartCreate = () => {
    setEditingProject({
      title: '',
      slug: '',
      short_description: '',
      full_description: '',
      technologies: [],
      category: 'Cybersecurity',
      status: 'In Development',
      github_url: '',
      live_url: '',
      featured: false
    });
    setTechInput('');
  };

  const handleStartEdit = (p: ProjectItem) => {
    setEditingProject({ ...p });
    setTechInput((p.technologies || []).join(', '));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title || !editingProject?.short_description) {
      alert('El título y la descripción corta son obligatorios.');
      return;
    }

    const techs = techInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const slug = editingProject.slug || editingProject.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const payload: Partial<ProjectItem> = {
      ...editingProject,
      slug,
      technologies: techs
    };

    const { error } = await saveProject(payload);
    if (error) {
      alert(`Error al guardar: ${error}`);
    } else {
      setFeedback('Proyecto guardado exitosamente.');
      setTimeout(() => setFeedback(null), 3000);
      setEditingProject(null);
      await loadData();
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Está seguro de que desea eliminar este proyecto?')) {
      await deleteProject(id);
      await loadData();
    }
  };

  const handleToggleFeatured = async (p: ProjectItem) => {
    await saveProject({ ...p, featured: !p.featured });
    await loadData();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100 light:text-zinc-900 flex items-center gap-2">
            <Layers className="w-6 h-6 text-brand-400" />
            <span>Administrar Proyectos</span>
          </h1>
          <p className="text-xs font-mono text-zinc-400">
            Crear, editar y organizar proyectos técnicos
          </p>
        </div>

        <Button onClick={handleStartCreate} variant="primary" icon={<Plus className="w-4 h-4" />}>
          Nuevo Proyecto
        </Button>
      </div>

      {feedback && (
        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Edit / Create Form Modal */}
      {editingProject && (
        <Card className="p-6 border-brand-500/50 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <h3 className="font-bold text-base text-zinc-100 light:text-zinc-900">
              {editingProject.id ? 'Editar Proyecto' : 'Crear Nuevo Proyecto'}
            </h3>
            <button
              onClick={() => setEditingProject(null)}
              className="text-zinc-400 hover:text-zinc-100 p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Título *</label>
                <input
                  type="text"
                  required
                  value={editingProject.title || ''}
                  onChange={e => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-brand-500 light:bg-white light:border-zinc-300 light:text-zinc-900"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Slug (URL)</label>
                <input
                  type="text"
                  placeholder="ejemplo-slug-proyecto (auto si se deja vacío)"
                  value={editingProject.slug || ''}
                  onChange={e => setEditingProject({ ...editingProject, slug: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-brand-500 light:bg-white light:border-zinc-300 light:text-zinc-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Categoría</label>
                <input
                  type="text"
                  value={editingProject.category || ''}
                  onChange={e => setEditingProject({ ...editingProject, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-brand-500 light:bg-white light:border-zinc-300 light:text-zinc-900"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Estado</label>
                <select
                  value={editingProject.status || 'In Development'}
                  onChange={e => setEditingProject({ ...editingProject, status: e.target.value as ProjectStatus })}
                  className="w-full px-3 py-2 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-brand-500 light:bg-white light:border-zinc-300 light:text-zinc-900"
                >
                  <option value="Concept">Concept</option>
                  <option value="Experimental">Experimental</option>
                  <option value="In Development">In Development</option>
                  <option value="Completed">Completed</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Descripción Corta *</label>
              <textarea
                required
                rows={2}
                value={editingProject.short_description || ''}
                onChange={e => setEditingProject({ ...editingProject, short_description: e.target.value })}
                className="w-full px-3 py-2 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-brand-500 light:bg-white light:border-zinc-300 light:text-zinc-900"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Descripción Completa (Markdown / Detalles)</label>
              <textarea
                rows={5}
                value={editingProject.full_description || ''}
                onChange={e => setEditingProject({ ...editingProject, full_description: e.target.value })}
                className="w-full px-3 py-2 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-brand-500 light:bg-white light:border-zinc-300 light:text-zinc-900"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Tecnologías (separadas por coma)</label>
              <input
                type="text"
                placeholder="Python, C#, Docker, SQL, Linux"
                value={techInput}
                onChange={e => setTechInput(e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-brand-500 light:bg-white light:border-zinc-300 light:text-zinc-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">URL GitHub</label>
                <input
                  type="url"
                  placeholder="https://github.com/alexis2487/..."
                  value={editingProject.github_url || ''}
                  onChange={e => setEditingProject({ ...editingProject, github_url: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-brand-500 light:bg-white light:border-zinc-300 light:text-zinc-900"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">URL Demo en Vivo</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={editingProject.live_url || ''}
                  onChange={e => setEditingProject({ ...editingProject, live_url: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-brand-500 light:bg-white light:border-zinc-300 light:text-zinc-900"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="featured_chk"
                checked={Boolean(editingProject.featured)}
                onChange={e => setEditingProject({ ...editingProject, featured: e.target.checked })}
                className="rounded border-zinc-700 text-brand-600 focus:ring-brand-500"
              />
              <label htmlFor="featured_chk" className="text-xs font-mono text-zinc-300 light:text-zinc-700">
                Destacar en la página de inicio (Featured)
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
              <Button type="button" variant="secondary" onClick={() => setEditingProject(null)}>
                Cancelar
              </Button>
              <Button type="submit" variant="primary" icon={<Save className="w-4 h-4" />}>
                Guardar Proyecto
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Projects List */}
      <div className="space-y-3">
        {projects.map(project => (
          <Card key={project.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-zinc-100 light:text-zinc-900">
                  {project.title}
                </h3>
                <Badge variant={project.status === 'Completed' ? 'success' : 'accent'} size="sm">
                  {project.status}
                </Badge>
                {project.featured && (
                  <Badge variant="warning" size="sm">
                    ★ Destacado
                  </Badge>
                )}
              </div>
              <p className="text-xs text-zinc-400 line-clamp-1 light:text-zinc-600">
                {project.short_description}
              </p>
              <p className="font-mono text-[11px] text-zinc-500">
                /{project.slug} · {project.technologies.join(', ')}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleToggleFeatured(project)}
                className={`p-1.5 rounded-lg border text-xs ${
                  project.featured 
                    ? 'border-amber-500/40 text-amber-400 bg-amber-500/10' 
                    : 'border-zinc-800 text-zinc-500 hover:text-zinc-300'
                }`}
                title="Alternar Destacado"
              >
                <Star className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleStartEdit(project)}
                className="p-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:text-brand-400 hover:border-brand-500/40 transition-colors"
                title="Editar"
              >
                <Edit2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleDelete(project.id)}
                className="p-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:text-red-400 hover:border-red-500/40 transition-colors"
                title="Eliminar"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </Card>
        ))}
      </div>

    </div>
  );
};
