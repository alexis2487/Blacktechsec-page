import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Layers, 
  Share2, 
  Cpu, 
  FileText, 
  User, 
  LogOut, 
  ExternalLink,
  Shield,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const menuItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Proyectos', path: '/admin/projects', icon: Layers },
  { name: 'Contenido', path: '/admin/content', icon: Share2 },
  { name: 'Experimentos', path: '/admin/experiments', icon: Cpu },
  { name: 'Notas Técnicas', path: '/admin/notes', icon: FileText },
  { name: 'Perfil & Ajustes', path: '/admin/profile', icon: User },
];

export const AdminLayout: React.FC = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Auth guard
  if (!loading && !isAdmin) {
    navigate('/admin');
    return null;
  }

  const handleLogout = async () => {
    await signOut();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col md:flex-row light:bg-zinc-100 light:text-zinc-900">
      
      {/* Mobile Topbar */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900 light:bg-white light:border-zinc-200">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-brand-400" />
          <span className="font-mono text-sm font-bold">BlackTechSec CMS</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1 text-zinc-400 hover:text-zinc-100"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        ${mobileOpen ? 'block' : 'hidden'} 
        md:block w-full md:w-64 border-r border-zinc-800 bg-zinc-900/60 p-4 space-y-6 shrink-0 light:bg-white light:border-zinc-200
      `}>
        <div className="hidden md:flex items-center gap-2.5 px-2 py-2">
          <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-brand-400">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-mono text-xs font-bold tracking-wider">BLACKTECHSEC</h2>
            <p className="font-mono text-[10px] text-zinc-500">ADMINISTRADOR V2</p>
          </div>
        </div>

        <div className="px-2 py-1.5 rounded-lg bg-zinc-800/40 border border-zinc-800 text-[11px] font-mono text-zinc-400 break-all light:bg-zinc-50 light:border-zinc-200">
          <span className="text-zinc-500">Sesión:</span> {user?.email || 'Jair Alexis'}
        </div>

        {/* Menu */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-mono transition-colors
                  ${active 
                    ? 'bg-brand-600 text-white font-semibold' 
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 light:text-zinc-600 light:hover:text-zinc-900 light:hover:bg-zinc-100'}
                `}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-zinc-800 space-y-2 light:border-zinc-200">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 light:text-zinc-600 light:hover:bg-zinc-100"
          >
            <span>Ver Sitio Web</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Content Area */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-6xl overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
};
