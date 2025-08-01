import express from "express";
import { io } from "../index.js";
import { db } from "../connect.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const router = express.Router();

// Configure Cloudinary storage for regular uploads
const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "/RegistrarUploads/uploads",
    allowed_formats: ["jpg", "jpeg", "png", "pdf", "doc", "docx"],
  },
});

// Configure Cloudinary storage for schedule slips
const cloudinaryStorageScheduleSlip = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "scheduleSlip",
    allowed_formats: ["jpg", "jpeg", "png", "pdf"],
  },
});

const upload = multer({ storage: cloudinaryStorage });
const uploadScheduleSlip = multer({ storage: cloudinaryStorageScheduleSlip });

router.post("/uploadDocuments", upload.single("file"), (req, res) => {
  try {
    const { requestID, uploadID } = req.body;

    // Check for file
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // File info from Cloudinary
    const fileInfo = {
      originalName: req.file.originalname,
      filename: req.file.filename,
      path: req.file.path,
      url: req.file.path, // Cloudinary URL
      publicId: req.file.filename, // Cloudinary public ID
      size: req.file.size,
      mimetype: req.file.mimetype,
    };

    // Fetch uploadDescription using uploadID
    const fetchDescriptionQuery = `SELECT uploadDescription FROM purpose_upload WHERE uploadID = ?`;

    db.query(fetchDescriptionQuery, [uploadID], (descErr, descResult) => {
      if (descErr) {
        console.error("Error fetching upload description:", descErr);
        return res
          .status(500)
          .json({ error: "Failed to fetch upload description" });
      }

      if (descResult.length === 0) {
        return res
          .status(404)
          .json({ error: "UploadID not found in purpose_upload" });
      }

      const uploadDescription = descResult[0].uploadDescription;

      // Now insert into requested_document_file
      const insertQuery = `
        INSERT INTO requested_document_file (requestID, fileName, cloudinary_url, cloudinary_public_id) 
        VALUES (?, ?, ?, ?)
      `;
      const values = [
        requestID,
        uploadDescription,
        fileInfo.url,
        fileInfo.publicId,
      ];

      db.query(insertQuery, values, (err, result) => {
        if (err) {
          console.error("Database Insert Error:", err);
          return res.status(500).json({
            Error: "Inserting data error.",
            Details: err,
          });
        }

        return res.status(200).json({
          Status: "Success",
          message: "File uploaded successfully to Cloudinary",
          InsertedID: result.insertId,
          file: fileInfo,
        });
      });
    });
  } catch (error) {
    console.error("Error handling file upload:" + error);
    return res.status(500).json({ error: "Failed to process uploaded file" });
  }
});

router.post(
  "/uploadScheduleSlip",
  uploadScheduleSlip.single("file"),
  (req, res) => {
    try {
      const { requestID, feedbackType } = req.body;

      // Check for file
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // File info from Cloudinary
      const fileInfo = {
        originalName: req.file.originalname,
        filename: req.file.filename,
        url: req.file.path, // Cloudinary URL
        publicId: req.file.filename, // Cloudinary public ID
      };

      // console.log("Request ID for upload: ", requestID);
      // console.log("Cloudinary URL: ", fileInfo.url);
      // console.log("FeedbackType: ", feedbackType);

      // SQL query - store the URL instead of just the filename
      const query = `
      UPDATE requested_documents set feedbackType = ?, cloudinary_url = ?, cloudinary_public_id = ? WHERE requestID = ?
    `;
      const values = [feedbackType, fileInfo.url, fileInfo.publicId, requestID];

      // Execute query and send response
      db.query(query, values, (err, result) => {
        if (err) {
          console.error("Database Insert Error:", err);
          return res.status(500).json({
            error: "Inserting data error.",
            Details: err,
          });
        }
        // console.log("Uploaded schedule slip successfully to Cloudinary.");

        return res.status(200).json({
          Status: "Success",
          message: "File uploaded successfully to Cloudinary",
          InsertedID: result.insertId,
          file: fileInfo,
        });
      });
    } catch (error) {
      console.error("Error handling file upload:", error);
      return res.status(500).json({ error: "Failed to process uploaded file" });
    }
  }
);

