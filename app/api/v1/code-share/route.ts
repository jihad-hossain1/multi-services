// import { osInfos } from "@/helpers/osinfo";
import prisma from "@/lib/prismalib";
import { NextRequest, NextResponse } from "next/server";

const MAC_ADDRESS_LIMIT = 5;
const SAVED_USER_LIMIT = 20;
const RESET_INTERVAL_MINUTES = 1;
const RESET_INTERVAL_HOURS = 24;

export async function POST(request: NextRequest) {
    const { code, type, osInfo, uid, userid } = await request.json();
    console.log("🚀 ~ POST ~ { code, type, osInfo, uid, userid }:", { code, type, osInfo, uid, userid })

    // generate date
    const now = new Date();
    const cutoffDate = new Date();

    // reset every 24 hour
    cutoffDate.setHours(cutoffDate.getHours() - RESET_INTERVAL_HOURS);

    try {
        if (type == "lmTmLnk") {
            // const osInfo = await osInfos();
            // Find the existing tracking record
            let macTracking = await prisma.macAddTrack.findFirst({
                where: {
                    macadd: osInfo.os_macadd,
                    uid: uid,
                },
            });
            // console.log("🚀 ~ POST ~ macTracking:", macTracking)

            if (!macTracking) {
                // If no tracking record exists, create a new one
                macTracking = await prisma.macAddTrack.create({
                    data: {
                        macadd: osInfo.os_macadd,
                        count: 1,
                        lastreset: now,
                        uid: uid,
                    },
                });
                // console.log("🚀 ~ POST ~ macTracking:", macTracking)
            } else {
                // Reset count if the last reset was more than 1 minute ago
                if (macTracking.lastreset < cutoffDate) {
                    macTracking = await prisma.macAddTrack.update({
                        where: {
                            id: macTracking.id,
                            uid: uid,
                        },
                        data: {
                            count: 1, // Reset count to 1 (starting a new period)
                            lastreset: now,
                        },
                    });
                } else {
                    // Check if the limit has been reached
                    if (macTracking.count >= MAC_ADDRESS_LIMIT) {
                        throw new Error(
                            "Link creation limit reached. Please try again later. You can create a new link after the reset period at 24 hours",
                        );
                    }

                    // Increment the count if within the same reset period
                    macTracking = await prisma.macAddTrack.update({
                        where: {
                            id: macTracking.id,
                            uid: uid,
                        },
                        data: {
                            count: macTracking.count + 1,
                            lastused: now,
                        },
                    });
                }
            }

            let createCode = await prisma.lmTmLnk.create({
                data: {
                    link: code,
                    osInfo: osInfo,
                    uid: uid,
                },
            });

            return NextResponse.json({ result: createCode }, { status: 201 });
        } 
        else {
            const findUser = await prisma.user.findFirst({
                where: {
                    id: userid,
                    // email: "jihadkhan934@gmail.com"
                },
            });

            // if (findUser?.count as number >= SAVED_USER_LIMIT) {
            //     return NextResponse.json(
            //         {
            //             error: "Link creation limit reached. Please try to update your limit.",
            //         },
            //         { status: 400 },
            //     );
            // }


            const createPermanent = await prisma.uLink.create({
                data: {
                    link: code,
                    authorId: userid,
                },
            });


             await prisma.user.update({
                where: {
                    id: userid,
                },
                data: {
                    count: findUser?.count as number + 1,
                },
            });

            return NextResponse.json(
                { result: createPermanent },
                { status: 201 },
            );
        }
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 },
        );
    }
}


export async function PATCH(request: NextRequest) {
    const { code, type, content, xname, userid, status, secure } = await request.json();
    console.log("🚀 ~ PATCH ~ { code, type, content, xname, userid, status, secure }:", { code, type, content, xname, userid, status, secure })

    try {
        if (type == "lmTmLnk") {
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

            updateCode = await prisma.lmTmLnk.update({
                where: {
                    id: findCode?.id,
                },
                data: {
                    content: content,
                },
            });

            return NextResponse.json({ result: updateCode }, { status: 200 });
        }else {
            const findCode = await prisma.uLink.findFirst({
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

            const updateCode = await prisma.uLink.update({
                where: {
                    id: findCode?.id,
                },
                data: {
                    content: content,
                    xname: xname,
                    status: status,
                    secure: secure
                },
            });

            return NextResponse.json({ result: updateCode }, { status: 200 });
        }

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
        
        if (type == "lmTmLnk") {

            let result = await prisma.lmTmLnk.findFirst({
                where: {
                    link: code as string,
                },
            });

            result = await prisma.lmTmLnk.findFirst({
                where: {
                    link: code as string,
                },
            });

            console.log(result);

            if (!result) {
                return NextResponse.json({
                    error: "we can't get any link or content",
                });
            }
            return NextResponse.json({ result: result }, { status: 201 });
        }else{
            const result = await prisma.uLink.findFirst({
                where: {
                    link: code as string,
                },
            })
            console.log("🚀 ~ GET ~ result:", result)

            if (!result) {
                return NextResponse.json({
                    error: "we can't get any link or content",
                });
            }
            return NextResponse.json({ result: result }, { status: 200 });
        }

      
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 },
        );
    }
}

