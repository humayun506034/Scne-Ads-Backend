import { cloudinary } from "./cloudinaryClient";

const getPublicIdFromCloudinaryUrl = (imageUrl: string): string | null => {
  try {
    const withoutQuery = imageUrl.split("?")[0];
    const uploadMarker = "/upload/";
    const markerIndex = withoutQuery.indexOf(uploadMarker);

    if (markerIndex === -1) return null;

    const pathAfterUpload = withoutQuery.slice(markerIndex + uploadMarker.length);
    const withoutVersion = pathAfterUpload.replace(/^v\d+\//, "");
    const parts = withoutVersion.split("/");

    if (parts.length === 0) return null;

    const lastPart = parts[parts.length - 1];
    parts[parts.length - 1] = lastPart.replace(/\.[^/.]+$/, "");

    return parts.join("/");
  } catch {
    return null;
  }
};

export const deleteFromCloudinary = async (imageUrl: string) => {
  try {
    const publicId = getPublicIdFromCloudinaryUrl(imageUrl);
    if (!publicId) return;

    const isVideo = imageUrl.includes("/video/upload/");
    await cloudinary.uploader.destroy(publicId, {
      resource_type: isVideo ? "video" : "image",
    });
  } catch (err) {
    console.error("Delete failed:", err);
  }
};
