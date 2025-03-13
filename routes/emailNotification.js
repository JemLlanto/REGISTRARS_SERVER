import express from "express";
import { db } from "../connect.js";
import sendStatusUpdateEmail from "../sendingEmailMessage/sendStatusUpdateEmail.js";

const router = express.Router();

router.post("/sendStatusUpdate", async (req, res) => {
  const { receiverEmail, requestID, newStatus } = req.body;

  const message =
    newStatus === "processing"
      ? "Your request is currently being processed. Please wait while we complete it."
      : newStatus === "completed"
      ? "Your request has been successfully completed."
      : newStatus === "cancelled"
      ? "Your request has been cancelled."
      : null;

  try {
    await sendStatusUpdateEmail(receiverEmail, requestID, newStatus, message);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send email" });
  }
});

export default router;
