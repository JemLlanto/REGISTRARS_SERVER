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

const sendNewRequestEmail = async (email, requestID, URL, message) => {
  console.log("=== Sending New Request Email (Resend) ===");
  console.log("Receiver email:", email);
  console.log("Request ID:", requestID);
  console.log("RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY);

  const statusUpdate = path.join(
    __dirname,
    "./emailTemplates/newRequestEmail.ejs"
  );

  try {
    // Check if template file exists
    if (!fs.existsSync(statusUpdate)) {
      console.error("Template file not found at:", statusUpdate);
      throw new Error("Email template file not found");
    }

    // Render the email template
    const html = ejs.render(fs.readFileSync(statusUpdate, "utf-8"), {
      requestID,
      URL,
      message,
    });

    console.log("Template rendered successfully");

    // Send email using Resend
    const data = await resend.emails.send({
      from: "CvSU-CCAT Registrar <onboarding@resend.dev>",
      to: email,
      subject: "CvSU-CCAT Registrar's Office - New Request",
      html: html,
    });

    console.log("✓ New request email sent successfully!");
    console.log("Email ID:", data.id);

    return data;
  } catch (error) {
    console.error("✗ New request email sending failed!");
    console.error("Error message:", error.message);

    if (error.message.includes("API key")) {
      console.error("→ Invalid or missing RESEND_API_KEY");
      console.error("→ Get your API key from: https://resend.com/api-keys");
    } else if (error.message.includes("domain")) {
      console.error("→ Domain verification issue");
      console.error(
        "→ Use 'onboarding@resend.dev' for testing or verify your domain"
      );
    }

    console.error("Full error:", error);
    throw error;
  }
};

export default sendNewRequestEmail;
