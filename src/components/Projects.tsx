
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Filter, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Project } from "@/lib/supabase";
import { getFeaturedProjects, getProjectCategories } from "@/services/projectService";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

const Projects = () => {
  const [filter, setFilter] = useState<string | null>(null);
  
  // Fetch featured projects
  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ['featuredProjects'],
    queryFn: getFeaturedProjects,
  });
  
  console.log("Home page projects:", projects);
  
  // Fetch categories
  const { data: categories = ['All'] } = useQuery({
    queryKey: ['projectCategories'],
    queryFn: getProjectCategories,
  });
  
  // Filter projects based on selected category
  const filteredProjects = filter && filter !== "All"
    ? projects.filter(project => project.category === filter)
    : projects;

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Projects</h2>
          <Link to="/projects">
            <Button variant="outline" className="gap-2">
              View All Projects <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <Button 
              key={category}
              variant={filter === category || (filter === null && category === "All") ? "default" : "outline"}
              onClick={() => setFilter(category === "All" ? null : category)}
              className="flex items-center gap-2"
            >
              {category === "All" && <Filter size={16} />}
              {category}
            </Button>
          ))}
        </div>
        
        {isLoading ? (
          <div className="text-center py-10">Loading projects...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">Error loading projects</div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-10">No projects found. Try setting the featured flag to true for projects you want to show here.</div>
        ) : (
          <Carousel className="w-full px-12 mb-10">
            <CarouselContent>
              {filteredProjects.map((project) => (
                <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow">
                    <div className="h-56 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-center mb-2">
                        <Badge>{project.category}</Badge>
                      </div>
                      <CardTitle>{project.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <CardDescription className="mb-4">{project.description}</CardDescription>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <Badge key={index} variant="outline">{tech}</Badge>
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
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-2 md:-left-4" />
            <CarouselNext className="-right-2 md:-right-4" />
          </Carousel>
        )}
        
        <div className="text-center mt-10">
          <Link to="/projects">
            <Button className="gap-2">
              View All Projects <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
