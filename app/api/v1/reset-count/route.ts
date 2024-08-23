import prisma from "@/lib/prismalib";
import { NextRequest, NextResponse } from "next/server";

const RESET_INTERVAL_MINUTES = 1;

export async function POST(req: NextRequest) {
  try {
    const now = new Date();
    const cutoffDate = new Date();
    cutoffDate.setMinutes(cutoffDate.getMinutes() - RESET_INTERVAL_MINUTES);

    const recordsToUpdate = await prisma.macAddTrack.findMany({
      where: {
        lastreset: {
          lt: cutoffDate,
        },
      },
    });

    if (recordsToUpdate.length > 0) {
      await prisma.macAddTrack.updateMany({
        where: {
          id: {
            in: recordsToUpdate.map(record => record.id),
          },
        },
        data: {
          count: 0,
          lastreset: now,
        },
      });
      console.log('Counts reset if needed successfully');
    }

    return NextResponse.json({ message: 'Counts reset if needed' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
