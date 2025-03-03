-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 03, 2025 at 05:52 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `registrar_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `classification`
--

CREATE TABLE `classification` (
  `classID` int(11) NOT NULL,
  `className` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `classification`
--

INSERT INTO `classification` (`classID`, `className`) VALUES
(1, 'Undergraduate'),
(2, 'Graduated');

-- --------------------------------------------------------

--
-- Table structure for table `document_selection`
--

CREATE TABLE `document_selection` (
  `documentID` int(11) NOT NULL,
  `purposeID` int(11) NOT NULL,
  `documentName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `program_course`
--

CREATE TABLE `program_course` (
  `programID` int(11) NOT NULL,
  `programName` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `program_course`
--

INSERT INTO `program_course` (`programID`, `programName`) VALUES
(1, 'BS Electrical Engineering'),
(2, 'BS Computer Engineering'),
(3, 'Bachelor of Secondary Education'),
(4, 'BS Industrial Education'),
(5, 'Bachelor of Technical Vocational Teacher Education'),
(6, 'BS Industrial Technology'),
(7, 'BS Hotel and Restaurant Management'),
(8, 'BS Hospitality Management'),
(9, 'BS Business Management'),
(10, 'BS Business Administration'),
(11, 'BS Computer Science'),
(12, 'BS Information Technology'),
(13, 'Bachelor of Technical Teacher Education'),
(14, 'Diploma in Hotel and Restaurant Management'),
(15, 'Associate in Computer Technology'),
(16, 'Associate of Technology'),
(17, 'Diploma of Technology'),
(18, 'Teacher Certificate Program'),
(19, 'Laboratory Science High School(SELS)'),
(20, 'STVC');

-- --------------------------------------------------------

--
-- Table structure for table `purposes`
--

CREATE TABLE `purposes` (
  `purposeID` int(11) NOT NULL,
  `purposeName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `purposes`
--

INSERT INTO `purposes` (`purposeID`, `purposeName`) VALUES
(1, 'For Employment - Local'),
(2, 'For Employment - Abroad'),
(3, 'For Transfer'),
(4, 'For Masteral Studies'),
(5, 'For Scholarship'),
(6, 'Copy for School'),
(7, 'Others'),
(8, 'For Board Exam'),
(9, 'For TCP/CTE');

-- --------------------------------------------------------

--
-- Table structure for table `purpose_inputs`
--

CREATE TABLE `purpose_inputs` (
  `inputID` int(15) NOT NULL,
  `purposeID` int(15) NOT NULL,
  `inputDescription` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `purpose_inputs`
--

INSERT INTO `purpose_inputs` (`inputID`, `purposeID`, `inputDescription`) VALUES
(1, 5, 'Type of Scholarship (I.e. : Barangay Scholarship)'),
(2, 5, 'School Year Needed'),
(3, 5, 'Semester Needed');

-- --------------------------------------------------------

--
-- Table structure for table `purpose_selection`
--

CREATE TABLE `purpose_selection` (
  `selectionID` int(11) NOT NULL,
  `purposeID` int(15) NOT NULL,
  `selectionName` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `purpose_selection`
--

INSERT INTO `purpose_selection` (`selectionID`, `purposeID`, `selectionName`) VALUES
(1, 2, 'Transcript of Records(For Employment Abroad)'),
(2, 2, 'Certification Authentication and Verification (CAV'),
(3, 2, 'Graduation and Non-special Order'),
(4, 2, 'General Point Average/General Weighted Average'),
(5, 2, 'Units Earned'),
(6, 2, 'English Proficiency/English as medium of instructi'),
(7, 2, 'Certification of Bonafied Student'),
(8, 3, 'Transcript of Records (TOR) for Evaluation'),
(9, 3, 'Transcript of Records (TOR) Copy for'),
(10, 3, 'Certificate of Transfer (COT)'),
(11, 3, 'Good Moral Certificate'),
(12, 5, 'Transcipt of Records (TOR)'),
(13, 5, 'Certification of Bonafied Students');

-- --------------------------------------------------------

--
-- Table structure for table `purpose_upload`
--

CREATE TABLE `purpose_upload` (
  `uploadID` int(15) NOT NULL,
  `purposeID` int(50) NOT NULL,
  `uploadDescription` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `purpose_upload`
--

INSERT INTO `purpose_upload` (`uploadID`, `purposeID`, `uploadDescription`) VALUES
(1, 8, 'Upload your passport size picture with name-tag');

-- --------------------------------------------------------

--
-- Table structure for table `requested_documents`
--

CREATE TABLE `requested_documents` (
  `documentID` int(15) NOT NULL,
  `requestID` bigint(50) DEFAULT NULL,
  `userID` int(15) NOT NULL,
  `agree` varchar(15) NOT NULL,
  `email` varchar(150) NOT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `firstName` varchar(100) NOT NULL,
  `middleName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `studentID` varchar(100) NOT NULL,
  `dateOfBirth` date NOT NULL,
  `sex` varchar(100) NOT NULL,
  `mobileNum` varchar(15) NOT NULL,
  `classification` varchar(15) NOT NULL,
  `schoolYearAttended` varchar(10) NOT NULL,
  `yearGraduated` varchar(50) DEFAULT NULL,
  `yearLevel` varchar(50) DEFAULT NULL,
  `program` varchar(20) NOT NULL,
  `purpose` varchar(50) NOT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `requested_documents`
--

INSERT INTO `requested_documents` (`documentID`, `requestID`, `userID`, `agree`, `email`, `created`, `firstName`, `middleName`, `lastName`, `studentID`, `dateOfBirth`, `sex`, `mobileNum`, `classification`, `schoolYearAttended`, `yearGraduated`, `yearLevel`, `program`, `purpose`, `type`) VALUES
(86, 1740969377030428, 13, 'Yes', 'user@gmail.com', '2025-03-03 00:00:00', 'user', 'sample', 'account', '202010933', '2025-03-12', 'Male', '+639559145763', 'graduated', '2023', '2023 as of 1st Semester (2023-2024)', NULL, 'BS Information Techn', 'For Scholarship', ''),
(87, 1740972065829738, 13, 'Yes', 'user@gmail.com', '2025-03-03 00:00:00', 'user', 'sample', 'account', '202010933', '2025-02-23', 'Male', '+639559145763', 'undergraduate', '2025', NULL, 'first-year', 'BS Computer Science', 'For Board Exam', ''),
(88, 1740972162571239, 13, 'Yes', 'user@gmail.com', '2025-03-03 00:00:00', 'user', 'sample', 'account', '202010933', '2025-02-23', 'Female', '+639559145763', 'undergraduate', '2024', NULL, 'fifth-year', 'BS Information Techn', 'For Employment - Abroad', ''),
(89, 1740972605316843, 13, 'Yes', 'user@gmail.com', '2025-03-03 11:30:52', 'user', 'sample', 'account', '202010933', '2025-02-26', 'Male', '+639559145763', 'graduated', '2025', '2023', NULL, 'BS Industrial Techno', 'For Employment - Abroad', ''),
(90, 1740972696930653, 13, 'Yes', 'user@gmail.com', '2025-03-03 11:32:36', 'user', 'sample', 'account', '202010933', '2025-02-23', 'Male', '+639559145763', 'graduated', '2025', '2023', NULL, 'BS Business Manageme', 'For Scholarship', ''),
(91, 1740972772353832, 13, 'Yes', 'user@gmail.com', '2025-03-03 11:33:33', 'user', 'sample', 'account', '202010933', '2025-02-26', 'Male', '+639559145763', 'undergraduate', '2020', NULL, 'third-year', 'Bachelor of Secondar', 'For Board Exam', '');

-- --------------------------------------------------------

--
-- Table structure for table `requested_document_file`
--

CREATE TABLE `requested_document_file` (
  `fileID` int(15) NOT NULL,
  `requestID` bigint(15) NOT NULL,
  `image_file` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `requested_document_file`
--

INSERT INTO `requested_document_file` (`fileID`, `requestID`, `image_file`) VALUES
(9, 1740972065829738, '1740972150843_Miyamizu.Mitsuha.full.2042407.jpg'),
(10, 1740972772353832, '1740972813139_453977730_937525621721681_6649740335414641788_n.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `requested_document_input`
--

CREATE TABLE `requested_document_input` (
  `inputID` int(15) NOT NULL,
  `requestID` bigint(15) NOT NULL,
  `inputValue` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `requested_document_input`
--

INSERT INTO `requested_document_input` (`inputID`, `requestID`, `inputValue`) VALUES
(63, 1740969377030428, 'Company Scholarship'),
(64, 1740969377030428, '2025'),
(65, 1740969377030428, '1st SEM'),
(66, 1740972696930653, 'Municipal Scholarship'),
(67, 1740972696930653, '2025'),
(68, 1740972696930653, '1st SEM');

-- --------------------------------------------------------

--
-- Table structure for table `requested_document_type`
--

CREATE TABLE `requested_document_type` (
  `typeID` int(15) NOT NULL,
  `requestID` bigint(15) NOT NULL,
  `documentType` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `requested_document_type`
--

INSERT INTO `requested_document_type` (`typeID`, `requestID`, `documentType`) VALUES
(10, 1740969377030428, 'Transcipt of Records (TOR)'),
(11, 1740969377030428, 'Certification of Bonafied Students'),
(12, 1740972162571239, 'Transcript of Records(For Employment Abroad)'),
(13, 1740972162571239, 'Certification Authentication and Verification (CAV'),
(14, 1740972162571239, 'Units Earned'),
(15, 1740972162571239, 'English Proficiency/English as medium of instructi'),
(16, 1740972162571239, 'Graduation and Non-special Order'),
(17, 1740972605316843, 'Transcript of Records(For Employment Abroad)'),
(18, 1740972605316843, 'Units Earned'),
(19, 1740972605316843, 'Certification of Bonafied Student'),
(20, 1740972696930653, 'Transcipt of Records (TOR)');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` int(15) NOT NULL,
  `isAdmin` int(15) NOT NULL DEFAULT 0,
  `firstName` varchar(100) NOT NULL,
  `middleName` varchar(150) DEFAULT NULL,
  `lastName` varchar(100) NOT NULL,
  `studentID` varchar(50) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `isAdmin`, `firstName`, `middleName`, `lastName`, `studentID`, `email`, `password`) VALUES
(8, 0, 'asd', NULL, 'asd', NULL, 'asd@gmail.com', '$2b$10$Dy.LTdoXEzKBKxBe/Nkik.tUJ.ovMTnYTwzj1SeamoytK7l6JLvRe'),
(9, 0, 'asd', NULL, 'asd', NULL, 'asdasd@gmail.com', '$2b$10$Dy.LTdoXEzKBKxBe/Nkik.tUJ.ovMTnYTwzj1SeamoytK7l6JLvRe'),
(10, 0, 'qwe', NULL, 'qwe', NULL, 'qwe@gmail.com', '$2b$10$4Xc/exsHJobu4D/8EkCr5.RAuOE9Yd55YL.fE4JE8H/xwclyGCywa'),
(11, 0, 'zxc', NULL, 'zxc', NULL, 'zxc@gmail.com', '$2b$10$RLGvqdpwjbo9lWV0ha4GVuspvtp7iKWz5XdJmi5HMVB2xvZidZ/Ti'),
(12, 1, 'admin', NULL, 'account', NULL, 'admin@gmail.com', '$2b$10$n.YbPWG07IWEBDAZMvj4u.fngMzFtyw.VJcRSdjvbzLkJJfBmropK'),
(13, 0, 'user', NULL, 'account', NULL, 'user@gmail.com', '$2b$10$v.s4T4cZNsN8y0Q4QaMxfeU905ly6NIX.y/cDFWFW6vDxQ3BMMrPS'),
(14, 1, 'johnmark', NULL, 'sallao', NULL, 'jm@gmail.com', '$2b$10$dffT9ICei9.odwLmG5zMx.M/0BAJP2TRBXO1VR.mOAjaC2ZvFdr42');

-- --------------------------------------------------------

--
-- Table structure for table `year_graduated`
--

CREATE TABLE `year_graduated` (
  `year_graduatedID` int(15) NOT NULL,
  `yearOption` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `year_graduated`
--

INSERT INTO `year_graduated` (`year_graduatedID`, `yearOption`) VALUES
(1, '2024'),
(2, '2023 as of 1st Semester (2023-2024)'),
(3, '2023'),
(4, '2022'),
(5, '2022 as of 1st Semester (2022-2023)'),
(6, '2020'),
(7, '2019'),
(8, '2018'),
(9, '2017'),
(10, '2016'),
(11, '2015'),
(12, '2014'),
(13, '2013'),
(14, '2012'),
(15, '2011'),
(16, '2010'),
(17, '2000 - 2009'),
(19, '1995 - 1999'),
(20, '1990 - 1994'),
(21, '1985 - 1989'),
(22, '1980 - 1984'),
(23, '1974 - 1979');

-- --------------------------------------------------------

--
-- Table structure for table `year_level`
--

CREATE TABLE `year_level` (
  `yearID` int(11) NOT NULL,
  `yearName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `year_level`
--

INSERT INTO `year_level` (`yearID`, `yearName`) VALUES
(1, 'First Year'),
(2, 'Second Year'),
(3, 'Third Year'),
(4, 'Fourth Year'),
(5, 'Fifth Year');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `classification`
--
ALTER TABLE `classification`
  ADD PRIMARY KEY (`classID`);

--
-- Indexes for table `document_selection`
--
ALTER TABLE `document_selection`
  ADD PRIMARY KEY (`documentID`);

--
-- Indexes for table `program_course`
--
ALTER TABLE `program_course`
  ADD PRIMARY KEY (`programID`);

--
-- Indexes for table `purposes`
--
ALTER TABLE `purposes`
  ADD PRIMARY KEY (`purposeID`);

--
-- Indexes for table `purpose_inputs`
--
ALTER TABLE `purpose_inputs`
  ADD PRIMARY KEY (`inputID`),
  ADD KEY `purposeID` (`purposeID`);

--
-- Indexes for table `purpose_selection`
--
ALTER TABLE `purpose_selection`
  ADD PRIMARY KEY (`selectionID`),
  ADD KEY `purposeID` (`purposeID`);

--
-- Indexes for table `purpose_upload`
--
ALTER TABLE `purpose_upload`
  ADD PRIMARY KEY (`uploadID`),
  ADD KEY `purposeID` (`purposeID`);

--
-- Indexes for table `requested_documents`
--
ALTER TABLE `requested_documents`
  ADD PRIMARY KEY (`documentID`);

--
-- Indexes for table `requested_document_file`
--
ALTER TABLE `requested_document_file`
  ADD PRIMARY KEY (`fileID`),
  ADD KEY `documentID` (`requestID`);

--
-- Indexes for table `requested_document_input`
--
ALTER TABLE `requested_document_input`
  ADD PRIMARY KEY (`inputID`),
  ADD KEY `documentID` (`requestID`);

--
-- Indexes for table `requested_document_type`
--
ALTER TABLE `requested_document_type`
  ADD PRIMARY KEY (`typeID`),
  ADD KEY `documentID` (`requestID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`);

--
-- Indexes for table `year_graduated`
--
ALTER TABLE `year_graduated`
  ADD PRIMARY KEY (`year_graduatedID`);

--
-- Indexes for table `year_level`
--
ALTER TABLE `year_level`
  ADD PRIMARY KEY (`yearID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `classification`
--
ALTER TABLE `classification`
  MODIFY `classID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `document_selection`
--
ALTER TABLE `document_selection`
  MODIFY `documentID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `program_course`
--
ALTER TABLE `program_course`
  MODIFY `programID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `purposes`
--
ALTER TABLE `purposes`
  MODIFY `purposeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `purpose_inputs`
--
ALTER TABLE `purpose_inputs`
  MODIFY `inputID` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `purpose_selection`
--
ALTER TABLE `purpose_selection`
  MODIFY `selectionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `purpose_upload`
--
ALTER TABLE `purpose_upload`
  MODIFY `uploadID` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `requested_documents`
--
ALTER TABLE `requested_documents`
  MODIFY `documentID` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT for table `requested_document_file`
--
ALTER TABLE `requested_document_file`
  MODIFY `fileID` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `requested_document_input`
--
ALTER TABLE `requested_document_input`
  MODIFY `inputID` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `requested_document_type`
--
ALTER TABLE `requested_document_type`
  MODIFY `typeID` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `year_graduated`
--
ALTER TABLE `year_graduated`
  MODIFY `year_graduatedID` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `year_level`
--
ALTER TABLE `year_level`
  MODIFY `yearID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `purpose_inputs`
--
ALTER TABLE `purpose_inputs`
  ADD CONSTRAINT `purpose_inputs_ibfk_1` FOREIGN KEY (`purposeID`) REFERENCES `purposes` (`purposeID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `purpose_selection`
--
ALTER TABLE `purpose_selection`
  ADD CONSTRAINT `purpose_selection_ibfk_1` FOREIGN KEY (`purposeID`) REFERENCES `purposes` (`purposeID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `purpose_upload`
--
ALTER TABLE `purpose_upload`
  ADD CONSTRAINT `purpose_upload_ibfk_1` FOREIGN KEY (`purposeID`) REFERENCES `purposes` (`purposeID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
