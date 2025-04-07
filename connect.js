import mysql from "mysql";

export const db = mysql.createConnection({
  host: "bhg08f9mpxdeqhdstoan-mysql.services.clever-cloud.com",
  user: "uy6ws8mamw33lvzb",
  password: "Ir0PJpilZGY4bCoUxKFj",
  database: "bhg08f9mpxdeqhdstoan",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: ", err);
    return;
  }
  console.log("Connected to database");
});
