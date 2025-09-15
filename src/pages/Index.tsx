import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import student1 from "@/assets/student-1.jpg";
import student2 from "@/assets/student-2.jpg";
import student3 from "@/assets/student-3.jpg";

const Index = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();
  }, []);

  const handleGetStarted = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/auth");
    }
  };

  const handleApplyNow = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Smart Scholarship Finder
              </span>
              <span className="text-orange-500 text-3xl ml-1">+</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-600 hover:text-primary font-medium transition-colors">Home</Link>
              <Link to="/news" className="text-gray-600 hover:text-primary font-medium transition-colors">News</Link>
              <Link to="/faq" className="text-gray-600 hover:text-primary font-medium transition-colors">FAQ's</Link>
              <Link to="/contact" className="text-gray-600 hover:text-primary font-medium transition-colors">Contact Us</Link>
            </nav>
            <div className="flex items-center">
              <Button variant="hero" size="sm" onClick={handleGetStarted} className="rounded-full px-6">
                {user ? 'Dashboard' : 'Login'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        {/* Decorative elements */}
        <div className="absolute top-20 left-20 w-6 h-20 bg-pink-300 rounded-full transform rotate-45 opacity-60"></div>
        <div className="absolute top-32 right-32 w-4 h-16 bg-purple-300 rounded-full transform -rotate-12 opacity-60"></div>
        <div className="absolute bottom-40 left-40 w-8 h-8 bg-yellow-300 rounded-full opacity-60"></div>
        <div className="absolute bottom-60 right-1/4 w-6 h-6 bg-purple-400 rounded-full opacity-60"></div>
        <div className="absolute top-1/2 left-10 w-3 h-12 bg-pink-400 rounded-full transform rotate-45 opacity-50"></div>
        <div className="absolute top-1/3 right-10 w-4 h-4 bg-blue-300 rounded-full opacity-60"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              Let's trigger Your career with our{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Smart Scholarship Finder program
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover thousands of scholarships tailored to your academic profile and career goals. 
              Our AI-powered platform matches you with opportunities that align with your qualifications and aspirations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" onClick={handleApplyNow} className="rounded-full px-8">
                Apply Now
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8 border-gray-300 text-gray-600 hover:bg-gray-50" onClick={() => navigate('/auth')}>
                Explore All Scholarships
              </Button>
            </div>
          </div>

          {/* Student Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            {/* Student 1 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-yellow-300 to-orange-400 rounded-3xl p-6 transform hover:scale-105 transition-transform duration-300">
                <img 
                  src={student1} 
                  alt="Happy student with backpack" 
                  className="w-full h-64 object-cover rounded-2xl"
                />
              </div>
              <div className="mt-6 bg-white rounded-2xl p-6 shadow-lg">
                <p className="text-sm text-gray-600 mb-4 italic">
                  "This platform helped me find 15 scholarships that matched my profile perfectly. I got accepted to 3 of them!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-yellow-500 rounded-full mr-3 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">MJ</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Marcus Johnson</p>
                    <p className="text-sm text-gray-500">Stanford University</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Student 2 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-3xl p-6 transform hover:scale-105 transition-transform duration-300">
                <img 
                  src={student2} 
                  alt="Female student with books" 
                  className="w-full h-64 object-cover rounded-2xl"
                />
              </div>
              <div className="mt-6 bg-white rounded-2xl p-6 shadow-lg">
                <p className="text-sm text-gray-600 mb-4 italic">
                  "The AI recommendations were spot-on! I never knew there were so many scholarships available for my field of study."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-500 rounded-full mr-3 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">SW</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Sarah Williams</p>
                    <p className="text-sm text-gray-500">MIT</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Student 3 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl p-6 transform hover:scale-105 transition-transform duration-300">
                <img 
                  src={student3} 
                  alt="Male student with laptop" 
                  className="w-full h-64 object-cover rounded-2xl"
                />
              </div>
              <div className="mt-6 bg-white rounded-2xl p-6 shadow-lg">
                <p className="text-sm text-gray-600 mb-4 italic">
                  "Amazing platform! The document management and deadline reminders saved me so much time during application season."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-500 rounded-full mr-3 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">DC</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">David Chen</p>
                    <p className="text-sm text-gray-500">Harvard University</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Steps Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-16">
            3 Steps Applications Process
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-full text-white text-2xl font-bold mb-6">
                1
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Create Profile</h3>
              <p className="text-muted-foreground">
                Tell us about your academic background, interests, 
                and goals to get personalized matches.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-full text-white text-2xl font-bold mb-6">
                2
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Browse Matches</h3>
              <p className="text-muted-foreground">
                Review AI-powered scholarship recommendations 
                tailored specifically to your profile.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-full text-white text-2xl font-bold mb-6">
                3
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Apply & Track</h3>
              <p className="text-muted-foreground">
                Apply directly through our platform and track your 
                application progress in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Find Your Perfect Scholarships?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of students who have simplified their scholarship search and application 
            process.
          </p>
          <Button variant="warning" size="xl" onClick={handleGetStarted}>
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-lg font-bold text-primary">Smart Scholar Founder</span>
              <p className="text-muted-foreground mt-1">© 2024 Smart Scholar Founder. All rights reserved.</p>
            </div>
            <div className="flex space-x-8">
              <a href="#" className="text-muted-foreground hover:text-primary">Home</a>
              <a href="https://aismartscholar.netlify.app/news" className="text-muted-foreground hover:text-primary">Reviews</a>
              <a href="https://aismartscholar.netlify.app/faq" className="text-muted-foreground hover:text-primary">FAQs</a>
              <a href="https://aismartscholar.netlify.app/contact" className="text-muted-foreground hover:text-primary">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;