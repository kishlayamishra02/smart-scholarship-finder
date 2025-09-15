import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FAQ = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      id: "1",
      question: "How do you find the right scholarships for me?",
      answer: "Tell us about yourself, and our smart technology will do the heavy lifting. We look at your courses, grades, interests, and where you're from to find scholarships that you're most likely to get."
    },
    {
      id: "2",
      question: "Is this service really free?",
      answer: "Yes, it's 100% free for students. Our main goal is to help you find scholarships without adding any financial stress."
    },
    {
      id: "3",
      question: "How many scholarships do you have?",
      answer: "Our database has hundreds of scholarships and we're adding more every day! We have scholarships from universities, companies, and governments, both in India and abroad."
    },
    {
      id: "4",
      question: "Can I apply for scholarships through your app?",
      answer: "You can't submit applications directly on our platform. We'll give you a direct link to the official application page. We help you get everything ready and keep track of your applications, but the final submission is with the scholarship provider."
    },
    {
      id: "5",
      question: "What should I put in my profile?",
      answer: "The more you tell us, the better we can help! Include your grades, the subjects you're studying, any extracurricular activities, and what your career goals are. A complete profile gets the best matches."
    },
    {
      id: "6",
      question: "How often should I check for new scholarships?",
      answer: "Our database is updated daily. We suggest checking in at least once a week so you don't miss out on new opportunities and upcoming deadlines."
    },
    {
      id: "7",
      question: "I'm not from India. Can I still use this?",
      answer: "Of course! We have a large number of scholarships for international students, whether you want to study in India or any other country. Just set your preferences in your profile."
    },
    {
      id: "8",
      question: "I'm not finding any good scholarships. What should I do?",
      answer: "Don't worry! First, try adding more details to your profile. A complete profile makes a big difference. If you're still stuck, reach out to our support team. We're here to help you."
    },
    {
      id: "9",
      question: "How do you remind me about deadlines?",
      answer: "Once you save a scholarship, we'll automatically track its deadline. We'll send you friendly reminders via email so you have plenty of time to complete your application."
    },
    {
      id: "10",
      question: "Is my data safe with you?",
      answer: "Absolutely. We take your privacy very seriously. Your data is encrypted, and we will never share it without your permission. You are in full control."
    },
    {
      id: "11",
      question: "Can I change my profile later?",
      answer: "Yes, and you should! As you get new grades or join new activities, update your profile. This helps us find you even better scholarship matches."
    },
    {
      id: "12",
      question: "What kinds of scholarships can I find here?",
      answer: "All sorts! We have scholarships based on your academic merit (for good grades), financial need, your field of study (like engineering or medicine), and even for specific talents like sports or arts."
    },
    {
      id: "13",
      question: "Do I need to pay back a scholarship?",
      answer: "No, a scholarship is a gift. It's money for your education that you don't have to pay back. This is different from a loan."
    },
    {
      id: "14",
      question: "Can I apply for multiple scholarships?",
      answer: "Yes, and you should! There's no limit to how many scholarships you can apply for. The more you apply to, the better your chances of winning one."
    },
    {
      id: "15",
      question: "I'm in Class 12. Is it too early to start applying?",
      answer: "Not at all! It's the perfect time to start. Many scholarships are open to students in their final year of school. Starting early gives you more time to prepare your applications."
    },
    {
      id: "16",
      question: "I'm not a top student. Can I still get a scholarship?",
      answer: "Definitely! Not all scholarships are based on grades. Many are awarded for financial need, community service, leadership skills, artistic talent, or being from a specific background. There's something for everyone."
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
            Find answers to common questions about our scholarship platform. 
            Can't find what you're looking for? Feel free to contact us.
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
            Our support team is here to help you on your scholarship journey.
          </p>
          <Button asChild>
            <a href="mailto:feedback@example.com">
              Contact Support
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
