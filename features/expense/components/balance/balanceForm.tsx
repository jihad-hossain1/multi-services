import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { InputField } from "@/components/ui/InputField";
import React, { useState } from "react";
import { createBalance } from "../../actions/balance";
import { BalanceResponse } from "@/services/expense/Expense";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const BalanceForm = () => {
  const router = useRouter();
  const [balanceModal, setBalanceModal] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    xname: "",
    amount: "",
    xdesc: "",
    xtype: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrors(null);
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
      toast.error("Something went wrong!");
      return;
    } catch (error) {
      console.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button onClick={() => setBalanceModal(true)}>Add Balance</button>

      <Dialog open={balanceModal} onOpenChange={setBalanceModal}>
        <DialogContent className="max-w-[500px] mx-auto bg-zinc-900">
          <DialogClose className="absolute right-2 top-2">X</DialogClose>
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-2xl">New Balance Form</h4>
            <form action="" onSubmit={handleSubmit} className="grid gap-4">
              <InputField
                id="xname"
                name="xname"
                onChange={(e) =>
                  setFormData({ ...formData, xname: e.target.value })
                }
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
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
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
                onChange={(e) =>
                  setFormData({ ...formData, xtype: e.target.value })
                }
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
        </DialogContent>
      </Dialog>
    </>
  );
};

BalanceForm.displayName = "BalanceForm";
