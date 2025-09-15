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
      title: "AI in Education: A Boon for Indian Students?",
      excerpt: "AI-powered platforms are helping Indian students prepare for competitive exams and find scholarships for studying abroad.",
      author: "Priya Sharma",
      publication: "India Today Education",
      date: "2025-09-10",
      content: "With the rise of AI, students in India have access to personalized learning tools that can help them crack tough exams like JEE and NEET."
    },
    {
      id: 2,
      title: "The Global Trend of Microlearning",
      excerpt: "Educational institutions worldwide are adopting microlearning to cater to the shorter attention spans of the new generation of learners.",
      author: "David Miller",
      publication: "World Education News",
      date: "2025-09-08",
      content: "Bite-sized content is becoming the norm, as it allows for flexible and on-the-go learning, a trend seen from the US to Japan."
    },
    {
      id: 3,
      title: "From STEM to STEAM: A Curriculum Shift in India",
      excerpt: "Indian schools are slowly but surely integrating Arts into the traditional STEM curriculum to foster creativity and innovation.",
      author: "Aarav Singh",
      publication: "The Hindu Education Plus",
      date: "2025-09-05",
      content: "The new National Education Policy (NEP) in India emphasizes a multidisciplinary approach, paving the way for a STEAM-focused education system."
    },
    {
      id: 4,
      title: "No-Essay Scholarships: A Relief for Students Everywhere",
      excerpt: "The trend of no-essay scholarships is growing, offering students from all backgrounds a shot at funding without the stress of writing essays.",
      author: "Emily Chen",
      publication: "Global Scholarship Digest",
      date: "2025-09-02",
      content: "These scholarships are a great way to quickly apply for funding and are becoming popular on platforms that aggregate opportunities from different countries."
    },
    {
      id: 5,
      title: "Sallie Mae Fund's 'Completing the Dream' Scholarship for US Students",
      excerpt: "The Sallie Mae Fund is offering up to $2,500 to 170 students in the US through its 'Completing the Dream' scholarship program.",
      author: "Official Announcement",
      publication: "Sallie Mae News",
      date: "2025-08-28",
      content: "This scholarship is aimed at helping students from minority and underserved communities in the United States complete their higher education."
    },
    {
      id: 6,
      title: "UNCF Scholarships for Minority Students in the US",
      excerpt: "The UNCF continues its mission to support minority students in the US with over $100 million in scholarships annually.",
      author: "Press Release",
      publication: "UNCF",
      date: "2025-08-25",
      content: "The UNCF has a long history of supporting African American students and provides a wide range of scholarships with varying eligibility criteria."
    },
    {
      id: 7,
      title: "Dr Pepper's Tuition Giveaway Attracts US College Hopefuls",
      excerpt: "The popular Dr Pepper's Tuition Giveaway is a major opportunity for students in the US to win substantial tuition funding.",
      author: "Marketing Team",
      publication: "Dr Pepper",
      date: "2025-08-20",
      content: "The contest, which involves a video submission, has become a well-known path to winning significant tuition money in the United States."
    },
    {
      id: 8,
      title: "Panda Cares Scholars Program for US High School Students",
      excerpt: "The Panda Cares Scholars Program, by Panda Express, is a significant scholarship opportunity for US high school students.",
      author: "Panda Express",
      publication: "Panda Cares",
      date: "2025-08-18",
      content: "The program focuses on academic achievement and community involvement, providing support to young leaders across the United States."
    }
  ];

  const platformReviews = [
    {
      id: 1,
      title: "A true blessing for an aspiring engineer!",
      excerpt: "I was struggling to find scholarships for my engineering studies in India. This platform was a game-changer, showing me options I never knew existed.",
      author: "Ananya Rao",
      publication: "Student, Bangalore",
      date: "2025-09-12",
      rating: 5,
      type: "positive",
      content: "The categorization of scholarships by field of study is incredibly helpful. I found a scholarship from a private trust that covers my entire tuition. Thank you!"
    },
    {
      id: 2,
      title: "Decent, but needs more UK-specific scholarships",
      excerpt: "As a student in the UK, I found the platform easy to use, but the database seems more focused on US and Indian scholarships.",
      author: "Ben Carter",
      publication: "Student, Manchester",
      date: "2025-09-10",
      rating: 3,
      type: "mixed",
      content: "It's a good starting point, but I had to supplement my search with other resources to find local scholarships. Would be great to see more options for UK students."
    },
    {
      id: 3,
      title: "Finally, a platform that understands Indian students!",
      excerpt: "This app is brilliant! It has all the government and private scholarships for us here in India. The interface is so simple to use.",
      author: "Karan Sharma",
      publication: "Student, Delhi",
      date: "2025-09-09",
      rating: 5,
      type: "positive",
      content: "I especially love the alerts for deadlines. It helped me apply for the state scholarship just in time. Every Indian student should use this."
    },
    {
      id: 4,
      title: "A must-have for parents of college-bound kids in India",
      excerpt: "I was so worried about my son's college fees. This platform gave us a clear list of scholarships he was eligible for. It took away so much stress.",
      author: "Mrs. Iyer",
      publication: "Parent, Chennai",
      date: "2025-09-07",
      rating: 5,
      type: "positive",
      content: "The document checklist for each application was a fantastic feature. We were able to prepare everything in advance. A very thoughtful platform."
    },
    {
      id: 5,
      title: "Found a niche scholarship for my arts degree!",
      excerpt: "I'm studying fine arts in the US and it's hard to find funding. I was surprised to find a scholarship here specifically for painters.",
      author: "Chloe Kim",
      publication: "Student, New York",
      date: "2025-09-05",
      rating: 4,
      type: "good",
      content: "The platform has a surprisingly diverse range of scholarships if you dig deep enough. The search filters could be a bit more intuitive, but I'm happy with what I found."
    },
    {
      id: 6,
      title: "An excellent resource for my students",
      excerpt: "As a counselor in a Mumbai school, I recommend this platform to all my students. It's the most comprehensive I've seen for Indian scholarships.",
      author: "Mr. Deshpande",
      publication: "High School Counselor, Mumbai",
      date: "2025-09-03",
      rating: 5,
      type: "positive",
      content: "It saves my students and me a lot of time. The ability to track applications in one place is a huge advantage. Keep up the great work!"
    },
    {
      id: 7,
      title: "Great for finding scholarships to study in Canada",
      excerpt: "I'm from the UAE and wanted to study in Canada. This platform had a dedicated section for international students and I found some great options.",
      author: "Fatima Al-Jamil",
      publication: "Student, Dubai",
      date: "2025-09-01",
      rating: 4,
      type: "good",
      content: "The process was very transparent. I wish there were more reviews from other international students on the scholarships themselves, but the platform is great."
    },
    {
      id: 8,
      title: "Good, but the notifications are too much!",
      excerpt: "The app is useful for sure, but I get so many emails and notifications every day. It feels a bit like spam.",
      author: "Rajesh Kumar",
      publication: "Student, Pune",
      date: "2025-08-30",
      rating: 3,
      type: "mixed",
      content: "I had to turn off notifications completely. It would be better if I could choose to get a weekly digest instead of constant updates. Otherwise, it's a solid app."
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