
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20 text-foreground">
      <div className="text-center max-w-md px-6">
        <h1 className="text-7xl font-bold text-primary mb-6">404</h1>
        <p className="text-2xl font-semibold mb-4">Page Not Found</p>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="flex items-center gap-2">
          <Link to="/">
            <Home size={18} /> Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
