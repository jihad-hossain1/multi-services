"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropDown";
import { ExpenseSchemaType } from "@/helpers/schemas/schemas";
import React from "react";

interface Props {
  expenses: any;
  expnsLoading: boolean;
  page: number;
  limit: number;
  totalCount: number;
  setPage: (page: number) => void;
}

const ExpenseList: React.FC<Props> = ({
  expenses,
  expnsLoading,
  page,
  limit,
  totalCount,
  setPage,
}) => {
  const totalPages = Math.ceil(totalCount / limit);
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [detailsIndex, setDetailsIndex] = React.useState(0);
  const [detailsInfo, setDetailsInfo] = React.useState<any>({});
  const router = useRouter();

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="overflow-auto">
      <div className="w-full">
        <table className="min-w-full border-collapse mt-6 w-full lg:max-w-full overflow-x-auto max-sm:text-nowrap">
          <thead className="">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider">
                #
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider">
                {"Name"}
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider">
                {"Category"}
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider">{`${"Payment"} ${"Type"}`}</th>
              <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider">
                {"Balance"}
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider">
                {"Date"}
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider">
                {"Amount"}
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider">
                {"Note"}
              </th>
              <th className="py-3 px-4 text-right text-xs font-medium uppercase tracking-wider">
                {"Details"}
              </th>
            </tr>
          </thead>
          <tbody className=" divide-y divide-gray-200">
            {expnsLoading
              ? [...Array(20)].map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td
                      className="py-2 px-4 bg-zinc-700/90 h-10"
                      colSpan={5}
                    ></td>
                    <td
                      className="py-2 px-4 bg-zinc-700/90 h-10"
                      colSpan={2}
                    ></td>
                    <td
                      className="py-2 px-4 bg-zinc-700/90 h-10"
                      colSpan={2}
                    ></td>
                  </tr>
                ))
              : expenses?.map((expense: ExpenseSchemaType, index: number) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td className="py-2 px-4">
                        {(page - 1) * limit + index + 1}
                      </td>
                      <td className="py-2 px-4">
                        {expense?.title?.length > 30
                          ? expense?.title?.slice(0, 30) + "..."
                          : expense?.title}
                      </td>
                      <td className="py-2 px-4">
                        {(expense as any)?.category?.name}
                      </td>
                      <td className="py-2 px-4">{expense?.payment}</td>
                      <td className="py-2 px-4">
                        {expense?.xbalance?.slice(-6)}
                      </td>
                      <td className="py-2 px-4">
                        {new Date(expense?.xdate as Date).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4">{expense?.amount}</td>
                      <td className="py-2 px-4">
                        {(expense?.note as string)?.length > 20
                          ? expense?.note?.slice(0, 20) + "..."
                          : expense?.note}
                      </td>
                      <td className="py-2 px-4 text-right">
                        <DropdownMenu position="right">
                          <DropdownMenuTrigger>
                            <span className="text-nowrap text-xs">
                              Options ▼
                            </span>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent sideOffset={10}>
                            <DropdownMenuItem
                              onClick={() => {
                                setDetailsOpen(true);
                                setDetailsIndex(index);
                                setDetailsInfo(expense);
                              }}
                              className="text-nowrap"
                            >
                              Show Details
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              className="text-nowrap"
                              onClick={() =>
                                router.push(
                                  `/dashboard/expense/au/${expense?.id}`
                                )
                              }
                            >
                              Update
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() => {
                                // setDeleteDialog(true);
                                // setBalance(balance);
                              }}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        {/* <button
                          onClick={() => {
                            setDetailsOpen(true);
                            setDetailsIndex(index);
                            setDetailsInfo(expense);
                          }}
                        >
                          <Icons.details
                            className="w-5 h-5"
                            strokeColor="green"
                          />
                        </button> */}
                        <Dialog
                          onOpenChange={() => setDetailsOpen(false)}
                          open={detailsOpen}
                        >
                          <DialogContent className="bg-zinc-700 border-zinc-600 max-w-[500px] mx-auto overflow-x-auto">
                            <DialogClose className="absolute top-4 right-2">
                              X
                            </DialogClose>
                            <div className="p-4 flex flex-col gap-3 text-start overflow-x-auto text-white max-sm:text-sm">
                              <h4 className="text-lg text-center">
                                Expense Details
                              </h4>
                              <p>
                                Head:
                                {detailsInfo?.title}
                              </p>
                              <p>
                                Category:
                                {detailsInfo?.category?.name}
                              </p>
                              <p>
                                Payment by:
                                {detailsInfo?.payment}
                              </p>
                              <p>
                                Date:
                                {new Date(
                                  detailsInfo?.xdate as Date
                                ).toLocaleDateString()}
                              </p>
                              <p>
                                Amount:
                                {detailsInfo?.amount}
                              </p>
                              <p className="text-gray-100 text-sm break-all">
                                Note:
                                {detailsInfo?.note}
                              </p>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
          </tbody>
          {/* total expenses */}
          <tfoot>
            <tr>
              <td
                className="py-2 px-4 font-bold"
                colSpan={5}
              >{`${"Total"} ${"Expenses"}`}</td>
              <td className="py-2 px-4 font-bold">
                {expenses?.reduce(
                  (total: number, expense: ExpenseSchemaType) =>
                    total + expense?.amount,
                  0
                )}
              </td>
              <td className="py-2 px-4 font-bold" colSpan={2}></td>
            </tr>
          </tfoot>
        </table>
      </div>
      {expenses?.length === 0 && !expnsLoading && (
        <div className="flex justify-center items-center h-40">
          <p className="text-2xl ">{"No Data Found"}</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-4 items-center gap-2">
          <button
            className={
              page === 1
                ? "hidden"
                : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold py-1 px-4 rounded shadow-sm hover:shadow"
            }
            onClick={handlePrevious}
            disabled={page === 1}
          >
            {"Previous"}
          </button>
          <span>
            {"Page"} {page} {"of"} {totalPages}
          </span>
          <button
            className={
              page === totalPages
                ? "hidden"
                : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold py-1 px-4 rounded shadow-sm hover:shadow"
            }
            onClick={handleNext}
            disabled={page === totalPages}
          >
            {"Next"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
