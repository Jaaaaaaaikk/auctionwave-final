import multer from "multer";
import { defineEventHandler, getCookie } from "h3";
import { getPool } from "../db"; // Adjust path to your database setup
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";

// Define the upload directory
const uploadDir = path.join(process.cwd(), 'public/uploads/profilepictures');

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Create directory if it doesn't exist
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Save the file in the specified directory
  },
  filename: function (req, file, cb) {
    const uniqueName = `${uuidv4()}.${file.originalname.split('.').pop()}`; // Generate a unique filename
    cb(null, uniqueName);
  }
});

// Set up Multer middleware with file size and type restrictions
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: function (req, file, cb) {
    const validMimeTypes = ["image/jpeg", "image/png", "image/gif"];
    if (validMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'));
    }
  }
});

export default defineEventHandler(async (event) => {
  const pool = await getPool();

  return new Promise((resolve, reject) => {
    // Use Multer to handle the file upload
    upload.single('image')(event.node.req, event.node.res, async (err) => {
      if (err) {
        // Handle errors (e.g., file size or invalid type)
        return reject({
          status: 400,
          statusMessage: err.message,
        });
      }

      const image = event.node.req.file; // Access the uploaded file

      if (!image) {
        return reject({
          status: 400,
          statusMessage: "No image file uploaded.",
        });
      }

      // Construct the image URL
      const imageUrl = `/uploads/profilepictures/${image.filename}`;

      try {
        // Retrieve the access token from cookies
        const token = getCookie(event, "accessToken");
        if (!token) {
          throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
        }

        let decodedToken;
        try {
          decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
          return reject({ status: 401, statusMessage: "Invalid token" });
        }

        const user_id = decodedToken.userId;

        // Mark all current images as not current
        await pool.query("UPDATE UserProfileImages SET is_current_profile_image = FALSE WHERE user_id = ?", [user_id]);

        // Insert the new image URL into the database
        await pool.query("INSERT INTO UserProfileImages (user_id, profile_image_url, is_current_profile_image) VALUES (?, ?, TRUE)", [
          user_id,
          imageUrl,
        ]);

        const [profileImage] = await pool.query(
          `SELECT profile_image_url 
           FROM UserProfileImages 
           WHERE user_id = ? AND is_current_profile_image = TRUE`,
          [user_id]
        );

    const user_profile_picture = profileImage.length ? profileImage[0].profile_image_url.toString() : null;


        resolve({ imageUrl, user_profile_picture });
      } catch (error) {
        console.error("Error saving image to database:", error);
        reject({
          status: 500,
          statusMessage: "Failed to save image URL in the database.",
        });
      }
    });
  });
});
