"use client";

import Modal from "@/components/modal/Modal";
import {InputField} from "@/components/ui/InputField";
import { ExpenseSchema, ExpenseCategoryType } from "@/helpers/schemas/schemas";
import React from "react";
import toast from "react-hot-toast";
import { createExpense } from "./action/createExpense";
import useAuth from "@/helpers/hook/useAuth";
import { useRouter } from "next/navigation";

interface Props {
    categories: [];
    setIsExpnsAdd: React.Dispatch<React.SetStateAction<boolean>>
}

const AddExpense: React.FC<Props> = ({ categories,setIsExpnsAdd }) => {
    const { auth } = useAuth()
    const router = useRouter()
    const [modal, setModal] = React.useState(false);
    const closeModal = () => setModal(false);
    const [errors, setErrors] = React.useState<any>({});
    const [actionLoader, setActionLoader] = React.useState(false);
    const [formData, setFormData] = React.useState({
        title: "",
        amount: "",
        category: "",
        payment: "",
        note: "",
        xdate: ''
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setErrors({});

        const parsedData = ExpenseSchema.safeParse({ ...formData,xdate: new Date(formData.xdate), amount: Number(formData.amount), catid: formData.category });

        if (!parsedData.success) {
            const errors = parsedData.error.flatten().fieldErrors;
            setErrors(errors);
            return;
        }

        try {
            setActionLoader(true);
            setIsExpnsAdd(false)
            const response = await createExpense({ ...parsedData.data, xuserid: auth?.userId });
            setActionLoader(false);

            if (response?.result) {
                setModal(false);
                setIsExpnsAdd(true)
                router.refresh();
                toast.success("Expense created successfully");
                setFormData({ title: "", amount: "", category: "", payment: "", note: "", xdate: '' });
            } else {
                toast.error('something went wrong');
                return;
            }

        } catch (error) {
            console.error("Error creating expense:", error);
        }
    };

    return (
        <div>
            <button className='btn' onClick={() => setModal(true)}>
                Add Expenses
            </button>

            <Modal isOpen={modal} onClose={closeModal}>
                <h4 className=' mt-3 text-2xl max-sm:text-xl font-bold text-center text-[#333333]'>
                    New Expense
                </h4>
                <form action='' onSubmit={handleSubmit} className='px-3 flex flex-col gap-2'>
                    <InputField label='Head' onChange={(e) => setFormData({ ...formData, title: e.target.value })} value={formData.title} type='text' name='xname' id='name' className='input-form w-full' required={true} error={errors?.xname ? errors?.xname[0] : ""} />
                    {errors?.title && <span className='text-red-500'>{errors?.title[0]}</span>}

                    <InputField label='Amount' name="amount" value={formData.amount}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                amount: e.target.value.replace(/[^0-9]/g, ""),
                            }))
                        }
                        id="amount"
                        type="number" />
                    {errors?.amount && <span className='text-red-500'>{errors?.amount[0]}</span>}

                    <div className='my-2'>
                        <label htmlFor='cat' id='cat' className='input-label'>
                            Select Category
                        </label>
                        <select className='input-form' id='cat' onChange={(e) => setFormData({ ...formData, category: e.target.value })} value={formData.category}>
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

                    <div className='flex flex-col gap-1'>
                        <label htmlFor='cat' id='cat' className='input-label'>
                            Select Payment
                        </label>
                        <select className='input-form' id='pay' onChange={(e) => setFormData({ ...formData, payment: e.target.value })} value={formData.payment}>
                            <option value='' disabled>
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
                        <label htmlFor='date' id='date' className='input-label'>
                            Select Date <span className='text-cyan-600'> ( date is optional )</span>
                        </label>
                        <input type='date' name='date' id='date' className='input-form' onChange={(e) => setFormData({ ...formData, xdate: e.target.value })}  />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label htmlFor='note' id='note' className='input-label'>
                            Write Note
                        </label>
                        <textarea name='note' id='note' cols={10} rows={5} className='w-full input-form' onChange={(e) => setFormData({ ...formData, note: e.target.value })} value={formData.note} />
                        {errors?.note && <span className='text-red-500'>{errors?.note[0]}</span>}
                    </div>

                    <div className={`my-4 flex justify-end`}>
                        <button disabled={actionLoader} type='submit' className='flex items-center gap-2 justify-center btn'>
                            Submit {actionLoader ? 'loading...' : ""}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default AddExpense;
