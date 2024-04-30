import { cldDelete } from "@/lib/helpers/cldDelete";
import { cldUpload } from "@/lib/helpers/cldUpload";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    let formData = await req.formData();

    console.log("formDATA", formData);

    // let file = formData.get("file") as unknown as File;
    let publicId = formData.get("publicId") as string;

    // if (!file) {
    //   return NextResponse.json(
    //     { success: false, message: "No Image Found", status: 400 },
    //     { status: 400 }
    //   );
    // }

    // //== Check if file is actually a File object
    // if (!(file instanceof File)) {
    //   return NextResponse.json(
    //     { success: false, message: "Invalid file type", status: 400 },
    //     { status: 400 }
    //   );
    // }

    // const ext = file.name.split(".").pop()?.toLowerCase();

    // const allowedExtensions = ["jpg", "jpeg", "png"];

    // if (ext) {
    //   if (!allowedExtensions.includes(ext)) {
    //     return NextResponse.json(
    //       {
    //         success: false,
    //         message: "only jpg and png image formats are allowed",
    //       },
    //       { status: 400 }
    //     );
    //   }
    // }

    // const data: any = await cldUpload(file, "intassign4/employees");
    // const file = {
    //   imageUrl: data?.secure_url,
    //   publicId: data?.public_id,
    // };
    const result: any = await cldDelete(publicId);

    if (result.data != "ok") {
      return NextResponse.json(
        { success: false, message: "Failed to Delete Image from Cloudinary" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "File successfully deleted",
      data: result,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Upload failed", error: error },
      { status: 500 }
    );
  }
}
