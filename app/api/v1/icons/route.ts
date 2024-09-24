import prisma from "@/lib/prismalib";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { content ,name} = await request.json()

  if (!content) {
    return NextResponse.json({ error: "Content not found" }, { status: 404 });
  }

  try {
    const createIcon = await prisma.icon.create({
      data: {
        content: content?.trim(),
        name: content?.trim().slice(0, 20).replace(/ /g, "-").toLowerCase(),
      }
    })

    return NextResponse.json({ result: createIcon }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }

}

export async function GET() {
  try {
    const icons = await prisma.icon.findMany({
        orderBy: {
            count: "asc",

        }
    });

    return NextResponse.json({ result: icons }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}