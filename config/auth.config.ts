export const authConfig = {
    publicPaths: [
        '/auth/login',
        '/auth/register',
        '/auth/verify',
    ],
    jwt: {
        cookieName: "accessToken",
        refreshCookieName: "refreshToken",
        secret: process.env.JWT_SECRET || "default_secret", // Secret key for signing and verifying JWTs
        refreshSecret:
          process.env.JWT_REFRESH_TOKEN_SECRET || "default_refresh_secret", // Secret key for signing and verifying JWTs refresh
        expiry: "15m", // Token validity duration (15 minute)
        refreshExpiry: "7d", // Token validity duration (7 days)
        encryption: true, // Enable encryption for additional security
      },
      session: {
        maxAge: 60 * 60 * 24, // 1 day
        httpOnly: true, // Prevent JavaScript access; HTTP only for security
        sameSite: "lax" as const, // Restrict cookies to same-site requests by default
        secure: process.env.NODE_ENV === "production", // Only send cookies over HTTPS in production
        path: "/", // Cookie is accessible site-wide
      },
      authRedirects: {
        login: "/auth/login", // Redirect path for the login page
        dashboard: "/dashboard", // Redirect path after successful login
        forbidden: "/403", // Redirect path for unauthorized access attempts
      },
      userRole: {
        admin: "XADMIN",
        user: "XUSER",
      }
}