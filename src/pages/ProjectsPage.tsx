
import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Filter } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getProjects, getProjectCategories, getProjectTechnologies } from "@/services/projectService";

const ProjectsPage = () => {
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [techFilter, setTechFilter] = useState<string | null>(null);
  
  // Fetch projects with filters
  const { data: projects = [], isLoading: projectsLoading } = useQuery({
    queryKey: ['allProjects', categoryFilter, techFilter],
    queryFn: () => getProjects({ 
      category: categoryFilter || undefined, 
      tech: techFilter || undefined 
    }),
  });
  
  // Fetch categories
  const { data: categories = ['All'], isLoading: categoriesLoading } = useQuery({
    queryKey: ['projectCategories'],
    queryFn: getProjectCategories,
  });
  
  // Fetch technologies
  const { data: technologies = ['All'], isLoading: technologiesLoading } = useQuery({
    queryKey: ['projectTechnologies'],
    queryFn: getProjectTechnologies,
  });

  return (
    <Layout>
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Projects</h1>
          <p className="text-lg text-muted-foreground mb-8">
            A collection of my recent work and personal projects
          </p>
          
          <div className="space-y-6 mb-10">
            <div>
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <Filter size={18} /> Filter by Category
              </h3>
              <div className="flex flex-wrap gap-2">
                {categoriesLoading ? (
                  <div>Loading categories...</div>
                ) : (
                  categories.map((category) => (
                    <Button 
                      key={category}
                      variant={categoryFilter === category || (categoryFilter === null && category === "All") ? "default" : "outline"}
                      onClick={() => setCategoryFilter(category === "All" ? null : category)}
                      size="sm"
                    >
                      {category}
                    </Button>
                  ))
                )}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <Filter size={18} /> Filter by Technology
              </h3>
              <div className="flex flex-wrap gap-2">
                {technologiesLoading ? (
                  <div>Loading technologies...</div>
                ) : (
                  technologies.map((tech) => (
                    <Button 
                      key={tech}
                      variant={techFilter === tech || (techFilter === null && tech === "All") ? "default" : "outline"}
                      onClick={() => setTechFilter(tech === "All" ? null : tech)}
                      size="sm"
                    >
                      {tech}
                    </Button>
                  ))
                )}
              </div>
            </div>
          </div>
          
          {projectsLoading ? (
            <div className="w-full text-center py-12">Loading projects...</div>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Card key={project.id} className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow group">
                  <div className="h-56 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      {project.featured && (
                        <Badge className="bg-primary">Featured</Badge>
                      )}
                      <Badge variant="outline">{project.category}</Badge>
                    </div>
                    <CardTitle>{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription className="mb-4">{project.description}</CardDescription>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <Badge 
                          key={index} 
                          variant={tech === techFilter ? "default" : "outline"}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <Github size={16} /> Code
                      </a>
                    </Button>
                    <Button size="sm" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        Live Demo <ExternalLink size={16} />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No projects match the selected filters</h3>
              <p className="text-muted-foreground mb-4">Try changing your filter criteria</p>
              <Button onClick={() => { setCategoryFilter(null); setTechFilter(null); }}>
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProjectsPage;
