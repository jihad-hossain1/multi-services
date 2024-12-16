import "server-only";

import { getCookie, setCookie, clearCookies } from "./cookie";
import { SignJWT, jwtVerify } from "jose";
import { authConfig } from "../../config/auth.config";
import prisma from '../../lib/prismalib'

interface JwtPayload {
  id: string | number;
  name: string;
  email: string;
  user_type?: string;
  iat?: number;
  exp?: number;
  jti?: string;
  [key: string]: unknown;
}

const secret = new TextEncoder().encode(authConfig.jwt.secret);
const refreshTokenSecret = new TextEncoder().encode(
  authConfig.jwt.refreshSecret
);
const currentTime = Math.floor(Date.now() / 1000);

export async function createAccessToken(payload: JwtPayload) {
  const jti = crypto.randomUUID();

  return await new SignJWT({ ...payload, jti })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(currentTime)
    .setExpirationTime(authConfig.jwt.expiry)
    .setNotBefore(currentTime)
    .sign(secret);
}

export async function createRefreshToken(payload: JwtPayload) {
  const jti = crypto.randomUUID();

  return await new SignJWT({ _id: payload.id, jti })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(currentTime)
    .setExpirationTime(authConfig.jwt.refreshExpiry)
    .sign(refreshTokenSecret);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });
    return payload as JwtPayload;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Token verification failed: ${error.message}`);
    }
    return null;
  }
}

export async function verifyRefreshToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, refreshTokenSecret, {
      algorithms: ["HS256"],
    });
    return payload as JwtPayload;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Refresh token verification failed: ${error.message}`);
    }
    return null;
  }
}

export async function refreshToken() {
  try {
    const refreshToken = getCookie(authConfig.jwt.refreshCookieName);
    if (!refreshToken) return null;

    const payload = await verifyRefreshToken(refreshToken);
    if (!payload) {
      await clearCookies();
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.id as string },
      select: {
        id: true,
        name: true,
        email: true,
        // user_type: true,
      },
    });

    if (!user) {
      await clearCookies();
      return null;
    }

    const newAccessToken = await createAccessToken(user);
    setCookie(authConfig.jwt.cookieName, newAccessToken, authConfig.session);

    return payload;
  } catch (error) {
    console.error("Failed to refresh session:", error);
    await clearCookies();
    return null;
  }
}
