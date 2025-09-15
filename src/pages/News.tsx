import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const News = () => {
  const navigate = useNavigate();

  const newsArticles = [
    {
      id: 1,
      title: "The Rise of AI in Personalized Learning",
      excerpt: "Artificial intelligence is reshaping education by offering personalized learning paths for students, adapting to their individual needs and pace.",
      author: "Jane Doe",
      publication: "Education Weekly",
      date: "2025-09-10",
      content: "AI-powered tools are helping teachers to create customized lesson plans and providing students with adaptive exercises, making learning more effective and engaging."
    },
    {
      id: 2,
      title: "Microlearning and Gamification: The Future of Student Engagement",
      excerpt: "Educational institutions are adopting microlearning and gamification to make learning more interactive and fun.",
      author: "John Smith",
      publication: "EdTech Magazine",
      date: "2025-09-08",
      content: "Bite-sized lessons and game-like elements are proving to be successful in capturing students' attention and improving knowledge retention."
    },
    {
      id: 3,
      title: "From STEM to STEAM: The Importance of Arts in Education",
      excerpt: "The focus is shifting from STEM to STEAM, integrating Arts into Science, Technology, Engineering, and Math to foster creativity and innovation.",
      author: "Emily White",
      publication: "The Learning Curve",
      date: "2025-09-05",
      content: "By incorporating arts and design principles, STEAM education encourages students to think more creatively and develop problem-solving skills."
    },
    {
      id: 4,
      title: "No-Essay Scholarships Gain Popularity Among Students",
      excerpt: "A growing number of organizations are offering no-essay scholarships, reducing the barrier to entry for many students.",
      author: "David Green",
      publication: "Scholarship Times",
      date: "2025-09-02",
      content: "These scholarships are often based on criteria like academic achievement, community service, or even a random draw, making it easier for students to apply for multiple opportunities."
    },
    {
      id: 5,
      title: "Sallie Mae Fund Announces 'Completing the Dream' Scholarship",
      excerpt: "The Sallie Mae Fund is offering up to $2,500 to 170 students through its 'Completing the Dream' scholarship program in 2025.",
      author: "Official Announcement",
      publication: "Sallie Mae News",
      date: "2025-08-28",
      content: "This scholarship is designed to help students from underserved communities to complete their post-secondary education."
    },
    {
      id: 6,
      title: "UNCF Continues to be a Top Scholarship Provider for Minority Students",
      excerpt: "The UNCF remains a leading private scholarship provider for minority students, awarding over $100 million annually.",
      author: "Press Release",
      publication: "UNCF",
      date: "2025-08-25",
      content: "With several scholarship deadlines in September, the UNCF provides a wide range of opportunities for students of color."
    },
    {
      id: 7,
      title: "Dr Pepper's $100,000 Tuition Giveaway is Back",
      excerpt: "The popular Dr Pepper's Tuition Giveaway is once again offering students a chance to win $100,000 in tuition.",
      author: "Marketing Team",
      publication: "Dr Pepper",
      date: "2025-08-20",
      content: "Students can enter the giveaway by submitting a video explaining how the tuition money would help them achieve their goals."
    },
    {
      id: 8,
      title: "Panda Express's Panda Cares Scholars Program Now Open",
      excerpt: "The Panda Cares Scholars Program, from Panda Express, is now accepting applications for its scholarship program.",
      author: "Panda Express",
      publication: "Panda Cares",
      date: "2025-08-18",
      content: "This program provides scholarships to high school students who have demonstrated academic excellence and community involvement."
    }
  ];

  const platformReviews = [
    {
      id: 1,
      title: "Found my dream scholarship!",
      excerpt: "I'd been searching for months with no luck. Within a week of using this platform, I found a scholarship that was a perfect match for my major and financial needs.",
      author: "Jessica M.",
      publication: "Student",
      date: "2025-09-12",
      rating: 5,
      type: "positive",
      content: "The matching algorithm is amazing! It filtered out all the noise and showed me exactly what I was looking for. I'm so grateful for this platform."
    },
    {
      id: 2,
      title: "Great platform, but could use a small tweak",
      excerpt: "I really like the user interface and how easy it is to navigate. My only suggestion would be to add a feature to save my filter preferences.",
      author: "Michael R.",
      publication: "Student",
      date: "2025-09-10",
      rating: 4,
      type: "good",
      content: "It's a bit of a hassle to re-apply my filters every time I log in. Other than that, it's a fantastic tool that has helped me find several promising scholarships."
    },
    {
      id: 3,
      title: "Helpful, but the UI feels a bit dated",
      excerpt: "The platform is definitely useful and has a good database of scholarships. However, the user interface could use a modern refresh.",
      author: "Samantha K.",
      publication: "Student",
      date: "2025-09-09",
      rating: 3,
      type: "mixed",
      content: "Sometimes it's hard to find certain buttons and the overall design feels a little clunky. But in terms of functionality, it gets the job done."
    },
    {
      id: 4,
      title: "A lifesaver for my daughter!",
      excerpt: "As a parent, navigating the world of scholarships is overwhelming. This platform made it so much easier to help my daughter find and apply for scholarships.",
      author: "Sarah P.",
      publication: "Parent",
      date: "2025-09-07",
      rating: 5,
      type: "positive",
      content: "The deadline reminders are a godsend! We were able to stay organized and submit all her applications on time. Highly recommend to all parents."
    },
    {
      id: 5,
      title: "Not many options for my major",
      excerpt: "I'm a marine biology major, and I found that there weren't many scholarships listed for my specific field. The platform seems more geared towards common majors.",
      author: "Alex T.",
      publication: "Student",
      date: "2025-09-05",
      rating: 2,
      type: "negative",
      content: "I spent a lot of time setting up my profile, only to find a handful of scholarships, none of which were a great fit. It was a disappointing experience."
    },
    {
      id: 6,
      title: "An invaluable tool for my students",
      excerpt: "As a high school counselor, I'm always looking for resources to help my students. This platform has become my go-to for scholarship research.",
      author: "Mr. Davis",
      publication: "High School Counselor",
      date: "2025-09-03",
      rating: 4,
      type: "good",
      content: "It's user-friendly and has a comprehensive database. I've recommended it to all my students, and many of them have had success with it."
    },
    {
      id: 7,
      title: "The deadline tracking is a game-changer!",
      excerpt: "I used to have a complicated spreadsheet to keep track of scholarship deadlines. This platform's deadline tracking feature has made my life so much easier.",
      author: "Maria G.",
      publication: "Student",
      date: "2025-09-01",
      rating: 5,
      type: "positive",
      content: "I get timely reminders for all my saved scholarships, so I never have to worry about missing a deadline. It's a simple feature, but it makes a huge difference."
    },
    {
      id: 8,
      title: "Good app, but too many notifications",
      excerpt: "The app is useful, but I wish I could customize the notification settings. I get way too many emails and push notifications.",
      author: "Ben C.",
      publication: "Student",
      date: "2025-08-30",
      rating: 3,
      type: "mixed",
      content: "I want to stay updated, but I don't need a notification for every single new scholarship that gets added. More control over notifications would be great."
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
            Stay updated with the latest education news and read what users are saying about our platform.
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
                  <blockquote className="text-sm italic text-muted-foreground border-l-4 border-.primary pl-4">
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
            <a href="mailto:feedback@example.com" className="text-primary hover:underline ml-1">
              Share your feedback
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default News;
