-- ============================================
-- RLS TESTING & VERIFICATION QUERIES
-- ============================================
-- Run these queries in Supabase SQL Editor to verify RLS is working correctly

-- ============================================
-- 1. CHECK IF RLS IS ENABLED
-- ============================================
SELECT 
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('projects', 'blog_posts', 'technologies', 'project_technologies')
ORDER BY tablename;

-- Expected: All tables should show rls_enabled = true

-- ============================================
-- 2. VIEW ALL POLICIES
-- ============================================
SELECT 
    tablename,
    policyname,
    permissive,
    roles,
    cmd as operation,
    qual as using_expression,
    with_check as with_check_expression
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- Expected: Should see multiple policies for each table

-- ============================================
-- 3. TEST PUBLIC READ ACCESS (as anonymous user)
-- ============================================
-- This simulates what a non-logged-in user can do

SET ROLE anon;

-- Should work (public can read)
SELECT COUNT(*) as projects_count FROM projects;
SELECT COUNT(*) as blog_posts_count FROM blog_posts;
SELECT COUNT(*) as technologies_count FROM technologies;

-- Should fail (public cannot insert)
-- INSERT INTO projects (title, description, image, category, liveurl, githuburl, featured)
-- VALUES ('Test', 'Test', 'test.jpg', 'Test', 'http://test.com', 'http://github.com', false);
-- Expected error: new row violates row-level security policy

RESET ROLE;

-- ============================================
-- 4. TEST AUTHENTICATED USER ACCESS (as admin)
-- ============================================
-- This simulates what a logged-in admin can do

-- First, you need to get a real authenticated user's ID
-- You can find this in Supabase Dashboard > Authentication > Users
-- Replace 'YOUR-USER-UUID-HERE' with actual UUID

-- SET ROLE authenticated;
-- SET request.jwt.claim.sub = 'YOUR-USER-UUID-HERE';

-- Should work (authenticated users have full access)
-- SELECT COUNT(*) FROM projects;
-- INSERT INTO projects (title, description, image, category, liveurl, githuburl, featured)
-- VALUES ('Test Project', 'Testing RLS', 'test.jpg', 'Testing', 'http://test.com', 'http://github.com', false);

-- Clean up test
-- DELETE FROM projects WHERE title = 'Test Project';

-- RESET ROLE;

-- ============================================
-- 5. CHECK FOR MISSING POLICIES
-- ============================================
-- Ensures all required policies exist

WITH required_policies AS (
    SELECT unnest(ARRAY[
        'projects', 'projects', 'projects', 'projects',
        'blog_posts', 'blog_posts', 'blog_posts', 'blog_posts',
        'technologies', 'technologies', 'technologies', 'technologies',
        'project_technologies', 'project_technologies', 'project_technologies', 'project_technologies'
    ]) as tablename,
    unnest(ARRAY[
        'SELECT', 'INSERT', 'UPDATE', 'DELETE',
        'SELECT', 'INSERT', 'UPDATE', 'DELETE',
        'SELECT', 'INSERT', 'UPDATE', 'DELETE',
        'SELECT', 'INSERT', 'UPDATE', 'DELETE'
    ]) as cmd
)
SELECT 
    rp.tablename,
    rp.cmd,
    CASE 
        WHEN pp.policyname IS NULL THEN '❌ MISSING'
        ELSE '✅ EXISTS'
    END as policy_status,
    pp.policyname
FROM required_policies rp
LEFT JOIN pg_policies pp 
    ON pp.tablename = rp.tablename 
    AND pp.cmd = rp.cmd
    AND pp.schemaname = 'public'
ORDER BY rp.tablename, rp.cmd;

-- ============================================
-- 6. TEST DATA ACCESS PATTERNS
-- ============================================

-- View all projects (should work for everyone)
SELECT id, title, category, featured FROM projects LIMIT 5;

-- View all blog posts (should work for everyone)
SELECT id, title, category, created_at FROM blog_posts LIMIT 5;

-- View technologies and their associated projects (should work for everyone)
SELECT 
    t.name as technology,
    COUNT(pt.project_id) as project_count
FROM technologies t
LEFT JOIN project_technologies pt ON t.id = pt.technology_id
GROUP BY t.id, t.name
ORDER BY project_count DESC;

-- ============================================
-- 7. VERIFY POLICY ROLES
-- ============================================
-- Check which roles have access to each policy

SELECT 
    tablename,
    policyname,
    CASE 
        WHEN roles = '{public}' THEN '🌐 Public (Everyone)'
        WHEN roles = '{authenticated}' THEN '🔐 Authenticated (Logged in)'
        ELSE roles::text
    END as access_level,
    cmd as operation
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, operation;

-- ============================================
-- 8. TROUBLESHOOTING: FORCE POLICY REFRESH
-- ============================================
-- If policies seem not to work, try refreshing them

-- NOTIFY pgrst, 'reload schema';
-- Or restart PostgREST if using Supabase locally

-- ============================================
-- 9. CHECK TABLE OWNERSHIP
-- ============================================
-- Ensure tables are owned by the correct role

SELECT 
    schemaname,
    tablename,
    tableowner
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('projects', 'blog_posts', 'technologies', 'project_technologies');

-- Expected: All tables should be owned by 'postgres'

-- ============================================
-- 10. DISABLE RLS (DEVELOPMENT/TESTING ONLY)
-- ============================================
-- ⚠️ WARNING: Only use this for local development/debugging
-- ⚠️ NEVER disable RLS in production!

-- To disable RLS (not recommended):
-- ALTER TABLE public.projects DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.blog_posts DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.technologies DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.project_technologies DISABLE ROW LEVEL SECURITY;

-- To re-enable RLS:
-- ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.technologies ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.project_technologies ENABLE ROW LEVEL SECURITY;
