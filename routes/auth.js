import express from "express";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
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
  const saltRounds = parseInt(process.env.SALT);
  const query =
    "INSERT INTO users (`firstName`, `middleName`, `lastName`, `email`, `password`) VALUES (?)";
  bcrypt.hash(
    req.body.password.toString(),
    saltRounds,
    (err, hashedPassword) => {
      if (err) return res.json({ Error: "Error hashing password" });
      const values = [
        req.body.firstName,
        req.body.middleName,
        req.body.lastName,
        req.body.email,
        hashedPassword,
      ];

      db.query(query, [values], (err, result) => {
        if (err) return res.json({ Error: "Inserting data error." });
        return res.json({ Status: "Success", Message: "User registered." });
      });
    }
  );
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
            console.log("User ID from DB:", userID);
            const token = jwt.sign(
              { userID }, // ✅ Store correctly
              process.env.JWT_SECRET_KEY,
              { expiresIn: "1d" }
            );
            res.cookie("token", token);
            return res.json({ Status: "Success" });
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

export default router;
