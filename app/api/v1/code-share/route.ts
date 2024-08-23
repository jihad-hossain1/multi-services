// import { osInfos } from "@/helpers/osinfo";
import prisma from "@/lib/prismalib";

import { NextRequest, NextResponse } from "next/server";

const MAC_ADDRESS_LIMIT = 5;
const RESET_INTERVAL_MINUTES = 1;

import os from 'node:os';
 async function osInfos() {
  const os_version =  os.version()
  const os_macadd =  os.networkInterfaces()
  const findmacaddrr:any   = os_macadd['Wi-Fi'] ? os_macadd['Wi-Fi'] : os_macadd['Ethernet'] 

  const osInfo = {
      os_version: os_version as string,
      os_macadd: findmacaddrr[0].mac ? findmacaddrr[0].mac : "No Mac Address",
  }

  return osInfo
}

export async function POST(request: NextRequest) {
    const { code, type } = await request.json();
    const now = new Date();
    const cutoffDate = new Date();
    cutoffDate.setMinutes(cutoffDate.getMinutes() - RESET_INTERVAL_MINUTES);
    
    try {
        const osInfo = await osInfos();
        // Find the existing tracking record
        let macTracking = await prisma.macAddTrack.findUnique({
            where: {
                macadd: osInfo.os_macadd,
            },
        });

        if (!macTracking) {
            // If no tracking record exists, create a new one
            macTracking = await prisma.macAddTrack.create({
                data: {
                    macadd: osInfo.os_macadd,
                    count: 1,
                    lastreset: now,
                },
            });
        } else {
            // Reset count if the last reset was more than 1 minute ago
            if (macTracking.lastreset < cutoffDate) {
                macTracking = await prisma.macAddTrack.update({
                    where: {
                        id: macTracking.id,
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
                        "Link creation limit reached. Please try again later. You can create a new link after the reset period."
                    );
                }

                // Increment the count if within the same reset period
                macTracking = await prisma.macAddTrack.update({
                    where: {
                        id: macTracking.id,
                    },
                    data: {
                        count: macTracking.count + 1,
                        lastused: now,
                    },
                });
            }
        }

        let createCode;

        if (type == "lmTmLnk") {
            createCode = await prisma.lmTmLnk.create({
                data: {
                    link: code,
                    osInfo: osInfo,
                },
            });
        }

        return NextResponse.json({ result: createCode }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 },
        );
    }
}

// export async function POST(request: NextRequest) {
//     const { code, type, osInfo } = await request.json();

//     try {
//         let macTracking = await prisma.macAddTrack.findUnique({
//             where: {
//                 macadd: osInfo.os_macadd,
//             },
//         });


//         if (!macTracking) {
//             // If no tracking record exists, create a new one
//             macTracking = await prisma.macAddTrack.create({
//                 data: {
//                     macadd: osInfo.os_macadd,
//                     count: 1,
//                 },
//             });
//         } else {
          
//             // Check if the limit has been reached
//             if (macTracking.count >= MAC_ADDRESS_LIMIT) {
//                 throw new Error(
//                     "Link creation limit reached. Please try again later. after 24 hours you can create new link.",
//                 );
//             }

//             // If a tracking record exists, update the count
//             await prisma.macAddTrack.update({
//                 where: {
//                     id: macTracking.id,
//                 },
//                 data: {
//                     count: macTracking.count + 1,
//                 },
//             });
//         }

//         let createCode;

//         if (type == "lmTmLnk") {
//             createCode = await prisma.lmTmLnk.create({
//                 data: {
//                     link: code,
//                     osInfo: osInfo,
//                 },
//             });
//         }

//         return NextResponse.json({ result: createCode }, { status: 201 });
//     } catch (error) {
//         return NextResponse.json(
//             { error: (error as Error).message },
//             { status: 500 },
//         );
//     }
// }

export async function PATCH(request: NextRequest) {
    const { code, type, content } = await request.json();

    try {
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

        if (type == "lmTmLnk") {
            updateCode = await prisma.lmTmLnk.update({
                where: {
                    id: findCode?.id,
                },
                data: {
                    content: content,
                },
            });
        }

        return NextResponse.json({ result: updateCode }, { status: 200 });
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
        let result = await prisma.lmTmLnk.findFirst({
            where: {
                link: code as string,
            },
        });
        // if (type == "lmTmLnk") {
        //     result = await prisma.lmTmLnk.findFirst({
        //         where: {
        //             link: code as string,
        //         },
        //     });
        // }

        console.log(result);

        if (!result) {
            return NextResponse.json({
                error: "we can't get any link or content",
            });
        }
        return NextResponse.json({ result: result }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 },
        );
    }
}

// console.log("Code Share route loaded")
