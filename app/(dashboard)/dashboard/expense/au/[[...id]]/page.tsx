import React, { Suspense } from "react";
import AddExpense from "../../_comp/AddExpense";
import { ExpenseService } from "@/services/expense/Expense";

async function ExpenseContent({ id }: { id: { id: string } }) {
  // fetch single expense
  const expense = (await ExpenseService.getExpCat()) as unknown as {
    success: boolean;
    message: string;
    data: { id: string; name: string }[];
  };

  let categories = [] as { id: string; name: string }[];

  if (expense.success) {
    categories = [...expense.data];
  }

  return (
    <div>
      <AddExpense categories={categories} />
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
