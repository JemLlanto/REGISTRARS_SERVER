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
      : newStatus === "ready to pickup"
      ? "Your request is ready for pickup. Please download your schedule slip and present it to our transaction window."
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
  try {
    const { requestID, firstName, lastName, program } = req.body;
    const message = `${lastName}, ${firstName} requested a document.`;
    let emailsSent = 0;

    // Get super admin emails
    const getSuperAdmins = () => {
      return new Promise((resolve, reject) => {
        const superAdminIDQuery = "SELECT email FROM users WHERE isAdmin = 2";
        db.query(superAdminIDQuery, (err, result) => {
          if (err) {
            console.error("Database query error:", err);
            reject(err);
            return;
          }
          resolve(result);
        });
      });
    };

    // Get admin emails for program
    const getAdmins = () => {
      return new Promise((resolve, reject) => {
        const adminIDQuery = `
          SELECT u.email 
          FROM users u 
          LEFT JOIN program_course p ON u.userID = p.adminID
          WHERE p.programName = ?
        `;
        db.query(adminIDQuery, program, (err, result) => {
          if (err) {
            console.error("Database query error:", err);
            reject(err);
            return;
          }
          resolve(result);
        });
      });
    };

    // Get both admin groups in parallel
    const [superAdmins, admins] = await Promise.all([
      getSuperAdmins(),
      getAdmins(),
    ]);

    // Send emails to super admins
    const superAdminEmails = superAdmins.map((admin) => admin.email);
    if (superAdminEmails.length > 0) {
      console.log(`Sending emails to ${superAdminEmails.length} super admins`);
      for (const admin of superAdmins) {
        try {
          await sendNewRequestEmail(admin.email, requestID, message);
          emailsSent++;
          console.log(`Email sent to super admin ${admin.email} successfully!`);
        } catch (error) {
          console.log(`Failed to send email to ${admin.email}:`, error);
        }
      }
    } else {
      console.log("No super admins found.");
    }

    // Send emails to program admins
    if (admins.length > 0) {
      console.log(`Sending emails to ${admins.length} program admins`);
      for (const admin of admins) {
        try {
          await sendNewRequestEmail(admin.email, requestID, message);
          emailsSent++;
          console.log(`Email sent to admin ${admin.email} successfully!`);
        } catch (error) {
          console.log(`Failed to send email to ${admin.email}:`, error);
        }
      }
    } else {
      console.log("No program admins found.");
    }

    // Send one response after all emails are handled
    if (emailsSent > 0) {
      console.log(`Email sent to ${emailsSent} recipients!`),
        res.status(200).json({
          message: `Email sent successfully to ${emailsSent} recipients!`,
        });
    } else {
      res.status(404).json({
        message: "No recipients found to send emails to.",
      });
    }
  } catch (error) {
    console.error("Error in email sending route:", error);
    res.status(500).json({
      error: "Failed to send email",
      details: error.message,
    });
  }
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
            console.log(admin.userID);
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
