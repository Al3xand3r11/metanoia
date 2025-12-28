import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// The password is stored server-side only - NEVER use NEXT_PUBLIC_ prefix
const DASHBOARD_PASSWORD = process.env.DASHBOARD_PASSWORD;

// Generate a secure session token
function generateSessionToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    // Validate password exists in env
    if (!DASHBOARD_PASSWORD) {
      console.error("DASHBOARD_PASSWORD environment variable not set");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Validate password
    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    // Use timing-safe comparison to prevent timing attacks
    const passwordBuffer = Buffer.from(password);
    const storedBuffer = Buffer.from(DASHBOARD_PASSWORD);
    
    // Passwords must be same length for timingSafeEqual
    const isValid = 
      passwordBuffer.length === storedBuffer.length &&
      crypto.timingSafeEqual(passwordBuffer, storedBuffer);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    // Generate session token
    const sessionToken = generateSessionToken();
    
    // Create response with success
    const response = NextResponse.json(
      { success: true },
      { status: 200 }
    );

    // Set httpOnly cookie - cannot be accessed by JavaScript
    response.cookies.set("dashboard_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    // Store the session token hash in a cookie for validation
    // In production, you'd want to store this in a database or Redis
    const tokenHash = crypto.createHash("sha256").update(sessionToken).digest("hex");
    response.cookies.set("dashboard_session_hash", tokenHash, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

