export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      applications: {
        Row: {
          applied_date: string
          created_at: string
          id: string
          notes: string | null
          scholarship_id: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          applied_date?: string
          created_at?: string
          id?: string
          notes?: string | null
          scholarship_id: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          applied_date?: string
          created_at?: string
          id?: string
          notes?: string | null
          scholarship_id?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_scholarship_id_fkey"
            columns: ["scholarship_id"]
            isOneToOne: false
            referencedRelation: "scholarships"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          category: string
          created_at: string
          file_path: string
          file_size: number | null
          file_type: string | null
          id: string
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string
          created_at?: string
          file_path: string
          file_size?: number | null
          file_type?: string | null
          id?: string
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          file_path?: string
          file_size?: number | null
          file_type?: string | null
          id?: string
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      reminders: {
        Row: {
          category: string
          completed: boolean
          created_at: string
          description: string | null
          due_date: string
          id: string
          priority: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string
          completed?: boolean
          created_at?: string
          description?: string | null
          due_date: string
          id?: string
          priority?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          completed?: boolean
          created_at?: string
          description?: string | null
          due_date?: string
          id?: string
          priority?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      saved_scholarships: {
        Row: {
          created_at: string
          id: string
          scholarship_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          scholarship_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          scholarship_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_scholarships_scholarship_id_fkey"
            columns: ["scholarship_id"]
            isOneToOne: false
            referencedRelation: "scholarships"
            referencedColumns: ["id"]
          },
        ]
      }
      scholarships: {
        Row: {
          academic_score_requirement: string | null
          age_requirement: string | null
          application_fee: string | null
          application_url: string | null
          award_amount: string | null
          countries: string[] | null
          created_at: string
          deadline: string | null
          description: string | null
          duration: string | null
          education_level: string[] | null
          eligibility: string | null
          field_of_study: string[] | null
          gender_requirement: string | null
          id: string
          income_requirement: string | null
          name: string
          provider: string | null
          provider_type: string | null
          required_documents: string[] | null
          updated_at: string
        }
        Insert: {
          academic_score_requirement?: string | null
          age_requirement?: string | null
          application_fee?: string | null
          application_url?: string | null
          award_amount?: string | null
          countries?: string[] | null
          created_at?: string
          deadline?: string | null
          description?: string | null
          duration?: string | null
          education_level?: string[] | null
          eligibility?: string | null
          field_of_study?: string[] | null
          gender_requirement?: string | null
          id?: string
          income_requirement?: string | null
          name: string
          provider?: string | null
          provider_type?: string | null
          required_documents?: string[] | null
          updated_at?: string
        }
        Update: {
          academic_score_requirement?: string | null
          age_requirement?: string | null
          application_fee?: string | null
          application_url?: string | null
          award_amount?: string | null
          countries?: string[] | null
          created_at?: string
          deadline?: string | null
          description?: string | null
          duration?: string | null
          education_level?: string[] | null
          eligibility?: string | null
          field_of_study?: string[] | null
          gender_requirement?: string | null
          id?: string
          income_requirement?: string | null
          name?: string
          provider?: string | null
          provider_type?: string | null
          required_documents?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          achievements: string | null
          activities: string | null
          age: string | null
          community_service: string | null
          country: string | null
          created_at: string
          degree_program: string | null
          education_level: string | null
          email: string | null
          field_of_study: string | null
          financial_need: boolean | null
          full_name: string | null
          gender: string | null
          gpa: string | null
          graduation_year: string | null
          id: string
          income_level: string | null
          institution: string | null
          languages: string[] | null
          max_application_fee: string | null
          preferred_countries: string[] | null
          updated_at: string
          user_id: string | null
          work_experience: string | null
        }
        Insert: {
          achievements?: string | null
          activities?: string | null
          age?: string | null
          community_service?: string | null
          country?: string | null
          created_at?: string
          degree_program?: string | null
          education_level?: string | null
          email?: string | null
          field_of_study?: string | null
          financial_need?: boolean | null
          full_name?: string | null
          gender?: string | null
          gpa?: string | null
          graduation_year?: string | null
          id?: string
          income_level?: string | null
          institution?: string | null
          languages?: string[] | null
          max_application_fee?: string | null
          preferred_countries?: string[] | null
          updated_at?: string
          user_id?: string | null
          work_experience?: string | null
        }
        Update: {
          achievements?: string | null
          activities?: string | null
          age?: string | null
          community_service?: string | null
          country?: string | null
          created_at?: string
          degree_program?: string | null
          education_level?: string | null
          email?: string | null
          field_of_study?: string | null
          financial_need?: boolean | null
          full_name?: string | null
          gender?: string | null
          gpa?: string | null
          graduation_year?: string | null
          id?: string
          income_level?: string | null
          institution?: string | null
          languages?: string[] | null
          max_application_fee?: string | null
          preferred_countries?: string[] | null
          updated_at?: string
          user_id?: string | null
          work_experience?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
