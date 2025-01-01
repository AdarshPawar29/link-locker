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
          username: string | null
          full_name: string | null
          avatar_url: string | null
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          updated_at?: string
        }
      }
      lockers: {
        Row: {
          id: string
          name: string
          description: string | null
          is_public: boolean
          owner_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          is_public?: boolean
          owner_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          is_public?: boolean
          owner_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      links: {
        Row: {
          id: string
          title: string
          url: string
          description: string | null
          preview_image: string | null
          locker_id: string
          created_by: string
          created_at: string
          updated_at: string
          last_accessed: string | null
          click_count: number
        }
        Insert: {
          id?: string
          title: string
          url: string
          description?: string | null
          preview_image?: string | null
          locker_id: string
          created_by: string
          created_at?: string
          updated_at?: string
          last_accessed?: string | null
          click_count?: number
        }
        Update: {
          id?: string
          title?: string
          url?: string
          description?: string | null
          preview_image?: string | null
          locker_id?: string
          created_by?: string
          created_at?: string
          updated_at?: string
          last_accessed?: string | null
          click_count?: number
        }
      }
    }
  }
}