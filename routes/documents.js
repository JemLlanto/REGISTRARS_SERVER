import express from "express";
import { db } from "../connect.js";
import multer from "multer";

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });

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
  console.log("request ID for overall: ", requestID);

  // Execute query
  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Database Insert Error:", err);
      return res
        .status(500)
        .json({ Error: "Inserting data error.", Details: err });
    }
    return res.json({ Status: "Success", InsertedID: result.insertId });
  });
});
router.post("/insertDocTypes", (req, res) => {
  const { documentTypes, requestID } = req.body;

  // Track completed inserts
  let completedInserts = 0;
  let errors = [];
  let successfulInserts = [];

  const query = `
    INSERT INTO requested_document_type (requestID, documentType) 
    VALUES (?, ?)
  `;

  // If no inputs to insert, send success response
  if (!documentTypes || documentTypes.length === 0) {
    console.log("No document types to insert");
    return res.json({
      Status: "Success",
      Message: "No document types to insert",
    });
  }

  documentTypes.forEach((docType, index) => {
    const values = [requestID, docType];

    // Execute query
    db.query(query, values, (err, result) => {
      completedInserts++;

      if (err) {
        errors.push({ index, error: err.message });
      } else {
        successfulInserts.push({
          index,
          value: docType,
          insertId: result.insertId,
        });
      }

      // Only send response when all inserts are completed
      if (completedInserts === documentTypes.length) {
        if (errors.length > 0) {
          return res.status(500).json({
            Error: "Some inserts failed",
            Details: errors,
            Successful: successfulInserts,
          });
        } else {
          return res.json({
            Status: "Success",
            Message: `Successfully inserted ${documentTypes.length} document types`,
            InsertedData: successfulInserts,
          });
        }
      }
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
    console.log("No inputs to insert");
    return res.json({ Status: "Success", Message: "No inputs to insert" });
  }

  for (let i = 1; i <= inputCount; i++) {
    // Get the input value using the correct property name format
    const inputValue = req.body[`inputValue${i}`];
    console.log(`Attempting to insert inputValue${i}:`, inputValue);

    const values = [requestID, inputValue];
    console.log("Request ID for inputValues:", requestID);
    console.log("Values for insert:", values);

    // Execute query
    db.query(query, values, (err, result) => {
      completedInserts++;

      if (err) {
        console.error(`Database Insert Error for input ${i}:`, err);
        errors.push({ input: i, error: err.message });
      } else {
        console.log(`Successfully inserted input ${i}:`, result);
        successfulInserts.push({
          input: i,
          value: inputValue,
          insertId: result.insertId,
        });
      }

      // Only send response when all inserts are completed
      if (completedInserts === inputCount) {
        console.log("All inserts completed:", {
          total: inputCount,
          successful: successfulInserts.length,
          failed: errors.length,
        });

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
// router.post("/uploadDocuments", upload.single("file"), (req, res) => {
//   const { requestID } = req.body;
//   const file = req.file;

//   console.log("Request ID: ", requestID);
//   console.log("File: ", file);

//   if (!requestID || !file) {
//     return res.status(400).json({ Error: "Missing requestID or file." });
//   }

//   // Use the filename instead of the path
//   const fileName = file.originalname; // Get the original filename

//   const query = `INSERT INTO requested_document_file (requestID, image_file) VALUES (?, ?)`;
//   const values = [requestID, fileName]; // Store the filename in the database

//   console.log("Request ID for overall:", requestID);

//   // Execute query
//   db.query(query, values, (err, result) => {
//     if (err) {
//       console.error("Database upload Error:", err);
//       return res
//         .status(500)
//         .json({ Error: "Uploading documents error.", Details: err });
//     }
//     return res.json({
//       Status: "Success",
//       InsertedID: result.insertId,
//       fileName, // Return the filename instead of filePath
//     });
//   });
// });
router.post("/uploadDocuments", upload.single("file"), (req, res) => {
  try {
    const { requestID } = req.body;

    // Check for file
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // File info
    const fileInfo = {
      originalName: req.file.originalname,
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype,
    };

    console.log("Request ID for upload: ", requestID);
    console.log("Filename: ", fileInfo.filename);

    // SQL query
    const query = `
      INSERT INTO requested_document_file (requestID, image_file) 
      VALUES (?, ?)
    `;
    const values = [requestID, fileInfo.filename];

    // Execute query and send response
    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Database Insert Error:", err);
        return res.status(500).json({
          Error: "Inserting data error.",
          Details: err,
        });
      }

      // Only send ONE response here with all the data
      return res.status(200).json({
        Status: "Success",
        message: "File uploaded successfully",
        InsertedID: result.insertId,
        file: fileInfo,
      });
    });
  } catch (error) {
    console.error("Error handling file upload:", error);
    return res.status(500).json({ error: "Failed to process uploaded file" });
  }
});
router.get("/fetchPrograms", (req, res) => {
  const query = "SELECT * FROM program_course";
  db.query(query, (err, data) => {
    if (err)
      return res.json({
        Status: "Error",
        Message: "Error fetching programs data.",
      });
    if (data.length > 0) {
      return res.json({ Status: "Success", data: data });
    } else {
      return res.json({ Status: "Error", Message: "Programs not found" });
    }
  });
});
router.get("/fetchPurposes", (req, res) => {
  const query = "SELECT * FROM purposes";
  db.query(query, (err, data) => {
    if (err)
      return res.json({
        Status: "Error",
        Message: "Error fetching purposes data.",
      });
    if (data.length > 0) {
      return res.json({ Status: "Success", data: data });
    } else {
      return res.json({ Status: "Error", Message: "purposes not found" });
    }
  });
});
router.get("/fetchYearGraduated", (req, res) => {
  const query = "SELECT * FROM year_graduated";
  db.query(query, (err, data) => {
    if (err)
      return res.json({
        Status: "Error",
        Message: "Error fetching purposes data.",
      });
    if (data.length > 0) {
      return res.json({ Status: "Success", data: data });
    } else {
      return res.json({ Status: "Error", Message: "purposes not found" });
    }
  });
});
router.get("/fetchPurposeData", (req, res) => {
  const { purposeName } = req.query;

  if (!purposeName) {
    return res.json({
      Status: "Error",
      Message: "Purpose name is required.",
    });
  }
  const query = "SELECT * FROM purposes WHERE purposeName = ?";
  db.query(query, [purposeName], (err, data) => {
    if (err)
      return res.json({
        Status: "Error",
        Message: "Error fetching selections data.",
      });
    if (data.length > 0) {
      return res.json({ Status: "Success", data: data[0] });
    } else {
      return res.json({ Status: "Error", Message: "selections not found" });
    }
  });
});
router.get("/fetchSelections", (req, res) => {
  const { purposeID } = req.query;
  if (!purposeID) {
    return res.json({
      Status: "Error",
      Message: "Purpose ID is required",
    });
  }
  const query = "SELECT * FROM purpose_selection WHERE purposeID = ?";
  db.query(query, [purposeID], (err, data) => {
    if (err)
      return res.json({
        Status: "Error",
        Message: "Error fetching selections data.",
      });
    if (data.length > 0) {
      return res.json({ Status: "Success", data: data });
    } else {
      return res.json({ Status: "Error", Message: "selections not found" });
    }
  });
});
router.get("/fetchInputs", (req, res) => {
  const { purposeID } = req.query;
  if (!purposeID) {
    return res.json({
      Status: "Error",
      Message: "Purpose ID is required",
    });
  }
  const query = "SELECT * FROM purpose_inputs WHERE purposeID = ?";
  db.query(query, [purposeID], (err, data) => {
    if (err)
      return res.json({
        Status: "Error",
        Message: "Error fetching inputs data.",
      });
    if (data.length > 0) {
      return res.json({ Status: "Success", data: data });
    } else {
      return res.json({ Status: "Error", Message: "Inputs not found" });
    }
  });
});
router.get("/fetchUploads", (req, res) => {
  const { purposeID } = req.query;
  if (!purposeID) {
    return res.json({
      Status: "Error",
      Message: "Purpose ID is required",
    });
  }
  const query = "SELECT * FROM purpose_upload WHERE purposeID = ?";
  db.query(query, [purposeID], (err, data) => {
    if (err)
      return res.json({
        Status: "Error",
        Message: "Error fetching uploads data.",
      });
    if (data.length > 0) {
      return res.json({ Status: "Success", data: data });
    } else {
      return res.json({ Status: "Error", Message: "Uploads not found" });
    }
  });
});

export default router;
