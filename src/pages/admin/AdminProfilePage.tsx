import React, { useEffect, useState } from 'react';
import { User, Save, Upload, Check, AlertCircle, FileText, Download } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { getProfile, saveProfile, getEducation, saveEducation } from '../../services/profileService';
import { uploadFile } from '../../services/storageService';
import { ProfileInfo, EducationItem } from '../../types';

export const AdminProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<ProfileInfo | null>(null);
  const [education, setEducation] = useState<EducationItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const p = await getProfile();
      const e = await getEducation();
      setProfile(p);
      setEducation(e);
    }
    load();
  }, []);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    await saveProfile(profile);
    setFeedback('Perfil actualizado correctamente.');
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleEducationUpdate = async (item: EducationItem) => {
    const updated = await saveEducation(item);
    setEducation(updated);
    setFeedback('Información académica actualizada.');
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleCvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;

    setUploading(true);
    const { url, error } = await uploadFile(file, 'cv');
    setUploading(false);

    if (error || !url) {
      alert(`Error al subir CV: ${error}`);
    } else {
      const updated = { ...profile, cvUrl: url };
      setProfile(updated);
      await saveProfile(updated);
      setFeedback('Nuevo archivo de CV subido y vinculado.');
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  if (!profile) {
    return <div className="p-8 text-center text-xs font-mono text-zinc-500">Cargando perfil...</div>;
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100 light:text-zinc-900 flex items-center gap-2">
          <User className="w-6 h-6 text-brand-400" />
          <span>Perfil Profesional & Ajustes</span>
        </h1>
        <p className="text-xs font-mono text-zinc-400">
          Modifica tu biografía, estado académico y enlace del CV sin tocar código
        </p>
      </div>

      {feedback && (
        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      {/* CV Uploader Section */}
      <Card className="p-6 space-y-4">
        <h2 className="text-base font-bold text-zinc-100 light:text-zinc-900 flex items-center gap-2">
          <FileText className="w-4 h-4 text-brand-400" />
          <span>Currículum Vitae Descargable (PDF)</span>
        </h2>
        <p className="text-xs text-zinc-400 light:text-zinc-600">
          El botón de descarga del sitio web apunta actualmente a: <code className="text-brand-400 font-mono">{profile.cvUrl}</code>
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium bg-brand-600 hover:bg-brand-500 text-white transition-colors">
            <Upload className="w-4 h-4" />
            <span>{uploading ? 'Subiendo...' : 'Subir Nuevo PDF de CV'}</span>
            <input
              type="file"
              accept=".pdf"
              onChange={handleCvUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>

          <Button
            href={profile.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="sm"
            icon={<Download className="w-3.5 h-3.5" />}
          >
            Ver CV Actual
          </Button>
        </div>
      </Card>

      {/* Education Management (Req 6) */}
      <Card className="p-6 space-y-4">
        <h2 className="text-base font-bold text-zinc-100 light:text-zinc-900">
          Formación Académica (Editable sin tocar código)
        </h2>

        <div className="space-y-4">
          {education.map((edu, idx) => (
            <div key={edu.id} className="p-4 rounded-xl border border-zinc-800 space-y-3 bg-zinc-900/30">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">Título / Carrera</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => {
                      const copy = [...education];
                      copy[idx].degree = e.target.value;
                      setEducation(copy);
                    }}
                    className="w-full px-3 py-1.5 rounded-lg text-xs bg-zinc-900 border border-zinc-800 text-zinc-100"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">Estado (Graduado / En curso)</label>
                  <input
                    type="text"
                    value={edu.status}
                    onChange={(e) => {
                      const copy = [...education];
                      copy[idx].status = e.target.value;
                      setEducation(copy);
                    }}
                    className="w-full px-3 py-1.5 rounded-lg text-xs bg-zinc-900 border border-zinc-800 text-zinc-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 mb-1">Institución</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => {
                    const copy = [...education];
                    copy[idx].institution = e.target.value;
                    setEducation(copy);
                  }}
                  className="w-full px-3 py-1.5 rounded-lg text-xs bg-zinc-900 border border-zinc-800 text-zinc-100"
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => handleEducationUpdate(edu)}
                  icon={<Save className="w-3.5 h-3.5" />}
                >
                  Actualizar Formación
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Main Profile Settings Form */}
      <Card className="p-6">
        <form onSubmit={handleProfileSave} className="space-y-4">
          <h2 className="text-base font-bold text-zinc-100 light:text-zinc-900 mb-4">
            Información General & Enlaces
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Nombre</label>
              <input
                type="text"
                value={profile.name}
                onChange={e => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Email Oficial</label>
              <input
                type="email"
                value={profile.email}
                onChange={e => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-3 py-2 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Ubicación</label>
              <input
                type="text"
                value={profile.location}
                onChange={e => setProfile({ ...profile, location: e.target.value })}
                className="w-full px-3 py-2 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Disponibilidad</label>
              <input
                type="text"
                value={profile.availability}
                onChange={e => setProfile({ ...profile, availability: e.target.value })}
                className="w-full px-3 py-2 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Biografía / Presentación Principal</label>
            <textarea
              rows={3}
              value={profile.bio}
              onChange={e => setProfile({ ...profile, bio: e.target.value })}
              className="w-full px-3 py-2 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">LinkedIn URL</label>
              <input
                type="url"
                value={profile.socials.linkedin}
                onChange={e => setProfile({ ...profile, socials: { ...profile.socials, linkedin: e.target.value } })}
                className="w-full px-3 py-2 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">GitHub URL</label>
              <input
                type="url"
                value={profile.socials.github}
                onChange={e => setProfile({ ...profile, socials: { ...profile.socials, github: e.target.value } })}
                className="w-full px-3 py-2 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-zinc-800">
            <Button type="submit" variant="primary" icon={<Save className="w-4 h-4" />}>
              Guardar Cambios de Perfil
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
