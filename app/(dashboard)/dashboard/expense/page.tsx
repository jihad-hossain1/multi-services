'use client'

// import { convertLanguage } from '@/context/LanguageContext'
import React, { useLayoutEffect, useState, useCallback } from 'react'
import AddExpense from './_comp/AddExpense'
import ExpenseCat from './_comp/expenseCat'
import useAuth from '@/helpers/hook/useAuth'
import ExpenseList from './_comp/ExpenseList'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { InputField } from '@/components/ui/InputField'
import ExpenseSummary from './_comp/expense-summary/expenseSummary'


const Page = () => {
    const { auth } = useAuth()
    const [categories, setCategories] = useState<any>([]);
    const [expenses, setExpenses] = useState<any>([])
    const [isCatAdd, setIsCatAdd] = useState(true)
    const [isExpnsAdd, setIsExpnsAdd] = useState(true)
    const [catLoading, setCatLoading] = useState(false)
    const [expnsLoading, setExpnsLoading] = useState(false)
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [fromDate, setFromDate] = useState(new Date().toISOString().split('T')[0]);
    const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);
    const [filterby, setFilterby] = useState('');
    const [summaryVisible, setSummaryVisible] = useState(false);


    // fetch cetegory
    const fetchCategories = useCallback(async () => {
        try {
            setCatLoading(true)
            const response = await fetch(`/api/v1/expense/category?userId=${auth?.userId}`, {
                cache: 'no-store'
            })
            setCatLoading(false)
            const jsonData = await response.json();

            setCategories(jsonData?.result)
        } catch (error) {
            console.error("Error fetching categories:", (error as Error).message);
        }
    }, [ auth?.userId])

    useLayoutEffect(() => {
        if (auth?.userId && isCatAdd) fetchCategories()
    }, [auth?.userId, isCatAdd, fetchCategories])


    // fetch Expenses
    const fetchExpenses = useCallback(async () => {
        try {
            setExpnsLoading(true)
            const response = await fetch(`/api/v1/expense?userId=${auth?.userId}&page=${page}&limit=${limit}&searchTerm=${searchTerm}&fromDate=${fromDate}&toDate=${toDate}&filterby=${filterby}`, {
                cache: 'no-store'
            })
            setExpnsLoading(false)
            const jsonData = await response.json();
            setExpenses(jsonData?.result?.data)
            setPage(jsonData?.result?.meta?.page)
            setLimit(jsonData?.result?.meta?.limit)
            setTotalCount(jsonData?.result?.meta?.total)
        } catch (error) {
            console.error("Error fetching expenses:", (error as Error).message);
        }
    }, [ auth?.userId, page, limit, searchTerm, fromDate, toDate, filterby])

    useLayoutEffect(() => {
        if (auth?.userId && isExpnsAdd) fetchExpenses()
    }, [auth?.userId, isExpnsAdd, fetchExpenses])



    return (
        <div className="">
            <section className="">
                <h2 className='max-sm:text-2xl md:text-3xl lg:text-4xl font-bold max-sm:text-center max-sm:mb-10'>{'Expense'}</h2>
                <div className={summaryVisible ? "flex justify-end" : 'block md:flex md:justify-between md:items-center mb-4 items-center'}>
                    {/* expense category  */}
                    {!summaryVisible && <div>
                        <ExpenseCat filterby={filterby} setFilterby={setFilterby} setIsCatAdd={setIsCatAdd} categories={categories} />
                    </div>}

                    <div className='flex gap-4 items-center mt-[45px]'>
                        <div>
                            <button className={summaryVisible ? "btn_comp_color_violet" : "btn_comp_color_cyan"} onClick={() => setSummaryVisible(!summaryVisible)}>
                                {summaryVisible ? `View Expenses` : `View Summary`}
                            </button>
                        </div>
                        {!summaryVisible && <AddExpense setIsExpnsAdd={setIsExpnsAdd} categories={categories} />}
                    </div>
                </div>
                <div>
                    {summaryVisible ? (
                        <ExpenseSummary />
                    ) : (
                        <>
                            <section className='flex md:items-center flex-col gap-3 md:flex-row md:justify-between my-4'>
                                {/* search  */}
                                <div className=''>
                                    <InputField label={`Search Expense`} name='search' id='search' autoComplete='off' onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} type='text' />
                                </div>
                                {/* filter title  */}
                                {filterby && <p className='md:text-xl font-semibold text-violet-700'>{filterby}</p>}
                                {/* date filter  */}
                                <div className='flex flex-col md:flex-row gap-3 md:items-center'>
                                    <div className='flex md:items-start items-center gap-1 md:flex-col flex-row'>
                                        <label htmlFor="fromDate">{'From'}:</label>
                                        <DatePicker className='input-form w-full lg:w-[150px] text-center' dateFormat={"dd-MM-yyyy"} selected={fromDate as any} onChange={(date: any) => setFromDate(date)} />
                                    </div>
                                    <div className='flex md:items-start items-center gap-1 md:flex-col flex-row'>
                                        <label htmlFor="toDate">{'To'}:</label>
                                        <DatePicker className='input-form w-full lg:w-[150px] text-center' dateFormat={"dd-MM-yyyy"} selected={toDate as any} onChange={(date: any) => setToDate(date)} />
                                    </div>
                                </div>
                            </section>
                            {/* expense list  */}
                            <ExpenseList expnsLoading={expnsLoading} expenses={expenses} page={page} setPage={setPage} limit={limit} totalCount={totalCount} />
                        </>

                    )}
                </div>
            </section>
        </div>
    )
}

export default Page