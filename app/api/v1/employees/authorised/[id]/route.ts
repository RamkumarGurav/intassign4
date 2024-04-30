import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "next/dist/server/api-utils";
import connect from "@/app/api/_api_database/db";
import errorHandler from "@/app/api/_api_lib/helpers/errorHandler";
import Employee from "@/app/api/_api_models/employeeModel";
import fs, { writeFile } from "fs/promises";
import path from "path";
import { cldUpload } from "@/lib/helpers/cldUpload";
import { cldDelete } from "@/lib/helpers/cldDelete";
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

/****************************************************
        UPDATE ONE EMPLOYEE
 ****************************************************/
export async function PATCH(req: NextRequest, context: { params: any }) {
  try {
    await connect();
    /*** valiadating ID ***/
    let id = context.params.id;
    if (!id || !Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid or missing employee id");
    }
    const existingEmp = await Employee.findById(id);
    if (!existingEmp) {
      throw new ApiError(404, "Employee not found");
    }
    /*** valiadating ID ***/
    let formData = await req.formData();
    const courses =
      formData.get("courses") && JSON.parse(String(formData.get("courses")));
    let imageObj = { ...existingEmp.imageObj };
    let file = formData.get("image");
    // console.log("file ", file);
    if (file) {
      /*** file validation ***/

      if (!(file instanceof File)) {
        return NextResponse.json(
          { success: false, message: "Invalid file type" },
          { status: 400 }
        );
      }

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

      /*** cloudinary upload ***/
      const data: any = await cldUpload(file, "intassign4/employees");
      imageObj = {
        publicId: data?.public_id,
        imageUrl: data?.secure_url,
      };
    }

    /*** input for model upate ***/
    let employeeBody = {
      name: formData.get("name"),
      email: formData.get("email"),
      mobile: formData.get("mobile"),
      gender: formData.get("gender"),
      designation: formData.get("designation"),
      courses,
      imageObj,
    };

    // console.log("imageObj", imageObj);

    /*** model update ***/
    const updatedEmp = await Employee.findByIdAndUpdate(
      id,
      { ...employeeBody },
      {
        runValidators: true,
        new: true,
      }
    );

    return NextResponse.json(
      { success: true, data: updatedEmp, message: "Successfully updated!" },
      { status: 200 }
    );
  } catch (error) {
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
    const publicId = employee.imageObj.publicId;

    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      throw new ApiError(500, "Error while Deleting ");
    }
    const cldDeleteResult = await cldDelete(publicId);

    return NextResponse.json(
      { success: true, message: "Deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return errorHandler(error);
  }
}
