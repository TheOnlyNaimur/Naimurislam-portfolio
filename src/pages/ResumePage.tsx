
import { useState } from "react";
import { FileText, Download } from "lucide-react";
import Layout from "@/components/Layout";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ResumePage = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    
    // Simulating download delay
    setTimeout(() => {
      // In a real app, this would be a link to an actual PDF file
      const link = document.createElement("a");
      link.href = "https://example.com/resume.pdf"; // Replace with actual PDF URL
      link.download = "naimur-islam-resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setIsDownloading(false);
      toast.success("Resume downloaded successfully!");
    }, 1000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 mt-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Naimur Islam</h1>
            <p className="text-xl text-muted-foreground mb-4">Full Stack Developer</p>
          </div>
          <Button 
            onClick={handleDownload} 
            disabled={isDownloading}
            className="mt-4 md:mt-0"
          >
            {isDownloading ? "Downloading..." : (
              <>
                <Download className="mr-2" size={18} />
                Download Resume
              </>
            )}
          </Button>
        </div>
        
        <Separator className="my-8" />
        
        {/* Resume Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1">
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <FileText className="mr-2" size={20} />
                Contact
              </h2>
              <div className="space-y-2">
                <p><strong>Email:</strong> naimur@example.com</p>
                <p><strong>Phone:</strong> +123 456 7890</p>
                <p><strong>Location:</strong> City, Country</p>
                <p><strong>Website:</strong> naimur.example.com</p>
              </div>
            </div>
            
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4">Education</h2>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold">Master of Science in Computer Science</p>
                  <p className="text-muted-foreground">University Name, 2018-2020</p>
                </div>
                <div>
                  <p className="font-semibold">Bachelor of Science in Computer Science</p>
                  <p className="text-muted-foreground">University Name, 2014-2018</p>
                </div>
              </div>
            </div>
            
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {['React', 'Node.js', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Tailwind CSS', 'Next.js', 'MongoDB', 'PostgreSQL', 'Git', 'AWS'].map((skill) => (
                  <span key={skill} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column (wider) */}
          <div className="lg:col-span-2">
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-6">Experience</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-lg">Senior Full Stack Developer</p>
                      <p className="text-muted-foreground">Tech Company Inc.</p>
                    </div>
                    <p className="text-muted-foreground">2022 - Present</p>
                  </div>
                  <ul className="list-disc list-inside mt-2 text-muted-foreground">
                    <li>Led development of enterprise-level applications using React and Node.js</li>
                    <li>Implemented CI/CD pipelines using GitHub Actions</li>
                    <li>Mentored junior developers and conducted code reviews</li>
                  </ul>
                </div>
                
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-lg">Full Stack Developer</p>
                      <p className="text-muted-foreground">Web Solutions Ltd.</p>
                    </div>
                    <p className="text-muted-foreground">2020 - 2022</p>
                  </div>
                  <ul className="list-disc list-inside mt-2 text-muted-foreground">
                    <li>Built responsive web applications using modern JavaScript frameworks</li>
                    <li>Optimized application performance and implemented SEO best practices</li>
                    <li>Collaborated with design teams to implement UI/UX improvements</li>
                  </ul>
                </div>
                
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-lg">Junior Developer</p>
                      <p className="text-muted-foreground">StartUp Inc.</p>
                    </div>
                    <p className="text-muted-foreground">2018 - 2020</p>
                  </div>
                  <ul className="list-disc list-inside mt-2 text-muted-foreground">
                    <li>Developed and maintained front-end components using React</li>
                    <li>Participated in agile development processes and sprint planning</li>
                    <li>Created and maintained API documentation</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6">Projects</h2>
              <div className="space-y-6">
                <div>
                  <p className="font-semibold text-lg">E-commerce Platform</p>
                  <p className="text-muted-foreground mb-2">A full-stack e-commerce solution with payment integration</p>
                  <p className="text-sm">Technologies: React, Node.js, MongoDB, Stripe</p>
                </div>
                
                <div>
                  <p className="font-semibold text-lg">Task Management Application</p>
                  <p className="text-muted-foreground mb-2">A collaborative task management tool with real-time updates</p>
                  <p className="text-sm">Technologies: React, Firebase, Material UI</p>
                </div>
                
                <div>
                  <p className="font-semibold text-lg">Personal Blog</p>
                  <p className="text-muted-foreground mb-2">A responsive blog platform with CMS integration</p>
                  <p className="text-sm">Technologies: Next.js, Tailwind CSS, Sanity.io</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResumePage;
