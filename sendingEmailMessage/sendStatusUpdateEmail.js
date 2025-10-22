import dotenv from "dotenv";
dotenv.config();
import ejs from "ejs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as brevo from "@getbrevo/brevo";

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
  console.log("=== Email Send Attempt (Brevo) ===");
  console.log("Receiver email:", receiverEmail);
  console.log("BREVO_API_KEY exists:", !!process.env.BREVO_API_KEY);

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

    // Initialize Brevo API client
    const apiInstance = new brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    );

    // Create send email object
    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.subject = "CvSU-CCAT Registrar's Office - Status Update";
    sendSmtpEmail.htmlContent = html;
    sendSmtpEmail.sender = {
      name: "CvSU-CCAT Registrar",
      email: process.env.BREVO_SENDER_EMAIL || process.env.EMAIL_USER,
    };
    sendSmtpEmail.to = [{ email: receiverEmail }];

    // Send email
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("✓ Email sent successfully via Brevo!");
    console.log("Message ID:", data.messageId);

    return data;
  } catch (error) {
    console.error("✗ Email sending failed!");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);

    // Provide helpful error messages
    if (error.response) {
      console.error(
        "→ Brevo API Error:",
        error.response.body || error.response.text
      );

      if (error.status === 401) {
        console.error("→ Authentication failed: Check BREVO_API_KEY in .env");
      } else if (error.status === 400) {
        console.error("→ Bad request: Check email addresses and content");
      } else if (error.status === 402) {
        console.error("→ Payment required: Check your Brevo account credits");
      }
    } else if (error.code === "ECONNECTION" || error.code === "ETIMEDOUT") {
      console.error("→ Network error: Check your internet connection");
    }

    throw error;
  }
};

export default sendStatusUpdateEmail;
