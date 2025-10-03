import dotenv from "dotenv";
dotenv.config();
import ejs from "ejs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";

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

    // Brevo API request using axios
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "CvSU-CCAT Registrar",
          email: process.env.EMAIL_USER,
        },
        to: [
          {
            email: receiverEmail,
            name: fullName || receiverEmail,
          },
        ],
        subject: "CvSU-CCAT Registrar's Office - Status Update",
        htmlContent: html,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "api-key": process.env.BREVO_API_KEY,
        },
      }
    );

    console.log("Brevo API response status:", response.status);
    console.log("✓ Email sent successfully via Brevo!");
    console.log("Message ID:", response.data.messageId);

    return response.data;
  } catch (error) {
    console.error("✗ Email sending failed!");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);

    // Handle axios error response
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);

      // Provide helpful error messages
      if (error.response.status === 401) {
        console.error("→ API Key error: Check your BREVO_API_KEY in .env");
      } else if (error.response.status === 400) {
        console.error(
          "→ Bad Request: Check sender email is verified in Brevo dashboard"
        );
      } else if (error.response.status === 403) {
        console.error(
          "→ Forbidden: API key may not have permission to send emails"
        );
      }
    } else if (error.request) {
      console.error("→ No response received from Brevo API");
      console.error("Request details:", error.request);
    } else {
      console.error("→ Error setting up request:", error.message);
    }

    throw error;
  }
};

export default sendStatusUpdateEmail;
