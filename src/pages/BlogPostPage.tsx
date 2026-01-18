import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Layout from "@/components/Layout";
import { getBlogPostById } from "@/services/blogService";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

const BlogPostPage = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogPost", id],
    queryFn: () => getBlogPostById(Number(id)),
    enabled: !!id,
  });

  return (
    <Layout>
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[50vh]">
              <div className="animate-pulse text-lg">Loading post...</div>
            </div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">
              <h2 className="text-2xl font-bold mb-4">
                Error Loading Blog Post
              </h2>
              <p>
                Sorry, we couldn't load this blog post. Please try again later.
              </p>
            </div>
          ) : post ? (
            <article className="prose prose-lg dark:prose-invert max-w-none">
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <Badge className="px-3 py-1">{post.category}</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar size={16} className="mr-2" />
                    {post.date}
                  </div>
                </div>
                <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
                <div className="rounded-lg overflow-hidden mb-8 w-full aspect-video bg-muted">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="leading-relaxed prose prose-sm dark:prose-invert max-w-none prose-p:mb-4 prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-2xl prose-h2:font-bold prose-li:mb-2 prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic">
                {post.content ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {post.content}
                  </ReactMarkdown>
                ) : (
                  <p className="mb-4">{post.description}</p>
                )}
              </div>
            </article>
          ) : (
            <div className="text-center py-10">
              <h2 className="text-2xl font-bold mb-4">Blog Post Not Found</h2>
              <p>Sorry, we couldn't find the blog post you're looking for.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BlogPostPage;
