import { sendCookie } from "@/app/api/_api_auth/auth";
import errorHandler from "@/app/api/_api_lib/helpers/errorHandler";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    sendCookie(null, 0);
    return NextResponse.json(
      { success: true, message: "Successfully logged out" },
      { status: 200 }
    );
  } catch (error) {
    return errorHandler(error);
  }
}
