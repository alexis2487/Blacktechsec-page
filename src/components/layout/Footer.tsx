import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Twitter, Download, Lock, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950/60 mt-20 transition-colors light:bg-zinc-100/70 light:border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand & Philosophy */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold tracking-wider text-zinc-100 light:text-zinc-900">
                BLACKTECHSEC
              </span>
            </div>
            <p className="font-mono text-xs text-zinc-400 tracking-wide light:text-zinc-600">
              BLACK TECHNOLOGY SECURITY
            </p>
            <p className="text-sm text-zinc-400 max-w-md leading-relaxed light:text-zinc-600">
              Espacio tecnológico personal de Jair Alexis Martinez. Explorando tecnología, inteligencia artificial, ciberseguridad, desarrollo de software y datos.
            </p>
            <div className="pt-2">
              <span className="font-mono text-xs font-semibold text-zinc-300 tracking-wider uppercase px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 light:bg-white light:border-zinc-300 light:text-zinc-700">
                Learn · Build · Explore · Share
              </span>
            </div>
          </div>

          {/* Navigation links */}
          <div>
            <h4 className="font-mono text-xs font-semibold text-zinc-200 uppercase tracking-wider mb-3 light:text-zinc-800">
              Navegación
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-zinc-400 hover:text-brand-400 transition-colors light:text-zinc-600">Inicio</Link>
              </li>
              <li>
                <Link to="/content" className="text-zinc-400 hover:text-brand-400 transition-colors light:text-zinc-600">Explorar Contenido</Link>
              </li>
              <li>
                <Link to="/projects" className="text-zinc-400 hover:text-brand-400 transition-colors light:text-zinc-600">Proyectos</Link>
              </li>
              <li>
                <Link to="/experiments" className="text-zinc-400 hover:text-brand-400 transition-colors light:text-zinc-600">Laboratorio de Experimentos</Link>
              </li>
              <li>
                <Link to="/notes" className="text-zinc-400 hover:text-brand-400 transition-colors light:text-zinc-600">Notas Técnicas</Link>
              </li>
              <li>
                <Link to="/about" className="text-zinc-400 hover:text-brand-400 transition-colors light:text-zinc-600">Sobre Jair</Link>
              </li>
              <li>
                <Link to="/contact" className="text-zinc-400 hover:text-brand-400 transition-colors light:text-zinc-600">Contacto</Link>
              </li>
            </ul>
          </div>

          {/* Connect & Resources */}
          <div>
            <h4 className="font-mono text-xs font-semibold text-zinc-200 uppercase tracking-wider mb-3 light:text-zinc-800">
              Conectar & Recursos
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://github.com/alexis2487" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors light:text-zinc-600 light:hover:text-zinc-900"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.linkedin.com/in/jair-alexis-martinez-302b78305/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors light:text-zinc-600 light:hover:text-zinc-900"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.youtube.com/@AlexisTechSec" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 text-zinc-400 hover:text-red-400 transition-colors light:text-zinc-600 light:hover:text-red-600"
                >
                  <Youtube className="w-4 h-4 text-red-500" />
                  <span>YouTube</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://x.com/AlexisTechsec" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors light:text-zinc-600 light:hover:text-zinc-900"
                >
                  <Twitter className="w-4 h-4" />
                  <span>X (Twitter)</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:alexis.martinez_systems.engineer@outlook.com" 
                  className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors light:text-zinc-600 light:hover:text-zinc-900"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Directo</span>
                </a>
              </li>
              <li className="pt-2">
                <a 
                  href="/Curriculum_Vitae.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand-400 hover:underline font-mono text-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Descargar CV (PDF)</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400 light:border-zinc-200 light:text-zinc-500">
          <div>
            © {new Date().getFullYear()} Jair Alexis Martinez. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-4">
            <span>React · TypeScript · Vite · Tailwind · Supabase</span>
            <Link 
              to="/admin" 
              className="inline-flex items-center gap-1 text-zinc-400 hover:text-zinc-200 transition-colors p-1"
              title="Acceso Administrativo"
            >
              <Lock className="w-3 h-3" />
              <span className="sr-only sm:not-sr-only sm:text-[11px]">Admin</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
