import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import { Menu, X, FileText } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur shadow-md py-2"
          : "bg-transparent py-3 sm:py-4"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            <span className="text-2xl sm:text-3xl">N</span>aimur
            <span className="text-2xl sm:text-3xl"> </span>
            <span className="text-2xl sm:text-3xl">I</span>slam
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className="nav-link font-medium text-foreground hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="nav-link font-medium text-foreground hover:text-primary transition-colors"
          >
            About
          </Link>
          <Link
            to="/projects"
            className="nav-link font-medium text-foreground hover:text-primary transition-colors"
          >
            Projects
          </Link>
          <Link
            to="/blog"
            className="nav-link font-medium text-foreground hover:text-primary transition-colors"
          >
            Blog
          </Link>
          <Link
            to="/resume"
            className="nav-link font-medium text-foreground hover:text-primary transition-colors flex items-center"
          >
            <FileText size={16} className="mr-1" />
            CV
          </Link>
          <Link
            to="/contact"
            className="nav-link font-medium text-foreground hover:text-primary transition-colors"
          >
            Contact
          </Link>
          <ModeToggle />
        </nav>

        {/* Mobile Nav */}
        <div className="flex items-center md:hidden">
          <ModeToggle />
          <button
            className="ml-4 text-foreground p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background shadow-lg py-4 px-4 sm:px-6 flex flex-col space-y-3 sm:space-y-4">
          <Link
            to="/"
            className="font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/projects"
            className="font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Projects
          </Link>
          <Link
            to="/blog"
            className="font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Blog
          </Link>
          <Link
            to="/resume"
            className="font-medium flex items-center"
            onClick={() => setIsMenuOpen(false)}
          >
            <FileText size={16} className="mr-1" />
            Resume
          </Link>
          <Link
            to="/contact"
            className="font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
