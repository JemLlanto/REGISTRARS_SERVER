import express from "express";
// import { io } from "../index.js";
import { db } from "../connect.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("It works!");
});

router.post("/addAdmin/:userID", (req, res) => {
  const { userID } = req.params;
  const query = `UPDATE users SET isAdmin = 1 WHERE userID = ?`;
  db.query(query, [userID], (err, result) => {
    if (err) {
      return res.json({
        Status: "Failed",
        Message: err,
      });
    }
    return res.json({
      Status: "Success",
      Message: "Admin added successfully.",
    });
  });
});
router.post("/addProgramAdmin", (req, res) => {
  const { programID, userID } = req.body;
  const query = "UPDATE program_course SET adminID = ? WHERE programID = ?";
  const values = [userID, programID];

  db.query(query, values, (err, result) => {
    if (err) {
      // console.log(err);
      return res.json({ Status: "Failed", Message: err });
    }
    return res.json({
      Status: "Success",
      Message: "Program admin added.",
    });
  });
});
router.post("/addPurposeAdmin", (req, res) => {
  const { purposeID, userID } = req.body;
  const query = "UPDATE purposes SET adminID = ? WHERE purposeID = ?";
  const values = [userID, purposeID];

  db.query(query, values, (err, result) => {
    if (err) {
      // console.log(err);
      return res.json({ Status: "Failed", Message: err });
    }
    return res.json({
      Status: "Success",
      Message: "Purpose admin added.",
    });
  });
});
router.post("/removeProgramAdmin", (req, res) => {
  const { programID } = req.body;
  const query = "UPDATE program_course SET adminID = 0 WHERE programID = ?";

  db.query(query, [programID], (err, result) => {
    if (err) {
      return res.json({ Status: "Falied", Message: "Removing admin failed." });
    }
    return res.json({
      Status: "Success",
      Message: "Removed admin successfully.",
    });
  });
});
router.post("/removePurposeAdmin", (req, res) => {
  const { purposeID } = req.body;
  const query = "UPDATE purposes SET adminID = 0 WHERE purposeID = ?";
  // console.log("Removing purpose admin with ID:", purposeID);
  db.query(query, [purposeID], (err, result) => {
    if (err) {
      return res.json({ Status: "Falied", Message: "Removing admin failed." });
    }
    // console.log("Admin removed successfully.");
    return res.json({
      Status: "Success",
      Message: "Removed admin successfully.",
    });
  });
});
router.post("/removeAdmin/:userID", (req, res) => {
  const { userID } = req.params;
  const query = `UPDATE users SET isAdmin = 0 WHERE userID = ?`;
  db.query(query, [userID], (err, result) => {
    if (err) {
      return res.json({ Status: "Failed", Message: "Error removing admin." });
    }
    return res.json({
      Status: "Success",
      Message: "Admin removed successfully.",
    });
  });
});
router.get("/fetchAdmin", (req, res) => {
  const query = "SELECT * FROM users WHERE isAdmin = 1 ";

  db.query(query, (err, data) => {
    if (err) {
      return res.json({ Error: "Fetching data error." });
    }
    if (data.length > 0) {
      return res.json({ Status: "Success", data: data });
    } else {
      return res.json({
        Status: "Error",
        Message: "No Admins.",
      });
    }
  });
});
router.get("/fetchUser", (req, res) => {
  const query = "SELECT * FROM users WHERE isAdmin = 0 ";

  db.query(query, (err, data) => {
    if (err) {
      return res.json({ Error: "Fetching data error." });
    }
    if (data.length > 0) {
      return res.json({ Status: "Success", data: data });
    } else {
      return res.json({
        Status: "Error",
        Message: "No Users.",
      });
    }
  });
});
router.get("/fetchProgramAdmins", (req, res) => {
  const query = `
  SELECT 
    p.programID,
    p.programName,
    p.adminID,
    u.firstName,
    u.lastName
  FROM
    program_course p
  LEFT JOIN
    users u ON p.adminID = u.userID
    `;

  db.query(query, (err, result) => {
    if (err) {
      // console.error("Database error:", err);
      return res.json({
        Status: "Failed",
        Message: "Error fetching program admins.",
      });
    }
    // // console.log(result);
    return res.json({ Status: "Success", result: result });
  });
});

router.get("/fetchPurposeAdmins", (req, res) => {
  const query = `
  SELECT 
    p.purposeID,
    p.purposeName,
    p.adminID,
    u.firstName,
    u.lastName
  FROM
    purposes p
  LEFT JOIN
    users u ON p.adminID = u.userID
    `;

  db.query(query, (err, result) => {
    if (err) {
      // console.error("Database error:", err);
      return res.json({
        Status: "Failed",
        Message: "Error fetching purpose admins.",
      });
    }
    // // console.log(result);
    return res.json({ Status: "Success", result: result });
  });
});

export default router;
