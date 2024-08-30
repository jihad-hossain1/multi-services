"use server";


import { newSession } from "@/lib/server_session";
import { redirect } from "next/navigation";

export async function userLogin(formData: {
    email: string; password: string;}) {

  const response = await fetch(
    `${process.env.PUBLIC_NEXT_URL}/api/v1/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData}),
    }
  );

  const result = await response.json();

  if (result?.error) {
    return {
      code: 404,
      message: result.message,
      error: result.error,
    };
  }

  const set_session = await newSession(
    result?.result?.id,
    result?.result?.name,
    result?.result?.xemail
  );

  if (set_session) {
    return {
      code: 200,
      success: "Login Successful",
    };
  } else {
    return {
      code: 500,
      errorMessage: result?.message || "Something went wrong",
    };
  }
}
