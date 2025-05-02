
import { supabase, BlogPost } from '@/lib/supabase';

export async function getBlogPosts(category: string | null = null): Promise<BlogPost[]> {
  let query = supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
  
  if (category && category !== 'All') {
    query = query.eq('category', category);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
  
  return data as BlogPost[];
}

export async function getFeaturedBlogPosts(limit = 4): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  
  if (error) {
    console.error('Error fetching featured blog posts:', error);
    return [];
  }
  
  return data as BlogPost[];
}

export async function getBlogCategories(): Promise<string[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('category')
    .order('category');
  
  if (error) {
    console.error('Error fetching blog categories:', error);
    return [];
  }
  
  // Extract unique categories
  const categories = data.map(item => item.category);
  return ['All', ...Array.from(new Set(categories))];
}
