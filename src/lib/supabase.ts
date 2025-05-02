
import { createClient } from '@supabase/supabase-js';

// Default to empty strings to prevent initialization errors
// but log warnings if credentials are missing
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a mock client that returns empty data when credentials are missing
const createMockClient = () => {
  console.warn('⚠️ Using mock Supabase client. Please connect to Supabase for full functionality.');
  
  return {
    from: () => ({
      select: () => ({
        eq: () => ({
          order: () => ({
            limit: () => Promise.resolve({ data: [], error: null }),
          }),
          limit: () => Promise.resolve({ data: [], error: null }),
        }),
        order: () => ({
          limit: () => Promise.resolve({ data: [], error: null }),
        }),
        limit: () => Promise.resolve({ data: [], error: null }),
      }),
    }),
  };
};

// Export the Supabase client or a mock if credentials are missing
export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : createMockClient() as any;

// Still log an error to the console to alert the developer
if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
}

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
