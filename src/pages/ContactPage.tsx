import Layout from "@/components/Layout";
import Contact from "@/components/Contact";

const ContactPage = () => {
  return (
    <Layout>
      <div className="pt-20 sm:pt-24 pb-12 sm:pb-16 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10 md:mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Contact Me</h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            Get in touch for collaboration, opportunities, or just to say hello
          </p>
        </div>

        <Contact />
      </div>
    </Layout>
  );
};

export default ContactPage;
