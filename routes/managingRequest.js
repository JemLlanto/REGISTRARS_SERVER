import express from "express";
// import { io } from "../index.js";
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
    console.log("Query result:", result);
    return res.json({ Status: "Success", Message: "Request canceled." });
  });
});
router.post("/changeStatus", (req, res) => {
  const query = "UPDATE requested_documents set status = ? WHERE requestID = ?";
  const values = [req.body.newStatus, req.body.requestID];
  const notifValues = [
    req.body.userID,
    "Theres an update to your request.",
    req.body.requestID,
  ];

  console.log("SQL values:", values);

  db.query(query, values, (err, result) => {
    if (err) {
      return res.json({ Error: "Inserting data error." });
    }

    console.log("Query result:", result);
    console.log("Status updated to ", req.body.newStatus);

    const notifQuery =
      "INSERT INTO notification (receiver, message, requestID) VALUES (?, ?, ?)";
    const notifValues = [
      req.body.userID,
      "There's an update to your request.",
      req.body.requestID,
    ];

    db.query(notifQuery, notifValues);

    return res.json({
      Status: "Success",
      Message: "Request status updated.",
    });
  });
});

export default router;
