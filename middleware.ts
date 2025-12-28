import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect dashboard route
  if (pathname.startsWith("/dashboard")) {
    const sessionToken = request.cookies.get("dashboard_session")?.value;
    const storedHash = request.cookies.get("dashboard_session_hash")?.value;

    // No valid session - redirect to login
    if (!sessionToken || !storedHash) {
      // Return the dashboard page which will show the login form
      // We don't redirect to /login since the dashboard has its own password gate
      return NextResponse.next();
    }

    // Verify the session token matches the stored hash
    const tokenHash = crypto.createHash("sha256").update(sessionToken).digest("hex");
    
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
