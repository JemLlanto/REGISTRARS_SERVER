import express from "express";
import dotenv from "dotenv";
dotenv.config();
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
    const requiredFields = {
      requestID,
      userID,
      courtesy,
      service_quality,
      service_timeliness,
      service_efficiency,
      physical_cleanliness,
      physical_comfort,
    };

    // Find any missing required fields
    const missingFields = Object.keys(requiredFields).filter(
      (field) =>
        requiredFields[field] === undefined ||
        requiredFields[field] === null ||
        requiredFields[field] === ""
    );

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: "Required fields are missing",
        missingFields: missingFields,
      });
    }
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
          // console.log(upErr.message);
        }
        // console.log("Respond status updated.");
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
router.get("/fetchFeedbackInternalData", async (req, res) => {
  // // console.log("Request query:", req.query);
  const { requestID } = req.query;

  if (!requestID) {
    return res.status(400).json({ message: "requestID is required" });
  }

  const query = `
  SELECT
   fi.*, 
   u.firstName, 
   u.middleName, 
   u.lastName, 
   u.email
  FROM feedback_internal fi
  LEFT JOIN
      users u ON fi.userID = u.userID
  WHERE fi.requestID = ?
`;
  db.query(query, [requestID], (err, result) => {
    if (err) {
      // // console.log(err);
      return res.status(500).json({ message: err });
    }
    if (result.length > 0) {
      // // console.log("Found data for requestID:", requestID);
      // // console.log(result[0]);
      return res
        .status(200)
        .json({ message: "feedback data fetched", result: result[0] });
    } else {
      // // console.log("No data found for requestID:", requestID);
      // return res
      //   .status(404)
      //   .json({ message: "No feedback data found for this requestID" });
    }
  });
});
router.post("/submitFeedbackExternal", async (req, res) => {
  try {
    const {
      requestID,
      userID,
      cc1,
      cc2,
      cc3,
      clientType,
      date,
      sex,
      age,
      serviceAvailed,
      sqd0,
      sqd1,
      sqd2,
      sqd3,
      sqd4,
      sqd5,
      sqd6,
      sqd7,
      sqd8,
      suggestions,
      email,
    } = req.body;
    // Checking all required fields except suggestions and email
    const requiredFields = {
      requestID,
      userID,
      cc1,
      cc2,
      cc3,
      clientType,
      date,
      sex,
      age,
      serviceAvailed,
      sqd0,
      sqd1,
      sqd2,
      sqd3,
      sqd4,
      sqd5,
      sqd6,
      sqd7,
      sqd8,
    };

    // Find any missing required fields
    const missingFields = Object.keys(requiredFields).filter(
      (field) =>
        requiredFields[field] === undefined ||
        requiredFields[field] === null ||
        requiredFields[field] === ""
    );

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: "Required fields are missing",
        missingFields: missingFields,
      });
    }

    const values = [
      requestID,
      userID,
      cc1,
      cc2,
      cc3,
      clientType,
      date,
      sex,
      age,
      serviceAvailed,
      sqd0,
      sqd1,
      sqd2,
      sqd3,
      sqd4,
      sqd5,
      sqd6,
      sqd7,
      sqd8,
      suggestions,
      email,
    ];

    const query = `INSERT INTO feedback_external (requestID, userID, cc1, cc2, cc3, clientType, date, sex, age, serviceAvailed, sqd0, sqd1, sqd2, sqd3, sqd4, sqd5, sqd6, sqd7, sqd8, suggestions, email) VALUES (?)`;
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
          // console.log(upErr.message);
        }
        // console.log("Respond status updated.");
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
router.get("/fetchFeedbackExternalData", async (req, res) => {
  console.log("Request query:", req.query);
  const { requestID } = req.query;

  if (!requestID) {
    return res.status(400).json({ message: "requestID is required" });
  }

  const query = "SELECT * FROM feedback_external WHERE requestID = ?";
  db.query(query, [requestID], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
    if (result.length > 0) {
      console.log("Found data for requestID:", requestID);
      console.log(result[0]);
      return res
        .status(200)
        .json({ message: "feedback data fetched", result: result[0] });
    } else {
      console.log("No data found for requestID:", requestID);
      // return res
      //   .status(404)
      //   .json({ message: "No feedback data found for this requestID" });
    }
  });
});
export default router;
