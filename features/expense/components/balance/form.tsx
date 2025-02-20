"use client";

import React, { useEffect, useState } from "react";
import { createBalance, updateBalance } from "../../actions/balance";
import { BalanceResponse } from "@/services/expense/Expense";
import toast from "react-hot-toast";
import { TBalance } from "@/app/(dashboard)/dashboard/expense/au/[[...id]]/page";
import { InputField } from "@/components/ui/InputField";
import { useRouter } from "next/navigation";

export const BalanceFormAddUpdate = ({
  isUpdate = false,
  balance,
  className = "",
  setBalanceModal,
}: {
  isUpdate?: boolean;
  balance?: TBalance;
  className?: string;
  setBalanceModal: (isOpen: boolean) => void;
}) => {
  const router = useRouter();
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    xname: "",
    amount: "",
    xdesc: "",
    xtype: "",
    id: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrors(null);
      if (isUpdate) {
        const result = (await updateBalance({
          id: balance?.id,
          amount: Number(formData.amount),
          xname: formData.xname,
          xtype: formData.xtype,
          xdesc: formData.xdesc,
        })) as unknown as BalanceResponse;

        if (result.success) {
          toast.success("Balance Updated Successful");
          setBalanceModal(false);
          router.refresh();
          return;
        }

        setErrors({
          ...errors,
          errors: result.errors,
        });
        toast.error(result.message);
      } else {
        const result = (await createBalance({
          amount: Number(formData.amount),
          xname: formData.xname,
          xtype: formData.xtype,
          xdesc: formData.xdesc,
        })) as unknown as BalanceResponse;

        if (result.success) {
          toast.success("Balance Added Successful");
          setBalanceModal(false);
          router.refresh();
          return;
        }

        setErrors({
          ...errors,
          errors: result.errors,
        });
      }

      toast.error("Something went wrong!");
      return;
    } catch (error) {
      console.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (balance) {
      setFormData({
        xname: balance.xname,
        amount: balance.amount.toString(),
        xdesc: balance.xdesc,
        xtype: balance.xtype,
        id: balance.id,
      });
    }
  }, [balance]);

  return (
    <div className="flex flex-col gap-3">
      <h4 className="font-bold text-2xl">
        {isUpdate ? "Update Balance" : "New Balance"}
      </h4>
      <form action="" onSubmit={handleSubmit} className="grid gap-4">
        <InputField
          id="xname"
          name="xname"
          onChange={(e) => setFormData({ ...formData, xname: e.target.value })}
          value={formData.xname}
          type="text"
          autoComplete="off"
          label="Balance Title"
          required
          error=""
        />
        <InputField
          id="amount"
          name="amount"
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          value={formData.amount}
          type="text"
          autoComplete="off"
          label="Balance"
          required
          error=""
        />
        <InputField
          id="xtype"
          name="xtype"
          onChange={(e) => setFormData({ ...formData, xtype: e.target.value })}
          value={formData.xtype}
          type="text"
          autoComplete="off"
          label="Balance Type"
          required
          error=""
        />

        <div className="flex flex-col gap-2">
          <label htmlFor="desc" className="bg-transparent w-full">
            Description
          </label>
          <textarea
            id="desc"
            className="bg-zinc-800"
            value={formData.xdesc}
            onChange={(e) =>
              setFormData({ ...formData, xdesc: e.target.value })
            }
          />
        </div>

        <div className="mt-4 flex justify-end">
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Submitting" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

BalanceFormAddUpdate.displayName = "BalanceFormAddUpdate";
