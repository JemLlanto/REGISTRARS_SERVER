import express from "express";
import { db } from "../connect.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("It works!");
});

<<<<<<< Updated upstream
router.post("/sendRequest", (req, res) => {
  const query = `
    INSERT INTO requested_documents 
    (requestID, userID, agree, email, firstName, middleName, lastName, studentID, dateOfBirth, sex, mobileNum, classification, schoolYearAttended, yearGraduated, yearLevel, program, purpose) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  // Extract data from request body
  const {
    requestID,
    userID,
    agree,
    email,
    firstName,
    middleName,
    lastName,
    studentID,
    dateOfBirth,
    sex,
    mobileNum,
    classification,
    schoolYearAttended,
    yearGraduated,
    yearLevel,
    program,
    purpose,
  } = req.body;

  // Ensure all values are passed in the same order as in the query
  const values = [
    requestID,
    userID,
    agree,
    email,
    firstName,
    middleName,
    lastName,
    studentID,
    dateOfBirth,
    sex,
    mobileNum,
    classification,
    schoolYearAttended,
    yearGraduated,
    yearLevel,
    program,
    purpose,
  ];

  // Execute query
  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Database Insert Error:", err);
      return res
        .status(500)
        .json({ Error: "Inserting data error.", Details: err });
    }
    return res.json({ Status: "Success", InsertedID: result.insertId });
=======
router.get("/fetchRequestedDocuments", (req, res) => {
  const query = "SELECT * FROM requested_documents";
  db.query(query, (err, data) => {
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
>>>>>>> Stashed changes
  });
});

router.get("/fetchPrograms", (req, res) => {
  const query = "SELECT * FROM program_course";
  db.query(query, (err, data) => {
    if (err)
      return res.json({
        Status: "Error",
        Message: "Error fetching programs data.",
      });
    if (data.length > 0) {
      return res.json({ Status: "Success", data: data });
    } else {
      return res.json({ Status: "Error", Message: "Programs not found" });
    }
  });
});
router.get("/fetchPurposes", (req, res) => {
  const query = "SELECT * FROM purposes";
  db.query(query, (err, data) => {
    if (err)
      return res.json({
        Status: "Error",
        Message: "Error fetching purposes data.",
      });
    if (data.length > 0) {
      return res.json({ Status: "Success", data: data });
    } else {
      return res.json({ Status: "Error", Message: "purposes not found" });
    }
  });
});
router.get("/fetchYearGraduated", (req, res) => {
  const query = "SELECT * FROM year_graduated";
  db.query(query, (err, data) => {
    if (err)
      return res.json({
        Status: "Error",
        Message: "Error fetching purposes data.",
      });
    if (data.length > 0) {
      return res.json({ Status: "Success", data: data });
    } else {
      return res.json({ Status: "Error", Message: "purposes not found" });
    }
  });
});
router.get("/fetchPurposeData", (req, res) => {
  const { purposeName } = req.query;

  if (!purposeName) {
    return res.json({
      Status: "Error",
      Message: "Purpose name is required.",
    });
  }
  const query = "SELECT * FROM purposes WHERE purposeName = ?";
  db.query(query, [purposeName], (err, data) => {
    if (err)
      return res.json({
        Status: "Error",
        Message: "Error fetching selections data.",
      });
    if (data.length > 0) {
      return res.json({ Status: "Success", data: data[0] });
    } else {
      return res.json({ Status: "Error", Message: "selections not found" });
    }
  });
});
router.get("/fetchSelections", (req, res) => {
  const { purposeID } = req.query;
  if (!purposeID) {
    return res.json({
      Status: "Error",
      Message: "Purpose ID is required",
    });
  }
  const query = "SELECT * FROM purpose_selection WHERE purposeID = ?";
  db.query(query, [purposeID], (err, data) => {
    if (err)
      return res.json({
        Status: "Error",
        Message: "Error fetching selections data.",
      });
    if (data.length > 0) {
      return res.json({ Status: "Success", data: data });
    } else {
      return res.json({ Status: "Error", Message: "selections not found" });
    }
  });
});
router.get("/fetchInputs", (req, res) => {
  const { purposeID } = req.query;
  if (!purposeID) {
    return res.json({
      Status: "Error",
      Message: "Purpose ID is required",
    });
  }
  const query = "SELECT * FROM purpose_inputs WHERE purposeID = ?";
  db.query(query, [purposeID], (err, data) => {
    if (err)
      return res.json({
        Status: "Error",
        Message: "Error fetching inputs data.",
      });
    if (data.length > 0) {
      return res.json({ Status: "Success", data: data });
    } else {
      return res.json({ Status: "Error", Message: "Inputs not found" });
    }
  });
});
router.get("/fetchUploads", (req, res) => {
  const { purposeID } = req.query;
  if (!purposeID) {
    return res.json({
      Status: "Error",
      Message: "Purpose ID is required",
    });
  }
  const query = "SELECT * FROM purpose_upload WHERE purposeID = ?";
  db.query(query, [purposeID], (err, data) => {
    if (err)
      return res.json({
        Status: "Error",
        Message: "Error fetching uploads data.",
      });
    if (data.length > 0) {
      return res.json({ Status: "Success", data: data });
    } else {
      return res.json({ Status: "Error", Message: "Uploads not found" });
    }
  });
});

export default router;
