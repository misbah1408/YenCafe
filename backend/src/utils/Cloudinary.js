import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) throw new Error("File path is required for upload.");

    console.log("Starting upload to Cloudinary:", localFilePath);

    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("File uploaded successfully to Cloudinary:", response.secure_url);
    return response;
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    return null;
  } finally {
    // Delete the file in both success and failure cases
    try {
      fs.unlinkSync(localFilePath);
      console.log("Temporary file deleted:", localFilePath);
    } catch (unlinkError) {
      console.error("Failed to delete temporary file:", unlinkError);
    }
  }
};

export { uploadOnCloudinary };
