import { validateRequest } from "@/helpers/middleware/validateRequest";
import prisma from "@/lib/prismalib";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const userId = searchParams.get("userId");
    const filterby = searchParams.get("filterby") || "";
    const year = searchParams.get("year"); // Add a parameter for the year

    try {
        // Validate authorize user to access this route
        const { isValid, message } = await validateRequest(userId);
        if (!isValid) {
            return NextResponse.json(
                { error: message },
                { status: message === "wrong" ? 500 : 401 },
            );
        }

        const findCat = await prisma.expensecat.findFirst({
            where: {
                xuserid: userId as string,
                name: filterby,
            },
        });

        let where: any = {};

        if (filterby) {
            where.catid = findCat?.id;
        }

        if (year) {
            const yearNumber = parseInt(year, 10); // Convert the year to a number
            if (!isNaN(yearNumber) && yearNumber >= 2000 && yearNumber <= new Date().getFullYear()) {
                where.xdate = {
                    gte: new Date(yearNumber, 0, 1), // Start of the year
                    lt: new Date(yearNumber + 1, 0, 1), // Start of the next year
                };
            } else {
                return NextResponse.json(
                    { error: "Invalid year parameter" },
                    { status: 400 },
                );
            }
        }

        const data = await prisma.expense.findMany({
            where: {
                AND: [
                    where,
                    {
                        xuserid: {
                            in: [userId],
                        },
                    },
                ],
            },
            include: {
                category: {
                    select: {
                        name: true,
                    },
                },
            },
            orderBy: {
                id: "desc",
            },
        });

        const count = await prisma.expense.count({
            where: {
                AND: [
                    where,
                    {
                        xuserid: {
                            in: [userId],
                        },
                    },
                ],
            },
        });

        const totalExpense = await prisma.expense.aggregate({
            _sum: {
                amount: true, // Replace "amount" with the correct field for expense values
            },
            where: {
                AND: [
                    where,
                    {
                        xuserid: {
                            in: [userId],
                        },
                    },
                ],
            },
        });

        return NextResponse.json(
            {
                result: {
                    meta: {
                        total: count,
                        totalExpense: totalExpense._sum.amount || 0, // Handle null case
                    },
                    data,
                },
            },
            {
                status: 200,
            },
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 },
        );
    }
}
