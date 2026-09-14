import React, { useEffect, useState } from 'react';
import { 
  Download, 
  GraduationCap, 
  Award, 
  Code2, 
  ShieldCheck, 
  Database, 
  Cpu, 
  Github, 
  Linkedin, 
  Mail,
  MapPin,
  Calendar,
  Layers
} from 'lucide-react';
import { MetaTags } from '../components/seo/MetaTags';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { getProfile, getEducation, getCertifications, getSkills } from '../services/profileService';
import { ProfileInfo, EducationItem, CertificationItem, SkillCategory } from '../types';

export const AboutPage: React.FC = () => {
  const [profile, setProfile] = useState<ProfileInfo | null>(null);
  const [education, setEducation] = useState<EducationItem[]>([]);
  const [certifications, setCertifications] = useState<CertificationItem[]>([]);
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAboutData() {
      try {
        const [p, e, c, s] = await Promise.all([
          getProfile(),
          getEducation(),
          getCertifications(),
          getSkills()
        ]);
        setProfile(p);
        setEducation(e);
        setCertifications(c);
        setSkills(s);
      } finally {
        setLoading(false);
      }
    }
    loadAboutData();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <MetaTags 
        title="Sobre Jair | Ingeniero de Sistemas — BLACKTECHSEC"
        description="Conoce a Jair Alexis Martinez: Ingeniero de Sistemas enfocado en backend, análisis de datos, ciberseguridad aplicada e IA. Creador de BlackTechSec."
      />

      {/* =========================================================================
          HEADER & PROFILE SUMMARY
          ========================================================================= */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
          <img
            src="/img/profile.jpg"
            alt="Jair Alexis Martinez"
            className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl object-cover border-2 border-zinc-800 shadow-xl light:border-zinc-300"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1534972195531-a756b1140f6c?w=400&h=400&fit=crop';
            }}
          />
          <div className="space-y-3 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <Badge variant="accent">Creador de BlackTechSec</Badge>
              <Badge variant="outline">Ingeniero de Sistemas · UNAD</Badge>
              <Badge variant="success">Disponible Remoto</Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 light:text-zinc-900">
              Jair Alexis Martinez
            </h1>
            <p className="font-mono text-sm text-brand-400 light:text-brand-600">
              Desarrollo Backend · Análisis de Datos · Ciberseguridad Aplicada
            </p>
            <p className="text-sm text-zinc-400 flex items-center justify-center sm:justify-start gap-1 font-mono light:text-zinc-600">
              <MapPin className="w-3.5 h-3.5 text-zinc-500" />
              Colombia · Remoto para LATAM & Global
            </p>

            <div className="pt-3 flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <Button 
                href="/Curriculum_Vitae.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                variant="primary" 
                size="sm" 
                icon={<Download className="w-4 h-4" />}
              >
                Descargar CV Oficial (PDF)
              </Button>
              <Button 
                href="https://github.com/alexis2487" 
                target="_blank" 
                rel="noopener noreferrer" 
                variant="secondary" 
                size="sm" 
                icon={<Github className="w-4 h-4" />}
              >
                GitHub
              </Button>
              <Button 
                href="https://www.linkedin.com/in/jair-alexis-martinez-302b78305/" 
                target="_blank" 
                rel="noopener noreferrer" 
                variant="outline" 
                size="sm" 
                icon={<Linkedin className="w-4 h-4" />}
              >
                LinkedIn
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          HISTORIA Y TRAYECTORIA (REQ 30 & 48)
          ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-100 light:text-zinc-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-brand-400" />
          <span>Evolución Profesional y Tecnológica</span>
        </h2>
        
        <Card className="p-8 space-y-4 text-zinc-300 leading-relaxed light:text-zinc-700">
          <p>
            Mi camino en la ingeniería comenzó con una fascinación genuina por entender cómo funcionan los sistemas por dentro: desde la arquitectura de red y los protocolos de comunicación, hasta la lógica backend que procesa y protege cada dato crítico.
          </p>
          <p>
            Como egresado de <strong>Ingeniería de Sistemas de la UNAD</strong> y actualmente cursando la <strong>Especialización en Seguridad Informática</strong>, mi enfoque técnico combina dos mundos que considero inseparables: la construcción de soluciones backend eficientes (con C#, .NET y Python) y la defensa proactiva de sistemas mediante monitoreo continuo, análisis de eventos y telemetría de seguridad.
          </p>
          <p>
            No me considero un gurú ni un experto absoluto; soy un ingeniero enfocado en resolver problemas reales, guiado por la mentalidad de aprendizaje autónomo y rigor técnico. <strong>BLACKTECHSEC</strong> nace como el registro público de esa evolución: un espacio para experimentar con IA, automatizar flujos de datos, documentar laboratorios y compartir aprendizajes abiertos con la comunidad técnica.
          </p>
        </Card>
      </section>

      {/* =========================================================================
          FORMACIÓN ACADÉMICA (REQ 6 & 47)
          ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-100 light:text-zinc-900 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-brand-400" />
          <span>Formación Académica</span>
        </h2>

        <div className="space-y-4">
          {education.map((item) => (
            <Card key={item.id} className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h3 className="text-lg font-bold text-zinc-100 light:text-zinc-900">
                  {item.degree}
                </h3>
                <div className="flex items-center gap-2">
                  <Badge variant={item.status.includes('Graduado') ? 'success' : 'accent'}>
                    {item.status}
                  </Badge>
                  {item.period && (
                    <span className="font-mono text-xs text-zinc-400 light:text-zinc-500">
                      {item.period}
                    </span>
                  )}
                </div>
              </div>
              <p className="text-sm font-medium text-brand-400 mb-2 light:text-brand-600">
                {item.institution}
              </p>
              {item.description && (
                <p className="text-sm text-zinc-400 light:text-zinc-600 leading-relaxed">
                  {item.description}
                </p>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* =========================================================================
          CERTIFICACIONES Y LOGROS (REQ 7 & 47)
          ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-100 light:text-zinc-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-accent-cyan" />
          <span>Certificaciones & Participaciones Técnicas</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certifications.map((cert) => (
            <Card key={cert.id} className="p-5 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="font-mono text-xs text-brand-400 light:text-brand-600 font-semibold">
                    {cert.entity}
                  </span>
                  <Badge variant="outline" size="sm">
                    {cert.year}
                  </Badge>
                </div>
                <h3 className="text-base font-bold text-zinc-100 light:text-zinc-900">
                  {cert.title}
                </h3>
                {cert.description && (
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed light:text-zinc-600">
                    {cert.description}
                  </p>
                )}
              </div>

              {cert.topics && cert.topics.length > 0 && (
                <div className="pt-3 border-t border-zinc-800/60 flex flex-wrap gap-1.5 light:border-zinc-200">
                  {cert.topics.map((topic, i) => (
                    <span key={i} className="font-mono text-[11px] text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded light:bg-zinc-200 light:text-zinc-700">
                      {topic}
                    </span>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* =========================================================================
          HABILIDADES TÉCNICAS (REQ 8 & 47)
          ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-100 light:text-zinc-900 flex items-center gap-2">
          <Code2 className="w-5 h-5 text-emerald-400" />
          <span>Habilidades & Tecnologías</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skillGroup, idx) => (
            <Card key={idx} className="p-5 space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-wider text-brand-400 font-bold light:text-brand-600">
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.skills.map((skill, sIdx) => (
                  <Badge key={sIdx} variant="default" size="sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* =========================================================================
          DESCARGA DE CV Y CONTACTO
          ========================================================================= */}
      <section className="pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 light:border-zinc-200">
        <div>
          <h4 className="font-medium text-zinc-200 light:text-zinc-800">
            ¿Necesitas una copia en PDF para tu proceso de selección?
          </h4>
          <p className="text-xs text-zinc-400 light:text-zinc-500">
            Documento actualizado con detalle de experiencia y proyectos.
          </p>
        </div>
        <Button 
          href="/Curriculum_Vitae.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
          variant="primary"
          icon={<Download className="w-4 h-4" />}
        >
          Descargar Currículum Vitae
        </Button>
      </section>

    </div>
  );
};
