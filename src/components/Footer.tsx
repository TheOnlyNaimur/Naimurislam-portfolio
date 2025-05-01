
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-primary/90 to-[#FF0048]/90 text-primary-foreground">
      <div className="container mx-auto px-4 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4">Naimur Islam</h3>
            <p className="mb-6">
              Full Stack Developer specializing in building exceptional digital experiences.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white/80">
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white/80">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white/80">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="mailto:naimur@example.com" className="hover:text-white/80">
                <Mail size={20} />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white/80">Home</a></li>
              <li><a href="#about" className="hover:text-white/80">About</a></li>
              <li><a href="#projects" className="hover:text-white/80">Projects</a></li>
              <li><a href="#blog" className="hover:text-white/80">Blog</a></li>
              <li><a href="#contact" className="hover:text-white/80">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <p className="mb-2">Email: naimur@example.com</p>
            <p className="mb-2">Phone: +123 456 7890</p>
            <p>Location: City, Country</p>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-6 text-center">
          <p>© {new Date().getFullYear()} Naimur Islam. All rights reserved.</p>
        </div>
      </div>
      
      {/* New styled bottom section */}
      <div className="w-full py-8 backdrop-blur-sm bg-white/5 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-medium">Crafted with ❤️ by Naimur Islam</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
