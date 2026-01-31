import Layout from "@/components/Layout";
import About from "@/components/About";
import AboutSkillsGrid from "@/components/AboutSkillsGrid";

const AboutPage = () => {
  return (
    <Layout>
      <div className="pt-20 sm:pt-24 pb-12 sm:pb-16 md:pb-20">
        <About />
        <AboutSkillsGrid />
      </div>
    </Layout>
  );
};

export default AboutPage;
