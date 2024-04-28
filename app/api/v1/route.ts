import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.json(
    {
      status: true,
      statusCode: 200,
      message: "Welcome to our api",
    },
    {
      status: 200, // Explicitly set the status code to 200
    }
  );
}
