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
router.post("/addProgram", (req, res) => {
  const { programName } = req.body;

  const check = "SELECT * FROM program_course WHERE programName = ?";

  db.query(check, programName, (err, result) => {
    if (err) {
      console.log("Error checking programName: ", err);
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
          console.log("Error adding program: ", err);
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
      console.log("Error checking programName: ", err);
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
          console.log("Error updating program: ", err);
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
      console.log("Error checking programID: ", err);
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
          console.log("Error deleting program: ", err);
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
      console.log("Error checking yearOption: ", err);
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
          console.log("Error adding program: ", err);
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
      console.log("Error checking yearOption: ", err);
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
          console.log("Error updating program: ", err);
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
      console.log("Error checking yearGraduatedID: ", err);
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
          console.log("Error deleting year: ", err);
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
      console.log("Error checking purposeName: ", err);
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
          console.log("Error adding purpose: ", err);
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
      console.log("Error checking purposeName: ", err);
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
          console.log("Error updating purpose: ", err);
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
      console.log("Error checking purposeID: ", err);
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
          console.log("Error deleting purpose: ", err);
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

  console.log("Purpose ID: ", purposeID);

  const check =
    "SELECT * FROM purpose_selection WHERE selectionName = ? AND purposeID = ?";

  db.query(check, values, (err, result) => {
    if (err) {
      console.log("Error checking selectionName: ", err);
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
          console.log("Error adding document type: ", err);
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
      console.log("Error checking selectionName: ", err);
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
          console.log("Error updating document type: ", err);
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
      console.log("Error checking selectionID: ", err);
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
          console.log("Error deleting document type: ", err);
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

  console.log("Purpose ID: ", purposeID);

  const check =
    "SELECT * FROM purpose_inputs WHERE inputDescription = ? AND purposeID = ?";

  db.query(check, values, (err, result) => {
    if (err) {
      console.log("Error checking inputDescription: ", err);
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
          console.log("Error adding document question: ", err);
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
      console.log("Error checking inputDescription: ", err);
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
          console.log("Error updating document type: ", err);
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
      console.log("Error checking inputID: ", err);
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
          console.log("Error deleting document question: ", err);
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

  console.log("Purpose ID: ", purposeID);

  const check =
    "SELECT * FROM purpose_upload WHERE uploadDescription = ? AND purposeID = ?";

  db.query(check, values, (err, result) => {
    if (err) {
      console.log("Error checking uploadDescription: ", err);
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
          console.log("Error adding document upload: ", err);
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
      console.log("Error checking uploadDescription: ", err);
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
          console.log("Error updating document upload: ", err);
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
      console.log("Error checking uploadID: ", err);
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
          console.log("Error deleting document upload: ", err);
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
