import express from "express";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import crypto from "crypto";
import { db } from "../connect.js";
import jwt from "jsonwebtoken";

const router = express.Router();
const salt = 10;

router.get("/test", (req, res) => {
  res.send("It works!");
});

router.post("/updatePersonalInfo", async (req, res) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      studentID,
      mobileNum,
      dateOfBirth,
      userID,
    } = req.body;
    const values = [
      firstName,
      middleName,
      lastName,
      studentID,
      mobileNum,
      dateOfBirth,
      userID,
    ];

    const updateQuery =
      "UPDATE users SET  firstName = ?, middleName = ?, lastName = ?, studentID = ?, mobileNum = ?, dateOfBirth = ? WHERE userID = ?";
    db.query(updateQuery, values, (updateErr, updateResult) => {
      if (updateErr) {
        console.error("Update error: ", updateErr);
        return res
          .status(500)
          .json({ error: "Server error", details: updateErr.message });
      }
      return res.status(200).json({
        message: "Profile updated successfully.",
      });
    });
  } catch (error) {
    console.error("Server error: ", error);
    return res.status(500).json({ error: "Server error" });
  }
});

router.post("/forgotPassword", async (req, res) => {
  try {
    const { token, password, receiverEmail } = req.body;

    // Verify the token exists and hasn't expired
    const tokenQuery =
      "SELECT reset_token_expires FROM users WHERE email = ? AND reset_token = ?";
    db.query(tokenQuery, [receiverEmail, token], async (err, result) => {
      if (err || !result.length) {
        return res
          .status(401)
          .json({ error: "Invalid or expired reset token" });
      }

      // Check if token has expired
      const tokenExpires = new Date(result[0].reset_token_expires);
      if (tokenExpires < new Date()) {
        return res.status(401).json({ error: "Reset token has expired" });
      }

      // Token is valid, proceed with password reset
      const saltRounds = parseInt(process.env.SALT);
      const hashedPassword = await bcrypt.hash(password.toString(), saltRounds);

      const updateQuery =
        "UPDATE users SET password = ?, reset_token = NULL, reset_token_expires = NULL WHERE email = ?";
      db.query(
        updateQuery,
        [hashedPassword, receiverEmail],
        (updateErr, updateResult) => {
          if (updateErr) return res.status(500).json({ error: "Server error" });
          return res.json({
            status: "Success",
            message: "Password updated successfully.",
          });
        }
      );
    });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
});

router.post("/resetToken", async (req, res) => {
  // Store the token in your database with an expiration time
  try {
    const query =
      "UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE email = ?";

    const resetToken = crypto.randomBytes(32).toString("hex"); // You'll need to import 'crypto'
    const tokenExpires = new Date(Date.now() + 3600000); // Token valid for 1 hour

    await db.query(
      query,
      [resetToken, tokenExpires, req.body.receiverEmail],
      (err, result) => {
        if (err) {
          return res.status(500).json({
            Status: "Error",
            Message: "Failed to generate reset token.",
          });
        }

        return res.json({
          Status: "Success",
          Message: "Email verified successfully.",
          token: resetToken,
        });
      }
    );
  } catch (error) {
    console.error("Error storing reset token:", error);
    return res.status(500).json({
      Status: "Error",
      message: "Server error",
    });
  }
});
export default router;
