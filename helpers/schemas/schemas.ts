import { z } from "zod";

export const BankInfoSchema = z.object({
  xcardno: z
    .string()
    .trim()
    .min(1)
    .max(50, { message: "Card Number will be under 50 char." })
    .optional(),
  xcardholdername: z
    .string()
    .trim()
    .min(1)
    .max(50, { message: "Card Holder Name will be under 50 char." })
    .optional(),
  xbankname: z
    .string()
    .trim()
    .min(1)
    .max(50, { message: "Bank Name will be under 50 char." })
    .optional(),
  xaccno: z
    .string()
    .trim()
    .min(1)
    .max(50, { message: "Account Number will be under 50 char." })
    .optional(),
});

export const ExpenseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "Name is Required" })
    .max(100, { message: "Name must be under 100 Char" }),
  amount: z.number().default(0),
  payment: z.string().trim(),
  note: z
    .string()
    .trim()
    .max(500, { message: "Note must be under 500 Char" })
    .optional(),
  xuserid: z.string().optional(),
  id: z.string().optional(),
  catid: z.string().optional(),
  xdate: z.date().optional(),
  xbank: BankInfoSchema.optional(),
  xbalance: z.string().trim(),
});

export const ExpenseCategory = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is Required" })
    .max(50, { message: "Name will be under 50 char." }),
  xuserid: z.string().optional(),
  xdate: z.string().time().optional(),
  id: z.string().optional(),
});

export const BalanceSchema = z.object({
  id: z.string().trim().optional(),
  xuserid: z.string().trim(),
  amount: z.coerce.number(),
  xtype: z.string().trim(),
  xname: z.string().trim(),
  xdesc: z.string().trim().optional(),
  xdate: z.date().optional(),
  xstatus: z.string().trim().optional(),
  xbank: z
    .object({
      xcardno: z.string().trim().optional(),
      xcardholdername: z.string().trim().optional(),
      xaccno: z.string().trim().optional(),
      xbankname: z.string().trim().optional(),
    })
    .optional(),
});

export type TBalance = z.infer<typeof BalanceSchema>;

export type ExpenseSchemaType = z.infer<typeof ExpenseSchema>;

export type ExpenseCategoryType = z.infer<typeof ExpenseCategory>;

export type BankInfoSchemaType = z.infer<typeof BankInfoSchema>;
