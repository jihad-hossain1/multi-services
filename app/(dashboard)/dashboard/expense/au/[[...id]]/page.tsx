import React, { Suspense } from "react";
import AddExpense from "../../_comp/AddExpense";
import { ExpenseService } from "@/services/expense/Expense";
import { ExpenseSchemaType } from "@/helpers/schemas/schemas";



const AddUpdate = async ({ params }: { params: Promise<{ id: string[] }> }) => {
  const id = await params;
  let eid = "" as string;
  if (id?.id) {
    eid = id?.id[0];
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ExpenseContent id={eid} />
    </Suspense>
  );
};

type TCat = { id: string; name: string };
export type TBalance = {
  id: string;
  xname: string;
  amount: number;
  xdate: string;
  xtype: string;
  xdesc: string;
};

// use generic type
export type TResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

async function ExpenseContent({ id }: { id: string }) {
  const expense = await ExpenseService.getExpenseById(id);

  const expenseCat = (await ExpenseService.getExpCat()) as unknown as TResponse<
    TCat[]
  >;

  const balances = (await ExpenseService.getBalance()) as unknown as TResponse<
    TBalance[]
  >;

  let categories = [] as TCat[];
  let isBalance = [] as TBalance[];
  let expenseData = {} as ExpenseSchemaType;

  if (expenseCat.success) {
    categories = [...expenseCat.data];
  }

  if (balances?.success) {
    isBalance = [...balances.data];
  }

  if (expense.success) {
    expenseData = expense.data as ExpenseSchemaType;
  }

  return (
    <div>
      <AddExpense
        categories={categories}
        balances={isBalance}
        expenseData={expenseData}
      />
    </div>
  );
}

export default AddUpdate;
