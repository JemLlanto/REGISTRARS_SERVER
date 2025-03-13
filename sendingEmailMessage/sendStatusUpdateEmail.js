import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
import ejs from "ejs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendStatusUpdateEmail = async (to, subject, text) => {
  const statusUpdate = path.join(
    __dirname,
    "./emailTemplates/statusUpdateEmail.ejs"
  );
  const html = ejs.render(fs.readFileSync(statusUpdate, "utf-8"), {
    message: text,
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
      to,
      subject,
      html,
    };

    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default sendStatusUpdateEmail;
