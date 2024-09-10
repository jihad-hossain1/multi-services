import prisma from "@/lib/prismalib";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.nextUrl);

  const userid = searchParams.get("userid") as string;

  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
  const searchTerm = searchParams.get("searchTerm") || "";

  const sortBy = searchParams.get("sortBy");
  const sortOrder = searchParams.get("sortOrder") || "asc";

  const parsedPage = parseInt(page.toString(), 10) || 1;

  const parsedPageSize = parseInt(pageSize.toString(), 10) || 10;
  const parsedSortOrder = (sortOrder as string) || "asc";


    if (!userid) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const findUser = await prisma.user.findUnique({
    where: {
      id: userid,
    },
  });

  if (!findUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (findUser.xrole !== "XADMIN") {
    return NextResponse.json({ error: "User not allowed" }, { status: 403 });
  }


  let where = {};
  if (searchTerm) {
    const searchFields = ["name", "email"];
    where = {
      OR: searchFields.map((field) => ({
        [field]: { contains: searchTerm.toLowerCase() },
      })),
    };
  }

  let orderBy: { [key: string]: "asc" | "desc" } = {};

  if (sortBy && sortOrder) {
    orderBy[sortBy] = parsedSortOrder.toLowerCase() === "asc" ? "asc" : "desc";
  }

  let offset = 0;

  if (parsedPage > 1 && !searchTerm) {
    offset = (parsedPage - 1) * parsedPageSize;
  }

  const [data, total] = await Promise.all([
    prisma.user.findMany({
      where: {
        AND: [
          where
        ],
      },
      orderBy,
      skip: offset,
      take: parsedPageSize,
    }),
    prisma.user.count({
      where: {
        AND: [
          where
        ],
      },
    }),
  ]);

console.log("data", { data, meta: {
    total,
    page: parsedPage,
    pageSize: parsedPageSize,
  }})

//   const users = await prisma.user.findMany({});

  return NextResponse.json({ data, meta: {
    total,
    page: parsedPage,
    pageSize: parsedPageSize,
  } }, { status: 200 });
}

export async function PATCH(request: NextRequest) {
  const { userid, upId, xrole, status, verify } = await request.json();

  if (!userid) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const findUser = await prisma.user.findUnique({
    where: {
      id: userid,
    },
  });

  if (!findUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (findUser.xrole !== "XADMIN") {
    return NextResponse.json({ error: "User not allowed" }, { status: 403 });
  }

  const findUserUpdate = await prisma.user.update({
    where: {
      id: upId,
    },
    data: {
      xrole,
      status,
      verify,
    },
  });

  if (!findUserUpdate) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ result: findUserUpdate }, { status: 200 });
}
