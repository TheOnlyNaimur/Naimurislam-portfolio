import { useState } from "react";

interface Skill {
  name: string;
  icon: string;
  lightColor: string;
  darkColor: string;
}

const Skills = () => {
  // Double the skills array to create a smooth infinite scroll effect
  const skillsRow1: Skill[] = [
    {
      name: "HTML5",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      lightColor: "bg-red-100",
      darkColor: "dark:bg-red-900",
    },
    {
      name: "CSS3",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      lightColor: "bg-blue-100",
      darkColor: "dark:bg-blue-900",
    },
    {
      name: "JavaScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      lightColor: "bg-yellow-100",
      darkColor: "dark:bg-yellow-900",
    },
    {
      name: "TypeScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      lightColor: "bg-blue-100",
      darkColor: "dark:bg-blue-900",
    },
    {
      name: "React",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      lightColor: "bg-blue-50",
      darkColor: "dark:bg-blue-800",
    },
    {
      name: "Node.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      lightColor: "bg-green-100",
      darkColor: "dark:bg-green-900",
    },
    {
      name: "MongoDB",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      lightColor: "bg-green-100",
      darkColor: "dark:bg-green-900",
    },
    {
      name: "Next.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      lightColor: "bg-gray-100",
      darkColor: "dark:bg-gray-800",
    },
    {
      name: "Express.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
      lightColor: "bg-gray-100",
      darkColor: "dark:bg-gray-800",
    },
    {
      name: "Python",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      lightColor: "bg-yellow-50",
      darkColor: "dark:bg-yellow-900",
    },
    {
      name: "Java",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      lightColor: "bg-orange-100",
      darkColor: "dark:bg-orange-900",
    },
    {
      name: "PHP",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
      lightColor: "bg-purple-100",
      darkColor: "dark:bg-purple-900",
    },
    {
      name: "Mysql",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      lightColor: "bg-cyan-100",
      darkColor: "dark:bg-cyan-900",
    },
    {
      name: "Docker",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      lightColor: "bg-sky-100",
      darkColor: "dark:bg-sky-900",
    },
    {
      name: "Git",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      lightColor: "bg-red-100",
      darkColor: "dark:bg-red-900",
    },
    {
      name: "Android",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg",
      lightColor: "bg-yellow-100",
      darkColor: "dark:bg-yellow-900",
    },
    {
      name: "Figma",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
      lightColor: "bg-blue-100",
      darkColor: "dark:bg-blue-900",
    },
    {
      name: "Blockchain",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg",
      lightColor: "bg-gray-100",
      darkColor: "dark:bg-gray-800",
    },
    {
      name: "Supabase",
      icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/supabase.svg",
      lightColor: "bg-emerald-100",
      darkColor: "dark:bg-emerald-900",
    },
    {
      name: "n8n Automation",
      icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/n8n.svg",
      lightColor: "bg-pink-100",
      darkColor: "dark:bg-pink-900",
    },
  ];

  // const skillsRow2: Skill[] = [
  //   { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", color: "bg-green-100" },
  //   { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", color: "bg-blue-100" },
  //   { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", color: "bg-sky-100" },
  //   { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", color: "bg-gray-100" },
  //   { name: "TailwindCSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg", color: "bg-cyan-100" },
  //   { name: "Redux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg", color: "bg-purple-100" },
  //   { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", color: "bg-red-100" },
  //   { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg", color: "bg-yellow-100" },
  // ];

  // Create a triple set of skills for smoother infinite scrolling
  const tripleSkillsRow1 = [...skillsRow1, ...skillsRow1, ...skillsRow1];
  // const tripleSkillsRow2 = [...skillsRow2, ...skillsRow2, ...skillsRow2];

  return (
    <section
      className="py-12 sm:py-16 md:py-20 overflow-hidden w-full"
      id="skills"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12 sm:mb-16">
          My Skills
        </h2>
      </div>

      {/* First row of skills - scrolling right to left */}
      <div className="relative flex overflow-x-hidden w-full">
        <div className="flex space-x-4 sm:space-x-6 md:space-x-8 py-4 animate-scroll">
          {tripleSkillsRow1.map((skill, index) => (
            <div
              key={`${skill.name}-${index}`}
              className={`flex flex-col items-center justify-center w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-xl shadow-md ${skill.lightColor} ${skill.darkColor} skill-item transition-transform duration-300 p-3 sm:p-4 flex-shrink-0`}
              role="article"
              aria-label={`${skill.name} skill`}
            >
              <img
                src={skill.icon}
                alt={skill.name}
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-2 sm:mb-3 md:mb-4"
                loading="lazy"
              />
              <span className="font-medium text-center text-xs sm:text-sm md:text-base text-gray-800 dark:text-white">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Second row of skills - scrolling left to right */}
      {/* <div className="relative flex overflow-x-hidden mt-8">
        <div className="flex space-x-8 py-4" style={{ animation: 'scroll 40s linear infinite reverse' }}>
          {tripleSkillsRow2.map((skill, index) => (
            <div
              key={`${skill.name}-${index}`}
              className={`flex flex-col items-center justify-center w-36 h-36 rounded-xl shadow-md ${skill.color} skill-item transition-transform duration-300 p-4`}
            >
              <img src={skill.icon} alt={skill.name} className="w-16 h-16 mb-4" />
              <span className="font-medium text-center">{skill.name}</span>
            </div>
          ))}
        </div>
      </div> */}
    </section>
  );
};

export default Skills;
