"use client";

import { TBalance } from "@/app/(dashboard)/dashboard/expense/au/[[...id]]/page";
import { DialogClose, DialogContent } from "@/components/ui/dialog";
import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropDown";
import { DropdownMenuTrigger } from "@/components/ui/dropDown";
import React, { useState } from "react";
import { BalanceFormAddUpdate } from "../../balance/form";
import { deleteBalance } from "../../../actions/balance";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const Balances = ({ balances }: { balances: TBalance[] }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [balance, setBalance] = useState<TBalance | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [addBalanceDialog, setAddBalanceDialog] = useState<boolean>(false);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      const response = await deleteBalance(id);
      if (response.success) {
        toast.success("Balance deleted successfully");
        router.refresh();
        setDeleteDialog(false);
        return;
      }
      toast.error(response.message);
    } catch (error) {
      console.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-sm:overflow-x-auto overflow-x-hidden mt-4">
      <div className="flex justify-between items-center">
        <h4 className="text-2xl font-bold mb-4">Balance Sheet</h4>
        <button
          onClick={() => setAddBalanceDialog(true)}
          className=" px-4 py-1 rounded-md"
        >
          Add Balance
        </button>
      </div>

      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-300 uppercase ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3 text-right">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {balances?.map((balance) => (
            <tr
              key={balance.id}
              className="border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-6 py-4 font-medium text-gray-200 whitespace-nowrap">
                {balance?.xname}
              </td>
              <td className="px-6 py-4">
                {new Date(balance?.xdate).toLocaleDateString()}
              </td>
              <td className="px-6 py-4">{balance?.amount}</td>
              <td className="px-6 py-4">{balance?.xtype}</td>
              <td className="px-6 py-4">{balance?.xdesc}</td>
              <td className="px-6 py-4 flex justify-end">
                <DropdownMenu position="right">
                  <DropdownMenuTrigger>Options ▼</DropdownMenuTrigger>
                  <DropdownMenuContent sideOffset={10}>
                    <DropdownMenuItem
                      onClick={() => {
                        setOpenModal(true);
                        setBalance(balance);
                      }}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setDeleteDialog(true);
                        setBalance(balance);
                      }}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="bg-zinc-700 border-zinc-600 max-w-[500px] mx-auto">
          <DialogClose className="absolute top-4 right-2">X</DialogClose>
          <BalanceFormAddUpdate
            setBalanceModal={setOpenModal}
            isUpdate={true}
            balance={balance as TBalance}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <DialogContent className="bg-zinc-700 border-zinc-600 max-w-[500px] mx-auto">
          <DialogClose className="absolute top-4 right-2">X</DialogClose>
          <div>
            <h4 className="text-2xl font-bold mb-4">Delete Balance</h4>
            <p className="text-gray-300 mb-4">
              Are you sure you want to delete this balance?
            </p>
            <button
              disabled={loading}
              onClick={() => handleDelete(balance?.id as string)}
              className="bg-red-500 text-white px-4 py-1 disabled:opacity-50 disabled:cursor-not-allowed rounded-md"
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={addBalanceDialog} onOpenChange={setAddBalanceDialog}>
        <DialogContent className="bg-zinc-700 border-zinc-600 max-w-[500px] mx-auto">
          <DialogClose className="absolute top-4 right-2">X</DialogClose>
          <BalanceFormAddUpdate
            setBalanceModal={setAddBalanceDialog}
            isUpdate={false}
            balance={undefined}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

Balances.displayName = "Balances";
