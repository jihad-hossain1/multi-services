// headerValidation.js


import { NextRequest } from "next/server";
import { secret_decrypt } from "./encrypt";


export function validateCustomHeader(request: NextRequest) {
    const customHeader = request.headers.get("Custom-Header");
    const key = process.env.NEXT_PUBLIC_NEXT_SECRET as string;
    const iv = process.env.NEXT_API_ENCRYPT_IV as string;
    const secretKey = process.env.NEXT_SECRET_KEY as string;

    const decrypted = secret_decrypt(iv, key);

    // Check if the header is missing or doesn't match the secret key
    if (!customHeader) {
        return { isValid: false, message: "Custom header is missing" };
    }

    if (decrypted !== secretKey) {
        return {
            isValid: false,
            message: "Unauthorized: Invalid custom header",
        };
    }

    // If the header is valid
    return { isValid: true };
}
