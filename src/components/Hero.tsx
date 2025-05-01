
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center pt-16 bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="w-full md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-primary to-[#FF0048] bg-clip-text text-transparent">
                Naimur Islam
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground">
              Full Stack Developer
            </h2>
            <p className="text-lg text-muted-foreground">
              I craft elegant, user-friendly web applications with modern technologies.
              Passionate about creating digital experiences that combine functionality with 
              beautiful design. Always exploring new tools and frameworks to expand my skillset.
            </p>
            <div className="flex items-center gap-4">
              <Button onClick={scrollToAbout} size="lg" className="gap-2">
                Learn More <ArrowDown size={16} />
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#contact">Contact Me</a>
              </Button>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary shadow-lg animate-float">
                <img 
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080" 
                  alt="Naimur Islam" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -z-10 w-72 h-72 md:w-80 md:h-80 rounded-full bg-primary/20 blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
