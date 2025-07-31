import express from "express";
import { io } from "../index.js";
import { db } from "../connect.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Cloudinary storage for regular uploads
const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "RegistrarUploads/LocationImage",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

// Helper function to delete all images in the folder
const deleteAllImagesInFolder = async (folderPath) => {
  try {
    // Get all resources in the folder
    const resources = await cloudinary.api.resources({
      type: "upload",
      prefix: folderPath,
      max_results: 500, // Adjust based on your needs
    });

    if (resources.resources && resources.resources.length > 0) {
      // Extract public IDs of all resources
      const publicIds = resources.resources.map(
        (resource) => resource.public_id
      );

      // Delete all resources
      const result = await cloudinary.api.delete_resources(publicIds);
      // console.log(
      //   `Deleted ${publicIds.length} images from folder: ${folderPath}`
      // );
      return result;
    } else {
      // console.log(`No images found in folder: ${folderPath}`);
      return { deleted: {} };
    }
  } catch (error) {
    console.error("Error deleting images from folder:", error);
    throw error;
  }
};

// Middleware to clean folder before upload
const cleanFolderBeforeUpload = async (req, res, next) => {
  try {
    await deleteAllImagesInFolder("RegistrarUploads/LocationImage");
    // // console.log("Successfully cleared all images from folder before upload");
    next();
  } catch (error) {
    // console.error("Error clearing folder before upload:", error);
    // Continue with upload even if delete fails
    next();
  }
};
const upload = multer({ storage: cloudinaryStorage });

router.post(
  "/uploadNewLocationImage",
  cleanFolderBeforeUpload,
  upload.single("file"),
  async (req, res) => {
    try {
      // Check for file
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // File info from Cloudinary
      const fileInfo = {
        originalName: req.file.originalname,
        filename: req.file.filename,
        path: req.file.path,
        url: req.file.path, // Cloudinary URL
        publicId: req.file.filename, // Cloudinary public ID
        size: req.file.size,
        mimetype: req.file.mimetype,
      };

      // // console.log("Cloudinary URL: ", fileInfo.url);

      // SQL query - store the URL instead of just the filename
      const query = `
      Update location_contact set imageFile = ?
    `;

      // Execute query and send response
      db.query(query, fileInfo.url, (err, result) => {
        if (err) {
          console.error("Database Insert Error:", err);
          return res.status(500).json({
            Error: "Inserting data error.",
            Details: err,
          });
        }

        return res.status(200).json({
          Status: "Success",
          message: "File uploaded successfully to Cloudinary",
          InsertedID: result.insertId,
          file: fileInfo,
        });
      });
    } catch (error) {
      console.error("Error handling file upload:" + error);
      return res.status(500).json({ error: "Failed to process uploaded file" });
    }
  }
);

router.post("/updateLocationAndContacts", (req, res) => {
  const { title, description } = req.body;
  const values = [title, description];

  const query =
    "UPDATE location_contact SET title = ?, description = ? WHERE id = 1";

  db.query(query, values, (err, result) => {
    if (err) {
      console.log("Error updating data: ", err);
      return res
        .status(500)
        .json({ Error: "Error updating data", Details: err });
    }

    return res.status(200).json({ Message: "Data Updated." });
  });
});

router.get("/fetchLocationAndContacts", (req, res) => {
  const query = "SELECT * FROM location_contact WHERE id = 1";

  db.query(query, (err, result) => {
    if (err) {
      // console.log("Error checking location and contact: ", err);
      return res.status(500).json({
        Error: "Error checking location and contact",
        Details: err,
      });
    }
    if (result.length > 0) {
      return res.status(200).json({ result: result[0] });
    } else {
      return res.status(404).json("Cannot find any data");
    }
  });
});

router.post("/updateGuidingPrinciples", (req, res) => {
  const { id, title, description } = req.body;
  const values = [title, description, id];

  // // console.log(values);

  const query =
    "UPDATE guiding_principles SET title = ?, description = ? WHERE id = ?";

  db.query(query, values, (err, result) => {
    if (err) {
      // console.log("Error updating data: ", err);
      return res
        .status(500)
        .json({ Error: "Error updating data", Details: err });
    }

    return res.status(200).json({ Message: "Data Updated." });
  });
});

router.get("/fetchGuidingPrinciples", (req, res) => {
  const query = "SELECT * FROM guiding_principles";

  db.query(query, (err, result) => {
    if (err) {
      // console.log("Error checking guiding principles: ", err);
      return res.status(500).json({
        Error: "Error checking guiding principles",
        Details: err,
      });
    }
    if (result.length > 0) {
      return res.status(200).json({ result: result });
    } else {
      return res.status(404).json("Cannot find any data");
    }
  });
});

export default router;
