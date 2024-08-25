import prisma from "@/lib/prismalib";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';

const validateField = (value: string,fieldname: string, max?: number) => {
    if(value === undefined || value === null || value.trim() === "" || !value) {
        throw new Error(`${fieldname} is required`);
    }

    if(max && value.length > max) {
        throw new Error(`${fieldname} must be less than ${max} characters`);
    }
}


const findUser = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if(user) {
        throw new Error("User not not allowed, already found")
    }
    
}



export async function POST(request: NextRequest) {
    const {name, email, password} = await request.json();

    try {

        validateField( name, "name");
        validateField(email, "email");
        validateField(password, "password",20);


        await findUser(email);
        
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