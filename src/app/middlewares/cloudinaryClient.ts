import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName) {
  throw new Error("CLOUDINARY_CLOUD_NAME is not defined in environment variables");
}

if (!apiKey) {
  throw new Error("CLOUDINARY_API_KEY is not defined in environment variables");
}

if (!apiSecret) {
  throw new Error("CLOUDINARY_API_SECRET is not defined in environment variables");
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

export { cloudinary };
