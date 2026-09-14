import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/common/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 text-brand-400 mx-auto flex items-center justify-center">
          <Terminal className="w-8 h-8" />
        </div>
        
        <div className="space-y-2">
          <p className="font-mono text-xs text-brand-400 font-bold uppercase tracking-widest">
            ERROR 404
          </p>
          <h1 className="text-3xl font-extrabold text-zinc-100 light:text-zinc-900">
            Ruta no encontrada
          </h1>
          <p className="text-sm text-zinc-400 light:text-zinc-600">
            La página que estás intentando acceder no existe o ha sido reubicada dentro del ecosistema BlackTechSec.
          </p>
        </div>

        <div className="flex justify-center gap-3 pt-2">
          <Button to="/" variant="primary" icon={<Home className="w-4 h-4" />}>
            Volver al Inicio
          </Button>
          <Button to="/projects" variant="secondary">
            Ver Proyectos
          </Button>
        </div>
      </div>
    </div>
  );
};
