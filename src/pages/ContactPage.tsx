
import Layout from "@/components/Layout";
import Contact from "@/components/Contact";

const ContactPage = () => {
  return (
    <Layout>
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 mb-12">
          <h1 className="text-4xl font-bold mb-2">Contact Me</h1>
          <p className="text-lg text-muted-foreground">
            Get in touch for collaboration, opportunities, or just to say hello
          </p>
        </div>
        
        <Contact />
      </div>
    </Layout>
  );
};

export default ContactPage;
