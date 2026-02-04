-- Enable Row Level Security on all tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_technologies ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any (for idempotency)
DROP POLICY IF EXISTS "Public read access for projects" ON public.projects;
DROP POLICY IF EXISTS "Authenticated users can insert projects" ON public.projects;
DROP POLICY IF EXISTS "Authenticated users can update projects" ON public.projects;
DROP POLICY IF EXISTS "Authenticated users can delete projects" ON public.projects;

DROP POLICY IF EXISTS "Public read access for blog_posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Authenticated users can insert blog_posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Authenticated users can update blog_posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Authenticated users can delete blog_posts" ON public.blog_posts;

DROP POLICY IF EXISTS "Public read access for technologies" ON public.technologies;
DROP POLICY IF EXISTS "Authenticated users can insert technologies" ON public.technologies;
DROP POLICY IF EXISTS "Authenticated users can update technologies" ON public.technologies;
DROP POLICY IF EXISTS "Authenticated users can delete technologies" ON public.technologies;

DROP POLICY IF EXISTS "Public read access for project_technologies" ON public.project_technologies;
DROP POLICY IF EXISTS "Authenticated users can insert project_technologies" ON public.project_technologies;
DROP POLICY IF EXISTS "Authenticated users can update project_technologies" ON public.project_technologies;
DROP POLICY IF EXISTS "Authenticated users can delete project_technologies" ON public.project_technologies;

-- ============================================
-- PROJECTS TABLE POLICIES
-- ============================================

-- Allow everyone to read projects (for portfolio display)
CREATE POLICY "Public read access for projects"
ON public.projects
FOR SELECT
TO public
USING (true);

-- Allow authenticated users to insert projects
CREATE POLICY "Authenticated users can insert projects"
ON public.projects
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow authenticated users to update projects
CREATE POLICY "Authenticated users can update projects"
ON public.projects
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Allow authenticated users to delete projects
CREATE POLICY "Authenticated users can delete projects"
ON public.projects
FOR DELETE
TO authenticated
USING (true);

-- ============================================
-- BLOG_POSTS TABLE POLICIES
-- ============================================

-- Allow everyone to read blog posts (for blog display)
CREATE POLICY "Public read access for blog_posts"
ON public.blog_posts
FOR SELECT
TO public
USING (true);

-- Allow authenticated users to insert blog posts
CREATE POLICY "Authenticated users can insert blog_posts"
ON public.blog_posts
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow authenticated users to update blog posts
CREATE POLICY "Authenticated users can update blog_posts"
ON public.blog_posts
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Allow authenticated users to delete blog posts
CREATE POLICY "Authenticated users can delete blog_posts"
ON public.blog_posts
FOR DELETE
TO authenticated
USING (true);

-- ============================================
-- TECHNOLOGIES TABLE POLICIES
-- ============================================

-- Allow everyone to read technologies (for displaying project tech stacks)
CREATE POLICY "Public read access for technologies"
ON public.technologies
FOR SELECT
TO public
USING (true);

-- Allow authenticated users to insert technologies
CREATE POLICY "Authenticated users can insert technologies"
ON public.technologies
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow authenticated users to update technologies
CREATE POLICY "Authenticated users can update technologies"
ON public.technologies
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Allow authenticated users to delete technologies
CREATE POLICY "Authenticated users can delete technologies"
ON public.technologies
FOR DELETE
TO authenticated
USING (true);

-- ============================================
-- PROJECT_TECHNOLOGIES TABLE POLICIES
-- ============================================

-- Allow everyone to read project_technologies (for displaying project tech stacks)
CREATE POLICY "Public read access for project_technologies"
ON public.project_technologies
FOR SELECT
TO public
USING (true);

-- Allow authenticated users to insert project_technologies
CREATE POLICY "Authenticated users can insert project_technologies"
ON public.project_technologies
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow authenticated users to update project_technologies
CREATE POLICY "Authenticated users can update project_technologies"
ON public.project_technologies
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Allow authenticated users to delete project_technologies
CREATE POLICY "Authenticated users can delete project_technologies"
ON public.project_technologies
FOR DELETE
TO authenticated
USING (true);

-- ============================================
-- OPTIONAL: PAGE_VISITS TABLE (if it exists)
-- ============================================
-- Uncomment these if you have a page_visits table

-- ALTER TABLE IF EXISTS public.page_visits ENABLE ROW LEVEL SECURITY;
-- 
-- DROP POLICY IF EXISTS "Anyone can insert page visits" ON public.page_visits;
-- DROP POLICY IF EXISTS "Authenticated users can read page visits" ON public.page_visits;
-- 
-- CREATE POLICY "Anyone can insert page visits"
-- ON public.page_visits
-- FOR INSERT
-- TO public
-- WITH CHECK (true);
-- 
-- CREATE POLICY "Authenticated users can read page visits"
-- ON public.page_visits
-- FOR SELECT
-- TO authenticated
-- USING (true);
