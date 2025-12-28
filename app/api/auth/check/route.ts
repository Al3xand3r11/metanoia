import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get("dashboard_session")?.value;
    const storedHash = request.cookies.get("dashboard_session_hash")?.value;

    // No session cookie present
    if (!sessionToken || !storedHash) {
      return NextResponse.json(
        { authenticated: false },
        { status: 200 }
      );
    }

    // Verify the session token matches the stored hash
    const tokenHash = crypto.createHash("sha256").update(sessionToken).digest("hex");
    
    if (tokenHash !== storedHash) {
      return NextResponse.json(
        { authenticated: false },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { authenticated: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Session check error:", error);
    return NextResponse.json(
      { authenticated: false },
      { status: 200 }
    );
  }
}

