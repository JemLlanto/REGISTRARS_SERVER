import express from "express";
import { db } from "../connect.js";
import { io } from "../index.js";
import dotenv from "dotenv";
dotenv.config();
import sendRegistrationOTPEmail from "../sendingEmailMessage/sendRegistrationOTPEmail.js";
import sendStatusUpdateEmail from "../sendingEmailMessage/sendStatusUpdateEmail.js";
import sendNewRequestEmail from "../sendingEmailMessage/sendNewRequestEmail.js";

const router = express.Router();

router.post("/sendStatusUpdate", async (req, res) => {
  const { receiverEmail, requestID, newStatus, reason } = req.body;

  const message =
    newStatus === "processing"
      ? "Your request is currently being processed. Please wait while we complete it."
      : newStatus === "ready to pickup"
      ? "Your request is ready for pickup. Please download your schedule slip and present it to our transaction window."
      : newStatus === "completed"
      ? "Your request has been successfully completed."
      : newStatus === "cancelled"
      ? `Your request has been cancelled. Reason: ${reason}. Please contact us if you have any questions.`
      : newStatus === "unclaimed"
      ? "Your request has been marked as unclaimed because you did not claim your requested document within allotted time. As a result, the document is now set to be disposed of if it remains unclaimed for more than a month."
      : null;

  const URL = `${process.env.VITE_REACT_APP_FRONTEND_BASEURL}/request-details/${requestID}`;
  // console.log(URL);

  try {
    await sendStatusUpdateEmail(
      receiverEmail,
      requestID,
      URL,
      newStatus,
      message
    );
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

router.post("/resetPassword", async (req, res) => {
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
    const message = `New request from ${lastName}, ${firstName}. Please check the system for more details.`;
    const URL = `${process.env.VITE_REACT_APP_FRONTEND_BASEURL}/request-details/${requestID}`;
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
      // // console.log(`Sending emails to ${superAdminEmails.length} super admins`);
      for (const admin of superAdmins) {
        try {
          await sendNewRequestEmail(admin.email, requestID, URL, message);
          emailsSent++;
          // // console.log(`Email sent to super admin ${admin.email} successfully!`);
        } catch (error) {
          // // console.log(`Failed to send email to ${admin.email}:`, error);
        }
      }
    } else {
      // console.log("No super admins found.");
    }

    // Send emails to program admins
    if (admins.length > 0) {
      // // console.log(`Sending emails to ${admins.length} program admins`);
      for (const admin of admins) {
        try {
          await sendNewRequestEmail(admin.email, requestID, URL, message);
          emailsSent++;
          // // console.log(`Email sent to admin ${admin.email} successfully!`);
        } catch (error) {
          // // console.log(`Failed to send email to ${admin.email}:`, error);
        }
      }
    } else {
      // console.log("No program admins found.");
    }

    // Send one response after all emails are handled
    if (emailsSent > 0) {
      // // console.log(`Email sent to ${emailsSent} recipients!`),
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
    const { requestID, firstName, lastName, program, purpose } = req.body;
    const message = `${firstName} ${lastName} has submitted a response to the feedback form.`;
    const URL = `${process.env.VITE_REACT_APP_FRONTEND_BASEURL}/request-details/${requestID}`;

    let hasResponded = false; // Flag to prevent multiple responses

    // Helper function to send single response
    const sendResponse = (statusCode, responseMessage) => {
      if (!hasResponded) {
        hasResponded = true;
        return res.status(statusCode).json({ message: responseMessage });
      }
    };

    // Helper function to handle notification creation
    const createNotification = (admin, callback) => {
      const notifQuery =
        "INSERT INTO notification (receiver, message, requestID) VALUES ?";
      const notifValues = [[admin.userID, message, requestID]];

      db.query(notifQuery, [notifValues], (notifErr, notifResult) => {
        if (notifErr) {
          console.error(
            `Error creating notification for admin ${admin.userID}:`,
            notifErr
          );
          return callback(notifErr);
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

        callback(null);
      });
    };

    // SEND NOTIFICATION TO SUPER ADMINS (first one only)
    const superAdminQuery =
      "SELECT email, userID FROM users WHERE isAdmin = 2 LIMIT 1";

    db.query(superAdminQuery, async (err, superAdmins) => {
      if (err) {
        console.error("Database query error (super admins):", err);
        return sendResponse(500, "Database error when querying super admins");
      }

      // Process first super admin if found
      if (superAdmins.length > 0) {
        const admin = superAdmins[0]; // Only get first result

        // Send email
        try {
          await sendNewRequestEmail(admin.email, requestID, URL, message);
          console.log(`Email sent to super admin ${admin.email} successfully!`);
        } catch (error) {
          console.error(
            `Failed to send email to super admin ${admin.email}:`,
            error
          );
        }

        // Create notification
        createNotification(admin, (notifErr) => {
          if (notifErr) {
            console.error(
              "Error creating notification for super admin:",
              notifErr
            );
          }
          console.log("Super admin notification processed");
        });
      }
    });

    // SEND NOTIFICATION TO PURPOSE/PROGRAM ADMINS (first one only)
    const purposeAdminQuery = `
      SELECT u.email, u.userID 
      FROM users u 
      LEFT JOIN purposes p ON u.userID = p.adminID
      WHERE p.purposeName = ?
      LIMIT 1
    `;

    db.query(purposeAdminQuery, [purpose], async (progErr, purposeAdmins) => {
      if (progErr) {
        console.error("Database query error (purpose admins):", progErr);
        return sendResponse(500, "Database error when querying purpose admins");
      }

      if (purposeAdmins.length === 0) {
        // IF NO ADMINS FOUND FOR PURPOSE, SEARCH FOR PROGRAM ADMINS
        console.log("No admin found for purpose:", purpose);

        const programAdminQuery = `
          SELECT u.email, u.userID 
          FROM users u 
          LEFT JOIN program_course p ON u.userID = p.adminID
          WHERE p.programName = ?
          LIMIT 1
        `;

        db.query(
          programAdminQuery,
          [program],
          async (progErr, programAdmins) => {
            if (progErr) {
              console.error("Database query error (program admins):", progErr);
              return sendResponse(
                500,
                "Database error when querying program admins"
              );
            }

            if (programAdmins.length === 0) {
              console.log("No admin found for program:", program);
              return sendResponse(
                200,
                "Emails sent successfully to super admins only"
              );
            }

            // Process first program admin only
            const admin = programAdmins[0];

            try {
              await sendNewRequestEmail(admin.email, requestID, URL, message);
              console.log(
                `Email sent to program admin: ${program}, email: ${admin.email}`
              );
            } catch (error) {
              console.error(
                `Failed to send email to program admin ${admin.email}:`,
                error
              );
            }

            createNotification(admin, (notifErr) => {
              if (notifErr) {
                console.error(
                  "Error creating notification for program admin:",
                  notifErr
                );
              }
              sendResponse(200, "Emails sent successfully");
            });
          }
        );
      } else {
        // Process first purpose admin only
        const admin = purposeAdmins[0];

        try {
          await sendNewRequestEmail(admin.email, requestID, URL, message);
          console.log(
            `Email sent to purpose admin: ${purpose}, email: ${admin.email}`
          );
        } catch (error) {
          console.error(
            `Failed to send email to purpose admin ${admin.email}:`,
            error
          );
        }

        createNotification(admin, (notifErr) => {
          if (notifErr) {
            console.error(
              "Error creating notification for purpose admin:",
              notifErr
            );
          }
          sendResponse(200, "Emails sent successfully");
        });
      }
    });

    // Fallback timeout to ensure response is sent
    setTimeout(() => {
      sendResponse(200, "Processing completed");
    }, 5000); // 5 second timeout
  } catch (error) {
    console.error("Unexpected error:", error);
    if (!hasResponded) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
});

export default router;
