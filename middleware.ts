import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { serverAuth } from "./lib/server_session";
import { authConfig } from "./config/auth.config";

export async function middleware(request: NextRequest) {
    const isAuth: any = await serverAuth();

    const loginUrl = new URL("/auth/login", request.url);

    if (isAuth) {
        if(request.nextUrl.pathname.startsWith("/xdashboard") && isAuth?.role !== authConfig.userRole.admin) {
          return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
        } 
        return NextResponse.next();
    }

    
    return NextResponse.redirect(loginUrl);
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/xdashboard/:path*",
        
    ],
};




// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { authConfig } from "./config/auth.config";
// import { getCookie } from "./lib/auth/cookie";



// interface AuthTokens {
//     accessToken?: string;
//     refreshToken?: string;
// }

// class AuthMiddleware {
//     private static readonly APP_ROUTE_PREFIX = "app";

//     static async handle(request: NextRequest): Promise<NextResponse> {
//         const { pathname } = request.nextUrl;

//         // skip auth middleware for app routes
//         if (pathname.startsWith(this.APP_ROUTE_PREFIX)) {
//             return NextResponse.next();
//         }

//         const tokens = this.extractTokens(request);
//         const isPublicAppPath = this.isPublicPath(pathname);

//         // token refresh attempt
//         if (!tokens.accessToken && tokens.refreshToken) {
//             const refreshResult = await this.attemptTokenRefresh(
//                 tokens.refreshToken,
//             );
//             if (refreshResult) return refreshResult;
//         }

//         // redirect to login page
//         if (!tokens.accessToken && !isPublicAppPath) {
//             return this.redirectToLogin(request);
//         }

//         // Redirect authenticated users from login/public paths
//         if (tokens.accessToken && isPublicAppPath) {
//             return this.redirectToDashboard(request);
//         }

//         return NextResponse.next();
//     }

//     //    * Extract access and refresh tokens from request cookies
//     private static extractTokens(request: NextRequest): AuthTokens {
//         return {
//             accessToken: getCookie(authConfig.jwt.cookieName),
//             refreshToken: getCookie(authConfig.jwt.refreshCookieName),
//         };
//     }

//     // * Check if the current path is a public app path
//     private static isPublicPath(pathname: string): boolean {
//         return authConfig.publicPaths.some((path) => pathname.startsWith(path));
//     }

//     //    * Attempt to refresh access token
//     private static async attemptTokenRefresh(
//         refreshToken: string,
//     ): Promise<NextResponse> {
//         /**
//          * uncomment this if you want to use api key
//          */
//         // const headers = new Headers({
//         //   "Content-Type": "application/json",
//         // });

//         // if (process.env.API_KEY) {
//         //   headers.append("x-api-key", process.env.API_KEY);
//         // }

//         const refreshResponse = await Promise.race([
//             fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`, {
//                 method: "POST",
//                 // headers, // Include headers if needed
//                 body: JSON.stringify({ refreshToken }),
//                 cache: "no-store",
//             }),
//             new Promise<Response>((_, reject) =>
//                 setTimeout(
//                     () => reject(new Error("Token refresh timeout")),
//                     parseInt(process.env.TOKEN_REFRESH_TIMEOUT || "5000"),
//                 ),
//             ),
//         ]);

//         if (!refreshResponse.ok) {
//             throw new Error("Internal server error");
//         }

//         const responseData = await refreshResponse.json();
//         if (!responseData.success) {
//             throw new Error("Token refresh failed");
//         }

//         const response = NextResponse.next();
//         response.cookies.set(
//             authConfig.jwt.cookieName,
//             responseData?.accessToken,
//             authConfig.session,
//         );
//         return response;
//     }

//     // redirect to login
//     private static redirectToLogin(request: NextRequest): NextResponse {
//         const redirectUrl = new URL(
//             authConfig.authRedirects.login,
//             request.url,
//         );
//         redirectUrl.searchParams.set("redirectTo", request.nextUrl.pathname);
//         return NextResponse.redirect(redirectUrl);
//     }

//     // redirect to dashboard
//     private static redirectToDashboard(request: NextRequest): NextResponse {
//         return NextResponse.redirect(
//             new URL(authConfig.authRedirects.dashboard, request.url),
//         );
//     }
// }

// export async function middleware(request: NextRequest) {
//   return AuthMiddleware.handle(request)
// }

// export const config = {
//    matcher: [
//       "/((?!api|_next/static|_next/image|favicon.ico|public).*)" 
//    ],
// };
