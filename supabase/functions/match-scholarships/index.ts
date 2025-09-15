import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userProfile } = await req.json();
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch all scholarships
    const { data: scholarships, error: scholarshipsError } = await supabase
      .from('scholarships')
      .select('*');

    if (scholarshipsError) {
      throw new Error(`Database error: ${scholarshipsError.message}`);
    }

    // Use Gemini AI to analyze and match scholarships
    const prompt = `
    You are an AI scholarship matching expert. Based on the user profile and available scholarships, provide a JSON response with matched scholarships ranked by relevance.

    User Profile:
    - Country: ${userProfile.country}
    - Education Level: ${userProfile.education_level}
    - Field of Study: ${userProfile.field_of_study}
    - GPA: ${userProfile.gpa}
    - Financial Need: ${userProfile.financial_need}
    - Preferred Countries: ${userProfile.preferred_countries?.join(', ')}
    - Languages: ${userProfile.languages?.join(', ')}

    Available Scholarships:
    ${JSON.stringify(scholarships, null, 2)}

    Please analyze each scholarship against the user profile and return a JSON object with:
    {
      "matches": [
        {
          "scholarship_id": "uuid",
          "relevance_score": 85,
          "match_reasons": ["reason1", "reason2"],
          "requirements_met": ["req1", "req2"],
          "potential_concerns": ["concern1"]
        }
      ]
    }

    Only include scholarships with relevance_score >= 30. Rank by relevance_score (highest first).
    `;

    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.3,
          topK: 1,
          topP: 1,
          maxOutputTokens: 2048,
        }
      }),
    });

    if (!geminiResponse.ok) {
      throw new Error(`Gemini API error: ${geminiResponse.statusText}`);
    }

    const geminiData = await geminiResponse.json();
    console.log('Gemini response:', geminiData);

    const aiResponse = geminiData.candidates[0].content.parts[0].text;
    
    // Parse the AI response to extract JSON
    let matches;
    try {
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        matches = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No valid JSON found in AI response');
      }
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      // Fallback: simple matching based on education level and country
      matches = {
        matches: scholarships
          .filter(s => 
            s.education_level?.some(level => 
              level.toLowerCase().includes(userProfile.education_level?.toLowerCase() || '')
            ) ||
            s.countries?.some(country => 
              country.toLowerCase().includes(userProfile.country?.toLowerCase() || '')
            )
          )
          .slice(0, 5)
          .map(s => ({
            scholarship_id: s.id,
            relevance_score: 75,
            match_reasons: ['Education level match', 'Country eligibility'],
            requirements_met: ['Basic eligibility'],
            potential_concerns: []
          }))
      };
    }

    // Enrich matches with full scholarship data
    const enrichedMatches = matches.matches.map(match => {
      const scholarship = scholarships.find(s => s.id === match.scholarship_id);
      return {
        ...match,
        scholarship: scholarship
      };
    }).filter(match => match.scholarship); // Remove matches where scholarship wasn't found

    console.log('Final matches:', enrichedMatches);

    return new Response(JSON.stringify({ 
      matches: enrichedMatches,
      total_scholarships_analyzed: scholarships.length 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in match-scholarships function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});