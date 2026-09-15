export type ContentCategory = 'AI' | 'Cybersecurity' | 'Development' | 'Technology' | 'Lifestyle' | string;

export type ContentPlatform = 'YouTube' | 'Instagram' | 'TikTok' | 'Website' | 'GitHub' | 'Other';

export type ContentStatus = 'Draft' | 'Published' | 'Archived';

export interface ContentItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  content?: string;
  category: ContentCategory;
  tags: string[];
  cover_image?: string;
  publication_date: string;
  external_url?: string;
  platform: ContentPlatform;
  featured: boolean;
  published: boolean;
  created_at?: string;
  updated_at?: string;
}

export type ProjectStatus = 'Concept' | 'Experimental' | 'In Development' | 'Completed' | 'Archived';

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  technologies: string[];
  category: string;
  status: ProjectStatus;
  cover_image?: string;
  gallery?: string[];
  github_url?: string;
  live_url?: string;
  featured: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ExperimentItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  technologies: string[];
  category: string;
  cover_image?: string;
  github_url?: string;
  status: string;
  publication_date: string;
  featured: boolean;
  created_at?: string;
}

export interface NoteItem {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  tags: string[];
  cover_image?: string;
  publication_date: string;
  published: boolean;
  created_at?: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  entity: string;
  year: string;
  description?: string;
  topics?: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  status: string;
  period?: string;
  description?: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface ProfileInfo {
  name: string;
  brandName: string;
  conceptualName: string;
  tagline: string;
  bio: string;
  philosophy: string;
  location: string;
  availability: string;
  email: string;
  cvUrl: string;
  socials: {
    github: string;
    linkedin: string;
    twitter?: string;
    youtube?: string;
    instagram?: string;
    tiktok?: string;
  };
  donationUrl?: string;
  currentlyExploring: string[];
}
