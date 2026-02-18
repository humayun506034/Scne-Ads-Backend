import path from "path";
import { cloudinary } from "./cloudinaryClient";

export const uploadToCloudinary = async (
  file: Express.Multer.File,
  fileName: string
) => {
  const contentType = file.mimetype;

  if (!contentType || (!contentType.startsWith("image/") && !contentType.startsWith("video/"))) {
    throw new Error("Unsupported or invalid file type. Only images and videos are allowed.");
  }

  const parsed = path.parse(fileName);
  const uploadResult = await cloudinary.uploader.upload(file.path, {
    folder: "attachments/media",
    public_id: parsed.name,
    resource_type: "auto",
    overwrite: true,
    unique_filename: false,
    use_filename: false,
  });

  if (!uploadResult?.secure_url) {
    throw new Error("Public URL not found");
  }

  return uploadResult.secure_url;
};
