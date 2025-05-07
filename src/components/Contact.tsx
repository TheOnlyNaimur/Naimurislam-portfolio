
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxX9bQev0TW3k07XgcU6Q-d8qmM1Zy6oyJBWmj8afYnUHGMUHUjf7hnrWf0x9_5ZAbfmQ/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            name: formData.name,
            email: formData.email,
            message: formData.message,
          }).toString(),
        }
      );
  
      const result = await response.json();
  
      if (result.result === "success") {
        toast({
          title: "Message sent successfully!",
          description: "Thank you for reaching out. I'll get back to you soon.",
        });
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error(result.error || "Submission failed");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <section id="contact" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16">Say Hello</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold">Get In Touch</h3>
            <p className="text-lg text-muted-foreground">
              Whether you have a question, want to start a project, or simply want to connect, feel free to reach out.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <a href="mailto:naimurislam707@gmail.com" className="text-muted-foreground hover:text-primary">
                    naimurislam707@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="font-medium">Phone</p>
                  <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary">
                    +123 456 7890
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-muted-foreground">
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Send Me a Message</CardTitle>
              <CardDescription>Fill out the form and I'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>
                
                {/* <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    required
                  />
                </div> */}
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    rows={5}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full flex items-center gap-2" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"} <Send size={16} />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
