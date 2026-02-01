const skills = [
  {
    name: "HTML5",
    level: "Advanced",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  {
    name: "CSS3",
    level: "Advanced",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  {
    name: "JavaScript",
    level: "Advanced",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "React",
    level: "Advanced",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "TypeScript",
    level: "Advanced",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "Node.js",
    level: "Advanced",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Next.js",
    level: "Proficient",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "Express.js",
    level: "Proficient",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  },
  {
    name: "MongoDB",
    level: "Proficient",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "PostgreSQL",
    level: "Intermediate",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "Tailwind CSS",
    level: "Advanced",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
  },
  {
    name: "Docker",
    level: "Intermediate",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "Figma",
    level: "Proficient",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  },
  {
    name: "MySQL",
    level: "Proficient",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  {
    name: "Python",
    level: "Proficient",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "Java",
    level: "Intermediate",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
  {
    name: "Git",
    level: "Advanced",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "Android Studio",
    level: "Intermediate",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg",
  },
  {
    name: "Blockchain (Solidity)",
    level: "Proficient",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg",
  },
  {
    name: "Supabase",
    level: "Proficient",
    icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/supabase.svg",
  },
  {
    name: "n8n Automation",
    level: "Intermediate",
    icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/n8n.svg",
  },
];

const AboutSkillsGrid = () => {
  return (
    <section className="py-12 sm:py-14 md:py-16 overflow-hidden w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-primary mb-2">
            Toolbox
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold">Skills Snapshot</h3>
          <p className="text-sm sm:text-base text-muted-foreground mt-2 sm:mt-3">
            A focused set of technologies I use to design, build, and ship
            products.
          </p>
        </div>

        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="group flex items-center gap-3 sm:gap-4 rounded-xl border border-border/50 bg-card/60 p-3 sm:p-4 shadow-sm transition hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg"
            >
              <div className="h-10 w-10 sm:h-12 sm:w-12 shrink-0 rounded-lg bg-muted/40 flex items-center justify-center overflow-hidden">
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="h-7 w-7 sm:h-8 sm:w-8 object-contain"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-semibold text-sm sm:text-base truncate">
                    {skill.name}
                  </h4>
                  <span className="text-xs rounded-full bg-primary/10 text-primary px-2 py-1 whitespace-nowrap">
                    {skill.level}
                  </span>
                </div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-muted">
                  <div
                    className="h-1.5 rounded-full bg-primary"
                    style={{
                      width:
                        skill.level === "Advanced"
                          ? "90%"
                          : skill.level === "Proficient"
                            ? "70%"
                            : "55%",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSkillsGrid;
