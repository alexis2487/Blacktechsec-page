import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, FileText, Tag, Share2 } from 'lucide-react';
import { MetaTags } from '../components/seo/MetaTags';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { getNoteBySlug } from '../services/notesService';
import { NoteItem } from '../types';

export const NoteDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [note, setNote] = useState<NoteItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (slug) {
        const data = await getNoteBySlug(slug);
        setNote(data);
      }
      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <p className="font-mono text-sm text-zinc-500 animate-pulse">Cargando nota...</p>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-4">
        <h1 className="text-2xl font-bold text-zinc-100">Nota no encontrada</h1>
        <p className="text-sm text-zinc-400">La nota técnica solicitada no existe o fue despublicada.</p>
        <Button to="/notes" variant="primary">Volver a Notas</Button>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <MetaTags 
        title={`${note.title} | Notas — BLACKTECHSEC`}
        description={note.content.slice(0, 160)}
      />

      <div>
        <Link
          to="/notes"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver a todas las notas</span>
        </Link>
      </div>

      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="accent">{note.category}</Badge>
          <span className="font-mono text-xs text-zinc-500 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {note.publication_date}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 light:text-zinc-900 leading-tight">
          {note.title}
        </h1>
      </header>

      <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 sm:p-8 text-zinc-300 light:bg-white light:border-zinc-200 light:text-zinc-700 leading-relaxed space-y-4 text-base">
        <p className="whitespace-pre-line">{note.content}</p>
      </div>

      {note.tags && note.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {note.tags.map((tag, idx) => (
            <span key={idx} className="font-mono text-xs text-zinc-400 bg-zinc-900 px-3 py-1 rounded border border-zinc-800 light:bg-zinc-100 light:border-zinc-300 light:text-zinc-700">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="pt-8 border-t border-zinc-800 flex justify-between items-center light:border-zinc-200">
        <Link to="/notes" className="text-xs font-mono text-brand-400 hover:underline">
          ← Ver más notas técnicas
        </Link>
        <Link to="/contact" className="text-xs font-mono text-zinc-400 hover:text-zinc-100">
          ¿Tienes comentarios? Escríbeme →
        </Link>
      </div>

    </article>
  );
};
