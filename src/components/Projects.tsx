
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Filter } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  category: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with product management, cart functionality, and payment processing.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    liveUrl: "https://example-ecommerce.com",
    githubUrl: "https://github.com/username/ecommerce",
    category: "Full Stack"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team functionality.",
    image: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?q=80&w=2032",
    technologies: ["React", "TypeScript", "Firebase", "Tailwind CSS"],
    liveUrl: "https://example-taskapp.com",
    githubUrl: "https://github.com/username/taskapp",
    category: "Frontend"
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "An interactive weather dashboard that displays forecast data with beautiful visualizations.",
    image: "https://images.unsplash.com/photo-1580193769210-b8d1c049a7d9?q=80&w=2074",
    technologies: ["JavaScript", "Weather API", "Chart.js", "CSS3"],
    liveUrl: "https://example-weather.com",
    githubUrl: "https://github.com/username/weather",
    category: "Frontend"
  }
];

const Projects = () => {
  const [filter, setFilter] = useState<string | null>(null);
  
  // Extract unique categories
  const categories = ["All", ...Array.from(new Set(projects.map(project => project.category)))];
  
  // Filter projects based on selected category
  const filteredProjects = filter && filter !== "All"
    ? projects.filter(project => project.category === filter)
    : projects;

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Projects</h2>
        
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow">
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
