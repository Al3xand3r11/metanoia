import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import crypto from "crypto";
import { Message, NewMessage } from "@/lib/types";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { sanitizeUserInput, sanitizeName } from "@/lib/sanitize";

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

    // Normalize phone number to E.164 format
    // Accept: +15551234567, 15551234567, 5551234567, 555-123-4567, (555) 123-4567, etc.
    const digitsOnly = phoneNumber.trim().replace(/\D/g, '');
    let normalizedPhone: string;
    
    if (digitsOnly.length === 10) {
      // 10-digit US number - add +1
      normalizedPhone = `+1${digitsOnly}`;
    } else if (digitsOnly.length === 11 && digitsOnly.startsWith('1')) {
      // 11-digit with country code - add +
      normalizedPhone = `+${digitsOnly}`;
    } else {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit phone number" },
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

    // Sanitize user input to prevent XSS attacks
    const sanitizedName = sanitizeName(name);
    const sanitizedMessage = sanitizeUserInput(message, 500);

    // Validate sanitized content isn't empty
    if (!sanitizedName) {
      return NextResponse.json(
        { error: "Name contains invalid characters" },
        { status: 400 }
      );
    }

    if (!sanitizedMessage) {
      return NextResponse.json(
        { error: "Message contains invalid content" },
        { status: 400 }
      );
    }

    // Create a hash from the phone number for privacy (matches Twilio webhook format)
    // Hash the full E.164 format including the + sign to ensure consistency
    const phoneHash = crypto
      .createHash("sha256")
      .update(normalizedPhone)
      .digest("hex")
      .slice(0, 16);

    // Store the message in Supabase
    const supabase = createAdminClient();

    const newMessage: NewMessage = {
      phone_hash: phoneHash,
      content: sanitizedMessage, // Use sanitized content
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

