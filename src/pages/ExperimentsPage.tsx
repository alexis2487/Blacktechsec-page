import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Search, ArrowRight, Github, FlaskConical, Calendar } from 'lucide-react';
import { MetaTags } from '../components/seo/MetaTags';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { EmptyState } from '../components/common/EmptyState';
import { getExperiments } from '../services/experimentsService';
import { ExperimentItem } from '../types';

export const ExperimentsPage: React.FC = () => {
  const [experiments, setExperiments] = useState<ExperimentItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchExperiments() {
      try {
        const data = await getExperiments();
        setExperiments(data);
      } finally {
        setLoading(false);
      }
    }
    fetchExperiments();
  }, []);

  const filteredExperiments = experiments.filter((exp) => {
    const query = searchQuery.toLowerCase();
    return (
      exp.title.toLowerCase().includes(query) ||
      exp.description.toLowerCase().includes(query) ||
      exp.technologies.some(t => t.toLowerCase().includes(query))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <MetaTags 
        title="Laboratorio de Experimentos & Prototipos | Jair Alexis Martinez — BLACKTECHSEC"
        description="Espacio experimental de pruebas técnicas, scripts, pruebas de concepto con IA y prototipos rápidos."
      />

      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="flex items-center gap-2 text-accent-cyan font-mono text-xs uppercase tracking-wider">
          <FlaskConical className="w-4 h-4" />
          <span>Laboratorio de Pruebas</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 light:text-zinc-900">
          Experimentos & Prototipos
        </h1>
        <p className="text-base text-zinc-400 leading-relaxed light:text-zinc-600">
          No todo desarrollo tiene que ser un producto terminado. Este espacio reúne investigaciones personales, pruebas con nuevas tecnologías, scripts de automatización e ideas técnicas en desarrollo activo.
        </p>
      </div>

      {/* Search */}
      <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between gap-4 light:border-zinc-200">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar experimentos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 rounded-lg text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-brand-500 light:bg-white light:border-zinc-300 light:text-zinc-900"
          />
        </div>
      </div>

      {/* Grid */}
      {filteredExperiments.length === 0 ? (
        <EmptyState
          title="No se encontraron experimentos"
          description="Intenta buscar con otros términos de tecnología o herramientas."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperiments.map((exp) => (
            <Card key={exp.id} className="flex flex-col justify-between h-full group">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <Badge variant="outline">{exp.status}</Badge>
                  <span className="text-zinc-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {exp.publication_date}
                  </span>
                </div>

                <Link to={`/experiments/${exp.slug}`} className="block">
                  <h3 className="text-lg font-bold text-zinc-100 group-hover:text-accent-cyan transition-colors light:text-zinc-900">
                    {exp.title}
                  </h3>
                </Link>

                <p className="text-sm text-zinc-400 line-clamp-3 leading-relaxed light:text-zinc-600">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {exp.technologies.map((t, idx) => (
                    <Badge key={idx} variant="default" size="sm">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-zinc-800/80 flex items-center justify-between light:border-zinc-200">
                <Link
                  to={`/experiments/${exp.slug}`}
                  className="text-xs font-mono text-accent-cyan hover:underline flex items-center gap-1 font-semibold"
                >
                  Ver Detalles <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {exp.github_url && (
                  <a
                    href={exp.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 text-zinc-400 hover:text-zinc-100 light:hover:text-zinc-900"
                    title="Ver en GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

    </div>
  );
};
