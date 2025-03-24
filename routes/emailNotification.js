import express from "express";
import { db } from "../connect.js";
import { io } from "../index.js";
import sendRegistrationOTPEmail from "../sendingEmailMessage/sendRegistrationOTPEmail.js";
import sendStatusUpdateEmail from "../sendingEmailMessage/sendStatusUpdateEmail.js";
import sendNewRequestEmail from "../sendingEmailMessage/sendNewRequestEmail.js";

const router = express.Router();

router.post("/sendStatusUpdate", async (req, res) => {
  const { receiverEmail, requestID, newStatus } = req.body;

  const message =
    newStatus === "processing"
      ? "Your request is currently being processed. Please wait while we complete it."
      : newStatus === "completed"
      ? "Your request has been successfully completed."
      : newStatus === "cancelled"
      ? "Your request has been cancelled."
      : null;

  try {
    await sendStatusUpdateEmail(receiverEmail, requestID, newStatus, message);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send email" });
  }
});

router.post("/sendRegistrationOTP", async (req, res) => {
  try {
    const { receiverEmail, firstName, otp } = req.body;

    // Convert db.query to a Promise
    const queryEmail = "SELECT * FROM users WHERE email = ?";
    const existingUsers = await new Promise((resolve, reject) => {
      db.query(queryEmail, [receiverEmail], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    // Check if email exists
    if (existingUsers.length > 0) {
      return res
        .status(403)
        .json({ Message: "This email address is already in use." });
    }

    // Send email if user does not exist
    await sendRegistrationOTPEmail(receiverEmail, firstName, otp);

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

router.post("/sendForgotPasswordOTP", async (req, res) => {
  try {
    const { receiverEmail, firstName, otp } = req.body;

    // Convert db.query to a Promise
    const queryEmail = "SELECT * FROM users WHERE email = ?";
    const existingUsers = await new Promise((resolve, reject) => {
      db.query(queryEmail, [receiverEmail], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    // Check if email exists
    if (existingUsers.length === 0) {
      return res
        .status(404)
        .json({ Message: "This email address is not registered." });
    }

    // Send email if user does not exist
    await sendRegistrationOTPEmail(receiverEmail, firstName, otp);

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

router.post("/sendNewRequestEmail", async (req, res) => {
  const { requestID, firstName, lastName, program } = req.body;
  const message = `${lastName}, ${firstName} requested a document.`;

  const superAdminIDQuery = "SELECT email FROM users WHERE isAdmin = 2";
  db.query(superAdminIDQuery, (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      return;
    }

    const superAdminEmails = result.map((row) => row.email);

    // If no super admins found, exit
    if (superAdminEmails.length === 0) {
      console.log("No super admins found.");
      return;
    }
    // Emit notification to each super admin
    result.forEach((admin) => {
      console.log("Super admin email:", admin.email, requestID);

      try {
        sendNewRequestEmail(admin.email, requestID, message);
        console.log("Email sent to super admin successfully!");
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to send email" });
      }
    });
  });

  const adminIDQuery = `
    SELECT
      u.email 
    FROM users u 
    LEFT JOIN
      program_course p ON u.userID = p.adminID
    WHERE p.programName = ?
    `;
  db.query(adminIDQuery, program, (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      return;
    }

    const adminEmails = result.map((row) => row.email);

    // If no super admins found, exit
    if (adminEmails.length === 0) {
      console.log("No super admins found.");
      return;
    }

    result.forEach((admin) => {
      console.log("Super admin email:", admin.email, requestID);

      try {
        sendNewRequestEmail(admin.email, requestID, message);
        console.log("Email sent to admin successfully!");
        res.status(200).json({
          message: "Email sent to admin and super admin successfully!",
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to send email" });
      }
    });
  });
});
router.post("/sendFeedbackResponseEmail", async (req, res) => {
  try {
    const { requestID, firstName, lastName, program } = req.body;
    const message = `${firstName} ${lastName} has submitted a response to the feedback form.`;
    let emailsSent = false;

    // Query super admins
    const superAdminQuery = "SELECT email, userID FROM users WHERE isAdmin = 2";
    db.query(superAdminQuery, async (err, superAdmins) => {
      if (err) {
        console.error("Database query error (super admins):", err);
        return res
          .status(500)
          .json({ error: "Database error when querying super admins" });
      }

      // Process super admins if found
      if (superAdmins.length > 0) {
        for (const admin of superAdmins) {
          // Send email
          try {
            await sendNewRequestEmail(admin.email, requestID, message);
            console.log(
              `Email sent to super admin ${admin.email} successfully!`
            );
            emailsSent = true;
          } catch (error) {
            console.error(
              `Failed to send email to super admin ${admin.email}:`,
              error
            );
            // Continue with other admins even if one email fails
          }

          // Insert notification
          const notifQuery =
            "INSERT INTO notification (receiver, message, requestID) VALUES ?";
          const notifValues = [[admin.userID, message, requestID]]; // Correctly nested array

          db.query(notifQuery, [notifValues], (notifErr, notifResult) => {
            if (notifErr) {
              console.error(
                `Error creating notification for super admin ${admin.userID}:`,
                notifErr
              );
              return;
            }

            // Emit notification
            io.to(admin.userID).emit("new_notification", {
              id: notifResult.insertId,
              receiver: admin.userID,
              message: message,
              requestID: requestID,
              created: new Date(),
              isRead: false,
            });
          });
        }
      } else {
        console.log("No super admins found.");
      }

      // Query program admins
      const adminQuery = `
        SELECT u.email, u.userID 
        FROM users u 
        LEFT JOIN program_course p ON u.userID = p.adminID
        WHERE p.programName = ?
      `;

      db.query(adminQuery, [program], async (progErr, programAdmins) => {
        if (progErr) {
          console.error("Database query error (program admins):", progErr);
          return res
            .status(500)
            .json({ error: "Database error when querying program admins" });
        }

        // Process program admins if found
        if (programAdmins.length > 0) {
          for (const admin of programAdmins) {
            // Send email
            try {
              await sendNewRequestEmail(admin.email, requestID, message);
              console.log(
                `Email sent to program admin ${admin.email} successfully!`
              );
              emailsSent = true;
            } catch (error) {
              console.error(
                `Failed to send email to program admin ${admin.email}:`,
                error
              );
              // Continue with other admins even if one email fails
            }

            // Insert notification
            const notifQuery =
              "INSERT INTO notification (receiver, message, requestID) VALUES ?";
            const notifValues = [[admin.userID, message, requestID]]; // Correctly nested array

            db.query(notifQuery, [notifValues], (notifErr, notifResult) => {
              if (notifErr) {
                console.error(
                  `Error creating notification for program admin ${admin.userID}:`,
                  notifErr
                );
                return;
              }

              // Emit notification
              io.to(admin.userID).emit("new_notification", {
                id: notifResult.insertId,
                receiver: admin.userID,
                message: message,
                requestID: requestID,
                created: new Date(),
                isRead: false,
              });
            });
          }
        } else {
          console.log("No program admins found for program:", program);
        }

        // Send final response after both queries complete
        if (emailsSent) {
          return res.status(200).json({ message: "Emails sent successfully" });
        } else {
          return res.status(404).json({ message: "No admins found to notify" });
        }
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
