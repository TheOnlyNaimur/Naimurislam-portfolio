
import { useState } from "react";

interface Skill {
  name: string;
  icon: string;
  color: string;
}

const Skills = () => {
  // Double the skills array to create a smooth infinite scroll effect
  const skillsRow1: Skill[] = [
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", color: "bg-yellow-100" },
    { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", color: "bg-blue-100" },
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "bg-blue-50" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", color: "bg-green-100" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", color: "bg-yellow-50" },
    { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", color: "bg-orange-100" },
    { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", color: "bg-red-100" },
    { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", color: "bg-blue-100" },
  ];
  
  const skillsRow2: Skill[] = [
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", color: "bg-green-100" },
    { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", color: "bg-blue-100" },
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", color: "bg-sky-100" },
    { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", color: "bg-gray-100" },
    { name: "TailwindCSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg", color: "bg-cyan-100" },
    { name: "Redux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg", color: "bg-purple-100" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", color: "bg-red-100" },
    { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg", color: "bg-yellow-100" },
  ];

  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-4 mb-10">
        <h2 className="text-3xl font-bold text-center mb-16">My Skills</h2>
      </div>
      
      {/* First row of skills - scrolling right to left */}
      <div className="relative flex overflow-x-hidden">
        <div className="flex space-x-8 animate-infinite-scroll py-4 infinite-scroll">
          {[...skillsRow1, ...skillsRow1].map((skill, index) => (
            <div
              key={`${skill.name}-${index}`}
              className={`flex flex-col items-center justify-center w-36 h-36 rounded-xl shadow-md ${skill.color} skill-item transition-transform duration-300 p-4`}
            >
              <img src={skill.icon} alt={skill.name} className="w-16 h-16 mb-4" />
              <span className="font-medium text-center">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Second row of skills - scrolling left to right */}
      <div className="relative flex overflow-x-hidden mt-8">
        <div className="flex space-x-8 py-4 infinite-scroll" style={{ animation: 'scroll 30s linear infinite reverse' }}>
          {[...skillsRow2, ...skillsRow2].map((skill, index) => (
            <div
              key={`${skill.name}-${index}`}
              className={`flex flex-col items-center justify-center w-36 h-36 rounded-xl shadow-md ${skill.color} skill-item transition-transform duration-300 p-4`}
            >
              <img src={skill.icon} alt={skill.name} className="w-16 h-16 mb-4" />
              <span className="font-medium text-center">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
