import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Video, Search, ExternalLink, ArrowRight, Share2, Youtube, Github, Globe } from 'lucide-react';
import { MetaTags } from '../components/seo/MetaTags';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { EmptyState } from '../components/common/EmptyState';
import { getContent } from '../services/contentService';
import { ContentItem } from '../types';

export const ContentPage: React.FC = () => {
  const [contentList, setContentList] = useState<ContentItem[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchContent() {
      try {
        const data = await getContent();
        setContentList(data);
      } finally {
        setLoading(false);
      }
    }
    fetchContent();
  }, []);

  const platforms = ['All', 'YouTube', 'GitHub', 'Website', 'Instagram', 'TikTok'];
  const categories = ['All', 'AI', 'Cybersecurity', 'Development', 'Technology'];

  const filteredContent = contentList.filter((item) => {
    const matchesPlatform = selectedPlatform === 'All' || item.platform.toLowerCase() === selectedPlatform.toLowerCase();
    const matchesCategory = selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.tags.some(t => t.toLowerCase().includes(query));

    return matchesPlatform && matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <MetaTags 
        title="Explorar Contenido & Publicaciones — BLACKTECHSEC"
        description="Biblioteca y archivo de publicaciones técnicas sobre desarrollo backend, inteligencia artificial, datos y ciberseguridad por Jair Alexis Martinez."
      />

      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="flex items-center gap-2 text-brand-400 font-mono text-xs uppercase tracking-wider">
          <Share2 className="w-4 h-4" />
          <span>Biblioteca & Archivo</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 light:text-zinc-900">
          Explorar Contenido & Publicaciones
        </h1>
        <p className="text-base text-zinc-400 leading-relaxed light:text-zinc-600">
          Índice unificado de publicaciones, videos, tutoriales y reflexiones técnicas compartidas en diferentes canales y plataformas tecnológicas.
        </p>
      </div>

      {/* Controls */}
      <div className="space-y-4 pt-4 border-t border-zinc-800/80 light:border-zinc-200">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          {/* Platforms */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-mono text-xs text-zinc-500 mr-2">Plataforma:</span>
            {platforms.map((plat) => (
              <button
                key={plat}
                onClick={() => setSelectedPlatform(plat)}
                className={`
                  px-2.5 py-1 rounded-md text-xs font-mono transition-all
                  ${selectedPlatform === plat 
                    ? 'bg-brand-600 text-white font-semibold' 
                    : 'bg-zinc-900 text-zinc-400 hover:text-zinc-100 border border-zinc-800 light:bg-zinc-100 light:text-zinc-600 light:border-zinc-300'}
                `}
              >
                {plat === 'All' ? 'Todas' : plat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Filtrar contenidos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 rounded-lg text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-brand-500 light:bg-white light:border-zinc-300 light:text-zinc-900"
            />
          </div>

        </div>

      </div>

      {/* Grid */}
      {filteredContent.length === 0 ? (
        <EmptyState
          title="No se encontraron publicaciones"
          description="Prueba seleccionando otra plataforma o limpiando el filtro de búsqueda."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent.map((item) => (
            <Card key={item.id} className="flex flex-col justify-between h-full group">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="accent">
                    {item.platform}
                  </Badge>
                  <span className="font-mono text-xs text-zinc-500">
                    {item.publication_date}
                  </span>
                </div>

                <Link to={`/content/${item.slug}`} className="block">
                  <h3 className="text-lg font-bold text-zinc-100 group-hover:text-brand-400 transition-colors light:text-zinc-900">
                    {item.title}
                  </h3>
                </Link>

                <p className="text-sm text-zinc-400 line-clamp-3 leading-relaxed light:text-zinc-600">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.tags.map((tag, i) => (
                    <span key={i} className="font-mono text-[11px] text-zinc-400 bg-zinc-800/60 px-2 py-0.5 rounded light:bg-zinc-200 light:text-zinc-700">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-zinc-800/80 flex items-center justify-between light:border-zinc-200">
                <Link
                  to={`/content/${item.slug}`}
                  className="text-xs font-mono text-brand-400 hover:text-brand-300 flex items-center gap-1 font-medium"
                >
                  Leer Contexto <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {item.external_url && (
                  <a
                    href={item.external_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 rounded text-zinc-400 hover:text-zinc-100 flex items-center gap-1 text-xs font-mono light:hover:text-zinc-900"
                  >
                    <span>Ver en {item.platform}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
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
