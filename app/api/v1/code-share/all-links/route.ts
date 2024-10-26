import prisma from "@/lib/prismalib";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.nextUrl);
  const userid = searchParams.get("userid") as string;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
  const searchTerm = searchParams.get("searchTerm") || "";


  const sortBy = searchParams.get("sortBy")
  const sortOrder = searchParams.get("sortOrder") || "asc";

  const parsedPage = parseInt(page.toString(), 10) || 1;

  const parsedPageSize = parseInt(pageSize.toString(), 10) || 10;
  const parsedSortOrder = (sortOrder as string) || "asc";

  let where = {};
  if (searchTerm) {
    const searchFields = ["xname"];
    where = {
      OR: searchFields.map((field) => ({
        [field]: { contains: searchTerm , mode: "insensitive" },
      })),
    };
  }

  let orderBy: { [key: string]: "asc" | "desc" } = {};

  if (sortBy && sortOrder) {
    orderBy[sortBy] =
      parsedSortOrder.toLowerCase() === "asc" ? "asc" : "desc";
  }

  let offset = 0;

  if (parsedPage > 1 && !searchTerm) {
    offset = (parsedPage - 1) * parsedPageSize;
  }

    const [data, total] = await Promise.all([
      prisma.uLink.findMany({
        where: {
          AND: [
            where,
            {
              authorId: {
                in: [userid],
              },
            },
          ],
        },
        orderBy: orderBy,
        skip: offset,
        take: parsedPageSize,
      }),
      prisma.uLink.count({
        where: {
          AND: [
            where,
            {
              authorId: {
                in: [userid],
              },
            },
          ],
        },
      }),
    ]);


    const _data = sortLists(data, parsedSortOrder);


  return NextResponse.json({ data: _data, meta: { total: total ,page: parsedPage, pageSize: parsedPageSize} }, { status: 200 });

}

function sortLists(lists: any,order = 'desc') {
  return lists?.sort((a:any, b:any) => {
    // Sort based on fav field
    if (order === 'desc') {
      return (a?.fav ? 1 : 0) - (b?.fav ? 1 : 0); // Non-empty favs come after empty favs
    } else {
      return (b?.fav ? 1 : 0) - (a?.fav ? 1 : 0); // Non-empty favs come before empty favs
    }
  });
}
