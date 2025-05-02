
import { supabase, Project } from '@/lib/supabase';

export async function getProjects(filters: { category?: string; tech?: string } = {}): Promise<Project[]> {
  let query = supabase.from('projects').select('*');
  
  if (filters.category && filters.category !== 'All') {
    query = query.eq('category', filters.category);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
  
  // If we have a tech filter, we need to filter in JS since it's an array field
  let filteredData = data as Project[];
  if (filters.tech && filters.tech !== 'All') {
    filteredData = filteredData.filter(project => 
      project.technologies.includes(filters.tech as string)
    );
  }
  
  return filteredData;
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('featured', true);
  
  if (error) {
    console.error('Error fetching featured projects:', error);
    return [];
  }
  
  return data as Project[];
}

export async function getProjectCategories(): Promise<string[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('category');
  
  if (error) {
    console.error('Error fetching project categories:', error);
    return [];
  }
  
  // Extract unique categories
  const categories = data.map(item => item.category);
  return ['All', ...Array.from(new Set(categories))];
}

export async function getProjectTechnologies(): Promise<string[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('technologies');
  
  if (error) {
    console.error('Error fetching project technologies:', error);
    return [];
  }
  
  // Extract and flatten all technologies
  const technologies = data.flatMap(item => item.technologies);
  return ['All', ...Array.from(new Set(technologies))];
}
