import express from "express";
import { db } from "../connect.js";
import sendRegistrationOTPEmail from "../sendingEmailMessage/sendRegistrationOTPEmail.js";
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

router.post("/sendRegistrationOTP", async (req, res) => {
  try {
    const { receiverEmail, firstName, otp } = req.body;

    // Convert db.query to a Promise
    const queryEmail = "SELECT * FROM users WHERE email = ?";
    const existingUsers = await new Promise((resolve, reject) => {
      db.query(queryEmail, [receiverEmail], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    // Check if email exists
    if (existingUsers.length > 0) {
      return res
        .status(403)
        .json({ Message: "This email address is already in use." });
    }

    // Send email if user does not exist
    await sendRegistrationOTPEmail(receiverEmail, firstName, otp);

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

router.post("/sendForgotPasswordOTP", async (req, res) => {
  try {
    const { receiverEmail, firstName, otp } = req.body;

    // Convert db.query to a Promise
    const queryEmail = "SELECT * FROM users WHERE email = ?";
    const existingUsers = await new Promise((resolve, reject) => {
      db.query(queryEmail, [receiverEmail], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    // Check if email exists
    if (existingUsers.length === 0) {
      return res
        .status(404)
        .json({ Message: "This email address is not registered." });
    }

    // Send email if user does not exist
    await sendRegistrationOTPEmail(receiverEmail, firstName, otp);

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

export default router;
