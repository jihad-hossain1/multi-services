
'use client'
import Modal from '@/components/modal/Modal';
import {InputField} from '@/components/ui/InputField';
import useAuth from '@/helpers/hook/useAuth';
import { ExpenseCategory } from '@/helpers/schemas/schemas'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { createExpenseCategory } from './action/createExpenseCategory';

interface Props {
  categories: any;
  setIsCatAdd: React.Dispatch<React.SetStateAction<boolean>>
  setFilterby: React.Dispatch<React.SetStateAction<string>>
  filterby: string
}

const ExpenseCat: React.FC<Props> = ({ categories, setIsCatAdd, setFilterby, filterby }) => {
  const [modCategory, setModCategory] = React.useState<any>([]);
  const { auth } = useAuth()
  const router = useRouter()
  const [modal, setModal] = React.useState(false);
  const closeModal = () => setModal(false);
  const [formData, setFormData] = React.useState({
    name: ""
  })
  const [errors, setErrors] = React.useState<any>({});
  const [actionLoader, setActionLoader] = React.useState(false);

  const handleCreateExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const parsedData = ExpenseCategory.safeParse(formData);
    if (!parsedData.success) {
      const errors = parsedData.error.flatten().fieldErrors;
      setErrors(errors);
      return;
    }

    try {
      setActionLoader(true);
      setIsCatAdd(false)
      const response = await createExpenseCategory({ name: parsedData.data.name, xuserid: auth?.userId });
      setActionLoader(false);

      if (response?.result) {
        setIsCatAdd(true)
        setModal(false);
        setFormData({ name: "" });
        router.refresh();
        toast.success("Expense category created successfully");
      } else {
        toast.error('something went wrong');
        return;
      }
    } catch (error) {
      console.error('Error creating expense category:', (error as Error).message);
    }
  }

  useEffect(() => {
    if (categories?.length > 0) {
      // push a new category to the array
      const newCategory = {
        id: 9999,
        name: "All",
      }
      setModCategory([...categories, newCategory])
    }
  }, [categories])

  return (
    <div className='mt-4'>
      <div className='flex items-center gap-2'>
        <div className='flex flex-col gap-2'>
          <label htmlFor="ex" id='ex' className=''>
            {`${("Filter")} ${("by")} ${("Category")}`}
          </label>
          <select
            className='input-form'
            onChange={(e) => setFilterby(e.target.value)}
            value={filterby}
          >
            <option value="" disabled>
              {`${("Expenses")} ${("Category")}`}
            </option>
            {
              // Ensure "all" is at the top of the options
              [...modCategory]
                .sort((a, b) => (a.name == "All" ? -1 : b.name == "All" ? 1 : 0))
                .map((cat: any, index: number) => (
                  <option key={index} value={cat.id == 9999 ? "" : cat.name}>
                    {cat.name}
                  </option>
                ))
            }
          </select>
        </div>

        <div className='mt-7'>
          <button className='btn' onClick={() => setModal(true)}>{`${("New")} ${("Category")}`}</button>
        </div>
      </div>

      <Modal isOpen={modal} onClose={closeModal} title='Add New Category'>
        <div className=''>
          <form onSubmit={handleCreateExpense}>
            <div className="mb-4">

              <InputField
                required
                label="Name"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              {
                errors?.name && (
                  <p className="text-red-500 text-sm mt-1">{errors?.name}</p>
                )
              }
            </div>
            <div className="flex justify-end mt-3">
              <button
                type="submit"
                className="btn"
              >
                {
                  actionLoader ? <span className='flex items-center gap-2 '>
                    <span>Saving</span>
                    {/* <TbLoaderQuarter className='animate-spin' />
                     */}
                     <span>Loading...</span>
                  </span> : "Save"
                }
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default ExpenseCat