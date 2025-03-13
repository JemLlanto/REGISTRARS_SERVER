import express from "express";
import { db } from "../connect.js";
import sendStatusUpdateEmail from "../sendingEmailMessage/sendStatusUpdateEmail.js";

const router = express.Router();

router.post("/sendStatusUpdate", async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    await sendStatusUpdateEmail(to, subject, text);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send email" });
  }
});

export default router;
