import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "next/dist/server/api-utils";
import connect from "@/app/api/_api_database/db";
import errorHandler from "@/app/api/_api_lib/helpers/errorHandler";
import Employee from "@/app/api/_api_models/employeeModel";
import fs, { writeFile } from "fs/promises";
/* =======================================================================
        GET ONE EMPLOYEE
   ======================================================================= */
export async function GET(req: NextRequest, context: { params: any }) {
  try {
    await connect();
    const id = context.params.id;

    if (!id || !Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid or missing employee id");
    }

    const employee = await Employee.findById(id);
    if (!employee) {
      throw new ApiError(404, "Employee not found");
    }
    return NextResponse.json({ success: true, data: employee });
  } catch (error) {
    return errorHandler(error);
  }
}

/* =======================================================================
        UPDATE ONE EMPLOYEE
   ======================================================================= */
async function createFolderIfNotExists(path: string) {
  try {
    await fs.access(path, fs.constants.F_OK); // Check if folder exists
  } catch (err) {
    await fs.mkdir(path, { recursive: true }); // Create folder if it doesn't exist
  }
}

export async function PATCH(req: NextRequest, context: { params: any }) {
  try {
    await connect();
    let id = context.params.id;

    if (!id || !Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid or missing employee id");
    }

    const employee = await Employee.findById(id);
    if (!employee) {
      throw new ApiError(404, "Employee not found");
    }

    let formData = await req.formData(); // Parse form data from request

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
    };

    // Create new Employee instance

    let file = formData.get("image");
    let fileName = "";
    if (typeof file === "string") {
      fileName = file;
      console.log("file string: ", file);
    } else {
      if (!file) {
        return NextResponse.json({
          success: false,
          message: "Please Provide the Image",
        });
      }

      // // Check if file is actually a File object
      if (!(file instanceof File)) {
        return NextResponse.json(
          { success: false, message: "Invalid file type" },
          { status: 400 }
        );
      }

      // Extract file extension
      const ext = file.name.split(".").pop()?.toLowerCase();

      const allowedExtensions = ["jpg", "jpeg", "png"];

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
      // await createFolderIfNotExists(targetPath); // Ensure target folder exists

      // Copy file data into buffer and write to target path
      const byteData = await file.arrayBuffer();
      const buffer = Buffer.from(byteData);
      fileName = `${id}.${ext}`;
      const imagePath = `${targetPath}/${fileName}`;
      await writeFile(imagePath, buffer); // Write file to target path
    }

    // Update employee record with image filename
    const updatedEmp = await Employee.findByIdAndUpdate(
      id,
      { ...employeeBody, image: fileName },
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
        DELETE ONE EMPLOYEE
   ======================================================================= */
export async function DELETE(req: NextRequest, context: { params: any }) {
  try {
    await connect();
    const id = context.params.id;

    if (!id || !Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid or missing employee id");
    }

    const employee = await Employee.findById(id);
    if (!employee) {
      throw new ApiError(404, "Employee not found");
    }

    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      throw new ApiError(500, "Error while Deleting ");
    }

    return NextResponse.json(
      { success: true, message: "Deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return errorHandler(error);
  }
}
