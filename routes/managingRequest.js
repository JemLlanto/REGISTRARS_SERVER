import express from "express";
import { io } from "../index.js";
import { db } from "../connect.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("It works!");
});

router.post("/cancelRequest", (req, res) => {
  const query =
    "UPDATE requested_documents set status = 'cancelled', reason = ? WHERE requestID = ?";
  const values = [req.body.reason, req.body.requestID];

  // // console.log("SQL values:", values);

  db.query(query, values, (err, result) => {
    if (err) {
      return res.json({ Error: "Inserting data error." });
    }

    const notifQuery =
      "INSERT INTO notification (receiver, message, requestID) VALUES (?, ?, ?)";
    const notifValues = [
      req.body.userID,
      "Your request has been cancelled.",
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
          message: "Your request has been cancelled.",
          requestID: req.body.requestID,
          created: new Date(),
          isRead: false,
        });
      }
    });

    // console.log("Query result:", result);
    return res.json({ Status: "Success", Message: "Request cancelled." });
  });
});
router.post("/changeStatus", (req, res) => {
  const query = "UPDATE requested_documents set status = ? WHERE requestID = ?";
  const values = [req.body.newStatus, req.body.requestID];
  const notifMessage =
    req.body.newStatus === "processing"
      ? "Your request is currently being processed."
      : req.body.newStatus === "ready to pickup"
      ? "Your request is ready for pickup."
      : req.body.newStatus === "completed"
      ? "Your request has been completed."
      : null;

  // const notifValues = [req.body.userID, notifMessage, req.body.requestID];

  // // console.log("SQL values:", values);
  // // console.log("Message:", notifMessage);

  db.query(query, values, (err, result) => {
    if (err) {
      return res.json({ Error: "Inserting data error." });
    }

    // // console.log("Query result:", result);
    // // console.log("Status updated to ", req.body.newStatus);

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
router.post("/switchForm", (req, res) => {
  const { isAdmin, isOn } = req.body;

  const switchTo = isOn === 0 ? 1 : 0;

  if (isAdmin === 0) {
    return res.status(401).json({ message: "User unauthorized!" });
  } else {
    const query = "UPDATE form_switch set isOn = ? WHERE switchID = 1";

    db.query(query, [switchTo], (err, result) => {
      if (err) {
        // console.log(err);
        return res.json({ Error: "Updating data error." });
      }

      return res.status(200).json({
        message:
          isOn === 0
            ? "The request form has been opened."
            : "The request form has been closed.",
      });
    });
  }
});
router.post("/switchFormAutomatic", (req, res) => {
  const { isAdmin, isAutomatic } = req.body;

  const switchTo = isAutomatic === 0 ? 1 : 0;

  if (isAdmin === 0) {
    return res.status(401).json({ message: "User unauthorized!" });
  } else {
    const query =
      "UPDATE form_switch set isOn = 1, isAutomatic = ? WHERE switchID = 1";

    db.query(query, [switchTo], (err, result) => {
      if (err) {
        // console.log(err);
        return res.json({ Error: "Updating data error." });
      }

      return res.status(200).json({
        message:
          isAutomatic === 0
            ? "The request form has been set to automatic mode."
            : "The request form has been set to manual mode.",
      });
    });
  }
});

export default router;
