import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";

import { TBalance } from "@/app/(dashboard)/dashboard/expense/au/[[...id]]/page";
import { BalanceFormAddUpdate } from "./form";
import { useState } from "react";

export const BalanceForm = ({
  isUpdate = false,
  balance,
  className = "",
}: {
  isUpdate?: boolean;
  balance?: TBalance;
  className?: string;
}) => {
  const [balanceModal, setBalanceModal] = useState(false);

  return (
    <>
      <button className={className} onClick={() => setBalanceModal(true)}>
        {isUpdate ? "Update Balance" : "Add Balance"}
      </button>

      <Dialog open={balanceModal} onOpenChange={setBalanceModal}>
        <DialogContent className="max-w-[500px] mx-auto bg-zinc-900">
          <DialogClose className="absolute right-2 top-2">X</DialogClose>
          <BalanceFormAddUpdate
            setBalanceModal={setBalanceModal}
            isUpdate={isUpdate}
            balance={balance}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

BalanceForm.displayName = "BalanceForm";
