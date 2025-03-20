import express from "express";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import crypto from "crypto";
import { db } from "../connect.js";
import jwt from "jsonwebtoken";

const router = express.Router();
const salt = 10;

router.get("/test", (req, res) => {
  res.send("It works!");
});

router.post("/submitFeedbackInternal", async (req, res) => {
  try {
    const {
      requestID,
      userID,
      courtesy,
      service_quality,
      service_timeliness,
      service_efficiency,
      physical_cleanliness,
      physical_comfort,
      comments,
    } = req.body;
    const ratingValues = {
      "Highly Satisfied": 5,
      "Very Satisfied": 4,
      "Moderately Satisfied": 3,
      "Barely Satisfied": 2,
      "Not Satisfied": 1,
    };
    const values = [
      requestID,
      userID,
      ratingValues[courtesy] || 0, // Default to 0 if not found
      ratingValues[service_quality] || 0,
      ratingValues[service_timeliness] || 0,
      ratingValues[service_efficiency] || 0,
      ratingValues[physical_cleanliness] || 0,
      ratingValues[physical_comfort] || 0,
      comments,
    ];

    const query =
      "INSERT INTO feedback_internal (requestID, userID, courtesy, service_quality, service_timeliness, service_efficiency, physical_cleanliness, physical_comfort, comments) VALUES (?)";
    db.query(query, [values], (err, result) => {
      if (err) {
        console.error("feedback error: ", err);
        return res
          .status(500)
          .json({ error: "Server error", details: err.message });
      }
      const updateQuery =
        "UPDATE requested_documents SET responded = 1 WHERE requestID = ?";
      db.query(updateQuery, [requestID], (upErr, upResult) => {
        if (upErr) {
          console.log(upErr.message);
        }
        console.log("Respond status updated.");
      });
      return res.status(200).json({
        message: "Feedback submitted successfully.",
      });
    });
  } catch (error) {
    console.error("Server error: ", error);
    return res.status(500).json({ error: "Server error" });
  }
});
router.get("/fetchFeedbackInternalData/:requestID", async (req, res) => {
  const { requestID } = req.params;

  const query = "SELECT * FROM feedback_internal WHERE requestID = ?";
  db.query(query, [requestID], (err, result) => {
    if (err) {
      return res.status(500).json({ message: err });
    }
    if (result.length > 0) {
      return res
        .status(200)
        .json({ message: "feedback data fetched", result: result[0] });
    } else {
      return res.status(404).json({ message: "no data found." });
    }
  });
});
export default router;
