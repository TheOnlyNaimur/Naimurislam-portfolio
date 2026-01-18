import Layout from "@/components/Layout";
import About from "@/components/About";
import AboutSkillsGrid from "@/components/AboutSkillsGrid";

const AboutPage = () => {
  return (
    <Layout>
      <div className="pt-24 pb-20">
        <About />
        <AboutSkillsGrid />
      </div>
    </Layout>
  );
};

export default AboutPage;
