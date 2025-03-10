import express, { response } from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ROUTES
import authRoutes from "./routes/auth.js";
import docRoutes from "./routes/documents.js";
import fetchingDocRoutes from "./routes/fetchingDocuments.js";
import dashboard from "./routes/dashboard.js";
import manageAccount from "./routes/manageAccount.js";
import managingRequestRoutes from "./routes/managingRequest.js";

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

// Serve images from 'public/uploads' folder
app.use("/uploads", express.static(path.join(__dirname, "./public/uploads")));

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

app.use("/api/auth", authRoutes);
app.use("/api/documents", docRoutes);
app.use("/api/fetchingDocuments", fetchingDocRoutes);
app.use("/api/managingRequest", managingRequestRoutes);
app.use("/api/manageAccount", manageAccount);
app.use("/api/dashboard", dashboard);

app.listen(5000, () => {
  console.log("running...");
});
