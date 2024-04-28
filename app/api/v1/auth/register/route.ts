import { sendCookie } from "@/app/api/_api_auth/auth";
import connect from "@/app/api/_api_database/db";
import errorHandler from "@/app/api/_api_lib/helpers/errorHandler";
import Admin from "@/app/api/_api_models/userModel";
import { ApiError } from "next/dist/server/api-utils";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connect();

    const registerToken = headers().get("x-register-token")
      ? headers().get("x-register-token")
      : "";
    if (registerToken === "1JS15ec071@") {
      const body = await req.json();
      const { username, password, role, status } = body;

      const newAdmin = new Admin({ username, password, role, status });

      const newRegister = await newAdmin.save();
      if (!newRegister) {
        throw new ApiError(500, "Error while creating new admin");
      }

      const userData: any = {
        _id: newRegister.id,
        username: newRegister.username,
        role: newRegister.role,
      };

      await sendCookie(userData, 7 * 24 * 60 * 60);

      return NextResponse.json(
        { success: true, message: "New admin created successfully" },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "You are not allowed to perform this action",
        },
        { status: 403 }
      );
    }
  } catch (error) {
    return errorHandler(error);
  }
}
