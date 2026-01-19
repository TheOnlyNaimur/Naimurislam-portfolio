import { supabase } from "@/integrations/supabase/client";
import { Project } from "@/lib/supabase";

// Mock data to use as fallback if queries fail
const mockProjects: Project[] = [
  {
    id: 1,
    title: "Personal Portfolio",
    description:
      "A responsive portfolio website built with React and Tailwind CSS",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example/portfolio",
    featured: true,
    category: "Web Development",
    created_at: "2025-05-01T10:00:00Z",
  },
  {
    id: 2,
    title: "E-commerce Dashboard",
    description:
      "Admin dashboard for an e-commerce platform with sales analytics",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    liveUrl: "https://example.com/dashboard",
    githubUrl: "https://github.com/example/dashboard",
    featured: true,
    category: "Full Stack",
    created_at: "2025-04-15T10:00:00Z",
  },
];

export interface NewProjectPayload {
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}

export async function createProject(payload: NewProjectPayload) {
  try {
    const { data: projectRows, error: projectError } = await supabase
      .from("projects")
      .insert({
        title: payload.title,
        description: payload.description,
        image: payload.image,
        category: payload.category,
        liveurl: payload.liveUrl,
        githuburl: payload.githubUrl,
        featured: payload.featured,
      })
      .select("id");

    if (projectError || !projectRows || projectRows.length === 0) {
      throw projectError || new Error("Project insert failed");
    }

    const projectId = projectRows[0].id;
    const techNames = payload.technologies.map((t) => t.trim()).filter(Boolean);

    if (techNames.length) {
      const { data: existingTech } = await supabase
        .from("technologies")
        .select("id, name")
        .in("name", techNames);

      const existingNames = new Set((existingTech || []).map((t) => t.name));
      const newTechNames = techNames.filter((name) => !existingNames.has(name));

      let newTechIds: number[] = [];
      if (newTechNames.length) {
        const { data: insertedTech, error: insertTechError } = await supabase
          .from("technologies")
          .insert(newTechNames.map((name) => ({ name })))
          .select("id");
        if (insertTechError) {
          console.error("Error inserting technologies", insertTechError);
          throw insertTechError;
        }
        newTechIds = (insertedTech || []).map((t) => t.id);
      }

      const techIds = [...(existingTech || []).map((t) => t.id), ...newTechIds];

      if (techIds.length) {
        const relationships = techIds.map((technology_id) => ({
          project_id: projectId,
          technology_id,
        }));
        const { error: relError } = await supabase
          .from("project_technologies")
          .insert(relationships);
        if (relError) {
          console.error("Error linking technologies", relError);
          throw relError;
        }
      }
    }

    return projectId;
  } catch (err) {
    console.error("Error in createProject", err);
    throw err;
  }
}

