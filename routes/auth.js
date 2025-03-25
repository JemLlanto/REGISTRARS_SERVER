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

router.get("/fetchUserData", (req, res) => {
  const userID = req.query.userID;

  if (!userID) return res.json({ Error: "Missing userID" });

  const query = " SELECT * FROM users WHERE userID = ?";
  db.query(query, [userID], (err, data) => {
    if (err) return res.json({ Error: "Error fetching user data." });
    if (data.length > 0) {
      return res.json(data[0]);
    } else {
      return res.json({ Error: "User not found" });
    }
  });
});

router.post("/register", (req, res) => {
  const { firstName, middleName, lastName, email, password } = req.body;

  const requiredFields = {
    firstName,
    lastName,
    email,
    password,
  };

  // Find any missing required fields
  const missingFields = Object.keys(requiredFields).filter(
    (field) =>
      requiredFields[field] === undefined ||
      requiredFields[field] === null ||
      requiredFields[field] === ""
  );

  if (missingFields.length > 0) {
    return res.status(400).json({
      error: "Required fields are missing",
      missingFields: missingFields,
    });
  }

  const saltRounds = parseInt(process.env.SALT);
  const query =
    "INSERT INTO users (`firstName`, `middleName`, `lastName`, `email`, `password`) VALUES (?)";
  bcrypt.hash(password.toString(), saltRounds, (err, hashedPassword) => {
    if (err) return res.json({ Error: "Error hashing password" });
    const values = [firstName, middleName, lastName, email, hashedPassword];

    db.query(query, [values], (err, result) => {
      if (err) return res.json({ Error: "Inserting data error." });
      return res.json({ Status: "Success", Message: "User registered." });
    });
  });
});

router.post("/login", (req, res) => {
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [req.body.email], (err, data) => {
    if (err) return res.json({ Error: "Login Error" });
    if (data.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        data[0].password,
        (err, response) => {
          if (err) return res.json({ Error: "Compare error." });
          if (response) {
            const userID = data[0].userID; // ✅ Correct variable name
            // console.log("User ID from DB:", userID);
            const token = jwt.sign(
              { userID }, // ✅ Store correctly
              process.env.JWT_SECRET_KEY,
              { expiresIn: "1d" }
            );

            const queryIsAdmin = "SELECT isAdmin FROM users WHERE userID = ?";

            db.query(queryIsAdmin, [userID], (err, result) => {
              if (err) return res.json({ Error: "Error occured." });
              const isAdmin = result[0].isAdmin;
              res.cookie("token", token);
              console.log("Is Admin: ", isAdmin);
              return res.json({ Status: "Success", isAdmin: isAdmin });
            });
          } else {
            return res.json({ Error: "Invalid credentials." });
          }
        }
      );
    } else {
      return res.json({ Error: "Invalid credentials." });
    }
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});

router.post("/forgotPassword", async (req, res) => {
  try {
    const { token, password, receiverEmail } = req.body;

    const requiredFields = {
      token,
      password,
      receiverEmail,
    };

    // Find any missing required fields
    const missingFields = Object.keys(requiredFields).filter(
      (field) =>
        requiredFields[field] === undefined ||
        requiredFields[field] === null ||
        requiredFields[field] === ""
    );

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: "Required fields are missing",
        missingFields: missingFields,
      });
    }

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
          if (updateErr) {
            console.log(updateErr);
            return res.status(500).json({ error: "Server error" });
          }
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
