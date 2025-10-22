import dotenv from "dotenv";
dotenv.config();
import ejs from "ejs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as brevo from "@getbrevo/brevo";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendRegistrationOTPEmail = async (receiverEmail, firstName, otp) => {
  console.log("=== Sending OTP Email (Brevo) ===");
  console.log("Receiver email:", receiverEmail);
  console.log("First name:", firstName);
  console.log("BREVO_API_KEY exists:", !!process.env.BREVO_API_KEY);

  const registrationOTP = path.join(
    __dirname,
    "./emailTemplates/registrationOTPEmail.ejs"
  );

  try {
    // Check if template file exists
    if (!fs.existsSync(registrationOTP)) {
      console.error("Template file not found at:", registrationOTP);
      throw new Error("Email template file not found");
    }

    // Render the email template
    const html = ejs.render(fs.readFileSync(registrationOTP, "utf-8"), {
      firstName,
      otp,
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
    sendSmtpEmail.subject = "CvSU-CCAT Registrar's Office - Registration OTP";
    sendSmtpEmail.htmlContent = html;
    sendSmtpEmail.sender = {
      name: "CvSU-CCAT Registrar",
      email: process.env.BREVO_SENDER_EMAIL || process.env.EMAIL_USER,
    };
    sendSmtpEmail.to = [{ email: receiverEmail }];

    // Send email
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("✓ OTP email sent successfully!");
    console.log("Message ID:", data.messageId);
    console.log("OTP sent to:", receiverEmail);

    return data;
  } catch (error) {
    console.error("✗ OTP email sending failed!");
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
        console.error("→ Bad request: Check email address and content");
      } else if (error.status === 402) {
        console.error("→ Payment required: Check your Brevo account credits");
      } else if (error.status === 404) {
        console.error("→ Sender email not verified in Brevo");
      }
    } else if (error.code === "ECONNECTION" || error.code === "ETIMEDOUT") {
      console.error("→ Network error: Check your internet connection");
    }

    console.error("Full error:", error);
    throw error;
  }
};

export default sendRegistrationOTPEmail;
