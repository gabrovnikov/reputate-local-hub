export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      feature_requests: {
        Row: {
          created_at: string
          description: string
          id: string
          priority: string | null
          status: string
          title: string
          updated_at: string
          user_id: string
          votes: number
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          priority?: string | null
          status?: string
          title: string
          updated_at?: string
          user_id: string
          votes?: number
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          priority?: string | null
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
          votes?: number
        }
        Relationships: [
          {
            foreignKeyName: "feature_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      integrations: {
        Row: {
          active: boolean
          api_key: string | null
          configuration: Json | null
          created_at: string
          id: string
          integration_type: string
          last_sync: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          active?: boolean
          api_key?: string | null
          configuration?: Json | null
          created_at?: string
          id?: string
          integration_type: string
          last_sync?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          active?: boolean
          api_key?: string | null
          configuration?: Json | null
          created_at?: string
          id?: string
          integration_type?: string
          last_sync?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "integrations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      plans: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_trial: boolean
          name: string
          price_monthly: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_trial?: boolean
          name: string
          price_monthly: number
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_trial?: boolean
          name?: string
          price_monthly?: number
        }
        Relationships: []
      }
      review_alerts: {
        Row: {
          alert_type: string
          created_at: string
          description: string | null
          id: string
          resolved: boolean
          resolved_at: string | null
          review_id: string | null
          title: string
          triggered_at: string
          user_id: string
        }
        Insert: {
          alert_type: string
          created_at?: string
          description?: string | null
          id?: string
          resolved?: boolean
          resolved_at?: string | null
          review_id?: string | null
          title: string
          triggered_at?: string
          user_id: string
        }
        Update: {
          alert_type?: string
          created_at?: string
          description?: string | null
          id?: string
          resolved?: boolean
          resolved_at?: string | null
          review_id?: string | null
          title?: string
          triggered_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "review_alerts_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "reviews"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "review_alerts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          ai_response: string | null
          comment: string | null
          created_at: string
          customer_name: string | null
          external_review_id: string | null
          id: string
          rating: number
          received_at: string
          responded: boolean
          response_sent_at: string | null
          sentiment: string | null
          source_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_response?: string | null
          comment?: string | null
          created_at?: string
          customer_name?: string | null
          external_review_id?: string | null
          id?: string
          rating: number
          received_at: string
          responded?: boolean
          response_sent_at?: string | null
          sentiment?: string | null
          source_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_response?: string | null
          comment?: string | null
          created_at?: string
          customer_name?: string | null
          external_review_id?: string | null
          id?: string
          rating?: number
          received_at?: string
          responded?: boolean
          response_sent_at?: string | null
          sentiment?: string | null
          source_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      sources: {
        Row: {
          api_key_or_credentials: Json | null
          created_at: string
          id: string
          is_active: boolean
          platform: string
          source_name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          api_key_or_credentials?: Json | null
          created_at?: string
          id?: string
          is_active?: boolean
          platform: string
          source_name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          api_key_or_credentials?: Json | null
          created_at?: string
          id?: string
          is_active?: boolean
          platform?: string
          source_name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sources_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          created_at: string
          end_date: string | null
          id: string
          plan_id: string
          start_date: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          id?: string
          plan_id: string
          start_date?: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          end_date?: string | null
          id?: string
          plan_id?: string
          start_date?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          business_name: string
          created_at: string
          email: string
          full_name: string
          id: string
          is_active: boolean
          password_hash: string
          phone: string | null
          plan_id: string | null
          signup_date: string
          updated_at: string
        }
        Insert: {
          business_name: string
          created_at?: string
          email: string
          full_name: string
          id?: string
          is_active?: boolean
          password_hash: string
          phone?: string | null
          plan_id?: string | null
          signup_date?: string
          updated_at?: string
        }
        Update: {
          business_name?: string
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          is_active?: boolean
          password_hash?: string
          phone?: string | null
          plan_id?: string | null
          signup_date?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
        ]
      }
      weekly_reports: {
        Row: {
          avg_score: number | null
          created_at: string
          id: string
          negative_reviews: number
          neutral_reviews: number
          positive_reviews: number
          report_date: string
          report_sent: boolean
          sent_via_whatsapp: boolean
          total_reviews: number
          user_id: string
        }
        Insert: {
          avg_score?: number | null
          created_at?: string
          id?: string
          negative_reviews?: number
          neutral_reviews?: number
          positive_reviews?: number
          report_date: string
          report_sent?: boolean
          sent_via_whatsapp?: boolean
          total_reviews?: number
          user_id: string
        }
        Update: {
          avg_score?: number | null
          created_at?: string
          id?: string
          negative_reviews?: number
          neutral_reviews?: number
          positive_reviews?: number
          report_date?: string
          report_sent?: boolean
          sent_via_whatsapp?: boolean
          total_reviews?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "weekly_reports_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_logs: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          message_content: string
          message_type: string
          phone: string
          sent_at: string
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_content: string
          message_type: string
          phone: string
          sent_at?: string
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_content?: string
          message_type?: string
          phone?: string
          sent_at?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
