import connect from "@/app/api/_api_database/db";
import errorHandler from "@/app/api/_api_lib/helpers/errorHandler";
import User from "@/app/api/_api_models/userModel";
import { ApiError } from "next/dist/server/api-utils";
import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/* =======================================================================
          GET ALL WITH PAGINATION
     ======================================================================= */
export async function GET(req: NextRequest) {
  try {
    await connect();

    // Extract query parameters from the request
    const searchParams = req.nextUrl.searchParams;

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const search = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";
    const status = searchParams.get("status") || "";
    // Construct the filter object based on the status parameter
    const filter = status ? { status } : {};

    // Construct the search query
    const searchQuery = search ? { $text: { $search: search } } : {};

    // Find users based on the filter and search query
    const users = await User.find({ ...filter, ...searchQuery })
      .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 }) // Sort users based on sortBy and sortOrder
      .skip((page - 1) * limit) // Skip documents based on pagination
      .limit(limit); // Limit the number of documents returned per page

    // Get the total count of users matching the filter and search query
    const foundCount = await User.countDocuments({
      ...filter,
      ...searchQuery,
    });

    // Get the count of found users
    const totalCount = await User.countDocuments();

    // Get the count of total active users
    const activeCount = await User.countDocuments({ status: "active" });

    return NextResponse.json({
      success: true,
      foundCount,
      activeCount,
      currentPage: page,
      totalActivePages: Math.ceil(activeCount / limit),
      data: users,
    });
  } catch (error) {
    return errorHandler(error);
  }
}
