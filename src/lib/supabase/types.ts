export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          title: string
          slug: string
          description: string | null
          short_description: string | null
          category: string | null
          industry: string | null
          technologies: string[] | null
          services: string[] | null
          image_url: string | null
          mobile_image_url: string | null
          live_url: string | null
          case_study_url: string | null
          featured: boolean | null
          year: number | null
          status: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description?: string | null
          short_description?: string | null
          category?: string | null
          industry?: string | null
          technologies?: string[] | null
          services?: string[] | null
          image_url?: string | null
          mobile_image_url?: string | null
          live_url?: string | null
          case_study_url?: string | null
          featured?: boolean | null
          year?: number | null
          status?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string | null
          short_description?: string | null
          category?: string | null
          industry?: string | null
          technologies?: string[] | null
          services?: string[] | null
          image_url?: string | null
          mobile_image_url?: string | null
          live_url?: string | null
          case_study_url?: string | null
          featured?: boolean | null
          year?: number | null
          status?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      services: {
        Row: {
          id: string
          title: string
          slug: string
          description: string | null
          icon: string | null
          features: string[] | null
          display_order: number | null
          is_active: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description?: string | null
          icon?: string | null
          features?: string[] | null
          display_order?: number | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string | null
          icon?: string | null
          features?: string[] | null
          display_order?: number | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      leads: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          company: string | null
          project_type: string | null
          budget: string | null
          timeline: string | null
          description: string | null
          attachment_url: string | null
          status: string | null
          source: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          company?: string | null
          project_type?: string | null
          budget?: string | null
          timeline?: string | null
          description?: string | null
          attachment_url?: string | null
          status?: string | null
          source?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          company?: string | null
          project_type?: string | null
          budget?: string | null
          timeline?: string | null
          description?: string | null
          attachment_url?: string | null
          status?: string | null
          source?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      testimonials: {
        Row: {
          id: string
          client_name: string
          client_role: string | null
          company: string | null
          quote: string
          photo_url: string | null
          project_id: string | null
          is_verified: boolean | null
          is_published: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          client_name: string
          client_role?: string | null
          company?: string | null
          quote: string
          photo_url?: string | null
          project_id?: string | null
          is_verified?: boolean | null
          is_published?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          client_name?: string
          client_role?: string | null
          company?: string | null
          quote?: string
          photo_url?: string | null
          project_id?: string | null
          is_verified?: boolean | null
          is_published?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      faq: {
        Row: {
          id: string
          question: string
          answer: string
          category: string | null
          display_order: number | null
          is_published: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          question: string
          answer: string
          category?: string | null
          display_order?: number | null
          is_published?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          question?: string
          answer?: string
          category?: string | null
          display_order?: number | null
          is_published?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
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
