import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Layers, 
  Share2, 
  Cpu, 
  FileText, 
  Plus, 
  Database, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight,
  KeyRound,
  Save,
  RotateCcw
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { getProjects } from '../../services/projectsService';
import { getContent } from '../../services/contentService';
import { getExperiments } from '../../services/experimentsService';
import { getNotes } from '../../services/notesService';
import { isSupabaseConfigured, getSupabaseUrl, getSupabaseAnonKey, saveSupabaseConfig, clearSupabaseConfig } from '../../lib/supabase';

export const AdminDashboardPage: React.FC = () => {
  const [counts, setCounts] = useState({
    projects: 0,
    content: 0,
    experiments: 0,
    notes: 0,
  });
  const [loading, setLoading] = useState(true);
  const [showConfig, setShowConfig] = useState(!isSupabaseConfigured);
  const [customUrl, setCustomUrl] = useState(getSupabaseUrl());
  const [customKey, setCustomKey] = useState(getSupabaseAnonKey());

  useEffect(() => {
    async function loadStats() {
      try {
        const [p, c, e, n] = await Promise.all([
          getProjects(),
          getContent(),
          getExperiments(),
          getNotes()
        ]);
        setCounts({
          projects: p.length,
          content: c.length,
          experiments: e.length,
          notes: n.length
        });
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customKey || customKey.trim().length < 20) {
      alert('Por favor introduce una anon key válida de Supabase (cadena larga que comienza por eyJ...).');
      return;
    }
    saveSupabaseConfig(customUrl, customKey);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100 light:text-zinc-900">
            Panel de Control
          </h1>
          <p className="text-xs font-mono text-zinc-400">
            Gestión centralizada del ecosistema BlackTechSec
          </p>
        </div>

        {/* Backend Status indicator */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono bg-zinc-900 light:bg-white border-zinc-800 light:border-zinc-300">
          <Database className="w-3.5 h-3.5 text-brand-400" />
          <span>Supabase:</span>
          {isSupabaseConfigured ? (
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Conectado en Vivo (rqawfhijrokvefzaaxof)
            </span>
          ) : (
            <button
              onClick={() => setShowConfig(!showConfig)}
              className="text-amber-400 font-semibold flex items-center gap-1 hover:underline"
            >
              <AlertTriangle className="w-3 h-3" /> Modo Fallback Local Activo (Clic para conectar)
            </button>
          )}
        </div>
      </div>

      {/* Supabase Direct Connection Card */}
      {showConfig && (
        <Card className="p-6 border-amber-500/40 bg-zinc-900/90 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-amber-400" />
                <span>Vincular Credenciales de Supabase en este Navegador</span>
              </h2>
              <p className="text-xs text-zinc-400 leading-relaxed max-w-2xl">
                Al pegar tu clave pública <strong>anon key</strong> aquí, tu navegador se conectará directamente a tu proyecto Supabase (<code>rqawfhijrokvefzaaxof</code>) sin depender de que GitHub Actions termine de compilar.
              </p>
            </div>
            {isSupabaseConfigured && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSupabaseConfig}
                icon={<RotateCcw className="w-3.5 h-3.5" />}
              >
                Restablecer
              </Button>
            )}
          </div>

          <form onSubmit={handleSaveConfig} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end pt-2">
            <div className="md:col-span-4">
              <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                URL de Supabase
              </label>
              <input
                type="text"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-xs font-mono bg-zinc-950 border border-zinc-800 text-zinc-200"
              />
            </div>

            <div className="md:col-span-6">
              <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                Anon / Public Key (eyJ...)
              </label>
              <input
                type="password"
                placeholder="Pega tu anon key de Supabase aquí..."
                value={customKey}
                onChange={(e) => setCustomKey(e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-xs font-mono bg-zinc-950 border border-zinc-800 text-zinc-200 focus:border-brand-500"
              />
            </div>

            <div className="md:col-span-2">
              <Button
                type="submit"
                variant="primary"
                size="sm"
                className="w-full"
                icon={<Save className="w-3.5 h-3.5" />}
              >
                Conectar
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="font-mono text-xs text-zinc-400">Proyectos</span>
            <p className="text-3xl font-extrabold text-zinc-100 light:text-zinc-900">{counts.projects}</p>
          </div>
          <div className="p-3 rounded-xl bg-brand-500/10 text-brand-400">
            <Layers className="w-6 h-6" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="font-mono text-xs text-zinc-400">Publicaciones</span>
            <p className="text-3xl font-extrabold text-zinc-100 light:text-zinc-900">{counts.content}</p>
          </div>
          <div className="p-3 rounded-xl bg-accent-blue/10 text-accent-blue">
            <Share2 className="w-6 h-6" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="font-mono text-xs text-zinc-400">Experimentos</span>
            <p className="text-3xl font-extrabold text-zinc-100 light:text-zinc-900">{counts.experiments}</p>
          </div>
          <div className="p-3 rounded-xl bg-accent-cyan/10 text-accent-cyan">
            <Cpu className="w-6 h-6" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="font-mono text-xs text-zinc-400">Notas Técnicas</span>
            <p className="text-3xl font-extrabold text-zinc-100 light:text-zinc-900">{counts.notes}</p>
          </div>
          <div className="p-3 rounded-xl bg-accent-emerald/10 text-accent-emerald">
            <FileText className="w-6 h-6" />
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="font-mono text-xs uppercase tracking-wider text-brand-400 font-bold">
          Acciones Rápidas de Administración
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/admin/projects"
            className="flex items-center justify-between p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:border-brand-500/50 hover:bg-zinc-800/80 transition-all text-xs font-mono light:bg-white light:border-zinc-200"
          >
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4 text-brand-400" />
              <span>Gestionar Proyectos</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
          </Link>

          <Link
            to="/admin/content"
            className="flex items-center justify-between p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:border-brand-500/50 hover:bg-zinc-800/80 transition-all text-xs font-mono light:bg-white light:border-zinc-200"
          >
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4 text-accent-blue" />
              <span>Gestionar Contenido</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
          </Link>

          <Link
            to="/admin/experiments"
            className="flex items-center justify-between p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:border-brand-500/50 hover:bg-zinc-800/80 transition-all text-xs font-mono light:bg-white light:border-zinc-200"
          >
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4 text-accent-cyan" />
              <span>Gestionar Experimentos</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
          </Link>

          <Link
            to="/admin/notes"
            className="flex items-center justify-between p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:border-brand-500/50 hover:bg-zinc-800/80 transition-all text-xs font-mono light:bg-white light:border-zinc-200"
          >
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4 text-accent-emerald" />
              <span>Gestionar Notas</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
          </Link>
        </div>
      </div>

      {/* Philosophy Reminder */}
      <Card className="p-6 bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border-zinc-800 light:from-white light:via-zinc-50 light:to-zinc-100 light:border-zinc-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-bold text-sm text-zinc-200 light:text-zinc-800">
              Directriz de Contenido
            </h3>
            <p className="text-xs text-zinc-400 light:text-zinc-600">
              "BlackTechSec representa la base digital de Jair Alexis Martinez. No aparentar perfiles de empresa ni academias; mantener la autenticidad técnica y registrar aprendizajes continuos."
            </p>
          </div>
          <Badge variant="outline">LEARN · BUILD · EXPLORE · SHARE</Badge>
        </div>
      </Card>

    </div>
  );
};
