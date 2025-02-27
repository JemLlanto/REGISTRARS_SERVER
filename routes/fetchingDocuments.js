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
  SELECT *
  FROM 
    requested_documents
  WHERE 
    requestID = ?
  
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

export default router;
