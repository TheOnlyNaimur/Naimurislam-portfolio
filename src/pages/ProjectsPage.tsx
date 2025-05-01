
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
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
    featured: true
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team functionality.",
    image: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?q=80&w=2032",
    technologies: ["React", "TypeScript", "Firebase", "Tailwind CSS"],
    liveUrl: "https://example-taskapp.com",
    githubUrl: "https://github.com/username/taskapp",
    featured: true
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "An interactive weather dashboard that displays forecast data with beautiful visualizations.",
    image: "https://images.unsplash.com/photo-1580193769210-b8d1c049a7d9?q=80&w=2074",
    technologies: ["JavaScript", "Weather API", "Chart.js", "CSS3"],
    liveUrl: "https://example-weather.com",
    githubUrl: "https://github.com/username/weather",
    featured: true
  },
  {
    id: 4,
    title: "Personal Finance Tracker",
    description: "A web application for tracking personal expenses, income, and financial goals.",
    image: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?q=80&w=2070",
    technologies: ["Vue.js", "Express", "PostgreSQL", "D3.js"],
    liveUrl: "https://example-finance.com",
    githubUrl: "https://github.com/username/finance",
    featured: false
  },
  {
    id: 5,
    title: "Recipe Finder",
    description: "A recipe search application that helps users find recipes based on available ingredients.",
    image: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?q=80&w=2070",
    technologies: ["Angular", "Food API", "Bootstrap", "Firebase"],
    liveUrl: "https://example-recipes.com",
    githubUrl: "https://github.com/username/recipes",
    featured: false
  },
  {
    id: 6,
    title: "Social Media Dashboard",
    description: "A comprehensive dashboard for managing and analyzing social media accounts and campaigns.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015",
    technologies: ["React", "Redux", "Social APIs", "Chart.js"],
    liveUrl: "https://example-dashboard.com",
    githubUrl: "https://github.com/username/dashboard",
    featured: false
  },
];

const ProjectsPage = () => {
  return (
    <Layout>
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Projects</h1>
          <p className="text-lg text-muted-foreground mb-12">
            A collection of my recent work and personal projects
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
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
                    {project.featured && (
                      <Badge className="bg-primary">Featured</Badge>
                    )}
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
      </div>
    </Layout>
  );
};

export default ProjectsPage;
