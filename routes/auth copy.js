import express from "express";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import { db } from "../connect.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("It works!");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body.inputs;
  try {
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, results) => {
        if (results.length === 0)
          return res.status(400).json({ error: "Invalid credentials" });

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
          expiresIn: "1h",
        });
        res.json({ message: "Login successful", token });
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
