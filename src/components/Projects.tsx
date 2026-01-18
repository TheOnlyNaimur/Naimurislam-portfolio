import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Filter, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  getFeaturedProjects,
  getProjects,
  getProjectCategories,
} from "@/services/projectService";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { toast } from "sonner";

const Projects = () => {
  const [filter, setFilter] = useState<string | null>(null);

  // Fetch featured projects
  const {
    data: featuredProjects = [],
    isLoading: featuredLoading,
    error,
  } = useQuery({
    queryKey: ["featuredProjects"],
    queryFn: getFeaturedProjects,
  });

  // Fallback to all projects if no featured ones are found
  const { data: allProjects = [], isLoading: allProjectsLoading } = useQuery({
    queryKey: ["allProjects"],
    queryFn: () => getProjects({}),
    enabled: featuredProjects.length === 0 && !featuredLoading,
  });

  // Use featured projects if available, otherwise show all projects
  const projects = featuredProjects.length > 0 ? featuredProjects : allProjects;
  const isLoading =
    featuredLoading || (allProjectsLoading && featuredProjects.length === 0);
  const showingAllProjects =
    featuredProjects.length === 0 && allProjects.length > 0;

  console.log("Home page projects:", projects);

  // Fetch categories
  const { data: categories = ["All"] } = useQuery({
    queryKey: ["projectCategories"],
    queryFn: getProjectCategories,
  });

  // Filter projects based on selected category
  const filteredProjects =
    filter && filter !== "All"
      ? projects.filter((project) => project.category === filter)
      : projects;

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <div className="relative mb-8">
          <h2 className="text-3xl font-bold text-center">Featured Projects</h2>
          <div className="absolute right-0 top-0">
            <Link to="/projects">
              <Button variant="outline" className="gap-2">
                View All Projects <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <Button
              key={category}
              variant={
                filter === category || (filter === null && category === "All")
                  ? "default"
                  : "outline"
              }
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
          <div className="text-center py-10 text-red-500">
            Error loading projects
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
            <p className="mb-4 text-lg font-medium">
              No projects match your filters.
            </p>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters or add new projects to Supabase.
            </p>
            <Button
              onClick={() => {
                setFilter(null);
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <>
            {showingAllProjects && (
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
                <p className="text-amber-800 dark:text-amber-200 mb-2">
                  <strong>Note:</strong> Showing all projects because no
                  featured projects were found.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    toast.info(
                      "Set the 'featured' column to true in the Supabase dashboard for projects you want to display here.",
                    )
                  }
                >
                  How to make projects featured?
                </Button>
              </div>
            )}
            <Carousel className="w-full px-12 mb-10">
              <CarouselContent>
                {filteredProjects.map((project) => (
                  <CarouselItem
                    key={project.id}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow">
                      <div className="w-full aspect-video overflow-hidden bg-muted">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <CardHeader>
                        <div className="flex justify-between items-center mb-2">
                          <Badge>{project.category}</Badge>
                        </div>
                        <CardTitle>{project.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <CardDescription className="mb-4">
                          {project.description}
                        </CardDescription>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, index) => (
                            <Badge key={index} variant="outline">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <Github size={16} /> Code
                          </a>
                        </Button>
                        <Button size="sm" asChild>
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
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
          </>
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
