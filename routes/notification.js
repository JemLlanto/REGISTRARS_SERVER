import express from "express";
// import { io } from "../index.js";
import { db } from "../connect.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("It works!");
});

router.get("/fetchNotification/:userID", (req, res) => {
  const query =
    "SELECT * FROM notification WHERE receiver = ? ORDER BY created DESC";
  const { userID } = req.params;

  // console.log("User ID notifs:", userID);

  db.query(query, [userID], (err, data) => {
    if (err) {
      return res.json({ Error: "Fetching data error." });
    }
    if (data.length > 0) {
      // console.log("Query result:", data);
      return res.json({ Status: "Success", data: data });
    } else {
      return res.json({
        Status: "Error",
        Message: "No notification.",
      });
    }
  });
});

// Add route to mark notification as read
router.post("/markAsRead/:requestID", (req, res) => {
  const query = "UPDATE notification SET isRead = true WHERE requestID = ?";
  const { requestID } = req.params;

  console.log("Notif ID to update: ", requestID);

  db.query(query, [requestID], (err, result) => {
    if (err) {
      return res.json({ Error: "Updating data error." });
    }
    console.log("isRead updated");
    return res.json({
      Status: "Success",
      Message: "Notification marked as read.",
    });
  });
});

export default router;
