import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Search, ArrowRight, Calendar } from 'lucide-react';
import { MetaTags } from '../components/seo/MetaTags';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { EmptyState } from '../components/common/EmptyState';
import { getNotes } from '../services/notesService';
import { NoteItem } from '../types';

export const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const data = await getNotes();
        setNotes(data.filter(n => n.published));
      } finally {
        setLoading(false);
      }
    }
    fetchNotes();
  }, []);

  const filteredNotes = notes.filter((note) => {
    const query = searchQuery.toLowerCase();
    return (
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query) ||
      note.tags.some(t => t.toLowerCase().includes(query))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <MetaTags 
        title="Notas Técnicas & Bitácora | Jair Alexis Martinez — BLACKTECHSEC"
        description="Notas breves de ingeniería, trucos de desarrollo backend, hardening en Linux y lecciones de ciberseguridad."
      />

      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="flex items-center gap-2 text-accent-emerald font-mono text-xs uppercase tracking-wider">
          <FileText className="w-4 h-4" />
          <span>Bitácora de Aprendizaje</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 light:text-zinc-900">
          Notas Técnicas & Documentación
        </h1>
        <p className="text-base text-zinc-400 leading-relaxed light:text-zinc-600">
          Un cuaderno digital de hallazgos prácticos: configuraciones útiles, scripts cortos, soluciones a errores complejos y aprendizajes recopilados durante la construcción de software y laboratorios.
        </p>
      </div>

      {/* Search */}
      <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between gap-4 light:border-zinc-200">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar notas por etiqueta o tema..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 rounded-lg text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-brand-500 light:bg-white light:border-zinc-300 light:text-zinc-900"
          />
        </div>
      </div>

      {/* Grid */}
      {filteredNotes.length === 0 ? (
        <EmptyState
          title="No se encontraron notas técnicas"
          description="Intenta buscar con otros términos o palabras clave."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <Card key={note.id} className="flex flex-col justify-between h-full group">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <Badge variant="accent" size="sm">{note.category}</Badge>
                  <span className="text-zinc-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {note.publication_date}
                  </span>
                </div>

                <Link to={`/notes/${note.slug}`} className="block">
                  <h3 className="text-lg font-bold text-zinc-100 group-hover:text-brand-400 transition-colors light:text-zinc-900">
                    {note.title}
                  </h3>
                </Link>

                <p className="text-sm text-zinc-400 line-clamp-3 leading-relaxed light:text-zinc-600">
                  {note.content}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {note.tags.map((tag, idx) => (
                    <span key={idx} className="font-mono text-[11px] text-zinc-400 bg-zinc-800/60 px-2 py-0.5 rounded light:bg-zinc-200 light:text-zinc-700">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-zinc-800/80 flex items-center justify-between light:border-zinc-200">
                <Link
                  to={`/notes/${note.slug}`}
                  className="text-xs font-mono text-brand-400 hover:text-brand-300 flex items-center gap-1 font-semibold"
                >
                  Leer Nota <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}

    </div>
  );
};
