import express from "express";
import { db } from "../connect.js";
import multer from "multer";

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });

router.get("/test", (req, res) => {
  res.send("It works!");
});
router.get("/fetchRequestedDocuments/:userID", (req, res) => {
  const { userID } = req.params;
  console.log("User ID: ", userID);
  const query = "SELECT * FROM requested_documents WHERE userID = ?";
  db.query(query, [userID], (err, data) => {
    if (err)
      return res.json({
        Status: "Error",
        Message: "Error fetching Requested Documents data.",
      });
    if (data.length > 0) {
      return res.json({ Status: "Success", data: data });
    } else {
      return res.json({
        Status: "Error",
        Message: "Requested Documents not found",
      });
    }
  });
});
router.get("/fetchRequestedDocumentsDetails/:requestID", (req, res) => {
  const { requestID } = req.params;
  console.log("Request ID for: ", requestID);
  const query = `
  SELECT 
    requested_documents.*,
    purposes.purposeID
  FROM 
    requested_documents
  JOIN
    purposes ON requested_documents.purpose = purposes.purposeName
  WHERE 
    requested_documents.requestID = ?
  
  `;
  db.query(query, [requestID], (err, data) => {
    if (err)
      return res.json({
        Status: "Error",
        Message: "Error fetching details.",
      });
    if (data.length > 0) {
      return res.json({
        Status: "Success",
        data: data[0],
      });
    } else {
      return res.json({
        Status: "Error",
        Message: "Detials not found.",
      });
    }
  });
});
router.get("/fetchRequestedDocumentTypes/:requestID", (req, res) => {
  const { requestID } = req.params;
  const query = `
  SELECT *
  FROM 
    requested_document_type
  WHERE 
    requestID = ?
  
  `;
  db.query(query, [requestID], (err, data) => {
    if (err)
      return res.json({
        Status: "Error",
        Message: "Error fetching types.",
      });
    if (data.length > 0) {
      return res.json({
        Status: "Success",
        data: data,
      });
    } else {
      return res.json({
        Status: "Error",
        Message: "Types not found.",
      });
    }
  });
});
router.get("/fetchRequestedDocumentFiles/:requestID", (req, res) => {
  const { requestID } = req.params;
  const query = `
  SELECT *
  FROM 
    requested_document_file
  WHERE 
    requestID = ?
  
  `;
  db.query(query, [requestID], (err, data) => {
    if (err)
      return res.json({
        Status: "Error",
        Message: "Error fetching files.",
      });
    if (data.length > 0) {
      return res.json({
        Status: "Success",
        data: data[0],
      });
    } else {
      return res.json({
        Status: "Error",
        Message: "Files not found.",
      });
    }
  });
});
router.get("/fetchRequestedDocumentInputs/:requestID", (req, res) => {
  const { requestID } = req.params;
  const query = `
  SELECT *
  FROM 
    requested_document_input
  WHERE 
    requestID = ?
  
  `;
  db.query(query, [requestID], (err, data) => {
    if (err)
      return res.json({
        Status: "Error",
        Message: "Error fetching inputs.",
      });
    if (data.length > 0) {
      return res.json({
        Status: "Success",
        data: data,
      });
    } else {
      return res.json({
        Status: "Error",
        Message: "Inputs not found.",
      });
    }
  });
});

export default router;
