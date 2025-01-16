'use client';

import React from 'react';
import useFetch from '@/helpers/hook/fetch/useFetch';
import useAuth from '@/helpers/hook/useAuth';
import { ExpenseSchemaType } from '@/helpers/schemas/schemas';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, LineElement, PointElement, ArcElement } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, LineElement, PointElement, ArcElement);

const ExpenseReports = () => {
    const { auth } = useAuth();
    const [year, setYear] = React.useState(new Date().getFullYear()); // Default to current year
    const [chartType, setChartType] = React.useState('Bar'); // Default to Bar chart
    const { error, isLoading, responseData: expenses } = useFetch({
        apiEndpoint: "/api/v1/expense/reports",
        queryParms: `?userId=${auth?.userId}&year=${year}`, // Send year as a parameter
        shouldFetch: () => !!auth?.userId,
    });

    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setYear(Number(e.target.value));
    };

    const handleChartTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setChartType(e.target.value);
    };

    // Prepare data for the chart
    const chartData = React.useMemo(() => {
        if (!expenses?.result?.data) return null;

        // Aggregate data by month
        const monthlyExpenses = Array(12).fill(0);
        expenses?.result?.data?.forEach((expense: ExpenseSchemaType) => {
            const expenseDate = new Date(expense?.xdate as any); // Replace with your date field
            const monthIndex = expenseDate.getMonth(); // Get month (0 for January, 11 for December)
            monthlyExpenses[monthIndex] += expense?.amount; // Sum amounts for each month
        });

        return {
            labels: [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December',
            ],
            datasets: [
                {
                    label: `Expenses for ${year}`,
                    data: monthlyExpenses,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)',
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                    ],
                    borderWidth: 1,
                },
            ],
        };
    }, [expenses, year]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => `${context.raw} tk.`, // Customize tooltip for currency
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    const ChartComponent = chartType === 'Bar' ? Bar : chartType === 'Line' ? Line : Pie;

    return (
        <div className='bg-zinc-800 p-4 rounded-md shadow-xl drop-shadow'>
            <h4>Expense Reports</h4>

            <div className='flex flex-col gap-4 mt-4'>
                <div className='flex gap-4'>
                    <label htmlFor="yearPicker">Select Year:</label>
                    <input
                        type="number"
                        id="yearPicker"
                        value={year}
                        onChange={handleYearChange}
                        min="2000"
                        max={new Date().getFullYear()}
                        className='border border-zinc-100 bg-inherit rounded-md px-2 text-center'
                    />
                </div>
                <div className='flex gap-4'>
                    <label htmlFor="chartType">Select Chart Type:</label>
                    <select style={{ width: "100px" }} id="chartType" value={chartType} onChange={handleChartTypeChange} className='text-zinc-400 border border-zinc-100 bg-inherit bg-zinc-700 rounded-md px-2 '>
                        <option value="Bar">Bar</option>
                        <option value="Line">Line</option>
                        <option value="Pie">Pie</option>
                    </select>
                </div>
                {isLoading && <div>
                    <div className="flex items-center justify-center h-screen">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-400"></div>
                    </div>
                </div>}
                <div className='flex justify-center'>

                    {chartData && (
                        <div className='w-full max-sm:h-fit lg:max-h-[600px]'>
                            <ChartComponent data={chartData} options={options} />
                        </div>
                    )}
                </div>

                {error?.message && <p style={{ color: 'red' }}>Error: {error?.message}</p>}
            </div>
        </div>
    );
};

export default ExpenseReports;
