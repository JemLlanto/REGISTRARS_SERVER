import express from "express";
import { io } from "../index.js";
import { db } from "../connect.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

const router = express.Router();

router.get("/fetchLocationAndContacts", (req, res) => {
  const query = "SELECT * FROM location_contact WHERE id = 1";

  db.query(query, (err, result) => {
    if (err) {
      console.log("Error checking location and contact: ", err);
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

export default router;
