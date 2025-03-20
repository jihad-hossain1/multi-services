"use client";

import { InputField } from "@/components/ui/InputField";
import {
  ExpenseSchema,
  ExpenseCategoryType,
  ExpenseSchemaType,
} from "@/helpers/schemas/schemas";
import React from "react";
import toast from "react-hot-toast";
import { createExpense } from "./action/createExpense";
import useAuth from "@/helpers/hook/useAuth";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { BalanceForm } from "@/features/expense/components/balance/balanceForm";
import { updateExpense } from "./action/expense";

interface Props {
  categories: { id: string; name: string }[];
  balances: { id: string; xname: string; amount: number }[];
  expenseData: ExpenseSchemaType;
}

const AddExpense: React.FC<Props> = ({ categories, balances, expenseData }) => {
  const { auth } = useAuth();
  const router = useRouter();

  const [errors, setErrors] = React.useState<any>({});
  const [actionLoader, setActionLoader] = React.useState(false);
  const [formData, setFormData] = React.useState({
    title: "",
    amount: "",
    category: "",
    payment: "",
    note: "",
    xbalance: "",
    xdate: new Date(),
  });
  const [amount, setAmount] = React.useState<string>("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErrors({});

    try {
      if (expenseData?.id) {
        setActionLoader(true);
        const response = await updateExpense({
          ...formData,
          id: expenseData.id,
        });
        setActionLoader(false);
        if (response?.success) {
          toast.success("Expense updated successfully");
          router.refresh();
        } else {
          toast.error("something went wrong");
        }
      } else {
        const parsedData = ExpenseSchema.safeParse({
          ...formData,
          xdate: formData.xdate ? new Date(formData.xdate) : "",
          amount: Number(formData.amount),
          catid: formData.category,
        });

        if (!parsedData.success) {
          const errors = parsedData.error.flatten().fieldErrors;
          setErrors(errors);
          return;
        }
        setActionLoader(true);
        const response = await createExpense({
          ...parsedData.data,
          xuserid: auth?.userId,
          // xdate: ,
        });
        setActionLoader(false);

        if (response?.result) {
          router.refresh();
          toast.success("Expense created successfully");
          setFormData({
            title: "",
            amount: "",
            category: "",
            payment: "",
            note: "",
            xdate: new Date(),
            xbalance: "",
          });
        } else {
          toast.error("something went wrong");
          return;
        }
      }
    } catch (error) {
      console.error("Error creating expense:", error);
    }
  };

  React.useEffect(() => {
    if (expenseData) {
      setFormData({
        title: expenseData?.title || "",
        amount: Number(expenseData?.amount) as unknown as string,
        category: expenseData?.catid as string,
        payment: expenseData?.payment,
        note: expenseData?.note || "",
        xbalance: expenseData?.xbalance,
        xdate: new Date(expenseData?.xdate as Date) || new Date(),
      });
      setAmount(expenseData?.xbalance || "")
    }
  }, [expenseData]);

  return (
    <div className="max-w-6xl mx-auto p-3">
      <main className="bg-zinc-900 p-4 rounded-lg border border-zinc-700">
        <h4 className=" mb-6 text-2xl max-sm:text-xl font-bold text-center text-white">
          New Expense
        </h4>
        <div className="flex justify-end">
          <BalanceForm />
        </div>
        <div className="px-3 flex flex-col gap-2">
          <InputField
            labelClassName={cn("text-sm", "text-white")}
            label="Name of Expense"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title}
            type="text"
            name="xname"
            id="name"
            className={cn("input-form w-full", "text-white")}
            required={true}
            error={errors?.xname ? errors?.xname[0] : ""}
          />
          {errors?.title && (
            <span className="text-red-500">{errors?.title[0]}</span>
          )}

          <AmountForm amount={amount} setAmount={setAmount} formData={formData} setFormData={setFormData} />

          {errors?.amount && (
            <span className="text-red-500">{errors?.amount[0]}</span>
          )}

          <div className="my-2">
            <label
              htmlFor="cat"
              id="cat"
              className={cn("text-sm ", "text-white")}
            >
              Select Category
            </label>
            <select
              className={cn("input-form", "text-white")}
              id="cat"
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              value={formData.category}
            >
              <option disabled value={""}>
                Select Category
              </option>
              {categories?.map((cat: ExpenseCategoryType, ind: number) => (
                <option key={ind} value={cat?.id}>
                  {cat?.name}
                </option>
              ))}
            </select>
          </div>

          <div className="my-2">
            <label htmlFor="balance">From Balance</label>
            <select
              value={formData.xbalance}
              onChange={(e) =>
                setFormData({ ...formData, xbalance: e.target.value })
              }
              className={cn("input-form", "text-white")}
            >
              <option value="" disabled>
                Select A Balance
              </option>
              {balances?.map((balance) => (
                <option key={balance.id} value={balance.id}>
                  {`${balance?.xname} - ${balance?.amount}`}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="cat"
              id="cat"
              className={cn("text-sm ", "text-zinc-200")}
            >
              Select Payment
            </label>
            <select
              className={cn("input-form", "text-white")}
              id="pay"
              onChange={(e) =>
                setFormData({ ...formData, payment: e.target.value })
              }
              value={formData.payment}
            >
              <option value="" disabled>
                Select Payment
              </option>
              {["CASH", "CARD"].map((op: string, indx: number) => (
                <option value={op} key={indx}>
                  {op}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="date"
              id="date"
              className={cn("text-sm ", "text-white")}
            >
              Select Date
              <span className="text-cyan-600"> ( date is optional )</span>
            </label>
            <input
              type="date"
              value={formData?.xdate as unknown as string}
              name="date"
              id="date"
              className={cn("input-form", "text-white")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  xdate: e.target.value as unknown as Date,
                })
              }
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="note"
              id="note"
              className={cn("text-sm ", "text-white")}
            >
              Write Note
            </label>
            <textarea
              name="note"
              id="note"
              cols={10}
              rows={5}
              className={cn("input-form", "text-white")}
              onChange={(e) =>
                setFormData({ ...formData, note: e.target.value })
              }
              value={formData.note}
            />
            {errors?.note && (
              <span className="text-red-500">{errors?.note[0]}</span>
            )}
          </div>

          <div className={`my-4 flex justify-end`}>
            <a className="btn bg-zinc-900" href={"/dashboard/expense"}>Back</a>
            <button
              disabled={actionLoader}
              type="button"
              onClick={handleSubmit}
              className={cn(
                "flex items-center gap-2 justify-center btn bg-zinc-900",
                "text-white"
              )}
            >
              {actionLoader ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

const AmountForm = ({ formData, setFormData, amount, setAmount }: any) => {


  const handleChangeAmountWithSanitization = (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { value } = target;

    const modValue = value
      .replace(/[^0-9+.]/g, "")
      .replace(/(\.\d{2})\d+/g, "$1");

    setAmount(modValue);

    try {
      const sanitizedValue = modValue.replace(/^\.+|\.+$/g, "");
      const calculatedTotal = eval(sanitizedValue);
      if (!isNaN(calculatedTotal)) {
        setFormData({
          ...formData,
          amount: parseFloat(calculatedTotal.toFixed(2)),
        });
      } else {
        setFormData({ ...formData, amount: 0 });
      }
    } catch {
      setFormData({ ...formData, amount: 0 });
    }
  };

  // React.useEffect(() => {
  //   if (formData?.amount ) {
  //     setAmount(formData?.amount.toString());
  //   }
  // }, [formData?.amount]);

  return (
    <div className="relative">
      <InputField
        className={cn("input-form", "text-white ")}
        name="amount"
        id="amount"
        type="text"
        labelClassName="text-white text-xs"
        value={amount}
        onChange={handleChangeAmountWithSanitization}
        label={"Enter Amount:  You can use + and . (e.g., 5+5+43.5)"}
      />
      <div
        className={cn(
          "absolute bottom-[-18px] right-0 text-xs md:text-sm ",
          "text-white"
        )}
      >
        Total Amount:{" "}
        <span className="text-red-500"> {formData?.amount || 0}</span>
      </div>
    </div>
  );
};

export default AddExpense;
