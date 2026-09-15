import React, { useState } from 'react';
import { Mail, Linkedin, Github, Twitter, Youtube, Send, CheckCircle2, AlertCircle, Copy, Check } from 'lucide-react';
import { MetaTags } from '../components/seo/MetaTags';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { SupportSection } from '../components/common/SupportSection';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: 'Consulta Profesional',
    message: '',
    _honey: '' // Honeypot field for anti-spam bots
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('alexis.martinez_systems.engineer@outlook.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Anti-bot honeypot check
    if (formData._honey) {
      setStatus('success');
      return;
    }

    if (!formData.name || !formData.email || !formData.message) {
      alert('Por favor complete todos los campos obligatorios.');
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('https://formsubmit.co/ajax/alexis.martinez_systems.engineer@outlook.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Nombre: formData.name,
          Email: formData.email,
          Motivo: formData.reason,
          Mensaje: formData.message,
          _subject: `Contacto BlackTechSec: ${formData.reason} de ${formData.name}`
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', reason: 'Consulta Profesional', message: '', _honey: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <MetaTags 
        title="Contacto Profesional | Jair Alexis Martinez — BLACKTECHSEC"
        description="Ponte en contacto con Jair Alexis Martinez para colaboraciones en desarrollo backend, ciberseguridad, análisis de datos o proyectos de software."
      />

      <div className="space-y-3 max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 light:text-zinc-900">
          Contacto & Conexión Profesional
        </h1>
        <p className="text-base text-zinc-400 light:text-zinc-600 leading-relaxed">
          ¿Tienes un proyecto en mente, una consulta sobre ciberseguridad o interés en colaborar técnicamente? Puedes escribirme directamente o utilizar el formulario.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Direct Channels */}
        <div className="lg:col-span-5 space-y-6">
          <h2 className="font-mono text-xs uppercase tracking-wider text-brand-400 font-bold light:text-brand-600">
            Canales Directos
          </h2>

          {/* Email card with copy button */}
          <Card className="p-5 space-y-2">
            <span className="font-mono text-xs text-zinc-500">Email Oficial</span>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs sm:text-sm font-mono text-zinc-200 break-all light:text-zinc-800">
                alexis.martinez_systems.engineer@outlook.com
              </span>
              <button
                onClick={handleCopyEmail}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors shrink-0 light:hover:bg-zinc-200 light:hover:text-zinc-900"
                title="Copiar email"
                aria-label="Copiar email"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </Card>

          {/* Social Links */}
          <div className="space-y-3">
            <a
              href="https://www.linkedin.com/in/jair-alexis-martinez-302b78305/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 text-zinc-300 hover:text-white transition-all light:bg-white light:border-zinc-200 light:text-zinc-700 light:hover:border-zinc-300 light:hover:text-zinc-900"
            >
              <div className="flex items-center gap-3">
                <Linkedin className="w-5 h-5 text-brand-400" />
                <div>
                  <p className="text-sm font-medium">LinkedIn</p>
                  <p className="font-mono text-xs text-zinc-500">in/jair-alexis-martinez-302b78305</p>
                </div>
              </div>
              <span className="text-xs font-mono text-brand-400">Conectar →</span>
            </a>

            <a
              href="https://github.com/alexis2487"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 text-zinc-300 hover:text-white transition-all light:bg-white light:border-zinc-200 light:text-zinc-700 light:hover:border-zinc-300 light:hover:text-zinc-900"
            >
              <div className="flex items-center gap-3">
                <Github className="w-5 h-5 text-zinc-400" />
                <div>
                  <p className="text-sm font-medium">GitHub</p>
                  <p className="font-mono text-xs text-zinc-500">github.com/alexis2487</p>
                </div>
              </div>
              <span className="text-xs font-mono text-brand-400">Ver código →</span>
            </a>

            <a
              href="https://x.com/AlexisTechsec"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 text-zinc-300 hover:text-white transition-all light:bg-white light:border-zinc-200 light:text-zinc-700 light:hover:border-zinc-300 light:hover:text-zinc-900"
            >
              <div className="flex items-center gap-3">
                <Twitter className="w-5 h-5 text-accent-cyan" />
                <div>
                  <p className="text-sm font-medium">X (Twitter)</p>
                  <p className="font-mono text-xs text-zinc-500">@AlexisTechsec</p>
                </div>
              </div>
              <span className="text-xs font-mono text-brand-400">Seguir →</span>
            </a>

            <a
              href="https://www.youtube.com/@AlexisTechSec"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 text-zinc-300 hover:text-white transition-all light:bg-white light:border-zinc-200 light:text-zinc-700 light:hover:border-zinc-300 light:hover:text-zinc-900"
            >
              <div className="flex items-center gap-3">
                <Youtube className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-sm font-medium">Canal de YouTube</p>
                  <p className="font-mono text-xs text-zinc-500">@AlexisTechSec</p>
                </div>
              </div>
              <span className="text-xs font-mono text-brand-400">Suscribirse →</span>
            </a>
          </div>

          <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/20 text-xs text-zinc-400 space-y-1 font-mono light:bg-zinc-50 light:border-zinc-200">
            <p className="font-semibold text-zinc-300 light:text-zinc-700">Disponibilidad Actual:</p>
            <p>● Remoto LATAM / Global</p>
            <p>● Respuesta estimada: 24-48 horas hábiles</p>
          </div>

          {/* Support / Patronage Card */}
          <SupportSection variant="compact" />
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <Card className="p-8">
            <h2 className="text-xl font-bold text-zinc-100 mb-6 light:text-zinc-900">
              Enviar Mensaje
            </h2>

            {status === 'success' ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-zinc-100 light:text-zinc-900">¡Mensaje Enviado con Éxito!</h3>
                <p className="text-sm text-zinc-400 max-w-sm mx-auto light:text-zinc-600">
                  Gracias por comunicarte. He recibido tu mensaje y responderé a tu correo a la brevedad.
                </p>
                <Button onClick={() => setStatus('idle')} variant="secondary" size="sm">
                  Enviar otro mensaje
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Honeypot anti-spam (hidden from users) */}
                <input
                  type="text"
                  name="_honey"
                  value={formData._honey}
                  onChange={(e) => setFormData({ ...formData, _honey: e.target.value })}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5 light:text-zinc-600">
                    Tu Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Carlos Rodríguez"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 light:bg-white light:border-zinc-300 light:text-zinc-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5 light:text-zinc-600">
                    Tu Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="tu.email@dominio.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 light:bg-white light:border-zinc-300 light:text-zinc-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5 light:text-zinc-600">
                    Motivo de Contacto
                  </label>
                  <select
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 light:bg-white light:border-zinc-300 light:text-zinc-900"
                  >
                    <option value="Consulta Profesional">Consulta Profesional</option>
                    <option value="Colaboración en Proyecto Backend / Datos">Colaboración en Proyecto Backend / Datos</option>
                    <option value="Ciberseguridad & Diagnóstico">Ciberseguridad & Diagnóstico</option>
                    <option value="Oportunidad Laboral Remota">Oportunidad Laboral Remota</option>
                    <option value="Otro">Otro asunto</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5 light:text-zinc-600">
                    Mensaje *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe tu consulta, proyecto o idea..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 light:bg-white light:border-zinc-300 light:text-zinc-900"
                  />
                </div>

                {status === 'error' && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Ocurrió un error al enviar el mensaje. Por favor escríbeme directamente al correo alexis.martinez_systems.engineer@outlook.com</span>
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={status === 'submitting'}
                  className="w-full"
                  icon={<Send className="w-4 h-4" />}
                >
                  {status === 'submitting' ? 'Enviando mensaje...' : 'Enviar Mensaje'}
                </Button>
              </form>
            )}
          </Card>
        </div>

      </div>

    </div>
  );
};
