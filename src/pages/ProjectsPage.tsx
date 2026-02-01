import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExternalLink, Github, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  getProjects,
  getProjectCategories,
  getProjectTechnologies,
} from "@/services/projectService";

type SortType = "newest" | "oldest" | "a-z" | "z-a";

const ProjectsPage = () => {
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [techFilter, setTechFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortType>("newest");

  // Fetch projects with filters
  const { data: projects = [], isLoading: projectsLoading } = useQuery({
    queryKey: ["allProjects", categoryFilter, techFilter],
    queryFn: () =>
      getProjects({
        category: categoryFilter || undefined,
        tech: techFilter || undefined,
      }),
  });

  // Fetch categories
  const { data: categories = ["All"], isLoading: categoriesLoading } = useQuery(
    {
      queryKey: ["projectCategories"],
      queryFn: getProjectCategories,
    },
  );

  // Fetch technologies
  const { data: technologies = ["All"], isLoading: technologiesLoading } =
    useQuery({
      queryKey: ["projectTechnologies"],
      queryFn: getProjectTechnologies,
    });

  // Filter and search logic
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects.filter((project) => {
      const matchesCategory =
        !categoryFilter || project.category === categoryFilter;
      const matchesTech =
        !techFilter || project.technologies.includes(techFilter);
      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      return matchesCategory && matchesTech && matchesSearch;
    });

    // Sort
    switch (sortBy) {
      case "newest":
        filtered.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );
        break;
      case "oldest":
        filtered.sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
        );
        break;
      case "a-z":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "z-a":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    return filtered;
  }, [projects, categoryFilter, techFilter, searchQuery, sortBy]);

  return (
    <Layout>
      <div className="pt-20 sm:pt-24 pb-12 sm:pb-16 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Projects</h1>
          <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8">
            A collection of my recent work and personal projects
          </p>

          {/* Search Box with Sort By */}
          <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-center items-stretch sm:items-end gap-3">
            <div className="relative w-full max-w-md">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={18}
              />
              <Input
                placeholder="Search by title, category, or technology..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Sort By Dropdown */}
            <Select
              value={sortBy}
              onValueChange={(value) => setSortBy(value as SortType)}
            >
              <SelectTrigger className="w-fit h-9 text-sm">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest to Oldest</SelectItem>
                <SelectItem value="oldest">Oldest to Newest</SelectItem>
                <SelectItem value="a-z">A - Z</SelectItem>
                <SelectItem value="z-a">Z - A</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort and Filter Controls */}
          <div className="mb-8 sm:mb-10">
            {/* Category Filter */}
            <div className="text-left mb-4 sm:mb-6">
              <h3 className="font-medium mb-2 sm:mb-3 text-sm sm:text-base">
                Filter by Category
              </h3>
              <div className="flex flex-wrap gap-2">
                {categoriesLoading ? (
                  <div>Loading categories...</div>
                ) : (
                  categories.map((category) => (
                    <Button
                      key={category}
                      variant={
                        categoryFilter === category ||
                        (categoryFilter === null && category === "All")
                          ? "default"
                          : "outline"
                      }
                      onClick={() =>
                        setCategoryFilter(category === "All" ? null : category)
                      }
                      size="sm"
                    >
                      {category}
                    </Button>
                  ))
                )}
              </div>
            </div>

            {/* Technology Filter */}
            <div className="text-left">
              <h3 className="font-medium mb-2 sm:mb-3 text-sm sm:text-base">
                Filter by Technology
              </h3>
              <div className="flex flex-wrap gap-2">
                {technologiesLoading ? (
                  <div>Loading technologies...</div>
                ) : (
                  technologies.map((tech) => (
                    <Button
                      key={tech}
                      variant={
                        techFilter === tech ||
                        (techFilter === null && tech === "All")
                          ? "default"
                          : "outline"
                      }
                      onClick={() =>
                        setTechFilter(tech === "All" ? null : tech)
                      }
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
          ) : filteredAndSortedProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {filteredAndSortedProjects.map((project) => (
                <Card
                  key={project.id}
                  className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow group"
                >
                  <div className="w-full aspect-video overflow-hidden bg-muted">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex flex-wrap gap-2 items-center mb-3">
                      {project.featured && (
                        <Badge className="bg-primary">Featured</Badge>
                      )}
                      <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100">
                        {project.category}
                      </Badge>
                      {project.technologies.map((tech, index) => {
                        const colors = [
                          "bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100",
                          "bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100",
                          "bg-pink-100 dark:bg-pink-900 text-pink-900 dark:text-pink-100",
                          "bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100",
                          "bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100",
                          "bg-indigo-100 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100",
                        ];
                        const colorClass = colors[index % colors.length];
                        return (
                          <Badge key={index} className={colorClass}>
                            {tech}
                          </Badge>
                        );
                      })}
                    </div>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription className="mb-4">
                      {project.description}
                    </CardDescription>
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
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">
                No projects match your search
              </h3>
              <p className="text-muted-foreground mb-4">
                Try changing your filters or search terms
              </p>
              <Button
                onClick={() => {
                  setCategoryFilter(null);
                  setTechFilter(null);
                  setSearchQuery("");
                  setSortBy("newest");
                }}
              >
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
