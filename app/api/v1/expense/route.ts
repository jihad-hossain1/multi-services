import { ExpenseSchema } from "@/helpers/schemas/schemas";
import {
    validateActionRequest,
    validateRequest,
} from "@/helpers/middleware/validateRequest";
import prisma from "@/lib/prismalib";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const userId = searchParams.get("userId");
    const formDate = searchParams.get("fromDate");
    const toDate = searchParams.get("toDate");
    const searchTerm = searchParams.get("searchTerm") || "";
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";
    const filterby = searchParams.get("filterby") || "";


    const { isValid, message } = await validateRequest(userId);

    if (!isValid) {
        return NextResponse.json(
            { error: message },
            { status: message == "wrong" ? 500 : 401 },
        );
    }

    const parsedPage = parseInt(page.toString(), 10) || 1;
    const parsedPageSize = parseInt(limit.toString(), 10) || 10;

    const findCat = await prisma.expensecat.findFirst({
        where: {
            xuserid: userId as string,
            name: filterby,
        },
    });

    let where: any = {};
    if (searchTerm) {
        const searchFields = ["title"];
        where = {
            OR: searchFields.map((field) => ({
                [field]: { contains: searchTerm.toLowerCase() },
            })),
        };
    }

    if (filterby) {
        where.catid = findCat?.id;
    }

    // Date filter handling: Normalize the date to include the entire toDate.
    if (formDate && toDate) {
        // Parse and normalize dates
        const parsedFromDate = new Date(formDate);
        const parsedToDate = new Date(toDate);

        // Set to 23:59:59 for `toDate` to ensure full day coverage
        parsedToDate.setHours(23, 59, 59, 999);

        where.xdate = {
            gte: parsedFromDate, // Greater than or equal to formDate
            lte: parsedToDate, // Less than or equal to toDate (end of the day)
        };
    }

    let offset = 0;

    if (parsedPage > 1 && !searchTerm) {
        offset = (parsedPage - 1) * parsedPageSize;
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
        skip: offset,
        take: parsedPageSize,
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

    return NextResponse.json(
        {
            result: {
                meta: {
                    total: count,
                    page: parsedPage,
                    limit: parsedPageSize,
                },
                data,
            },
        },
        {
            status: 200,
        },
    );
}

export async function POST(req: NextRequest) {
    const reqFromBody = await req.json();

    try {
        const { isValid, message } = await validateActionRequest({
            req,
            userId: reqFromBody?.xuserid,
        });

        if (!isValid) {
            return NextResponse.json(
                { error: message },
                { status: message == "wrong" ? 500 : 401 },
            );
        }

        const parsedData = ExpenseSchema.safeParse({
            ...reqFromBody,
            xdate: new Date(reqFromBody?.xdate),
        });

        if (!parsedData.success) {
            return NextResponse.json(
                { erorr: parsedData.error.errors },
                { status: 400 },
            );
        }

        const { amount, payment, title, catid, note, xuserid, xdate } =
            parsedData.data;

        const createExpense = await prisma.expense.create({
            data: {
                amount,
                payment: payment == "CARD" ? "CARD" : "CASH",
                title: title?.trim(),
                catid: catid?.toString() as string,
                note: note?.trim(),
                xuserid: xuserid?.toString() as string,
                xdate: xdate ? new Date(xdate as Date) : new Date(),
            },
        });

        return NextResponse.json({ result: createExpense }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 },
        );
    }
}
