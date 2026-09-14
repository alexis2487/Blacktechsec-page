import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { ProfileInfo, EducationItem, CertificationItem, SkillCategory } from '../types';
import { initialProfile, initialEducation, initialCertifications, initialSkills } from '../data/initialData';

let localProfile: ProfileInfo = { ...initialProfile };
let localEducation: EducationItem[] = [...initialEducation];
let localCertifications: CertificationItem[] = [...initialCertifications];
let localSkills: SkillCategory[] = [...initialSkills];

export async function getProfile(): Promise<ProfileInfo> {
  if (!isSupabaseConfigured || !supabase) {
    return { ...localProfile };
  }

  try {
    const { data, error } = await supabase
      .from('profile_settings')
      .select('data')
      .eq('key', 'main_profile')
      .single();

    if (error || !data?.data) {
      return { ...localProfile };
    }

    return data.data as ProfileInfo;
  } catch {
    return { ...localProfile };
  }
}

export async function saveProfile(profile: Partial<ProfileInfo>): Promise<ProfileInfo> {
  localProfile = { ...localProfile, ...profile };

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase
        .from('profile_settings')
        .upsert({
          key: 'main_profile',
          data: localProfile,
          updated_at: new Date().toISOString()
        });
    } catch (err) {
      console.warn('Could not persist profile in Supabase:', err);
    }
  }

  return { ...localProfile };
}

export async function getEducation(): Promise<EducationItem[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [...localEducation];
  }

  try {
    const { data, error } = await supabase
      .from('education')
      .select('*')
      .order('id', { ascending: true });

    if (error || !data || data.length === 0) {
      return [...localEducation];
    }

    return data as EducationItem[];
  } catch {
    return [...localEducation];
  }
}

export async function saveEducation(edu: EducationItem): Promise<EducationItem[]> {
  const index = localEducation.findIndex(e => e.id === edu.id);
  if (index >= 0) {
    localEducation[index] = edu;
  } else {
    localEducation.push(edu);
  }

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('education').upsert([edu]);
    } catch (err) {
      console.warn('Could not save education to Supabase:', err);
    }
  }

  return [...localEducation];
}

export async function deleteEducation(id: string): Promise<EducationItem[]> {
  localEducation = localEducation.filter(e => e.id !== id);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('education').delete().eq('id', id);
    } catch (err) {
      console.warn('Could not delete education from Supabase:', err);
    }
  }

  return [...localEducation];
}

export async function getCertifications(): Promise<CertificationItem[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [...localCertifications];
  }

  try {
    const { data, error } = await supabase
      .from('certifications')
      .select('*')
      .order('year', { ascending: false });

    if (error || !data || data.length === 0) {
      return [...localCertifications];
    }

    return data as CertificationItem[];
  } catch {
    return [...localCertifications];
  }
}

export async function saveCertification(cert: CertificationItem): Promise<CertificationItem[]> {
  const index = localCertifications.findIndex(c => c.id === cert.id);
  if (index >= 0) {
    localCertifications[index] = cert;
  } else {
    localCertifications.push(cert);
  }

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('certifications').upsert([cert]);
    } catch (err) {
      console.warn('Could not save certification to Supabase:', err);
    }
  }

  return [...localCertifications];
}

export async function deleteCertification(id: string): Promise<CertificationItem[]> {
  localCertifications = localCertifications.filter(c => c.id !== id);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('certifications').delete().eq('id', id);
    } catch (err) {
      console.warn('Could not delete certification from Supabase:', err);
    }
  }

  return [...localCertifications];
}

export async function getSkills(): Promise<SkillCategory[]> {
  return [...localSkills];
}

export async function saveSkills(skills: SkillCategory[]): Promise<SkillCategory[]> {
  localSkills = [...skills];
  return [...localSkills];
}
