import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface UserProfile {
  full_name: string;
  email: string;
  country: string;
  gender: string;
  age: string;
  degree_program: string;
  field_of_study: string;
  education_level: string;
  gpa: string;
  institution: string;
  graduation_year: string;
  financial_need: boolean;
  income_level: string;
  max_application_fee: string;
  preferred_countries: string[];
  languages: string[];
  achievements: string;
  activities: string;
  work_experience: string;
  community_service: string;
}

export interface ScholarshipMatch {
  scholarship_id: string;
  relevance_score: number;
  match_reasons: string[];
  requirements_met: string[];
  potential_concerns: string[];
  scholarship: {
    id: string;
    name: string;
    deadline: string;
    eligibility: string;
    countries: string[];
    award_amount: string;
    application_url: string;
    required_documents: string[];
    education_level: string[];
    field_of_study: string[];
    provider: string;
    description: string;
    application_fee: string;
    academic_score_requirement: string;
    duration: string;
    provider_type: string;
  };
}

export const useScholarships = () => {
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState<ScholarshipMatch[]>([]);
  const { toast } = useToast();

  const populateScholarships = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('populate-scholarships');
      
      if (error) throw error;

      toast({
        title: "Success",
        description: "Scholarship database has been populated successfully!",
      });

      return data;
    } catch (error) {
      console.error('Error populating scholarships:', error);
      toast({
        title: "Error",
        description: "Failed to populate scholarship database",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const findMatches = async (userProfile: UserProfile) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('match-scholarships', {
        body: { userProfile }
      });

      if (error) throw error;

      setMatches(data.matches || []);
      
      toast({
        title: "AI Analysis Complete",
        description: `Found ${data.matches?.length || 0} scholarship matches for your profile!`,
      });

      return data.matches;
    } catch (error) {
      console.error('Error finding scholarship matches:', error);
      toast({
        title: "Error",
        description: "Failed to analyze scholarships. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };


  return {
    loading,
    matches,
    populateScholarships,
    findMatches
  };
};