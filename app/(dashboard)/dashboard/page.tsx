import React from "react";
import ExpenseReports from "./_comp/expenseReports";

const Page = async () => {
  return (
    <div className="w-11/12 mx-auto flex flex-col gap-4">
      <div className='flex flex-col gap-4 '>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-lg">Welcome to your dashboard</p>
      </div>
      <div>
        {/* expense reports  */}
        <ExpenseReports />
      </div>
    </div>
  );
};

export default Page;
