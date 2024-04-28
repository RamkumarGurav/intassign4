import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "next/dist/server/api-utils";
import connect from "@/app/api/_api_database/db";
import User from "@/app/api/_api_models/userModel";
import errorHandler from "@/app/api/_api_lib/helpers/errorHandler";
import { sendCookie } from "@/app/api/_api_auth/auth";

export async function POST(req: NextRequest) {
  try {
    await connect();

    const body = await req.json();
    const { username, password } = body;
    //IMPstep1) we check if email and password exist in the inputted body if they exit then move to step2
    if (!username || !password) {
      throw new ApiError(400, "Please provide username and password!");
    }

    const user: any = await User.findOne({
      username: username,
    }).select("+password"); ///user document which includes password as a field -because in user model we made select as false for password to not show in output

    if (!user || !(await user.isPasswordCorrect(password, user.password))) {
      //if there is no user exists in DB or password is incorrect then give error else move to step3
      throw new ApiError(400, "Invalid username or Password!"); //401-unathorised
    }

    const userData: any = {
      _id: user.id,
      username: user.username,
      role: user.role,
    };

    await sendCookie(userData, 7 * 24 * 60 * 60);

    return NextResponse.json(
      { success: true, data: userData, message: "Login Succes" },
      { status: 200 }
    );
  } catch (error) {
    return errorHandler(error);
  }
}
