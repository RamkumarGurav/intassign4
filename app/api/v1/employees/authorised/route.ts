import connect from "@/app/api/_api_database/db";
import errorHandler from "@/app/api/_api_lib/helpers/errorHandler";
import Employee from "@/app/api/_api_models/employeeModel";
import { ApiError } from "next/dist/server/api-utils";
import { type NextRequest, NextResponse } from "next/server";
import fs, { writeFile } from "fs/promises";
export const dynamic = "force-dynamic";

/* =======================================================================
            CREATE EMPLOYEE
   ======================================================================= */
async function createFolderIfNotExists(path: string) {
  try {
    await fs.access(path, fs.constants.F_OK); // Check if folder exists
  } catch (err) {
    await fs.mkdir(path, { recursive: true }); // Create folder if it doesn't exist
  }
}

export async function POST(req: NextRequest) {
  try {
    await connect(); // Connect to the database

    let formData = await req.formData(); // Parse form data from request
    const existingEmp = await Employee.findOne({
      email: formData.get("email"),
    });

    if (existingEmp) {
      throw new ApiError(404, "Employee with this email already exists");
    }

    // Parse courses as JSON if present
    const courses =
      formData.get("courses") && JSON.parse(String(formData.get("courses")));

    // Prepare employee data
    let employeeBody = {
      name: formData.get("name"),
      email: formData.get("email"),
      mobile: formData.get("mobile"),
      gender: formData.get("gender"),
      designation: formData.get("designation"),
      courses: courses,
      image: "default.jpg",
    };

    // Create new Employee instance
    const employee = new Employee({ ...employeeBody });
    const newEmployee = await employee.save(); // Save new employee to the database

    if (!newEmployee) {
      throw new ApiError(500, "Error while creating new employee");
    }

    const id = newEmployee._id;

    let file = formData.get("image");

    if (!file) {
      return NextResponse.json({ success: false, message: "No Image Found" });
    }

    // Check if file is actually a File object
    if (!(file instanceof File)) {
      return NextResponse.json(
        { success: false, message: "Invalid file type" },
        { status: 400 }
      );
    }

    // Extract file extension
    const ext = file.name.split(".").pop()?.toLowerCase();

    const allowedExtensions = ["jpg", "png"];

    if (ext && !allowedExtensions.includes(ext)) {
      return NextResponse.json(
        {
          success: false,
          message: "Only jpg and png image formats are allowed",
        },
        { status: 400 }
      );
    }

    // Define upload paths
    const uploadsPath = "public/uploads";
    const targetPath = `${uploadsPath}/employees`;
    await createFolderIfNotExists(targetPath); // Ensure target folder exists

    // Copy file data into buffer and write to target path
    const byteData = await file.arrayBuffer();
    const buffer = Buffer.from(byteData);
    const fileName = `${id}.${ext}`;
    const imagePath = `${targetPath}/${fileName}`;
    await writeFile(imagePath, buffer); // Write file to target path

    // Update employee record with image filename
    const updatedEmp = await Employee.findByIdAndUpdate(
      id,
      { image: fileName },
      { new: true }
    );

    // Return success response with updated employee data
    return NextResponse.json(
      { success: true, data: updatedEmp },
      { status: 201 }
    );
  } catch (error) {
    // Handle errors and return appropriate response
    return errorHandler(error);
  }
}

/* =======================================================================
    GET ALL WITH PAGINATION
 ======================================================================= */
export async function GET(req: NextRequest) {
  try {
    await connect();

    // Extract query parameters from the request
    const searchParams = req.nextUrl.searchParams;

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const search = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || "createdAt";
    // logger(sortBy);
    const sortOrder = searchParams.get("sortOrder") || "asc";
    const status = searchParams.get("status") || "";
    // Construct the filter object based on the status parameter
    const filter = status ? { status } : {};

    // Construct the search query
    // const searchQuery = search ? { $text: { $name: search } } : {};
    // Construct the search query using prepared regular expression
    const searchQuery = search
      ? { name: { $regex: new RegExp(search, "i") } } // Case-insensitive search
      : {};

    // Find employees based on the filter and search query
    const employees = await Employee.find({
      ...filter,
      ...searchQuery,
    })
      .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 }) // Sort employees based on sortBy and sortOrder
      .skip((page - 1) * limit) // Skip documents based on pagination
      .limit(limit); // Limit the number of documents returned per page

    // Get the total count of employees matching the filter and search query
    const count = await Employee.countDocuments({
      ...filter,
      ...searchQuery,
    });

    // Get the count of found employees
    const totalCount = await Employee.countDocuments();
    // Get the count of found employees

    return NextResponse.json({
      success: true,
      totalCount,
      count,
      currentPage: page,
      limit: limit,
      totalPages: Math.ceil(count / limit),
      data: employees,
    });
  } catch (error) {
    return errorHandler(error);
  }
}
