import { cookies } from "next/headers";
import { authConfig } from "@/config/auth.config";

// Set a cookie with options
export const setCookie = (
  key: string,
  value: string,
  options: {
    path?: string;
    maxAge?: number;
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: "lax" | "strict" | "none";
  } = {}
) => {
  cookies().set(key, value, options);
};

// Get a cookie by key
export const getCookie = (key: string) => {
  return cookies().get(key)?.value || null || undefined;
};

// Clear all cookies
export async function clearCookies() {
  try {
    cookies().delete(authConfig.jwt.cookieName);
    cookies().delete(authConfig.jwt.refreshCookieName);
    return true;
  } catch (error) {
    console.error("Failed to clear cookies:", error);
    return false;
  }
}
