// headerValidation.js

import { NextRequest } from "next/server";

export function validateCustomHeader(request: NextRequest) {
    const customHeader = request.headers.get('Custom-Header');
    const secretKey = process.env.NEXTAUTH_SECRET;
  
    // Check if the header is missing or doesn't match the secret key
    if (!customHeader) {
      return { isValid: false, message: 'Custom header is missing' };
    }
  
    if (customHeader !== secretKey) {
      return { isValid: false, message: 'Unauthorized: Invalid custom header' };
    }
  
    // If the header is valid
    return { isValid: true };
  }
  