import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  useEffect(() => {
    const recordVisit = async () => {
      try {
        await supabase.from("page_visits" as any).insert({
          path: location.pathname,
          created_at: new Date().toISOString(),
        });
      } catch (error) {
        console.error(
          "Visit logging failed (ensure table & policy exist)",
          error,
        );
      }
    };

    recordVisit();
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Navbar />
      <div className="flex-grow overflow-x-hidden">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
