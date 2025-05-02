
import { supabase } from '@/integrations/supabase/client';
import { BlogPost } from '@/lib/supabase';

// Mock data to use as fallback if queries fail
const mockBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Getting Started with React",
    description: "Learn the basics of React and how to build your first component",
    date: "May 1, 2025",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000",
    category: "React",
    created_at: "2025-05-01T10:00:00Z"
  },
  {
    id: 2,
    title: "Mastering TypeScript",
    description: "Take your TypeScript skills to the next level with advanced types",
    date: "April 15, 2025",
    image: "https://images.unsplash.com/photo-1629904853716-f0bc54eea481?q=80&w=1000",
    category: "TypeScript",
    created_at: "2025-04-15T10:00:00Z"
  }
];

export async function getBlogPosts(category: string | null = null): Promise<BlogPost[]> {
  try {
    let query = supabase.from('blog_posts').select('*');
    
    if (category && category !== 'All') {
      query = query.eq('category', category);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching blog posts:', error);
      return mockBlogPosts;
    }
    
    return data as BlogPost[];
  } catch (err) {
    console.error('Error in getBlogPosts:', err);
    return mockBlogPosts;
  }
}

export async function getFeaturedBlogPosts(limit = 4): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) {
      console.error('Error fetching featured blog posts:', error);
      return mockBlogPosts.slice(0, limit);
    }
    
    return data as BlogPost[];
  } catch (err) {
    console.error('Error in getFeaturedBlogPosts:', err);
    return mockBlogPosts.slice(0, limit);
  }
}

export async function getBlogCategories(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('category');
    
    if (error) {
      console.error('Error fetching blog categories:', error);
      return ['All', 'React', 'TypeScript'];
    }
    
    // Extract unique categories and ensure they are strings
    const categories = data.map(item => item.category);
    const uniqueCategories = Array.from(new Set<string>(categories));
    return ['All', ...uniqueCategories];
  } catch (err) {
    console.error('Error in getBlogCategories:', err);
    return ['All', 'React', 'TypeScript'];
  }
}
