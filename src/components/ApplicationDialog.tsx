import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar, DollarSign, MapPin, FileText, CheckCircle, X } from "lucide-react";
import { useState } from "react";

interface Scholarship {
  id: string;
  name: string;
  provider: string;
  award_amount: string;
  deadline: string;
  countries: string[];
  education_level: string[];
  application_url: string;
  required_documents: string[];
  description: string;
}

interface ApplicationDialogProps {
  scholarship: Scholarship | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: (scholarshipId: string) => void;
}

export const ApplicationDialog = ({ scholarship, isOpen, onClose, onApply }: ApplicationDialogProps) => {
  const [hasApplied, setHasApplied] = useState(false);

  if (!scholarship) return null;

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return {
      formatted: date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      daysLeft: diffDays
    };
  };

  const deadlineInfo = formatDeadline(scholarship.deadline);

  const handleApplyClick = () => {
    // Open the external application URL
    window.open(scholarship.application_url, '_blank');
    setHasApplied(true);
  };

  const handleConfirmApplication = () => {
    onApply(scholarship.id);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold leading-tight">
            {scholarship.name}
          </DialogTitle>
          <DialogDescription className="text-base">
            by {scholarship.provider}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Quick Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <div>
                  <p className="text-xs text-muted-foreground">Award Amount</p>
                  <p className="font-semibold">{scholarship.award_amount}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-red-600" />
                <div>
                  <p className="text-xs text-muted-foreground">Deadline</p>
                  <p className="font-semibold">{deadlineInfo.formatted}</p>
                  <p className="text-xs text-red-600">
                    {deadlineInfo.daysLeft > 0 ? `${deadlineInfo.daysLeft} days left` : 'Deadline passed'}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <div>
                  <p className="text-xs text-muted-foreground">Countries</p>
                  <div className="flex flex-wrap gap-1">
                    {scholarship.countries.slice(0, 2).map((country) => (
                      <Badge key={country} variant="secondary" className="text-xs">
                        {country}
                      </Badge>
                    ))}
                    {scholarship.countries.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{scholarship.countries.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-600" />
                <div>
                  <p className="text-xs text-muted-foreground">Education Level</p>
                  <div className="flex flex-wrap gap-1">
                    {scholarship.education_level.slice(0, 2).map((level) => (
                      <Badge key={level} variant="outline" className="text-xs">
                        {level}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-semibold mb-2">About This Scholarship</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {scholarship.description}
            </p>
          </div>

          {/* Required Documents */}
          {scholarship.required_documents && scholarship.required_documents.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Required Documents</h4>
              <ul className="space-y-1">
                {scholarship.required_documents.map((doc, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <FileText className="w-3 h-3 text-muted-foreground" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Application Status */}
          {!hasApplied ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <ExternalLink className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-blue-900 mb-1">Ready to Apply?</h4>
                  <p className="text-sm text-blue-700 mb-3">
                    You'll be redirected to the official application page. Make sure you have all required documents ready.
                  </p>
                  <Button onClick={handleApplyClick} className="w-full">
                    Open Application Page
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-green-900 mb-1">Application Page Opened</h4>
                  <p className="text-sm text-green-700 mb-3">
                    Have you completed your application? Let us know so we can track your progress.
                  </p>
                  <div className="flex gap-2">
                    <Button onClick={handleConfirmApplication} size="sm">
                      Yes, I Applied
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setHasApplied(false)}>
                      Not Yet
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Close Button */}
          <div className="flex justify-end pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};