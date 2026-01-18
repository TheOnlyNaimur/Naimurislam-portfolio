import { useState } from "react";
import { ArrowRight, Download, Mail, MapPin, Phone } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const ResumePage = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const resumeUrl = "/resume.pdf"; // Place resume.pdf in public/

  const handleDownload = async () => {
    setIsDownloading(true);

    try {
      // Check availability before triggering a browser download
      const response = await fetch(resumeUrl, { method: "HEAD" });
      if (!response.ok) {
        throw new Error("Resume file not found");
      }

      const link = document.createElement("a");
      link.href = resumeUrl;
      link.download = "Naimur-Islam-Resume.pdf";
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Resume download started");
    } catch (error) {
      toast.error("Resume file is missing. Add resume.pdf to public/");
      console.error("Download error:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="relative">
            <div className="h-28 w-28 rounded-full overflow-hidden border-4 border-primary/30 shadow-lg">
              <img
                src="/Naimur_img.png"
                alt="Naimur Islam portrait"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-primary uppercase tracking-[0.35em]">
              Curriculum Vitae
            </p>
            <h1 className="text-4xl font-bold">Naimur Islam</h1>
            <p className="text-lg text-muted-foreground">
              Full Stack Developer | Building thoughtful web and blockchain
              experiences
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1">
              <MapPin size={16} /> Dhaka, Bangladesh
            </span>
            <a
              href="mailto:naimurislam707@gmail.com"
              className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 hover:text-primary transition-colors"
            >
              <Mail size={16} /> naimurislam707@gmail.com
            </a>
            <a
              href="tel:+8801712188292"
              className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 hover:text-primary transition-colors"
            >
              <Phone size={16} /> +8801712188292
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Button onClick={handleDownload} disabled={isDownloading} size="lg">
              {isDownloading ? (
                "Preparing..."
              ) : (
                <Download className="mr-2" size={18} />
              )}
              {isDownloading ? "Downloading" : "Download Resume"}
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a
                href="mailto:naimurislam707@gmail.com"
                className="flex items-center"
              >
                Let&apos;s talk <ArrowRight className="ml-2" size={16} />
              </a>
            </Button>
          </div>
        </div>

        <Separator className="my-12" />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-1 space-y-6">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground text-sm">
                <p>
                  Full-stack developer focused on performant, accessible web
                  apps and web3 products. I enjoy translating ideas into
                  polished interfaces and scalable backend services.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {[
                    "React",
                    "Next.js",
                    "Node.js",
                    "TypeScript",
                    "Solidity",
                    "Supabase",
                  ].map((item) => (
                    <Badge key={item} variant="secondary" className="px-3 py-1">
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Education</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="text-center">
                  <p className="font-semibold">B.Sc. in Computer Science</p>
                  <p className="text-muted-foreground">
                    BRAC University · 2021 – Present
                  </p>
                </div>
                <div className="text-center">
                  <p className="font-semibold">Higher Secondary Certificate</p>
                  <p className="text-muted-foreground">MUBC · 2018 – 2020</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Technical Stack</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap justify-center gap-2 text-sm">
                  {[
                    "React",
                    "Next.js",
                    "TypeScript",
                    "JavaScript",
                    "Node.js",
                    "Express",
                    "PHP",
                    "MongoDB",
                    "MySQL",
                    "Supabase",
                    "Git",
                    "Figma",
                    "Tailwind",
                    "Solidity",
                    "Web3.js",
                    "Java",
                    "Python",
                  ].map((tech) => (
                    <Badge key={tech} variant="outline" className="px-3 py-1">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="xl:col-span-2 space-y-6">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Experience</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border p-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <p className="font-semibold text-lg">
                        HRM & Development Team
                      </p>
                      <p className="text-muted-foreground">NonAcademy</p>
                    </div>
                    <p className="text-sm text-muted-foreground">2023</p>
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground list-disc list-inside">
                    <li>
                      Designed and shipped HR workflow features that improved
                      employee onboarding.
                    </li>
                    <li>
                      Built dashboards for performance tracking and engagement
                      insights.
                    </li>
                    <li>
                      Partnered with stakeholders to align features with
                      organizational goals.
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Projects</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {[
                  {
                    title: "Car Marketplace Platform",
                    description:
                      "Full MERN stack platform with authentication and listing workflows.",
                    tech: "React, Node.js, MongoDB, Express",
                  },
                  {
                    title: "Eco-Bank",
                    description:
                      "Banking experience built on PHP & Apache with modern UI patterns.",
                    tech: "PHP, Apache, Material UI",
                  },
                  {
                    title: "Missing Person Finder",
                    description:
                      "Decentralized app integrated with MetaMask for secure submissions.",
                    tech: "Solidity, Web3.js, Truffle, Ganache",
                  },
                ].map((project) => (
                  <div key={project.title} className="rounded-lg border p-4">
                    <p className="font-semibold text-lg">{project.title}</p>
                    <p className="text-muted-foreground text-sm mt-1">
                      {project.description}
                    </p>
                    <p className="text-xs text-primary mt-2 font-medium">
                      {project.tech}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Extras</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Comfortable with agile squads, design systems, and rapid
                  prototyping.
                </p>
                <p>
                  Enjoy mentoring peers and documenting flows to keep teams
                  unblocked.
                </p>
                <p>
                  Open to collaborations on web, web3, and data-driven products.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResumePage;
