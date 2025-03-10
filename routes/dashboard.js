import express from "express";
import { db } from "../connect.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("It works!");
});

router.get("/fetchRequestedDocuments", (req, res) => {
  const { startDate, endDate } = req.query;
  const values = [startDate, endDate];

  // console.log("Start Date:", startDate);
  // console.log("End Date:", endDate);

  // Let's see if the column actually exists
  db.query("DESCRIBE requested_documents", (descErr, descData) => {
    // console.log("Table structure:", descData);

    const query = `
      SELECT * FROM requested_documents
      WHERE DATE(created) BETWEEN ? AND ?
      ORDER BY created AND status`;

    // console.log("Executing query:", query, "with values:", values);

    db.query(query, values, (err, data) => {
      if (err) {
        console.error("Database error:", err);
        return res.json({
          Status: "Error",
          Message: "Error fetching Requested Documents data.",
        });
      }
      // console.log("Query results:", data);
      if (data.length > 0) {
        return res.json({ Status: "Success", data: data });
      } else {
        // Try a query without the date filter to see if ANY records exist
        db.query(
          "SELECT * FROM requested_documents LIMIT 5",
          (fallbackErr, fallbackData) => {
            // console.log("Fallback query results:", fallbackData);
            return res.json({
              Status: "Error",
              Message:
                "Requested Documents not found for the specified date range",
              debug: {
                withFilter: data,
                sample: fallbackData,
                error: err,
              },
            });
          }
        );
      }
    });
  });
});

export default router;
