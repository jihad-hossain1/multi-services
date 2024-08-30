import prisma from '../../../../../lib/prismalib';

import { sendEmails , mailBody} from "../../../../../helpers/sendMail";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
    const { email, vcode,sendAgain } = await request.json();

    try {
        const user = await prisma.user.findFirst ({
            where: {
                email: email,
            }
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found." },
                { status: 404 },
            );
        }


       if(sendAgain == 'sendAgain'){
         // check already active account
         if (user?.verify === "VERIFIED") {
            return NextResponse.json(
                {
                    error: "User already verified.",
                    message: "User already verified.",
                },
                { status: 404 },
            );
        }

        const randomNumber = Math.floor(100000 + Math.random() * 9000).toString();
        const verify = await prisma.user.update(
            {
                where: {
                    email: email
                },
                data: {
                    xcode: randomNumber
                }
            }
        );

        const htmlBody = mailBody({ code: verify.xcode, email: verify.email });

        // Send verification code
           await sendEmails(
            verify?.email,
            "Verification Code",
            htmlBody,
        );
        

        return NextResponse.json(
            { result: "success", message: "Code sent successfully. Please check your email." },
            { status: 200 },
        );
       }else{
        
         // check already active account
         if (user?.verify === "VERIFIED") {
            return NextResponse.json(
                {
                    error: "User already verified.",
                    message: "User already verified.",
                },
                { status: 404 },
            );
        }

        if (user?.xcode !== vcode) {
            return NextResponse.json(
                { error: "Code not matched.", message: "Code not matched." },
                { status: 404 },
            );
        }

        const verify = await prisma.user.update(
            {
                where: {
                    email: email
                },
                data: {
                    verify: "VERIFIED"
                }
            }
        );

        if (!verify) {
            return NextResponse.json(
                { error: "User not found.", message: "User not found." },
                { status: 404 },
            );
        }

        return NextResponse.json(
            { result: "success", message: "User verified." },
            { status: 200 },
        );
       }
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 },
        );
    }
}
