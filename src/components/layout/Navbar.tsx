import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Terminal, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Download, 
  Github, 
  ShieldCheck, 
  FileText 
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

const navLinks = [
  { name: 'Inicio', path: '/' },
  { name: 'Perfil', path: '/about' },
  { name: 'Proyectos', path: '/projects' },
  { name: 'Contenido', path: '/content' },
  { name: 'Experimentos', path: '/experiments' },
  { name: 'Notas', path: '/notes' },
  { name: 'Contacto', path: '/contact' },
];

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { isAdmin } = useAuth();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md transition-colors light:bg-white/80 light:border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link 
          to="/" 
          className="group flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-lg p-1"
        >
          <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-brand-400 group-hover:border-brand-500/60 group-hover:text-brand-300 transition-all light:bg-zinc-100 light:border-zinc-300 light:text-brand-600">
            <Terminal className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-sm font-bold tracking-wider text-zinc-100 group-hover:text-brand-400 transition-colors light:text-zinc-900">
              BLACKTECHSEC
            </span>
            <span className="font-mono text-[10px] text-zinc-400 tracking-tight hidden sm:inline light:text-zinc-500">
              BLACK TECHNOLOGY SECURITY
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map(link => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                  ${active 
                    ? 'text-brand-400 bg-brand-500/10 font-semibold light:text-brand-600 light:bg-brand-50' 
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 light:text-zinc-600 light:hover:text-zinc-900 light:hover:bg-zinc-100'}
                `}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* View / Download CV */}
          <a
            href="/Curriculum_Vitae.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium border border-zinc-700 bg-zinc-900/80 text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-zinc-600 transition-all light:bg-zinc-100 light:border-zinc-300 light:text-zinc-700 light:hover:bg-zinc-200"
            title="Descargar Currículum Vitae oficial"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CV</span>
          </a>

          {/* GitHub Profile */}
          <a
            href="https://github.com/alexis2487"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 transition-colors light:text-zinc-600 light:hover:text-zinc-900 light:hover:bg-zinc-100"
            title="Ver GitHub"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 transition-colors light:text-zinc-600 light:hover:text-zinc-900 light:hover:bg-zinc-100"
            title={`Cambiar a modo ${theme === 'dark' ? 'claro' : 'oscuro'}`}
            aria-label="Cambiar tema"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Admin badge link if authenticated */}
          {isAdmin && (
            <Link
              to="/admin"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20"
              title="Panel de Administración"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 light:text-zinc-600"
            aria-label="Cambiar tema"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 light:text-zinc-600"
            aria-label="Abrir menú"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-b border-zinc-800 bg-zinc-950 px-4 pt-3 pb-6 space-y-2 light:bg-white light:border-zinc-200">
          <nav className="flex flex-col space-y-1">
            {navLinks.map(link => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`
                    px-3 py-2 rounded-lg text-base font-medium transition-colors
                    ${active 
                      ? 'text-brand-400 bg-brand-500/10 font-semibold light:text-brand-600 light:bg-brand-50' 
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-800 light:text-zinc-700 light:hover:text-black light:hover:bg-zinc-100'}
                  `}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-zinc-800/80 flex flex-col gap-2 light:border-zinc-200">
            <a
              href="/Curriculum_Vitae.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-mono border border-zinc-700 bg-zinc-900 text-zinc-200 light:bg-zinc-100 light:border-zinc-300 light:text-zinc-800"
            >
              <Download className="w-4 h-4" />
              <span>Descargar Currículum Vitae</span>
            </a>
            
            <a
              href="https://github.com/alexis2487"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-mono border border-zinc-800 bg-zinc-950 text-zinc-300 light:bg-white light:border-zinc-300 light:text-zinc-700"
            >
              <Github className="w-4 h-4" />
              <span>GitHub: @alexis2487</span>
            </a>

            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Panel de Administración</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
