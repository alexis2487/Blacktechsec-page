import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Terminal, 
  ArrowRight, 
  Download, 
  Github, 
  Linkedin, 
  ExternalLink, 
  Code2, 
  Shield, 
  Cpu, 
  Database, 
  Sparkles,
  Compass,
  FileText,
  Layers
} from 'lucide-react';
import { MetaTags } from '../components/seo/MetaTags';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { getProfile } from '../services/profileService';
import { getFeaturedProjects } from '../services/projectsService';
import { getFeaturedContent } from '../services/contentService';
import { getLatestExperiments } from '../services/experimentsService';
import { getLatestNotes } from '../services/notesService';
import { ProfileInfo, ProjectItem, ContentItem, ExperimentItem, NoteItem } from '../types';

export const HomePage: React.FC = () => {
  const [profile, setProfile] = useState<ProfileInfo | null>(null);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [content, setContent] = useState<ContentItem[]>([]);
  const [experiments, setExperiments] = useState<ExperimentItem[]>([]);
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [profData, projData, contData, expData, noteData] = await Promise.all([
          getProfile(),
          getFeaturedProjects(),
          getFeaturedContent(),
          getLatestExperiments(3),
          getLatestNotes(3)
        ]);
        setProfile(profData);
        setProjects(projData);
        setContent(contData);
        setExperiments(expData);
        setNotes(noteData);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-24 py-8 sm:py-12">
      <MetaTags 
        title="BLACKTECHSEC — Personal Technology Hub | Jair Alexis Martinez"
        description="Espacio tecnológico personal de Jair Alexis Martinez, Ingeniero de Sistemas. Explorando tecnología, IA, ciberseguridad, desarrollo backend y análisis de datos. Learn. Build. Explore. Share."
      />

      {/* =========================================================================
          HERO SECTION
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-gradient-to-b from-zinc-900/90 via-zinc-900/40 to-zinc-950 p-8 sm:p-12 lg:p-16 light:from-white light:via-zinc-50 light:to-zinc-100 light:border-zinc-200">
          
          {/* Subtle background tech glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Text & Bio */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Brand & Pill Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="accent">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse mr-1.5" />
                  BLACKTECHSEC
                </Badge>
                <Badge variant="outline">
                  BLACK TECHNOLOGY SECURITY
                </Badge>
                <Badge variant="success">
                  Disponible Remoto LATAM
                </Badge>
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-100 light:text-zinc-900">
                  Jair Alexis Martinez
                </h1>
                <p className="font-mono text-base sm:text-lg text-brand-400 font-medium light:text-brand-600">
                  Ingeniero de Sistemas · Technology · AI · Cybersecurity · Development
                </p>
              </div>

              {/* Honest presentation text */}
              <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed light:text-zinc-700">
                {profile?.bio || 'Exploro tecnología, inteligencia artificial, ciberseguridad y desarrollo backend mientras construyo proyectos y comparto lo que voy aprendiendo.'}
              </p>

              {/* Philosophy Mantra */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 light:bg-zinc-100 light:border-zinc-300 light:text-zinc-800">
                <span className="text-brand-400 font-bold">PHILOSOPHY:</span>
                <span>LEARN. BUILD. EXPLORE. SHARE.</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <Button to="/projects" variant="primary" size="lg" icon={<Code2 className="w-4 h-4" />}>
                  Ver Proyectos
                </Button>
                
                <Button 
                  href="/Curriculum_Vitae.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  variant="secondary" 
                  size="lg" 
                  icon={<Download className="w-4 h-4" />}
                >
                  Descargar CV
                </Button>

                <Button 
                  href="https://github.com/alexis2487" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  variant="outline" 
                  size="lg" 
                  icon={<Github className="w-4 h-4" />}
                >
                  GitHub
                </Button>
              </div>

            </div>

            {/* Right Column: Profile Picture and Live Status */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center">
              <div className="relative group">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-brand-500 to-accent-cyan opacity-40 blur group-hover:opacity-75 transition duration-300" />
                <img
                  src="/img/profile.jpg"
                  alt="Foto de perfil de Jair Alexis Martinez"
                  className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full object-cover border-2 border-zinc-700/80 shadow-2xl light:border-zinc-300"
                  onError={(e) => {
                    // Fallback to placeholder if asset load fails
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1534972195531-a756b1140f6c?w=400&h=400&fit=crop';
                  }}
                />
              </div>

              {/* Location and Specialization pill */}
              <div className="mt-6 text-center space-y-1">
                <p className="font-mono text-xs text-zinc-400 light:text-zinc-600">
                  📍 {profile?.location || 'Colombia · Remoto LATAM'}
                </p>
                <p className="font-mono text-xs text-emerald-400">
                  ● {profile?.availability || 'Disponible para colaboración'}
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          CURRENTLY EXPLORING (REQ 24)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-brand-400 font-mono text-xs uppercase tracking-wider">
                <Compass className="w-4 h-4" />
                <span>Enfoque Continuo</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 light:text-zinc-900">
                Actualmente Explorando & Construyendo
              </h2>
            </div>
            <Link to="/about" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-brand-400 hover:text-brand-300">
              Ver perfil completo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(profile?.currentlyExploring || []).map((topic, index) => {
              const icons = [Cpu, Shield, Code2, Database, Sparkles];
              const IconComp = icons[index % icons.length];
              return (
                <Card key={index} className="flex items-start gap-4 p-5">
                  <div className="p-2.5 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20 light:bg-brand-50 light:text-brand-600 light:border-brand-200">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-zinc-200 light:text-zinc-800 leading-snug">
                      {topic}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 light:text-zinc-500 font-mono">
                      Investigación & Práctica
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          FEATURED PROJECTS (REQ 26)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-brand-400 font-mono text-xs uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>Casos Prácticos & Software</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 light:text-zinc-900">
                Proyectos Destacados
              </h2>
            </div>
            <Link to="/projects" className="inline-flex items-center gap-1 text-sm font-medium text-brand-400 hover:text-brand-300">
              Todos los proyectos ({projects.length}) <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
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
                    {project.technologies.slice(0, 4).map((tech, i) => (
                      <Badge key={i} variant="outline" size="sm">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 4 && (
                      <Badge variant="ghost" size="sm">
                        +{project.technologies.length - 4}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-800/80 flex items-center justify-between light:border-zinc-200">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="text-xs font-mono text-brand-400 hover:text-brand-300 flex items-center gap-1"
                  >
                    Detalles completos <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-zinc-100 p-1 light:hover:text-zinc-900"
                      title="Ver repositorio en GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          LATEST EXPERIMENTS & LATEST NOTES (GRID DUAL) (REQ 27 & 28)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Column 1: Latest Experiments */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-accent-cyan font-mono text-xs uppercase tracking-wider">
                  <Cpu className="w-4 h-4" />
                  <span>Laboratorio Técnico</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 light:text-zinc-900">
                  Últimos Experimentos
                </h3>
              </div>
              <Link to="/experiments" className="text-xs font-mono text-brand-400 hover:text-brand-300 flex items-center gap-1">
                Ver todos <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-4">
              {experiments.map((exp) => (
                <Card key={exp.id} className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <Badge variant="outline" size="sm">{exp.category}</Badge>
                    <span className="text-zinc-400 light:text-zinc-500">{exp.publication_date}</span>
                  </div>
                  <Link to={`/experiments/${exp.slug}`}>
                    <h4 className="font-semibold text-base text-zinc-100 hover:text-brand-400 transition-colors light:text-zinc-900">
                      {exp.title}
                    </h4>
                  </Link>
                  <p className="text-xs text-zinc-400 line-clamp-2 light:text-zinc-600 leading-relaxed">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {exp.technologies.map((t, idx) => (
                      <span key={idx} className="font-mono text-[11px] text-zinc-400 light:text-zinc-600 bg-zinc-800/60 px-2 py-0.5 rounded light:bg-zinc-200">
                        #{t}
                      </span>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Column 2: Latest Notes */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-accent-emerald font-mono text-xs uppercase tracking-wider">
                  <FileText className="w-4 h-4" />
                  <span>Documentación Personal</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 light:text-zinc-900">
                  Notas Técnicas
                </h3>
              </div>
              <Link to="/notes" className="text-xs font-mono text-brand-400 hover:text-brand-300 flex items-center gap-1">
                Ver todas <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-4">
              {notes.map((note) => (
                <Card key={note.id} className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <Badge variant="accent" size="sm">{note.category}</Badge>
                    <span className="text-zinc-400 light:text-zinc-500">{note.publication_date}</span>
                  </div>
                  <Link to={`/notes/${note.slug}`}>
                    <h4 className="font-semibold text-base text-zinc-100 hover:text-brand-400 transition-colors light:text-zinc-900">
                      {note.title}
                    </h4>
                  </Link>
                  <p className="text-xs text-zinc-400 line-clamp-2 light:text-zinc-600 leading-relaxed">
                    {note.content}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {note.tags.map((tag, idx) => (
                      <span key={idx} className="font-mono text-[11px] text-zinc-400 light:text-zinc-600 bg-zinc-800/60 px-2 py-0.5 rounded light:bg-zinc-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          FEATURED CONTENT / MULTIMEDIA (REQ 25)
          ========================================================================= */}
      {content.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-brand-400 font-mono text-xs uppercase tracking-wider">
                  <Code2 className="w-4 h-4" />
                  <span>Biblioteca & Divulgación</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 light:text-zinc-900">
                  Publicaciones & Contenido
                </h2>
              </div>
              <Link to="/content" className="inline-flex items-center gap-1 text-sm font-medium text-brand-400 hover:text-brand-300">
                Ver todo <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.map((item) => (
                <Card key={item.id} className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <Badge variant="accent">{item.platform}</Badge>
                    <span className="text-zinc-400 light:text-zinc-500">{item.publication_date}</span>
                  </div>
                  <Link to={`/content/${item.slug}`}>
                    <h3 className="text-lg font-bold text-zinc-100 hover:text-brand-400 transition-colors light:text-zinc-900">
                      {item.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-zinc-400 leading-relaxed light:text-zinc-600">
                    {item.description}
                  </p>
                  <div className="pt-2 flex items-center justify-between">
                    <Link to={`/content/${item.slug}`} className="text-xs font-mono text-brand-400 hover:underline flex items-center gap-1">
                      Leer contexto <ArrowRight className="w-3 h-3" />
                    </Link>
                    {item.external_url && (
                      <a 
                        href={item.external_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-zinc-400 hover:text-zinc-100 flex items-center gap-1"
                      >
                        Enlace externo <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          CALL TO ACTION / CONTACT TEASER (REQ 12 & 35)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-zinc-800 bg-gradient-to-r from-zinc-900 via-zinc-900/60 to-zinc-950 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 light:from-white light:via-zinc-50 light:to-zinc-100 light:border-zinc-200">
          <div className="space-y-3 max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-zinc-100 light:text-zinc-900">
              ¿Conversamos sobre tecnología o proyectos?
            </h3>
            <p className="text-sm sm:text-base text-zinc-400 light:text-zinc-600 leading-relaxed">
              Siempre interesado en intercambiar ideas sobre desarrollo backend, ciberseguridad, automatización y análisis de datos.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button to="/contact" variant="primary" size="lg">
              Enviar Mensaje
            </Button>
            <Button 
              href="https://www.linkedin.com/in/jair-alexis-martinez-302b78305/" 
              target="_blank" 
              rel="noopener noreferrer" 
              variant="outline" 
              size="lg"
              icon={<Linkedin className="w-4 h-4" />}
            >
              LinkedIn
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
};
