import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layers, Search, Github, ExternalLink, ArrowRight, Filter } from 'lucide-react';
import { MetaTags } from '../components/seo/MetaTags';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { EmptyState } from '../components/common/EmptyState';
import { getProjects } from '../services/projectsService';
import { ProjectItem } from '../types';

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const categories = ['All', 'Cybersecurity', 'Development', 'Data'];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category.toLowerCase() === selectedCategory.toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      project.title.toLowerCase().includes(query) ||
      project.short_description.toLowerCase().includes(query) ||
      project.technologies.some(t => t.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <MetaTags 
        title="Proyectos de Software y Ciberseguridad | Jair Alexis Martinez — BLACKTECHSEC"
        description="Catálogo de proyectos de backend, seguridad aplicada, laboratorios y herramientas desarrolladas por Jair Alexis Martinez."
      />

      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="flex items-center gap-2 text-brand-400 font-mono text-xs uppercase tracking-wider">
          <Layers className="w-4 h-4" />
          <span>Ingeniería en Práctica</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 light:text-zinc-900">
          Proyectos & Soluciones
        </h1>
        <p className="text-base text-zinc-400 leading-relaxed light:text-zinc-600">
          Una muestra de software real, prototipos validados y entornos de infraestructura técnica construidos con rigor, desde APIs seguras en C# hasta pipelines de análisis en Python y evaluaciones de ciberseguridad.
        </p>
      </div>

      {/* Controls: Search and Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-800/80 light:border-zinc-200">
        
        {/* Category buttons */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`
                px-3 py-1.5 rounded-lg text-xs font-mono transition-all
                ${selectedCategory === cat 
                  ? 'bg-brand-600 text-white font-semibold shadow-sm' 
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 border border-zinc-800 light:bg-zinc-100 light:text-zinc-600 light:border-zinc-300'}
              `}
            >
              {cat === 'All' ? 'Todos' : cat}
            </button>
          ))}
        </div>

        {/* Search box */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar por tecnología, título..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 rounded-lg text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 light:bg-white light:border-zinc-300 light:text-zinc-900"
          />
        </div>

      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <EmptyState
          title="No se encontraron proyectos"
          description="Intenta cambiar los filtros de categoría o el término de búsqueda ingresado."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="flex flex-col justify-between h-full group">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant={project.status === 'Completed' ? 'success' : 'accent'}>
                    {project.status}
                  </Badge>
                  <span className="font-mono text-xs text-zinc-400 light:text-zinc-500">
                    {project.category}
                  </span>
                </div>

                <Link to={`/projects/${project.slug}`} className="block">
                  <h3 className="text-lg font-bold text-zinc-100 group-hover:text-brand-400 transition-colors light:text-zinc-900">
                    {project.title}
                  </h3>
                </Link>

                <p className="text-sm text-zinc-400 line-clamp-3 leading-relaxed light:text-zinc-600">
                  {project.short_description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.technologies.map((tech, i) => (
                    <Badge key={i} variant="outline" size="sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-zinc-800/80 flex items-center justify-between light:border-zinc-200">
                <Link
                  to={`/projects/${project.slug}`}
                  className="text-xs font-mono text-brand-400 hover:text-brand-300 flex items-center gap-1 font-semibold"
                >
                  Ver Ficha Completa <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <div className="flex items-center gap-2">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 light:hover:text-zinc-900 light:hover:bg-zinc-100"
                      title="Código fuente en GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 light:hover:text-zinc-900 light:hover:bg-zinc-100"
                      title="Ver Demo en Vivo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

    </div>
  );
};
