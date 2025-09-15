import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const News = () => {
  const navigate = useNavigate();

  const newsArticles = [
    {
      id: 1,
      title: "US Student Loan Crisis Reaches $1.7 Trillion as Gen Z Faces Debt Trap",
      excerpt: "The US student loan crisis significantly impacts Gen Z, who face rising tuition costs and potential debt traps that delay life milestones.",
      author: "TOI Education",
      publication: "Times of India",
      date: "2024-09-12",
      content: "Careful planning is crucial as debt can delay life milestones and not all degrees offer equal financial returns. Exploring federal loans and alternative educational paths like trade schools is essential."
    },
    {
      id: 2,
      title: "Princeton University Budget Cuts Impact Student Employment",
      excerpt: "Budget constraints reshape student employment with reduced hours, merged roles, and uncertainty across departments.",
      author: "TOI Education",
      publication: "Times of India",
      date: "2024-09-12",
      content: "Students face heavier workloads without added pay while departments adjust operations. From dining services to libraries, many jobs see steep reductions leaving students unsure of future schedules."
    },
    {
      id: 3,
      title: "AIIMS Launches 'Never Alone' Mental Health Programme for Students",
      excerpt: "New comprehensive mental health initiative targets early intervention to prevent academic and social obstacles for students.",
      author: "ETimes Health",
      publication: "Times of India",
      date: "2024-09-12",
      content: "Student mental health issues create major obstacles that damage academic results and social bonds. The 'Never Alone' program works to prevent negative outcomes through early intervention services."
    },
    {
      id: 4,
      title: "Haryana Government Announces Funding for 2,300 EWS Students",
      excerpt: "Significant government initiative to support economically weaker sections with comprehensive educational funding coverage.",
      author: "TNN",
      publication: "Times of India",
      date: "2024-09-15",
      content: "The funding covers tuition fees, books, and essential educational resources to ensure quality education access for students from economically disadvantaged backgrounds."
    },
    {
      id: 5,
      title: "CBSE Scraps Additional Subject Option Without Prior Notice",
      excerpt: "Thousands of private students left distressed as CBSE removes additional subject option for 2026 board exams without warning.",
      author: "TOI Education",
      publication: "Times of India",
      date: "2024-09-13",
      content: "Many drop-year aspirants who relied on this option for JEE, NEET, or career shifts now face uncertain futures. Students demand clarity as CBSE remains silent amid mounting frustration."
    },
    {
      id: 6,
      title: "Tribal Students Meet President During National Integration Tour",
      excerpt: "Sixteen tribal students from Assam have inspiring meeting with President Murmu at Rashtrapati Bhavan during army-organized tour.",
      author: "TNN", 
      publication: "Times of India",
      date: "2024-09-12",
      content: "President Murmu praised the Indian Army's initiative to connect students from remote regions with India's diverse traditions and democratic institutions through educational visits."
    },
    {
      id: 7,
      title: "Student Loan Borrowers Increasingly Pause Payments Amid Economic Pressure",
      excerpt: "Growing number of UK-based borrowers use deferments and forbearances for relief, but experts warn of long-term risks.",
      author: "TOI Education",
      publication: "Times of India", 
      date: "2024-09-08",
      content: "While these options offer vital short-term relief and help avoid default, they come with risks including interest accrual. Understanding the difference between options is essential for borrowers."
    },
    {
      id: 8,
      title: "Five Students Arrested for Assaulting Manipur Student in Guwahati",
      excerpt: "In Guwahati's Jayanagar, five students were apprehended for the brutal assault of a 21-year-old Manipuri student.",
      author: "TNN",
      publication: "Times of India",
      date: "2024-09-12", 
      content: "Authorities suggest the altercation stemmed from ragging on campus. The arrested individuals include Taufik Ali, Riyam Deka, Jahed Ahmed, Priyamjyoti Kashyap, and Chanakya Mohan Borah."
    }
  ];

  const platformReviews = [
    {
      id: 1,
      title: "Smart Scholarship Finder Revolutionizes Educational Funding Search",
      excerpt: "The AI-powered platform has helped over 10,000 students find matching scholarships with a 95% satisfaction rate.",
      author: "Sarah Johnson",
      publication: "Education Today",
      date: "2024-01-15",
      rating: 5,
      type: "positive",
      content: "This innovative platform is changing how students approach scholarship hunting. The AI recommendations are incredibly accurate and have saved me countless hours of research."
    },
    {
      id: 2,
      title: "New AI Platform Makes Scholarship Applications Effortless",
      excerpt: "Students praise the intuitive interface and personalized matching system that connects them with relevant opportunities.",
      author: "Michael Chen",
      publication: "Tech Education Weekly",
      date: "2024-01-12",
      rating: 5,
      type: "positive",
      content: "The document management and deadline tracking features are game-changers. I never miss an application deadline anymore."
    },
    {
      id: 3,
      title: "Smart Scholarship Platform Shows Promise but Needs Refinement",
      excerpt: "While the core concept is solid, some users report occasional mismatches in scholarship recommendations.",
      author: "Dr. Lisa Rodriguez",
      publication: "Higher Ed Review",
      date: "2024-01-10",
      rating: 4,
      type: "good",
      content: "The platform has great potential. Most recommendations are spot-on, though I've noticed a few suggestions that didn't quite match my profile. Overall, it's a valuable tool."
    },
    {
      id: 4,
      title: "Game-Changing Scholarship Finder Receives Industry Recognition",
      excerpt: "The platform wins 'Innovation in Education Technology' award for its revolutionary approach to scholarship matching.",
      author: "Robert Kim",
      publication: "EdTech Innovation",
      date: "2024-01-08",
      rating: 5,
      type: "positive",
      content: "Finally, a scholarship platform that actually understands what students need. The AI is incredibly smart and the interface is beautiful."
    },
    {
      id: 5,
      title: "Mixed Reviews for New Scholarship Platform Launch",
      excerpt: "Early adopters share varied experiences with the AI-powered matching system, citing both successes and areas for improvement.",
      author: "Amanda Foster",
      publication: "Student Voice Daily",
      date: "2024-01-05",
      rating: 3.5,
      type: "mixed",
      content: "It's a decent start. Found a few good scholarships through the platform, but some of the matches weren't relevant to my field. The customer support team was responsive though."
    },
    {
      id: 6,
      title: "Scholarship Search Made Simple with AI Innovation",
      excerpt: "The platform's machine learning algorithms successfully match students with opportunities they might have otherwise missed.",
      author: "Jennifer Park",
      publication: "Future Learning",
      date: "2024-01-03",
      rating: 4,
      type: "good",
      content: "I discovered scholarships I never knew existed! The platform really does find hidden gems. Just wish it had more international opportunities."
    },
    {
      id: 7,
      title: "Student Scholarship Platform: Great Concept, Execution Needs Work",
      excerpt: "Users appreciate the innovative approach but report technical issues and limited scholarship database coverage.",
      author: "David Thompson",
      publication: "Campus Technology",
      date: "2024-01-01",
      rating: 3,
      type: "mixed",
      content: "Love the idea and the design is clean, but I've encountered some bugs and the scholarship database seems limited for certain majors. Hopefully they'll expand soon."
    },
    {
      id: 8,
      title: "Scholarship Platform Disappoints with Inaccurate Matching",
      excerpt: "Despite promising AI capabilities, some users report receiving irrelevant scholarship suggestions and poor customer support.",
      author: "Mark Stevens",
      publication: "Critical Ed Review",
      date: "2023-12-28",
      rating: 2,
      type: "negative",
      content: "Unfortunately, the platform didn't live up to the hype for me. Most scholarship suggestions were completely off-base for my profile and major. The support team was slow to respond to my concerns."
    }
  ];

  const getStarRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && <Star className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />}
        {[...Array(5 - Math.ceil(rating))].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-gray-300" />
        ))}
        <span className="text-sm text-muted-foreground ml-2">{rating}/5</span>
      </div>
    );
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'positive': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'mixed': return 'bg-yellow-100 text-yellow-800';
      case 'negative': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
            Student News & Platform Reviews
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest education news and read what users are saying about Smart Scholarship Finder.
          </p>
        </div>

        {/* Latest News Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8">Latest Education News</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {newsArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg leading-tight mb-2">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {article.excerpt}
                  </CardDescription>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mt-4">
                    <div>
                      <p className="font-medium">{article.author}</p>
                      <p>{article.publication}</p>
                    </div>
                    <p>{new Date(article.date).toLocaleDateString()}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-sm italic text-muted-foreground border-l-4 border-primary pl-4">
                    "{article.content}"
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Platform Reviews Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8">Platform Reviews</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {platformReviews.map((review) => (
              <Card key={review.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <CardTitle className="text-lg leading-tight mb-2">
                        {review.title}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {review.excerpt}
                      </CardDescription>
                    </div>
                    <Badge className={getTypeColor(review.type)}>
                      {review.type}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mt-4">
                    <div>
                      <p className="font-medium">{review.author}</p>
                      <p>{review.publication}</p>
                    </div>
                    <p>{new Date(review.date).toLocaleDateString()}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    {getStarRating(review.rating)}
                  </div>
                  <blockquote className="text-sm italic text-muted-foreground border-l-4 border-primary pl-4">
                    "{review.content}"
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Have experience with our platform? 
            <a href="mailto:kishlayamishra@gmail.com" className="text-primary hover:underline ml-1">
              Share your feedback
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default News;