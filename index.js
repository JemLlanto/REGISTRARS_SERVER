import express, { response } from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import http from "http";
import { Server } from "socket.io";
import { db } from "./connect.js";
import dotenv from "dotenv";
dotenv.config();

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
import managingAdminRoutes from "./routes/manageAdmin.js";
import notificationRoutes from "./routes/notification.js";
import emailNotificationRoutes from "./routes/emailNotification.js";
import updateProfileRoutes from "./routes/updateProfile.js";
import feedbackFormRoutes from "./routes/feedbackForm.js";

const app = express();

app.use(express.json());

// Define allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  process.env.VITE_REACT_APP_FRONTEND_BASEURL,
  "https://registrars-client.onrender.com",
];

const server = http.createServer(app);

// Configure Socket.IO with CORS
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true, // Allow credentials (cookies, auth headers)
  },
});

// Export io so it can be used in other files
export { io };

// Socket.IO connection handling
io.on("connection", (socket) => {
  // console.log("User connected:", socket.id);

  // User joins their own room based on their userID
  socket.on("join_user", (userID) => {
    socket.join(userID);
    // console.log(`User ${userID} joined their room`);
  });

  socket.on("disconnect", () => {
    // console.log("User disconnected:", socket.id);
  });
});

// Apply CORS middleware for Express routes
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    allowedHeaders: ["authorization", "Content-Type"],
  })
);
app.use(cookieParser());

// Serve images from 'public/uploads' folder
app.use("/uploads", express.static(path.join(__dirname, "./public/uploads")));
app.use(
  "/scheduleSlipUploads",
  express.static(path.join(__dirname, "./public/uploads/scheduleSlip"))
);

const verifyUser = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers["authorization"];
  // console.log("Request Headers:", req.headers);
  // console.log("Auth header:", authHeader);
  // console.log("All headers:", req.headers);
  // console.log("Authorization header:", req.headers.authorization);
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("No token found");
    return res.status(401).json({ Error: "Not authenticated." });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log("Token verification failed:", err.message); // 👈 Debug log
      return res.status(403).json({ Error: "Invalid Token" });
    }

    req.userID = decoded.userID;
    next();
  });
};

app.get("/", verifyUser, (req, res) => {
  const userID = req.userID;

  if (!userID) return res.json({ Error: "Missing userID" });

  const query = `  
  SELECT 
    u.*,
    fs.isAutomatic,
    fs.isOn
  FROM users u
  LEFT JOIN form_switch fs ON fs.switchID = 1
  WHERE u.userID = ?`;
  db.query(query, [userID], (err, data) => {
    if (err) return res.json({ Error: "Error fetching user data." });
    if (data.length > 0) {
      return res.json({ Status: "Success", data: data[0] });
    } else {
      return res.json({ Error: "User not found" });
    }
  });
  // return res.json({ Status: "Success", userID: req.userID });
});

app.use("/api/auth", authRoutes);
app.use("/api/documents", docRoutes);
app.use("/api/fetchingDocuments", fetchingDocRoutes);
app.use("/api/managingRequest", managingRequestRoutes);
app.use("/api/manageAccount", manageAccount);
app.use("/api/manageAdmin", managingAdminRoutes);
app.use("/api/dashboard", dashboard);
app.use("/api/notifications", notificationRoutes);
app.use("/api/emailNotification", emailNotificationRoutes);
app.use("/api/updateProfile", updateProfileRoutes);
app.use("/api/feedbackForm", feedbackFormRoutes);

server.listen(5000, () => {
  console.log("running...");
});
