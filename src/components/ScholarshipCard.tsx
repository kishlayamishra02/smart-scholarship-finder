import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ExternalLink, Calendar, MapPin, DollarSign, GraduationCap, Building } from "lucide-react";
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
  application_url: string;
}

interface ScholarshipCardProps {
  scholarship: Scholarship;
  showApplyButton?: boolean;
  showSaveButton?: boolean;
  isApplied?: boolean;
  isSaved?: boolean;
  onApply?: (scholarshipId: string) => void;
  onSave?: (scholarshipId: string) => void;
  onRemoveSave?: (scholarshipId: string) => void;
  onViewDetails?: (scholarship: Scholarship) => void;
}

export function ScholarshipCard({
  scholarship,
  showApplyButton = true,
  showSaveButton = true,
  isApplied = false,
  isSaved = false,
  onApply,
  onSave,
  onRemoveSave,
  onViewDetails
}: ScholarshipCardProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    if (!onApply) return;
    setLoading(true);
    try {
      await onApply(scholarship.id);
      toast({
        title: "Application Submitted",
        description: `You have applied to ${scholarship.name}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (isSaved && onRemoveSave) {
      await onRemoveSave(scholarship.id);
    } else if (onSave) {
      await onSave(scholarship.id);
    }
  };

  const formatDeadline = (deadline: string) => {
    return new Date(deadline).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold line-clamp-2">
            {scholarship.name}
          </CardTitle>
          {showSaveButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              className="text-gray-500 hover:text-red-500"
            >
              <Heart className={`h-4 w-4 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Building className="h-4 w-4" />
          {scholarship.provider}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 line-clamp-3">
          {scholarship.description}
        </p>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="h-4 w-4 text-green-600" />
            <span className="font-medium text-green-600">{scholarship.award_amount}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-orange-600" />
            <span>Due: {formatDeadline(scholarship.deadline)}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-blue-600" />
            <span>{scholarship.countries.join(', ')}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <GraduationCap className="h-4 w-4 text-purple-600" />
            <span>{scholarship.education_level.join(', ')}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {scholarship.field_of_study.slice(0, 3).map((field, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {field}
            </Badge>
          ))}
          {scholarship.field_of_study.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{scholarship.field_of_study.length - 3} more
            </Badge>
          )}
        </div>
        
        <div className="flex gap-2 pt-2">
          {showApplyButton && (
            <Button
              onClick={handleApply}
              disabled={loading || isApplied}
              className="flex-1"
              variant={isApplied ? "outline" : "default"}
            >
              {isApplied ? "Applied" : "Apply Now"}
            </Button>
          )}
          
          <Button
            variant="outline"
            onClick={() => onViewDetails?.(scholarship)}
            className="flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}