import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, MapPin, DollarSign, GraduationCap, Building, FileText, Globe, Clock, Star } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Scholarship {
  id: string;
  name: string;
  provider: string;
  award_amount: string;
  deadline: string;
  description: string;
  countries: string[];
  education_level: string[];
  field_of_study: string[];
  eligibility: string;
  application_url: string;
  required_documents: string[];
  application_fee: string;
  income_requirement: string;
  gender_requirement: string;
  age_requirement: string;
  academic_score_requirement: string;
  duration: string;
  provider_type: string;
}

export default function ScholarshipDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [scholarship, setScholarship] = useState<Scholarship | null>(null);
  const [loading, setLoading] = useState(true);
  const [aiSummary, setAiSummary] = useState<string>('');

  useEffect(() => {
    if (id) {
      fetchScholarshipDetails(id);
    }
  }, [id]);

  const fetchScholarshipDetails = async (scholarshipId: string) => {
    try {
      const { data, error } = await supabase
        .from('scholarships')
        .select('*')
        .eq('id', scholarshipId)
        .single();

      if (error) throw error;
      
      setScholarship(data);
      generateAISummary(data);
    } catch (error) {
      console.error('Error fetching scholarship details:', error);
      toast({
        title: "Error",
        description: "Failed to load scholarship details",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateAISummary = async (scholarshipData: Scholarship) => {
    // This would typically call an AI service to generate a summary
    // For now, we'll create a structured summary based on the data
    const summary = `
      **Overview**: ${scholarshipData.name} is a ${scholarshipData.award_amount} scholarship offered by ${scholarshipData.provider}. 
      
      **Key Benefits**: 
      - Award Amount: ${scholarshipData.award_amount}
      - Duration: ${scholarshipData.duration}
      - Provider Type: ${scholarshipData.provider_type}
      
      **Eligibility Highlights**:
      - Education Level: ${scholarshipData.education_level.join(', ')}
      - Field of Study: ${scholarshipData.field_of_study.join(', ')}
      - Geographic Eligibility: ${scholarshipData.countries.join(', ')}
      ${scholarshipData.academic_score_requirement !== 'NA' ? `- Academic Requirements: ${scholarshipData.academic_score_requirement}` : ''}
      ${scholarshipData.age_requirement !== 'NA' ? `- Age Requirements: ${scholarshipData.age_requirement}` : ''}
      ${scholarshipData.income_requirement !== 'NA' ? `- Income Requirements: ${scholarshipData.income_requirement}` : ''}
      
      **Application Process**:
      - Required Documents: ${scholarshipData.required_documents.join(', ')}
      - Application Fee: ${scholarshipData.application_fee}
      - Deadline: ${new Date(scholarshipData.deadline).toLocaleDateString()}
      
      **Recommendation**: This scholarship is ideal for students in ${scholarshipData.field_of_study[0]} who meet the eligibility criteria and are looking for ${scholarshipData.award_amount} in funding support.
    `;
    
    setAiSummary(summary);
  };

  const handleApply = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to apply for scholarships",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('applications')
        .insert({
          user_id: user.id,
          scholarship_id: scholarship?.id,
          status: 'applied'
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Application submitted successfully",
      });

      // Redirect to application URL if available
      if (scholarship?.application_url) {
        window.open(scholarship.application_url, '_blank');
      }
    } catch (error) {
      console.error('Error applying to scholarship:', error);
      toast({
        title: "Error",
        description: "Failed to submit application",
        variant: "destructive",
      });
    }
  };

  const handleSave = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to save scholarships",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('saved_scholarships')
        .insert({
          user_id: user.id,
          scholarship_id: scholarship?.id
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Scholarship saved successfully",
      });
    } catch (error) {
      console.error('Error saving scholarship:', error);
      toast({
        title: "Error",
        description: "Failed to save scholarship",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!scholarship) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Scholarship Not Found</h1>
          <Button onClick={() => navigate('/scholarships')}>
            Back to Scholarships
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{scholarship.name}</CardTitle>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Building className="h-4 w-4" />
                      {scholarship.provider}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {scholarship.award_amount}
                    </div>
                    <Badge variant="outline" className="text-red-600 border-red-200">
                      <Clock className="h-3 w-3 mr-1" />
                      Due: {new Date(scholarship.deadline).toLocaleDateString()}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* AI Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  AI-Generated Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  {aiSummary.split('\n').map((line, index) => (
                    <p key={index} className="mb-2 whitespace-pre-wrap">
                      {line.trim()}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {scholarship.description}
                </p>
              </CardContent>
            </Card>

            {/* Eligibility */}
            <Card>
              <CardHeader>
                <CardTitle>Eligibility Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{scholarship.eligibility}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {scholarship.academic_score_requirement !== 'NA' && (
                    <div>
                      <h4 className="font-medium mb-2">Academic Requirements</h4>
                      <p className="text-sm text-gray-600">{scholarship.academic_score_requirement}</p>
                    </div>
                  )}
                  
                  {scholarship.age_requirement !== 'NA' && (
                    <div>
                      <h4 className="font-medium mb-2">Age Requirements</h4>
                      <p className="text-sm text-gray-600">{scholarship.age_requirement}</p>
                    </div>
                  )}
                  
                  {scholarship.income_requirement !== 'NA' && (
                    <div>
                      <h4 className="font-medium mb-2">Income Requirements</h4>
                      <p className="text-sm text-gray-600">{scholarship.income_requirement}</p>
                    </div>
                  )}
                  
                  {scholarship.gender_requirement !== 'NA' && (
                    <div>
                      <h4 className="font-medium mb-2">Gender Requirements</h4>
                      <p className="text-sm text-gray-600">{scholarship.gender_requirement}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Required Documents */}
            <Card>
              <CardHeader>
                <CardTitle>Required Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {scholarship.required_documents.map((doc, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <span className="capitalize">{doc.replace('_', ' ')}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-orange-600" />
                  <div>
                    <div className="font-medium">Deadline</div>
                    <div className="text-sm text-gray-600">
                      {new Date(scholarship.deadline).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <div>
                    <div className="font-medium">Eligible Countries</div>
                    <div className="text-sm text-gray-600">
                      {scholarship.countries.join(', ')}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-4 w-4 text-purple-600" />
                  <div>
                    <div className="font-medium">Education Level</div>
                    <div className="text-sm text-gray-600">
                      {scholarship.education_level.join(', ')}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <div>
                    <div className="font-medium">Application Fee</div>
                    <div className="text-sm text-gray-600">
                      {scholarship.application_fee}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fields of Study */}
            <Card>
              <CardHeader>
                <CardTitle>Fields of Study</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {scholarship.field_of_study.map((field, index) => (
                    <Badge key={index} variant="secondary">
                      {field}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <Button 
                    onClick={handleApply} 
                    className="w-full"
                    size="lg"
                  >
                    Apply Now
                  </Button>
                  <Button 
                    onClick={handleSave}
                    variant="outline" 
                    className="w-full"
                  >
                    Save for Later
                  </Button>
                  {scholarship.application_url && (
                    <Button 
                      onClick={() => window.open(scholarship.application_url, '_blank')}
                      variant="ghost" 
                      className="w-full flex items-center gap-2"
                    >
                      <Globe className="h-4 w-4" />
                      Visit Official Website
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}