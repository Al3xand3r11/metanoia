import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { cookies } from "next/headers";
import crypto from "crypto";

// Helper to verify authentication
async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("dashboard_session")?.value;
  const storedHash = cookieStore.get("dashboard_session_hash")?.value;
  
  if (!sessionToken || !storedHash) {
    return false;
  }
  
  const tokenHash = crypto.createHash("sha256").update(sessionToken).digest("hex");
  return tokenHash === storedHash;
}

// GET - Fetch all messages (protected by auth cookie)
export async function GET() {
  try {
    // Check authentication
    const authenticated = await isAuthenticated();
    
    if (!authenticated) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const supabase = createAdminClient();
    
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching messages:", error);
      return NextResponse.json(
        { error: "Failed to fetch messages" },
        { status: 500 }
      );
    }

    return NextResponse.json({ messages: data || [] });
  } catch (error) {
    console.error("Messages fetch error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// PATCH - Update message status (protected by auth cookie)
export async function PATCH(request: NextRequest) {
  try {
    // Check authentication
    const authenticated = await isAuthenticated();
    
    if (!authenticated) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "Message ID and status are required" },
        { status: 400 }
      );
    }

    if (!["pending", "approved", "hidden"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    
    const updateData: { status: string; approved_at: string | null } = {
      status,
      approved_at: status === "approved" ? new Date().toISOString() : null,
    };

    const { data, error } = await supabase
      .from("messages")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating message:", error);
      return NextResponse.json(
        { error: "Failed to update message" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: data });
  } catch (error) {
    console.error("Message update error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

