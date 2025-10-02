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

    // FIXED: Use port 465 with secure: true for Render
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465, // Changed from 587
      secure: true, // Changed from false - use SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Must be App Password
      },
      logger: true,
      debug: true,
      // Increased timeouts for slower connections
      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 30000,
    });

    console.log("Transporter created with port 465");

    // Verify connection
    try {
      await transporter.verify();
      console.log("✓ Transporter verified successfully");
    } catch (verifyError) {
      console.error("✗ Transporter verification failed:", verifyError.message);
      // Continue anyway - verification sometimes fails but sending works
    }

    let mailOptions = {
      from: `"CvSU-CCAT Registrar" <${process.env.EMAIL_USER}>`,
      to: receiverEmail,
      subject: `CvSU-CCAT Registrar's Office - Status Update`,
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

    // Provide helpful error messages
    if (error.code === "ETIMEDOUT") {
      console.error("→ Timeout error: Render may be blocking SMTP ports");
      console.error("→ Try using SendGrid or another email service");
    } else if (error.code === "EAUTH") {
      console.error("→ Authentication failed: Check your App Password");
    }

    throw error;
  }
};

export default sendStatusUpdateEmail;
