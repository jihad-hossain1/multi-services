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
    
}
