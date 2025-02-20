import React from "react";
import { Expenses } from "@/features/expense/components/expense/expenseList";
import { TResponse, TBalance } from "./au/[[...id]]/page";
import { ExpenseService } from "@/services/expense/Expense";

const Page = async () => {
  const balances = (await ExpenseService.getBalance()) as unknown as TResponse<
    TBalance[]
  >;

  return (
    <div>
      <Expenses balances={balances.data} />
    </div>
  );
};

export default Page;
