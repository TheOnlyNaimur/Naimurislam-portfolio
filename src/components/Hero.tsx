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
    <section className="min-h-screen flex items-center pt-16 sm:pt-20 md:pt-16 bg-gradient-to-b from-background to-background/95 overflow-hidden w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-16">
          <div className="w-full md:w-1/2 space-y-4 sm:space-y-6 text-center md:text-left">
            <div>
              <span className="text-xl sm:text-2xl md:text-3xl font-medium text-muted-foreground">
                Hi, I'm
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-2">
                <span className="bg-gradient-to-r from-primary to-[#FF0048] bg-clip-text text-transparent">
                  Naimur Islam
                </span>
              </h1>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-muted-foreground">
              Software Engineer & Developer
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto md:mx-0">
              I craft elegant, user-friendly web applications with modern
              technologies. Passionate about creating digital experiences that
              combine functionality with beautiful design. Always exploring new
              tools and frameworks to expand my skillset.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-4">
              <Button
                onClick={scrollToAbout}
                size="lg"
                className="gap-2 w-full sm:w-auto"
              >
                Learn More <ArrowDown size={16} />
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="w-full sm:w-auto"
              >
                <a href="#contact">Contact Me</a>
              </Button>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0">
            <div className="relative">
              <div className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary shadow-lg animate-float">
                <img
                  src="/photo2.png"
                  alt="Naimur Islam - Full Stack Developer"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  style={{ filter: "drop-shadow(0 0 10px rgba(0, 0, 0, 1))" }}
                />
              </div>
              <div className="absolute -z-10 w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-primary/20 blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
