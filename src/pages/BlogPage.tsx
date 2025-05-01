
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  category: string;
}

// This would typically come from an API
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Building Responsive UIs with React and Tailwind",
    description: "Explore best practices for creating beautiful, responsive user interfaces using React and Tailwind CSS.",
    date: "May 1, 2025",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070",
    category: "Frontend",
  },
  {
    id: 2,
    title: "Getting Started with TypeScript in 2025",
    description: "A comprehensive guide for developers looking to adopt TypeScript in their projects.",
    date: "April 22, 2025",
    image: "https://images.unsplash.com/photo-1564865878688-9a244444042a?q=80&w=2070",
    category: "TypeScript",
  },
  {
    id: 3,
    title: "Mastering Backend Development with Node.js",
    description: "Learn how to build scalable and efficient backend services using Node.js and Express.",
    date: "April 15, 2025",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=2074",
    category: "Backend",
  },
  {
    id: 4,
    title: "Introduction to Docker for Web Developers",
    description: "Simplify your development workflow and deployment process with Docker containers.",
    date: "April 8, 2025",
    image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?q=80&w=2071",
    category: "DevOps",
  },
  {
    id: 5,
    title: "GraphQL vs REST: Choosing the Right API Design",
    description: "A detailed comparison between GraphQL and REST API designs with practical examples.",
    date: "March 30, 2025",
    image: "https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?q=80&w=2070",
    category: "API",
  },
  {
    id: 6,
    title: "Progressive Web Apps in 2025",
    description: "Everything you need to know about building modern progressive web applications.",
    date: "March 25, 2025",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=2064",
    category: "PWA",
  },
  {
    id: 7,
    title: "Securing Your Web Applications",
    description: "Essential security practices every developer should implement in their web applications.",
    date: "March 18, 2025",
    image: "https://images.unsplash.com/photo-1614064548237-096f735f344f?q=80&w=2070",
    category: "Security",
  },
  {
    id: 8,
    title: "The State of CSS in 2025",
    description: "Exploring the latest CSS features and how they're transforming web design.",
    date: "March 10, 2025",
    image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=2070",
    category: "CSS",
  },
];

const BlogPage = () => {
  return (
    <Layout>
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Blog</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Thoughts, tutorials, and insights on web development
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
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
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;
