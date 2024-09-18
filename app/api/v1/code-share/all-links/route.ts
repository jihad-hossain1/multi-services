import { buildSearchQuery, parseQueryParams } from "@/helpers/paginationHelper";
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
    const searchFields = ["xname", "status"];
    where = {
      OR: searchFields.map((field) => ({
        [field]: { contains: searchTerm.toLowerCase() },
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
        orderBy,
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
    
    // const result = await prisma.uLink.findMany({
    //   where: {
    //     authorId: userid,
    //   },
    // });


    return NextResponse.json({ data: data,meta: { total: total ,page: parsedPage, pageSize: parsedPageSize} }, { status: 200 });

}