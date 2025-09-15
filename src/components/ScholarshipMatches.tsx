import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ExternalLink, Star, CheckCircle, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ScholarshipMatch {
  scholarship_id: string;
  relevance_score: number;
  match_reasons: string[];
  requirements_met: string[];
  potential_concerns: string[];
  scholarship: {
    id: string;
    name: string;
    provider: string;
    description: string;
    award_amount: string;
    deadline: string;
    education_level: string[];
    field_of_study: string[];
    countries: string[];
    application_url?: string;
  };
}

interface ScholarshipMatchesProps {
  matches: ScholarshipMatch[];
  loading: boolean;
  onApply: (scholarshipId: string) => void;
  onSave: (scholarshipId: string) => void;
}

export const ScholarshipMatches = ({ matches, loading, onApply, onSave }: ScholarshipMatchesProps) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-48 bg-muted rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="text-center py-8">
        <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No matches found</h3>
        <p className="text-muted-foreground">Try updating your profile to get better scholarship matches.</p>
      </div>
    );
  }

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    const now = new Date();
    const daysLeft = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    return {
      formatted: date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      daysLeft: daysLeft > 0 ? `${daysLeft} days left` : 'Deadline passed'
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-foreground">
          Your Scholarship Matches <span className="text-muted-foreground">({matches.length} matches found)</span>
        </h2>
      </div>

      <div className="space-y-6">
        {matches.map((match, index) => {
          const deadline = formatDeadline(match.scholarship.deadline);
          const isExcellentMatch = match.relevance_score >= 80;
          const isGoodMatch = match.relevance_score >= 60;
          
          return (
            <Card key={match.scholarship_id} className="border-l-4 border-l-primary hover:shadow-medium transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CardTitle className="text-xl text-foreground">{match.scholarship.name}</CardTitle>
                      <Badge 
                        variant="outline" 
                        className={`${
                          isExcellentMatch 
                            ? 'text-green-success border-green-success bg-green-success/10' 
                            : isGoodMatch 
                            ? 'text-orange-warning border-orange-warning bg-orange-warning/10'
                            : 'text-muted-foreground border-muted-foreground bg-muted/10'
                        }`}
                      >
                        {match.relevance_score}% match
                      </Badge>
                    </div>
                    <CardDescription className="text-muted-foreground mb-2">
                      {match.scholarship.description}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground mb-1">
                      {isExcellentMatch ? 'Excellent Match' : isGoodMatch ? 'Good Match' : 'Possible Match'}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-foreground">Award:</span>
                    <span className="text-sm text-green-success font-semibold">{match.scholarship.award_amount}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm">
                      <span className="text-foreground">Deadline:</span>
                      <span className="text-muted-foreground ml-1">{deadline.formatted}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-foreground">Level:</span>
                    <span className="text-sm text-muted-foreground">
                      {Array.isArray(match.scholarship.education_level) 
                        ? match.scholarship.education_level.join(', ')
                        : match.scholarship.education_level}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-foreground">Provider:</span>
                    <span className="text-sm text-muted-foreground">{match.scholarship.provider}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm font-medium text-foreground mb-2">Why this matches you:</div>
                  <div className="flex flex-wrap gap-2">
                    {match.match_reasons.map((reason, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs bg-blue-primary/10 text-blue-primary">
                        {reason}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm font-medium text-foreground mb-2">Requirements you meet:</div>
                  <div className="space-y-1">
                    {match.requirements_met.map((req, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-success" />
                        <span className="text-muted-foreground">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {match.potential_concerns.length > 0 && (
                  <div className="mb-4">
                    <div className="text-sm font-medium text-foreground mb-2">Potential concerns:</div>
                    <div className="flex flex-wrap gap-2">
                      {match.potential_concerns.map((concern, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs text-orange-warning border-orange-warning">
                          {concern}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <div className="text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    {deadline.daysLeft}
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onSave(match.scholarship_id)}
                    >
                      Save for Later
                    </Button>
                    
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => onApply(match.scholarship_id)}
                      className="bg-primary text-white hover:bg-primary/90"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Applied
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => navigate(`/scholarship/${match.scholarship_id}`)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};