import prisma from "@/lib/prismalib";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.nextUrl);
  const userid = searchParams.get("userid") as string;

  // console.log("user id", userid);
  try {
    const result = await prisma.uLink.findMany({
      where: {
        authorId: userid,
      },
    });
    // console.log("🚀 ~ GET ~ result:", result)

    return NextResponse.json({ result: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
