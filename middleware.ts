import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { serverAuth } from "./lib/server_session";

export async function middleware(request: NextRequest) {
  const isAuth = await serverAuth();
  console.log("🚀 ~ middleware ~ isAuth:", isAuth)
  const loginUrl = new URL("/auth/login", request.url);

  if (isAuth) {
    return NextResponse.next();
  } 
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/profile",
    // "/dashboard/settings/:path*",
  ],
};