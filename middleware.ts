// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { serverAuth } from "./lib/server_session";

// export async function middleware(request: NextRequest) {
//   const isAuth = await serverAuth();

//   const loginUrl = new URL("/auth/login", request.url);

//   if (isAuth) {
//     return NextResponse.next();
//   } 
//   return NextResponse.redirect(loginUrl);
// }

// export const config = {
//   matcher: [
//     "/profile",
//     // "/dashboard/settings/:path*",
//   ],
// };


import { NextResponse , NextRequest} from 'next/server';
import { rateLimit } from '@/utils/rateLimit';  // Import the rate limit function
import { validateCustomHeader } from '@/utils/headerValidation';  // Import header validation function

export function middleware(request: NextRequest) {
  try {
    const ip = request.headers.get('x-real-ip') || request.ip;

    // Check if the rate limit has been exceeded for the given IP
    if (rateLimit(ip)) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }

    // Check for the custom header using the validate function
    const headerValidation = validateCustomHeader(request);
    if (!headerValidation.isValid) {
      return NextResponse.json({ error: headerValidation.message }, { status: 401 });
    }

    // Allow the request to proceed if all checks pass
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}

export const config = {
  matcher: ['/api/:path*'],
};