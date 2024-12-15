import { ExpenseCategory } from "@/helpers/schemas/schemas";
import { validateRequest,validateActionRequest } from "@/helpers/middleware/validateRequest";
import prisma from "@/lib/prismalib";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const reqFromBody = await req.json();
    console.log("🚀 ~ POST ~ reqFromBody:", reqFromBody)
    try {
        // const { isValid, message } = await validateActionRequest({ req, userId: reqFromBody?.xuserid });


        // if (!isValid) {
        //     return NextResponse.json(
        //         { error: message },
        //         { status: message == "wrong" ? 500 : 401 },
        //     );
        // }

        const parsedData = ExpenseCategory.safeParse({name: reqFromBody?.name, xuserid: reqFromBody?.xuserid});


        if (!parsedData.success) {
            return NextResponse.json(
                { erorr: parsedData.error.errors },
                { status: 400 },
            );
        }

        const { name, xuserid, } = parsedData?.data;

        const uniqueNameFind = await prisma.expensecat.findUnique({
            where: {
                xuserid_name: {
                    xuserid: xuserid?.toString() as string,
                    name: name?.trim()?.toLowerCase(),
                },
            },
        });

        if (uniqueNameFind) {
            return NextResponse.json(
                { error: "name already used" },
                { status: 400 },
            );
        }

        const createExpenseCat = await prisma.expensecat.create({
            data: {
                name: name.trim(),
                xuserid: xuserid?.toString() as string,
                xdate: new Date(),
            },
        });

        return NextResponse.json({ result: createExpenseCat }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 },
        );
    }
}

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const userId = searchParams.get("userId");

    try {
        const { isValid, message } = await validateRequest(userId);

        if (!isValid) {
            return NextResponse.json(
                { error: message },
                { status: message == "wrong" ? 500 : 401 },
            );
        }
        
        if (!userId) {
            return NextResponse.json({
                error: "Not allow, require query needed",
            });
        }

        const getCategories = await prisma.expensecat.findMany({
            where: {
                xuserid: userId,
            },
            select: {
                id: true,
                name: true,
            },
        });

        return NextResponse.json({ result: getCategories }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 },
        );
    }
}
