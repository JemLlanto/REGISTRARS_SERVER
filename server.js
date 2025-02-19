import express, { response } from "express";
import mysql from "mysql";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
const salt = 10;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "registrar_database",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: ", err);
    return;
  }
  console.log("Connected to MySQL database");
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "Not authenticated." });
  } else {
    jwt.verify(token, "RegistrarsOnlineRequestSystem2025", (err, decoded) => {
      if (err) {
        return res.status(403).json({ Error: "Invalid Token" });
      } else {
        console.log("Decoded Token:", decoded); // 🔍 Debug log
        req.userID = decoded.userID; // ✅ Correct property
        console.log("Extracted userID:", req.userID);
        next();
      }
    });
  }
};

app.get("/", verifyUser, (req, res) => {
  return res.json({ Status: "Success", userID: req.userID });
});

app.post("/api/auth/register", (req, res) => {
  const query =
    "INSERT INTO users (`firstName`, `lastName`, `email`, `password`) VALUES (?)";
  bcrypt.hash(req.body.password.toString(), salt, (err, hashedPassword) => {
    if (err) return res.json({ Error: "Error hashing password" });
    const values = [
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      hashedPassword,
    ];
    db.query(query, [values], (err, result) => {
      if (err) return res.json({ Error: "Inserting data error." });
      return res.json({ Status: "Success" });
    });
  });
});

app.post("/api/auth/login", (req, res) => {
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
              "RegistrarsOnlineRequestSystem2025",
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

app.get("/api/auth/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});

app.listen(5000, () => {
  console.log("running...");
});