router.get("/test", (req, res) => {
  res.send("It works!");
});
router.post("/sendRequest", (req, res) => {
  const query = `
    INSERT INTO requested_documents 
    (requestID, userID, agree, email, firstName, middleName, lastName, studentID, dateOfBirth, sex, mobileNum, classification, schoolYearAttended, yearGraduated, yearLevel, program, purpose) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  // Extract data from request body
  const {
    requestID,
    userID,
    agree,
    email,
    firstName,
    middleName,
    lastName,
    studentID,
    dateOfBirth,
    sex,
    mobileNum,
    classification,
    schoolYearAttended,
    yearGraduated,
    yearLevel,
    program,
    purpose,
  } = req.body;

  const requiredFields = {
    requestID,
    userID,
    agree,
    email,
    firstName,
    lastName,
    studentID,
    dateOfBirth,
    sex,
    mobileNum,
    classification,
    schoolYearAttended,
    program,
    purpose,
  };

  // Conditionally add either yearGraduated or yearLevel
  if (classification === "graduated") {
    requiredFields.yearGraduated = yearGraduated;
  } else {
    requiredFields.yearLevel = yearLevel;
  }

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

  // Ensure all values are passed in the same order as in the query
  const values = [
    requestID,
    userID,
    agree,
    email,
    firstName,
    middleName,
    lastName,
    studentID,
    dateOfBirth,
    sex,
    mobileNum,
    classification,
    schoolYearAttended,
    yearGraduated,
    yearLevel,
    program,
    purpose,
  ];
  // console.log("request ID for overall: ", requestID);

  // Execute query
  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Database Insert Error:", err);
      return res
        .status(500)
        .json({ Error: "Inserting data error.", Details: err });
    }

    // FOR FETCHING USERID'S OF THE SUPER ADMINS
    const superAdminIDQuery = "SELECT userID FROM users WHERE isAdmin = 2";
    db.query(superAdminIDQuery, (err, result) => {
      if (err) {
        console.error("Database query error:", err);
        return;
      }

      // Extract userIDs into an array
      const superAdminIDs = result.map((row) => row.userID);

      // If no super admins found, exit
      if (superAdminIDs.length === 0) {
        // console.log("No super admins found.");
        return;
      }

      // Insert notification for each super admin
      const notifQuery =
        "INSERT INTO notification (receiver, message, requestID) VALUES ?";
      const notifValues = superAdminIDs.map((id) => [
        id,
        `${lastName}, ${firstName} requested a document.`,
        requestID,
      ]);

      db.query(notifQuery, [notifValues], (err, notifResult) => {
        if (err) {
          console.error("Error creating notifications:", err);
          return;
        }

        // Emit notification to each super admin
        superAdminIDs.forEach((adminID) => {
          // // console.log("Super admin ID: ", adminID, requestID);
          io.to(adminID).emit("new_notification", {
            id: notifResult.insertId,
            receiver: adminID,
            message: `${lastName}, ${firstName} requested a document.`,
            requestID: requestID,
            created: new Date(),
            isRead: false,
          });
        });
      });
    });

    // CHECKING IF THE PURPOSE HAS ASSIGNED ADMIN
    const purposeAdminIDQuery =
      "SELECT adminID FROM purposes WHERE purposeName = ?";
    db.query(purposeAdminIDQuery, purpose, (err, result) => {
      if (err) {
        console.error("Database query error:", err);
        return;
      }
      if (result[0].adminID === null || result[0].adminID === 0) {
        // IF NO ADMIN IS ASSIGNED ON THE PURPOSE, CHECKING THE ADMIN ASSIGNED TO THE PROGRAM

        const programAdminIDQuery =
          "SELECT adminID FROM program_course WHERE programName = ?";
        // console.log("Sending notification to the admin for program: ", program);
        db.query(programAdminIDQuery, program, (err, result) => {
          if (err) {
            console.error("Database query error:", err);
            return;
          }
          if (result[0].adminID === null) {
            console.error("No admin found to be sent notification.");
            return;
          }

          const adminID = result[0].adminID;

          // console.log(
          //   "Has admin assigned to the program: ",
          //   program,
          //   " assigning to admin: ",
          //   adminID
          // );

          // ASSIGNING ADMIN TO THE REQUEST
          const assignAdminQuery = `UPDATE requested_documents SET adminAssigned = ? WHERE requestID = ?`;
          const assignValues = [adminID, requestID];
          db.query(assignAdminQuery, assignValues, (err, result) => {
            if (err) {
              console.error("Error assigning admin:", err);
              return;
            }
            // console.log("Admin assigned successfully:", result);
          });

          // Insert notification for each super admin
          const notifQuery =
            "INSERT INTO notification (receiver, message, requestID) VALUES (?, ?, ?)";
          const notifValues = [
            adminID,
            `${lastName}, ${firstName} requested a document.`,
            requestID,
          ];

          db.query(notifQuery, notifValues, (err, notifResult) => {
            if (err) {
              console.error("Error creating notifications:", err);
              return;
            }

            // // console.log("Admin ID: ", adminID);
            // Emit notification to each admin

            io.to(adminID).emit("new_notification", {
              id: notifResult.insertId,
              receiver: adminID,
              message: `${lastName}, ${firstName} requested a document.`,
              requestID: requestID,
              created: new Date(),
              isRead: false,
            });
          });
        });

        return;
      }
      const adminID = result[0].adminID;

      // console.log(
      //   "Has admin assigned to the purpose: ",
      //   purpose,
      //   " assigning to admin: ",
      //   adminID
      // );
      // ASSIGNING ADMIN TO THE REQUEST
      const assignAdminQuery = `UPDATE requested_documents SET adminAssigned = ? WHERE requestID = ?`;
      const assignValues = [adminID, requestID];
      db.query(assignAdminQuery, assignValues, (err, result) => {
        if (err) {
          console.error("Error assigning admin:", err);
          return;
        }
        // console.log("Admin assigned successfully:", result);
      });

      // SENDING NOTIFICATION TO THE ADMIN ASSIGNED
      const notifQuery =
        "INSERT INTO notification (receiver, message, requestID) VALUES (?, ?, ?)";
      const notifValues = [
        adminID,
        `${lastName}, ${firstName} requested a document.`,
        requestID,
      ];
      // console.log("Sending notification to the admin for purpose: ", purpose);
      db.query(notifQuery, notifValues, (err, notifResult) => {
        if (err) {
          console.error("Error creating notifications:", err);
          return;
        }

        // // console.log("Admin ID: ", adminID);
        // Emit notification to each admin

        io.to(adminID).emit("new_notification", {
          id: notifResult.insertId,
          receiver: adminID,
          message: `${lastName}, ${firstName} requested a document.`,
          requestID: requestID,
          created: new Date(),
          isRead: false,
        });
      });
    });

    const updateQuery =
      "UPDATE users SET hasUncompletedRequest = 1 WHERE userID = ?";

    db.query(updateQuery, [userID], (err, result) => {
      if (err) {
        console.error("Database query error:", err);
        return;
      }
      if (result.length === 0) {
        // console.log("No admins found in this program.");
        return;
      }

      return res.json({ Status: "Success", InsertedID: result.insertId });
    });
  });
});
router.post("/insertDocTypes", (req, res) => {
  const { documentTypes, requestID } = req.body;

  // If no document types to insert, send success response immediately
  if (!documentTypes || documentTypes.length === 0) {
    // console.log("No document types to insert");
    return res.json({
      Status: "Success",
      Message: "No document types to insert",
    });
  }

  // Create an array of promises for each insert operation
  const insertPromises = documentTypes.map((docType, index) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO requested_document_type (requestID, documentType) 
        VALUES (?, ?)
      `;
      const values = [requestID, docType];

      db.query(query, values, (err, result) => {
        if (err) {
          console.error(
            `Error inserting document type at index ${index}:`,
            err
          );
          reject({ index, docType, error: err.message });
        } else {
          resolve({ index, docType, insertId: result.insertId });
        }
      });
    });
  });

  // Wait for all insert operations to complete
  Promise.allSettled(insertPromises)
    .then((results) => {
      const successful = results
        .filter((result) => result.status === "fulfilled")
        .map((result) => result.value);

      const failed = results
        .filter((result) => result.status === "rejected")
        .map((result) => result.reason);

      if (failed.length > 0) {
        // console.log(
        //   `${successful.length} inserts succeeded, ${failed.length} failed`
        // );
        return res.status(207).json({
          // 207 Multi-Status
          Status: "Partial Success",
          Message: `${successful.length} document types inserted, ${failed.length} failed`,
          Successful: successful,
          Failed: failed,
        });
      } else {
        // console.log(
        //   `All ${successful.length} document types inserted successfully`
        // );
        return res.json({
          Status: "Success",
          Message: `Successfully inserted ${successful.length} document types`,
          InsertedData: successful,
        });
      }
    })
    .catch((error) => {
      console.error("Unexpected error in insertDocTypes:", error);
      return res.status(500).json({
        Status: "Error",
        Message: "An unexpected error occurred while processing document types",
        Error: error.message,
      });
    });
});
router.post("/insertInputs", (req, res) => {
  const inputCount = req.body.inputsLength;
  const requestID = req.body.requestID;

  // Track completed inserts
  let completedInserts = 0;
  let errors = [];
  let successfulInserts = [];

  const query = `
    INSERT INTO requested_document_input (requestID, inputValue) 
    VALUES (?, ?)
  `;

  // If no inputs to insert, send success response
  if (!inputCount || inputCount <= 0) {
    // console.log("No inputs to insert");
    return res.json({ Status: "Success", Message: "No inputs to insert" });
  }

  for (let i = 1; i <= inputCount; i++) {
    // Get the input value using the correct property name format
    const inputValue = req.body[`inputValue${i}`];
    // console.log(`Attempting to insert inputValue${i}:`, inputValue);

    const values = [requestID, inputValue];
    // console.log("Request ID for inputValues:", requestID);
    // console.log("Values for insert:", values);

    // Execute query
    db.query(query, values, (err, result) => {
      completedInserts++;

      if (err) {
        console.error(`Database Insert Error for input ${i}:`, err);
        errors.push({ input: i, error: err.message });
      } else {
        // console.log(`Successfully inserted input ${i}:`, result);
        successfulInserts.push({
          input: i,
          value: inputValue,
          insertId: result.insertId,
        });
      }

      // Only send response when all inserts are completed
      if (completedInserts === inputCount) {
        // console.log("All inserts completed:", {
        //   total: inputCount,
        //   successful: successfulInserts.length,
        //   failed: errors.length,
        // });

        if (errors.length > 0) {
          return res.status(500).json({
            Error: "Some inserts failed",
            Details: errors,
            Successful: successfulInserts,
          });
        } else {
          return res.json({
            Status: "Success",
            Message: `Successfully inserted ${inputCount} inputs`,
            InsertedData: successfulInserts,
          });
        }
      }
    });
  }
});

