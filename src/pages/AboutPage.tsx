
import Layout from "@/components/Layout";
import About from "@/components/About";
import Skills from "@/components/Skills";

const AboutPage = () => {
  return (
    <Layout>
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">About Me</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Learn more about my journey, skills, and experiences
          </p>
        </div>
        
        <About />
        <Skills />
      </div>
    </Layout>
  );
};

export default AboutPage;
