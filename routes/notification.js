import express from "express";
// import { io } from "../index.js";
import { db } from "../connect.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("It works!");
});
router.get("/fetchNotification/:userID", async (req, res) => {
  const { userID } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    // For standard MySQL package
    db.query(
      `SELECT * FROM notification
       WHERE receiver = ?
       ORDER BY created DESC 
       LIMIT ? OFFSET ?`,
      [userID, limit, offset],
      (error, results) => {
        if (error) {
          console.error("Database error:", error);
          return res.status(500).json({
            Status: "Error",
            Message: error.message,
          });
        }

        // Now results is the array of notifications
        console.log("Query returned", results.length, "results");

        res.status(200).json({
          Status: "Success",
          data: results,
        });
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({
      Status: "Error",
      Message: error.message,
    });
  }
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

router.post("/markAllAsRead/:userID", (req, res) => {
  const query = "UPDATE notification SET isRead = 1 WHERE receiver = ?";
  const { userID } = req.params;

  console.log("Notif ID to update: ", userID);

  db.query(query, [userID], (err, result) => {
    if (err) {
      return res.json({ Error: "Updating data error." });
    }
    console.log("isRead updated");
    return res.status(200).json({
      message: "All notifications have been marked as read.",
    });
  });
});

export default router;