router.post("/addProgram", (req, res) => {
  const { programName } = req.body;

  const check = "SELECT * FROM program_course WHERE programName = ?";

  db.query(check, programName, (err, result) => {
    if (err) {
      // console.log("Error checking programName: ", err);
      return res
        .status(500)
        .json({ Error: "Error checking programName", Details: err });
    }
    if (result.length > 0) {
      return res.json({
        Status: "Failed",
        Message: "Program already exists.",
      });
    } else {
      const query = "INSERT INTO program_course (programName) Values (?)";
      db.query(query, programName, (err, result) => {
        if (err) {
          // console.log("Error adding program: ", err);
          return res
            .status(500)
            .json({ Error: "Error adding program", Details: err });
        }
        return res.json({ Status: "Success", Message: "Program Added" });
      });
    }
  });
});
router.post("/updateProgram", (req, res) => {
  const { programName, programID } = req.body;
  const values = [programName, programID];

  const check = "SELECT * FROM program_course WHERE programName = ?";

  db.query(check, programName, (err, result) => {
    if (err) {
      // console.log("Error checking programName: ", err);
      return res
        .status(500)
        .json({ Error: "Error checking programName", Details: err });
    }
    if (result.length > 0) {
      return res.json({
        Status: "Failed",
        Message: "Program already exists.",
      });
    } else {
      const query =
        "UPDATE program_course set programName = ? WHERE programID = ?";
      db.query(query, values, (err, result) => {
        if (err) {
          // console.log("Error updating program: ", err);
          return res
            .status(500)
            .json({ Error: "Error updating program", Details: err });
        }
        return res.json({ Status: "Success", Message: "Program Updated." });
      });
    }
  });
});
router.post("/deleteProgram", (req, res) => {
  const { programID } = req.body;

  const check = "SELECT * FROM program_course WHERE programID = ?";

  db.query(check, programID, (err, result) => {
    if (err) {
      // console.log("Error checking programID: ", err);
      return res
        .status(500)
        .json({ Error: "Error checking programID", Details: err });
    }
    if (result.length === 0) {
      return res.json({
        Status: "Failed",
        Message: "Program does'nt exists.",
      });
    } else {
      const query = "DELETE FROM program_course WHERE programID = ?";
      db.query(query, programID, (err, result) => {
        if (err) {
          // console.log("Error deleting program: ", err);
          return res
            .status(500)
            .json({ Error: "Error deleting program", Details: err });
        }
        return res.json({ Status: "Success", Message: "Program Deleted." });
      });
    }
  });
});
router.post("/addYear", (req, res) => {
  const { yearOption } = req.body;

  const check = "SELECT * FROM year_graduated WHERE yearOption = ?";

  db.query(check, yearOption, (err, result) => {
    if (err) {
      // console.log("Error checking yearOption: ", err);
      return res
        .status(500)
        .json({ Error: "Error checking yearOption", Details: err });
    }
    if (result.length > 0) {
      return res.json({
        Status: "Failed",
        Message: "Year already exists.",
      });
    } else {
      const query = "INSERT INTO year_graduated (yearOption) Values (?)";
      db.query(query, yearOption, (err, result) => {
        if (err) {
          // console.log("Error adding program: ", err);
          return res
            .status(500)
            .json({ Error: "Error adding Year", Details: err });
        }
        return res.json({ Status: "Success", Message: "Year Added" });
      });
    }
  });
});
router.post("/updateYear", (req, res) => {
  const { yearOption, yearGraduatedID } = req.body;
  const values = [yearOption, yearGraduatedID];

  const check = "SELECT * FROM year_graduated WHERE yearOption = ?";

  db.query(check, yearOption, (err, result) => {
    if (err) {
      // console.log("Error checking yearOption: ", err);
      return res
        .status(500)
        .json({ Error: "Error checking yearOption", Details: err });
    }
    if (result.length > 0) {
      return res.json({
        Status: "Failed",
        Message: "Program already exists.",
      });
    } else {
      const query =
        "UPDATE year_graduated set yearOption = ? WHERE yearGraduatedID = ?";
      db.query(query, values, (err, result) => {
        if (err) {
          // console.log("Error updating program: ", err);
          return res
            .status(500)
            .json({ Error: "Error updating program", Details: err });
        }
        return res.json({ Status: "Success", Message: "Program Updated." });
      });
    }
  });
});
router.post("/deleteYear", (req, res) => {
  const { yearGraduatedID } = req.body;

  const check = "SELECT * FROM year_graduated WHERE yearGraduatedID = ?";

  db.query(check, yearGraduatedID, (err, result) => {
    if (err) {
      // console.log("Error checking yearGraduatedID: ", err);
      return res
        .status(500)
        .json({ Error: "Error checking yearGraduatedID", Details: err });
    }
    if (result.length === 0) {
      return res.json({
        Status: "Failed",
        Message: "Year does'nt exists.",
      });
    } else {
      const query = "DELETE FROM year_graduated WHERE yearGraduatedID = ?";
      db.query(query, yearGraduatedID, (err, result) => {
        if (err) {
          // console.log("Error deleting year: ", err);
          return res
            .status(500)
            .json({ Error: "Error deleting year", Details: err });
        }
        return res.json({ Status: "Success", Message: "Year Deleted." });
      });
    }
  });
});
router.post("/addPurpose", (req, res) => {
  const { purposeName } = req.body;

  const check = "SELECT * FROM purposes WHERE purposeName = ?";

  db.query(check, purposeName, (err, result) => {
    if (err) {
      // console.log("Error checking purposeName: ", err);
      return res
        .status(500)
        .json({ Error: "Error checking purposeName", Details: err });
    }
    if (result.length > 0) {
      return res.json({
        Status: "Failed",
        Message: "Purpose already exists.",
      });
    } else {
      const query = "INSERT INTO purposes (purposeName) Values (?)";
      db.query(query, purposeName, (err, result) => {
        if (err) {
          // console.log("Error adding purpose: ", err);
          return res
            .status(500)
            .json({ Error: "Error adding purpose", Details: err });
        }
        return res.json({ Status: "Success", Message: "Purpose Added" });
      });
    }
  });
});
router.post("/updatePurpose", (req, res) => {
  const { purposeName, purposeID } = req.body;
  const values = [purposeName, purposeID];

  const check = "SELECT * FROM purposes WHERE purposeName = ?";

  db.query(check, purposeName, (err, result) => {
    if (err) {
      // console.log("Error checking purposeName: ", err);
      return res
        .status(500)
        .json({ Error: "Error checking purposeName", Details: err });
    }
    if (result.length > 0) {
      return res.json({
        Status: "Failed",
        Message: "Purpose already exists.",
      });
    } else {
      const query = "UPDATE purposes set purposeName = ? WHERE purposeID = ?";
      db.query(query, values, (err, result) => {
        if (err) {
          // console.log("Error updating purpose: ", err);
          return res
            .status(500)
            .json({ Error: "Error updating purpose", Details: err });
        }
        return res.json({ Status: "Success", Message: "Purpose Updated." });
      });
    }
  });
});
router.post("/deletePurpose", (req, res) => {
  const { purposeID } = req.body;

  const check = "SELECT * FROM purposes WHERE purposeID = ?";

  db.query(check, purposeID, (err, result) => {
    if (err) {
      // console.log("Error checking purposeID: ", err);
      return res
        .status(500)
        .json({ Error: "Error checking purposeID", Details: err });
    }
    if (result.length === 0) {
      return res.json({
        Status: "Failed",
        Message: "Year does'nt exists.",
      });
    } else {
      const query = "DELETE FROM purposes WHERE purposeID = ?";
      db.query(query, purposeID, (err, result) => {
        if (err) {
          // console.log("Error deleting purpose: ", err);
          return res
            .status(500)
            .json({ Error: "Error deleting purpose", Details: err });
        }
        return res.json({ Status: "Success", Message: "Purpose Deleted." });
      });
    }
  });
});
router.post("/addSelection", (req, res) => {
  const { selectionName, purposeID } = req.body;
  const values = [selectionName, purposeID];

  // // console.log("Purpose ID: ", purposeID);

  const check =
    "SELECT * FROM purpose_selection WHERE selectionName = ? AND purposeID = ?";

  db.query(check, values, (err, result) => {
    if (err) {
      // console.log("Error checking selectionName: ", err);
      return res
        .status(500)
        .json({ Error: "Error checking selectionName", Details: err });
    }
    if (result.length > 0) {
      return res.json({
        Status: "Failed",
        Message: "Type of Document already exists.",
      });
    } else {
      const query =
        "INSERT INTO purpose_selection (selectionName, purposeID) VALUES (?, ?)";
      db.query(query, values, (err, result) => {
        if (err) {
          // console.log("Error adding document type: ", err);
          return res
            .status(500)
            .json({ Error: "Error adding document type", Details: err });
        }
        return res.json({ Status: "Success", Message: "Document Type Added." });
      });
    }
  });
});
router.post("/updateSelection", (req, res) => {
  const { selectionName, purposeID, selectionID } = req.body;

  const check =
    "SELECT * FROM purpose_selection WHERE selectionName = ? AND purposeID = ?";

  db.query(check, [selectionName, purposeID], (err, result) => {
    if (err) {
      // console.log("Error checking selectionName: ", err);
      return res
        .status(500)
        .json({ Error: "Error checking selectionName", Details: err });
    }
    if (result.length > 0) {
      return res.json({
        Status: "Failed",
        Message: "Document type already exists.",
      });
    } else {
      const query =
        "UPDATE purpose_selection set selectionName = ? WHERE selectionID = ?";
      db.query(query, [selectionName, selectionID], (err, result) => {
        if (err) {
          // console.log("Error updating document type: ", err);
          return res
            .status(500)
            .json({ Error: "Error updating document type", Details: err });
        }
        return res.json({
          Status: "Success",
          Message: "Document Type Updated.",
        });
      });
    }
  });
});
router.post("/deleteSelection", (req, res) => {
  const { selectionID } = req.body;

  const check = "SELECT * FROM purpose_selection WHERE selectionID = ?";

  db.query(check, selectionID, (err, result) => {
    if (err) {
      // console.log("Error checking selectionID: ", err);
      return res
        .status(500)
        .json({ Error: "Error checking selectionID", Details: err });
    }
    if (result.length === 0) {
      return res.json({
        Status: "Failed",
        Message: "Document type does'nt exists.",
      });
    } else {
      const query = "DELETE FROM purpose_selection WHERE selectionID = ?";
      db.query(query, selectionID, (err, result) => {
        if (err) {
          // console.log("Error deleting document type: ", err);
          return res
            .status(500)
            .json({ Error: "Error deleting document type", Details: err });
        }
        return res.json({
          Status: "Success",
          Message: "Document Type Deleted.",
        });
      });
    }
  });
});
router.post("/addInput", (req, res) => {
  const { inputDescription, purposeID } = req.body;
  const values = [inputDescription, purposeID];

  // // console.log("Purpose ID: ", purposeID);

  const check =
    "SELECT * FROM purpose_inputs WHERE inputDescription = ? AND purposeID = ?";

  db.query(check, values, (err, result) => {
    if (err) {
      // console.log("Error checking inputDescription: ", err);
      return res
        .status(500)
        .json({ Error: "Error checking inputDescription", Details: err });
    }
    if (result.length > 0) {
      return res.json({
        Status: "Failed",
        Message: "Document question already exists.",
      });
    } else {
      const query =
        "INSERT INTO purpose_inputs (inputDescription, purposeID) VALUES (?, ?)";
      db.query(query, values, (err, result) => {
        if (err) {
          // console.log("Error adding document question: ", err);
          return res
            .status(500)
            .json({ Error: "Error adding document question", Details: err });
        }
        return res.json({
          Status: "Success",
          Message: "Document Question Added.",
        });
      });
    }
  });
});
router.post("/updateInput", (req, res) => {
  const { inputDescription, purposeID, inputID } = req.body;

  const check =
    "SELECT * FROM purpose_inputs WHERE inputDescription = ? AND purposeID = ?";

  db.query(check, [inputDescription, purposeID], (err, result) => {
    if (err) {
      // console.log("Error checking inputDescription: ", err);
      return res
        .status(500)
        .json({ Error: "Error checking inputDescription", Details: err });
    }
    if (result.length > 0) {
      return res.json({
        Status: "Failed",
        Message: "Document question already exists.",
      });
    } else {
      const query =
        "UPDATE purpose_inputs set inputDescription = ? WHERE inputID = ?";
      db.query(query, [inputDescription, inputID], (err, result) => {
        if (err) {
          // console.log("Error updating document type: ", err);
          return res
            .status(500)
            .json({ Error: "Error updating document type", Details: err });
        }
        return res.json({
          Status: "Success",
          Message: "Document Question Updated.",
        });
      });
    }
  });
});
router.post("/deleteInput", (req, res) => {
  const { inputID } = req.body;

  const check = "SELECT * FROM purpose_inputs WHERE inputID = ?";

  db.query(check, inputID, (err, result) => {
    if (err) {
      // console.log("Error checking inputID: ", err);
      return res
        .status(500)
        .json({ Error: "Error checking inputID", Details: err });
    }
    if (result.length === 0) {
      return res.json({
        Status: "Failed",
        Message: "Document question does'nt exists.",
      });
    } else {
      const query = "DELETE FROM purpose_inputs WHERE inputID = ?";
      db.query(query, inputID, (err, result) => {
        if (err) {
          // console.log("Error deleting document question: ", err);
          return res
            .status(500)
            .json({ Error: "Error deleting document question", Details: err });
        }
        return res.json({
          Status: "Success",
          Message: "Document Question Deleted.",
        });
      });
    }
  });
});
router.post("/addUpload", (req, res) => {
  const { uploadDescription, purposeID } = req.body;
  const values = [uploadDescription, purposeID];

  // // console.log("Purpose ID: ", purposeID);

  const check =
    "SELECT * FROM purpose_upload WHERE uploadDescription = ? AND purposeID = ?";

  db.query(check, values, (err, result) => {
    if (err) {
      // console.log("Error checking uploadDescription: ", err);
      return res
        .status(500)
        .json({ Error: "Error checking uploadDescription", Details: err });
    }
    if (result.length > 0) {
      return res.json({
        Status: "Failed",
        Message: "Document upload already exists.",
      });
    } else {
      const query =
        "INSERT INTO purpose_upload (uploadDescription, purposeID) VALUES (?, ?)";
      db.query(query, values, (err, result) => {
        if (err) {
          // console.log("Error adding document upload: ", err);
          return res
            .status(500)
            .json({ Error: "Error adding document upload", Details: err });
        }
        return res.json({
          Status: "Success",
          Message: "Document upload added.",
        });
      });
    }
  });
});
router.post("/updateUpload", (req, res) => {
  const { uploadDescription, purposeID, uploadID } = req.body;

  const check =
    "SELECT * FROM purpose_upload WHERE uploadDescription = ? AND purposeID = ?";

  db.query(check, [uploadDescription, purposeID], (err, result) => {
    if (err) {
      // console.log("Error checking uploadDescription: ", err);
      return res
        .status(500)
        .json({ Error: "Error checking uploadDescription", Details: err });
    }
    if (result.length > 0) {
      return res.json({
        Status: "Failed",
        Message: "Document upload already exists.",
      });
    } else {
      const query =
        "UPDATE purpose_upload set uploadDescription = ? WHERE uploadID = ?";
      db.query(query, [uploadDescription, uploadID], (err, result) => {
        if (err) {
          // console.log("Error updating document upload: ", err);
          return res
            .status(500)
            .json({ Error: "Error updating document upload", Details: err });
        }
        return res.json({
          Status: "Success",
          Message: "Document upload updated.",
        });
      });
    }
  });
});
router.post("/deleteUpload", (req, res) => {
  const { uploadID } = req.body;

  const check = "SELECT * FROM purpose_upload WHERE uploadID = ?";

  db.query(check, uploadID, (err, result) => {
    if (err) {
      // console.log("Error checking uploadID: ", err);
      return res
        .status(500)
        .json({ Error: "Error checking uploadID", Details: err });
    }
    if (result.length === 0) {
      return res.json({
        Status: "Failed",
        Message: "Document upload does'nt exists.",
      });
    } else {
      const query = "DELETE FROM purpose_upload WHERE uploadID = ?";
      db.query(query, uploadID, (err, result) => {
        if (err) {
          // console.log("Error deleting document upload: ", err);
          return res
            .status(500)
            .json({ Error: "Error deleting document upload", Details: err });
        }
        return res.json({
          Status: "Success",
          Message: "Document upload deleted.",
        });
      });
    }
  });
});

export default router;
