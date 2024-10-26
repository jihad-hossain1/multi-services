import prisma from "@/lib/prismalib";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
 return NextResponse.json({ message: "Method Allowed" }, { status: 405 });
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const linkId = params.id;

    const { active } = await request.json();

    try {

        const findLink = await prisma.uLink.findUnique({
            where: {
                id: linkId
            }
        })

        if (!findLink) {
            return NextResponse.json(
                { error: "Link not found" },
                { status: 404 },
            );
        }

        await prisma.uLink.update({
            where: {
                id: linkId
            },
            data: {
                fav: active
            }
        })

        return NextResponse.json({ message: "Link updated successfully" , result: "success" }, { status: 200 });
    } catch (error) {

        return NextResponse.json({ error: (error as Error).message }, { status: 405 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const linkId = params.id;

    const { authorId } = await request.json();

    try {
        const findLink = await prisma.uLink.findUnique({
            where: {
                id: linkId
            }
        })

        if (!findLink) {
            return NextResponse.json(
                { error: "Link not found" },
                { status: 404 },
            );
        }

        // check if user is author of link
        if (findLink.authorId !== authorId) {
            return NextResponse.json(
                { error: "You are not the author of this link" },
                { status: 403 },
            );
        }

        await prisma.uLink.delete({
            where: {
                id: linkId
            }
        })

        return NextResponse.json({ message: "Link deleted successfully", result: "success" }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            {
                error: (error as Error).message
            },
            {
                status: 500
            }
        )
    }

}