export async function getProjects(
  filters: { category?: string; tech?: string } = {},
): Promise<Project[]> {
  try {
    // First fetch projects from Supabase
    let query = supabase.from("projects").select("*");

    if (filters.category && filters.category !== "All") {
      query = query.eq("category", filters.category);
    }

    const { data: projectsData, error: projectsError } = await query;

    if (projectsError) {
      console.error("Error fetching projects:", projectsError);
      return mockProjects;
    }

    console.log("Raw projects data:", projectsData);

    // Then fetch project-technologies relationships
    const { data: relationshipsData, error: relationshipsError } =
      await supabase
        .from("project_technologies")
        .select("project_id, technology_id");

    if (relationshipsError) {
      console.error(
        "Error fetching project-technologies relationships:",
        relationshipsError,
      );
    }

    // Finally fetch all technologies
    const { data: technologiesData, error: technologiesError } = await supabase
      .from("technologies")
      .select("id, name");

    if (technologiesError) {
      console.error("Error fetching technologies:", technologiesError);
    }

    // Build projects with their technologies
    const projects = projectsData.map((project) => {
      let technologies: string[] = [];

      // Check if project has a technologies field (text column)
      if (project.technologies && typeof project.technologies === "string") {
        technologies = project.technologies
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
      } else if (relationshipsData && technologiesData) {
        // Find technology relationships for this project
        const techRelationships = relationshipsData.filter(
          (rel) => rel.project_id === project.id,
        );

        // Get technology names from relationships
        technologies = techRelationships
          .map((rel) => {
            const tech = technologiesData.find(
              (t) => t.id === rel.technology_id,
            );
            return tech ? tech.name : "";
          })
          .filter(Boolean);
      }

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
        technologies,
      };
    });

    console.log("Processed projects with technologies:", projects);

    // If we have a tech filter, we need to filter in JS since it's an array field
    let filteredProjects = projects;
    if (filters.tech && filters.tech !== "All") {
      filteredProjects = filteredProjects.filter((project) =>
        project.technologies.includes(filters.tech as string),
      );
    }

    return filteredProjects;
  } catch (err) {
    console.error("Error in getProjects:", err);
    return mockProjects;
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    console.log("Fetching featured projects...");
    // First fetch featured projects from Supabase
    const { data: projectsData, error: projectsError } = await supabase
      .from("projects")
      .select("*")
      .eq("featured", true)
      .order("created_at", { ascending: false });

    if (projectsError) {
      console.error("Error fetching featured projects:", projectsError);
      return mockProjects.filter((p) => p.featured);
    }

    console.log("Featured projects data:", projectsData);

    // If no featured projects found, return empty array
    if (projectsData.length === 0) {
      console.log("No featured projects found");
      return [];
    }

    // Then fetch project-technologies relationships
    const projectIds = projectsData.map((p) => p.id);

    const { data: relationshipsData, error: relationshipsError } =
      await supabase
        .from("project_technologies")
        .select("project_id, technology_id")
        .in("project_id", projectIds);

    if (relationshipsError) {
      console.error(
        "Error fetching project-technologies relationships:",
        relationshipsError,
      );
    }

    // Finally fetch all technologies
    const { data: technologiesData, error: technologiesError } = await supabase
      .from("technologies")
      .select("id, name");

    if (technologiesError) {
      console.error("Error fetching technologies:", technologiesError);
    }

    // Build projects with their technologies
    const projects = projectsData.map((project) => {
      let technologies: string[] = [];

      // Check if project has a technologies field (text column)
      if (project.technologies && typeof project.technologies === "string") {
        technologies = project.technologies
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
      } else if (relationshipsData && technologiesData) {
        // Find technology relationships for this project
        const techRelationships = relationshipsData.filter(
          (rel) => rel.project_id === project.id,
        );

        // Get technology names from relationships
        technologies = techRelationships
          .map((rel) => {
            const tech = technologiesData.find(
              (t) => t.id === rel.technology_id,
            );
            return tech ? tech.name : "";
          })
          .filter(Boolean);
      }

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
        technologies,
      };
    });

    console.log("Processed featured projects:", projects);
    return projects;
  } catch (err) {
    console.error("Error in getFeaturedProjects:", err);
    return mockProjects.filter((p) => p.featured);
  }
}

export async function getProjectCategories(): Promise<string[]> {
  try {
    const { data, error } = await supabase.from("projects").select("category");

    if (error) {
      console.error("Error fetching project categories:", error);
      return ["All", "Web Development", "Full Stack"];
    }

    // Extract unique categories and ensure they are strings
    const categories = data.map((item) => item.category);
    const uniqueCategories = Array.from(new Set<string>(categories));
    return ["All", ...uniqueCategories];
  } catch (err) {
    console.error("Error in getProjectCategories:", err);
    return ["All", "Web Development", "Full Stack"];
  }
}

export async function getProjectTechnologies(): Promise<string[]> {
  try {
    // First try to get technologies from the junction table
    const { data: techData, error: techError } = await supabase
      .from("technologies")
      .select("name");

    let technologiesFromTable: string[] = [];
    if (!techError && techData) {
      technologiesFromTable = techData.map((item) => item.name);
    }

    // Also check if projects have a technologies text column
    const { data: projectsData, error: projectsError } = await supabase
      .from("projects")
      .select("*");

    let technologiesFromProjects: string[] = [];
    if (!projectsError && projectsData) {
      projectsData.forEach((project: any) => {
        if (project.technologies && typeof project.technologies === "string") {
          const techs = project.technologies
            .split(",")
            .map((t: string) => t.trim())
            .filter(Boolean);
          technologiesFromProjects.push(...techs);
        }
      });
    }

    // Combine and deduplicate
    const allTechnologies = [
      ...new Set([...technologiesFromTable, ...technologiesFromProjects]),
    ];

    if (allTechnologies.length === 0) {
      console.log("No technologies found, using fallback");
      return ["All", "React", "TypeScript", "Next.js", "Tailwind CSS"];
    }

    console.log("Found technologies:", allTechnologies);
    return ["All", ...allTechnologies];
  } catch (err) {
    console.error("Error in getProjectTechnologies:", err);
    return ["All", "React", "TypeScript", "Next.js", "Tailwind CSS"];
  }
}
