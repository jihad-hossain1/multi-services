"use client";

import useAuth from "@/helpers/hook/useAuth";
import React, { useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Summary = {
    [key: string]: {
        amount: number;
        id: string;
    };
};

type SummaryDataItem = {
    id: string;
    title: string;
    xdate: string;
    amount: number;
    payment: string;
    note: string;
};

const ExpenseSummary: React.FC = () => {
    const { auth } = useAuth();
    const [summaries, setSummaries] = React.useState<{ summary: Summary; summaryList: Summary, totalAmount: number }>({ summary: {}, summaryList: {}, totalAmount: 0 });
    const [groupItems, setGroupItems] = React.useState<string[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    const [summaryData, setSummaryData] = React.useState<SummaryDataItem[]>([]);
    const [isLoadingSummary, setIsLoadingSummary] = React.useState<boolean>(false);
    const [expandedRowIndex, setExpandedRowIndex] = React.useState<number | null>(null);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const handleFetchSummary = async ({ index, summaryId }: { index: number; summaryId: string }) => {
        try {
            setIsLoadingSummary(true);
            const response = await fetch(`/api/v1/expense/summary?userId=${auth?.userId}&summaryId=${summaryId}&summary=summary&from=${fromDate}&to=${toDate}`, { cache: "no-store" });
            const data = await response.json();
            setSummaryData(data?.result || []);
        } catch (error) {
            console.error("Error fetching expense summaries:", error);
        } finally {
            setIsLoadingSummary(false);
        }
    };

    const toggleRow = (index: number, summaryId: string) => {
        if (expandedRowIndex == index) {
            setExpandedRowIndex(null);
        } else {
            setExpandedRowIndex(index);
            handleFetchSummary({ index, summaryId });
        }
    };

    useEffect(() => {
        const fetchSummaries = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`/api/v1/expense/summary?userId=${auth?.userId}&group=${JSON.stringify(groupItems)}&from=${fromDate}&to=${toDate}`, { cache: "no-store" });
                const data = await response.json();
                setSummaries(data);
            } catch (error) {
                console.error("Error fetching expense summaries:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (auth?.userId) fetchSummaries();
    }, [auth?.userId, groupItems, fromDate, toDate]);

    const handleSelectionChange = (selectedOptions: any) => {
        if (!selectedOptions.length) return;
        setGroupItems(selectedOptions);
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row gap-3 md:justify-between md:items-center my-4">
                <div className="flex flex-col gap-1">
                    <h4 className=''>Filter by Group</h4>
                    <MultiSelectDropdown options={summaries?.summaryList as any} onChange={handleSelectionChange} />
                </div>
                {/* date filter  */}
                <div className='flex flex-col md:flex-row gap-3 md:items-center'>
                    <div className='flex md:items-start items-center gap-1 md:flex-col flex-row'>
                        <label htmlFor='fromDate'>From:</label>
                        <DatePicker className='input-form w-full lg:w-[150px] text-center' placeholderText="DD-MM-YYYY" dateFormat={"dd-MM-yyyy"} selected={fromDate as any} onChange={(date: any) => setFromDate(date)} />
                    </div>
                    <div className='flex md:items-start items-center gap-1 md:flex-col flex-row'>
                        <label htmlFor='toDate'>To:</label>
                        <DatePicker className='input-form w-full lg:w-[150px] text-center' placeholderText="DD-MM-YYYY" dateFormat={"dd-MM-yyyy"} selected={toDate as any} onChange={(date: any) => setToDate(date)} />
                    </div>
                </div>
            </div>
            {isLoading ? (
                <div className='overflow-x-auto rounded-lg border border-zinc-200 shadow-lg animate-pulse'>
                    <table className='min-w-full bg-zinc-700 divide-y divide-zinc-200'>
                        <thead className='bg-zinc-700'>
                            <tr className='bg-zinc-700/70'>
                                <th scope='col' className='px-6 py-3 text-left text-sm font-medium text-zinc-700 uppercase tracking-wider'>
                                    <div className='h-4 bg-zinc-600 rounded w-24'></div>
                                </th>
                                <th scope='col' className='px-6 py-3 text-left text-sm font-medium text-zinc-700 uppercase tracking-wider'>
                                    <div className='h-4 bg-zinc-600 rounded w-24'></div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-zinc-200'>
                            {Array(5)
                                .fill(null)
                                .map((_, index) => (
                                    <tr key={index} className='hover:bg-zinc-200/30'>
                                        <td className='px-6 py-4 text-sm text-zinc-900 font-medium'>
                                            <div className='h-4 bg-zinc-700 rounded w-32'></div>
                                        </td>
                                        <td className='px-6 py-4 text-sm text-zinc-700'>
                                            <div className='h-4 bg-zinc-700 rounded w-20'></div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className='overflow-x-auto rounded-lg border border-gray-200 shadow-lg'>
                    <table className='min-w-full  divide-y divide-gray-200'>
                        <thead className=''>
                            <tr className=''>
                                <th scope='col' className='px-6 py-3 text-left text-sm font-medium uppercase tracking-wider'>
                                    Category
                                </th>
                                <th scope='col' className='px-6 py-3 text-left text-sm font-medium uppercase tracking-wider'>
                                    Amount
                                </th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-200'>
                            {summaries?.summary &&
                                (() => {
                                    const totalAmount = Object.values(summaries?.summary).reduce((acc, curr) => acc + (curr.amount || 0), 0);
                                    return Object.entries(summaries?.summary)
                                        ?.sort(([, valueA], [, valueB]) => (valueB?.amount || 0) - (valueA?.amount || 0))
                                        ?.map(([key, value], index) => {
                                            const percentage = ((value?.amount || 0) / totalAmount) * 100;

                                            return (
                                                <React.Fragment key={index}>
                                                    <tr className='relative hover:bg-zinc-200/20 cursor-pointer' onClick={() => toggleRow(index, value.id)}>
                                                        <td className='px-6 py-4 text-sm font-medium relative overflow-hidden'>
                                                            <div
                                                                className='absolute inset-0'
                                                                style={{
                                                                    width: `${percentage}%`,
                                                                    height: "100%",
                                                                    zIndex: 0,
                                                                }}
                                                            ></div>
                                                            <span className='relative z-10'>{key}</span>
                                                        </td>
                                                        <td className='px-6 py-4 text-sm'>{value?.amount?.toLocaleString()}</td>
                                                    </tr>

                                                    {/* Sub-table for detailed data */}
                                                    {expandedRowIndex === index && (
                                                        <tr className='transition-all duration-300 ease-in-out'>
                                                            <td colSpan={2} className='px-6'>
                                                                {isLoadingSummary ? (
                                                                    Array(5)
                                                                        .fill(null)
                                                                        .map((_, idx) => (
                                                                            <tr key={`loading-${idx}`}>
                                                                                <td className='px-6 py-4 text-sm'>
                                                                                    <div className='h-4 bg-zinc-700/90 rounded w-32'></div>
                                                                                </td>
                                                                                <td className='px-6 py-4 text-sm'>
                                                                                    <div className='h-4 bg-zinc-700/90 rounded w-20'></div>
                                                                                </td>
                                                                                <td className='px-6 py-4 text-sm'>
                                                                                    <div className='h-4 bg-zinc-700/90 rounded w-24'></div>
                                                                                </td>
                                                                                <td className='px-6 py-4 text-sm'>
                                                                                    <div className='h-4 bg-zinc-700/90 rounded w-20'></div>
                                                                                </td>
                                                                                <td className='px-6 py-4 text-sm'>
                                                                                    <div className='h-4 bg-zinc-700/90 rounded w-40'></div>
                                                                                </td>
                                                                            </tr>
                                                                        ))
                                                                ) : (
                                                                    <div className='p-4 rounded-lg'>
                                                                        <table className='min-w-full'>
                                                                            <thead>
                                                                                <tr className='border-b'>
                                                                                    <th className='px-6 py-3 text-left text-sm font-medium '>Head</th>
                                                                                    <th className='px-6 py-3 text-left text-sm font-medium '>Date</th>
                                                                                    <th className='px-6 py-3 text-left text-sm font-medium '>Amount</th>
                                                                                    <th className='px-6 py-3 text-left text-sm font-medium '>Payment</th>
                                                                                    <th className='px-6 py-3 text-left text-sm font-medium '>Note</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {summaryData?.map((item) => (
                                                                                    <tr key={item.id}>
                                                                                        <td className='px-6 py-4 text-sm'>{item?.title}</td>
                                                                                        <td className='px-6 py-4 text-sm'>{new Date(item?.xdate).toLocaleDateString()}</td>
                                                                                        <td className='px-6 py-4 text-sm'>{item?.amount.toLocaleString()}</td>
                                                                                        <td className='px-6 py-4 text-sm'>{item?.payment}</td>
                                                                                        <td className='px-6 py-4 text-sm'>{item?.note?.slice(0, 20)}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    )}
                                                </React.Fragment>
                                            );
                                        });
                                })()}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={1} className='px-6 py-4 text-sm font-semibold'>Total</td>
                                <td colSpan={4} className='px-6 py-4 text-sm font-semibold'>{summaries?.totalAmount?.toLocaleString()}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            )}
        </div>
    );
};

type Option = {
    amount: number;
    id: number;
};

type OptionsData = {
    [key: string]: Option;
};

type MultiSelectDropdownProps = {
    options: OptionsData;
    onChange: (selected: number[]) => void;
};

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({ options, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<number[]>([]); // Change to store ids
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (optionKey: string) => {
        const option = options[optionKey]; // Get option by its key
        const optionId = option.id; // Extract id from the Option

        let newSelectedOptions;
        if (selectedOptions.includes(optionId)) {
            newSelectedOptions = selectedOptions.filter((item) => item !== optionId);
        } else {
            newSelectedOptions = [...selectedOptions, optionId];
        }

        setSelectedOptions(newSelectedOptions);
        onChange(newSelectedOptions); // Pass the ids to the parent component
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className='relative w-full md:w-[400px]' ref={dropdownRef}>
            <button className='w-full bg-zinc-200/60 text-left px-4 py-2 rounded-lg shadow-md focus:outline-none flex justify-between items-center' onClick={toggleDropdown}>
                <span>{selectedOptions.length > 0 ? selectedOptions.map((id) => Object.keys(options).find((key) => options[key].id === id)).join(", ") : "Select Group"}</span>
                <svg xmlns='http://www.w3.org/2000/svg' className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} viewBox='0 0 20 20' fill='currentColor'>
                    <path fillRule='evenodd' d='M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clipRule='evenodd' />
                </svg>
            </button>
            {isOpen && (
                <div className='absolute mt-2 w-full bg-zinc-600 drop-shadow border-zinc-300 rounded-lg shadow-lg z-30 max-h-60 overflow-y-auto animate-fade-in'>
                    {Object.keys(options).map((key) => {
                        const option = options[key];
                        return (
                            <div key={key} className='px-4 py-2 cursor-pointer hover:bg-zinc-700 flex items-center' onClick={() => handleOptionClick(key)}>
                                <input
                                    type='checkbox'
                                    checked={selectedOptions.includes(option.id)} // Check if the option id is selected
                                    onChange={() => { }}
                                    className='mr-2'
                                />
                                <span className='font-medium'>{key}</span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ExpenseSummary;
