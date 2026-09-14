import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, Calendar, Layers, ShieldCheck, Tag } from 'lucide-react';
import { MetaTags } from '../components/seo/MetaTags';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { getProjectBySlug } from '../services/projectsService';
import { ProjectItem } from '../types';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<ProjectItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (slug) {
        const data = await getProjectBySlug(slug);
        setProject(data);
      }
      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <p className="font-mono text-sm text-zinc-500 animate-pulse">Cargando proyecto...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-4">
        <h1 className="text-2xl font-bold text-zinc-100">Proyecto no encontrado</h1>
        <p className="text-sm text-zinc-400">El proyecto solicitado no existe o fue reorganizado.</p>
        <Button to="/projects" variant="primary">Volver a Proyectos</Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <MetaTags 
        title={`${project.title} | Proyectos — BLACKTECHSEC`}
        description={project.short_description}
        url={window.location.href}
      />

      {/* Back button */}
      <div>
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al catálogo de proyectos</span>
        </Link>
      </div>

      {/* Header section */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={project.status === 'Completed' ? 'success' : 'accent'}>
            {project.status}
          </Badge>
          <Badge variant="outline">
            {project.category}
          </Badge>
          {project.created_at && (
            <span className="font-mono text-xs text-zinc-500 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(project.created_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'short' })}
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 light:text-zinc-900 leading-tight">
          {project.title}
        </h1>

        <p className="text-lg text-zinc-300 light:text-zinc-700 leading-relaxed font-normal">
          {project.short_description}
        </p>

        {/* Action Links */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          {project.github_url && (
            <Button
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              icon={<Github className="w-4 h-4" />}
            >
              Ver Código en GitHub
            </Button>
          )}

          {project.live_url && (
            <Button
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              icon={<ExternalLink className="w-4 h-4" />}
            >
              Demo en Vivo
            </Button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="space-y-8">
        
        {/* Full description */}
        <Card className="p-8 space-y-6">
          <h2 className="text-xl font-bold text-zinc-100 light:text-zinc-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-400" />
            <span>Detalle Técnico y Alcance</span>
          </h2>
          <div className="prose prose-invert max-w-none text-zinc-300 light:text-zinc-700 leading-relaxed text-sm sm:text-base space-y-4">
            <p className="whitespace-pre-line">{project.full_description}</p>
          </div>
        </Card>

        {/* Technologies Breakdown */}
        <Card className="p-6 space-y-4">
          <h3 className="font-mono text-xs uppercase tracking-wider text-brand-400 font-bold flex items-center gap-1.5 light:text-brand-600">
            <Tag className="w-3.5 h-3.5" />
            <span>Stack Tecnológico & Herramientas</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <Badge key={index} variant="default" size="md">
                {tech}
              </Badge>
            ))}
          </div>
        </Card>

      </main>

      {/* Footer nav */}
      <div className="pt-8 border-t border-zinc-800 flex justify-between items-center light:border-zinc-200">
        <Link to="/projects" className="text-xs font-mono text-brand-400 hover:underline">
          ← Explorar más proyectos
        </Link>
        <Link to="/contact" className="text-xs font-mono text-zinc-400 hover:text-zinc-100">
          ¿Tienes preguntas sobre este proyecto? Contáctame →
        </Link>
      </div>

    </div>
  );
};
