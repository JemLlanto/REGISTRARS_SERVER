import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
import ejs from "ejs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendRegistrationOTPEmail = async (receiverEmail, firstName, otp) => {
  //   console.log("Receiver email new:", receiverEmail, firstName,otp);

  const registrationOTP = path.join(
    __dirname,
    "./emailTemplates/registrationOTPEmail.ejs"
  );
  //   console.log("Path:", registrationOTP);

  const html = ejs.render(fs.readFileSync(registrationOTP, "utf-8"), {
    firstName,
    otp,
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
      to: receiverEmail,
      subject: `CvSU-CCAT Registrar's Office`,
      html,
    };

    let info = await transporter.sendMail(mailOptions);
    console.log("OTP ", otp, " sent to ", receiverEmail);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default sendRegistrationOTPEmail;
