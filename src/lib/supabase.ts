
import { supabase } from '@/integrations/supabase/client';

export type BlogPost = {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  category: string;
  content?: string;
  created_at?: string;
};

export type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  category: string;
  created_at?: string;
};
