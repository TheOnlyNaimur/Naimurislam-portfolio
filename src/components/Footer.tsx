import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [speedMs, setSpeedMs] = useState(800);
  const [status, setStatus] = useState("Press Start to play.");

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        let next = Math.floor(Math.random() * 9);
        while (next === prev) {
          next = Math.floor(Math.random() * 9);
        }
        return next;
      });
    }, speedMs);

    return () => clearInterval(interval);
  }, [isRunning, speedMs]);

  const handleWhack = (index: number) => {
    if (!isRunning) return;
    if (index === activeIndex) {
      const nextHits = hits + 1;
      setHits(nextHits);
      setActiveIndex(null);

      if (nextHits >= 7) {
        setIsRunning(false);
        setStatus("You win! Great reflexes.");
        return;
      }

      if (nextHits >= 3) {
        setSpeedMs((prev) => Math.max(350, prev - 80));
      }
      setStatus("Nice hit! Keep going.");
      return;
    }

    const nextMisses = misses + 1;
    setMisses(nextMisses);
    if (nextMisses >= 5) {
      setIsRunning(false);
      setStatus("AI wins! Try again.");
    } else {
      setStatus("Missed! Focus.");
    }
  };

  const resetGame = () => {
    setHits(0);
    setMisses(0);
    setActiveIndex(null);
    setIsRunning(false);
    setSpeedMs(800);
    setStatus("Press Start to play.");
  };

  const startGame = () => {
    setHits(0);
    setMisses(0);
    setActiveIndex(null);
    setSpeedMs(800);
    setIsRunning(true);
    setStatus("Game on! Hit 7 to win.");
  };

  return (
    <footer className="relative bg-gradient-to-br from-primary/90 to-[#FF0048]/90 text-primary-foreground overflow-hidden w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 md:pt-12 pb-6 sm:pb-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-10 md:mb-12">
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
              Naimur Islam
            </h3>
            <p className="mb-4 sm:mb-6 text-sm sm:text-base">
              Full Stack Developer specializing in building exceptional digital
              experiences.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a
                href="https://github.com/TheOnlyNaimur"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/80"
              >
                <Github size={18} className="sm:w-5 sm:h-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/naimurislam"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/80"
              >
                <Linkedin size={18} className="sm:w-5 sm:h-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://x.com/Naimur_Islam1"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/80"
              >
                <Twitter size={18} className="sm:w-5 sm:h-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="mailto:naimurislam707@gmail.com"
                className="hover:text-white/80"
              >
                <Mail size={18} className="sm:w-5 sm:h-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5 sm:gap-y-2 text-sm sm:text-base">
              <li>
                <Link to="/" className="hover:text-white/80">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white/80">
                  About
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-white/80">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white/80">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/resume" className="hover:text-white/80">
                  {/* <FileText size={16} className="mr-1" /> */}
                  Resume/CV
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white/80">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4">
            <h3 className="text-base sm:text-lg font-bold mb-0.5 text-center">
              Take a Break
            </h3>
            <p className="text-xs text-white/80 mb-2 text-center">
              Whac-a-Mole (tap the glowing tile)
            </p>
            <div className="grid grid-cols-3 gap-1.5 mb-2">
              {Array.from({ length: 9 }).map((_, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleWhack(index)}
                    className={`h-8 sm:h-10 rounded-lg border border-white/10 transition ${
                      isActive
                        ? "bg-white/90 text-primary"
                        : "bg-white/10 hover:bg-white/20"
                    }`}
                    aria-label={`Mole tile ${index + 1}`}
                    disabled={!isRunning}
                  >
                    {isActive ? "🐹" : ""}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span>Hits: {hits}</span>
              <span>Miss: {misses}</span>
              <span>Speed: {Math.round(1000 / speedMs)}x</span>
            </div>
            <p className="text-xs text-white/90 mb-2 min-h-[1rem]">{status}</p>
            <div className="flex flex-wrap gap-1.5 justify-center">
              <button
                type="button"
                onClick={startGame}
                className="text-xs px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 transition"
                disabled={isRunning}
              >
                Start Game
              </button>
              <button
                type="button"
                onClick={resetGame}
                className="text-xs px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 transition"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-4 sm:pt-6 text-center">
          <p className="text-xs sm:text-sm md:text-base">
            © {new Date().getFullYear()} Naimur Islam. All rights reserved.
          </p>
        </div>
      </div>

      {/* Decorative Waves */}
      <svg
        className="absolute bottom-0 left-0 w-full h-auto"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{ minHeight: "80px" }}
      >
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF0048" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FF0048" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <path
          d="M0,40 Q300,20 600,40 T1200,40 L1200,120 L0,120 Z"
          fill="#FF0048"
          fillOpacity="0.15"
        />
        <path
          d="M0,50 Q300,30 600,50 T1200,50 L1200,120 L0,120 Z"
          fill="#FF0048"
          fillOpacity="0.1"
        />
        <path
          d="M0,60 Q300,40 600,60 T1200,60 L1200,120 L0,120 Z"
          fill="url(#waveGradient)"
        />
      </svg>
    </footer>
  );
};

export default Footer;
