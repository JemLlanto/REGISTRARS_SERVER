import express from "express";
import { io } from "../index.js";
import { db } from "../connect.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("It works!");
});

router.post("/cancelRequest", (req, res) => {
  const query =
    "UPDATE requested_documents set status = 'canceled', reason = ? WHERE requestID = ?";
  const values = [req.body.reason, req.body.requestID];

  console.log("SQL values:", values);

  db.query(query, values, (err, result) => {
    if (err) {
      return res.json({ Error: "Inserting data error." });
    }

    const notifQuery =
      "INSERT INTO notification (receiver, message, requestID) VALUES (?, ?, ?)";
    const notifValues = [
      req.body.userID,
      "Your request has been canceled.",
      req.body.requestID,
    ];

    db.query(notifQuery, notifValues, (err, notifResult) => {
      if (err) {
        console.error("Error creating notification:", err);
      } else {
        // Emit socket event with the new notification
        io.to(req.body.userID).emit("new_notification", {
          id: notifResult.insertId,
          receiver: req.body.userID,
          message: "Your request has been canceled.",
          requestID: req.body.requestID,
          created: new Date(),
          isRead: false,
        });
      }
    });

    console.log("Query result:", result);
    return res.json({ Status: "Success", Message: "Request canceled." });
  });
});
router.post("/changeStatus", (req, res) => {
  const query = "UPDATE requested_documents set status = ? WHERE requestID = ?";
  const values = [req.body.newStatus, req.body.requestID];
  const notifMessage =
    req.body.newStatus === "processing"
      ? "Your request is currently being processed."
      : req.body.newStatus === "completed"
      ? "Your request has been completed."
      : null;

  // const notifValues = [req.body.userID, notifMessage, req.body.requestID];

  console.log("SQL values:", values);
  console.log("Message:", notifMessage);

  db.query(query, values, (err, result) => {
    if (err) {
      return res.json({ Error: "Inserting data error." });
    }

    console.log("Query result:", result);
    console.log("Status updated to ", req.body.newStatus);

    const notifQuery =
      "INSERT INTO notification (receiver, message, requestID) VALUES (?, ?, ?)";
    const notifValues = [req.body.userID, notifMessage, req.body.requestID];

    db.query(notifQuery, notifValues, (err, notifResult) => {
      if (err) {
        console.error("Error creating notification:", err);
      } else {
        // Emit socket event with the new notification
        io.to(req.body.userID).emit("new_notification", {
          id: notifResult.insertId,
          receiver: req.body.userID,
          message: notifMessage,
          requestID: req.body.requestID,
          created: new Date(),
          isRead: false,
        });
      }
    });

    return res.json({
      Status: "Success",
      Message: "Request status updated.",
    });
  });
});

export default router;
