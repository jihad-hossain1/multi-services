"use server";

import { ExpenseService } from "@/services/expense/Expense";

export const updateExpense = async (expense: any) => {
  return ExpenseService.updateExpense(expense.id, expense);
};
