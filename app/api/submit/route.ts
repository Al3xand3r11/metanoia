import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import crypto from "crypto";
import { Message, NewMessage } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, message } = body;

    // Validate required fields
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Validate message length
    if (message.length > 500) {
      return NextResponse.json(
        { error: "Message must be 500 characters or less" },
        { status: 400 }
      );
    }

    // Create a hash from the name for privacy (consistent with phone_hash approach)
    // This allows grouping submissions by the same name
    const nameHash = crypto
      .createHash("sha256")
      .update(name.trim().toLowerCase())
      .digest("hex")
      .slice(0, 16);

    // Store the message in Supabase
    const supabase = createAdminClient();

    const newMessage: NewMessage = {
      phone_hash: nameHash, // Using name hash in place of phone hash
      content: message.trim(),
      status: "pending",
    };

    const { data, error } = await supabase
      .from("messages")
      .insert(newMessage as never)
      .select()
      .single();

    if (error) {
      console.error("Failed to insert message:", error);
      return NextResponse.json(
        { error: "Failed to save your moment. Please try again." },
        { status: 500 }
      );
    }

    console.log("Web submission received and stored:", (data as Message | null)?.id);

    return NextResponse.json(
      { success: true, message: "Your moment has been submitted!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Submit error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

