import fs, { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

async function createFolderIfNotExists(path: string) {
  try {
    await fs.access(path, fs.constants.F_OK); // Check if folder exists
  } catch (err) {
    await fs.mkdir(path, { recursive: true }); // Create folder if it doesn't exist
  }
}

export async function POST(req: NextRequest) {
  try {
    let formData = await req.formData();

    console.log("formDATA", formData);

    let file = formData.get("file");
    let name = formData.get("name");

    console.log("name", name);

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No Image Found", status: 400 },
        { status: 400 }
      );
    }

    //== Check if file is actually a File object
    if (!(file instanceof File)) {
      return NextResponse.json(
        { success: false, message: "Invalid file type", status: 400 },
        { status: 400 }
      );
    }

    const ext = file.name.split(".").pop()?.toLowerCase();

    const allowedExtensions = ["jpg", "png"];

    if (ext) {
      if (!allowedExtensions.includes(ext)) {
        return NextResponse.json(
          {
            success: false,
            message: "only jpg and png image formats are allowed",
          },
          { status: 400 }
        );
      }
    }

    //==  Folder creation logic
    const uploadsPath = "public/uploads";
    const targetPath = `${uploadsPath}/projects`;
    await createFolderIfNotExists(targetPath);

    //== copying file into array buffer and then copying into buffer
    //== and writing into the target path using buffer
    const byteData = await file.arrayBuffer();
    const buffer = Buffer.from(byteData);
    const fileName = `${new Date().getMilliseconds()}.${ext}`;
    const path = `public/uploads/projects/${fileName}`;
    await writeFile(path, buffer);
    return NextResponse.json({
      success: true,
      message: "File successfully uploaded",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Upload failed" },
      { status: 500 }
    );
  }
}
