import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
import ejs from "ejs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendNewRequestEmail = async (email, requestID, URL, message) => {
  // console.log("Message: ", message);

  const statusUpdate = path.join(
    __dirname,
    "./emailTemplates/newRequestEmail.ejs"
  );
  const html = ejs.render(fs.readFileSync(statusUpdate, "utf-8"), {
    requestID,
    URL,
    message,
  });

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `CvSU-CCAT Registrar's Office`,
      html,
    };

    let info = await transporter.sendMail(mailOptions);
    // console.log("Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default sendNewRequestEmail;
