import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Terminal, 
  ArrowRight, 
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
  Layers,
  Activity,
  User,
  Download,
  Mail,
  Network,
  Youtube
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

  // Curated exploration areas with detailed descriptions
  const explorationAreas = [
    {
      title: 'Inteligencia Artificial & Copilot Agents',
      description: 'Investigación en agentes autónomos, modelos de lenguaje, flujos en Copilot Studio y herramientas generativas para desarrollo de software.',
      icon: Sparkles,
      tag: '#AI #AGENTS',
      accent: 'text-amber-400 bg-amber-500/10 border-amber-500/20'
    },
    {
      title: 'Ciberseguridad Aplicada & Hardening',
      description: 'Diagnósticos de madurez para MiPymes, bastionado de entornos Linux/Windows, análisis de telemetría y seguridad defensiva.',
      icon: Shield,
      tag: '#SECURITY #DEFENSE',
      accent: 'text-brand-400 bg-brand-500/10 border-brand-500/20'
    },
    {
      title: 'Ingeniería Backend & APIs Distribuidas',
      description: 'Arquitecturas modulares, diseño de APIs RESTful robustas en C# / ASP.NET Core y Python con persistencia en SQL Server y relacional.',
      icon: Code2,
      tag: '#BACKEND #DOTNET',
      accent: 'text-accent-cyan bg-accent-cyan/10 border-accent-cyan/20'
    },
    {
      title: 'Pipelines de Datos & Business Intelligence',
      description: 'Modelado analítico, transformación ETL con Pandas y Python, y construcción de tableros interactivos de telemetría en Power BI.',
      icon: Database,
      tag: '#DATA #POWERBI',
      accent: 'text-accent-emerald bg-accent-emerald/10 border-accent-emerald/20'
    },
    {
      title: 'Automatización & Developer Experience',
      description: 'Scripting avanzado en PowerShell y Bash, flujos de CI/CD en GitHub Actions y optimización de entornos de ingeniería de sistemas.',
      icon: Cpu,
      tag: '#AUTOMATION #DEVOPS',
      accent: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20'
    },
    {
      title: 'Redes & Infraestructura Segura',
      description: 'Modelado de topologías de red en Cisco Packet Tracer, segmentación, análisis de protocolos IPv4/IPv6 y directivas de control de acceso.',
      icon: Network,
      tag: '#NETWORKING #CISCO',
      accent: 'text-rose-400 bg-rose-500/10 border-rose-500/20'
    }
  ];

  return (
    <div className="space-y-24 py-8 sm:py-12">
      <MetaTags 
        title="BLACKTECHSEC — Personal Technology Hub | Jair Alexis Martinez"
        description="Espacio tecnológico personal de Jair Alexis Martinez. Explorando tecnología, inteligencia artificial, ciberseguridad, desarrollo de software y datos. Learn. Build. Explore. Share."
      />

      {/* =========================================================================
          HERO SECTION — PERSONAL TECHNOLOGY HUB
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-gradient-to-b from-zinc-900/90 via-zinc-900/40 to-zinc-950 p-8 sm:p-12 lg:p-16 light:from-white light:via-zinc-50 light:to-zinc-100 light:border-zinc-200">
          
          {/* Subtle background tech glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Brand & Editorial Statement */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Brand & Pill Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="accent">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse mr-1.5" />
                  BLACKTECHSEC
                </Badge>
                <Badge variant="outline">
                  BLACK TECHNOLOGY SECURITY
                </Badge>
                <Badge variant="ghost">
                  Personal Technology Hub
                </Badge>
              </div>

              {/* Main Headline */}
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-100 light:text-zinc-900">
                  BLACKTECHSEC
                </h1>
                <p className="font-mono text-sm sm:text-base text-brand-400 font-medium light:text-brand-600">
                  Technology · AI · Cybersecurity · Development
                </p>
                <p className="text-xl sm:text-2xl text-zinc-200 font-semibold tracking-tight light:text-zinc-800">
                  &ldquo;Exploro tecnología, construyo cosas y comparto lo que aprendo.&rdquo;
                </p>
              </div>

              {/* Honest presentation text */}
              <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed light:text-zinc-700">
                Un espacio personal para documentar proyectos de ingeniería, experimentos prácticos, notas de investigación y descubrimientos alrededor del desarrollo de software, la ciberseguridad, la inteligencia artificial y los datos.
              </p>

              {/* Author Attribution & Philosophy Mantra */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-300 light:bg-zinc-100 light:border-zinc-300 light:text-zinc-800">
                  <User className="w-3.5 h-3.5 text-brand-400" />
                  <span>Por <strong>Jair Alexis Martinez</strong> · Ingeniero de Sistemas</span>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-300 light:bg-zinc-100 light:border-zinc-300 light:text-zinc-800">
                  <span className="text-brand-400 font-bold">MANTRA:</span>
                  <span>LEARN. BUILD. EXPLORE. SHARE.</span>
                </div>
              </div>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <Button to="/content" variant="primary" size="lg" icon={<Compass className="w-4 h-4" />}>
                  Explorar Contenido
                </Button>
                
                <Button to="/projects" variant="secondary" size="lg" icon={<Code2 className="w-4 h-4" />}>
                  Ver Proyectos
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

            {/* Right Column: Technical Node Status Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6 shadow-2xl backdrop-blur-sm light:bg-white light:border-zinc-300">
                
                {/* Node Status Bar */}
                <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4 text-xs font-mono light:border-zinc-200">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-zinc-300 font-semibold light:text-zinc-800">NODE STATUS: ONLINE</span>
                  </div>
                  <span className="text-zinc-500 light:text-zinc-400">LATAM // REMOTO</span>
                </div>

                {/* Hub Descriptor */}
                <div className="py-4 border-b border-zinc-800/80 light:border-zinc-200 space-y-1">
                  <p className="font-mono text-[11px] text-brand-400 font-semibold tracking-wider uppercase">
                    BLACKTECHSEC LAB
                  </p>
                  <p className="text-xs text-zinc-400 light:text-zinc-600">
                    Investigación técnica, prototipos de software y bitácora continua de aprendizaje.
                  </p>
                </div>

                {/* Core Pillars List */}
                <div className="py-4 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/60 light:bg-zinc-50 light:border-zinc-200">
                    <div className="flex items-center gap-2.5">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span className="text-zinc-200 light:text-zinc-800">Artificial Intelligence</span>
                    </div>
                    <span className="text-zinc-500 text-[11px]">Copilot & Agents</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/60 light:bg-zinc-50 light:border-zinc-200">
                    <div className="flex items-center gap-2.5">
                      <Shield className="w-4 h-4 text-brand-400" />
                      <span className="text-zinc-200 light:text-zinc-800">Applied Cybersecurity</span>
                    </div>
                    <span className="text-zinc-500 text-[11px]">Hardening & Defenses</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/60 light:bg-zinc-50 light:border-zinc-200">
                    <div className="flex items-center gap-2.5">
                      <Code2 className="w-4 h-4 text-accent-cyan" />
                      <span className="text-zinc-200 light:text-zinc-800">Backend Engineering</span>
                    </div>
                    <span className="text-zinc-500 text-[11px]">C# · .NET · Python</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/60 light:bg-zinc-50 light:border-zinc-200">
                    <div className="flex items-center gap-2.5">
                      <Database className="w-4 h-4 text-accent-emerald" />
                      <span className="text-zinc-200 light:text-zinc-800">Data Pipelines & BI</span>
                    </div>
                    <span className="text-zinc-500 text-[11px]">SQL · Power BI</span>
                  </div>
                </div>

                {/* Node Footer */}
                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500 light:border-zinc-200 light:text-zinc-400">
                  <span>UNAD ALUMNI // TECH HUB</span>
                  <Link to="/about" className="text-brand-400 hover:text-brand-300 flex items-center gap-1 font-sans font-medium text-xs">
                    Sobre Jair <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          CURRENTLY EXPLORING — ÁREAS DE INVESTIGACIÓN Y DESARROLLO
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-brand-400 font-mono text-xs uppercase tracking-wider">
                <Compass className="w-4 h-4" />
                <span>Enfoque Continuo</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 light:text-zinc-900">
                Actualmente Explorando & Construyendo
              </h2>
              <p className="text-sm text-zinc-400 max-w-2xl light:text-zinc-600">
                Líneas de investigación activa, profundización técnica y experimentación práctica que impulsan el desarrollo de BlackTechSec.
              </p>
            </div>
            <Link to="/about" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-brand-400 hover:text-brand-300">
              Conocer enfoque de Jair <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {explorationAreas.map((area, index) => {
              const IconComp = area.icon;
              return (
                <Card key={index} className="flex flex-col justify-between p-6 space-y-4 group">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`p-2.5 rounded-xl border ${area.accent}`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-[10px] text-zinc-500 tracking-wider">
                        {area.tag}
                      </span>
                    </div>
                    <h3 className="font-semibold text-base text-zinc-100 group-hover:text-brand-400 transition-colors light:text-zinc-900">
                      {area.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed light:text-zinc-600">
                      {area.description}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between text-[11px] font-mono text-zinc-500 light:border-zinc-200 light:text-zinc-400">
                    <span>ESTADO: ACTIVO</span>
                    <span className="text-brand-400/80">INVESTIGACIÓN</span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          THINGS I'VE BUILT / PROYECTOS DESTACADOS
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-brand-400 font-mono text-xs uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>Cosas que He Construido</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 light:text-zinc-900">
                Proyectos & Soluciones
              </h2>
              <p className="text-sm text-zinc-400 max-w-2xl light:text-zinc-600">
                Software real, prototipos funcionales y entornos construidos con rigor técnico, documentando decisiones arquitectónicas y código.
              </p>
            </div>
            <Link to="/projects" className="inline-flex items-center gap-1 text-sm font-medium text-brand-400 hover:text-brand-300">
              Ver todos los proyectos ({projects.length}) <ArrowRight className="w-4 h-4" />
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
          LABORATORIO DE EXPERIMENTOS & NOTAS TÉCNICAS (GRID DUAL)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Column 1: Lab Experiments */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-accent-cyan font-mono text-xs uppercase tracking-wider">
                  <Cpu className="w-4 h-4" />
                  <span>Laboratorio Técnico</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 light:text-zinc-900">
                  Experimentos & PoCs
                </h3>
              </div>
              <Link to="/experiments" className="text-xs font-mono text-brand-400 hover:text-brand-300 flex items-center gap-1">
                Ver laboratorio <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-4">
              {experiments.map((exp) => (
                <Card key={exp.id} className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <Badge variant="outline" size="sm">#LAB · {exp.category}</Badge>
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

          {/* Column 2: Technical Notes / Journal */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-accent-emerald font-mono text-xs uppercase tracking-wider">
                  <FileText className="w-4 h-4" />
                  <span>Bitácora & Journal</span>
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
          FEATURED CONTENT / BIBLIOTECA & DIVULGACIÓN
          ========================================================================= */}
      {content.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-brand-400 font-mono text-xs uppercase tracking-wider">
                  <Compass className="w-4 h-4" />
                  <span>Biblioteca & Divulgación</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 light:text-zinc-900">
                  Publicaciones & Contenido
                </h2>
              </div>
              <Link to="/content" className="inline-flex items-center gap-1 text-sm font-medium text-brand-400 hover:text-brand-300">
                Ver todo el contenido <ArrowRight className="w-4 h-4" />
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
          WHO IS BEHIND BLACKTECHSEC? (ABOUT TEASER)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-900/60 p-8 sm:p-12 lg:p-14 light:bg-zinc-50 light:border-zinc-300">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Author Photo */}
            <div className="md:col-span-4 flex justify-center md:justify-start">
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-brand-500 to-accent-cyan opacity-30 blur" />
                <img
                  src="/img/perfil.jpeg"
                  alt="Jair Alexis Martinez"
                  className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-2xl object-cover border-2 border-zinc-700/80 shadow-xl light:border-zinc-300"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1534972195531-a756b1140f6c?w=400&h=400&fit=crop';
                  }}
                />
              </div>
            </div>

            {/* Author Information & Context */}
            <div className="md:col-span-8 space-y-4 text-center md:text-left">
              <div className="space-y-1">
                <span className="font-mono text-xs uppercase tracking-wider text-brand-400 font-semibold">
                  Autor & Creador
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 light:text-zinc-900">
                  ¿Quién está detrás de BlackTechSec?
                </h2>
              </div>

              <p className="text-base text-zinc-300 leading-relaxed light:text-zinc-700">
                Soy <strong>Jair Alexis Martinez</strong>, Ingeniero de Sistemas egresado de la UNAD y estudiante de Especialización en Seguridad Informática. Concibo BlackTechSec como mi espacio abierto para construir proyectos reales, investigar nuevas tecnologías sin sesgos comerciales y compartir abiertamente lo que aprendo en el camino.
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
                <Badge variant="outline">Backend (C# / .NET)</Badge>
                <Badge variant="outline">Python & Pipelines</Badge>
                <Badge variant="outline">Ciberseguridad Aplicada</Badge>
                <Badge variant="outline">Power BI & SQL</Badge>
              </div>

              <div className="pt-3 flex flex-wrap items-center justify-center md:justify-start gap-3">
                <Button to="/about" variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                  Conoce más sobre mí
                </Button>
                
                <Button 
                  href="/Curriculum_Vitae.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  variant="outline" 
                  size="md"
                  icon={<Download className="w-4 h-4" />}
                >
                  Ver Curriculum Vitae
                </Button>

                <Button 
                  href="https://www.linkedin.com/in/jair-alexis-martinez-302b78305/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  variant="ghost" 
                  size="md"
                  icon={<Linkedin className="w-4 h-4" />}
                >
                  LinkedIn
                </Button>

                <Button 
                  href="https://www.youtube.com/@AlexisTechSec" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  variant="ghost" 
                  size="md"
                  icon={<Youtube className="w-4 h-4 text-red-500" />}
                >
                  YouTube
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          CALL TO ACTION / CONTACT TEASER
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-zinc-800 bg-gradient-to-r from-zinc-900 via-zinc-900/60 to-zinc-950 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 light:from-white light:via-zinc-50 light:to-zinc-100 light:border-zinc-200">
          <div className="space-y-3 max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-zinc-100 light:text-zinc-900">
              ¿Conversamos sobre tecnología o proyectos?
            </h3>
            <p className="text-sm sm:text-base text-zinc-400 light:text-zinc-600 leading-relaxed">
              Siempre interesado en intercambiar ideas sobre desarrollo backend, ciberseguridad aplicada, automatización y análisis de datos.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button to="/contact" variant="primary" size="lg" icon={<Mail className="w-4 h-4" />}>
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
