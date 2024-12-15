"use server";

import { authServerFetchAction } from "@/helpers/fetch/authFetch";

export async function createExpense(info: any) {
    const result = await authServerFetchAction({
        apiUrl: "/api/v1/expense",
        envUrl: process.env.PUBLIC_NEXT_URL! as string,
        method: "POST",
        actionData: { ...info },
    })
    return result;
    // try {
    //     const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/backend/expense`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({ ...info }),
    //     });

    //     const result = await response.json();

    //     return result;
    // } catch (error) {
    //     console.error("Error creating expense:", error);
    // }
}
