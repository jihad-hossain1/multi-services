
import prisma from "../../../../../lib/prismalib";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

  
    if(!email || !password || email?.trim() == '' || password?.trim() == '' || email == null || password == null ) {
      return NextResponse.json(
        { error: "Email and password are required."},
        { status: 400 }
      )
    }
    const findUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!findUser) {
      return NextResponse.json(
        { error: "Email not found.", message: "Email not found." },
        { status: 404 }
      );
    }

    const passwordMatch = await bcrypt.compare(password, findUser.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Incorrect password.", message: "Incorrect password." },
        { status: 401 }
      );
    }

    if (findUser?.verify === "PENDING") {
      return NextResponse.json(
        {
          error: "User not verifyed",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { result: findUser, message: "Login successful." },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error, message: error?.message },
      { status: 500 }
    );
  }
}