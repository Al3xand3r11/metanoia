// Message status options
export type MessageStatus = "pending" | "approved" | "hidden";

// Message source - distinguishes between mock data and real user submissions
export type MessageSource = "mock" | "user";

// The shape of a message from the database
export interface Message {
  id: string;
  phone_hash: string;
  content: string;
  status: MessageStatus;
  created_at: string;
  approved_at: string | null;
  source?: MessageSource; // Optional - added client-side to distinguish data origin
}

// For inserting new messages (id and timestamps are auto-generated)
export interface NewMessage {
  phone_hash: string;
  content: string;
  status?: MessageStatus;
}

// For updating messages (typically just status)
export interface MessageUpdate {
  status?: MessageStatus;
  approved_at?: string | null;
}

// Database schema type for Supabase client
export interface Database {
  public: {
    Tables: {
      messages: {
        Row: Message;
        Insert: NewMessage;
        Update: MessageUpdate;
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}