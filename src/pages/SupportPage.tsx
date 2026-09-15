import React, { useEffect, useState } from 'react';
import { Heart, ShieldCheck, ExternalLink, Sparkles, Server, Terminal, Lock, ArrowRight, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MetaTags } from '../components/seo/MetaTags';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { SupportSection, WOMPI_DONATION_URL } from '../components/common/SupportSection';
import { getProfile } from '../services/profileService';
import { ProfileInfo } from '../types';

export const SupportPage: React.FC = () => {
  const [profile, setProfile] = useState<ProfileInfo | null>(null);

  useEffect(() => {
    async function load() {
      const data = await getProfile();
      setProfile(data);
    }
    load();
  }, []);

  const donationUrl = profile?.donationUrl || WOMPI_DONATION_URL;

  const destinationItems = [
    {
      icon: Server,
      title: 'Servidores & Laboratorios Cloud',
      description: 'Financiamiento de máquinas virtuales, instancias para análisis de malware, entornos de pruebas backend e infraestructura para despliegues continuos.'
    },
    {
      icon: Lock,
      title: 'Investigación en Ciberseguridad',
      description: 'Adquisición de licencias, pruebas de concepto defensivas y entornos de simulación de amenazas para MiPymes y comunidad técnica.'
    },
    {
      icon: Sparkles,
      title: 'Experimentos de IA & Modelos Abiertos',
      description: 'Consumo de cómputo para despliegue de agentes inteligentes, pruebas de inferencia local y herramientas generativas para desarrolladores.'
    },
    {
      icon: Terminal,
      title: 'Mantenimiento & Dominio Web',
      description: 'Costos de renovación de dominios, servicios de analítica respetuosa con la privacidad y estabilidad del hub BlackTechSec.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <MetaTags 
        title="Apoya mis Proyectos | Mecenazgo Tecnológico — BLACKTECHSEC"
        description="Contribuye al sostenimiento de proyectos libres, laboratorios de ciberseguridad, herramientas backend y experimentación en IA de Jair Alexis Martinez."
      />

      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 light:bg-emerald-100 light:text-emerald-700 light:border-emerald-300">
            <Heart className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400 light:fill-emerald-700 light:text-emerald-700" />
            Mecenazgo Tecnológico Independiente
          </span>
          <span className="font-mono text-xs text-zinc-400 light:text-zinc-500 hidden sm:inline">
            Learn · Build · Explore · Share
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 light:text-zinc-900 tracking-tight">
          Apoya el Desarrollo & la Investigación Libre
        </h1>

        <p className="text-base text-zinc-300 light:text-zinc-600 leading-relaxed">
          <strong>BLACKTECHSEC</strong> no es una academia comercial, tienda ni empresa de consultoría. Es un hub tecnológico personal donde investigo, construyo software y comparto aprendizajes técnicos de manera abierta y sin barreras de pago.
        </p>
      </div>

      {/* Main Support Banner */}
      <SupportSection variant="full" url={donationUrl} />

      {/* Transparency: Where do the funds go? */}
      <div className="space-y-6">
        <div className="space-y-1">
          <span className="font-mono text-xs uppercase tracking-wider text-brand-400 font-bold light:text-brand-600">
            Transparencia & Destino de los Fondos
          </span>
          <h2 className="text-2xl font-bold text-zinc-100 light:text-zinc-900">
            ¿En qué se invierte tu aporte voluntario?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {destinationItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card key={idx} className="p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center light:bg-emerald-100 light:text-emerald-700">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-zinc-100 light:text-zinc-900">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-400 light:text-zinc-600 leading-relaxed">
                  {item.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Direct Payment Gateway Details */}
      <Card className="p-8 space-y-6 border-zinc-800 bg-zinc-900/50 light:bg-white light:border-zinc-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-zinc-100 light:text-zinc-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Pasarela de Pago Segura: Wompi (Bancolombia)</span>
            </h3>
            <p className="text-sm text-zinc-400 light:text-zinc-600">
              Acepta transferencias directas y tarjetas con la máxima seguridad bancaria de Colombia.
            </p>
          </div>

          <a
            href={donationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-lg shadow-emerald-500/10 transition-all shrink-0"
          >
            <Heart className="w-4 h-4 fill-zinc-950 text-zinc-950" />
            <span>Ir al Checkout Wompi</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-400 light:border-zinc-200 light:text-zinc-500">
          <div>
            Medios habilitados: <strong className="text-zinc-200 light:text-zinc-700">Nequi · Bancolombia · PSE · Visa · Mastercard · Amex</strong>
          </div>
          <div>
            100% Voluntario · Sin cobros recurrentes ocultos
          </div>
        </div>
      </Card>

      {/* Explore projects teaser */}
      <div className="pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 light:border-zinc-200">
        <div>
          <h4 className="font-semibold text-zinc-100 light:text-zinc-900">
            ¿Quieres ver qué proyectos se benefician de este apoyo?
          </h4>
          <p className="text-xs text-zinc-400 light:text-zinc-600">
            Explora las herramientas, laboratorios y código liberado.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button to="/projects" variant="primary" size="sm" icon={<Code2 className="w-4 h-4" />}>
            Ver Proyectos
          </Button>
          <Button to="/experiments" variant="outline" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
            Ver Laboratorio
          </Button>
        </div>
      </div>

    </div>
  );
};
export default SupportPage;
