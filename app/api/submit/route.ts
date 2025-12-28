import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import crypto from "crypto";
import { Message, NewMessage } from "@/lib/types";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Create a rate limiter that allows 3 submissions per hour
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "1 h"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phoneNumber, message, website, wantsUpdates } = body;

    // Honeypot check - if filled, bot detected
    if (website) {
      console.log("Bot detected via honeypot field");
      // Return success to not reveal detection to bot
      return NextResponse.json(
        { success: true, message: "Your moment has been submitted!" },
        { status: 200 }
      );
    }

    // Get client IP for rate limiting
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                     request.headers.get('x-real-ip') || 
                     'anonymous';

    // Apply rate limiting based on IP
    const { success: rateLimitSuccess } = await ratelimit.limit(clientIp);
    
    if (!rateLimitSuccess) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again in an hour." },
        { status: 429 }
      );
    }

    // Validate required fields
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    if (!phoneNumber || typeof phoneNumber !== "string" || !phoneNumber.trim()) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    // E.164 format validation (e.g., +15551234567)
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    if (!phoneRegex.test(phoneNumber.trim())) {
      return NextResponse.json(
        { error: "Phone number must be in E.164 format (e.g., +15551234567)" },
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

    // Create a hash from the phone number for privacy (matches Twilio webhook format)
    // Hash the full E.164 format including the + sign to ensure consistency
    const phoneHash = crypto
      .createHash("sha256")
      .update(phoneNumber.trim())
      .digest("hex")
      .slice(0, 16);

    // Store the message in Supabase
    const supabase = createAdminClient();

    const newMessage: NewMessage = {
      phone_hash: phoneHash,
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

    console.log("Web submission received and stored:", (data as Message | null)?.id, "| Wants updates:", wantsUpdates || false);

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

