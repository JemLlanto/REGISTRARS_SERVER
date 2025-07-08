import express from "express";
import { io } from "../index.js";
import { db } from "../connect.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const router = express.Router();

router.post("/sendScheduleSlipDetails", (req, res) => {
  const {
    controlNum,
    requestID,
    name,
    courseMajor,
    studentNum,
    dateRequested,
    purpose,
    dateRelease,
    timeRelease,
    processedBy,
  } = req.body;
  const values = [
    controlNum,
    requestID,
    name,
    courseMajor,
    studentNum,
    dateRequested,
    purpose,
    dateRelease,
    timeRelease,
    processedBy,
  ];
  // console.log("requestID: ", requestID);
  // Step 1: Check if controlNum already exists
  const checkQuery = "SELECT * FROM scheduleSlip WHERE controlNum = ?";

  db.query(checkQuery, [controlNum], (err, result) => {
    if (err) {
      console.log("Error checking for existing controlNum: ", err);
      return res.status(500).json({ error: "Database error", details: err });
    }

    if (result.length > 0) {
      // Control number already exists
      // console.log("Control number already exists.");
      return res.status(409).json({ error: "Control number already exists." });
    }

    // Step 2: Insert if it doesn't exist
    const insertQuery =
      "INSERT INTO scheduleSlip (controlNum, requestID, name, program, studentNum, dateRequested, purpose, releaseDate, releaseTime, processedBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(insertQuery, values, (insertErr, insertResult) => {
      if (insertErr) {
        console.log("Error inserting data: ", insertErr);
        return res
          .status(500)
          .json({ error: "Error inserting data", details: insertErr });
      }

      const updateQuery =
        "UPDATE requested_documents SET isScheduled = 1 WHERE requestID = ?";
      db.query(updateQuery, [requestID], (updateErr, updateResult) => {
        if (updateErr) {
          console.log("Error updating data: ", updateErr);
          return res
            .status(500)
            .json({ error: "Error updating data", details: updateErr });
        }
        // console.log("Marked document as scheduled.");
      });

      return res.status(200).json({ message: "Data inserted successfully." });
    });
  });
});

router.post("/sendScheduleSlipDocTypes", (req, res) => {
  const { requestID, documentTypes } = req.body;
  // console.log("sendScheduleSlipDocTypes requestID: ", requestID);

  if (
    !requestID ||
    !Array.isArray(documentTypes) ||
    documentTypes.length === 0
  ) {
    return res.status(400).json({ error: "Invalid input." });
  }

  // Step 1: Check if requestID already exists
  const checkQuery = "SELECT * FROM scheduleSlipDocTypes WHERE requestID = ?";

  db.query(checkQuery, [requestID], (err, result) => {
    if (err) {
      // console.log("Error checking for existing requestID: ", err);
      return res.status(500).json({ error: "Database error", details: err });
    }

    // if (result.length > 0) {
    //   // RequestID already exists
    //   return res.status(409).json({ error: "RequestID already exists." });
    // }

    // Step 2: Insert if it doesn't exist
    const docValues = documentTypes.map((doc) => [
      requestID,
      doc.documentType,
      doc.page,
      doc.amount,
    ]);

    const insertQuery =
      "INSERT INTO scheduleSlipDocTypes (requestID, documentName, page, price) VALUES ?";

    db.query(insertQuery, [docValues], (err) => {
      if (err) {
        console.error("Error inserting documentRequested:", err);
        return res.status(500).json({ error: "Insert failed", details: err });
      }

      return res
        .status(200)
        .json({ message: "Document types inserted successfully." });
    });
  });
});

router.post("/sendScheduleSlipRequirements", (req, res) => {
  const { requestID, requirements } = req.body;
  // console.log("requestID: ", requestID);

  if (!requestID || !Array.isArray(requirements) || requirements.length === 0) {
    return res.status(400).json({ error: "Invalid input." });
  }

  // Step 1: Check if requestID already exists
  const checkQuery =
    "SELECT * FROM scheduleSlipRequirements WHERE requestID = ?";

  db.query(checkQuery, [requestID], (err, result) => {
    if (err) {
      // console.log("Error checking for existing requestID: ", err);
      return res.status(500).json({ error: "Database error", details: err });
    }

    // if (result.length > 0) {
    //   // RequestID already exists
    //   return res.status(409).json({ error: "RequestID already exists." });
    // }

    // Step 2: Insert if it doesn't exist
    const reqValues = requirements.map((doc) => [requestID, doc]);

    const insertQuery =
      "INSERT INTO scheduleSlipRequirements (requestID, description) VALUES ?";

    db.query(insertQuery, [reqValues], (err) => {
      if (err) {
        console.error("Error inserting requirements:", err);
        return res.status(500).json({ error: "Insert failed", details: err });
      }

      return res
        .status(200)
        .json({ message: "Requirements inserted successfully." });
    });
  });
});

router.get("/fetchScheduleSlipDetails/:requestID", (req, res) => {
  const { requestID } = req.params;
  const query = "SELECT * FROM scheduleSlip WHERE requestID = ?";

  db.query(query, [requestID], (err, result) => {
    if (err) {
      console.log("Error fetching schedule slip details: ", err);
      return res.status(500).json({
        Error: "Error fetching schedule slip details",
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
router.get("/fetchScheduleSlipDocTypes/:requestID", (req, res) => {
  const { requestID } = req.params;
  const query = "SELECT * FROM scheduleSlipDocTypes WHERE requestID = ?";
  db.query(query, [requestID], (err, result) => {
    if (err) {
      // console.log("Error fetching schedule slip document types: ", err);
      return res.status(500).json({
        Error: "Error fetching schedule slip document types",
        Details: err,
      });
    }
    return res.status(200).json({ result: result });
  });
});
router.get("/fetchScheduleSlipRequirements/:requestID", (req, res) => {
  const { requestID } = req.params;
  const query = "SELECT * FROM scheduleSlipRequirements WHERE requestID = ?";

  db.query(query, [requestID], (err, result) => {
    if (err) {
      console.log("Error fetching schedule slip requirements: ", err);
      return res.status(500).json({
        Error: "Error fetching schedule slip requirements",
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
