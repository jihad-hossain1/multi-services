import prisma from "../../../../prisma";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { code, type } = await request.json();

    try {
        let createCode;

        if (type == "lmTmLnk") {
            createCode = await prisma.lmTmLnk.create({
                data: {
                    link: code,
                },
            });
        }

        return NextResponse.json({ result: createCode }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 },
        );
    }
}

export async function PATCH(request: NextRequest) {
    const { code, type, content } = await request.json();

    try {
        let updateCode;

        const findCode = await prisma.lmTmLnk.findFirst({
            where: {
                link: code as string,
            },
        });

        if (!findCode) {
            return NextResponse.json(
                { error: "Code not found" },
                { status: 404 },
            );
        }

        if (type == "lmTmLnk") {
            updateCode = await prisma.lmTmLnk.update({
                where: {
                    id: findCode?.id,
                },
                data: {
                    content: content,
                },
            });
        }

        return NextResponse.json({ result: updateCode }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 },
        );
    }
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const type = searchParams.get("type");

    try {
        let result = await prisma.lmTmLnk.findFirst({
            where: {
                link: code as string
            }
        })
        // if (type == "lmTmLnk") {
        //     result = await prisma.lmTmLnk.findFirst({
        //         where: {
        //             link: code as string,
        //         },
        //     });
        // }

        console.log(result)

        if(!result){
            return NextResponse.json({error: "we can't get any link or content"})
        }
        return NextResponse.json({ result: result }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 },
        );
    }
}

// console.log("Code Share route loaded")