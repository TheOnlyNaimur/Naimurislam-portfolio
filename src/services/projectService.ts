
import { supabase } from '@/integrations/supabase/client';
import { Project } from '@/lib/supabase';

// Mock data to use as fallback if queries fail
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
    // First fetch projects from Supabase
    let query = supabase.from('projects').select('*');
    
    if (filters.category && filters.category !== 'All') {
      query = query.eq('category', filters.category);
    }
    
    const { data: projectsData, error: projectsError } = await query;
    
    if (projectsError) {
      console.error('Error fetching projects:', projectsError);
      return mockProjects;
    }
    
    // Then fetch project-technologies relationships
    const { data: relationshipsData, error: relationshipsError } = await supabase
      .from('project_technologies')
      .select('project_id, technology_id');
    
    if (relationshipsError) {
      console.error('Error fetching project-technologies relationships:', relationshipsError);
      return mockProjects;
    }
    
    // Finally fetch all technologies
    const { data: technologiesData, error: technologiesError } = await supabase
      .from('technologies')
      .select('id, name');
    
    if (technologiesError) {
      console.error('Error fetching technologies:', technologiesError);
      return mockProjects;
    }
    
    // Build projects with their technologies
    const projects = projectsData.map(project => {
      // Find technology relationships for this project
      const techRelationships = relationshipsData.filter(
        rel => rel.project_id === project.id
      );
      
      // Get technology names from relationships
      const technologies = techRelationships.map(rel => {
        const tech = technologiesData.find(t => t.id === rel.technology_id);
        return tech ? tech.name : '';
      }).filter(Boolean);
      
      return {
        id: project.id,
        title: project.title,
        description: project.description,
        image: project.image,
        liveUrl: project.liveurl, // Note: field name in database is lowercase
        githubUrl: project.githuburl, // Note: field name in database is lowercase
        featured: project.featured,
        category: project.category,
        created_at: project.created_at,
        technologies
      };
    });
    
    // If we have a tech filter, we need to filter in JS since it's an array field
    let filteredProjects = projects;
    if (filters.tech && filters.tech !== 'All') {
      filteredProjects = filteredProjects.filter(project => 
        project.technologies.includes(filters.tech as string)
      );
    }
    
    return filteredProjects;
  } catch (err) {
    console.error('Error in getProjects:', err);
    return mockProjects;
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    console.log('Fetching featured projects...');
    // First fetch featured projects from Supabase
    const { data: projectsData, error: projectsError } = await supabase
      .from('projects')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false });
    
    if (projectsError) {
      console.error('Error fetching featured projects:', projectsError);
      return mockProjects.filter(p => p.featured);
    }
    
    console.log('Featured projects data:', projectsData);
    
    // If no featured projects found, return empty array
    if (projectsData.length === 0) {
      console.log('No featured projects found');
      return [];
    }
    
    // Then fetch project-technologies relationships
    const projectIds = projectsData.map(p => p.id);
    
    const { data: relationshipsData, error: relationshipsError } = await supabase
      .from('project_technologies')
      .select('project_id, technology_id')
      .in('project_id', projectIds);
    
    if (relationshipsError) {
      console.error('Error fetching project-technologies relationships:', relationshipsError);
      return mockProjects.filter(p => p.featured);
    }
    
    // Finally fetch all technologies
    const { data: technologiesData, error: technologiesError } = await supabase
      .from('technologies')
      .select('id, name');
    
    if (technologiesError) {
      console.error('Error fetching technologies:', technologiesError);
      return mockProjects.filter(p => p.featured);
    }
    
    // Build projects with their technologies
    const projects = projectsData.map(project => {
      // Find technology relationships for this project
      const techRelationships = relationshipsData.filter(
        rel => rel.project_id === project.id
      );
      
      // Get technology names from relationships
      const technologies = techRelationships.map(rel => {
        const tech = technologiesData.find(t => t.id === rel.technology_id);
        return tech ? tech.name : '';
      }).filter(Boolean);
      
      return {
        id: project.id,
        title: project.title,
        description: project.description,
        image: project.image,
        liveUrl: project.liveurl, // Note: field name in database is lowercase
        githubUrl: project.githuburl, // Note: field name in database is lowercase
        featured: project.featured,
        category: project.category,
        created_at: project.created_at,
        technologies
      };
    });
    
    console.log('Processed featured projects:', projects);
    return projects;
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
    const categories = data.map(item => item.category);
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
      .from('technologies')
      .select('name');
    
    if (error) {
      console.error('Error fetching project technologies:', error);
      return ['All', 'React', 'TypeScript', 'Next.js', 'Tailwind CSS'];
    }
    
    // Extract technologies, ensuring they are strings
    const technologies = data.map(item => item.name);
    return ['All', ...technologies];
  } catch (err) {
    console.error('Error in getProjectTechnologies:', err);
    return ['All', 'React', 'TypeScript', 'Next.js', 'Tailwind CSS'];
  }
}
