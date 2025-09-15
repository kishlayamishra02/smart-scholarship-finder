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
    gpa_value: '',
    gpa_scale: '4',
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

  const [errorMessage, setErrorMessage] = useState("");

  const steps = [
    { id: 1, title: "Personal Info", icon: User, completed: false },
    { id: 2, title: "Academic Details", icon: GraduationCap, completed: false },
    { id: 3, title: "Financial & Preferences", icon: Settings, completed: false },
    { id: 4, title: "Experience & Activities", icon: Plus, completed: false },
  ];

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (!session?.user) navigate("/auth");
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session?.user) navigate("/auth");
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

        const { error } = await supabase
          .from('user_profiles')
          .upsert({
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
    switch (currentStep) {
     case 1: {
        const missing = [];
        if (!formData.full_name?.trim()) missing.push("Full Name");
        if (!formData.email?.trim()) missing.push("Email");
        if (!formData.country?.trim()) missing.push("Country");
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
        if (!formData.gpa_value?.trim()) missing.push("GPA");
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
            <div className="grid grid-cols-2 gap-4">
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
                    <SelectItem value_="Germany">Germany</SelectItem>
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
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
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
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="gpa_value">GPA *</Label>
                        <Input
                            id="gpa_value"
                            type="number"
                            step="0.01"
                            placeholder="e.g. 3.7/ 9.2"
                            className="mt-1"
                            value={formData.gpa_value}
                            onChange={(e) => {
                                const value = e.target.value;
                                const scale = formData.gpa_scale || 4;
                                if (parseFloat(value) > scale) {
                                    updateFormData('gpa_value', scale.toString());
                                } else {
                                    updateFormData('gpa_value', value);
                                }
                            }}
                            max={formData.gpa_scale || 4}
                            min="0"
                        />
                    </div>
                    <div>
                        <Label htmlFor="gpa_scale">GPA Scale *</Label>
                        <Select value={formData.gpa_scale} onValueChange={(value) => updateFormData('gpa_scale', value)}>
                            <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select scale" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="4">Out of 4.0</SelectItem>
                                <SelectItem value="10">Out of 10.0</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="institution">Institution *</Label>
                <Input 
                  id="institution" 
                  placeholder="Your university/college name" 
                  className="mt-1"
                  value={formData.institution}
                  onChange={(e) => updateFormData('institution', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="graduation">Expected Graduation Year *</Label>
                <Input 
                  id="graduation" 
                  placeholder="2025" 
                  className="mt-1"
                  value={formData.graduation_year}
                  onChange={(e) => updateFormData('graduation_year', e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="age">Age</Label>
              <Input 
                id="age" 
                placeholder="Your age" 
                className="mt-1"
                value={formData.age}
                onChange={(e) => updateFormData('age', e.target.value)}
              />
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
            
            <div className="grid grid-cols-2 gap-4">
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
              <div className="grid grid-cols-3 gap-3 mt-2">
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
              <div className="grid grid-cols-4 gap-3 mt-2">
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
              <Label htmlFor="activities">Extracurricular Activities & Leadership</Label>
              <Textarea 
                id="activities" 
                placeholder="List your extracurricular activities, leadership roles, and organizations"
                className="mt-1"
                rows={4}
                value={formData.activities}
                onChange={(e) => updateFormData('activities', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="experience">Work Experience</Label>
              <Textarea 
                id="experience" 
                placeholder="Brief description of any relevant work experience or internships"
                className="mt-1"
                rows={4}
                value={formData.work_experience}
                onChange={(e) => updateFormData('work_experience', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="community_service">Community Service & Volunteering</Label>
              <Textarea 
                id="community_service" 
                placeholder="Describe your community service and volunteer experiences"
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

  // Show matches if they exist
   if (showMatches) {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b border-border bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <Button variant="ghost" onClick={() => setShowMatches(false)} className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Profile
            </Button>
            <Button variant="outline" onClick={handlePopulateDatabase} disabled={loading} className="flex items-center gap-2">
              <Database className="h-4 w-4" /> {loading ? 'Populating...' : 'Populate Database'}
            </Button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ScholarshipMatches matches={matches} loading={loading} onApply={() => {}} onSave={() => {}} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Button variant="ghost" onClick={handleBackToHome} className="text-muted-foreground hover:text-foreground">
            <Home className="mr-2 h-4 w-4" /> Back to Home
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Create Your Profile</h1>
          <Button variant="ghost" onClick={handleLogout} className="text-muted-foreground hover:text-foreground">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-soft border border-border p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Create Your Profile</h1>
            <p className="text-muted-foreground">Help us find the perfect scholarships for you</p>
          </div>

          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center space-x-3 ${index < steps.length - 1 ? 'flex-1' : ''}`}>
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                        isCompleted ? "bg-green-success text-white" :
                        isActive ? "bg-primary text-white" :
                        "bg-muted text-muted-foreground"
                      }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className={`font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && <div className="flex-1 h-px bg-border mx-4"></div>}
                </div>
              );
            })}
          </div>

          <div className="mb-8">
            {renderStepContent()}
          </div>

          {/* NEW: Show inline error message */}
          {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}

          <div className="flex justify-between">
            <Button variant="ghost" onClick={handlePrevious} disabled={currentStep === 1} className="text-muted-foreground">
              Previous
            </Button>
            <Button variant="hero" onClick={handleNext} disabled={isLoading || loading} className="flex items-center gap-2">
              {currentStep === 4 ? (
                <>
                  <Sparkles className="h-4 w-4" />
                  {isLoading || loading ? "Finding Matches..." : "Find My Scholarships"}
                </>
              ) : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;