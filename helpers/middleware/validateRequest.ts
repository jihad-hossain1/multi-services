// helpers/validateRequest.js
import { errorMessage } from "@/config";
import { serverAuth } from "@/lib/server_session";

/**
 * Validates the request for authentication and businessId check.
 * @param {string} userId - The userId to validate against.
 * @returns {Promise<{ isValid: boolean, message: string }>} - Validation result and message.
 */

export async function validateRequest(
    userId: string | undefined | null,
): Promise<{
    isValid: boolean;
    message: string;
}> {
    try {
        // Perform auth check
        const serverA = (await serverAuth()) as {
            userId: string  | undefined | null;
        } | null;
        if (!serverA) {
            return { isValid: false, message: errorMessage.notauthorized };
        }

        // Check userId
        if (serverA?.userId == userId) {
            return { isValid: true, message: "Authorized" };
        }

        return { isValid: false, message: errorMessage.unauthorized };
    } catch (error) {
        console.error("Error during request validation", error);
        return { isValid: false, message: "wrong" };
    }
}

import { token_decrypt } from "@/lib/server_session";
import { NextRequest } from "next/server";

/**
 *
 * @param req request object as nextrequest from next/server
 * @param userId for authorization
 * @returns
 */

export const validateActionRequest = async ({
    req,
    userId,
}: {
    req: NextRequest | null;
    userId:  string | null | undefined;
}): Promise<{ isValid: boolean; message: string }> => {
    
    const authHeader =
        req?.headers.get("Authorization") || (null as string | null);

    const token = authHeader?.split(" ")[1];

    try {
        if (!token || !userId) {
            return { isValid: false, message: "credentials wrong" };
        }

        const decrypt = await token_decrypt(token);

        if (!decrypt) {
            return { isValid: false, message: errorMessage.notauthorized };
        }

        if (decrypt?.userId !== userId) {
            return { isValid: false, message: errorMessage.unauthorized };
        }

        return { isValid: true, message: "Authorized" };
    } catch (error) {
        console.error("Error during request validation", error);
        return { isValid: false, message: "wrong" };
    }
};
