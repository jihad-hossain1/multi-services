import { validateRequest } from "@/helpers/middleware/validateRequest";
import prisma from "@/lib/prismalib";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    const summaryId = searchParams.get("summaryId");
    const _summary = searchParams.get("summary");
    const group = searchParams.get("group");
    const fromDate = searchParams.get("from");
    const toDate = searchParams.get("to");
    const stringified = group ? JSON.parse(group) : [];

    try {
        const { isValid, message } = await validateRequest(userId);

        if (!isValid) {
            return NextResponse.json(
                { error: message },
                { status: message == "wrong" ? 500 : 401 },
            );
        }

        if (_summary == "summary") {
            const where = {
                xuserid: (userId),
                catid: (summaryId),
            } as any;

            if (fromDate && toDate) {
                const from = new Date(fromDate);
                const to = new Date(toDate);

                to.setHours(23, 59, 59, 999);

                const xdate = {
                    gte: from,
                    lte: to,
                };
                where.xdate = xdate;
            }

            const result = await prisma.expense.findMany({
                where,
                include: {
                    category: {
                        select: {
                            name: true,
                            id: true,
                        },
                    },
                },
                orderBy: {
                    xdate: "desc",
                },
            });
            return NextResponse.json({ result: result }, { status: 200 });
        }

        const where = { xuserid: (userId) } as any;

        if (stringified.length > 0) {
            where.catid = {
                in: stringified,
            };
        }

        if (fromDate && toDate) {
            const from = new Date(fromDate);
            const to = new Date(toDate);

            to.setHours(23, 59, 59, 999);

            const xdate = {
                gte: from,
                lte: to,
            };
            where.xdate = xdate;
        }

        const result = await prisma.expense.findMany({
            where,
            include: {
                category: {
                    select: {
                        name: true,
                        id: true,
                    },
                },
            },
            orderBy: {
                xdate: "desc",
            },
        });

        const calculateTotal = result?.reduce((acc: any, expense: any) => {
            return acc + expense.amount;
        }, 0);

        const summaryList = await prisma.expense.findMany({
            where: {
                xuserid: (userId)?.toString(),
            },
            include: {
                category: {
                    select: {
                        name: true,
                        id: true,
                    },
                },
            },
            orderBy: {
                xdate: "desc",
            },
        });

        return NextResponse.json(
            {
                summary: aggregateData(result),
                summaryList: aggregateData(summaryList),
                totalAmount: calculateTotal,
            },
            { status: 200 },
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 },
        );
    }
}

const aggregateData = (isData: any) => {
    const details = isData?.reduce((acc: any, expense: any) => {
        const categoryName = expense.category?.name || "Unknown";
        const categoryId = expense.category?.id || "unknown";

        if (acc[categoryName]) {
            acc[categoryName].amount += expense.amount;
        } else {
            acc[categoryName] = {
                amount: expense.amount,
                id: categoryId,
            };
        }

        return acc;
    }, {});

    return details;
};
