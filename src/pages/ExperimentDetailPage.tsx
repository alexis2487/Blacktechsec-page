import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Github, Calendar, Cpu, FlaskConical, Tag } from 'lucide-react';
import { MetaTags } from '../components/seo/MetaTags';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { getExperimentBySlug } from '../services/experimentsService';
import { ExperimentItem } from '../types';

export const ExperimentDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [experiment, setExperiment] = useState<ExperimentItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (slug) {
        const data = await getExperimentBySlug(slug);
        setExperiment(data);
      }
      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <p className="font-mono text-sm text-zinc-500 animate-pulse">Cargando experimento...</p>
      </div>
    );
  }

  if (!experiment) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-4">
        <h1 className="text-2xl font-bold text-zinc-100">Experimento no encontrado</h1>
        <p className="text-sm text-zinc-400">El experimento solicitado no existe.</p>
        <Button to="/experiments" variant="primary">Volver a Experimentos</Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <MetaTags 
        title={`${experiment.title} | Experimentos — BLACKTECHSEC`}
        description={experiment.description}
      />

      <div>
        <Link
          to="/experiments"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al laboratorio de experimentos</span>
        </Link>
      </div>

      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="accent">{experiment.status}</Badge>
          <Badge variant="outline">{experiment.category}</Badge>
          <span className="font-mono text-xs text-zinc-500 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {experiment.publication_date}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 light:text-zinc-900 leading-tight">
          {experiment.title}
        </h1>

        <p className="text-lg text-zinc-300 light:text-zinc-700 leading-relaxed font-normal">
          {experiment.description}
        </p>

        {experiment.github_url && (
          <div className="pt-2">
            <Button
              href={experiment.github_url}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              icon={<Github className="w-4 h-4" />}
            >
              Ver Código / Script en GitHub
            </Button>
          </div>
        )}
      </header>

      <main className="space-y-8">
        <Card className="p-8 space-y-4">
          <h2 className="text-xl font-bold text-zinc-100 light:text-zinc-900 flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-accent-cyan" />
            <span>Hipótesis, Pruebas y Resultados</span>
          </h2>
          <div className="text-zinc-300 light:text-zinc-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
            {experiment.content}
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="font-mono text-xs uppercase tracking-wider text-accent-cyan font-bold flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5" />
            <span>Tecnologías & Herramientas Involucradas</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {experiment.technologies.map((tech, index) => (
              <Badge key={index} variant="default" size="md">
                {tech}
              </Badge>
            ))}
          </div>
        </Card>
      </main>

      <div className="pt-8 border-t border-zinc-800 flex justify-between items-center light:border-zinc-200">
        <Link to="/experiments" className="text-xs font-mono text-accent-cyan hover:underline">
          ← Explorar más experimentos
        </Link>
        <Link to="/contact" className="text-xs font-mono text-zinc-400 hover:text-zinc-100">
          ¿Tienes sugerencias para este experimento? Contáctame →
        </Link>
      </div>

    </div>
  );
};
