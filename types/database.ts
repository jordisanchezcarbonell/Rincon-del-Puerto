import type {
  AnalyticsEventName,
  BlockType,
  ReservationStatus,
  SeatingPreference
} from "@/types/domain";

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      restaurants: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          phone: string | null;
          address: string | null;
          email: string | null;
          menu_url: string;
          google_maps_url: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          phone?: string | null;
          address?: string | null;
          email?: string | null;
          menu_url: string;
          google_maps_url: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          slug?: string;
          description?: string | null;
          phone?: string | null;
          address?: string | null;
          email?: string | null;
          menu_url?: string;
          google_maps_url?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      restaurant_admins: {
        Row: {
          id: string;
          restaurant_id: string;
          user_id: string;
          role: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          restaurant_id: string;
          user_id: string;
          role?: string;
          created_at?: string;
        };
        Update: {
          role?: string;
        };
        Relationships: [];
      };
      reservations: {
        Row: {
          id: string;
          restaurant_id: string;
          status: ReservationStatus;
          created_at: string;
          updated_at: string;
          cancellation_token: string;
          date: string;
          time: string;
          guests: number;
          name: string;
          phone: string;
          email: string | null;
          notes: string | null;
          allergies: string | null;
          high_chair: boolean;
          seating_preference: SeatingPreference;
          internal_notes: string | null;
          is_group_request: boolean;
          group_details: string | null;
          privacy_accepted_at: string;
          reminder_sent: boolean;
        };
        Insert: {
          id?: string;
          restaurant_id: string;
          status?: ReservationStatus;
          cancellation_token?: string;
          date: string;
          time: string;
          guests: number;
          name: string;
          phone: string;
          email?: string | null;
          notes?: string | null;
          allergies?: string | null;
          high_chair?: boolean;
          seating_preference?: SeatingPreference;
          internal_notes?: string | null;
          is_group_request?: boolean;
          group_details?: string | null;
          privacy_accepted_at?: string;
          reminder_sent?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          status?: ReservationStatus;
          email?: string | null;
          notes?: string | null;
          allergies?: string | null;
          high_chair?: boolean;
          seating_preference?: SeatingPreference;
          internal_notes?: string | null;
          is_group_request?: boolean;
          group_details?: string | null;
          reminder_sent?: boolean;
          updated_at?: string;
        };
        Relationships: [];
      };
      blocked_slots: {
        Row: {
          id: string;
          restaurant_id: string;
          date: string;
          start_time: string | null;
          end_time: string | null;
          reason: string | null;
          block_type: BlockType;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          restaurant_id: string;
          date: string;
          start_time?: string | null;
          end_time?: string | null;
          reason?: string | null;
          block_type: BlockType;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          date?: string;
          start_time?: string | null;
          end_time?: string | null;
          reason?: string | null;
          block_type?: BlockType;
          updated_at?: string;
        };
        Relationships: [];
      };
      analytics_events: {
        Row: {
          id: string;
          restaurant_id: string | null;
          event_name: AnalyticsEventName;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          restaurant_id?: string | null;
          event_name: AnalyticsEventName;
          metadata?: Json;
          created_at?: string;
        };
        Update: Record<string, never>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
