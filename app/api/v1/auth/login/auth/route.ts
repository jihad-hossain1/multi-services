import { get_server_session } from "../../../../../../lib/server_session";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await get_server_session();

    return NextResponse.json(session);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}