import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();
import ejs from "ejs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

const sendStatusUpdateEmail = async (
  receiverEmail,
  requestID,
  URL,
  newStatus,
  message,
  fullName,
  adminEmail
) => {
  console.log("=== Email Send Attempt (Resend) ===");
  console.log("Receiver email:", receiverEmail);
  console.log("RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY);
  // console.log("FROM_EMAIL exists:", !!process.env.FROM_EMAIL);

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

    // Send email using Resend
    const data = await resend.emails.send({
      from: "CvSU-CCAT Registrar <onboarding@resend.dev>",
      to: receiverEmail,
      subject: "CvSU-CCAT Registrar's Office - Status Update",
      html: html,
    });

    console.log("✓ Email sent successfully!");
    console.log("Email ID:", data.id);
    return data;
  } catch (error) {
    console.error("✗ Email sending failed!");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);

    if (error.message.includes("API key")) {
      console.error("→ Invalid or missing RESEND_API_KEY");
      console.error("→ Get your API key from: https://resend.com/api-keys");
    } else if (error.message.includes("domain")) {
      console.error("→ Domain verification issue");
      console.error("→ Verify your domain at: https://resend.com/domains");
    }

    console.error("Full error:", error);
    throw error;
  }
};

export default sendStatusUpdateEmail;
