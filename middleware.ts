import { NextRequest, NextResponse } from "next/server";

// Use Web Crypto API for Edge Runtime compatibility
async function sha256(message: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect dashboard route
  if (pathname.startsWith("/dashboard")) {
    const sessionToken = request.cookies.get("dashboard_session")?.value;
    const storedHash = request.cookies.get("dashboard_session_hash")?.value;

    // No valid session - let the page handle showing the login form
    if (!sessionToken || !storedHash) {
      return NextResponse.next();
    }

    // Verify the session token matches the stored hash
    const tokenHash = await sha256(sessionToken);
    
    if (tokenHash !== storedHash) {
      // Invalid session - clear cookies and show login
      const response = NextResponse.next();
      response.cookies.delete("dashboard_session");
      response.cookies.delete("dashboard_session_hash");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
