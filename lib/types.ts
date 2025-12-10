// Message status options
export type MessageStatus = "pending" | "approved" | "hidden";

// The shape of a message from the database
export interface Message {
  id: string;
  phone_hash: string;
  content: string;
  status: MessageStatus;
  created_at: string;
  approved_at: string | null;
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
      };
    };
  };
}