import { useEffect, useMemo, useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import {
  createProject,
  getProjects,
  NewProjectPayload,
} from "@/services/projectService";
import {
  createBlogPost,
  getBlogPosts,
  NewBlogPayload,
} from "@/services/blogService";
import { signOut } from "@/services/authService";
import { supabase } from "@/integrations/supabase/client";
import {
  ArrowUpRight,
  BarChart3,
  BookOpen,
  FolderPlus,
  LogOut,
  UploadCloud,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [stats, setStats] = useState({ projects: 0, blogs: 0, visits: "--" });
  const [loadingStats, setLoadingStats] = useState(true);

  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    image: "",
    category: "",
    technologies: "",
    liveUrl: "",
    githubUrl: "",
    featured: false,
  });
  const [blogForm, setBlogForm] = useState({
    title: "",
    description: "",
    image: "",
    category: "",
    content: "",
  });

  const [savingProject, setSavingProject] = useState(false);
  const [savingBlog, setSavingBlog] = useState(false);
  const [recentProjects, setRecentProjects] = useState(
    [] as Awaited<ReturnType<typeof getProjects>>,
  );
  const [recentBlogs, setRecentBlogs] = useState(
    [] as Awaited<ReturnType<typeof getBlogPosts>>,
  );

  const techArray = useMemo(
    () =>
      projectForm.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    [projectForm.technologies],
  );

  useEffect(() => {
    const load = async () => {
      setLoadingStats(true);
      try {
        const [{ count: projectCount }, { count: blogCount }] =
          await Promise.all([
            supabase
              .from("projects")
              .select("id", { count: "exact", head: true }),
            supabase
              .from("blog_posts")
              .select("id", { count: "exact", head: true }),
          ]);

        // Attempt to read visits table if it exists; swallow error otherwise
        let visitsDisplay = "--";
        const { count: visitCount, error: visitError } = await supabase
          .from("page_visits" as any)
          .select("id", { count: "exact", head: true });
        if (!visitError && typeof visitCount === "number") {
          visitsDisplay = visitCount.toString();
        }

        setStats({
          projects: projectCount ?? 0,
          blogs: blogCount ?? 0,
          visits: visitsDisplay,
        });
      } catch (error) {
        console.error("Error loading stats", error);
      } finally {
        setLoadingStats(false);
      }
    };

    const loadRecent = async () => {
      const [projectsData, blogsData] = await Promise.all([
        getProjects(),
        getBlogPosts(),
      ]);
      setRecentProjects(projectsData.slice(0, 5));
      setRecentBlogs(blogsData.slice(0, 5));
    };

    load();
    loadRecent();
  }, []);

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProject(true);

    try {
      const payload: NewProjectPayload = {
        title: projectForm.title,
        description: projectForm.description,
        image: projectForm.image,
        category: projectForm.category,
        technologies: techArray,
        liveUrl: projectForm.liveUrl,
        githubUrl: projectForm.githubUrl,
        featured: projectForm.featured,
      };

      await createProject(payload);
      toast({ title: "Project saved" });
      setProjectForm({
        title: "",
        description: "",
        image: "",
        category: "",
        technologies: "",
        liveUrl: "",
        githubUrl: "",
        featured: false,
      });

      const refreshed = await getProjects();
      setRecentProjects(refreshed.slice(0, 5));
    } catch (error: any) {
      toast({
        title: "Could not save project",
        description: error?.message || "Check Supabase permissions/bucket.",
        variant: "destructive",
      });
    } finally {
      setSavingProject(false);
    }
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingBlog(true);

    try {
      const payload: NewBlogPayload = {
        title: blogForm.title,
        description: blogForm.description,
        image: blogForm.image,
        category: blogForm.category,
        content: blogForm.content,
      };

      await createBlogPost(payload);
      toast({ title: "Blog post saved" });
      setBlogForm({
        title: "",
        description: "",
        image: "",
        category: "",
        content: "",
      });

      const refreshed = await getBlogPosts();
      setRecentBlogs(refreshed.slice(0, 5));
    } catch (error: any) {
      toast({
        title: "Could not save blog",
        description: error?.message || "Check Supabase permissions.",
        variant: "destructive",
      });
    } finally {
      setSavingBlog(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin", { replace: true });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-primary">
              Hidden Console
            </p>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage portfolio content and monitor activity.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleSignOut}
            className="inline-flex items-center gap-2"
          >
            <LogOut size={16} /> Sign out
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Projects</CardTitle>
              <FolderPlus className="text-primary" size={18} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {loadingStats ? "--" : stats.projects}
              </div>
              <p className="text-xs text-muted-foreground">Total published</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Blog posts</CardTitle>
              <BookOpen className="text-primary" size={18} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {loadingStats ? "--" : stats.blogs}
              </div>
              <p className="text-xs text-muted-foreground">Total published</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Visits</CardTitle>
              <Users className="text-primary" size={18} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {loadingStats ? "--" : stats.visits}
              </div>
              <p className="text-xs text-muted-foreground">
                Counting from table `page_visits` if present
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <UploadCloud size={18} /> Add Project
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleProjectSubmit}>
                <Input
                  placeholder="Title"
                  value={projectForm.title}
                  onChange={(e) =>
                    setProjectForm((p) => ({ ...p, title: e.target.value }))
                  }
                  required
                />
                <Textarea
                  placeholder="Short description"
                  value={projectForm.description}
                  onChange={(e) =>
                    setProjectForm((p) => ({
                      ...p,
                      description: e.target.value,
                    }))
                  }
                  required
                  rows={3}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    placeholder="Image URL"
                    value={projectForm.image}
                    onChange={(e) =>
                      setProjectForm((p) => ({ ...p, image: e.target.value }))
                    }
                    required
                  />
                  <Input
                    placeholder="Category"
                    value={projectForm.category}
                    onChange={(e) =>
                      setProjectForm((p) => ({
                        ...p,
                        category: e.target.value,
                      }))
                    }
                    required
                  />
                  <Input
                    placeholder="Live URL"
                    value={projectForm.liveUrl}
                    onChange={(e) =>
                      setProjectForm((p) => ({ ...p, liveUrl: e.target.value }))
                    }
                  />
                  <Input
                    placeholder="GitHub URL"
                    value={projectForm.githubUrl}
                    onChange={(e) =>
                      setProjectForm((p) => ({
                        ...p,
                        githubUrl: e.target.value,
                      }))
                    }
                  />
                </div>
                <Input
                  placeholder="Technologies (comma separated)"
                  value={projectForm.technologies}
                  onChange={(e) =>
                    setProjectForm((p) => ({
                      ...p,
                      technologies: e.target.value,
                    }))
                  }
                />
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={projectForm.featured}
                    onChange={(e) =>
                      setProjectForm((p) => ({
                        ...p,
                        featured: e.target.checked,
                      }))
                    }
                  />
                  Mark as featured
                </label>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  {techArray.map((t) => (
                    <Badge key={t} variant="secondary">
                      {t}
                    </Badge>
                  ))}
                </div>
                <Button type="submit" disabled={savingProject}>
                  {savingProject ? "Saving..." : "Save Project"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <BarChart3 size={18} /> Add Blog Post
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleBlogSubmit}>
                <Input
                  placeholder="Title"
                  value={blogForm.title}
                  onChange={(e) =>
                    setBlogForm((p) => ({ ...p, title: e.target.value }))
                  }
                  required
                />
                <Textarea
                  placeholder="Excerpt/description"
                  value={blogForm.description}
                  onChange={(e) =>
                    setBlogForm((p) => ({ ...p, description: e.target.value }))
                  }
                  required
                  rows={3}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    placeholder="Image URL"
                    value={blogForm.image}
                    onChange={(e) =>
                      setBlogForm((p) => ({ ...p, image: e.target.value }))
                    }
                    required
                  />
                  <Input
                    placeholder="Category"
                    value={blogForm.category}
                    onChange={(e) =>
                      setBlogForm((p) => ({ ...p, category: e.target.value }))
                    }
                    required
                  />
                </div>
                <Textarea
                  placeholder="Full content (optional)"
                  value={blogForm.content}
                  onChange={(e) =>
                    setBlogForm((p) => ({ ...p, content: e.target.value }))
                  }
                  rows={5}
                />
                <p className="text-xs text-muted-foreground">
                  💡 Use <strong>Markdown</strong>: # Heading, **bold**,
                  *italic*, - list, [link](url), ```code```
                </p>
                <Button type="submit" disabled={savingBlog}>
                  {savingBlog ? "Saving..." : "Save Blog"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-lg">Recent Projects</CardTitle>
              <a
                href="/projects"
                className="text-sm text-primary inline-flex items-center gap-1"
              >
                View site <ArrowUpRight size={14} />
              </a>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex justify-between items-start border rounded-lg p-3"
                >
                  <div>
                    <p className="font-semibold">{project.title}</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex gap-2 mt-2 flex-wrap text-xs text-muted-foreground">
                      <Badge variant="outline">{project.category}</Badge>
                      {project.technologies.slice(0, 3).map((t) => (
                        <Badge key={t} variant="secondary">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {project.featured && <Badge>Featured</Badge>}
                </div>
              ))}
              {recentProjects.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No projects yet.
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-lg">Recent Blogs</CardTitle>
              <a
                href="/blog"
                className="text-sm text-primary inline-flex items-center gap-1"
              >
                View site <ArrowUpRight size={14} />
              </a>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentBlogs.map((post) => (
                <div
                  key={post.id}
                  className="flex justify-between items-start border rounded-lg p-3"
                >
                  <div>
                    <p className="font-semibold">{post.title}</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {post.description}
                    </p>
                    <div className="flex gap-2 mt-2 flex-wrap text-xs text-muted-foreground">
                      <Badge variant="outline">{post.category}</Badge>
                      <Badge variant="secondary">
                        {new Date(post.date).toLocaleDateString()}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
              {recentBlogs.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No blog posts yet.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
