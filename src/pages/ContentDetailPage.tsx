import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Calendar, Share2, Tag, Eye } from 'lucide-react';
import { MetaTags } from '../components/seo/MetaTags';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { getContentBySlug } from '../services/contentService';
import { ContentItem } from '../types';

export const ContentDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [item, setItem] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (slug) {
        const data = await getContentBySlug(slug);
        setItem(data);
      }
      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <p className="font-mono text-sm text-zinc-500 animate-pulse">Cargando publicación...</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-4">
        <h1 className="text-2xl font-bold text-zinc-100">Publicación no encontrada</h1>
        <p className="text-sm text-zinc-400">El contenido solicitado no se encuentra disponible.</p>
        <Button to="/content" variant="primary">Volver a Contenido</Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <MetaTags 
        title={`${item.title} | Contenido — BLACKTECHSEC`}
        description={item.description}
      />

      <div>
        <Link
          to="/content"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver a la biblioteca de contenido</span>
        </Link>
      </div>

      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="accent">{item.platform}</Badge>
          <Badge variant="outline">{item.category}</Badge>
          <span className="font-mono text-xs text-zinc-500 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {item.publication_date}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 light:text-zinc-900 leading-tight">
          {item.title}
        </h1>

        <p className="text-lg text-zinc-300 light:text-zinc-700 leading-relaxed">
          {item.description}
        </p>

        {item.external_url && (
          <div className="pt-2">
            <Button
              href={item.external_url}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              icon={<ExternalLink className="w-4 h-4" />}
            >
              Abrir publicación original en {item.platform}
            </Button>
          </div>
        )}
      </header>

      {item.content && (
        <Card className="p-8 space-y-4">
          <h2 className="text-xl font-bold text-zinc-100 light:text-zinc-900">
            Notas & Contexto Adicional
          </h2>
          <div className="text-zinc-300 light:text-zinc-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
            {item.content}
          </div>
        </Card>
      )}

      {item.tags && item.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-4">
          {item.tags.map((tag, idx) => (
            <span key={idx} className="font-mono text-xs text-zinc-400 bg-zinc-900 px-3 py-1 rounded border border-zinc-800 light:bg-zinc-100 light:border-zinc-300 light:text-zinc-700">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="pt-8 border-t border-zinc-800 flex justify-between items-center light:border-zinc-200">
        <Link to="/content" className="text-xs font-mono text-brand-400 hover:underline">
          ← Explorar más contenido
        </Link>
        <Link to="/contact" className="text-xs font-mono text-zinc-400 hover:text-zinc-100">
          Contacto profesional →
        </Link>
      </div>

    </div>
  );
};
