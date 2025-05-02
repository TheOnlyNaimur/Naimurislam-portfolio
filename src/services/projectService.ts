
import { supabase, Project } from '@/lib/supabase';

// Mock data to use when Supabase is not connected
const mockProjects: Project[] = [
  {
    id: 1,
    title: "Personal Portfolio",
    description: "A responsive portfolio website built with React and Tailwind CSS",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example/portfolio",
    featured: true,
    category: "Web Development",
    created_at: "2025-05-01T10:00:00Z"
  },
  {
    id: 2,
    title: "E-commerce Dashboard",
    description: "Admin dashboard for an e-commerce platform with sales analytics",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    liveUrl: "https://example.com/dashboard",
    githubUrl: "https://github.com/example/dashboard",
    featured: true,
    category: "Full Stack",
    created_at: "2025-04-15T10:00:00Z"
  }
];

export async function getProjects(filters: { category?: string; tech?: string } = {}): Promise<Project[]> {
  try {
    let query = supabase.from('projects').select('*');
    
    if (filters.category && filters.category !== 'All') {
      query = query.eq('category', filters.category);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching projects:', error);
      return mockProjects;
    }
    
    // If we have a tech filter, we need to filter in JS since it's an array field
    let filteredData = data as Project[];
    if (filters.tech && filters.tech !== 'All') {
      filteredData = filteredData.filter(project => 
        project.technologies.includes(filters.tech as string)
      );
    }
    
    return filteredData;
  } catch (err) {
    console.error('Error in getProjects:', err);
    // Apply tech filter to mock data if needed
    let filteredMock = mockProjects;
    if (filters.tech && filters.tech !== 'All') {
      filteredMock = filteredMock.filter(project =>
        project.technologies.includes(filters.tech as string)
      );
    }
    if (filters.category && filters.category !== 'All') {
      filteredMock = filteredMock.filter(project =>
        project.category === filters.category
      );
    }
    return filteredMock;
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('featured', true);
    
    if (error) {
      console.error('Error fetching featured projects:', error);
      return mockProjects.filter(p => p.featured);
    }
    
    return data as Project[];
  } catch (err) {
    console.error('Error in getFeaturedProjects:', err);
    return mockProjects.filter(p => p.featured);
  }
}

export async function getProjectCategories(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('category');
    
    if (error) {
      console.error('Error fetching project categories:', error);
      return ['All', 'Web Development', 'Full Stack'];
    }
    
    // Extract unique categories and ensure they are strings
    const categories = data.map(item => item.category as string);
    const uniqueCategories = Array.from(new Set<string>(categories));
    return ['All', ...uniqueCategories];
  } catch (err) {
    console.error('Error in getProjectCategories:', err);
    return ['All', 'Web Development', 'Full Stack'];
  }
}

export async function getProjectTechnologies(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('technologies');
    
    if (error) {
      console.error('Error fetching project technologies:', error);
      return ['All', 'React', 'TypeScript', 'Next.js', 'Tailwind CSS'];
    }
    
    // Extract and flatten all technologies, ensuring they are strings
    const technologies = data.flatMap(item => (item.technologies as string[]));
    const uniqueTechnologies = Array.from(new Set<string>(technologies));
    return ['All', ...uniqueTechnologies];
  } catch (err) {
    console.error('Error in getProjectTechnologies:', err);
    return ['All', 'React', 'TypeScript', 'Next.js', 'Tailwind CSS'];
  }
}
