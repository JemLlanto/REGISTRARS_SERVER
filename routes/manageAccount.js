import express from "express";
import { db } from "../connect.js";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = "RegistrarOffice";
const salt = 10;

router.get("/test", (req, res) => {
  res.send("It works!");
});

router.post("/setUpAccount", (req, res) => {
  const query =
    "UPDATE users set isNewAccount = 0, dateOfBirth = ?, sex = ?, studentID = ?, program = ?, mobileNum = ? WHERE userID = ?";
  const values = [
    req.body.dateOfBirth,
    req.body.sex,
    req.body.studentID,
    req.body.program,
    req.body.mobileNum,
    req.body.userID,
  ];

  console.log("SQL values:", values);

  db.query(query, values, (err, result) => {
    if (err) {
      return res.json({ Error: "Inserting data error." });
    }
    console.log("Query result:", result);
    return res.json({ Status: "Success", Message: "Profile set-up complete." });
  });
});
router.post("/dontEditProfile", (req, res) => {
  const query = "UPDATE users set isNewAccount = 0 WHERE userID = ?";

  db.query(query, [req.body.userID], (err, result) => {
    if (err) {
      return res.json({ Error: "Inserting data error." });
    }
    console.log("Query result:", result);
    return res.json({ Status: "Success", Message: "Profile set-up complete." });
  });
});
export default router;
