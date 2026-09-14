import React, { useEffect, useState } from 'react';
import { Share2, Plus, Edit2, Trash2, Star, Check, X, Save, Eye, EyeOff } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { getContent, saveContent, deleteContent } from '../../services/contentService';
import { ContentItem, ContentPlatform } from '../../types';

export const AdminContentPage: React.FC = () => {
  const [contentList, setContentList] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Partial<ContentItem> | null>(null);
  const [tagInput, setTagInput] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    const data = await getContent();
    setContentList(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStartCreate = () => {
    setEditingItem({
      title: '',
      slug: '',
      description: '',
      content: '',
      category: 'Technology',
      tags: [],
      platform: 'Website',
      publication_date: new Date().toISOString().split('T')[0],
      external_url: '',
      featured: false,
      published: true
    });
    setTagInput('');
  };

  const handleStartEdit = (item: ContentItem) => {
    setEditingItem({ ...item });
    setTagInput((item.tags || []).join(', '));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.title || !editingItem?.description) {
      alert('El título y la descripción son obligatorios.');
      return;
    }

    const tags = tagInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const slug = editingItem.slug || editingItem.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const payload: Partial<ContentItem> = {
      ...editingItem,
      slug,
      tags
    };

    const { error } = await saveContent(payload);
    if (error) {
      alert(`Error al guardar: ${error}`);
    } else {
      setFeedback('Publicación guardada exitosamente.');
      setTimeout(() => setFeedback(null), 3000);
      setEditingItem(null);
      await loadData();
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Está seguro de que desea eliminar este contenido?')) {
      await deleteContent(id);
      await loadData();
    }
  };

  const handleTogglePublished = async (item: ContentItem) => {
    await saveContent({ ...item, published: !item.published });
    await loadData();
  };

  const handleToggleFeatured = async (item: ContentItem) => {
    await saveContent({ ...item, featured: !item.featured });
    await loadData();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100 light:text-zinc-900 flex items-center gap-2">
            <Share2 className="w-6 h-6 text-brand-400" />
            <span>Administrar Contenido & Publicaciones</span>
          </h1>
          <p className="text-xs font-mono text-zinc-400">
            Control de artículos, tutoriales y enlaces a redes sociales
          </p>
        </div>

        <Button onClick={handleStartCreate} variant="primary" icon={<Plus className="w-4 h-4" />}>
          Nueva Publicación
        </Button>
      </div>

      {feedback && (
        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Edit Form */}
      {editingItem && (
        <Card className="p-6 border-brand-500/50 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <h3 className="font-bold text-base text-zinc-100 light:text-zinc-900">
              {editingItem.id ? 'Editar Publicación' : 'Crear Nueva Publicación'}
            </h3>
            <button onClick={() => setEditingItem(null)} className="text-zinc-400 hover:text-zinc-100">
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
                  value={editingItem.title || ''}
                  onChange={e => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-brand-500 light:bg-white light:border-zinc-300 light:text-zinc-900"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Slug</label>
                <input
                  type="text"
                  placeholder="ejemplo-publicacion"
                  value={editingItem.slug || ''}
                  onChange={e => setEditingItem({ ...editingItem, slug: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-brand-500 light:bg-white light:border-zinc-300 light:text-zinc-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Plataforma</label>
                <select
                  value={editingItem.platform || 'Website'}
                  onChange={e => setEditingItem({ ...editingItem, platform: e.target.value as ContentPlatform })}
                  className="w-full px-3 py-2 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-brand-500 light:bg-white light:border-zinc-300 light:text-zinc-900"
                >
                  <option value="YouTube">YouTube</option>
                  <option value="GitHub">GitHub</option>
                  <option value="Website">Website</option>
                  <option value="Instagram">Instagram</option>
                  <option value="TikTok">TikTok</option>
                  <option value="Other">Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Categoría</label>
                <input
                  type="text"
                  value={editingItem.category || ''}
                  onChange={e => setEditingItem({ ...editingItem, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-brand-500 light:bg-white light:border-zinc-300 light:text-zinc-900"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Fecha Publicación</label>
                <input
                  type="date"
                  value={editingItem.publication_date || ''}
                  onChange={e => setEditingItem({ ...editingItem, publication_date: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-brand-500 light:bg-white light:border-zinc-300 light:text-zinc-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Descripción / Resumen *</label>
              <textarea
                required
                rows={2}
                value={editingItem.description || ''}
                onChange={e => setEditingItem({ ...editingItem, description: e.target.value })}
                className="w-full px-3 py-2 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-brand-500 light:bg-white light:border-zinc-300 light:text-zinc-900"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Contenido / Notas Extendidas</label>
              <textarea
                rows={4}
                value={editingItem.content || ''}
                onChange={e => setEditingItem({ ...editingItem, content: e.target.value })}
                className="w-full px-3 py-2 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-brand-500 light:bg-white light:border-zinc-300 light:text-zinc-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">URL Externa (Video, Repo, Post)</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={editingItem.external_url || ''}
                  onChange={e => setEditingItem({ ...editingItem, external_url: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-brand-500 light:bg-white light:border-zinc-300 light:text-zinc-900"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Tags (separados por coma)</label>
                <input
                  type="text"
                  placeholder="Seguridad, Python, Tutorial"
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-brand-500 light:bg-white light:border-zinc-300 light:text-zinc-900"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(editingItem.published)}
                  onChange={e => setEditingItem({ ...editingItem, published: e.target.checked })}
                  className="rounded border-zinc-700 text-brand-600 focus:ring-brand-500"
                />
                <span className="text-xs font-mono text-zinc-300 light:text-zinc-700">Publicado</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(editingItem.featured)}
                  onChange={e => setEditingItem({ ...editingItem, featured: e.target.checked })}
                  className="rounded border-zinc-700 text-brand-600 focus:ring-brand-500"
                />
                <span className="text-xs font-mono text-zinc-300 light:text-zinc-700">Destacado (Home)</span>
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
              <Button type="button" variant="secondary" onClick={() => setEditingItem(null)}>
                Cancelar
              </Button>
              <Button type="submit" variant="primary" icon={<Save className="w-4 h-4" />}>
                Guardar
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* List */}
      <div className="space-y-3">
        {contentList.map(item => (
          <Card key={item.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-zinc-100 light:text-zinc-900">{item.title}</h3>
                <Badge variant="accent" size="sm">{item.platform}</Badge>
                {item.published ? (
                  <Badge variant="success" size="sm">Publicado</Badge>
                ) : (
                  <Badge variant="outline" size="sm">Borrador</Badge>
                )}
                {item.featured && <Badge variant="warning" size="sm">★ Featured</Badge>}
              </div>
              <p className="text-xs text-zinc-400 line-clamp-1 light:text-zinc-600">{item.description}</p>
              <p className="font-mono text-[11px] text-zinc-500">
                {item.publication_date} · {item.tags.join(', ')}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleTogglePublished(item)}
                className={`p-1.5 rounded-lg border text-xs ${
                  item.published ? 'border-zinc-800 text-emerald-400 hover:text-emerald-300' : 'border-zinc-800 text-zinc-500'
                }`}
                title={item.published ? 'Despublicar' : 'Publicar'}
              >
                {item.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>

              <button
                onClick={() => handleToggleFeatured(item)}
                className={`p-1.5 rounded-lg border text-xs ${
                  item.featured ? 'border-amber-500/40 text-amber-400 bg-amber-500/10' : 'border-zinc-800 text-zinc-500'
                }`}
                title="Alternar Destacado"
              >
                <Star className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleStartEdit(item)}
                className="p-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:text-brand-400 transition-colors"
                title="Editar"
              >
                <Edit2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleDelete(item.id)}
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
