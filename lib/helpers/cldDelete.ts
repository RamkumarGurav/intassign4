import cloudinary from "./cloudinary";

export const cldDelete = async (public_id: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await cloudinary.uploader.destroy(public_id);
      return resolve(result);
    } catch (err: any) {
      reject(new Error(err.message));
    }
  });
};
