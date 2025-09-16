import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, User, GraduationCap, Settings, Plus, Sparkles, Database, Home, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useScholarships, UserProfile } from "@/hooks/useScholarships";
import { ScholarshipMatches } from "@/components/ScholarshipMatches";
import { supabase } from "@/integrations/supabase/client";
import { Session, User as SupabaseUser } from "@supabase/supabase-js";
import { useToast } from "@/components/ui/use-toast";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showMatches, setShowMatches] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const { loading, matches, populateScholarships, findMatches } = useScholarships();

  const [formData, setFormData] = useState<Partial<UserProfile>>({
    full_name: '',
    email: '',
    country: '',
    gender: '',
    age: '',
    degree_program: '',
    field_of_study: '',
    education_level: '',
    gpa: '',
    institution: '',
    graduation_year: '',
    financial_need: false,
    income_level: '',
    max_application_fee: '',
    preferred_countries: [],
    languages: [],
    achievements: '',
    activities: '',
    work_experience: '',
    community_service: ''
  });

  // NEW: state for inline validation errors
  const [errorMessage, setErrorMessage] = useState("");

  const steps = [
    { id: 1, title: "Personal Info", icon: User, completed: false },
    { id: 2, title: "Academic Details", icon: GraduationCap, completed: false },
    { id: 3, title: "Financial & Preferences", icon: Settings, completed: false },
    { id: 4, title: "Experience & Activities", icon: Plus, completed: false },
  ];

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session?.user) {
          navigate("/auth");
          return;
        }

        // Check if user already has a profile
        if (session?.user) {
          setTimeout(async () => {
            try {
              console.log('Profile page checking for user:', session.user.id);
              const { data: profile, error } = await supabase
                .from('user_profiles')
                .select('*')
                .eq('user_id', session.user.id)
                .maybeSingle();

              console.log('Profile page check result:', { profile, error });

              if (!error && profile) {
                console.log('Profile exists, redirecting to dashboard');
                navigate("/dashboard");
              } else {
                console.log('No profile found, staying on profile page');
              }
            } catch (error) {
              console.log('Error checking profile:', error);
            }
          }, 0);
        }
      }
    );

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session?.user) {
        navigate("/auth");
        return;
      }

      // Check if user already has a profile
      if (session?.user) {
        try {
          console.log('Initial profile check for user:', session.user.id);
          const { data: profile, error } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('user_id', session.user.id)
            .maybeSingle();

          console.log('Initial profile check result:', { profile, error });

          if (!error && profile) {
            console.log('Profile exists, redirecting to dashboard');
            navigate("/dashboard");
          } else {
            console.log('No profile found, staying on profile page');
          }
        } catch (error) {
          console.log('Error checking profile:', error);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleNext = async () => {
    if (!validateCurrentStep()) return;

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsLoading(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        // Check if profile already exists to prevent duplicates
        const { data: existingProfile } = await supabase
          .from('user_profiles')
          .select('id')
          .eq('user_id', user.id)
          .maybeSingle();

        if (existingProfile) {
          console.log('Profile already exists, navigating to dashboard');
          navigate('/dashboard');
          return;
        }

        const { error } = await supabase
          .from('user_profiles')
          .insert({
            user_id: user.id,
            ...formData
          });

        if (error) throw error;

        toast({
          title: "Profile Saved",
          description: "Redirecting to your personalized dashboard...",
        });

        navigate('/dashboard');
      } catch (error) {
        console.error('Error saving profile:', error);
        toast({
          title: "Error",
          description: "Failed to save profile. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const validateCurrentStep = () => {
    const currentYear = new Date().getFullYear();
    
    switch (currentStep) {
     case 1: {
        const missing = [];
        if (!formData.full_name?.trim()) missing.push("Full Name");
        if (!formData.email?.trim()) missing.push("Email");
        if (!formData.country?.trim()) missing.push("Country");
        
        // Age validation
        if (formData.age && (parseInt(formData.age) < 1 || parseInt(formData.age) > 70)) {
          setErrorMessage("Age must be between 1 and 70 years");
          return false;
        }
        
        if (missing.length > 0) {
          setErrorMessage("Missing: " + missing.join(", "));
          return false;
        }
        setErrorMessage("");
        return true;
      }
      case 2: {
        const missing = [];
        if (!formData.education_level?.trim()) missing.push("Education Level");
        if (!formData.field_of_study?.trim()) missing.push("Field of Study");
        if (!formData.institution?.trim()) missing.push("Institution");
        if (!formData.gpa?.trim()) missing.push("GPA");
        
        // Institution validation - only allow letters, spaces, and common punctuation
        if (formData.institution && !/^[a-zA-Z\s\-\.\,\&\']+$/.test(formData.institution)) {
          setErrorMessage("Institution name can only contain letters, spaces, and common punctuation");
          return false;
        }
        
        // Graduation year validation
        if (formData.graduation_year) {
          const gradYear = parseInt(formData.graduation_year);
          if (gradYear < currentYear || gradYear > currentYear + 10) {
            setErrorMessage("Expected graduation year must be between current year and next 10 years");
            return false;
          }
        }
        
        if (missing.length > 0) {
          setErrorMessage("Missing: " + missing.join(", "));
          return false;
        }
        setErrorMessage("");
        return true;
      }
      case 3: {
        const missing = [];
        if (!formData.income_level?.trim()) missing.push("Income Level");
        if (!formData.preferred_countries?.length) missing.push("Preferred Countries");
        if (missing.length > 0) {
          setErrorMessage("Missing: " + missing.join(", "));
          return false;
        }
        setErrorMessage("");
        return true;
      }
      default:
        setErrorMessage("");
        return true;
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayField = (field: 'preferred_countries' | 'languages', value: string) => {
    setFormData(prev => {
      const currentArray = prev[field] || [];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      return { ...prev, [field]: newArray };
    });
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleBackToHome = () => navigate("/");

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handlePopulateDatabase = async () => {
    try {
      await populateScholarships();
    } catch (error) {
      console.error('Failed to populate database:', error);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input 
                id="fullName" 
                placeholder="Enter your full name" 
                className="mt-1"
                value={formData.full_name}
                onChange={(e) => updateFormData('full_name', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="your.email@example.com" 
                className="mt-1"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="country">Country *</Label>
                <Select value={formData.country} onValueChange={(value) => updateFormData('country', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="India">India</SelectItem>
                    <SelectItem value="Pakistan">Pakistan</SelectItem>
                    <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                    <SelectItem value="Sri Lanka">Sri Lanka</SelectItem>
                    <SelectItem value="Nepal">Nepal</SelectItem>
                    <SelectItem value="USA">United States</SelectItem>
                    <SelectItem value="UK">United Kingdom</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                    <SelectItem value="Australia">Australia</SelectItem>
                    <SelectItem value="Germany">Germany</SelectItem>
                    <SelectItem value="France">France</SelectItem>
                    <SelectItem value="Netherlands">Netherlands</SelectItem>
                    <SelectItem value="Singapore">Singapore</SelectItem>
                    <SelectItem value="China">China</SelectItem>
                    <SelectItem value="Japan">Japan</SelectItem>
                    <SelectItem value="South Korea">South Korea</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => updateFormData('gender', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="na">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="age">Age</Label>
              <Input 
                id="age" 
                type="number"
                placeholder="Your age" 
                className="mt-1"
                min="1"
                max="70"
                value={formData.age}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 70)) {
                    updateFormData('age', value);
                  }
                }}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="degree">Degree Program *</Label>
              <Input 
                id="degree" 
                placeholder="e.g. Computer Science" 
                className="mt-1"
                value={formData.degree_program}
                onChange={(e) => updateFormData('degree_program', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="field">Field of Study *</Label>
              <Select value={formData.field_of_study} onValueChange={(value) => updateFormData('field_of_study', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select your field" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="AI/ML">Artificial Intelligence/Machine Learning</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Medicine">Medicine</SelectItem>
                  <SelectItem value="Law">Law</SelectItem>
                  <SelectItem value="Arts">Arts</SelectItem>
                  <SelectItem value="Sciences">Sciences</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="All subjects">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="level">Education Level *</Label>
                <Select value={formData.education_level} onValueChange={(value) => updateFormData('education_level', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="undergraduate">Undergraduate</SelectItem>
                    <SelectItem value="graduate">Graduate</SelectItem>
                    <SelectItem value="postgraduate">Postgraduate</SelectItem>
                    <SelectItem value="phd">PhD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="gpa">GPA/Academic Score *</Label>
                <Select value={formData.gpa} onValueChange={(value) => updateFormData('gpa', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select your GPA range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9.0-10.0">9.0-10.0 (Excellent)</SelectItem>
                    <SelectItem value="8.0-8.9">8.0-8.9 (Very Good)</SelectItem>
                    <SelectItem value="7.0-7.9">7.0-7.9 (Good)</SelectItem>
                    <SelectItem value="6.0-6.9">6.0-6.9 (Above Average)</SelectItem>
                    <SelectItem value="5.0-5.9">5.0-5.9 (Average)</SelectItem>
                    <SelectItem value="Below 5.0">Below 5.0</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="institution">Institution *</Label>
                <Input 
                  id="institution" 
                  placeholder="Your university/college name" 
                  className="mt-1"
                  value={formData.institution}
                  onChange={(e) => {
                    // Only allow letters, spaces, and common punctuation
                    const value = e.target.value;
                    if (value === '' || /^[a-zA-Z\s\-\.\,\&\']*$/.test(value)) {
                      updateFormData('institution', value);
                    }
                  }}
                />
              </div>
              <div>
                <Label htmlFor="graduation">Expected Graduation Year *</Label>
                <Input 
                  id="graduation" 
                  type="number"
                  placeholder="2025" 
                  className="mt-1"
                  min={new Date().getFullYear()}
                  max={new Date().getFullYear() + 10}
                  value={formData.graduation_year}
                  onChange={(e) => {
                    const value = e.target.value;
                    const currentYear = new Date().getFullYear();
                    if (value === '' || (parseInt(value) >= currentYear && parseInt(value) <= currentYear + 10)) {
                      updateFormData('graduation_year', value);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Checkbox 
                id="financial_need" 
                checked={formData.financial_need}
                onCheckedChange={(checked) => updateFormData('financial_need', checked)}
              />
              <Label htmlFor="financial_need">I have financial need for scholarship funding</Label>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="income">Family Income Level</Label>
                <Select value={formData.income_level} onValueChange={(value) => updateFormData('income_level', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select income level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Income (Under $30,000)</SelectItem>
                    <SelectItem value="middle">Middle Income ($30,000 - $75,000)</SelectItem>
                    <SelectItem value="upper-middle">Upper Middle ($75,000 - $150,000)</SelectItem>
                    <SelectItem value="high">High Income ($150,000+)</SelectItem>
                    <SelectItem value="na">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="max_fee">Maximum Application Fee You Can Afford</Label>
                <Input 
                  id="max_fee" 
                  placeholder="e.g. $50 or Free only" 
                  className="mt-1"
                  value={formData.max_application_fee}
                  onChange={(e) => updateFormData('max_application_fee', e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="preferred_countries">Preferred Study Countries</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {['USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Netherlands', 'Singapore', 'Japan', 'International'].map((country) => (
                  <div key={country} className="flex items-center space-x-2">
                    <Checkbox 
                      id={country}
                      checked={formData.preferred_countries?.includes(country)}
                      onCheckedChange={() => toggleArrayField('preferred_countries', country)}
                    />
                    <Label htmlFor={country} className="text-sm">{country}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="languages">Languages You Speak</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                {['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Arabic', 'Hindi'].map((language) => (
                  <div key={language} className="flex items-center space-x-2">
                    <Checkbox 
                      id={language}
                      checked={formData.languages?.includes(language)}
                      onCheckedChange={() => toggleArrayField('languages', language)}
                    />
                    <Label htmlFor={language} className="text-sm">{language}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="achievements">Academic Achievements & Awards</Label>
              <Textarea 
                id="achievements" 
                placeholder="List your key academic achievements, honors, and awards"
                className="mt-1"
                rows={4}
                value={formData.achievements}
                onChange={(e) => updateFormData('achievements', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="activities">Extracurricular Activities</Label>
              <Textarea 
                id="activities" 
                placeholder="Clubs, sports, volunteer work, leadership roles, etc."
                className="mt-1"
                rows={4}
                value={formData.activities}
                onChange={(e) => updateFormData('activities', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="work_experience">Work Experience</Label>
              <Textarea 
                id="work_experience" 
                placeholder="Internships, part-time jobs, research positions, etc."
                className="mt-1"
                rows={4}
                value={formData.work_experience}
                onChange={(e) => updateFormData('work_experience', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="community_service">Community Service</Label>
              <Textarea 
                id="community_service" 
                placeholder="Volunteer work, community involvement, social impact projects"
                className="mt-1"
                rows={4}
                value={formData.community_service}
                onChange={(e) => updateFormData('community_service', e.target.value)}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (showMatches && matches.length > 0) {
    return <ScholarshipMatches matches={matches} loading={loading} onApply={() => {}} onSave={() => {}} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={handleBackToHome}
            className="text-primary hover:text-primary/80 mb-4 p-0"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Create Your Profile
              </h1>
              <p className="text-muted-foreground">
                Tell us about yourself to get personalized scholarship recommendations
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handlePopulateDatabase}
                className="text-sm"
              >
                <Database className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Populate Database</span>
                <span className="sm:hidden">Populate</span>
              </Button>
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="text-sm"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Sign Out</span>
                <span className="sm:hidden">Out</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center space-x-3 flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    isCompleted ? 'bg-green-500 border-green-500 text-white' :
                    isActive ? 'bg-primary border-primary text-white' :
                    'bg-muted border-muted-foreground/30 text-muted-foreground'
                  }`}>
                    <StepIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className={`font-medium ${isActive ? 'text-primary' : isCompleted ? 'text-green-600' : 'text-muted-foreground'}`}>
                      {step.title}
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`hidden md:block w-full h-0.5 mt-2 ${isCompleted ? 'bg-green-500' : 'bg-muted'}`} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-card rounded-lg shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-xl font-semibold text-card-foreground mb-6">
            {steps[currentStep - 1]?.title}
          </h2>
          
          {errorMessage && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-destructive text-sm font-medium">{errorMessage}</p>
            </div>
          )}
          
          {renderStepContent()}
          
          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between mt-8 gap-4">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="w-full sm:w-auto"
            >
              Previous
            </Button>
            
            <Button 
              onClick={handleNext}
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Saving...
                </div>
              ) : currentStep === 4 ? (
                <div className="flex items-center">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Find My Scholarships
                </div>
              ) : (
                'Next'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;