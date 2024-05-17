import { v2 as cloudinary } from 'cloudinary';
import { API_KEY, API_SECRET, CLOUDINARY_URL, CLOUD_NAME } from '../Config/index.js';
import RequestError from '../Errors/RequestError.js';

class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloudinary_url: CLOUDINARY_URL,
      cloud_name: CLOUD_NAME,
      api_key: API_KEY,
      api_secret: API_SECRET,
      secure: true,
    });
  }

  async uploadImage(file, existsUrl) {
    try {
      if(!file) throw new RequestError("There is no uploaded image");
      const b64 = Buffer.from(file.buffer).toString("base64");
      const dataURI = "data:" + file.mimetype + ";base64," + b64;
      const options = {
        resource_type: "auto",
        use_filename: true,
        unique_filename: true,
        overwrite: true,
        invalidate: true,
        format: "png",
      };

      if (existsUrl) {
        options.public_id = existsUrl.split("/").slice(-1)[0].split(".")[0];
      }

      const result = await cloudinary.uploader.upload(dataURI, options);
      return result.secure_url;
    } catch (error) {
      console.error(error);
      // Handle the error appropriately (e.g., throw an exception or return an error message)
      throw new Error("Image upload failed");
    }
  }
}
export default new CloudinaryService();