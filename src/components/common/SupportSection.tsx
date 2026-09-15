import React from 'react';
import { Heart, ShieldCheck, ExternalLink, Sparkles, CreditCard } from 'lucide-react';

interface SupportSectionProps {
  variant?: 'full' | 'compact';
  className?: string;
  url?: string;
}

export const WOMPI_DONATION_URL = 'https://checkout.wompi.co/l/VPOS_ijlMeE';

export const SupportSection: React.FC<SupportSectionProps> = ({
  variant = 'full',
  className = '',
  url
}) => {
  const targetUrl = url && url.trim() ? url : WOMPI_DONATION_URL;

  if (variant === 'compact') {
    return (
      <div className={`p-5 rounded-2xl border border-emerald-500/20 bg-gradient-to-b from-emerald-950/20 via-zinc-900/60 to-zinc-900/40 text-left space-y-4 light:from-emerald-50/50 light:via-white light:to-zinc-50 light:border-emerald-200 ${className}`}>
        <div className="flex items-center gap-2 text-emerald-400 light:text-emerald-600 font-mono text-xs font-semibold uppercase tracking-wider">
          <Heart className="w-4 h-4 fill-emerald-400/20 text-emerald-400" />
          <span>Apoya mis proyectos</span>
        </div>

        <p className="text-xs text-zinc-300 light:text-zinc-600 leading-relaxed">
          BlackTechSec es un hub tecnológico independiente y abierto. Tu apoyo voluntario ayuda a solventar costos de infraestructura, laboratorios y servidores de prueba.
        </p>

        <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-zinc-400 light:text-zinc-500">
          <span className="px-2 py-0.5 rounded bg-zinc-800/80 border border-zinc-700/60 light:bg-zinc-100 light:border-zinc-200">Nequi</span>
          <span className="px-2 py-0.5 rounded bg-zinc-800/80 border border-zinc-700/60 light:bg-zinc-100 light:border-zinc-200">Bancolombia</span>
          <span className="px-2 py-0.5 rounded bg-zinc-800/80 border border-zinc-700/60 light:bg-zinc-100 light:border-zinc-200">PSE</span>
          <span className="px-2 py-0.5 rounded bg-zinc-800/80 border border-zinc-700/60 light:bg-zinc-100 light:border-zinc-200">Tarjetas</span>
        </div>

        <a
          href={targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all"
        >
          <Heart className="w-4 h-4 fill-zinc-950 text-zinc-950" />
          <span>Aportar con Wompi</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500 light:text-zinc-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          <span>Procesado de forma 100% segura por Wompi (Bancolombia)</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-3xl border border-zinc-800/90 bg-gradient-to-br from-zinc-900 via-zinc-900/80 to-emerald-950/20 p-8 sm:p-10 light:from-white light:via-zinc-50 light:to-emerald-50/40 light:border-zinc-200 shadow-xl ${className}`}>
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        
        {/* Text & Philosophy */}
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 light:bg-emerald-100 light:text-emerald-700 light:border-emerald-300">
              <Heart className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400 light:fill-emerald-700 light:text-emerald-700" />
              Mecenazgo Tecnológico & Open Source
            </span>
            <span className="text-xs font-mono text-zinc-400 light:text-zinc-500 hidden sm:inline">
              Learn · Build · Explore · Share
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-100 light:text-zinc-900 tracking-tight">
            Apoya mis proyectos e investigación técnica
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 light:text-zinc-600 leading-relaxed">
            <strong>BLACKTECHSEC</strong> es un espacio independiente y de acceso libre. Si mis proyectos de código abierto, herramientas de automatización, laboratorios de ciberseguridad o notas técnicas te han sido de utilidad, puedes realizar una donación voluntaria para ayudar a solventar costos de infraestructura cloud, servidores de prueba y dominios.
          </p>

          {/* Payment methods badges */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-mono text-zinc-400 light:text-zinc-500 flex items-center gap-1">
              <CreditCard className="w-3.5 h-3.5 text-zinc-400" />
              Métodos disponibles en Colombia & Global:
            </span>
            <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-zinc-300 light:text-zinc-700">
              <span className="px-2 py-0.5 rounded-md bg-zinc-800/90 border border-zinc-700/80 light:bg-white light:border-zinc-300">Nequi</span>
              <span className="px-2 py-0.5 rounded-md bg-zinc-800/90 border border-zinc-700/80 light:bg-white light:border-zinc-300">Bancolombia</span>
              <span className="px-2 py-0.5 rounded-md bg-zinc-800/90 border border-zinc-700/80 light:bg-white light:border-zinc-300">PSE</span>
              <span className="px-2 py-0.5 rounded-md bg-zinc-800/90 border border-zinc-700/80 light:bg-white light:border-zinc-300">Tarjetas Crédito / Débito</span>
            </div>
          </div>
        </div>

        {/* Action Callout */}
        <div className="flex flex-col items-start lg:items-end gap-3 shrink-0 w-full lg:w-auto">
          <a
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-mono text-sm font-bold uppercase tracking-wider bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-xl shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all hover:scale-[1.02] w-full lg:w-auto text-center"
          >
            <Heart className="w-4 h-4 fill-zinc-950 text-zinc-950" />
            <span>Apoyar en Wompi</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 light:text-zinc-500">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Pagos y donaciones procesados con Wompi</span>
          </div>
        </div>

      </div>
    </div>
  );
};
