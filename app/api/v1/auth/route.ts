import prisma from "../../../../prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
    const {name, email, password} = await request.json();

    try {

        const hashedPassword = await bcrypt.hash(password, 10);
              // Generate verification code
      const randomNumber = Math.floor(100000 + Math.random() * 9000).toString();

        const createUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                xcode: randomNumber
            }
        })


        return NextResponse.json({ result: createUser }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}