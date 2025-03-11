import express from "express";
// import { io } from "../index.js";
import { db } from "../connect.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("It works!");
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

export default router;
