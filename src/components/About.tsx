
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Briefcase, Trophy } from "lucide-react";

const About = () => {
  const [activeTab, setActiveTab] = useState("education");

  return (
    <section id="about" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold mb-6">About Me</h2>
            <div className="space-y-4 text-lg">
              <p>
                Hello! I'm Naimur Islam, a passionate full-stack developer with
                expertise in building robust, scalable web applications. I have a
                strong foundation in both frontend and backend technologies.
              </p>
              <p>
                With a problem-solving mindset and attention to detail, I enjoy
                taking on complex challenges and finding efficient solutions.
                I'm constantly learning and exploring new technologies to stay
                ahead in the fast-paced world of web development.
              </p>
              <p>
                When I'm not coding, you can find me exploring new hiking trails,
                reading tech blogs, or experimenting with new recipes in the kitchen.
                I believe in maintaining a healthy work-life balance to fuel creativity
                and productivity.
              </p>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="education" className="flex items-center gap-2">
                  <BookOpen size={16} /> Education
                </TabsTrigger>
                <TabsTrigger value="experience" className="flex items-center gap-2">
                  <Briefcase size={16} /> Experience
                </TabsTrigger>
                <TabsTrigger value="achievements" className="flex items-center gap-2">
                  <Trophy size={16} /> Achievements
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="education" className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-xl">Master of Computer Science</h3>
                        <p className="text-muted-foreground">University of Technology • 2019-2021</p>
                        <p className="mt-2">Specialized in Software Engineering with focus on distributed systems and cloud computing.</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl">Bachelor of Science in Computer Science</h3>
                        <p className="text-muted-foreground">State University • 2015-2019</p>
                        <p className="mt-2">Graduated with honors. Completed thesis on web application optimization techniques.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="experience" className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-xl">Senior Full Stack Developer</h3>
                        <p className="text-muted-foreground">Tech Innovations Inc. • 2022-Present</p>
                        <p className="mt-2">Lead development of enterprise applications using React, Node.js, and cloud technologies.</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl">Full Stack Developer</h3>
                        <p className="text-muted-foreground">WebSolutions Co. • 2019-2022</p>
                        <p className="mt-2">Developed and maintained client websites and web applications. Improved performance by 40%.</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl">Web Developer Intern</h3>
                        <p className="text-muted-foreground">Digital Creations • 2018-2019</p>
                        <p className="mt-2">Assisted in developing responsive websites and learned industry best practices.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="achievements" className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-xl">Best Web Development Project Award</h3>
                        <p className="text-muted-foreground">National Tech Conference • 2023</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl">Certified AWS Solutions Architect</h3>
                        <p className="text-muted-foreground">Amazon Web Services • 2022</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl">Open Source Contributor Award</h3>
                        <p className="text-muted-foreground">GitHub Community • 2021</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl">Hackathon Winner</h3>
                        <p className="text-muted-foreground">TechFest • 2020</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
