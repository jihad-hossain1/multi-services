import prisma from "@/lib/prismalib";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { content ,name } = await request.json()

  if (!content) {
    return NextResponse.json({ error: "Content not found" }, { status: 404 });
  }

  try {
    const findUnique = await prisma.icon.findFirst({
      where: {
        name: name?.trim().slice(0, 20).toLowerCase(),
      }
    })

    if (findUnique) {
      return NextResponse.json({ error: "Icon Name already exists, please try a different name" }, { status: 400 });
    }

    const createIcon = await prisma.icon.create({
      data: {
        content: content?.trim(),
        name: name?.trim().slice(0, 20).toLowerCase(),
      }
    })

    return NextResponse.json({ result: createIcon }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }

}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  
  try {
    const icons = await prisma.icon.findMany({
      orderBy: {
        id: "desc"
      }
    });
   

    return NextResponse.json({ result: icons }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}