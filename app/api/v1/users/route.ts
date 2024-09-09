import prisma from "@/lib/prismalib";
import { NextRequest, NextResponse } from "next/server";



export async function GET(request: NextRequest) {

    const {searchParams} = new URL(request.nextUrl);

    const userid = searchParams.get("userid") as string;

    if(!userid){
        return NextResponse.json({error: "User not found"}, {status: 404})
    }

    const findUser = await prisma.user.findUnique({
        where: {
            id: userid
        }
    })

    if(!findUser) {
        return NextResponse.json({error: "User not found"}, {status: 404})
    }

    if(findUser.xrole !== 'XADMIN') {
        return NextResponse.json({error: "User not allowed"}, {status: 403})
    }

    const users = await prisma.user.findMany({})


    return NextResponse.json({result:users}, {status: 200})

}

export async function PATCH(request: NextRequest) {
   const {userid,upId, xrole, status, verify} = await request.json();

    if(!userid){
        return NextResponse.json({error: "User not found"}, {status: 404})
    }

    const findUser = await prisma.user.findUnique({
        where: {
            id: userid
        }
    })

    if(!findUser) {
        return NextResponse.json({error: "User not found"}, {status: 404})
    }

    if(findUser.xrole !== 'XADMIN') {
        return NextResponse.json({error: "User not allowed"}, {status: 403})
    }

    const findUserUpdate = await prisma.user.update({
        where: {
            id: upId
        },
        data: {
            xrole,
            status,
            verify
        }
    })

    if(!findUserUpdate) {
        return NextResponse.json({error: "User not found"}, {status: 404})
    }

    return NextResponse.json({result:findUserUpdate}, {status: 200})
}

