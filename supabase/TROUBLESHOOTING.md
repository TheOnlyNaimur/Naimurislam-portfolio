# RLS Troubleshooting Guide

## Common Issues When Enabling RLS

### 🔴 Issue 1: "new row violates row-level security policy"

**When it happens:**

- When trying to create a new project or blog post from the admin dashboard
- After enabling RLS for the first time

**Why it happens:**

- The user is not authenticated properly
- The session token is not being sent with the request
- The RLS policy is too restrictive

**Solution:**

```bash
# 1. Check if you're logged in
- Go to /admin and login again
- Open browser DevTools > Application > Local Storage
- Check for "supabase.auth.token" key

# 2. Verify the session in console
console.log(await supabase.auth.getSession())

# 3. If no session, login again:
- Clear browser cache/cookies
- Login at /admin again
- Try creating content again
```

---

### 🔴 Issue 2: Cannot Read Data on Public Site

**When it happens:**

- Projects or blog posts don't show up on the homepage
- Empty state appears even though data exists in the database

**Why it happens:**

- Public SELECT policy is missing or incorrect
- RLS is enabled but no public read policy exists

**Solution:**

```sql
-- Run in Supabase SQL Editor:

-- Check if public can read:
SET ROLE anon;
SELECT * FROM projects LIMIT 1;
RESET ROLE;

-- If error, apply the public read policy:
CREATE POLICY "Public read access for projects"
ON public.projects
FOR SELECT
TO public
USING (true);

CREATE POLICY "Public read access for blog_posts"
ON public.blog_posts
FOR SELECT
TO public
USING (true);
```

---

### 🔴 Issue 3: Admin Can Read But Cannot Write

**When it happens:**

- Can see projects/blogs in admin dashboard
- Cannot create new projects or blog posts
- Get "permission denied" or "policy violation" error

**Why it happens:**

- Missing INSERT/UPDATE/DELETE policies for authenticated users
- User is not properly authenticated

**Solution:**

```sql
-- Apply write policies for authenticated users:

CREATE POLICY "Authenticated users can insert projects"
ON public.projects
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
ON public.projects
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete projects"
ON public.projects
FOR DELETE
TO authenticated
USING (true);
```

---

### 🔴 Issue 4: Session Keeps Expiring

**When it happens:**

- Get logged out frequently
- Need to re-login every time you refresh the admin page

**Why it happens:**

- Default session expiry is too short
- Auth state is not being persisted
- CORS or cookie issues

**Solution:**

1. **Check Supabase Auth Settings:**
   - Go to Dashboard > Authentication > Settings
   - Set JWT expiry to higher value (default: 3600 seconds)

2. **Check Code:**

```typescript
// In src/integrations/supabase/client.ts
// Make sure it's set up correctly:
export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  },
);
```

---

### 🔴 Issue 5: Technologies Not Inserting with Projects

**When it happens:**

- Projects are created but technologies don't get linked
- Error when trying to add multiple technologies

**Why it happens:**

- Missing RLS policies on `technologies` or `project_technologies` tables
- Junction table policies not set correctly

**Solution:**

```sql
-- Ensure all technology-related tables have proper policies:

-- For technologies table:
CREATE POLICY "Authenticated users can insert technologies"
ON public.technologies
FOR INSERT
TO authenticated
WITH CHECK (true);

-- For project_technologies junction table:
CREATE POLICY "Authenticated users can insert project_technologies"
ON public.project_technologies
FOR INSERT
TO authenticated
WITH CHECK (true);
```

---

### 🔴 Issue 6: Getting 403 Forbidden Errors

**When it happens:**

- API requests return 403 Forbidden
- Happens after enabling RLS

**Why it happens:**

- Supabase client is not sending auth headers
- Session is invalid or expired
- Service role key is being used instead of anon key

**Solution:**

1. **Check your environment variables:**

```typescript
// Should use ANON/PUBLIC key, NOT service_role key
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
// NOT: const SUPABASE_SERVICE_KEY = "..."
```

2. **Verify auth headers are sent:**

```typescript
// Check in browser DevTools > Network tab
// Look for requests to Supabase
// Headers should include: apikey and Authorization
```

---

## Quick Fix Checklist

When RLS issues occur, go through this checklist:

- [ ] RLS is enabled on all tables (`ALTER TABLE ... ENABLE ROW LEVEL SECURITY`)
- [ ] Public SELECT policies exist for all tables
- [ ] Authenticated INSERT/UPDATE/DELETE policies exist
- [ ] User is logged in (check `/admin`)
- [ ] Session is valid (check browser local storage)
- [ ] Using correct Supabase keys (anon key, not service role)
- [ ] Auth state is being persisted (`persistSession: true`)
- [ ] No CORS errors in browser console
- [ ] Policies are applied to ALL related tables (including junction tables)

---

## Testing Your RLS Setup

### Test 1: Public Access (Should Work)

```bash
# Open incognito/private browser window (not logged in)
# Visit: http://localhost:8080
# You should see: projects and blog posts displayed
```

### Test 2: Public Write (Should Fail)

```javascript
// Open browser console on public site (not logged in)
// Try to insert data (this should fail):
const { error } = await supabase.from("projects").insert({
  title: "Test",
  description: "Test",
  image: "test.jpg",
  category: "Test",
  liveurl: "http://test.com",
  githuburl: "http://github.com",
  featured: false,
});
console.log(error); // Should show RLS policy violation
```

### Test 3: Admin Write (Should Work)

```bash
# Login at /admin
# Go to /admin/dashboard
# Try creating a new project
# Should work without errors
```

---

## Emergency: Temporarily Disable RLS

⚠️ **WARNING: Only for local development/debugging!**

If you need to temporarily disable RLS to troubleshoot:

```sql
-- Disable RLS (DEVELOPMENT ONLY!)
ALTER TABLE public.projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.technologies DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_technologies DISABLE ROW LEVEL SECURITY;
```

**Remember to re-enable it:**

```sql
-- Re-enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_technologies ENABLE ROW LEVEL SECURITY;
```

---

## Still Having Issues?

1. Check Supabase logs in Dashboard > Logs
2. Check browser console for JavaScript errors
3. Run the test queries in `test_rls.sql`
4. Verify your migration was applied: `SELECT * FROM pg_policies;`
5. Contact Supabase support or check their Discord
