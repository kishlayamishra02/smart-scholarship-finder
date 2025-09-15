import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Loading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50/30 to-blue-50/30 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-6 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Landing on Your Best Results
          </h1>
          <p className="text-muted-foreground mb-8">
            Preparing your personalized scholarship dashboard with all your 
            perfect matches.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-soft">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            </div>
            <span className="text-foreground font-medium">Analyzing your profile...</span>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-white/50 rounded-lg">
            <div className="w-6 h-6 bg-muted rounded-full"></div>
            <span className="text-muted-foreground">AI matching scholarships...</span>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-white/50 rounded-lg">
            <div className="w-6 h-6 bg-muted rounded-full"></div>
            <span className="text-muted-foreground">Ranking best matches...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;