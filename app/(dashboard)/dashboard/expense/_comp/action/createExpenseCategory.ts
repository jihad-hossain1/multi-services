'use server';

import { authServerFetchAction } from "@/helpers/fetch/authFetch";

export async function createExpenseCategory(formData: any) {
  const result = await authServerFetchAction({
    apiUrl: "/api/v1/expense/category",
    envUrl: process.env.PUBLIC_NEXT_URL! as string,
    method: "POST",
    actionData: { ...formData },
  })
  return result;
  //  try {
  //    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/backend/expense/category`, {
  //        method: 'POST',
  //        headers: {
  //            'Content-Type': 'application/json',
  //        },
  //        body: JSON.stringify({ ...formData }),
  //    });
 
  //    const result = await response.json();
 
  //    return result;
  //  } catch (error) {
  //   console.error('Error creating expense category:', (error as Error).message);
  //  }
}