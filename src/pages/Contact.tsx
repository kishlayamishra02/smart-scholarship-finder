import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Mail, MessageCircle, Users, Lightbulb, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Handle form submission with fetch (no redirect to Formspree page)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const res = await fetch("https://formspree.io/f/xblaennq", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    setLoading(false);

    if (res.ok) {
      toast({
        title: "✅ Message Sent",
        description: "We’ll get back to you soon!",
      });
      form.reset();
    } else {
      toast({
        title: "❌ Error",
        description: "Something went wrong. Try again later.",
      });
    }
  };

  // Copy email to clipboard
  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    toast({
      title: "📋 Email copied",
      description: email,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions, feedback, or need support? We're here to help you succeed in your scholarship journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Send us a message
              </CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" name="firstName" placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" name="lastName" placeholder="Doe" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" name="subject" placeholder="How can we help you?" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    name="message"
                    placeholder="Tell us more about your question or feedback..."
                    className="min-h-[120px]"
                    required 
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-700 text-sm space-y-2">
                  Interested in contributing to AI Scholar? This platform is fully open-source! You can help us manage the scholarship database, add new scholarships, improve features, and fix bugs. 
                  <br />
                  Here's how it works:
                  <ul className="list-disc list-inside mt-2">
                  <li>Visit our GitHub repository and fork the project.</li>
                  <li>Create a new branch for the changes or features you want to work on.</li>
                  <li>Implement your improvements and make sure everything works smoothly.</li>
                  <li>Open a Pull Request (PR) with a clear description of your changes.</li>
                  <li>Message the Product Manager to discuss your ideas and and starting contributing.</li>
                  </ul>
                  <br />
                  Your contributions will directly help students discover scholarships faster and make the platform better for everyone!
                  </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information & Quick Actions */}
          <div className="space-y-6">
            {/* Direct Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Direct Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Team Contacts</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-muted-foreground">
                          Product Manager –{" "}
                          <a href="mailto:kishlayamishra@gmail.com" className="text-primary hover:underline">
                            Kishlaya Mishra
                          </a>
                        </p>
                        <Button size="icon" variant="ghost" onClick={() => copyEmail("kishlayamishra@gmail.com")}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-muted-foreground">
                          Tech Lead –{" "}
                          <a href="mailto:harshitabhaskaruni@gmail.com" className="text-primary hover:underline">
                            Harshita Bhaskaruni
                          </a>
                        </p>
                        <Button size="icon" variant="ghost" onClick={() => copyEmail("harshitabhaskaruni@gmail.com")}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-muted-foreground">
                          AI Engineer –{" "}
                          <a href="mailto:designer@example.com" className="text-primary hover:underline">
                            Akshita Gaur
                          </a>
                        </p>
                        <Button size="icon" variant="ghost" onClick={() => copyEmail("akshithagoud.kotha2007@gmail.com")}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-muted-foreground">
                          Data Engineer –{" "}
                          <a href="mailto:support@example.com" className="text-primary hover:underline">
                            Lalita Tyagi
                          </a>
                        </p>
                        <Button size="icon" variant="ghost" onClick={() => copyEmail("tyagilalita056@gmail.com")}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Response Time</Label>
                    <p className="text-muted-foreground">Usually within 24 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Help */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Quick Help
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/faq')}>
                  View FAQ
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/auth')}>
                  Get Started with Profile
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/scholarships')}>
                  Browse Scholarships
                </Button>
              </CardContent>
            </Card>

            {/* Common Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Common Topics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Profile setup and optimization</li>
                  <li>• Understanding scholarship matches</li>
                  <li>• Application process guidance</li>
                  <li>• Technical support and bugs</li>
                  <li>• Feature requests and feedback</li>
                  <li>• Account management</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Powered by Gemini */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
            <span className="text-sm text-muted-foreground">Powered by</span>
            <span className="text-sm font-semibold text-primary">Google Gemini AI</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
