import { BalanceSchema, TBalance } from "@/helpers/schemas/schemas";
import prisma from "@/lib/prismalib";
import { serverAuth } from "@/lib/server_session";
import { Expense, Expensecat } from "@prisma/client";

type TUser = {
  email: string;
  name: string;
  image: string;
  userId: string;
};

type PromiseResponse<T> = Promise<
  | {
      success: true;
      message: string;
      data: T;
    }
  | {
      success: false;
      message: string;
    }
>;

export class ExpenseService {
  static async getExpenses(userId: string) {
    const response = await fetch(`/api/v1/expense?userId=${userId}`);
    return response.json();
  }

  static async getExpenseById(id: string) {
    const response = await fetch(`/api/v1/expense/${id}`);
    return response.json();
  }

  static async createExpense(expense: Expense) {
    const response = await fetch(`/api/v1/expense`, {
      method: "POST",
      body: JSON.stringify(expense),
    });
    return response.json();
  }

  static async updateExpense(id: string, expense: Expense) {
    const response = await fetch(`/api/v1/expense/${id}`, {
      method: "PUT",
      body: JSON.stringify(expense),
    });
    return response.json();
  }

  static async deleteExpense(id: string) {
    const response = await fetch(`/api/v1/expense/${id}`, {
      method: "DELETE",
    });
    return response.json();
  }

  static async getExpCat() {
    try {
      const session = (await serverAuth()) as unknown as TUser;

      if (!session) {
        return {
          success: false,
          message: "Unauthorized",
        };
      }

      const response = await prisma.expensecat.findMany({
        where: {
          xuserid: session.userId,
        },
        select: {
          id: true,
          name: true,
        },
      });

      if (!response) {
        return {
          success: false,
          message: "No expense categories found",
        };
      }

      return {
        success: true,
        message: "Expense categories fetched successfully",
        data: response,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error fetching expense categories",
      };
    }
  }

  static async createExpenseCategory(category: Expensecat) {
    const response = await fetch(`/api/v1/expense/category`, {
      method: "POST",
      body: JSON.stringify(category),
    });
    return response.json();
  }

  static async updateExpenseCategory(id: string, category: Expensecat) {
    const response = await fetch(`/api/v1/expense/category/${id}`, {
      method: "PUT",
      body: JSON.stringify(category),
    });
    return response.json();
  }

  static async deleteExpenseCategory(id: string) {
    const response = await fetch(`/api/v1/expense/category/${id}`, {
      method: "DELETE",
    });
    return response.json();
  }

  static async getBalance() {
    try {
      const session = (await serverAuth()) as unknown as TUser;

      if (!session) {
        return {
          success: false,
          message: "Unauthorized",
        };
      }

      const response = await prisma.balance.findMany({
        where: {
          xuserid: session.userId,
        },
        select: {
          id: true,
          xname: true,
          amount: true,
        },
      });

      if (!response) {
        return {
          success: false,
          message: "No balance found",
        };
      }

      return {
        success: true,
        message: "Balance fetched successfully",
        data: response,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error fetching balance",
      };
    }
  }

  static async createBalance(
    balanceInfo: BalanceProps
  ): Promise<BalanceResponse> {
    try {
      const session = (await serverAuth()) as unknown as TUser | null;

      if (!session) return { success: false, message: "Unauthorized" };

      const parsedData = BalanceSchema.safeParse({
        ...balanceInfo,
        xuserid: session.userId,
      });

      if (!parsedData.success)
        return {
          success: false,
          errors: parsedData.error.errors,
          message: "Validation Error",
        };

      const { amount, xtype, xname, xdesc } = parsedData.data;

      const response = await prisma.balance.create({
        data: {
          amount: Number(amount),
          xtype,
          xuserid: session.userId,
          xname,
          xdesc,
        },
      });

      if (!response) return { success: false, message: "balance create Error" };
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: (error as Error).message,
      };
    }
  }

  static async updateBalance(balanceInfo: UpdateBalanceProps) {
    try {
    } catch (error) {}
  }
}

export type BalanceProps = {
  amount: number;
  xtype: string;
  xname: string;
  xdesc?: string;
};

type UpdateBalanceProps = Partial<TBalance | "id">;

export type BalanceResponse =
  | {
      success: true;
    }
  | {
      success: false;
      errors?: any;
      message: string;
    };
