import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Filter } from "lucide-react";
import {
  getFeaturedBlogPosts,
  getBlogCategories,
} from "@/services/blogService";
import { useQuery } from "@tanstack/react-query";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Blog = () => {
  const [filter, setFilter] = useState<string | null>(null);

  // Fetch blog posts
  const {
    data: blogPosts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogPosts"],
    queryFn: () => getFeaturedBlogPosts(4),
  });

  console.log("Home page blog posts:", blogPosts);

  // Fetch categories
  const { data: categories = ["All"] } = useQuery({
    queryKey: ["blogCategories"],
    queryFn: getBlogCategories,
  });

  // Filter blog posts based on selected category
  const filteredPosts =
    filter && filter !== "All"
      ? blogPosts.filter((post) => post.category === filter)
      : blogPosts;

  return (
    <section
      id="blog"
      className="py-12 sm:py-16 md:py-20 bg-secondary/30 overflow-hidden w-full"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center">
            Latest Articles
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-10">
          {categories.map((category) => (
            <Button
              key={category}
              variant={
                filter === category || (filter === null && category === "All")
                  ? "default"
                  : "outline"
              }
              onClick={() => setFilter(category === "All" ? null : category)}
              size="sm"
              className="flex items-center gap-2"
            >
              {category === "All" && <Filter size={14} />}
              {category}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <div className="text-center py-10">Loading blog posts...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">
            Error loading blog posts
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-10">
            No blog posts found. Please add some posts in the database.
          </div>
        ) : (
          <Carousel className="w-full px-4 sm:px-8 md:px-12">
            <CarouselContent>
              {filteredPosts.map((post) => (
                <CarouselItem
                  key={post.id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow group h-full">
                    <div className="w-full aspect-video overflow-hidden bg-muted">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <CardHeader className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                          {post.category}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {post.date}
                        </span>
                      </div>
                      <CardTitle className="text-lg">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <CardDescription className="line-clamp-2">
                        {post.description}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Link
                        to={`/blog/${post.id}`}
                        className="text-primary hover:underline text-sm font-medium flex items-center gap-1"
                      >
                        Read More <ArrowRight size={14} />
                      </Link>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}

        <div className="text-center mt-8">
          <Button variant="outline" asChild size="lg">
            <Link to="/blog" className="flex items-center gap-2">
              View All Articles <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
