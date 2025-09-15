-- Create scholarships table
CREATE TABLE public.scholarships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  deadline DATE,
  eligibility TEXT,
  countries TEXT[],
  award_amount TEXT,
  application_url TEXT,
  required_documents TEXT[],
  education_level TEXT[],
  field_of_study TEXT[],
  provider TEXT,
  description TEXT,
  application_fee TEXT,
  income_requirement TEXT,
  gender_requirement TEXT,
  age_requirement TEXT,
  academic_score_requirement TEXT,
  duration TEXT,
  provider_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.scholarships ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (scholarships are public data)
CREATE POLICY "Scholarships are viewable by everyone" 
ON public.scholarships 
FOR SELECT 
USING (true);

-- Create user profiles table for storing user preferences
CREATE TABLE public.user_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  password_hash TEXT,
  country TEXT,
  gender TEXT,
  degree_program TEXT,
  field_of_study TEXT,
  education_level TEXT,
  gpa TEXT,
  institution TEXT,
  graduation_year TEXT,
  financial_need BOOLEAN DEFAULT false,
  max_application_fee TEXT,
  preferred_countries TEXT[],
  languages TEXT[],
  achievements TEXT,
  activities TEXT,
  work_experience TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for user profiles
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for user profiles
CREATE POLICY "Users can view their own profile" 
ON public.user_profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile" 
ON public.user_profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.user_profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_scholarships_updated_at
BEFORE UPDATE ON public.scholarships
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at
BEFORE UPDATE ON public.user_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();