
import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBlogPosts, getBlogCategories } from "@/services/blogService";

const BlogPage = () => {
  const [filter, setFilter] = useState<string | null>(null);
  
  // Fetch all blog posts
  const { data: blogPosts = [], isLoading: postsLoading } = useQuery({
    queryKey: ['allBlogPosts', filter],
    queryFn: () => getBlogPosts(filter),
  });
  
  // Fetch categories
  const { data: categories = ['All'], isLoading: categoriesLoading } = useQuery({
    queryKey: ['blogCategories'],
    queryFn: getBlogCategories,
  });

  return (
    <Layout>
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Blog</h1>
          <p className="text-lg text-muted-foreground mb-8">
           Checkout my Thoughts, tutorials, and insights on Software and Web development
          </p>
          
          <div className="flex flex-wrap gap-2 mb-10">
            {categoriesLoading ? (
              <div className="w-full text-center py-4">Loading categories...</div>
            ) : (
              categories.map((category) => (
                <Button 
                  key={category}
                  variant={filter === category || (filter === null && category === "All") ? "default" : "outline"}
                  onClick={() => setFilter(category === "All" ? null : category)}
                  className="flex items-center gap-2"
                >
                  {category === "All" && <Filter size={16} />}
                  {category}
                </Button>
              ))
            )}
          </div>
          
          {postsLoading ? (
            <div className="w-full text-center py-12">Loading blog posts...</div>
          ) : blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{post.date}</span>
                    </div>
                    <CardTitle className="text-lg">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <CardDescription className="line-clamp-2">{post.description}</CardDescription>
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
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No blog posts found</h3>
              <p className="text-muted-foreground mb-4">Try changing your filter or check back later</p>
              <Button onClick={() => setFilter(null)}>
                Clear Filter
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;
