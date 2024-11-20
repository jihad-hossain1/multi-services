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

import { NextResponse, NextRequest } from "next/server";
import { rateLimit } from "@/utils/rateLimit"; // Import the rate limit function
import { serverAuth } from "./lib/server_session"; // Import your server authentication function

// Define allowed origins
const allowedOrigins = ["http://localhost:3000", "https://onuragi.vercel.app"];

// Helper to set CORS headers
function setCorsHeaders(response: NextResponse, origin: string | null) {
    response.headers.set("Access-Control-Allow-Origin", origin || "*");
    response.headers.set(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS",
    );
    response.headers.set(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization",
    );
    response.headers.set("Access-Control-Max-Age", "86400"); // Cache preflight for 1 day
    return response;
}

export async function middleware(request: NextRequest) {
    try {
        const origin = request.headers.get("Origin");
        const method = request.method;

        // 1. Validate Origin
        if (origin && !allowedOrigins.includes(origin)) {
            return NextResponse.json(
                { error: `Origin ${origin} is not allowed by CORS` },
                { status: 403 },
            );
        }

        // 2. Handle Preflight (OPTIONS) Request
        if (method === "OPTIONS") {
            const response = NextResponse.json(null, { status: 204 }); 
            return setCorsHeaders(response, origin);
        }

        // 3. Check Rate Limiting
        const ip = request.headers.get("x-real-ip") || request.ip;
        if (rateLimit(ip)) {
            return NextResponse.json(
                { error: "Rate limit exceeded" },
                { status: 429 },
            );
        }

        // // 4. Authentication Logic
        const isAuth = await serverAuth(); 
        if (!isAuth && request.nextUrl.pathname.startsWith("/profile")) {
            const loginUrl = new URL("/auth/login", request.url);
            return NextResponse.redirect(loginUrl); 
        }

        // 5. Set CORS Headers for Valid Requests
        let response = NextResponse.next();
        return setCorsHeaders(response, origin);
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message || "An unknown error occurred" },
            { status: 500 },
        );
    }
}


export const config = {
    matcher: ["/api/:path*"],
};


