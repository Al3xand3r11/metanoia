import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import crypto from "crypto";
import { NewMessage } from "@/lib/types";

// Twilio sends form-urlencoded data
export async function POST(request: NextRequest) {
  try {
    // Parse the incoming form data from Twilio
    const formData = await request.formData();
    const body = formData.get("Body") as string | null;
    const from = formData.get("From") as string | null;

    // Validate required fields
    if (!body || !from) {
      console.error("Missing Body or From in Twilio request");
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Optional: Validate the request is actually from Twilio
    // Uncomment this in production after setting TWILIO_AUTH_TOKEN
    // const isValid = await validateTwilioRequest(request, formData);
    // if (!isValid) {
    //   console.error("Invalid Twilio signature");
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    // Hash the phone number for privacy (never store raw phone numbers)
    const phoneHash = hashPhoneNumber(from);

    // Store the message in Supabase
    const supabase = createAdminClient();

    const newMessage: NewMessage = {
        phone_hash: phoneHash,
        content: body.trim(),
        status: "pending",
      };  

    const { data, error } = await supabase
      .from("messages")
      .insert(newMessage as any)
      .select()
      .single();

    if (error) {
      console.error("Failed to insert message:", error);
      return new NextResponse("Database error", { status: 500 });
    }

    // Defensive: check that data is not null and is an object
    if (!data || typeof data !== "object" || !("id" in data)) {
      console.error("Unexpected database response:", data);
      return new NextResponse("Database error", { status: 500 });
    }

    console.log("Message received and stored:", (data as { id?: unknown }).id);

    // Return TwiML response (optional: send confirmation SMS back)
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>Thanks for your message! It's being reviewed.</Message>
</Response>`;

    return new NextResponse(twiml, {
      status: 200,
      headers: {
        "Content-Type": "text/xml",
      },
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

// Hash phone number using SHA-256 for privacy
function hashPhoneNumber(phone: string): string {
  return crypto.createHash("sha256").update(phone).digest("hex").slice(0, 16);
}

// Validate that the request is actually from Twilio
// Uses Twilio's signature validation
async function validateTwilioRequest(
  request: NextRequest,
  formData: FormData
): Promise<boolean> {
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  if (!authToken) {
    console.warn("TWILIO_AUTH_TOKEN not set, skipping validation");
    return true; // Skip validation in development
  }

  const signature = request.headers.get("x-twilio-signature");
  if (!signature) {
    return false;
  }

  // Build the full URL Twilio used
  const url = request.url;

  // Convert FormData to sorted params string
  const params: Record<string, string> = {};
  formData.forEach((value, key) => {
    params[key] = value as string;
  });

  // Sort params and build the string
  const sortedKeys = Object.keys(params).sort();
  let paramString = url;
  for (const key of sortedKeys) {
    paramString += key + params[key];
  }

  // Calculate expected signature
  const expectedSignature = crypto
    .createHmac("sha1", authToken)
    .update(paramString)
    .digest("base64");

  return signature === expectedSignature;
}