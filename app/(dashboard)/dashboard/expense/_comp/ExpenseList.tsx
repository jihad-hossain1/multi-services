'use client'

import { ExpenseSchemaType } from '@/helpers/schemas/schemas';
import React from 'react'

interface Props {
    expenses: any;
    expnsLoading: boolean;
    page: number;
    limit: number;
    totalCount: number;
    setPage: (page: number) => void;
}

const ExpenseList: React.FC<Props> = ({ expenses, expnsLoading, page, limit, totalCount, setPage, }) => {
    const totalPages = Math.ceil(totalCount / limit);

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
        <div className='overflow-x-auto md:overflow-visible text-balance md:text-nowrap'>
            <table className="w-full ">
                <thead>
                    <tr className="border-b bg-cyan-200/60">
                        <th className="py-3 px-4 text-left">#</th>
                        <th className="py-3 px-4 text-left">{("Name")}</th>
                        <th className="py-3 px-4 text-left">{("Category")}</th>
                        <th className="py-3 px-4 text-left">{`${("Payment")} ${("Type")}`}</th>
                        <th className="py-3 px-4 text-left">{("Date")}</th>
                        <th className="py-3 px-4 text-left">{("Amount")}</th>
                        <th className="py-3 px-4 text-left">{("Note")}</th>
                    </tr>
                </thead>
                <tbody>
                    {expnsLoading ? (
                        [...Array(10)].map((_, index) => (
                            <tr key={index} className="border-b animate-pulse" style={{
                                animationDelay: `${index * 0.1}s`,
                                animationFillMode: 'forwards',
                                animationIterationCount: 'infinite',
                            }}>
                                <td className="py-2 px-4 bg-cyan-200/95 h-10" colSpan={5}></td>
                                <td className="py-2 px-4 bg-cyan-200/95 h-10" colSpan={2}></td>
                                <td className="py-2 px-4 bg-cyan-200/95 h-10" colSpan={2}></td>
                            </tr>
                        ))
                    ) : expenses?.map((expense: ExpenseSchemaType, index: number) => (
                        <React.Fragment key={index}>
                            <tr className="border-b">
                                <td className="py-2 px-4">{(page - 1) * limit + index + 1}</td>
                                <td className="py-2 px-4">{expense?.title?.length > 30 ? expense?.title?.slice(0, 30) + '...' : expense?.title}</td>
                                <td className="py-2 px-4">{(expense as any)?.category?.name}</td>
                                <td className="py-2 px-4">{expense?.payment}</td>
                                <td className="py-2 px-4">{new Date(expense?.xdate as Date).toLocaleDateString()}</td>
                                <td className="py-2 px-4">{expense?.amount}</td>
                                <td className="py-2 px-4">{(expense?.note as string)?.length > 20 ? expense?.note?.slice(0, 20) + '...' : expense?.note}</td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
                {/* total expenses */}
                <tfoot>
                    <tr>
                        <td className="py-2 px-4 font-bold" colSpan={5}>{`${("Total")} ${("Expenses")}`}</td>
                        <td className="py-2 px-4 font-bold">{expenses?.reduce((total: number, expense: ExpenseSchemaType) => total + expense?.amount, 0)}</td>
                        <td className="py-2 px-4 font-bold" colSpan={2}></td>
                    </tr>
                </tfoot>
            </table>
            {
                expenses?.length === 0 && !expnsLoading && (
                    <div className="flex justify-center items-center h-40">
                        <p className="text-2xl text-cyan-600">{("No Data Found")}</p>
                    </div>
                )
            }

            {
                totalPages > 1 && (
                    <div className="flex justify-center mt-4 items-center gap-2">
                        <button
                            className={page === 1 ? "hidden" : "bg-cyan-100 hover:bg-cyan-200 text-cyan-700 font-bold py-1 px-4 rounded shadow-sm hover:shadow"}
                            onClick={handlePrevious}
                            disabled={page === 1}
                        >
                            {("Previous")}
                        </button>
                        <span>{("Page")} {page} {("of")} {totalPages}</span>
                        <button
                            className={page === totalPages ? "hidden" : "bg-cyan-100 hover:bg-cyan-200 text-cyan-700 font-bold py-1 px-4 rounded shadow-sm hover:shadow"}
                            onClick={handleNext}
                            disabled={page === totalPages}
                        >
                            {("Next")}
                        </button>
                    </div>
                )
            }


        </div>
    )
}

export default ExpenseList;
