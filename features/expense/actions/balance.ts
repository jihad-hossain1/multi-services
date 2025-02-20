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

export const updateBalance = async (
  info: BalanceProps
): Promise<BalanceResponse> => {
  try {
    const response = await ExpenseService.updateBalance({ ...info });

    if (response.success) {
      return { success: response.success };
    }
    return {
      success: response.success,
      message: response.message || "Something went wrong",
    };
  } catch (error) {
    return { message: (error as Error).message, success: false };
  }
};

export const deleteBalance = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await ExpenseService.deleteBalance(id);
    if (response.success) {
      return {
        success: response.success,
        message: response.message || "Something went wrong",
      };
    }
    return {
      success: response.success,
      message: response.message || "Something went wrong",
    };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};
