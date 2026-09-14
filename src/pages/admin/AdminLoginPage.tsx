import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, ArrowLeft, Shield, AlertCircle, CheckCircle2 } from 'lucide-react';
import { signInAdmin } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('alexis.martinez_systems.engineer@outlook.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { refreshAuth } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { user, error: loginError } = await signInAdmin(email, password);
      if (loginError || !user) {
        setError(loginError || 'Error al iniciar sesión');
      } else {
        await refreshAuth();
        navigate('/admin/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-zinc-950 light:bg-zinc-100">
      <div className="w-full max-w-md space-y-6">
        
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-1 text-xs font-mono text-zinc-500 hover:text-zinc-300 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver a blacktechsec.com</span>
          </Link>
          
          <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 text-brand-400 mx-auto flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>

          <h1 className="text-2xl font-bold text-zinc-100 light:text-zinc-900">
            BlackTechSec CMS
          </h1>
          <p className="text-xs font-mono text-zinc-400">
            Acceso Administrativo Exclusivo
          </p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleLogin} className="space-y-4">
            
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5 light:text-zinc-600">
                Email Administrativo
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-brand-500 light:bg-white light:border-zinc-300 light:text-zinc-900"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5 light:text-zinc-600">
                Contraseña
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-brand-500 light:bg-white light:border-zinc-300 light:text-zinc-900"
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              className="w-full"
              icon={<Lock className="w-4 h-4" />}
            >
              {loading ? 'Verificando...' : 'Iniciar Sesión'}
            </Button>
          </form>
        </Card>

        <p className="text-center text-[11px] font-mono text-zinc-600">
          Autenticación protegida con Supabase Auth & Row Level Security.
        </p>

      </div>
    </div>
  );
};
