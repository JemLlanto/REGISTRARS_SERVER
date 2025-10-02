import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
import ejs from "ejs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendStatusUpdateEmail = async (
  receiverEmail,
  requestID,
  URL,
  newStatus,
  message,
  fullName,
  adminEmail
) => {
  console.log("=== Email Send Attempt ===");
  console.log("Receiver email:", receiverEmail);
  console.log("EMAIL_USER exists:", !!process.env.EMAIL_USER);
  console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);
  console.log(
    "EMAIL_USER value:",
    process.env.EMAIL_USER
      ? process.env.EMAIL_USER.substring(0, 3) + "***"
      : "undefined"
  );

  const statusUpdate = path.join(
    __dirname,
    "./emailTemplates/statusUpdateEmail.ejs"
  );

  try {
    // Check if template file exists
    if (!fs.existsSync(statusUpdate)) {
      console.error("Template file not found at:", statusUpdate);
      throw new Error("Email template file not found");
    }

    const html = ejs.render(fs.readFileSync(statusUpdate, "utf-8"), {
      requestID,
      URL,
      newStatus,
      message,
      fullName,
      adminEmail,
    });

    console.log("Template rendered successfully");

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log("Transporter created");

    // Verify transporter configuration
    await transporter.verify();
    console.log("Transporter verified successfully");

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: receiverEmail,
      subject: `CvSU-CCAT Registrar's Office`,
      html,
    };

    console.log("Attempting to send email...");
    let info = await transporter.sendMail(mailOptions);
    console.log("✓ Email sent successfully!");
    console.log("Message ID:", info.messageId);
    console.log("Response:", info.response);
    return info;
  } catch (error) {
    console.error("✗ Email sending failed!");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error code:", error.code);
    console.error("Full error:", error);
    throw error;
  }
};

export default sendStatusUpdateEmail;
