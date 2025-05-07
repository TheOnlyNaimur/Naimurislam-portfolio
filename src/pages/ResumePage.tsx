
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
      link.href = ""; // Replace with actual PDF URL
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
          {/* <Button 
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
          </Button> */}
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
                <p><strong>Email:</strong> naimurislam707.com</p>
                <p><strong>Phone:</strong> +8801712188292</p>
                <p><strong>Location:</strong> Dhaka, Bangladesh</p>
                <p><strong>Website:</strong> naimurislam.com</p>
              </div>
            </div>
            
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4">Education</h2>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold">Bachelor of Science in Computer Science</p>
                  <p className="text-muted-foreground">Brac University, 2021-Current</p>
                </div>
                <div>
                  <p className="font-semibold">Higher Secondary Certificate</p>
                  <p className="text-muted-foreground">MUBC, 2018-2020</p>
                </div>
              </div>
            </div>
            
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {['React', 'Node.js', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Next.js', 'PHP', 'MongoDB', 'MySQL', 'Git', 'Figma','Wordpress','Java','Python'].map((skill) => (
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
                      <p className="font-semibold text-lg">HRM & Development Team</p>
                      <p className="text-muted-foreground">NonAcademy</p>
                    </div>
                    <p className="text-muted-foreground">2023</p>
                    </div>
                    <ul className="list-disc list-inside mt-2 text-muted-foreground">
                      <li>Designed and implemented HR management features to streamline employee workflows</li>
                      <li>Developed tools for performance tracking and employee engagement</li>
                      <li>Collaborated with stakeholders to ensure alignment with organizational goals</li>
                    </ul>                  
                </div>
                
                {/* <div>
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
                </div> */}
                
                {/* <div>
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
                </div> */}


              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6">Projects</h2>
              <div className="space-y-6">
                <div>
                  <p className="font-semibold text-lg">Car Market Place Platform</p>
                  <p className="text-muted-foreground mb-2">A full MERN-stack based solution with Authentication integration</p>
                  <p className="text-sm">Technologies: React, Node.js, MongoDB, Express.js</p>
                </div>
                
                <div>
                  <p className="font-semibold text-lg">Eco-Bank</p>
                  <p className="text-muted-foreground mb-2">A PHP and Apache stack based platform</p>
                  <p className="text-sm">Technologies: PHP, Apache, Material UI</p>
                </div>
                
                <div>
                  <p className="font-semibold text-lg">Missing Person Finder</p>
                  <p className="text-muted-foreground mb-2">A Decentralized application intigrated with Metamask</p>
                  <p className="text-sm">Technologies: Solidity, Web3.js, Truffle, Ganache</p>
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
