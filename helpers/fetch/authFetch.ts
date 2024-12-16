"use server";

import { cookies } from "next/headers";


export const authServerFetchAction = async ({
    apiUrl,
    envUrl,
    method = "POST",
    actionData
}: {
    apiUrl: string;
    envUrl: string;
    method: "POST" | "PATCH" | "PUT" | "DELETE";
    actionData: any;
}) => {
    const token = cookies().get("session_token")?.value;

    try {
        const res = await fetch(envUrl + apiUrl, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ ...actionData }),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error in authActionFetch:", error);
    }
};