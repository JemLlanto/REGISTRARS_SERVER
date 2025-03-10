import express from "express";
// import { io } from "../index.js";
import { db } from "../connect.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("It works!");
});

router.get("/fetchNotification/:userID", (req, res) => {
  const query = "SELECT * FROM notification WHERE receiver = ?";
  const { userID } = req.params;

  console.log("User ID:", userID);

  db.query(query, [userID], (err, data) => {
    if (err) {
      return res.json({ Error: "Fetching data error." });
    }
    if (data.length > 0) {
      console.log("Query result:", data);
      return res.json({ Status: "Success", data: data });
    } else {
      return res.json({
        Status: "Error",
        Message: "No notification.",
      });
    }
  });
});

export default router;
