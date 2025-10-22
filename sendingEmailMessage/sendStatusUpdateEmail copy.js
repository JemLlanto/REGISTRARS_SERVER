import dotenv from "dotenv";
dotenv.config();
import ejs from "ejs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";

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
  console.log("=== Email Send Attempt (Nodemailer) ===");
  console.log("Receiver email:", receiverEmail);
  console.log("EMAIL_USER exists:", !!process.env.EMAIL_USER);
  console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);

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

    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // or your email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App password for Gmail
      },
      connectionTimeout: 15000, // 15 seconds
      greetingTimeout: 15000, // 15 seconds
      socketTimeout: 15000, // 15 seconds
    });

    // Email options
    const mailOptions = {
      from: {
        name: "CvSU-CCAT Registrar",
        address: process.env.EMAIL_USER,
      },
      to: receiverEmail,
      subject: "CvSU-CCAT Registrar's Office - Status Update",
      html: html,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log("✓ Email sent successfully via Nodemailer!");
    console.log("Message ID:", info.messageId);
    console.log("Response:", info.response);

    return info;
  } catch (error) {
    console.error("✗ Email sending failed!");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);

    // Provide helpful error messages
    if (error.code === "EAUTH") {
      console.error(
        "→ Authentication failed: Check EMAIL_USER and EMAIL_PASS in .env"
      );
      console.error(
        "→ For Gmail: Make sure you're using an App Password, not your regular password"
      );
    } else if (error.code === "ECONNECTION") {
      console.error(
        "→ Connection error: Check your internet connection and email service"
      );
    } else if (error.code === "ETIMEDOUT") {
      console.error("→ Request timed out: Email service may be unavailable");
    } else if (error.responseCode === 550) {
      console.error("→ Invalid recipient email address");
    }

    throw error;
  }
};

export default sendStatusUpdateEmail;
