import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Search, 
  Upload,
  FileText,
  Download,
  Eye,
  Trash2,
  File,
  Image,
  Plus
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Document {
  id: string;
  name: string;
  file_path: string;
  file_size: number;
  file_type: string;
  category: string;
  created_at: string;
}

const Documents = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }
      
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast({
        title: "Error",
        description: "Failed to load documents",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteDocument = async (documentId: string) => {
    try {
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', documentId);
      
      if (error) throw error;
      
      await fetchDocuments();
      toast({
        title: "Success",
        description: "Document deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting document:', error);
      toast({
        title: "Error",
        description: "Failed to delete document",
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // For now, we'll just store the document metadata
      // In a real implementation, you'd upload to Supabase Storage
      const { error } = await supabase
        .from('documents')
        .insert({
          user_id: user.id,
          name: file.name,
          file_path: `documents/${user.id}/${file.name}`,
          file_size: file.size,
          file_type: file.type,
          category: getFileCategory(file.name)
        });

      if (error) throw error;

      await fetchDocuments();
      toast({
        title: "Success",
        description: "Document uploaded successfully",
      });
    } catch (error) {
      console.error('Error uploading document:', error);
      toast({
        title: "Error",
        description: "Failed to upload document",
        variant: "destructive",
      });
    }
  };

  const getFileCategory = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (extension === 'pdf' && fileName.toLowerCase().includes('resume')) return 'resume';
    if (extension === 'pdf' && fileName.toLowerCase().includes('transcript')) return 'transcript';
    if (extension === 'pdf' && fileName.toLowerCase().includes('recommendation')) return 'recommendation';
    if (extension === 'pdf' || extension === 'doc' || extension === 'docx') return 'essay';
    return 'other';
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return <Image className="h-5 w-5" />;
    return <File className="h-5 w-5" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getCategoryBadgeColor = (category: string) => {
    const colors = {
      resume: 'bg-blue-100 text-blue-800',
      transcript: 'bg-green-100 text-green-800',
      recommendation: 'bg-yellow-100 text-yellow-800',
      essay: 'bg-purple-100 text-purple-800',
      other: 'bg-gray-100 text-gray-800'
    };
    return colors[category as keyof typeof colors] || colors.other;
  };

  const categories = [
    { id: 'all', name: 'All Documents', count: documents.length },
    { id: 'resume', name: 'Resumes & CVs', count: documents.filter(d => d.category === 'resume').length },
    { id: 'transcript', name: 'Transcripts', count: documents.filter(d => d.category === 'transcript').length },
    { id: 'recommendation', name: 'Recommendation Letters', count: documents.filter(d => d.category === 'recommendation').length },
    { id: 'essay', name: 'Essays & Statements', count: documents.filter(d => d.category === 'essay').length },
    { id: 'other', name: 'Other Documents', count: documents.filter(d => d.category === 'other').length },
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-border p-6">
          <Button 
            variant="ghost" 
            onClick={handleBackToDashboard}
            className="text-muted-foreground hover:text-foreground mb-6 w-full justify-start"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>

          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm font-medium">{category.name}</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {category.count}
                </Badge>
              </button>
            ))}
          </div>

          {/* Document Tips */}
          <Card className="mt-8 bg-purple-50 border-purple-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2 text-purple-700">
                <FileText className="h-4 w-4" />
                Document Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-xs text-purple-600 space-y-2">
              <p>• Keep file names descriptive and consistent</p>
              <p>• Save documents in PDF format when possible</p>
              <p>• Add tags to make documents easier to find</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Document Manager</h1>
            <p className="text-muted-foreground">Upload and organize your scholarship application documents</p>
          </div>

          {/* Search and Upload */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative">
              <input
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              <Button asChild>
                <label htmlFor="file-upload" className="cursor-pointer flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Upload Document
                </label>
              </Button>
            </div>
          </div>

          {/* Upload Area */}
          <Card className="mb-6 border-dashed border-2 border-gray-300 hover:border-primary transition-colors">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Drag & drop your files here</h3>
              <p className="text-gray-600 mb-4">or</p>
              <div className="relative">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload-area"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <Button asChild variant="outline">
                  <label htmlFor="file-upload-area" className="cursor-pointer">
                    Browse Files
                  </label>
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Supported formats: PDF, DOCX, JPG, PNG (Max size: 10MB)
              </p>
            </CardContent>
          </Card>

          {/* Documents Grid */}
          {filteredDocuments.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Documents Yet</h3>
                <p className="text-gray-600 mb-4">
                  {documents.length === 0 
                    ? "Upload your first document to get started organizing your scholarship materials."
                    : "No documents match your search criteria."
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocuments.map((doc) => (
                <Card key={doc.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        {getFileIcon(doc.file_type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground truncate" title={doc.name}>
                          {doc.name}
                        </h3>
                        <Badge className={`text-xs mt-1 ${getCategoryBadgeColor(doc.category)}`}>
                          {doc.category.charAt(0).toUpperCase() + doc.category.slice(1)}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                      <div>{formatFileSize(doc.file_size)}</div>
                      <div>Modified: {new Date(doc.created_at).toLocaleDateString()}</div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => deleteDocument(doc.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Documents;