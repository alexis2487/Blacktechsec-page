import React, { useEffect, useState } from 'react';
import { Cpu, Plus, Edit2, Trash2, Star, Check, X, Save } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { getExperiments, saveExperiment, deleteExperiment } from '../../services/experimentsService';
import { ExperimentItem } from '../../types';

export const AdminExperimentsPage: React.FC = () => {
  const [experiments, setExperiments] = useState<ExperimentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingExp, setEditingExp] = useState<Partial<ExperimentItem> | null>(null);
  const [techInput, setTechInput] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    const data = await getExperiments();
    setExperiments(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStartCreate = () => {
    setEditingExp({
      title: '',
      slug: '',
      description: '',
      content: '',
      technologies: [],
      category: 'AI',
      status: 'Experimental',
      github_url: '',
      publication_date: new Date().toISOString().split('T')[0],
      featured: false
    });
    setTechInput('');
  };

  const handleStartEdit = (exp: ExperimentItem) => {
    setEditingExp({ ...exp });
    setTechInput((exp.technologies || []).join(', '));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp?.title || !editingExp?.description) {
      alert('El título y la descripción son obligatorios.');
      return;
    }

    const techs = techInput.split(',').map(t => t.trim()).filter(Boolean);
    const slug = editingExp.slug || editingExp.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const payload: Partial<ExperimentItem> = {
      ...editingExp,
      slug,
      technologies: techs
    };

    const { error } = await saveExperiment(payload);
    if (error) {
      alert(`Error al guardar experimento: ${error}`);
    } else {
      setFeedback('Experimento guardado.');
      setTimeout(() => setFeedback(null), 3000);
      setEditingExp(null);
      await loadData();
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Eliminar este experimento?')) {
      await deleteExperiment(id);
      await loadData();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100 light:text-zinc-900 flex items-center gap-2">
            <Cpu className="w-6 h-6 text-accent-cyan" />
            <span>Administrar Experimentos</span>
          </h1>
          <p className="text-xs font-mono text-zinc-400">
            Prototipos, scripts rápidos y pruebas de concepto
          </p>
        </div>

        <Button onClick={handleStartCreate} variant="primary" icon={<Plus className="w-4 h-4" />}>
          Nuevo Experimento
        </Button>
      </div>

      {feedback && (
        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      {editingExp && (
        <Card className="p-6 border-accent-cyan/50 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <h3 className="font-bold text-base text-zinc-100 light:text-zinc-900">
              {editingExp.id ? 'Editar Experimento' : 'Nuevo Experimento'}
            </h3>
            <button onClick={() => setEditingExp(null)} className="text-zinc-400 hover:text-zinc-100">
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
                  value={editingExp.title || ''}
                  onChange={e => setEditingExp({ ...editingExp, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-brand-500 light:bg-white light:border-zinc-300 light:text-zinc-900"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Slug</label>
                <input
                  type="text"
                  value={editingExp.slug || ''}
                  onChange={e => setEditingExp({ ...editingExp, slug: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-brand-500 light:bg-white light:border-zinc-300 light:text-zinc-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Categoría</label>
                <input
                  type="text"
                  value={editingExp.category || ''}
                  onChange={e => setEditingExp({ ...editingExp, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-brand-500 light:bg-white light:border-zinc-300 light:text-zinc-900"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Estado</label>
                <input
                  type="text"
                  placeholder="Experimental, In Progress, Validated"
                  value={editingExp.status || ''}
                  onChange={e => setEditingExp({ ...editingExp, status: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-brand-500 light:bg-white light:border-zinc-300 light:text-zinc-900"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Fecha</label>
                <input
                  type="date"
                  value={editingExp.publication_date || ''}
                  onChange={e => setEditingExp({ ...editingExp, publication_date: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-brand-500 light:bg-white light:border-zinc-300 light:text-zinc-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Descripción Breve *</label>
              <textarea
                required
                rows={2}
                value={editingExp.description || ''}
                onChange={e => setEditingExp({ ...editingExp, description: e.target.value })}
                className="w-full px-3 py-2 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-brand-500 light:bg-white light:border-zinc-300 light:text-zinc-900"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Hipótesis, Notas y Resultados</label>
              <textarea
                rows={4}
                value={editingExp.content || ''}
                onChange={e => setEditingExp({ ...editingExp, content: e.target.value })}
                className="w-full px-3 py-2 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-brand-500 light:bg-white light:border-zinc-300 light:text-zinc-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Tecnologías (separadas por coma)</label>
                <input
                  type="text"
                  value={techInput}
                  onChange={e => setTechInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-brand-500 light:bg-white light:border-zinc-300 light:text-zinc-900"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">URL GitHub</label>
                <input
                  type="url"
                  value={editingExp.github_url || ''}
                  onChange={e => setEditingExp({ ...editingExp, github_url: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-brand-500 light:bg-white light:border-zinc-300 light:text-zinc-900"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
              <Button type="button" variant="secondary" onClick={() => setEditingExp(null)}>
                Cancelar
              </Button>
              <Button type="submit" variant="primary" icon={<Save className="w-4 h-4" />}>
                Guardar Experimento
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* List */}
      <div className="space-y-3">
        {experiments.map(exp => (
          <Card key={exp.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-zinc-100 light:text-zinc-900">{exp.title}</h3>
                <Badge variant="outline" size="sm">{exp.status}</Badge>
              </div>
              <p className="text-xs text-zinc-400 line-clamp-1 light:text-zinc-600">{exp.description}</p>
              <p className="font-mono text-[11px] text-zinc-500">{exp.publication_date} · {exp.technologies.join(', ')}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleStartEdit(exp)}
                className="p-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:text-brand-400 transition-colors"
                title="Editar"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(exp.id)}
                className="p-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:text-red-400 transition-colors"
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
