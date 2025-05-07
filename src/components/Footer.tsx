
import { Github, Linkedin, Mail, Twitter, FileText } from "lucide-react";
import { Link } from "react-router-dom";

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
              <a href="https://github.com/TheOnlyNaimur" target="_blank" rel="noopener noreferrer" className="hover:text-white/80">
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://linkedin.com/in/naimurislam" target="_blank" rel="noopener noreferrer" className="hover:text-white/80">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://x.com/Naimur_Islam1" target="_blank" rel="noopener noreferrer" className="hover:text-white/80">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="mailto:naimurislam707@gmail.com" className="hover:text-white/80">
                <Mail size={20} />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-white/80">Home</Link></li>
              <li><Link to="/about" className="hover:text-white/80">About</Link></li>
              <li><Link to="/projects" className="hover:text-white/80">Projects</Link></li>
              <li><Link to="/blog" className="hover:text-white/80">Blog</Link></li>
              <li>
                <Link to="/resume" className="hover:text-white/80 flex items-center">
                  <FileText size={16} className="mr-1" />
                  Resume/CV
                </Link>
              </li>
              <li><Link to="/contact" className="hover:text-white/80">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <p className="mb-2">Email: naimurislam707@gmail.com</p>
            <p className="mb-2">Phone: </p>
            <p>Location: Dhaka, Bangladesh</p>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-6 text-center">
          <p>© {new Date().getFullYear()} Naimur Islam. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
