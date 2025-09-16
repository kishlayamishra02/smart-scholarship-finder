import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScholarshipMatches } from "@/components/ScholarshipMatches";
import { useScholarships } from "@/hooks/useScholarships";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { 
  BarChart3, 
  Clock, 
  BookOpen, 
  Users, 
  Award, 
  Search, 
  Bell, 
  Settings, 
  ArrowLeft,
  FileText,
  Calendar,
  Bookmark,
  Star,
  TrendingUp,
  Target,
  CheckCircle,
  ExternalLink,
  Home,
  Zap,
  Eye
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { findMatches, loading: matchesLoading } = useScholarships();
  
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [matches, setMatches] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [reminders, setReminders] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [stats, setStats] = useState({
    processing_time: 0,
    scholarships_analyzed: 0,
    high_quality_matches: 0,
    average_match_score: 0
  });

  useEffect(() => {
    fetchUserData();
    fetchApplications();
    fetchDocuments();
    fetchReminders();
  }, []);

  const fetchUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      console.log('Current user:', user.id, user.email);
      setUser(user);
      
      const { data: profile, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      console.log('Profile query result:', { profile, error });
      
      if (profile) {
        setUserProfile(profile);
        console.log('Profile found:', profile);
        
        // Check if we already have matches for this profile
        const savedMatches = localStorage.getItem(`matches_${user.id}`);
        if (savedMatches) {
          console.log('Loading saved matches from localStorage');
          const parsedMatches = JSON.parse(savedMatches);
          setMatches(parsedMatches);
          setStats({
            processing_time: 1624,
            scholarships_analyzed: parsedMatches.length * 10,
            high_quality_matches: parsedMatches.filter((m: any) => m.relevance_score >= 80).length,
            average_match_score: Math.round(parsedMatches.reduce((acc: number, m: any) => acc + m.relevance_score, 0) / parsedMatches.length) || 0
          });
        } else {
          // Find scholarship matches based on profile
          try {
            console.log('Starting scholarship matching process');
            setIsAnalyzing(true);
            setAnalysisStep(0);
            
            // Simulate analysis steps
            setTimeout(() => setAnalysisStep(1), 1000);
            setTimeout(() => setAnalysisStep(2), 2000);
            
            const matchResult = await findMatches(profile);
            console.log('Match result:', matchResult);
            
            if (matchResult && matchResult.length > 0) {
              setMatches(matchResult);
              localStorage.setItem(`matches_${user.id}`, JSON.stringify(matchResult));
              setStats({
                processing_time: 1624,
                scholarships_analyzed: matchResult.length * 10,
                high_quality_matches: matchResult.filter((m: any) => m.relevance_score >= 80).length,
                average_match_score: Math.round(matchResult.reduce((acc: number, m: any) => acc + m.relevance_score, 0) / matchResult.length) || 0
              });
            }
          } catch (error) {
            console.error('Error finding matches:', error);
          } finally {
            setIsAnalyzing(false);
            setAnalysisStep(0);
          }
        }
      } else {
        console.log('No profile found for user');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchApplications = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      const { data } = await supabase
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
        .order('created_at', { ascending: false });
      
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const fetchDocuments = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      const { data } = await supabase
        .from('documents')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      setDocuments(data || []);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const fetchReminders = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      const { data } = await supabase
        .from('reminders')
        .select('*')
        .eq('user_id', user.id)
        .order('due_date', { ascending: true });
      
      setReminders(data || []);
    } catch (error) {
      console.error('Error fetching reminders:', error);
    }
  };

  const handleApplyToScholarship = async (scholarshipId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      // First, check if user has already applied to this scholarship
      const { data: existingApplication, error: checkError } = await supabase
        .from('applications')
        .select('id')
        .eq('user_id', user.id)
        .eq('scholarship_id', scholarshipId)
        .maybeSingle();
      
      if (checkError) {
        console.error('Error checking existing application:', checkError);
        throw checkError;
      }
      
      if (existingApplication) {
        toast({
          title: "Already Applied",
          description: "You have already applied to this scholarship. Check your applications page.",
          variant: "destructive",
        });
        return;
      }
      
      const { error } = await supabase
        .from('applications')
        .insert({
          user_id: user.id,
          scholarship_id: scholarshipId,
          status: 'applied'
        });
      
      if (error) throw error;
      
      await fetchApplications();
      toast({
        title: "Success",
        description: "Application submitted successfully! Redirecting to applications page...",
      });
      
      // Redirect to applications page after a short delay
      setTimeout(() => {
        navigate('/applications');
      }, 1500);
    } catch (error) {
      console.error('Error applying to scholarship:', error);
      toast({
        title: "Error",
        description: "Failed to submit application",
        variant: "destructive",
      });
    }
  };

  const handleSaveScholarship = async (scholarshipId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      const { error } = await supabase
        .from('saved_scholarships')
        .insert({
          user_id: user.id,
          scholarship_id: scholarshipId
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

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Sidebar - Fixed position on desktop */}
      <div className="lg:w-64 w-full bg-white border-r border-gray-200 flex flex-col lg:h-screen lg:fixed lg:top-0 lg:left-0 lg:z-30">
        {/* Mobile menu button would go here if needed */}
        {/* Logo */}
        <div className="p-4 lg:p-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-gray-900">ScholarFinder</span>
          </div>
        </div>

        {/* User Profile */}
        <div className="px-4 lg:px-6 pb-4 lg:pb-6">
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="bg-orange-500 text-white">
                {userProfile?.full_name ? 
                  userProfile.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase() : 
                  user?.email?.[0].toUpperCase() || 'A'
                }
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-gray-900">
                {userProfile?.full_name || user?.email?.split('@')[0] || 'User'}
              </div>
              <div className="text-sm text-gray-500">
                {userProfile?.field_of_study || 'Computer Science'}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3">
          <div className="space-y-1">
            <div className="flex items-center justify-between w-full px-3 py-3 bg-blue-600 text-white rounded-lg">
              <div className="flex items-center space-x-3">
                <Home className="h-4 w-4" />
                <span className="font-medium">Dashboard</span>
              </div>
            </div>
            <Button variant="ghost" className="w-full justify-between text-gray-600 hover:text-gray-900" onClick={() => navigate("/scholarships")}>
              <div className="flex items-center space-x-3">
                <BookOpen className="h-4 w-4" />
                <span>Scholarships</span>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-600 text-xs">{matches.length}</Badge>
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-900" onClick={() => navigate("/applications")}>
              <FileText className="mr-3 h-4 w-4" />
              Applications
            </Button>
            <Button variant="ghost" className="w-full justify-between text-gray-600 hover:text-gray-900" onClick={() => navigate("/documents")}>
              <div className="flex items-center space-x-3">
                <FileText className="h-4 w-4" />
                <span>Documents</span>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-600 text-xs">{documents.length}</Badge>
            </Button>
            <Button variant="ghost" className="w-full justify-between text-gray-600 hover:text-gray-900" onClick={() => navigate("/reminders")}>
              <div className="flex items-center space-x-3">
                <Bell className="h-4 w-4" />
                <span>Reminders</span>
              </div>
              <Badge variant="secondary" className="bg-purple-100 text-purple-600 text-xs">{reminders.filter(r => !r.completed).length}</Badge>
            </Button>
          </div>
        </nav>

        {/* Settings */}
        <div className="p-3 border-t border-gray-200">
          <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-900" onClick={() => navigate("/settings")}>
            <Settings className="mr-3 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Main Content - Add left margin for fixed sidebar on desktop */}
      <div className="flex-1 flex flex-col lg:overflow-hidden lg:ml-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
          <Button 
            variant="ghost" 
            onClick={handleBackToHome}
            className="text-blue-600 hover:text-blue-700 mb-4 p-0"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {userProfile?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'User'}!
            </h1>
            <p className="text-sm lg:text-base text-gray-600">Here are your personalized scholarship recommendations tailored to your profile.</p>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-4 lg:p-6 bg-gray-50 overflow-y-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <BarChart3 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">Scholarships Analyzed</div>
                    <div className="text-2xl font-bold text-gray-900">150+</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <Eye className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">High-Quality Matches</div>
                    <div className="text-2xl font-bold text-gray-900">{stats.high_quality_matches}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-orange-100 rounded-xl">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">Average Match Score</div>
                    <div className="text-2xl font-bold text-gray-900">{stats.average_match_score}%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Scholarship Matches Section */}
          {matches.length > 0 && (
            <div>
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 space-y-4 lg:space-y-0">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Top Recommendations</h2>
                <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
                  <span className="text-sm text-gray-500">Sorted by relevance and match quality</span>
                  <div className="flex items-center space-x-2">
                    <Input 
                      placeholder="Search scholarships..." 
                      className="w-full lg:w-64" 
                    />
                    <Button variant="outline" size="sm">
                      <Search className="h-4 w-4" />
                      <span className="hidden sm:inline ml-1">Search</span>
                    </Button>
                  </div>
                </div>
              </div>
              
              <ScholarshipMatches
                matches={matches}
                loading={matchesLoading}
                onApply={handleApplyToScholarship}
                onSave={handleSaveScholarship}
              />
            </div>
          )}

          {/* Loading state when analyzing */}
          {(isAnalyzing || (!matchesLoading && matches.length === 0 && userProfile)) && (
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Finding Your Perfect Scholarships</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Our AI is analyzing thousands of scholarships to find the best matches for your profile.
                </p>
                <div className="space-y-4 max-w-sm mx-auto">
                  <div className={`flex items-center space-x-3 ${analysisStep >= 0 ? '' : 'opacity-50'}`}>
                    <div className={`w-6 h-6 ${analysisStep >= 0 ? 'bg-purple-600' : 'bg-gray-300'} rounded-full flex items-center justify-center`}>
                      {analysisStep >= 0 && <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>}
                    </div>
                    <span className={`${analysisStep >= 0 ? 'text-purple-600' : 'text-gray-400'} font-medium`}>Analyzing your profile...</span>
                  </div>
                  <div className={`flex items-center space-x-3 ${analysisStep >= 1 ? '' : 'opacity-50'}`}>
                    <div className={`w-6 h-6 ${analysisStep >= 1 ? 'bg-purple-600' : 'bg-gray-300'} rounded-full flex items-center justify-center`}>
                      {analysisStep >= 1 && <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>}
                    </div>
                    <span className={`${analysisStep >= 1 ? 'text-purple-600' : 'text-gray-400'} font-medium`}>AI matching scholarships...</span>
                  </div>
                  <div className={`flex items-center space-x-3 ${analysisStep >= 2 ? '' : 'opacity-50'}`}>
                    <div className={`w-6 h-6 ${analysisStep >= 2 ? 'bg-purple-600' : 'bg-gray-300'} rounded-full flex items-center justify-center`}>
                      {analysisStep >= 2 && <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>}
                    </div>
                    <span className={`${analysisStep >= 2 ? 'text-purple-600' : 'text-gray-400'} font-medium`}>Ranking best matches...</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Empty state when no profile */}
          {!matchesLoading && matches.length === 0 && !userProfile && (
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Complete your profile</h3>
                <p className="text-gray-600 mb-6">
                  Set up your profile to get personalized scholarship recommendations
                </p>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8" onClick={() => navigate('/profile')}>
                  Complete Profile
                </Button>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;