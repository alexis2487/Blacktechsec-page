import React, { useEffect, useState } from 'react';
import { FileText, Plus, Edit2, Trash2, Check, X, Save, Eye, EyeOff } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { getNotes, saveNote, deleteNote } from '../../services/notesService';
import { NoteItem } from '../../types';

export const AdminNotesPage: React.FC = () => {
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingNote, setEditingNote] = useState<Partial<NoteItem> | null>(null);
  const [tagInput, setTagInput] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    const data = await getNotes();
    setNotes(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStartCreate = () => {
    setEditingNote({
      title: '',
      slug: '',
      content: '',
      category: 'Development',
      tags: [],
      publication_date: new Date().toISOString().split('T')[0],
      published: true
    });
    setTagInput('');
  };

  const handleStartEdit = (n: NoteItem) => {
    setEditingNote({ ...n });
    setTagInput((n.tags || []).join(', '));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNote?.title || !editingNote?.content) {
      alert('El título y el contenido son obligatorios.');
      return;
    }

    const tags = tagInput.split(',').map(t => t.trim()).filter(Boolean);
    const slug = editingNote.slug || editingNote.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const payload: Partial<NoteItem> = {
      ...editingNote,
      slug,
      tags
    };

    const { error } = await saveNote(payload);
    if (error) {
      alert(`Error al guardar: ${error}`);
    } else {
      setFeedback('Nota técnica guardada.');
      setTimeout(() => setFeedback(null), 3000);
      setEditingNote(null);
      await loadData();
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Eliminar esta nota técnica?')) {
      await deleteNote(id);
      await loadData();
    }
  };

  const handleTogglePublished = async (n: NoteItem) => {
    await saveNote({ ...n, published: !n.published });
    await loadData();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100 light:text-zinc-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-accent-emerald" />
            <span>Administrar Notas Técnicas</span>
          </h1>
          <p className="text-xs font-mono text-zinc-400">
            Documentación personal y descubrimientos técnicos
          </p>
        </div>

        <Button onClick={handleStartCreate} variant="primary" icon={<Plus className="w-4 h-4" />}>
          Nueva Nota
        </Button>
      </div>

      {feedback && (
        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      {editingNote && (
        <Card className="p-6 border-accent-emerald/50 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <h3 className="font-bold text-base text-zinc-100 light:text-zinc-900">
              {editingNote.id ? 'Editar Nota' : 'Nueva Nota'}
            </h3>
            <button onClick={() => setEditingNote(null)} className="text-zinc-400 hover:text-zinc-100">
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
                  value={editingNote.title || ''}
                  onChange={e => setEditingNote({ ...editingNote, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-brand-500 light:bg-white light:border-zinc-300 light:text-zinc-900"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Slug</label>
                <input
                  type="text"
                  value={editingNote.slug || ''}
                  onChange={e => setEditingNote({ ...editingNote, slug: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-brand-500 light:bg-white light:border-zinc-300 light:text-zinc-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Categoría</label>
                <input
                  type="text"
                  value={editingNote.category || ''}
                  onChange={e => setEditingNote({ ...editingNote, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-brand-500 light:bg-white light:border-zinc-300 light:text-zinc-900"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Fecha</label>
                <input
                  type="date"
                  value={editingNote.publication_date || ''}
                  onChange={e => setEditingNote({ ...editingNote, publication_date: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-brand-500 light:bg-white light:border-zinc-300 light:text-zinc-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Contenido de la Nota *</label>
              <textarea
                required
                rows={6}
                value={editingNote.content || ''}
                onChange={e => setEditingNote({ ...editingNote, content: e.target.value })}
                className="w-full px-3 py-2 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-brand-500 light:bg-white light:border-zinc-300 light:text-zinc-900"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Etiquetas (separadas por coma)</label>
              <input
                type="text"
                placeholder="Python, Linux, Hardening, DAX"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-brand-500 light:bg-white light:border-zinc-300 light:text-zinc-900"
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={Boolean(editingNote.published)}
                onChange={e => setEditingNote({ ...editingNote, published: e.target.checked })}
                className="rounded border-zinc-700 text-brand-600 focus:ring-brand-500"
              />
              <span className="text-xs font-mono text-zinc-300 light:text-zinc-700">Publicar de inmediato</span>
            </label>

            <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
              <Button type="button" variant="secondary" onClick={() => setEditingNote(null)}>
                Cancelar
              </Button>
              <Button type="submit" variant="primary" icon={<Save className="w-4 h-4" />}>
                Guardar Nota
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* List */}
      <div className="space-y-3">
        {notes.map(note => (
          <Card key={note.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-zinc-100 light:text-zinc-900">{note.title}</h3>
                <Badge variant="accent" size="sm">{note.category}</Badge>
                {note.published ? (
                  <Badge variant="success" size="sm">Publicada</Badge>
                ) : (
                  <Badge variant="outline" size="sm">Borrador</Badge>
                )}
              </div>
              <p className="text-xs text-zinc-400 line-clamp-1 light:text-zinc-600">{note.content}</p>
              <p className="font-mono text-[11px] text-zinc-500">{note.publication_date} · {note.tags.join(', ')}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleTogglePublished(note)}
                className={`p-1.5 rounded-lg border text-xs ${
                  note.published ? 'border-zinc-800 text-emerald-400' : 'border-zinc-800 text-zinc-500'
                }`}
                title={note.published ? 'Despublicar' : 'Publicar'}
              >
                {note.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>

              <button
                onClick={() => handleStartEdit(note)}
                className="p-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:text-brand-400 transition-colors"
                title="Editar"
              >
                <Edit2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleDelete(note.id)}
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
