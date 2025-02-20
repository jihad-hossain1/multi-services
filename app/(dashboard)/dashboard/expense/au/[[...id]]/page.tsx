import React, { Suspense } from "react";
import AddExpense from "../../_comp/AddExpense";
import { ExpenseService } from "@/services/expense/Expense";

type TCat = { id: string; name: string };
type TBalance = { id: string; xname: string; amount: number };

// use generic type
type TResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

async function ExpenseContent({ id }: { id: { id: string } }) {
  // TODO: fetch single expense
  const expense = (await ExpenseService.getExpCat()) as unknown as TResponse<
    TCat[]
  >;

  const balances = (await ExpenseService.getBalance()) as unknown as TResponse<
    TBalance[]
  >;

  let categories = [] as TCat[];
  let isBalance = [] as TBalance[];

  if (expense.success) {
    categories = [...expense.data];
  }

  if (balances?.success) {
    isBalance = [...balances.data];
  }

  return (
    <div>
      <AddExpense categories={categories} balances={isBalance} />
    </div>
  );
}

const AddUpdate = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = await params;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ExpenseContent id={id} />
    </Suspense>
  );
};

export default AddUpdate;
