import express from "express";
import { db } from "../connect.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("It works!");
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

export default router;
