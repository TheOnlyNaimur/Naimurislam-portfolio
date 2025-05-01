
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { useEffect } from "react";

const Footer = () => {
  useEffect(() => {
    // Create particle animation
    const createParticle = () => {
      const footer = document.getElementById('animated-footer');
      if (!footer) return;
      
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const size = Math.random() * 10 + 5;
      const x = Math.random() * footer.offsetWidth;
      const duration = Math.random() * 5 + 5;
      const delay = Math.random() * 2;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${x}px`;
      particle.style.bottom = '0';
      
      // Use our new color palette
      const hue = Math.random() * 40 + 330; // 330-370 for pink to red range
      const saturation = Math.random() * 50 + 50; // 50-100%
      const lightness = Math.random() * 50 + 50; // 50-100%
      particle.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      
      particle.style.setProperty('--duration', `${duration}s`);
      particle.style.setProperty('--delay', `${delay}s`);
      
      footer.appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, duration * 1000);
    };

    // Create particles at intervals
    const interval = setInterval(createParticle, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer id="animated-footer" className="relative bg-primary text-primary-foreground overflow-hidden">
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
      
      {/* New bottom animation */}
      <div className="w-full py-8 bottom-animation">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full animate-pulse">
            <p className="text-lg font-medium">Crafted with ❤️ by Naimur Islam</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
