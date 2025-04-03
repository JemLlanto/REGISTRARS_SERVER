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

router.get("/fetchRequestedDocuments/:userID", (req, res) => {
  const { userID } = req.params;
  // console.log("User ID: ", userID);
  const query =
    "SELECT * FROM requested_documents WHERE userID = ? ORDER BY created DESC";
  db.query(query, [userID], (err, data) => {
    if (err)
      return res.json({
        Status: "Error",
        Message: "Error fetching Requested Documents data.",
      });
    if (data.length > 0) {
      return res.json({ Status: "Success", data: data });
    } else {
      return res.json({
        Status: "Error",
        Message: "Requested Documents not found",
      });
    }
  });
});

router.get("/fetchRequestedDocuments", (req, res) => {
  const query = "SELECT * FROM requested_documents ORDER BY created DESC";
  db.query(query, (err, data) => {
    if (err)
      return res.json({
        Status: "Error",
        Message: "Error fetching Requested Documents data.",
      });
    if (data.length > 0) {
      return res.json({ Status: "Success", data: data });
    } else {
      return res.json({
        Status: "Error",
        Message: "Requested Documents not found",
      });
    }
  });
});

router.get("/fetchRequestedDocumentsDetails/:requestID", (req, res) => {
  const { requestID } = req.params;
  // console.log("Request ID for: ", requestID);
  const query = `
  SELECT 
    requested_documents.*,
    purposes.purposeID
  FROM 
    requested_documents
  JOIN
    purposes ON requested_documents.purpose = purposes.purposeName
  WHERE 
    requested_documents.requestID = ?
  
  `;
  db.query(query, [requestID], (err, data) => {
    if (err)
      return res.json({
        Status: "Error",
        Message: "Error fetching details.",
      });
    if (data.length > 0) {
      return res.json({
        Status: "Success",
        data: data[0],
      });
    } else {
      return res.json({
        Status: "Error",
        Message: "Detials not found.",
      });
    }
  });
});
router.get("/fetchRequestedDocumentTypes/:requestID", (req, res) => {
  const { requestID } = req.params;
  const query = `
  SELECT *
  FROM 
    requested_document_type
  WHERE 
    requestID = ?
  
  `;
  db.query(query, [requestID], (err, data) => {
    if (err)
      return res.json({
        Status: "Error",
        Message: "Error fetching types.",
      });
    if (data.length > 0) {
      return res.json({
        Status: "Success",
        data: data,
      });
    } else {
      return res.json({
        Status: "Error",
        Message: "Types not found.",
      });
    }
  });
});
router.get("/fetchRequestedDocumentFiles/:requestID", (req, res) => {
  const { requestID } = req.params;
  const query = `
  SELECT 
    *
  FROM 
    requested_document_file
  WHERE 
    requestID = ?
  `;

  db.query(query, [requestID], (err, data) => {
    if (err) {
      console.error("Database Error: ", err); // Log the error
      return res.json({
        Status: "Error",
        Message: "Error fetching files.",
        Error: err.message, // Optionally send error details in response
      });
    }

    if (data.length > 0) {
      console.log("Files: ", data[0]);
      return res.json({
        Status: "Success",
        data: data[0],
      });
    } else {
      console.warn(`No files found for requestID: ${requestID}`); // Log warning if no files found
      return res.json({
        Status: "Error",
        Message: "Files not found.",
      });
    }
  });
});

router.get("/fetchRequestedDocumentInputs/:requestID", (req, res) => {
  const { requestID } = req.params;
  const query = `
  SELECT *
  FROM 
    requested_document_input
  WHERE 
    requestID = ?
  
  `;
  db.query(query, [requestID], (err, data) => {
    if (err)
      return res.json({
        Status: "Error",
        Message: "Error fetching inputs.",
      });
    if (data.length > 0) {
      return res.json({
        Status: "Success",
        data: data,
      });
    } else {
      return res.json({
        Status: "Error",
        Message: "Inputs not found.",
      });
    }
  });
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
