# Supabase Configuration

## Row Level Security (RLS) Setup

This directory contains the necessary SQL migrations to enable Row Level Security on your Supabase database.

### What is RLS?

Row Level Security (RLS) is a PostgreSQL security feature that restricts which rows a user can access in database tables. It's essential for securing your data.

### Current Setup

The migration file `migrations/001_enable_rls_policies.sql` contains policies that:

#### For Public Users (Anonymous):

- ✅ **READ** projects, blog posts, technologies (for portfolio display)
- ❌ **NO WRITE** access (cannot create/update/delete)

#### For Authenticated Users (Admin):

- ✅ **FULL ACCESS** to all tables (create, read, update, delete)
- Can manage projects, blog posts, and technologies through the admin dashboard

### How to Apply the Migration

You have **3 options** to apply these RLS policies:

#### Option 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Navigate to **SQL Editor**
3. Copy the contents of `migrations/001_enable_rls_policies.sql`
4. Paste into the SQL Editor
5. Click **Run** to execute

#### Option 2: Using Supabase CLI

```bash
# If you have Supabase CLI installed
supabase db push

# Or apply the specific migration
supabase db push --file supabase/migrations/001_enable_rls_policies.sql
```

#### Option 3: Manual SQL Execution

If you're using a different PostgreSQL client:

```bash
# Connect to your database and run:
psql -h <your-db-host> -U postgres -d postgres -f supabase/migrations/001_enable_rls_policies.sql
```

### Verifying RLS is Working

After applying the migration:

1. **Test as Anonymous User:**
   - Visit your portfolio website
   - You should see projects and blog posts
   - Try accessing the admin panel - you should NOT be able to create/edit content

2. **Test as Authenticated Admin:**
   - Login at `/admin`
   - You should be able to create/edit/delete projects and blog posts
   - Check the browser console for any errors

### Common Issues & Solutions

#### Issue: "new row violates row-level security policy"

**Cause:** You're trying to write data while not authenticated, or RLS policies aren't properly set.

**Solution:**

1. Make sure you're logged in at `/admin` before accessing the dashboard
2. Check that the migration was applied successfully
3. Verify the session is active (check browser console)

#### Issue: "permission denied for table X"

**Cause:** The authenticated user doesn't have permissions.

**Solution:**

1. Re-run the migration SQL
2. Make sure you're using the correct authentication method
3. Check that `authenticated` role has proper grants

#### Issue: "Cannot read blog posts/projects on public site"

**Cause:** Public read policies might not be applied.

**Solution:**

1. Verify the SELECT policies for `public` role exist:
   ```sql
   SELECT * FROM pg_policies WHERE tablename IN ('projects', 'blog_posts');
   ```
2. Re-apply the migration if policies are missing

### Database Schema

Your portfolio uses these tables:

- **projects**: Stores project information
- **blog_posts**: Stores blog articles
- **technologies**: Stores technology names
- **project_technologies**: Junction table linking projects to technologies
- **page_visits** (optional): Tracks page visits for analytics

### Security Best Practices

✅ **DO:**

- Keep your Supabase API keys secure (never commit to public repos)
- Only give admin access to trusted users
- Regularly audit your RLS policies
- Use environment variables for sensitive data

❌ **DON'T:**

- Disable RLS in production (only for development/testing)
- Share your service role key publicly
- Give public users write access
- Hard-code credentials in your code

### Additional Resources

- [Supabase RLS Documentation](https://supabase.com/docs/guides/auth/row-level-security)
- [PostgreSQL RLS Documentation](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)
- [Supabase Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers)

---

## Need Help?

If you're still experiencing issues after applying the migration:

1. Check the Supabase logs in your dashboard
2. Open browser DevTools console to see client-side errors
3. Verify your auth session is valid
4. Review the RLS policies in Supabase Dashboard > Authentication > Policies
