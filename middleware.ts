// add boilerplate middleware here
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // add middleware here
  console.log("Middleware running");
  console.log(request.nextUrl.pathname);
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};