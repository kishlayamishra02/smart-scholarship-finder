import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FAQ = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      id: "1",
      question: "How does the AI-powered scholarship matching work?",
      answer: "Our AI analyzes your academic profile, interests, background, and goals to match you with relevant scholarships. The system considers factors like your field of study, GPA, location, financial need, and specific requirements to provide personalized recommendations."
    },
    {
      id: "2", 
      question: "Is Smart Scholarship Finder free to use?",
      answer: "Yes! Our basic scholarship search and matching service is completely free. We believe every student should have access to educational funding opportunities regardless of their financial situation."
    },
    {
      id: "3",
      question: "How many scholarships are in your database?",
      answer: "We currently have thousands of scholarships in our database and continuously add new opportunities. Our database includes scholarships from universities, private organizations, government programs, and foundations worldwide."
    },
    {
      id: "4",
      question: "Can I apply to scholarships directly through your platform?",
      answer: "While you can't submit applications directly through our platform, we provide direct links to official application pages and track your application progress. We also offer document management tools to help organize your application materials."
    },
    {
      id: "5",
      question: "What information do I need to create a profile?",
      answer: "To get the best matches, we recommend providing information about your academic background, field of study, GPA, location, financial situation, extracurricular activities, and career goals. The more detailed your profile, the better our AI can match you with relevant opportunities."
    },
    {
      id: "6",
      question: "How often are scholarships updated?",
      answer: "Our database is updated regularly with new scholarship opportunities and deadline changes. We recommend checking your dashboard weekly for new matches and important deadline reminders."
    },
    {
      id: "7",
      question: "Can international students use this platform?",
      answer: "Absolutely! We have scholarships available for both domestic and international students. Our platform includes opportunities specifically designed for international students studying abroad."
    },
    {
      id: "8",
      question: "What if I don't find relevant matches?",
      answer: "If you're not seeing relevant matches, try updating your profile with more detailed information or adjusting your preferences. You can also contact our support team for personalized assistance in finding suitable opportunities."
    },
    {
      id: "9",
      question: "How do deadline reminders work?",
      answer: "Once you save scholarships or mark them as 'interested,' our system automatically tracks deadlines and sends you email reminders at strategic intervals before applications are due."
    },
    {
      id: "10",
      question: "Is my personal information secure?",
      answer: "Yes, we take data security seriously. All personal information is encrypted and stored securely. We never share your data with third parties without your explicit consent, and you can delete your account and data at any time."
    },
    {
      id: "11",
      question: "Can I edit my profile after creating it?",
      answer: "Yes, you can update your profile information at any time. We actually recommend updating your profile regularly as your academic situation changes to ensure you continue receiving the most relevant matches."
    },
    {
      id: "12",
      question: "What types of scholarships do you cover?",
      answer: "We cover a wide range of scholarships including merit-based, need-based, field-specific, demographic-specific, athletic, artistic, and community service scholarships. Our database includes opportunities from universities, private foundations, corporations, and government programs."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <HelpCircle className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about Smart Scholarship Finder. 
            Can't find what you're looking for? Contact our support team.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq) => (
            <AccordionItem 
              key={faq.id} 
              value={faq.id}
              className="border border-border rounded-lg px-6"
            >
              <AccordionTrigger className="text-left hover:no-underline hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center bg-muted/50 rounded-lg p-8">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Still have questions?
          </h3>
          <p className="text-muted-foreground mb-4">
            Our support team is here to help you make the most of Smart Scholarship Finder.
          </p>
          <Button asChild>
            <a href="mailto:kishlayamishra@gmail.com">
              Contact Support
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;