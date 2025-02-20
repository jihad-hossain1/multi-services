"use server";

import {
  BalanceProps,
  BalanceResponse,
  ExpenseService,
} from "@/services/expense/Expense";

export const createBalance = async (
  info: BalanceProps
): Promise<BalanceResponse> => {
  try {
    const response = await ExpenseService.createBalance({ ...info });
    if (response.success) {
      return { success: response.success };
    }
    return { ...response };
  } catch (error) {
    return { message: (error as Error).message, success: false };
  }
};
