import { buildSearchQuery, parseQueryParams } from "@/helpers/paginationHelper";
import prisma from "@/lib/prismalib";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.nextUrl);
  const userid = searchParams.get("userid") as string;
  // const page = parseInt(searchParams.get("page") || "1", 10);
  // const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
  // const searchTerm = searchParams.get("searchTerm") || "";


  // const sortBy = searchParams.get("sortBy")
  // const sortOrder = searchParams.get("sortOrder") || "asc";

  // const parsedPage = parseInt(page.toString(), 10) || 1;

  // const parsedPageSize = parseInt(pageSize.toString(), 10) || 10;
  // const parsedSortOrder = (sortOrder as string) || "asc";

  // let where = {};
  // if (searchTerm) {
  //   const searchFields = ["xdesc", "xcategory"];
  //   where = {
  //     OR: searchFields.map((field) => ({
  //       [field]: { contains: searchTerm.toLowerCase() },
  //     })),
  //   };
  // }

  // let orderBy: { [key: string]: "asc" | "desc" } = {};

  // if (sortBy && sortOrder) {
  //   orderBy[sortBy] =
  //     parsedSortOrder.toLowerCase() === "asc" ? "asc" : "desc";
  // }

  // let offset = 0;

  // if (parsedPage > 1 && !searchTerm) {
  //   offset = (parsedPage - 1) * parsedPageSize;
  // }
  // try {
  //   const [data, total] = await Promise.all([
  //     prisma.uLink.findMany({
  //       where: {
  //         AND: [
  //           where,
  //           {
  //             authorId: {
  //               in: [userid],
  //             },
  //           },
  //         ],
  //       },
  //       orderBy,
  //       skip: offset,
  //       take: parsedPageSize,
  //     }),
  //     prisma.uLink.count({
  //       where: {
  //         AND: [
  //           where,
  //           {
  //             authorId: {
  //               in: [userid],
  //             },
  //           },
  //         ],
  //       },
  //     }),
  //   ]);
    const result = await prisma.uLink.findMany({
      where: {
        authorId: userid,
      },
    });
    console.log("🚀 ~ GET ~ result:", result)

    return NextResponse.json({ result: result }, { status: 200 });
    // return NextResponse.json({
    //   meta: {
    //     total,
    //     page: parsedPage,
    //     limit: parsedPageSize,
    //   },
    //   data,
    //   // allData,
    // });
  // } catch (error) {
  //   return NextResponse.json(
  //     { error: (error as Error).message },
  //     { status: 500 },
  //   );
  // }
}

// import { buildSearchQuery, parseQueryParams } from "@/helpers/paginated-helper";
// import connectMongoDB from "@/lib/mongodb";
// import Blog from "@/models/blog";
// import { SubCategory } from "@/models/category";
// import { NextResponse } from "next/server";

// export async function GET(req) {
//   const { searchParams } = new URL(req.url);
//   const searchTerm = searchParams.get("searchTerm") || "";

//   try {
//     const { page, pageSize, sortBy, sortOrder,category,catId } =
//       parseQueryParams(searchParams);
//     // Define the fields you want to search through
//     const searchFields = ["articleTitle", "articleCategory"];
//     const searchQuery = buildSearchQuery(searchTerm, searchFields);
//     const skip = (page - 1) * pageSize;

//     await connectMongoDB();

//     let blogs;
//     const totalDocuments = await Blog.countDocuments(searchQuery);
//      blogs = await Blog.find(searchQuery)
//       .sort({ [sortBy]: sortOrder })
//       .skip(skip)
//       .limit(pageSize);

//       const findCategory = await SubCategory.findOne({
//         name: category
//       })

//     if(category){
//       blogs = await Blog.find({
//         $or: [
//           // { articleCategory: category?.toLowerCase() },
//           { catId: findCategory?.uid }
//         ]
//       })
//       console.log("🚀 ~ GET ~ blogs:", blogs)
//     }

//     return NextResponse.json({
//       meta: {
//         total: totalDocuments,
//         page,
//         limit: pageSize,
//       },
//       data: blogs,
//     });
//   } catch (error) {
//     console.error("Error fetching blog posts:", error);
//     return NextResponse.error();
//   }
// }
