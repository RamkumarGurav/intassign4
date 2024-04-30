import cloudinary from "./cloudinary";

export const cldUpload = async (file: File, folder: string) => {
  //every file or image or video always stored in arrayBuffer which is a fixed length container,But using
  //arrayBuffer we can't manipulate the underlying data
  const rawBuffer = await file.arrayBuffer();
  //we convert the arrayBuffer to Buffere which is an Object that has many methods for data manipulation,so it
  //enable read and write operations for uploading images or copying image from one file to another
  const bufferObj = Buffer.from(rawBuffer);

  return new Promise(async (resolve, reject) => {
    await cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
          folder: folder,
        },
        async (err, result) => {
          if (err) {
            return reject(err);
          }

          return resolve(result);
        }
      )
      .end(bufferObj);
  });
};
