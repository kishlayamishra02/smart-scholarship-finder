import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  Search, 
  Calendar,
  MoreHorizontal,
  CheckCircle,
  Clock,
  XCircle,
  FileText
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Application {
  id: string;
  scholarship_id: string;
  status: string;
  applied_date: string;
  notes?: string;
  scholarships: {
    name: string;
    provider: string;
    award_amount: string;
    deadline: string;
  };
}

const Applications = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }
      
      const { data, error } = await supabase
        .from('applications')
        .select(`
          *,
          scholarships (
            name,
            provider,
            award_amount,
            deadline
          )
        `)
        .eq('user_id', user.id)
        .order('applied_date', { ascending: false });
      
      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast({
        title: "Error",
        description: "Failed to load applications",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (applicationId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('applications')
        .update({ status: newStatus })
        .eq('id', applicationId);
      
      if (error) throw error;
      
      await fetchApplications();
      toast({
        title: "Success",
        description: "Application status updated",
      });
    } catch (error) {
      console.error('Error updating application status:', error);
      toast({
        title: "Error",
        description: "Failed to update application status",
        variant: "destructive",
      });
    }
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      applied: { label: "Applied", color: "bg-blue-500", icon: Clock },
      under_review: { label: "Under Review", color: "bg-yellow-500", icon: Clock },
      accepted: { label: "Accepted", color: "bg-green-500", icon: CheckCircle },
      rejected: { label: "Rejected", color: "bg-red-500", icon: XCircle },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.applied;
    const IconComponent = config.icon;
    
    return (
      <Badge className={`${config.color} text-white flex items-center gap-1`}>
        <IconComponent className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const statusCounts = {
    applied: applications.filter(app => app.status === "applied").length,
    under_review: applications.filter(app => app.status === "under_review").length,
    accepted: applications.filter(app => app.status === "accepted").length,
    rejected: applications.filter(app => app.status === "rejected").length,
  };

  const filteredApplications = applications.filter(app =>
    app.scholarships.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.scholarships.provider.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={handleBackToDashboard}
            className="text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Application Tracker</h1>
              <p className="text-muted-foreground">Track and manage all your scholarship applications</p>
            </div>
          </div>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Clock className="h-4 w-4 text-white" />
              </div>
              <div className="text-2xl font-bold text-blue-500">{statusCounts.applied}</div>
              <div className="text-sm text-muted-foreground">Applied</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-8 h-8 bg-yellow-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Clock className="h-4 w-4 text-white" />
              </div>
              <div className="text-2xl font-bold text-yellow-500">{statusCounts.under_review}</div>
              <div className="text-sm text-muted-foreground">Under Review</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-8 h-8 bg-green-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
              <div className="text-2xl font-bold text-green-500">{statusCounts.accepted}</div>
              <div className="text-sm text-muted-foreground">Accepted</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-8 h-8 bg-red-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                <XCircle className="h-4 w-4 text-white" />
              </div>
              <div className="text-2xl font-bold text-red-500">{statusCounts.rejected}</div>
              <div className="text-sm text-muted-foreground">Rejected</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Applications List */}
        {filteredApplications.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Applications Yet</h3>
              <p className="text-gray-600 mb-4">
                {applications.length === 0 
                  ? "You haven't applied to any scholarships yet. Start by exploring our scholarship database!"
                  : "No applications match your search criteria."
                }
              </p>
              {applications.length === 0 && (
                <Button onClick={() => navigate('/scholarships')}>
                  Browse Scholarships
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {filteredApplications.map((application) => (
              <Card key={application.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-1">
                        {application.scholarships.name}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {application.scholarships.provider}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-green-600 mb-2">
                        {application.scholarships.award_amount}
                      </div>
                      {getStatusBadge(application.status)}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Due: {new Date(application.scholarships.deadline).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>Applied: {new Date(application.applied_date).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">Update Status:</span>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant={application.status === "accepted" ? "default" : "outline"}
                          onClick={() => updateApplicationStatus(application.id, "accepted")}
                          className={application.status === "accepted" ? "bg-green-500 hover:bg-green-600" : ""}
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Selected
                        </Button>
                        <Button
                          size="sm"
                          variant={application.status === "under_review" ? "default" : "outline"}
                          onClick={() => updateApplicationStatus(application.id, "under_review")}
                          className={application.status === "under_review" ? "bg-yellow-500 hover:bg-yellow-600" : ""}
                        >
                          <Clock className="h-3 w-3 mr-1" />
                          Under Review
                        </Button>
                        <Button
                          size="sm"
                          variant={application.status === "rejected" ? "default" : "outline"}
                          onClick={() => updateApplicationStatus(application.id, "rejected")}
                          className={application.status === "rejected" ? "bg-red-500 hover:bg-red-600" : ""}
                        >
                          <XCircle className="h-3 w-3 mr-1" />
                          Rejected
                        </Button>
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      onClick={() => navigate(`/scholarship/${application.scholarship_id}`)}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;