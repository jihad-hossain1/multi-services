import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Extract downloadUrl and filename from the request body
    const { downloadUrl, filename } = await request.json();

    // Fetch the file from the download URL
    const response = await axios({
      url: downloadUrl,
      method: "GET",
      responseType: "stream",
    });

    // Set response headers
    const headers = {
      "Content-Type": response.headers["content-type"],
      "Content-Disposition": `attachment; filename="${filename}"`,
    };

    // Create a PassThrough stream to pipe the response data
    const { PassThrough } = require("stream");
    const passThrough = new PassThrough();

    response.data.pipe(passThrough);

    return new NextResponse(passThrough, { headers });
  } catch (error: any) {
    console.error("Download error", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
