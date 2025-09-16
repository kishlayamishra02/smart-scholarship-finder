import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ExternalLink, Clock, MapPin, DollarSign, Search, Filter, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface Scholarship {
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
}

const Scholarships = () => {
  const navigate = useNavigate();
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [filteredScholarships, setFilteredScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [fieldFilter, setFieldFilter] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchScholarships();
  }, []);

  useEffect(() => {
    filterScholarships();
  }, [scholarships, searchTerm, countryFilter, levelFilter, fieldFilter]);

  const fetchScholarships = async () => {
    try {
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }

      const { data, error } = await supabase
        .from('scholarships')
        .select('*')
        .gte('deadline', new Date().toISOString().split('T')[0]) // Only active scholarships
        .order('deadline', { ascending: true }); // Sort by deadline

      if (error) throw error;

      setScholarships(data || []);
    } catch (error) {
      console.error('Error fetching scholarships:', error);
      toast({
        title: "Error",
        description: "Failed to fetch scholarships. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterScholarships = () => {
    let filtered = scholarships;

    if (searchTerm) {
      filtered = filtered.filter(scholarship =>
        scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scholarship.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scholarship.provider.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (countryFilter) {
      filtered = filtered.filter(scholarship =>
        scholarship.countries.some(country => 
          country.toLowerCase().includes(countryFilter.toLowerCase())
        )
      );
    }

    if (levelFilter) {
      filtered = filtered.filter(scholarship =>
        scholarship.education_level.some(level => 
          level.toLowerCase().includes(levelFilter.toLowerCase())
        )
      );
    }

    if (fieldFilter) {
      filtered = filtered.filter(scholarship =>
        scholarship.field_of_study.some(field => 
          field.toLowerCase().includes(fieldFilter.toLowerCase())
        )
      );
    }

    setFilteredScholarships(filtered);
  };

  const handleApply = (url: string) => {
    if (url && url !== 'NA') {
      window.open(url, '_blank');
    } else {
      toast({
        title: "Application URL Not Available",
        description: "Please visit the provider's website for application details.",
        variant: "destructive",
      });
    }
  };

  const formatDeadline = (deadline: string) => {
    try {
      return new Date(deadline).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return deadline;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back to Dashboard Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/dashboard')}
          className="text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Explore All Scholarships
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover {scholarships.length}+ scholarship opportunities from around the world
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-card rounded-lg p-6 mb-8 shadow-sm border">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search scholarships..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={countryFilter} onValueChange={setCountryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Country/Region" />
              </SelectTrigger>
              <SelectContent className="bg-background border shadow-lg z-50">
                <SelectItem value="international">International</SelectItem>
                <SelectItem value="india">India</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="usa">United States</SelectItem>
                <SelectItem value="canada">Canada</SelectItem>
                <SelectItem value="australia">Australia</SelectItem>
                <SelectItem value="germany">Germany</SelectItem>
                <SelectItem value="china">China</SelectItem>
                <SelectItem value="japan">Japan</SelectItem>
                <SelectItem value="korea">Korea</SelectItem>
              </SelectContent>
            </Select>

            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Education Level" />
              </SelectTrigger>
              <SelectContent className="bg-background border shadow-lg z-50">
                <SelectItem value="undergraduate">Undergraduate</SelectItem>
                <SelectItem value="graduate">Graduate</SelectItem>
                <SelectItem value="phd">PhD</SelectItem>
                <SelectItem value="postdoc">Postdoc</SelectItem>
              </SelectContent>
            </Select>

            <Select value={fieldFilter} onValueChange={setFieldFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Field of Study" />
              </SelectTrigger>
              <SelectContent className="bg-background border shadow-lg z-50">
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="computer science">Computer Science</SelectItem>
                <SelectItem value="medical">Medical/Health</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="arts">Arts & Humanities</SelectItem>
                <SelectItem value="sciences">Sciences</SelectItem>
                <SelectItem value="social">Social Sciences</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-muted-foreground">
            Showing {filteredScholarships.length} of {scholarships.length} scholarships
          </p>
          <Button variant="outline" onClick={() => {
            setSearchTerm('');
            setCountryFilter('');
            setLevelFilter('');
            setFieldFilter('');
          }}>
            <Filter className="h-4 w-4 mr-2" />
            Clear Filters
          </Button>
        </div>

        {/* Scholarships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScholarships.map((scholarship) => (
            <Card key={scholarship.id} className="hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {scholarship.provider_type}
                  </Badge>
                  <Badge variant={
                    new Date(scholarship.deadline) > new Date() ? "default" : "destructive"
                  }>
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDeadline(scholarship.deadline)}
                  </Badge>
                </div>
                <CardTitle className="text-lg leading-tight">
                  {scholarship.name}
                </CardTitle>
                <CardDescription className="text-sm">
                  {scholarship.provider}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-grow">
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                    <span className="font-medium">{scholarship.award_amount}</span>
                  </div>

                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                    <span>{scholarship.countries.slice(0, 2).join(', ')}</span>
                    {scholarship.countries.length > 2 && (
                      <span>+{scholarship.countries.length - 2} more</span>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {scholarship.description}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {scholarship.education_level.slice(0, 2).map((level) => (
                      <Badge key={level} variant="outline" className="text-xs">
                        {level}
                      </Badge>
                    ))}
                    {scholarship.education_level.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{scholarship.education_level.length - 2}
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {scholarship.field_of_study.slice(0, 2).map((field) => (
                      <Badge key={field} variant="secondary" className="text-xs">
                        {field}
                      </Badge>
                    ))}
                    {scholarship.field_of_study.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{scholarship.field_of_study.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-4">
                <Button 
                  onClick={() => handleApply(scholarship.application_url)}
                  className="w-full"
                  disabled={!scholarship.application_url || scholarship.application_url === 'NA'}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Apply Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredScholarships.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No scholarships found matching your criteria</p>
              <p className="text-sm">Try adjusting your filters or search terms</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scholarships;