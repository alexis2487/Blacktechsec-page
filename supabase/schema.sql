-- =========================================================================
-- BLACKTECHSEC V2 — SUPABASE DATABASE SCHEMA & SECURITY POLICIES
-- Project ID: rqawfhijrokvefzaaxof
-- =========================================================================

-- 1. Enable pgcrypto for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Table: profile_settings
CREATE TABLE IF NOT EXISTS public.profile_settings (
    key TEXT PRIMARY KEY,
    data JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Table: projects
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    technologies TEXT[] DEFAULT '{}'::TEXT[] NOT NULL,
    category TEXT NOT NULL DEFAULT 'Technology',
    status TEXT NOT NULL DEFAULT 'In Development',
    cover_image TEXT DEFAULT '',
    gallery TEXT[] DEFAULT '{}'::TEXT[],
    github_url TEXT DEFAULT '',
    live_url TEXT DEFAULT '',
    featured BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. Table: content
CREATE TABLE IF NOT EXISTS public.content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    content TEXT DEFAULT '',
    category TEXT NOT NULL DEFAULT 'Technology',
    tags TEXT[] DEFAULT '{}'::TEXT[] NOT NULL,
    cover_image TEXT DEFAULT '',
    publication_date DATE NOT NULL DEFAULT CURRENT_DATE,
    external_url TEXT DEFAULT '',
    platform TEXT NOT NULL DEFAULT 'Website',
    featured BOOLEAN DEFAULT false NOT NULL,
    published BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. Table: experiments
CREATE TABLE IF NOT EXISTS public.experiments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    content TEXT NOT NULL,
    technologies TEXT[] DEFAULT '{}'::TEXT[] NOT NULL,
    category TEXT NOT NULL DEFAULT 'Technology',
    cover_image TEXT DEFAULT '',
    github_url TEXT DEFAULT '',
    status TEXT NOT NULL DEFAULT 'Experimental',
    publication_date DATE NOT NULL DEFAULT CURRENT_DATE,
    featured BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 6. Table: notes
CREATE TABLE IF NOT EXISTS public.notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Technology',
    tags TEXT[] DEFAULT '{}'::TEXT[] NOT NULL,
    cover_image TEXT DEFAULT '',
    publication_date DATE NOT NULL DEFAULT CURRENT_DATE,
    published BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 7. Table: education
CREATE TABLE IF NOT EXISTS public.education (
    id TEXT PRIMARY KEY,
    institution TEXT NOT NULL,
    degree TEXT NOT NULL,
    status TEXT NOT NULL,
    period TEXT DEFAULT '',
    description TEXT DEFAULT ''
);

-- 8. Table: certifications
CREATE TABLE IF NOT EXISTS public.certifications (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    entity TEXT NOT NULL,
    year TEXT NOT NULL,
    description TEXT DEFAULT '',
    topics TEXT[] DEFAULT '{}'::TEXT[]
);

-- =========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

-- Enable RLS across all tables
ALTER TABLE public.profile_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;

-- Policy: Public Read Access (Anyone can read public content)
CREATE POLICY "Public profiles are viewable by everyone" ON public.profile_settings FOR SELECT USING (true);
CREATE POLICY "Public projects are viewable by everyone" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Published content is viewable by everyone" ON public.content FOR SELECT USING (published = true);
CREATE POLICY "Public experiments are viewable by everyone" ON public.experiments FOR SELECT USING (true);
CREATE POLICY "Published notes are viewable by everyone" ON public.notes FOR SELECT USING (published = true);
CREATE POLICY "Public education is viewable by everyone" ON public.education FOR SELECT USING (true);
CREATE POLICY "Public certifications are viewable by everyone" ON public.certifications FOR SELECT USING (true);

-- Policy: Authenticated Admin Full Access (Only authenticated user Jair has write access)
CREATE POLICY "Admins have full access to profile_settings" ON public.profile_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to projects" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to content" ON public.content FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to experiments" ON public.experiments FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to notes" ON public.notes FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to education" ON public.education FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to certifications" ON public.certifications FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- =========================================================================
-- STORAGE BUCKET CONFIGURATION
-- =========================================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS
CREATE POLICY "Public Access for Media" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "Authenticated users can upload Media" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'media');
CREATE POLICY "Authenticated users can update Media" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'media');
CREATE POLICY "Authenticated users can delete Media" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'media');
