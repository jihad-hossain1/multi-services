import { NextRequest, NextResponse } from "next/server";

export async function GET(request) {
  return NextResponse.json({ message: "Method Allowed" }, { status: 405 });
}

