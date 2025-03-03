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
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          email: string
          full_name: string
          location: string | null
          majors: string[] | null
          internships: string[] | null
          interviews_passed: string[] | null
          graduation_year: number | null
          linkedin_url: string | null
          personal_website: string | null
          current_company: string | null
          current_role: string | null
          profile_image: string | null
          open_to_coffee_chats: boolean
          open_to_mentorship: boolean
          available_for_referrals: boolean
          additional_notes: string | null
          is_alumni: boolean
          is_admin: boolean
          profile_completed: boolean
          profile_visible: boolean
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          email: string
          full_name: string
          location?: string | null
          majors?: string[] | null
          internships?: string[] | null
          interviews_passed?: string[] | null
          graduation_year?: number | null
          linkedin_url?: string | null
          personal_website?: string | null
          current_company?: string | null
          current_role?: string | null
          profile_image?: string | null
          open_to_coffee_chats?: boolean
          open_to_mentorship?: boolean
          available_for_referrals?: boolean
          additional_notes?: string | null
          is_alumni?: boolean
          is_admin?: boolean
          profile_completed?: boolean
          profile_visible?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          email?: string
          full_name?: string
          location?: string | null
          majors?: string[] | null
          internships?: string[] | null
          interviews_passed?: string[] | null
          graduation_year?: number | null
          linkedin_url?: string | null
          personal_website?: string | null
          current_company?: string | null
          current_role?: string | null
          profile_image?: string | null
          open_to_coffee_chats?: boolean
          open_to_mentorship?: boolean
          available_for_referrals?: boolean
          additional_notes?: string | null
          is_alumni?: boolean
          is_admin?: boolean
          profile_completed?: boolean
          profile_visible?: boolean
        }
      }
      connection_requests: {
        Row: {
          id: string
          created_at: string
          requester_id: string
          alumni_id: string
          status: 'pending' | 'accepted' | 'declined'
          message: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          requester_id: string
          alumni_id: string
          status?: 'pending' | 'accepted' | 'declined'
          message?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          requester_id?: string
          alumni_id?: string
          status?: 'pending' | 'accepted' | 'declined'
          message?: string | null
        }
      }
      events: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string
          date: string
          location: string
          image_url: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description: string
          date: string
          location: string
          image_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string
          date?: string
          location?: string
          image_url?: string | null
        }
      }
      company_processes: {
        Row: {
          id: string
          created_at: string
          company_name: string
          logo_url: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          company_name: string
          logo_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          company_name?: string
          logo_url?: string | null
        }
      }
      interview_positions: {
        Row: {
          id: string
          company_id: string
          title: string
          created_at: string
        }
        Insert: {
          id?: string
          company_id: string
          title: string
          created_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          title?: string
          created_at?: string
        }
      }
      interview_rounds: {
        Row: {
          id: string
          position_id: string
          round_name: string
          description: string
          difficulty: 'Easy' | 'Medium' | 'Hard'
          created_at: string
          created_by: string | null
        }
        Insert: {
          id?: string
          position_id: string
          round_name: string
          description: string
          difficulty?: 'Easy' | 'Medium' | 'Hard'
          created_at?: string
          created_by?: string | null
        }
        Update: {
          id?: string
          position_id?: string
          round_name?: string
          description?: string
          difficulty?: 'Easy' | 'Medium' | 'Hard'
          created_at?: string
          created_by?: string | null
        }
      }
      interview_tips: {
        Row: {
          id: string
          round_id: string
          tip: string
          created_at: string
          created_by: string | null
        }
        Insert: {
          id?: string
          round_id: string
          tip: string
          created_at?: string
          created_by?: string | null
        }
        Update: {
          id?: string
          round_id?: string
          tip?: string
          created_at?: string
          created_by?: string | null
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
  }
}