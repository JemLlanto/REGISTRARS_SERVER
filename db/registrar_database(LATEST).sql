-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 07, 2025 at 02:40 AM
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
-- Table structure for table `feedback_external`
--

CREATE TABLE `feedback_external` (
  `feedbackID` int(15) NOT NULL,
  `requestID` bigint(150) NOT NULL,
  `userID` int(15) NOT NULL,
  `cc1` int(5) NOT NULL,
  `cc2` int(5) NOT NULL,
  `cc3` int(5) NOT NULL,
  `clientType` varchar(50) NOT NULL,
  `date` date NOT NULL,
  `sex` varchar(15) NOT NULL,
  `age` int(15) NOT NULL,
  `serviceAvailed` varchar(50) NOT NULL,
  `sqd0` int(5) NOT NULL,
  `sqd1` int(5) NOT NULL,
  `sqd2` int(5) NOT NULL,
  `sqd3` int(5) NOT NULL,
  `sqd4` int(5) NOT NULL,
  `sqd5` int(5) NOT NULL,
  `sqd6` int(5) NOT NULL,
  `sqd7` int(5) NOT NULL,
  `sqd8` int(5) NOT NULL,
  `suggestions` varchar(150) DEFAULT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedback_external`
--

INSERT INTO `feedback_external` (`feedbackID`, `requestID`, `userID`, `cc1`, `cc2`, `cc3`, `clientType`, `date`, `sex`, `age`, `serviceAvailed`, `sqd0`, `sqd1`, `sqd2`, `sqd3`, `sqd4`, `sqd5`, `sqd6`, `sqd7`, `sqd8`, `suggestions`, `email`) VALUES
(3, 1741567034072257, 15, 3, 1, 3, 'Business', '2025-03-24', 'Male', 23, 'sad', 6, 6, 6, 6, 6, 6, 6, 6, 6, 'Legit check', 'llantojem@gmail.com'),
(4, 1742799921694346, 15, 4, 5, 5, 'Business', '2025-03-24', 'Male', 23, 'sasd', 1, 2, 3, 4, 5, 6, 5, 4, 3, 'qweqweqweqwe', 'llantojem@gmail.com'),
(5, 1742799921694346, 15, 4, 5, 5, 'Government', '2025-03-24', 'Female', 23, 'sad', 1, 3, 4, 5, 6, 5, 4, 3, 2, 'sdaasdasd', 'llantojem@gmail.com'),
(6, 1742799921694346, 15, 4, 5, 5, 'Government', '2025-03-24', 'Female', 23, 'sad', 1, 3, 4, 5, 6, 5, 4, 3, 2, 'sdaasdasd', 'llantojem@gmail.com'),
(7, 1742799921694346, 15, 4, 5, 5, 'Government', '2025-03-24', 'Female', 23, 'sad', 1, 3, 4, 5, 6, 5, 4, 3, 2, 'sdaasdasd', 'llantojem@gmail.com'),
(8, 1742799921694346, 15, 4, 5, 5, 'Government', '2025-03-24', 'Female', 23, 'sad', 1, 3, 4, 5, 6, 5, 4, 3, 2, 'sdaasdasd', 'llantojem@gmail.com'),
(9, 1742799921694346, 15, 4, 5, 5, 'Government', '2025-03-24', 'Female', 23, 'sad', 1, 3, 4, 5, 6, 5, 4, 3, 2, 'sdaasdasd', 'llantojem@gmail.com'),
(10, 1742799921694346, 15, 4, 5, 5, 'Government', '2025-03-24', 'Female', 23, 'sad', 1, 3, 4, 5, 6, 5, 4, 3, 2, 'sdaasdasd', 'llantojem@gmail.com'),
(11, 1741567034072257, 15, 1, 1, 1, 'Citizen', '2025-03-24', 'Male', 21, 'retretertr', 2, 2, 2, 2, 2, 2, 2, 2, 2, 'ertretretreterter', 'llantojem@gmail.com'),
(12, 1741567034072257, 15, 4, 5, 5, 'Government', '2025-03-24', 'Female', 23, 'sad', 3, 4, 5, 6, 5, 4, 3, 2, 2, 'sadsadsdsadsadasdasd', 'llantojem@gmail.com'),
(13, 1741567034072257, 15, 4, 5, 5, 'Government', '2025-03-24', 'Female', 23, 'Transcipt of records', 6, 6, 6, 6, 6, 6, 6, 6, 6, 'sadsdasdasd', 'llantojem@gmail.com'),
(14, 1741566991151523, 15, 4, 5, 5, 'Government', '2025-03-24', 'Female', 23, 'sadsadsadasdasdasdasd', 5, 5, 5, 5, 5, 5, 5, 5, 5, 'asdsadasdasdasdasdasd', 'llantojem@gmail.com'),
(15, 1741566483672289, 15, 4, 5, 5, 'Government', '2025-03-24', 'Male', 23213, 'dfgdfgdfgdf', 3, 3, 3, 3, 3, 3, 3, 3, 3, 'asdasdsadsadasd', 'llantojem@gmail.com'),
(16, 1743583635789762, 15, 4, 5, 5, 'Citizen', '2025-04-03', 'Male', 56, 'Transcipt of records', 1, 3, 3, 5, 6, 5, 4, 3, 2, 'asdasdasd', 'llantojem@gmail.com'),
(17, 1743643999144735, 15, 4, 5, 5, 'Citizen', '2025-04-03', 'Female', 56, 'sad', 1, 2, 6, 5, 6, 5, 4, 3, 2, 'asdasdasdasd', 'llantojem@gmail.com'),
(18, 1743985801890458, 15, 1, 1, 1, 'Business', '2025-04-07', 'Male', 2020, 'Transcipt of records', 1, 2, 3, 4, 6, 5, 4, 3, 2, 'asdasd', 'llantojem@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `feedback_internal`
--

CREATE TABLE `feedback_internal` (
  `feedbackID` int(50) NOT NULL,
  `requestID` bigint(50) NOT NULL,
  `userID` int(50) NOT NULL,
  `courtesy` int(5) DEFAULT NULL,
  `service_quality` int(5) DEFAULT NULL,
  `service_timeliness` int(5) DEFAULT NULL,
  `service_efficiency` int(5) DEFAULT NULL,
  `physical_cleanliness` int(5) DEFAULT NULL,
  `physical_comfort` int(5) DEFAULT NULL,
  `comments` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedback_internal`
--

INSERT INTO `feedback_internal` (`feedbackID`, `requestID`, `userID`, `courtesy`, `service_quality`, `service_timeliness`, `service_efficiency`, `physical_cleanliness`, `physical_comfort`, `comments`) VALUES
(18, 1741567034072257, 15, 5, 0, 5, 5, 5, 5, 'HAHAHAHA try legit check'),
(19, 1741567034072257, 15, 5, 5, 5, 5, 5, 5, ''),
(21, 1742800020232375, 15, 5, 3, 2, 3, 4, 5, 'hahaha tyr'),
(22, 1742800020232375, 15, 5, 4, 3, 2, 1, 2, 'sadsadsad'),
(23, 1742800020232375, 15, 5, 4, 3, 2, 1, 2, 'sadsadsad'),
(24, 1742800020232375, 15, 5, 4, 3, 2, 1, 2, 'sadsadsad'),
(25, 1742800020232375, 15, 5, 4, 3, 2, 1, 2, 'sadasd'),
(26, 174286088268625, 15, 4, 3, 2, 1, 2, 3, 'LEgit Check'),
(27, 1743583461753491, 15, 5, 3, 3, 3, 4, 4, '');

-- --------------------------------------------------------

--
-- Table structure for table `form_switch`
--

CREATE TABLE `form_switch` (
  `switchID` int(15) NOT NULL,
  `isAutomatic` int(1) NOT NULL DEFAULT 1,
  `isOn` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `form_switch`
--

INSERT INTO `form_switch` (`switchID`, `isAutomatic`, `isOn`) VALUES
(1, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `notificationID` int(15) NOT NULL,
  `sender` int(15) NOT NULL,
  `receiver` int(15) NOT NULL,
  `message` varchar(255) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `requestID` bigint(100) NOT NULL,
  `isRead` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`notificationID`, `sender`, `receiver`, `message`, `created`, `requestID`, `isRead`) VALUES
(34, 0, 13, 'Your request is currently being processed.', '2025-03-11 05:18:56', 1740972696930653, 1),
(35, 0, 13, 'Your request has been completed.', '2025-03-11 05:19:07', 1740972696930653, 1),
(36, 0, 13, 'Your request has been canceled.', '2025-03-11 05:28:47', 1740972772353832, 1),
(37, 0, 13, 'Your request has been canceled.', '2025-03-11 05:32:11', 1740978659308977, 1),
(38, 0, 13, 'Your request has been canceled.', '2025-03-11 05:33:27', 1740982722249235, 1),
(39, 0, 13, 'Your request has been canceled.', '2025-03-11 05:34:58', 1741141546582717, 1),
(40, 0, 13, 'Your request has been canceled.', '2025-03-11 05:35:08', 1741221382859106, 1),
(41, 0, 13, 'Your request is currently being processed.', '2025-03-11 05:39:21', 1740972696930653, 1),
(42, 0, 13, 'Your request has been completed.', '2025-03-11 05:40:07', 1740972696930653, 1),
(43, 0, 13, 'Your request is currently being processed.', '2025-03-11 05:41:34', 1740972772353832, 1),
(44, 0, 13, 'Your request has been completed.', '2025-03-11 05:42:39', 1740972772353832, 1),
(45, 0, 13, 'Your request is currently being processed.', '2025-03-11 05:42:55', 1740978659308977, 1),
(46, 0, 13, 'Your request has been completed.', '2025-03-11 05:43:46', 1740978659308977, 1),
(47, 0, 13, 'Your request is currently being processed.', '2025-03-11 05:44:39', 1740982722249235, 1),
(48, 0, 13, 'Your request has been completed.', '2025-03-11 05:44:49', 1740982722249235, 1),
(49, 0, 13, 'Your request is currently being processed.', '2025-03-11 05:45:36', 1741141546582717, 1),
(50, 0, 13, 'Your request has been completed.', '2025-03-11 05:45:48', 1741141546582717, 1),
(51, 0, 13, 'Your request is currently being processed.', '2025-03-11 05:47:10', 1741221382859106, 1),
(52, 0, 13, 'Your request has been completed.', '2025-03-11 05:47:49', 1741221382859106, 1),
(53, 0, 13, 'Your request is currently being processed.', '2025-03-11 05:48:53', 1740982722249235, 1),
(54, 0, 13, 'Your request has been completed.', '2025-03-11 05:49:24', 1740982722249235, 1),
(55, 0, 13, 'Your request is currently being processed.', '2025-03-11 05:49:46', 1741141546582717, 1),
(56, 0, 13, 'Your request has been completed.', '2025-03-11 05:49:58', 1741141546582717, 1),
(57, 0, 13, 'Your request has been canceled.', '2025-03-11 05:50:59', 1741221382859106, 1),
(58, 0, 13, 'Your request is currently being processed.', '2025-03-11 05:51:11', 1741243638328667, 1),
(59, 0, 13, 'Your request has been completed.', '2025-03-11 05:51:20', 1741243638328667, 1),
(60, 0, 13, 'Your request is currently being processed.', '2025-03-12 00:45:11', 1740978659308977, 0),
(61, 0, 13, 'Your request has been completed.', '2025-03-12 00:45:21', 1740978659308977, 0),
(62, 0, 16, 'Doe, John requested a document.', '2025-03-12 07:24:41', 0, 1),
(63, 0, 16, 'Doe, John requested a document.', '2025-03-12 07:25:17', 0, 1),
(64, 0, 16, 'Doe, John requested a document.', '2025-03-12 07:45:52', 65912345213, 1),
(65, 0, 16, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-12 07:49:26', 65912345213, 1),
(66, 0, 16, 'account, user requested a document.', '2025-03-12 07:51:34', 65912345213, 1),
(67, 0, 0, 'Your request is currently being processed.', '2025-03-12 07:51:58', 65912345213, 1),
(68, 0, 16, 'account, user requested a document.', '2025-03-12 07:52:47', 65932345213, 1),
(69, 0, 13, 'Your request is currently being processed.', '2025-03-12 07:53:12', 65932345213, 1),
(70, 0, 16, 'account, user requested a document.', '2025-03-12 07:55:00', 657832345213, 1),
(71, 0, 16, 'account, user requested a document.', '2025-03-12 07:58:36', 657832345963, 1),
(72, 0, 16, 'account, user requested a document.', '2025-03-12 08:00:49', 657832345963, 1),
(73, 0, 16, 'account, user requested a document.', '2025-03-12 08:04:30', 657837895963, 1),
(74, 0, 16, 'account, user requested a document.', '2025-03-12 08:04:57', 6789837895963, 1),
(75, 0, 16, 'account, user requested a document.', '2025-03-12 08:23:10', 6787537895963, 1),
(76, 0, 16, 'account, user requested a document.', '2025-03-12 08:37:18', 6787532395963, 1),
(77, 0, 16, 'account, user requested a document.', '2025-03-12 08:41:40', 6787782395963, 1),
(78, 0, 16, 'account, user requested a document.', '2025-03-12 08:43:22', 678778289963, 1),
(79, 0, 16, 'account, user requested a document.', '2025-03-12 08:45:18', 678778289996, 1),
(80, 0, 16, 'account, user requested a document.', '2025-03-12 08:52:43', 678778289996, 1),
(81, 0, 16, 'account, user requested a document.', '2025-03-12 08:52:51', 678778789996, 1),
(82, 0, 16, 'account, user requested a document.', '2025-03-12 08:54:05', 968778789996, 1),
(83, 0, 16, 'account, user requested a document.', '2025-03-12 08:55:15', 912778789996, 1),
(84, 0, 12, 'account, user requested a document.', '2025-03-12 08:55:15', 912778789996, 1),
(85, 0, 16, 'account, user requested a document.', '2025-03-12 08:57:08', 912778789989, 1),
(86, 0, 12, 'account, user requested a document.', '2025-03-12 08:57:08', 912778789989, 1),
(87, 0, 16, 'account, user requested a document.', '2025-03-12 09:00:36', 965778789989, 1),
(88, 0, 12, 'account, user requested a document.', '2025-03-12 09:00:36', 965778789989, 1),
(89, 0, 16, 'account, user requested a document.', '2025-03-12 09:01:34', 584778789989, 1),
(90, 0, 12, 'account, user requested a document.', '2025-03-12 09:01:34', 584778789989, 1),
(91, 0, 16, 'account, user requested a document.', '2025-03-12 09:01:46', 584743789989, 1),
(92, 0, 12, 'account, user requested a document.', '2025-03-12 09:01:46', 584743789989, 1),
(93, 0, 16, 'account, user requested a document.', '2025-03-12 09:02:04', 584197489989, 1),
(94, 0, 12, 'account, user requested a document.', '2025-03-12 09:02:04', 584197489989, 1),
(95, 0, 16, 'account, user requested a document.', '2025-03-12 09:28:00', 584197489989, 1),
(96, 0, 14, 'account, user requested a document.', '2025-03-12 09:28:00', 584197489989, 1),
(97, 0, 16, 'account, user requested a document.', '2025-03-12 09:28:17', 584197489989, 1),
(98, 0, 14, 'account, user requested a document.', '2025-03-12 09:28:17', 584197489989, 1),
(99, 0, 15, 'Your request is currently being processed.', '2025-03-13 02:30:56', 1741566483672289, 1),
(100, 0, 15, 'Your request has been completed.', '2025-03-13 02:33:11', 1741566483672289, 1),
(101, 0, 13, 'Your request has been cancelled.', '2025-03-13 02:44:05', 965778789989, 0),
(102, 0, 15, 'Your request has been cancelled.', '2025-03-13 02:46:15', 1741566483672289, 1),
(103, 0, 15, 'Your request is currently being processed.', '2025-03-13 02:47:48', 1741566991151523, 1),
(104, 0, 15, 'Your request has been completed.', '2025-03-13 02:48:10', 1741566991151523, 1),
(105, 0, 15, 'Your request has been cancelled.', '2025-03-13 02:48:41', 1741567034072257, 1),
(106, 0, 15, 'Your request has been cancelled.', '2025-03-13 06:52:57', 1741566483672289, 1),
(107, 0, 15, 'Your request is currently being processed.', '2025-03-13 06:53:20', 1741566991151523, 1),
(108, 0, 16, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-18 04:35:43', 1742272511977170, 1),
(109, 0, 0, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-18 04:35:43', 1742272511977170, 1),
(110, 0, 15, 'Your request has been completed.', '2025-03-20 00:45:40', 1741566991151523, 1),
(111, 0, 15, 'Your request is currently being processed.', '2025-03-20 01:02:14', 1741566483672289, 1),
(112, 0, 15, 'Your request has been completed.', '2025-03-20 01:02:49', 1741566483672289, 1),
(113, 0, 15, 'Your request is currently being processed.', '2025-03-20 01:06:42', 1741566991151523, 1),
(114, 0, 15, 'Your request has been completed.', '2025-03-20 01:16:40', 1741566991151523, 1),
(115, 0, 15, 'Your request is currently being processed.', '2025-03-20 01:20:32', 1741567034072257, 1),
(116, 0, 15, 'Your request is ready for pickup.', '2025-03-20 01:20:35', 1741567034072257, 1),
(117, 0, 0, 'Your request is currently being processed.', '2025-03-20 01:23:38', 0, 0),
(118, 0, 0, 'Your request is ready for pickup.', '2025-03-20 01:25:13', 0, 0),
(119, 0, 13, 'Your request is currently being processed.', '2025-03-20 01:34:14', 657832345213, 0),
(120, 0, 0, NULL, '2025-03-20 01:36:33', 65912345213, 0),
(121, 0, 0, NULL, '2025-03-20 01:38:33', 65912345213, 0),
(122, 0, 13, 'Your request is ready for pickup.', '2025-03-20 01:41:52', 65932345213, 0),
(123, 0, 15, 'Your request is currently being processed.', '2025-03-20 01:45:47', 1742272511977170, 1),
(124, 0, 15, 'Your request is ready for pickup.', '2025-03-20 01:45:52', 1742272511977170, 1),
(125, 0, 15, 'Your request has been completed.', '2025-03-20 01:46:28', 1742272511977170, 1),
(126, 0, 15, 'Your request is currently being processed.', '2025-03-20 02:07:28', 1741566483672289, 1),
(127, 0, 15, 'Your request is ready for pickup.', '2025-03-20 05:05:37', 1741566483672289, 1),
(128, 0, 15, 'Your request is ready for pickup.', '2025-03-20 05:18:10', 1741566483672289, 1),
(129, 0, 15, 'Your request is ready for pickup.', '2025-03-20 05:32:26', 1741566483672289, 1),
(130, 0, 15, 'Your request is ready for pickup.', '2025-03-20 05:35:49', 1741566483672289, 1),
(131, 0, 15, 'Your request has been completed.', '2025-03-20 05:36:19', 1741566483672289, 1),
(132, 0, 15, 'Your request is ready for pickup.', '2025-03-20 06:06:31', 1741566483672289, 1),
(133, 0, 15, 'Your request is currently being processed.', '2025-03-20 11:59:43', 1741567034072257, 1),
(134, 0, 15, 'Your request is ready for pickup.', '2025-03-20 12:00:03', 1741567034072257, 1),
(135, 0, 15, 'Your request is currently being processed.', '2025-03-23 23:28:15', 1741566991151523, 1),
(136, 0, 15, 'Your request is currently being processed.', '2025-03-23 23:28:37', 1741566991151523, 1),
(137, 0, 15, 'Your request is ready for pickup.', '2025-03-23 23:29:44', 1741566991151523, 1),
(138, 0, 16, 'account, user requested a document.', '2025-03-24 05:56:04', 584193489989, 1),
(139, 0, 14, 'account, user requested a document.', '2025-03-24 05:56:04', 584193489989, 1),
(140, 0, 16, 'account, user requested a document.', '2025-03-24 06:08:16', 788193489989, 1),
(141, 0, 14, 'account, user requested a document.', '2025-03-24 06:08:16', 788193489989, 1),
(142, 0, 16, 'account, user requested a document.', '2025-03-24 06:10:59', 788193489989, 1),
(143, 0, 14, 'account, user requested a document.', '2025-03-24 06:10:59', 788193489989, 1),
(144, 0, 16, 'account, user requested a document.', '2025-03-24 06:12:44', 258193489989, 1),
(145, 0, 14, 'account, user requested a document.', '2025-03-24 06:12:44', 258193489989, 0),
(146, 0, 16, 'account, user requested a document.', '2025-03-24 06:13:07', 2369193489989, 1),
(147, 0, 14, 'account, user requested a document.', '2025-03-24 06:13:07', 2369193489989, 0),
(148, 0, 16, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-24 06:27:32', 23733489989, 1),
(149, 0, 14, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-24 06:27:32', 23733489989, 1),
(150, 0, 16, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-24 06:28:00', 12733489989, 1),
(151, 0, 14, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-24 06:28:00', 12733489989, 0),
(152, 0, 16, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-24 06:29:01', 12733489989, 1),
(153, 0, 14, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-24 06:29:01', 12733489989, 0),
(154, 0, 16, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-24 06:41:30', 1742797917009123, 1),
(155, 0, 12, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-24 06:41:30', 1742797917009123, 1),
(156, 0, 16, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-24 06:44:16', 89733489989, 1),
(157, 0, 14, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-24 06:44:16', 89733489989, 0),
(158, 0, 16, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-24 06:46:21', 89733489974, 1),
(159, 0, 14, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-24 06:46:21', 89733489974, 1),
(160, 0, 16, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-24 06:47:43', 89733489974, 1),
(161, 0, 14, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-24 06:47:43', 89733489974, 1),
(162, 0, 16, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-24 06:48:56', 1742798914156201, 1),
(163, 0, 0, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-24 06:48:56', 1742798914156201, 0),
(164, 0, 16, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-24 06:49:51', 1742798971571872, 1),
(165, 0, 0, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-24 06:49:51', 1742798971571872, 0),
(166, 0, 16, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-24 06:50:51', 1742799031195333, 1),
(167, 0, 0, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-24 06:50:51', 1742799031195333, 0),
(168, 0, 16, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-24 06:51:58', 8961733489974, 1),
(169, 0, 14, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-24 06:51:58', 8961733489974, 1),
(170, 0, 16, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-24 06:52:44', 1742799144234900, 1),
(171, 0, 0, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-24 06:52:44', 1742799144234900, 0),
(172, 0, 16, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-24 06:53:20', 8961733489974, 1),
(173, 0, 14, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-24 06:53:20', 8961733489974, 1),
(174, 0, 16, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-24 07:04:28', 8961733489974, 1),
(175, 0, 19, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-24 07:04:28', 8961733489974, 1),
(176, 0, 16, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-24 07:05:45', 1742799921694346, 1),
(177, 0, 19, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-24 07:05:45', 1742799921694346, 1),
(178, 0, 16, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-24 07:07:42', 1742800020232375, 1),
(179, 0, 19, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-24 07:07:42', 1742800020232375, 1),
(180, 0, 13, 'Your request is currently being processed.', '2025-03-24 07:48:37', 584193489989, 0),
(181, 0, 15, 'Your request is currently being processed.', '2025-03-24 07:48:54', 1741566991151523, 1),
(182, 0, 15, 'Your request is ready for pickup.', '2025-03-24 07:49:14', 1741566991151523, 1),
(183, 0, 15, 'Your request is currently being processed.', '2025-03-24 07:50:16', 23733489989, 1),
(184, 0, 15, 'Your request is ready for pickup.', '2025-03-24 08:06:48', 23733489989, 1),
(185, 0, 15, 'Your request is currently being processed.', '2025-03-24 08:08:28', 89733489974, 1),
(186, 0, 15, 'Your request is ready for pickup.', '2025-03-24 08:08:52', 89733489974, 1),
(187, 0, 15, 'Your request is currently being processed.', '2025-03-24 08:30:35', 1742800020232375, 1),
(188, 0, 15, 'Your request is ready for pickup.', '2025-03-24 08:30:47', 1742800020232375, 1),
(189, 0, 15, 'Your request is currently being processed.', '2025-03-24 08:33:47', 1742799921694346, 1),
(190, 0, 15, 'Your request is ready for pickup.', '2025-03-24 08:33:57', 1742799921694346, 1),
(191, 0, 15, 'Your request has been completed.', '2025-03-24 08:34:11', 1742799921694346, 1),
(192, 0, 16, 'Jan Eraseo Mari Llanto has submitted a response to the feedback form.', '2025-03-24 08:39:26', 1742799921694346, 1),
(193, 0, 16, 'Jan Eraseo Mari Llanto has submitted a response to the feedback form.', '2025-03-24 08:40:46', 1742800020232375, 1),
(194, 0, 16, 'Jan Eraseo Mari Llanto has submitted a response to the feedback form.', '2025-03-24 08:40:49', 1742800020232375, 1),
(195, 0, 19, 'Jan Eraseo Mari Llanto has submitted a response to the feedback form.', '2025-03-24 08:40:50', 1742800020232375, 1),
(196, 0, 19, 'Jan Eraseo Mari Llanto has submitted a response to the feedback form.', '2025-03-24 08:41:02', 1742800020232375, 1),
(197, 0, 16, 'Jan Eraseo Mari Llanto has submitted a response to the feedback form.', '2025-03-24 08:41:06', 1742800020232375, 1),
(198, 0, 19, 'Jan Eraseo Mari Llanto has submitted a response to the feedback form.', '2025-03-24 08:41:15', 1742800020232375, 1),
(199, 0, 16, 'Jan Eraseo Mari Llanto has submitted a response to the feedback form.', '2025-03-24 08:42:01', 1742800020232375, 1),
(200, 0, 19, 'Jan Eraseo Mari Llanto has submitted a response to the feedback form.', '2025-03-24 08:42:03', 1742800020232375, 1),
(201, 0, 16, 'Jan Eraseo Mari Llanto has submitted a response to the feedback form.', '2025-03-24 09:00:12', 1741567034072257, 1),
(202, 0, 16, 'Jan Eraseo Mari Llanto has submitted a response to the feedback form.', '2025-03-24 09:03:29', 1741567034072257, 1),
(203, 0, 16, 'Jan Eraseo Mari Llanto has submitted a response to the feedback form.', '2025-03-24 09:06:48', 1741567034072257, 1),
(204, 0, 16, 'Jan Eraseo Mari Llanto has submitted a response to the feedback form.', '2025-03-24 09:09:06', 1741566991151523, 1),
(205, 0, 16, 'Jan Eraseo Mari Llanto has submitted a response to the feedback form.', '2025-03-24 09:11:42', 1741566483672289, 1),
(206, 0, 19, 'Jan Eraseo Mari Llanto has submitted a response to the feedback form.', '2025-03-24 09:11:44', 1741566483672289, 1),
(207, 0, 16, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-24 23:59:13', 1742860722070117, 1),
(208, 0, 19, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-24 23:59:13', 1742860722070117, 1),
(209, 0, 16, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-25 00:01:49', 174286088268625, 1),
(210, 0, 19, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-25 00:01:49', 174286088268625, 1),
(211, 0, 16, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-25 00:06:34', 1742860953244144, 1),
(212, 0, 19, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-25 00:06:34', 1742860953244144, 1),
(213, 0, 16, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-25 06:10:52', 1742882394825370, 1),
(214, 0, 19, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-25 06:10:52', 1742882394825370, 1),
(215, 0, 16, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-25 06:39:41', 1742883175767732, 1),
(216, 0, 19, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-25 06:39:41', 1742883175767732, 1),
(217, 0, 16, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-25 06:48:16', 1742885265164696, 1),
(218, 0, 19, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-25 06:48:16', 1742885265164696, 1),
(219, 0, 15, 'Your request has been cancelled.', '2025-03-25 09:23:17', 1742860722070117, 1),
(220, 0, 15, 'Your request is currently being processed.', '2025-03-25 09:23:33', 1742860953244144, 1),
(221, 0, 16, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-25 09:28:45', 1742894866510580, 1),
(222, 0, 19, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-25 09:28:45', 1742894866510580, 1),
(223, 0, 16, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-27 02:21:23', 1743042039231223, 1),
(224, 0, 19, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-27 02:21:23', 1743042039231223, 1),
(225, 0, 15, 'Your request is currently being processed.', '2025-03-27 09:30:05', 174286088268625, 1),
(226, 0, 15, 'Your request is ready for pickup.', '2025-03-27 09:31:10', 174286088268625, 1),
(227, 0, 16, 'Jan Eraseo Mari Llanto has submitted a response to the feedback form.', '2025-03-27 09:32:13', 174286088268625, 1),
(228, 0, 19, 'Jan Eraseo Mari Llanto has submitted a response to the feedback form.', '2025-03-27 09:32:15', 174286088268625, 1),
(229, 0, 15, 'Your request has been completed.', '2025-03-27 09:33:25', 174286088268625, 1),
(230, 0, 16, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-31 08:46:53', 1743408859790235, 1),
(231, 0, 19, 'Llanto, Jan Eraseo Mari requested a document.', '2025-03-31 08:46:53', 1743408859790235, 0),
(232, 0, 16, 'Llantoasd, Jan Eraseo Mariasd requested a document.', '2025-03-31 09:32:28', 1743413138275175, 1),
(233, 0, 19, 'Llantoasd, Jan Eraseo Mariasd requested a document.', '2025-03-31 09:32:28', 1743413138275175, 0),
(234, 0, 15, 'Your request is currently being processed.', '2025-04-02 02:19:01', 1743408859790235, 1),
(235, 0, 16, 'Llanto, Jan Eraseo Mariasd requested a document.', '2025-04-02 08:33:27', 1743582774014543, 1),
(236, 0, 19, 'Llanto, Jan Eraseo Mariasd requested a document.', '2025-04-02 08:33:27', 1743582774014543, 0),
(237, 0, 16, 'Llanto, Jan Eraseo Mariasd requested a document.', '2025-04-02 08:35:20', 1743582774014543, 1),
(238, 0, 19, 'Llanto, Jan Eraseo Mariasd requested a document.', '2025-04-02 08:35:20', 1743582774014543, 0),
(239, 0, 16, 'Llanto, Jan Eraseo Mariasd requested a document.', '2025-04-02 08:36:52', 1743582774014543, 1),
(240, 0, 19, 'Llanto, Jan Eraseo Mariasd requested a document.', '2025-04-02 08:36:52', 1743582774014543, 0),
(241, 0, 16, 'Llanto, Jan Eraseo Mariasd requested a document.', '2025-04-02 08:37:50', 1743582774014543, 1),
(242, 0, 19, 'Llanto, Jan Eraseo Mariasd requested a document.', '2025-04-02 08:37:50', 1743582774014543, 0),
(243, 0, 16, 'Llanto, Jan Eraseo Mariasd requested a document.', '2025-04-02 08:38:56', 1743582774014543, 1),
(244, 0, 19, 'Llanto, Jan Eraseo Mariasd requested a document.', '2025-04-02 08:38:56', 1743582774014543, 0),
(245, 0, 16, 'Llanto, Jan Eraseo Mariasd requested a document.', '2025-04-02 08:39:16', 1743583149788680, 1),
(246, 0, 19, 'Llanto, Jan Eraseo Mariasd requested a document.', '2025-04-02 08:39:16', 1743583149788680, 0),
(247, 0, 16, 'Llanto, Jan Eraseo Mariasd requested a document.', '2025-04-02 08:41:08', 1743583149788680, 1),
(248, 0, 19, 'Llanto, Jan Eraseo Mariasd requested a document.', '2025-04-02 08:41:08', 1743583149788680, 0),
(249, 0, 16, 'Llanto, Jan Eraseo Mariasd requested a document.', '2025-04-02 08:43:30', 1743583149788680, 1),
(250, 0, 19, 'Llanto, Jan Eraseo Mariasd requested a document.', '2025-04-02 08:43:30', 1743583149788680, 0),
(251, 0, 16, 'Llantosaad, Jan Eraseo Mari requested a document.', '2025-04-02 08:45:03', 1743583461753491, 1),
(252, 0, 19, 'Llantosaad, Jan Eraseo Mari requested a document.', '2025-04-02 08:45:03', 1743583461753491, 1),
(253, 0, 16, 'Llantosaad, Jan Eraseo Mari requested a document.', '2025-04-02 08:48:06', 1743583635789762, 1),
(254, 0, 19, 'Llantosaad, Jan Eraseo Mari requested a document.', '2025-04-02 08:48:06', 1743583635789762, 1),
(255, 0, 16, 'Llantosaad, Jan Eraseo Mari requested a document.', '2025-04-02 08:48:35', 1743583635789762, 1),
(256, 0, 19, 'Llantosaad, Jan Eraseo Mari requested a document.', '2025-04-02 08:48:35', 1743583635789762, 1),
(257, 0, 16, 'Llantosaad, Jan Eraseo Mari requested a document.', '2025-04-02 08:49:17', 1743583635789762, 1),
(258, 0, 19, 'Llantosaad, Jan Eraseo Mari requested a document.', '2025-04-02 08:49:17', 1743583635789762, 1),
(259, 0, 13, 'Your request is ready for pickup.', '2025-04-02 09:03:42', 657832345213, 0),
(260, 0, 13, 'Your request is ready for pickup.', '2025-04-02 09:09:42', 584193489989, 0),
(261, 0, 15, 'Your request is ready for pickup.', '2025-04-02 09:10:50', 1742860953244144, 1),
(262, 0, 15, 'Your request is ready for pickup.', '2025-04-02 09:12:20', 1743408859790235, 1),
(263, 0, 15, 'Your request is currently being processed.', '2025-04-02 09:15:44', 1743582774014543, 1),
(264, 0, 15, 'Your request is currently being processed.', '2025-04-02 09:15:58', 1743582774014543, 1),
(265, 0, 15, 'Your request is ready for pickup.', '2025-04-02 09:17:20', 1743582774014543, 1),
(266, 0, 13, 'Your request is ready for pickup.', '2025-04-02 09:21:29', 1740972065829738, 0),
(267, 0, 15, 'Your request is currently being processed.', '2025-04-03 01:18:05', 1743583149788680, 1),
(268, 0, 15, 'Your request is currently being processed.', '2025-04-03 01:18:23', 1743583149788680, 1),
(269, 0, 15, 'Your request is currently being processed.', '2025-04-03 01:19:24', 1743583149788680, 1),
(270, 0, 15, 'Your request is ready for pickup.', '2025-04-03 01:20:30', 1743583149788680, 1),
(271, 0, 16, 'Llantosaad, Jan Eraseo Mari requested a document.', '2025-04-03 01:33:41', 1743643999144735, 1),
(272, 0, 19, 'Llantosaad, Jan Eraseo Mari requested a document.', '2025-04-03 01:33:41', 1743643999144735, 1),
(273, 0, 16, 'Llantosaad, Jan Eraseo Mari requested a document.', '2025-04-03 01:33:51', 1743644024423916, 1),
(274, 0, 19, 'Llantosaad, Jan Eraseo Mari requested a document.', '2025-04-03 01:33:51', 1743644024423916, 1),
(275, 0, 16, 'Llantosaad, Jan Eraseo Mari requested a document.', '2025-04-03 01:56:03', 17436453408088, 1),
(276, 0, 19, 'Llantosaad, Jan Eraseo Mari requested a document.', '2025-04-03 01:56:03', 17436453408088, 1),
(277, 0, 16, 'Llantosaad, Jan Eraseo Mari requested a document.', '2025-04-03 01:59:17', 1743645538799153, 1),
(278, 0, 19, 'Llantosaad, Jan Eraseo Mari requested a document.', '2025-04-03 01:59:17', 1743645538799153, 1),
(279, 0, 15, 'Your request is currently being processed.', '2025-04-03 02:45:00', 1743583461753491, 1),
(280, 0, 15, 'Your request is ready for pickup.', '2025-04-03 02:45:14', 1743583461753491, 1),
(281, 0, 16, 'Jan Eraseo Mari Llantosaad has submitted a response to the feedback form.', '2025-04-03 02:45:42', 1743583461753491, 1),
(282, 0, 19, 'Jan Eraseo Mari Llantosaad has submitted a response to the feedback form.', '2025-04-03 02:45:44', 1743583461753491, 0),
(283, 0, 15, 'Your request is currently being processed.', '2025-04-03 05:25:43', 1743583635789762, 1),
(284, 0, 15, 'Your request is ready for pickup.', '2025-04-03 05:26:27', 1743583635789762, 1),
(285, 0, 16, 'Jan Eraseo Mari Llantosaad has submitted a response to the feedback form.', '2025-04-03 05:27:56', 1743583635789762, 1),
(286, 0, 19, 'Jan Eraseo Mari Llantosaad has submitted a response to the feedback form.', '2025-04-03 05:27:58', 1743583635789762, 0),
(287, 0, 15, 'Your request is currently being processed.', '2025-04-03 05:28:59', 1743643999144735, 1),
(288, 0, 15, 'Your request is ready for pickup.', '2025-04-03 05:29:10', 1743643999144735, 1),
(289, 0, 16, 'Jan Eraseo Mari Llantosaad has submitted a response to the feedback form.', '2025-04-03 05:30:31', 1743643999144735, 1),
(290, 0, 19, 'Jan Eraseo Mari Llantosaad has submitted a response to the feedback form.', '2025-04-03 05:30:33', 1743643999144735, 0),
(291, 0, 13, 'Your request is ready for pickup.', '2025-04-03 05:33:12', 1740972162571239, 0),
(292, 0, 15, 'Your request is currently being processed.', '2025-04-03 05:35:27', 1743644024423916, 1),
(293, 0, 15, 'Your request is ready for pickup.', '2025-04-03 05:35:39', 1743644024423916, 1),
(294, 0, 15, 'Your request is currently being processed.', '2025-04-03 05:40:07', 17436453408088, 1),
(295, 0, 15, 'Your request is ready for pickup.', '2025-04-03 05:40:16', 17436453408088, 1),
(296, 0, 15, 'Your request has been completed.', '2025-04-03 05:43:52', 17436453408088, 1),
(297, 0, 15, 'Your request is currently being processed.', '2025-04-03 08:47:48', 1743645538799153, 1),
(298, 0, 16, 'Llantosaad, Jan Eraseo Mari requested a document.', '2025-04-07 00:21:28', 1743985267726432, 1),
(299, 0, 0, 'Llantosaad, Jan Eraseo Mari requested a document.', '2025-04-07 00:21:28', 1743985267726432, 1),
(300, 0, 16, 'Llantosaad, Jan Eraseo Mari requested a document.', '2025-04-07 00:25:15', 1743985486501522, 1),
(301, 0, 19, 'Llantosaad, Jan Eraseo Mari requested a document.', '2025-04-07 00:25:15', 1743985486501522, 1),
(302, 0, 16, 'Llantosaad, Jan Eraseo Mari requested a document.', '2025-04-07 00:29:14', 1743985733654657, 0),
(303, 0, 19, 'Llantosaad, Jan Eraseo Mari requested a document.', '2025-04-07 00:29:14', 1743985733654657, 0),
(304, 0, 16, 'Llantosaad, Jan Eraseo Mari requested a document.', '2025-04-07 00:30:23', 1743985801890458, 1),
(305, 0, 19, 'Llantosaad, Jan Eraseo Mari requested a document.', '2025-04-07 00:30:23', 1743985801890458, 1),
(306, 0, 15, 'Your request is currently being processed.', '2025-04-07 00:33:37', 1743985801890458, 1),
(307, 0, 15, 'Your request is ready for pickup.', '2025-04-07 00:33:49', 1743985801890458, 1),
(308, 0, 16, 'Jan Eraseo Mari Llantosaad has submitted a response to the feedback form.', '2025-04-07 00:34:58', 1743985801890458, 0),
(309, 0, 19, 'Jan Eraseo Mari Llantosaad has submitted a response to the feedback form.', '2025-04-07 00:35:01', 1743985801890458, 0),
(310, 0, 16, 'Llantosaad, Jan Eraseo Mari requested a document.', '2025-04-07 00:38:57', 1743986317143738, 0),
(311, 0, 19, 'Llantosaad, Jan Eraseo Mari requested a document.', '2025-04-07 00:38:57', 1743986317143738, 0);

-- --------------------------------------------------------

--
-- Table structure for table `program_course`
--

CREATE TABLE `program_course` (
  `programID` int(11) NOT NULL,
  `programName` varchar(150) DEFAULT NULL,
  `adminID` int(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `program_course`
--

INSERT INTO `program_course` (`programID`, `programName`, `adminID`) VALUES
(1, 'BS Electrical Engineering', 0),
(2, 'BS Computer Engineering', 19),
(3, 'Bachelor of Secondary Education', 19),
(4, 'BS Industrial Education', 19),
(5, 'Bachelor of Technical Vocational Teacher Education', 19),
(6, 'BS Industrial Technology', 19),
(7, 'BS Hotel and Restaurant Management', 19),
(8, 'BS Hospitality Management', 19),
(9, 'BS Business Management', 19),
(10, 'BS Business Administration', 19),
(11, 'BS Computer Science', 19),
(12, 'BS Information Technology', 19),
(13, 'Bachelor of Technical Teacher Education', 19),
(14, 'Diploma in Hotel and Restaurant Management', 19),
(15, 'Associate in Computer Technology', 19),
(16, 'Associate of Technology', 19),
(17, 'Diploma of Technology', 19),
(18, 'Teacher Certificate Program', 19),
(19, 'Laboratory Science High School(SELS)', 19),
(20, 'STVC', 19);

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
(2, 2, 'Certification Authentication and Verification (CAV)'),
(3, 2, 'Graduation and Non-special Order'),
(4, 2, 'General Point Average/General Weighted Average'),
(5, 2, 'Units Earned'),
(6, 2, 'English Proficiency/English as medium of instruction'),
(7, 2, 'Certification of Bonafied Student'),
(8, 3, 'Transcript of Records (TOR) for Evaluation'),
(9, 3, 'Transcript of Records (TOR) Copy for'),
(10, 3, 'Certificate of Transfer (COT)'),
(11, 3, 'Good Moral Certificate'),
(12, 5, 'Transcipt of Records (TOR)'),
(13, 5, 'Certification of Bonafied Students'),
(24, 1, 'Transcript of Records (For Employment Abroad)'),
(25, 4, 'Transcript of Records (TOR) for Evaluation'),
(26, 4, 'Transcript of Records (TOR) Copy for'),
(27, 4, 'Certificate of Transfer (COT)'),
(28, 4, 'Good Moral Certificate'),
(29, 7, 'Transcript of Records (TOR)'),
(30, 7, 'Certification Authentication and Verification (CAV)'),
(31, 7, 'Graduation and Non-Special Order'),
(32, 7, 'General Point Average/General Weighted Average'),
(33, 7, 'Units earned'),
(34, 7, 'Presently/has been enrolled'),
(35, 7, 'English proficiency/English as medium of instruction'),
(36, 7, 'Course Description'),
(37, 7, 'Good Moral Certificate'),
(38, 7, 'Checklist of Curriculum'),
(39, 7, 'CSC Certification for Latin Honors'),
(40, 7, 'Certification of Bonafide Student'),
(41, 7, 'Diploma'),
(42, 7, 'Certification of Candidate for Graduation'),
(43, 7, 'Certification in Lieu of Lost Diploma'),
(44, 8, 'Transcript of Records'),
(45, 9, 'Transcript of Records (TOR) for Evaluation'),
(46, 9, 'Transcript of Records (TOR) Copy for'),
(47, 9, 'Certificate of Transfer (COT)');

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
(1, 8, 'Upload your passport size picture with name-tag'),
(7, 6, 'Upload your return slip from the issued Certificate of Eligibility to Transfer');

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
  `program` varchar(50) NOT NULL,
  `purpose` varchar(50) NOT NULL,
  `status` varchar(100) NOT NULL DEFAULT 'pending',
  `reason` varchar(255) NOT NULL,
  `feedbackType` varchar(20) DEFAULT NULL,
  `scheduleSlip` varchar(255) DEFAULT NULL,
  `responded` int(5) DEFAULT 0,
  `cloudinary_url` varchar(255) DEFAULT NULL,
  `cloudinary_public_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `requested_documents`
--

INSERT INTO `requested_documents` (`documentID`, `requestID`, `userID`, `agree`, `email`, `created`, `firstName`, `middleName`, `lastName`, `studentID`, `dateOfBirth`, `sex`, `mobileNum`, `classification`, `schoolYearAttended`, `yearGraduated`, `yearLevel`, `program`, `purpose`, `status`, `reason`, `feedbackType`, `scheduleSlip`, `responded`, `cloudinary_url`, `cloudinary_public_id`) VALUES
(86, 1740969377030428, 13, 'Yes', 'user@gmail.com', '2025-03-03 00:00:00', 'user', 'sample', 'account', '202010933', '2025-03-12', 'Male', '+639559145763', 'graduated', '2023', '2023 as of 1st Semester (2023-2024)', NULL, 'BS Information Techn', 'For Scholarship', 'completed', '', NULL, NULL, 0, NULL, NULL),
(87, 1740972065829738, 13, 'Yes', 'user@gmail.com', '2025-03-03 00:00:00', 'user', 'sample', 'account', '202010933', '2025-02-23', 'Male', '+639559145763', 'undergraduate', '2025', NULL, 'first-year', 'BS Computer Science', 'For Board Exam', 'ready to pickup', '', 'external', 'scheduleSlip/kesr3uf3y7ucw5kcxbjp', 0, 'https://res.cloudinary.com/dhgpir5ae/image/upload/v1743585704/scheduleSlip/kesr3uf3y7ucw5kcxbjp.jpg', 'scheduleSlip/kesr3uf3y7ucw5kcxbjp'),
(88, 1740972162571239, 13, 'Yes', 'user@gmail.com', '2025-03-03 00:00:00', 'user', 'sample', 'account', '202010933', '2025-02-23', 'Female', '+639559145763', 'undergraduate', '2024', NULL, 'fifth-year', 'BS Information Techn', 'For Employment - Abroad', 'ready to pickup', '', '', 'scheduleSlip/mnkjeh7wl88juxxpk5wa', 0, 'https://res.cloudinary.com/dhgpir5ae/image/upload/v1743658397/scheduleSlip/mnkjeh7wl88juxxpk5wa.jpg', 'scheduleSlip/mnkjeh7wl88juxxpk5wa'),
(89, 1740972605316843, 13, 'Yes', 'user@gmail.com', '2025-03-03 11:30:52', 'user', 'sample', 'account', '202010933', '2025-02-26', 'Male', '+639559145763', 'graduated', '2025', '2023', NULL, 'BS Industrial Techno', 'For Employment - Abroad', 'processing', '', NULL, NULL, 0, NULL, NULL),
(90, 1740972696930653, 13, 'Yes', 'user@gmail.com', '2025-03-03 11:32:36', 'user', 'sample', 'account', '202010933', '2025-02-23', 'Male', '+639559145763', 'graduated', '2025', '2023', NULL, 'BS Business Manageme', 'For Scholarship', 'processing', '', NULL, NULL, 0, NULL, NULL),
(91, 1740972772353832, 13, 'Yes', 'user@gmail.com', '2025-03-03 11:33:33', 'user', 'sample', 'account', '202010933', '2025-02-26', 'Male', '+639559145763', 'undergraduate', '2020', NULL, 'third-year', 'Bachelor of Secondar', 'For Board Exam', 'processing', '', NULL, NULL, 0, NULL, NULL),
(92, 1740978659308977, 13, 'Yes', 'user@gmail.com', '2025-03-03 13:11:49', 'user', 'sample', 'account', '202010933', '2025-03-03', 'Male', '+639559145763', 'graduated', '2020', '2018', NULL, 'BS Industrial Techno', 'For Board Exam', 'completed', 'asdasd', NULL, NULL, 0, NULL, NULL),
(93, 1740982722249235, 13, 'Yes', 'user@gmail.com', '2025-03-03 14:19:59', 'user', 'sample', 'account', '202010933', '2025-02-25', 'Male', '+639559145763', 'undergraduate', '2020', NULL, 'third-year', 'Bachelor of Technica', 'For Board Exam', 'completed', 'mali', NULL, NULL, 0, NULL, NULL),
(94, 1741141546582717, 13, 'Yes', 'user@gmail.com', '2025-03-05 16:37:34', 'user', 'sample', 'account', '202010933', '2025-02-26', 'Male', '+639559145763', 'undergraduate', '2020', NULL, 'third-year', 'BS Industrial Educat', 'For Employment - Abroad', 'completed', 'mali', NULL, NULL, 0, NULL, NULL),
(96, 1741221382859106, 13, 'Yes', 'user@gmail.com', '2025-03-06 08:37:24', 'user', 'sample', 'account', '202010933', '2025-03-06', 'Male', '+639559145763', 'undergraduate', '2020', NULL, 'third-year', 'BS Industrial Educat', 'For Board Exam', 'canceled', 'tanga', NULL, NULL, 0, NULL, NULL),
(97, 1741243638328667, 13, 'Yes', 'user@gmail.com', '2025-03-06 14:49:31', 'user', '', 'account', '202010933', '2025-03-07', 'Male', '+639559145763', 'graduated', '2025', '2024', NULL, 'BS Industrial Techno', 'Copy for School', 'processing', '', NULL, NULL, 0, NULL, NULL),
(98, 1741566483672289, 15, 'Yes', 'llantojem@gmail.com', '2025-03-10 08:30:27', 'Jan Eraseo Mari', 'Arcon', 'Llanto', '202010933', '2001-12-17', 'male', '+639559145763', 'graduated', '2020', '2024', NULL, 'BS Computer Engineering', 'For Employment - Local', 'ready to pickup', 'lack details', 'external', '1742450794745_426400598_406881401913145_4945769290312523602_n.jpg', 1, NULL, NULL),
(99, 1741566991151523, 15, 'Yes', 'llantojem@gmail.com', '2025-03-10 08:37:02', 'Jan Eraseo Mari', 'Arcon', 'Llanto', '202010933', '2025-03-11', 'male', '+639559145763', 'undergraduate', '2020', NULL, 'first-year', 'BS Computer Engineering', 'For Board Exam', 'ready to pickup', '', 'external', '1742802559151_Efren_Reyes_Fake_Death_News.jpg', 0, NULL, NULL),
(100, 1741567034072257, 15, 'Yes', 'llantojem@gmail.com', '2025-03-10 08:37:53', 'Jan Eraseo Mari', 'Arcon', 'Llanto', '202010933', '2025-03-11', 'male', '+639559145763', 'undergraduate', '2020', NULL, 'fifth-year', 'BS Computer Engineering', 'For Scholarship', 'ready to pickup', 'lampayatot', 'external', '1742472007624_Miyamizu.Mitsuha.full.2042407.jpg', 0, NULL, NULL),
(101, 0, 0, 'yes', 'testuser@example.com', '2025-03-12 14:13:49', 'John', 'A.', 'Doe', 'S1234567', '2000-05-15', 'Male', '+1234567890', 'Graduated', '2018-2019', '2022', '4th year', 'Computer Science', 'For Transfer', 'for claiming', '', NULL, NULL, 0, NULL, NULL),
(102, 0, 0, 'yes', 'testuser@example.com', '2025-03-12 15:03:47', 'John', 'A.', 'Doe', 'S1234567', '2000-05-15', 'Male', '+1234567890', 'Graduated', '2018-2019', '2022', '4th year', 'Computer Science', 'For Transfer', 'for claiming', '', NULL, NULL, 0, NULL, NULL),
(103, 0, 0, 'yes', 'testuser@example.com', '2025-03-12 15:04:06', 'John', 'A.', 'Doe', 'S1234567', '2000-05-15', 'Male', '+1234567890', 'Graduated', '2018-2019', '2022', '4th year', 'Computer Science', 'For Transfer', 'for claiming', '', NULL, NULL, 0, NULL, NULL),
(104, 0, 0, 'yes', 'testuser@example.com', '2025-03-12 15:22:22', 'John', 'A.', 'Doe', 'S1234567', '2000-05-15', 'Male', '+1234567890', 'Graduated', '2018-2019', '2022', '4th year', 'Computer Science', 'For Transfer', 'for claiming', '', NULL, NULL, 0, NULL, NULL),
(105, 0, 0, 'yes', 'testuser@example.com', '2025-03-12 15:23:56', 'John', 'A.', 'Doe', 'S1234567', '2000-05-15', 'Male', '+1234567890', 'Graduated', '2018-2019', '2022', '4th year', 'Computer Science', 'For Transfer', 'for claiming', '', NULL, NULL, 0, NULL, NULL),
(106, 0, 0, 'yes', 'testuser@example.com', '2025-03-12 15:24:41', 'John', 'A.', 'Doe', 'S1234567', '2000-05-15', 'Male', '+1234567890', 'Graduated', '2018-2019', '2022', '4th year', 'Computer Science', 'For Transfer', 'for claiming', '', NULL, NULL, 0, NULL, NULL),
(107, 0, 0, 'yes', 'testuser@example.com', '2025-03-12 15:25:17', 'John', 'A.', 'Doe', 'S1234567', '2000-05-15', 'Male', '+1234567890', 'Graduated', '2018-2019', '2022', '4th year', 'Computer Science', 'For Transfer', 'for claiming', '', NULL, NULL, 0, NULL, NULL),
(108, 65912345213, 0, 'yes', 'testuser@example.com', '2025-03-12 15:45:52', 'John', 'A.', 'Doe', 'S1234567', '2000-05-15', 'Male', '+1234567890', 'Graduated', '2018-2019', '2022', '4th year', 'Computer Science', 'For Transfer', '', '', NULL, NULL, 0, NULL, NULL),
(109, 65912345213, 15, 'yes', 'testuser@example.com', '2025-03-12 15:49:26', 'Jan Eraseo Mari', 'Arcon', 'Llanto', 'S1234567', '2000-05-15', 'Male', '+1234567890', 'Graduated', '2018-2019', '2022', '4th year', 'Computer Science', 'For Transfer', 'processing', '', NULL, NULL, 1, NULL, NULL),
(110, 65912345213, 13, 'yes', 'testuser@example.com', '2025-03-12 15:51:34', 'user', 'Arcon', 'account', 'S1234567', '2000-05-15', 'Male', '+1234567890', 'Graduated', '2018-2019', '2022', '4th year', 'Computer Science', 'For Transfer', '', '', NULL, NULL, 0, NULL, NULL),
(111, 65932345213, 13, 'yes', 'testuser@example.com', '2025-03-12 15:52:47', 'user', 'Arcon', 'account', 'S1234567', '2000-05-15', 'Male', '+1234567890', 'Graduated', '2018-2019', '2022', '4th year', 'Computer Science', 'For Transfer', 'ready to pickup', '', NULL, NULL, 0, NULL, NULL),
(112, 657832345213, 13, 'yes', 'testuser@example.com', '2025-03-12 15:55:00', 'user', 'Arcon', 'account', 'S1234567', '2000-05-15', 'Male', '+1234567890', 'Graduated', '2018-2019', '2022', '4th year', 'Computer Science', 'For Transfer', 'ready to pickup', '', NULL, NULL, 0, NULL, NULL),
(113, 657832345963, 13, 'yes', 'testuser@example.com', '2025-03-12 15:58:36', 'user', 'Arcon', 'account', 'S1234567', '2000-05-15', 'Male', '+1234567890', 'Graduated', '2018-2019', '2022', '4th year', 'Computer Science', 'For Transfer', 'completed', '', NULL, NULL, 1, NULL, NULL),
(114, 657832345963, 13, 'yes', 'testuser@example.com', '2025-03-12 16:00:48', 'user', 'Arcon', 'account', 'S1234567', '2000-05-15', 'Male', '+1234567890', 'Graduated', '2018-2019', '2022', '4th year', 'Computer Science', 'For Transfer', 'completed', '', NULL, NULL, 1, NULL, NULL),
(115, 657837895963, 13, 'yes', 'testuser@example.com', '2025-03-12 16:04:30', 'user', 'Arcon', 'account', 'S1234567', '2000-05-15', 'Male', '+1234567890', 'Graduated', '2018-2019', '2022', '4th year', 'Computer Science', 'For Transfer', 'completed', '', NULL, NULL, 1, NULL, NULL),
(116, 6789837895963, 13, 'yes', 'testuser@example.com', '2025-03-12 16:04:57', 'user', 'Arcon', 'account', 'S1234567', '2000-05-15', 'Male', '+1234567890', 'Graduated', '2018-2019', '2022', '4th year', 'Computer Science', 'For Transfer', 'completed', '', NULL, NULL, 1, NULL, NULL),
(117, 6787537895963, 13, 'yes', 'testuser@example.com', '2025-03-12 16:23:10', 'user', 'Arcon', 'account', 'S1234567', '2000-05-15', 'Male', '+1234567890', 'Graduated', '2018-2019', '2022', '4th year', 'BS Electrical Engine', 'For Transfer', 'completed', '', NULL, NULL, 1, NULL, NULL),
(118, 6787532395963, 13, 'yes', 'testuser@example.com', '2025-03-12 16:37:18', 'user', 'Arcon', 'account', 'S1234567', '2000-05-15', 'Male', '+1234567890', 'Graduated', '2018-2019', '2022', '4th year', 'BS Electrical Engine', 'For Transfer', 'completed', '', NULL, NULL, 1, NULL, NULL),
(119, 6787782395963, 13, 'yes', 'testuser@example.com', '2025-03-12 16:41:40', 'user', 'Arcon', 'account', 'S1234567', '2000-05-15', 'Male', '+1234567890', 'Graduated', '2018-2019', '2022', '4th year', 'BS Electrical Engine', 'For Transfer', 'completed', '', NULL, NULL, 1, NULL, NULL),
(120, 678778289963, 13, 'yes', 'testuser@example.com', '2025-03-12 16:43:22', 'user', 'Arcon', 'account', 'S1234567', '2000-05-15', 'Male', '+1234567890', 'Graduated', '2018-2019', '2022', '4th year', 'BS Electrical Engine', 'For Transfer', 'completed', '', NULL, NULL, 1, NULL, NULL),
(121, 678778289996, 13, 'yes', 'testuser@example.com', '2025-03-12 16:45:18', 'user', 'Arcon', 'account', 'S1234567', '2000-05-15', 'Male', '+1234567890', 'Graduated', '2018-2019', '2022', '4th year', 'BS Electrical Engine', 'For Transfer', 'completed', '', NULL, NULL, 1, NULL, NULL),
(122, 678778289996, 13, 'yes', 'testuser@example.com', '2025-03-12 16:52:43', 'user', 'Arcon', 'account', 'S1234567', '2000-05-15', 'Male', '+1234567890', 'Graduated', '2018-2019', '2022', '4th year', 'BS Electrical Engine', 'For Transfer', 'completed', '', NULL, NULL, 1, NULL, NULL),
(123, 678778789996, 13, 'yes', 'testuser@example.com', '2025-03-12 16:52:51', 'user', 'Arcon', 'account', 'S1234567', '2000-05-15', 'Male', '+1234567890', 'Graduated', '2018-2019', '2022', '4th year', 'BS Electrical Engine', 'For Transfer', 'completed', '', NULL, NULL, 1, NULL, NULL),
(124, 968778789996, 13, 'yes', 'testuser@example.com', '2025-03-12 16:54:05', 'user', 'Arcon', 'account', 'S1234567', '2000-05-15', 'Male', '+1234567890', 'Graduated', '2018-2019', '2022', '4th year', 'BS Electrical Engine', 'For Transfer', 'completed', '', NULL, NULL, 1, NULL, NULL),
(125, 912778789996, 13, 'yes', 'testuser@example.com', '2025-03-12 16:55:15', 'user', 'Arcon', 'account', 'S1234567', '2000-05-15', 'Male', '+1234567890', 'Graduated', '2018-2019', '2022', '4th year', 'BS Electrical Engine', 'For Transfer', 'completed', '', NULL, NULL, 1, NULL, NULL),
(126, 912778789989, 13, 'yes', 'testuser@example.com', '2025-03-12 16:57:08', 'user', 'Arcon', 'account', 'S1234567', '2000-05-15', 'Male', '+1234567890', 'Graduated', '2018-2019', '2022', '4th year', 'BS Electrical Engine', 'For Employment - Abroad', 'completed', '', NULL, NULL, 1, NULL, NULL),
(127, 965778789989, 13, 'yes', 'testuser@example.com', '2025-03-12 17:00:36', 'user', 'Arcon', 'account', 'S1234567', '2000-05-15', 'Male', '+1234567890', 'Graduated', '2018-2019', '2022', '4th year', 'BS Electrical Engine', 'For Employment - Abroad', 'cancelled', 'kulang ka boi', NULL, NULL, 0, NULL, NULL),
(128, 584778789989, 13, 'yes', 'testuser@example.com', '2025-03-12 17:01:34', 'user', 'Arcon', 'account', 'S1234567', '2000-05-15', 'Male', '+1234567890', 'Graduated', '2018-2019', '2022', '4th year', 'BS Electrical Engine', 'For Employment - Local', 'completed', '', NULL, NULL, 1, NULL, NULL),
(129, 584743789989, 13, 'yes', 'testuser@example.com', '2025-03-12 17:01:46', 'user', 'Arcon', 'account', 'S1234567', '2000-05-15', 'Male', '+1234567890', 'Graduated', '2018-2019', '2022', '4th year', 'BS Electrical Engine', 'For Employment - Local', 'completed', '', NULL, NULL, 1, NULL, NULL),
(130, 584197489989, 13, 'yes', 'testuser@example.com', '2025-03-12 17:02:04', 'user', 'Arcon', 'account', 'S1234567', '2000-05-15', 'Male', '+1234567890', 'Graduated', '2018-2019', '2022', '4th year', 'BS Electrical Engine', 'For Employment - Local', 'completed', '', NULL, NULL, 1, NULL, NULL),
(131, 584197489989, 13, 'yes', 'testuser@example.com', '2025-03-12 17:28:00', 'user', 'Arcon', 'account', 'S1234567', '2000-05-15', 'Male', '+1234567890', 'Graduated', '2018-2019', '2022', '4th year', 'Diploma in Hotel and', 'For Employment - Local', 'completed', '', NULL, NULL, 1, NULL, NULL),
(132, 584197489989, 13, 'yes', 'testuser@example.com', '2025-03-12 17:28:17', 'user', 'Arcon', 'account', 'S1234567', '2000-05-15', 'Male', '+1234567890', 'Graduated', '2018-2019', '2022', '4th year', 'Diploma in Hotel and', 'For Employment - Local', 'completed', '', NULL, NULL, 1, NULL, NULL),
(133, 1742272511977170, 15, 'Yes', 'llantojem@gmail.com', '2025-03-18 12:35:43', 'Jan Eraseo Mari', 'Arcon', 'Llanto', '202010933', '2025-03-11', 'male', '+639559145763', 'graduated', '2020', '2016', NULL, 'BS Computer Engineering', 'Others', 'completed', '', NULL, NULL, 1, NULL, NULL),
(134, 584193489989, 13, 'yes', 'testuser@example.com', '2025-03-24 13:56:04', 'user', 'Arcon', 'account', 'S1234567', '2000-05-15', 'Male', '+1234567890', 'Graduated', '2018-2019', '2022', '4th year', 'Diploma in Hotel and Restaurant Management', 'For Employment - Local', 'ready to pickup', '', NULL, NULL, 0, NULL, NULL),
(135, 788193489989, 13, 'yes', 'testuser@example.com', '2025-03-24 14:08:16', 'user', 'Arcon', 'account', 'S1234567', '2000-05-15', 'Male', '+1234567890', 'Graduated', '2018-2019', '2022', '4th year', 'Diploma in Hotel and Restaurant Management', 'For Employment - Local', 'completed', '', NULL, NULL, 1, NULL, NULL),
(136, 788193489989, 13, 'yes', 'testuser@example.com', '2025-03-24 14:10:59', 'user', 'Arcon', 'account', 'S1234567', '2000-05-15', 'Male', '+1234567890', 'Graduated', '2018-2019', '2022', '4th year', 'Diploma in Hotel and Restaurant Management', 'For Employment - Local', 'completed', '', NULL, NULL, 1, NULL, NULL),
(137, 258193489989, 13, 'yes', 'testuser@example.com', '2025-03-24 14:12:44', 'user', 'Arcon', 'account', 'S1234567', '2000-05-15', 'Male', '+1234567890', 'Graduated', '2018-2019', '2022', '4th year', 'Diploma in Hotel and Restaurant Management', 'For Employment - Local', 'completed', '', NULL, NULL, 1, NULL, NULL),
(138, 2369193489989, 13, 'yes', 'testuser@example.com', '2025-03-24 14:13:07', 'user', 'Arcon', 'account', 'S1234567', '2000-05-15', 'Male', '+1234567890', 'Graduated', '2018-2019', '2022', '4th year', 'Diploma in Hotel and Restaurant Management', 'For Employment - Local', 'completed', '', NULL, NULL, 1, NULL, NULL),
(139, 23733489989, 15, 'yes', 'testuser@example.com', '2025-03-24 14:27:32', 'Jan Eraseo Mari', 'Arcon', 'Llanto', '202010933', '2000-05-15', 'Male', '+1234567890', 'Graduated', '2018-2019', '2022', '4th year', 'Diploma in Hotel and Restaurant Management', 'For Employment - Local', 'ready to pickup', '', 'internal', '1742803697878_119646886_358412718621371_4595968001972870749_n.jpg', 0, NULL, NULL),
(140, 12733489989, 15, 'yes', 'testuser@example.com', '2025-03-24 14:28:00', 'Jan Eraseo Mari', 'Arcon', 'Llanto', '202010933', '2000-05-15', 'Male', '+1234567890', 'Graduated', '2018-2019', '2022', '4th year', 'Diploma in Hotel and Restaurant Management', 'For Employment - Local', 'completed', '', NULL, NULL, 1, NULL, NULL),
(141, 12733489989, 15, 'yes', 'testuser@example.com', '2025-03-24 14:29:01', 'Jan Eraseo Mari', 'Arcon', 'Llanto', '202010933', '2000-05-15', 'Male', '+1234567890', 'Graduated', '2018-2019', '2022', '4th year', 'Diploma in Hotel and Restaurant Management', 'For Employment - Abroad', 'completed', '', NULL, NULL, 1, NULL, NULL),
(142, 1742797917009123, 15, 'Yes', 'llantojem@gmail.com', '2025-03-24 14:41:30', 'Jan Eraseo Mari', 'Arcon', 'Llanto', '202010933', '2025-03-11', 'male', '+639559145763', 'undergraduate', '2323', NULL, 'fourth-year', 'BS Industrial Education', 'For Scholarship', 'completed', '', NULL, NULL, 1, NULL, NULL),
(143, 89733489989, 15, 'yes', 'testuser@example.com', '2025-03-24 14:44:16', 'Jan Eraseo Mari', 'Arcon', 'Llanto', '202010933', '2000-05-15', 'Male', '+1234567890', 'Graduated', '2018-2019', '2022', '4th year', 'Diploma in Hotel and Restaurant Management', 'For Employment - Abroad', 'completed', '', NULL, NULL, 1, NULL, NULL),
(144, 89733489974, 15, 'yes', 'testuser@example.com', '2025-03-24 14:46:21', 'Jan Eraseo Mari', 'Arcon', 'Llanto', '202010933', '2000-05-15', 'Male', '+1234567890', 'Graduated', '2018-2019', '2022', '4th year', 'Diploma in Hotel and Restaurant Management', 'For Employment - Abroad', 'ready to pickup', '', 'internal', '1742803735674_Miyamizu.Mitsuha.full.2042407.jpg', 1, NULL, NULL),
(145, 89733489974, 15, 'yes', 'testuser@example.com', '2025-03-24 14:47:43', 'Jan Eraseo Mari', 'Arcon', 'Llanto', '202010933', '2000-05-15', 'Male', '+1234567890', 'Graduated', '2018-2019', '2022', '4th year', 'Diploma in Hotel and Restaurant Management', 'For Employment - Abroad', 'ready to pickup', '', '', '1742803735674_Miyamizu.Mitsuha.full.2042407.jpg', 0, NULL, NULL),
(146, 1742798914156201, 15, 'Yes', 'llantojem@gmail.com', '2025-03-24 14:48:56', 'Jan Eraseo Mari', 'Arcon', 'Llanto', '202010933', '2025-03-11', 'male', '+639559145763', 'graduated', '5656', '2023 as of 1st Semester (2023-2024)', NULL, 'BS Computer Engineering', 'Others', 'completed', '', NULL, NULL, 1, NULL, NULL),
(147, 1742798971571872, 15, 'Yes', 'llantojem@gmail.com', '2025-03-24 14:49:51', 'Jan Eraseo Mari', 'Arcon', 'Llanto', '202010933', '2025-03-11', 'male', '+639559145763', 'undergraduate', '2020', NULL, 'second-year', 'BS Computer Engineering', 'For Employment - Abroad', 'completed', '', NULL, NULL, 1, NULL, NULL),
(148, 1742799031195333, 15, 'Yes', 'llantojem@gmail.com', '2025-03-24 14:50:51', 'Jan Eraseo Mari', 'Arcon', 'Llanto', '202010933', '2025-03-11', 'male', '+639559145763', 'undergraduate', '2020', NULL, 'first-year', 'BS Computer Engineering', 'Copy for School', 'completed', '', NULL, NULL, 1, NULL, NULL),
(149, 8961733489974, 15, 'yes', 'testuser@example.com', '2025-03-24 14:51:58', 'Jan Eraseo Mari', 'Arcon', 'Llanto', '202010933', '2000-05-15', 'Male', '+1234567890', 'Graduated', '2018-2019', '2022', '4th year', 'Diploma in Hotel and Restaurant Management', 'For Employment - Abroad', 'completed', '', NULL, NULL, 1, NULL, NULL),
(150, 1742799144234900, 15, 'Yes', 'llantojem@gmail.com', '2025-03-24 14:52:44', 'Jan Eraseo Mari', 'Arcon', 'Llanto', '202010933', '2025-03-11', 'male', '+639559145763', 'undergraduate', '2525', NULL, 'second-year', 'BS Computer Engineering', 'For Board Exam', 'completed', '', NULL, NULL, 1, NULL, NULL),
(151, 8961733489974, 15, 'yes', 'testuser@example.com', '2025-03-24 14:53:20', 'Jan Eraseo Mari', 'Arcon', 'Llanto', '202010933', '2000-05-15', 'Male', '+1234567890', 'Graduated', '2018-2019', '2022', '4th year', 'Diploma in Hotel and Restaurant Management', 'For Employment - Abroad', 'completed', '', NULL, NULL, 1, NULL, NULL),
(152, 8961733489974, 15, 'yes', 'testuser@example.com', '2025-03-24 15:04:28', 'Jan Eraseo Mari', 'Arcon', 'Llanto', '202010933', '2000-05-15', 'Male', '+1234567890', 'Graduated', '2018-2019', '2022', '4th year', 'BS Electrical Engineering', 'For Employment - Abroad', 'completed', '', NULL, NULL, 1, NULL, NULL),
(153, 1742799921694346, 15, 'Yes', 'llantojem@gmail.com', '2025-03-24 15:05:45', 'Jan Eraseo Mari', 'Arcon', 'Llanto', '202010933', '2025-03-11', 'male', '+639559145763', 'undergraduate', '2020', NULL, 'second-year', 'BS Computer Engineering', 'For Scholarship', 'completed', '', '', '1742805254663_Efren_Reyes_Fake_Death_News.jpg', 0, NULL, NULL),
(154, 1742800020232375, 15, 'Yes', 'llantojem@gmail.com', '2025-03-24 15:07:42', 'Jan Eraseo Mari', 'Arcon', 'Llanto', '202010933', '2025-03-11', 'male', '+639559145763', 'graduated', '2020', '2016', NULL, 'BS Industrial Technology', 'For TCP/CTE', 'ready to pickup', '', 'internal', '1742805054060_Efren_Reyes_Fake_Death_News.jpg', 1, NULL, NULL),
(155, 1742860722070117, 15, 'Yes', 'llantojem@gmail.com', '2025-03-25 07:59:13', 'Jan Eraseo Mari', 'Arcon', 'Llanto', '202010933', '2025-03-11', 'male', '+639559145763', 'graduated', '2202', '2022 as of 1st Semester (2022-2023)', NULL, 'BS Computer Engineering', 'For Masteral Studies', 'cancelled', 'sadasdasdasd', NULL, NULL, 0, NULL, NULL),
(156, 174286088268625, 15, 'Yes', 'llantojem@gmail.com', '2025-03-25 08:01:49', 'Jan Eraseo Mari', 'Arcon', 'Llanto', '202010933', '2025-03-11', 'male', '+639559145763', 'undergraduate', '2020', NULL, 'second-year', 'BS Computer Engineering', 'For Scholarship', 'completed', '', '', '1743068019431_Efren_Reyes_Fake_Death_News.jpg', 1, NULL, NULL),
(157, 1742860953244144, 15, 'Yes', 'llantojem@gmail.com', '2025-03-25 08:06:34', 'Jan Eraseo Mari', 'Arcon', 'Llanto', '202010933', '2025-03-11', 'male', '+639559145763', 'undergraduate', '2020', NULL, 'fifth-year', 'BS Information Technology', 'Others', 'ready to pickup', '', NULL, NULL, 0, NULL, NULL),
(158, 1742882394825370, 15, 'Yes', 'llantojem@gmail.com', '2025-03-25 14:10:52', 'Jan Eraseo Mari', 'Arcon', 'Llanto', '202010933', '2025-03-11', 'male', '+639559145763', 'undergraduate', '2020', NULL, 'second-year', 'Bachelor of Secondary Education', 'Others', 'pending', '', NULL, NULL, 0, NULL, NULL),
(159, 1742883175767732, 15, 'Yes', 'llantojem@gmail.com', '2025-03-25 14:39:41', 'Jan Eraseo Mari', 'Arcon', 'Llanto', '202010933', '2025-03-11', 'male', '+639559145763', 'undergraduate', '123', NULL, 'third-year', 'BS Computer Engineering', 'Copy for School', 'pending', '', NULL, NULL, 0, NULL, NULL),
(160, 1742885265164696, 15, 'Yes', 'llantojem@gmail.com', '2025-03-25 14:48:16', 'Jan Eraseo Mari', 'Arcon', 'Llanto', '202010933', '2025-03-11', 'male', '+639559145763', 'undergraduate', '02002', NULL, 'second-year', 'BS Computer Engineering', 'For Board Exam', 'pending', '', NULL, NULL, 0, NULL, NULL),
(161, 1742894866510580, 15, 'Yes', 'llantojem@gmail.com', '2025-03-25 17:28:45', 'Jan Eraseo Mari', 'Arcon', 'Llanto', '202010933', '2025-03-11', 'male', '+639559145763', 'undergraduate', '2020', NULL, 'second-year', 'BS Information Technology', 'For Board Exam', 'pending', '', NULL, NULL, 0, NULL, NULL),
(162, 1743042039231223, 15, 'Yes', 'llantojem@gmail.com', '2025-03-27 10:21:23', 'Jan Eraseo Mari', 'Arcon', 'Llanto', '202010933', '2025-03-11', 'male', '+639559145763', 'undergraduate', '2023', NULL, 'first-year', 'BS Computer Engineering', 'For Transfer', 'pending', '', NULL, NULL, 0, NULL, NULL),
(163, 1743408859790235, 15, 'yes', 'llantojem@gmail.com', '2025-03-31 16:46:53', 'Jan Eraseo Mari', 'Arcon', 'Llanto', '202010933', '2025-03-08', 'male', '+639559145763', 'graduated', '2025', '2023 as of 1st Semester (2023-2024)', '', 'BS Information Technology', 'For Masteral Studies', 'ready to pickup', '', NULL, NULL, 0, NULL, NULL),
(164, 1743413138275175, 15, 'Yes', 'llantojem@gmail.comasd', '2025-03-31 17:32:28', 'Jan Eraseo Mariasd', 'Arconas', 'Llantoasd', '202010933234234', '2025-03-11', 'male', '+639559145763', 'graduated', '2025', '2023 as of 1st Semester (2023-2024)', '', 'BS Information Technology', 'For Employment - Abroad', 'pending', '', NULL, NULL, 0, NULL, NULL),
(165, 1743582774014543, 15, 'Yes', 'llantojem@gmail.com', '2025-04-02 16:33:27', 'Jan Eraseo Mariasd', 'Arcon', 'Llanto', '202010933', '2025-03-11', 'male', '+639559145763', 'undergraduate', '2020', '', 'second-year', 'BS Information Technology', 'For Board Exam', 'ready to pickup', '', NULL, NULL, 0, NULL, NULL),
(166, 1743582774014543, 15, 'Yes', 'llantojem@gmail.com', '2025-04-02 16:35:20', 'Jan Eraseo Mariasd', 'Arcon', 'Llanto', '202010933', '2025-03-11', 'male', '+639559145763', 'undergraduate', '2020', '', 'second-year', 'BS Information Technology', 'For Board Exam', 'ready to pickup', '', NULL, NULL, 0, NULL, NULL),
(167, 1743582774014543, 15, 'Yes', 'llantojem@gmail.com', '2025-04-02 16:36:52', 'Jan Eraseo Mariasd', 'Arcon', 'Llanto', '202010933', '2025-03-11', 'male', '+639559145763', 'undergraduate', '2020', '', 'second-year', 'BS Information Technology', 'For Board Exam', 'ready to pickup', '', NULL, NULL, 0, NULL, NULL),
(168, 1743582774014543, 15, 'Yes', 'llantojem@gmail.com', '2025-04-02 16:37:50', 'Jan Eraseo Mariasd', 'Arcon', 'Llanto', '202010933', '2025-03-11', 'male', '+639559145763', 'undergraduate', '2020', '', 'second-year', 'BS Information Technology', 'For Board Exam', 'ready to pickup', '', NULL, NULL, 0, NULL, NULL),
(169, 1743582774014543, 15, 'Yes', 'llantojem@gmail.com', '2025-04-02 16:38:56', 'Jan Eraseo Mariasd', 'Arcon', 'Llanto', '202010933', '2025-03-11', 'male', '+639559145763', 'undergraduate', '2020', '', 'second-year', 'BS Information Technology', 'For Board Exam', 'ready to pickup', '', NULL, NULL, 0, NULL, NULL),
(170, 1743583149788680, 15, 'Yes', 'llantojem@gmail.com', '2025-04-02 16:39:16', 'Jan Eraseo Mariasd', 'Arcon', 'Llanto', '202010933', '2025-03-11', 'male', '+639559145763', 'undergraduate', '2020', '', 'second-year', 'BS Information Technology', 'For Board Exam', 'ready to pickup', '', 'external', 'scheduleSlip/q1gh7tblvkg6gopjtn3k', 0, 'https://res.cloudinary.com/dhgpir5ae/image/upload/v1743643237/scheduleSlip/q1gh7tblvkg6gopjtn3k.jpg', 'scheduleSlip/q1gh7tblvkg6gopjtn3k'),
(171, 1743583149788680, 15, 'Yes', 'llantojem@gmail.com', '2025-04-02 16:41:08', 'Jan Eraseo Mariasd', 'Arcon', 'Llanto', '202010933', '2025-03-11', 'male', '+639559145763', 'undergraduate', '2020', '', 'second-year', 'BS Information Technology', 'For Board Exam', 'ready to pickup', '', 'external', 'scheduleSlip/q1gh7tblvkg6gopjtn3k', 0, 'https://res.cloudinary.com/dhgpir5ae/image/upload/v1743643237/scheduleSlip/q1gh7tblvkg6gopjtn3k.jpg', 'scheduleSlip/q1gh7tblvkg6gopjtn3k'),
(172, 1743583149788680, 15, 'Yes', 'llantojem@gmail.com', '2025-04-02 16:43:30', 'Jan Eraseo Mariasd', 'Arcon', 'Llanto', '202010933', '2025-03-11', 'male', '+639559145763', 'undergraduate', '2020', '', 'second-year', 'BS Information Technology', 'For Board Exam', 'ready to pickup', '', 'external', 'scheduleSlip/q1gh7tblvkg6gopjtn3k', 0, 'https://res.cloudinary.com/dhgpir5ae/image/upload/v1743643237/scheduleSlip/q1gh7tblvkg6gopjtn3k.jpg', 'scheduleSlip/q1gh7tblvkg6gopjtn3k'),
(173, 1743583461753491, 15, 'yes', 'llantojem@gmail.com', '2025-04-02 16:45:03', 'Jan Eraseo Mari', 'Arcon', 'Llantosaad', '202010933', '2025-03-11', 'male', '+639559145763', 'undergraduate', '2020', '', 'third-year', 'BS Information Technology', 'For Board Exam', 'ready to pickup', '', 'internal', 'scheduleSlip/uolm0kqrcyubb2irwhcj', 1, 'https://res.cloudinary.com/dhgpir5ae/image/upload/v1743648319/scheduleSlip/uolm0kqrcyubb2irwhcj.jpg', 'scheduleSlip/uolm0kqrcyubb2irwhcj'),
(174, 1743583635789762, 15, 'yes', 'llantojem@gmail.com', '2025-04-02 16:48:06', 'Jan Eraseo Mari', 'Arcon', 'Llantosaad', '202010933', '2025-03-11', 'male', '+639559145763', 'undergraduate', '2020', '', 'third-year', 'BS Information Technology', 'Copy for School', 'ready to pickup', '', NULL, NULL, 1, NULL, NULL),
(175, 1743583635789762, 15, 'yes', 'llantojem@gmail.com', '2025-04-02 16:48:35', 'Jan Eraseo Mari', 'Arcon', 'Llantosaad', '202010933', '2025-03-11', 'male', '+639559145763', 'undergraduate', '2020', '', 'third-year', 'BS Information Technology', 'Copy for School', 'ready to pickup', '', NULL, NULL, 1, NULL, NULL),
(176, 1743583635789762, 15, 'yes', 'llantojem@gmail.com', '2025-04-02 16:49:17', 'Jan Eraseo Mari', 'Arcon', 'Llantosaad', '202010933', '2025-03-11', 'male', '+639559145763', 'undergraduate', '2020', '', 'third-year', 'BS Information Technology', 'Copy for School', 'ready to pickup', '', NULL, NULL, 1, NULL, NULL),
(177, 1743643999144735, 15, 'yes', 'llantojem@gmail.com', '2025-04-03 09:33:41', 'Jan Eraseo Mari', 'Arcon', 'Llantosaad', '202010933', '2025-03-11', 'male', '+639559145763', 'undergraduate', '2020', '', 'second-year', 'BS Information Technology', 'For Board Exam', 'ready to pickup', '', 'external', 'scheduleSlip/i6i060cmktyaxy3azpmx', 1, 'https://res.cloudinary.com/dhgpir5ae/image/upload/v1743658157/scheduleSlip/i6i060cmktyaxy3azpmx.jpg', 'scheduleSlip/i6i060cmktyaxy3azpmx'),
(178, 1743644024423916, 15, 'Yes', 'llantojem@gmail.com', '2025-04-03 09:33:51', 'Jan Eraseo Mari', 'Arcon', 'Llantosaad', '202010933', '2025-03-11', 'male', '+639559145763', 'undergraduate', '2020', '', 'second-year', 'BS Information Technology', 'For Board Exam', 'ready to pickup', '', '', 'scheduleSlip/oogtvuiye75jyxbdtegi', 0, 'https://res.cloudinary.com/dhgpir5ae/image/upload/v1743658545/scheduleSlip/oogtvuiye75jyxbdtegi.jpg', 'scheduleSlip/oogtvuiye75jyxbdtegi'),
(179, 17436453408088, 15, 'yes', 'llantojem@gmail.com', '2025-04-03 09:56:03', 'Jan Eraseo Mari', 'Arcon', 'Llantosaad', '202010933', '2025-03-11', 'male', '+639559145763', 'undergraduate', '2020', '', 'second-year', 'BS Information Technology', 'For Board Exam', 'completed', '', '', 'scheduleSlip/vqkn0xmncrrvdphxhz5k', 0, 'https://res.cloudinary.com/dhgpir5ae/image/upload/v1743658821/scheduleSlip/vqkn0xmncrrvdphxhz5k.jpg', 'scheduleSlip/vqkn0xmncrrvdphxhz5k'),
(180, 1743645538799153, 15, 'yes', 'llantojem@gmail.com', '2025-04-03 09:59:17', 'Jan Eraseo Mari', 'Arcon', 'Llantosaad', '202010933', '2025-03-11', 'male', '+639559145763', 'undergraduate', '2020', '', 'first-year', 'BS Information Technology', 'Copy for School', 'processing', '', NULL, NULL, 0, NULL, NULL),
(181, 1743985267726432, 15, 'yes', 'llantojem@gmail.com', '2025-04-07 08:21:28', 'Jan Eraseo Mari', 'Arcon', 'Llantosaad', '202010933', '2025-03-11', 'male', '+639559145763', 'undergraduate', '2020', '', 'first-year', 'BS Electrical Engineering', 'For Board Exam', 'pending', '', NULL, NULL, 0, NULL, NULL),
(182, 1743985486501522, 15, 'yes', 'llantojem@gmail.com', '2025-04-07 08:25:15', 'Jan Eraseo Mari', 'Arcon', 'Llantosaad', '202010933', '2025-03-11', 'male', '+639559145763', 'undergraduate', '2020', '', 'third-year', 'BS Information Technology', 'Copy for School', 'pending', '', NULL, NULL, 0, NULL, NULL),
(183, 1743985733654657, 15, 'yes', 'llantojem@gmail.com', '2025-04-07 08:29:14', 'Jan Eraseo Mari', 'Arcon', 'Llantosaad', '202010933', '2025-03-11', 'male', '+639559145763', 'undergraduate', '2020', '', 'second-year', 'BS Information Technology', 'For Board Exam', 'pending', '', NULL, NULL, 0, NULL, NULL),
(184, 1743985801890458, 15, 'yes', 'llantojem@gmail.com', '2025-04-07 08:30:23', 'Jan Eraseo Mari', 'Arcon', 'Llantosaad', '202010933', '2025-03-11', 'male', '+639559145763', 'undergraduate', '2020', '', 'first-year', 'BS Information Technology', 'For Board Exam', 'ready to pickup', '', 'external', NULL, 1, 'https://res.cloudinary.com/dhgpir5ae/image/upload/v1743986039/scheduleSlip/y48bnbenjgzicqpvijqx.jpg', 'scheduleSlip/y48bnbenjgzicqpvijqx'),
(185, 1743986317143738, 15, 'yes', 'llantojem@gmail.com', '2025-04-07 08:38:57', 'Jan Eraseo Mari', 'Arcon', 'Llantosaad', '202010933', '2025-03-11', 'male', '+639559145763', 'undergraduate', '0202', '', 'first-year', 'BS Information Technology', 'Copy for School', 'pending', '', NULL, NULL, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `requested_document_file`
--

CREATE TABLE `requested_document_file` (
  `fileID` int(15) NOT NULL,
  `requestID` bigint(15) NOT NULL,
  `cloudinary_url` varchar(255) DEFAULT NULL,
  `cloudinary_public_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `requested_document_file`
--

INSERT INTO `requested_document_file` (`fileID`, `requestID`, `cloudinary_url`, `cloudinary_public_id`) VALUES
(9, 1740972065829738, NULL, NULL),
(10, 1740972772353832, NULL, NULL),
(11, 1740978659308977, NULL, NULL),
(12, 1740982722249235, NULL, NULL),
(13, 1741221382859106, NULL, NULL),
(14, 1741566991151523, NULL, NULL),
(15, 1742272511977170, NULL, NULL),
(16, 1742798914156201, NULL, NULL),
(17, 1742799031195333, NULL, NULL),
(18, 1742799144234900, NULL, NULL),
(19, 1742883175767732, NULL, NULL),
(20, 1742885265164696, NULL, NULL),
(21, 1742894866510580, NULL, NULL),
(22, 1743643999144735, 'https://res.cloudinary.com/dhgpir5ae/image/upload/v1743644027/uploads/fno8za3rpvixyq0u6pft.jpg', 'uploads/fno8za3rpvixyq0u6pft'),
(23, 1743644024423916, 'https://res.cloudinary.com/dhgpir5ae/image/upload/v1743644037/uploads/qkzpg1wxgyeafrrsaxzs.jpg', 'uploads/qkzpg1wxgyeafrrsaxzs'),
(24, 17436453408088, 'https://res.cloudinary.com/dhgpir5ae/image/upload/v1743645375/uploads/wnuh4aa1vmcncqczaqin.jpg', 'uploads/wnuh4aa1vmcncqczaqin'),
(25, 1743645538799153, 'https://res.cloudinary.com/dhgpir5ae/image/upload/v1743645571/uploads/euwn6t14tinvarnbu10z.jpg', 'uploads/euwn6t14tinvarnbu10z'),
(26, 1743985267726432, 'uploads/o3m9wtusz3untue0el4b', 'https://res.cloudinary.com/dhgpir5ae/image/upload/v1743985297/uploads/o3m9wtusz3untue0el4b.jpg'),
(27, 1743985486501522, 'uploads/uxnhsvddi98pxlanzhif', 'https://res.cloudinary.com/dhgpir5ae/image/upload/v1743985523/uploads/uxnhsvddi98pxlanzhif.jpg'),
(28, 1743985733654657, 'uploads/wld3z5isvgv9b99wnhyb', 'https://res.cloudinary.com/dhgpir5ae/image/upload/v1743985763/uploads/wld3z5isvgv9b99wnhyb.jpg'),
(29, 1743985801890458, 'uploads/rrpllj43zqmwr628xlsb', 'https://res.cloudinary.com/dhgpir5ae/image/upload/v1743985832/uploads/rrpllj43zqmwr628xlsb.jpg'),
(30, 1743986317143738, 'https://res.cloudinary.com/dhgpir5ae/image/upload/v1743986346/uploads/dwskmrnlbtnpcr6nuqrg.jpg', 'uploads/dwskmrnlbtnpcr6nuqrg');

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
(68, 1740972696930653, '1st SEM'),
(69, 1741163857243110, 'asd'),
(70, 1741163857243110, 'asd'),
(71, 1741567034072257, 'Governor'),
(72, 1741567034072257, '2025'),
(73, 1741567034072257, '1st sem'),
(74, 1742797917009123, 'Municipal Scholarship'),
(75, 1742797917009123, 'asdtryr'),
(76, 1742797917009123, 'asd'),
(77, 1742799921694346, 'asdasd'),
(78, 1742799921694346, 'asd'),
(79, 1742799921694346, 'asdasdasd'),
(80, 174286088268625, 'Municipal Scholarship'),
(81, 174286088268625, '2025'),
(82, 174286088268625, '1st SEM');

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
(20, 1740972696930653, 'Transcipt of Records (TOR)'),
(21, 1741141546582717, 'Certification Authentication and Verification (CAV'),
(22, 1741141546582717, 'General Point Average/General Weighted Average'),
(23, 1741141546582717, 'Transcript of Records(For Employment Abroad)'),
(24, 1741566483672289, 'Transcript of Records (For Employment Abroad)'),
(25, 1741566991151523, 'Transcript of Records'),
(26, 1741567034072257, 'Transcipt of Records (TOR)'),
(27, 1742272511977170, 'Transcript of Records (TOR)'),
(28, 1742272511977170, 'Graduation and Non-Special Order'),
(29, 1742272511977170, 'Course Description'),
(30, 1742797917009123, 'Transcipt of Records (TOR)'),
(31, 1742798914156201, 'Certification Authentication and Verification (CAV'),
(32, 1742798971571872, 'Certification Authentication and Verification (CAV'),
(33, 1742799144234900, 'Transcript of Records'),
(34, 1742799921694346, 'Transcipt of Records (TOR)'),
(35, 1742799921694346, 'Certification of Bonafied Students'),
(36, 1742800020232375, 'Transcript of Records (TOR) for Evaluation'),
(37, 1742800020232375, 'Transcript of Records (TOR) Copy for'),
(38, 1742860722070117, 'Transcript of Records (TOR) for Evaluation'),
(39, 1742860722070117, 'Transcript of Records (TOR) Copy for'),
(40, 174286088268625, 'Transcipt of Records (TOR)'),
(41, 174286088268625, 'Certification of Bonafied Students'),
(42, 1742860953244144, 'Certification Authentication and Verification (CAV'),
(43, 1742860953244144, 'Graduation and Non-Special Order'),
(44, 1742882394825370, 'Good Moral Certificate'),
(45, 1742885265164696, 'Transcript of Records'),
(46, 1742894866510580, 'Transcript of Records'),
(47, 1743042039231223, 'Transcript of Records (TOR) for Evaluation'),
(48, 1743042039231223, 'Certificate of Transfer (COT)'),
(49, 1743410594844327, 'Transcript of Records (TOR) for Evaluation'),
(50, 1743410594844327, 'Transcript of Records (TOR) Copy for'),
(51, 1743582774014543, 'Transcript of Records'),
(52, 1743582774014543, 'Transcript of Records'),
(53, 1743582774014543, 'Transcript of Records'),
(54, 1743582774014543, 'Transcript of Records'),
(55, 1743582774014543, 'Transcript of Records'),
(56, 1743583149788680, 'Transcript of Records'),
(57, 1743583149788680, 'Transcript of Records'),
(58, 1743583149788680, 'Transcript of Records'),
(59, 1743583461753491, 'Transcript of Records'),
(60, 1743643999144735, 'Transcript of Records'),
(61, 1743644024423916, 'Transcript of Records'),
(62, 17436453408088, 'Transcript of Records'),
(63, 1743985267726432, 'Transcript of Records'),
(64, 1743985733654657, 'Transcript of Records'),
(65, 1743985801890458, 'Transcript of Records');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` int(15) NOT NULL,
  `isAdmin` int(15) NOT NULL DEFAULT 0,
  `isNewAccount` int(1) DEFAULT 1,
  `firstName` varchar(100) NOT NULL,
  `middleName` varchar(150) DEFAULT NULL,
  `lastName` varchar(100) NOT NULL,
  `dateOfBirth` date DEFAULT NULL,
  `sex` text DEFAULT NULL,
  `studentID` varchar(50) DEFAULT NULL,
  `program` varchar(150) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `mobileNum` varchar(15) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `reset_token` varchar(250) DEFAULT NULL,
  `reset_token_expires` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `isAdmin`, `isNewAccount`, `firstName`, `middleName`, `lastName`, `dateOfBirth`, `sex`, `studentID`, `program`, `email`, `mobileNum`, `password`, `reset_token`, `reset_token_expires`) VALUES
(8, 0, 1, 'asd', NULL, 'asd', NULL, NULL, NULL, NULL, 'asd@gmail.com', NULL, '$2b$10$Dy.LTdoXEzKBKxBe/Nkik.tUJ.ovMTnYTwzj1SeamoytK7l6JLvRe', NULL, NULL),
(9, 0, 1, 'asd', NULL, 'asd', NULL, NULL, NULL, NULL, 'asdasd@gmail.com', NULL, '$2b$10$Dy.LTdoXEzKBKxBe/Nkik.tUJ.ovMTnYTwzj1SeamoytK7l6JLvRe', NULL, NULL),
(10, 0, 1, 'qwe', NULL, 'qwe', NULL, NULL, NULL, NULL, 'qwe@gmail.com', NULL, '$2b$10$4Xc/exsHJobu4D/8EkCr5.RAuOE9Yd55YL.fE4JE8H/xwclyGCywa', NULL, NULL),
(11, 0, 1, 'zxc', NULL, 'zxc', NULL, NULL, NULL, NULL, 'zxc@gmail.com', NULL, '$2b$10$RLGvqdpwjbo9lWV0ha4GVuspvtp7iKWz5XdJmi5HMVB2xvZidZ/Ti', NULL, NULL),
(12, 1, 1, 'admin', NULL, 'account', NULL, NULL, NULL, NULL, 'admin@gmail.com', NULL, '$2b$10$2//W8I8SKUcNndBcslP.Z.Hnoyuw.gWAj4pLGza9sd/ImtdBOl.cW', NULL, NULL),
(13, 0, 0, 'user', NULL, 'account', '2025-02-26', 'male', '202014855', 'BS Electrical Engineering', 'user@gmail.com', '+639559145763', '$2b$10$v.s4T4cZNsN8y0Q4QaMxfeU905ly6NIX.y/cDFWFW6vDxQ3BMMrPS', NULL, NULL),
(14, 1, 1, 'johnmark', NULL, 'sallao', NULL, NULL, NULL, NULL, 'jm@gmail.com', NULL, '$2b$10$dffT9ICei9.odwLmG5zMx.M/0BAJP2TRBXO1VR.mOAjaC2ZvFdr42', NULL, NULL),
(15, 0, 0, 'Jan Eraseo Mari', 'Arcon', 'Llantosaad', '2025-03-11', 'male', '202010933', 'BS Information Technology', 'llantojem@gmail.com', '+639559145763', '$2b$10$BpwqrpDcFvJeubNr86xroeIAKJ.xoKrrgPRmS1UMscVJUhIMLB4d.', '7984ce70339594e8b7758172e889e2d9e6bc7edc1b3cccde1641a09cab840043', '2025-03-27 14:30:21.247'),
(16, 2, 1, 'SuperAdmin', 'Sample', 'Account', '2025-02-25', NULL, '', 'BS Information Technology', 'superadmin@gmail.com', '', '$2b$10$tJxc/Vo3vx1ZxQYRW3BmGOmT0AUs1s9NwcpfNrMM2E8/eBRul7oyy', NULL, NULL),
(17, 0, 1, 'Jem', 'Jem', 'Jem', NULL, NULL, NULL, NULL, 'llsantojem@gmail.com', NULL, '$2b$10$/BJA0QfuWMC6piR6EYy5Au7KR4/ET87MTu5mfkGsF7cVryduHV.kq', NULL, NULL),
(19, 0, 1, 'jem', 'jem', 'jem', NULL, NULL, NULL, NULL, 'jempogy@gmail.com', NULL, '$2b$10$7jufCDRmf/bUIS0OpiA49.rX1FJsMwiN5yInTpNblv3TD1BiQ9Zc.', NULL, NULL),
(20, 0, 1, 'JemPot', 'JemPot', 'JemPot', NULL, NULL, NULL, NULL, 'JemPot123!@gmail.com', NULL, '$2b$10$9L8Us71/4ByS4pLE.Kw5guC7I9hVMNUZdN/Z7vDQqafU8t0pr50C.', NULL, NULL),
(21, 0, 0, '709923', '709923', '709923', '2001-12-17', 'male', '202010933', 'BS Electrical Engineering', 'JemPot123@gmail.com', '+63123123123', '$2b$10$u5D3ZyHGt1IK6kpjruUnl.cRCjBxfHIWexv0c1HM9duA1haRqGDZq', NULL, NULL),
(22, 0, 1, 'asd', '', 'asd', NULL, NULL, NULL, NULL, 'Jem@gmail.com', NULL, '$2b$10$qodofAU1.NkygFQ7/cnMX.ubugLeQ0JXyrJorhzqor.DDjK1TNFxK', NULL, NULL),
(23, 0, 1, 'John Kenneth', '', 'Tan', NULL, NULL, NULL, NULL, 'llantojem123@gmail.com', NULL, '$2b$10$E.8w4FSfN78YVLh.eNNpNurfc7Zi5ifBXS59NgBkNv85NEvu5BTX6', NULL, NULL),
(24, 0, 1, 'test', 'test', 'test', NULL, NULL, NULL, NULL, 'test@gmail.com', NULL, '$2b$10$aPOiA.yJ5d/8W/5WKp20e.T.j21TiNjezmhbxhnxMsQQ4AEE0ELea', NULL, NULL),
(25, 0, 0, 'John Kenneth', 'Arcon', 'Tan', '2025-02-23', 'male', '202015966', 'BS Information Technology', 'llantojem123123@gmail.com', '+639559145763', '$2b$10$EAV43WCGPv0LS5cTZRi1VuDYZxe0vFEXcBFnNyi7nOWy4SoJw6n0i', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `year_graduated`
--

CREATE TABLE `year_graduated` (
  `yearGraduatedID` int(15) NOT NULL,
  `yearOption` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `year_graduated`
--

INSERT INTO `year_graduated` (`yearGraduatedID`, `yearOption`) VALUES
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
-- Indexes for table `feedback_external`
--
ALTER TABLE `feedback_external`
  ADD PRIMARY KEY (`feedbackID`);

--
-- Indexes for table `feedback_internal`
--
ALTER TABLE `feedback_internal`
  ADD PRIMARY KEY (`feedbackID`);

--
-- Indexes for table `form_switch`
--
ALTER TABLE `form_switch`
  ADD PRIMARY KEY (`switchID`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`notificationID`);

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
  ADD PRIMARY KEY (`yearGraduatedID`);

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
-- AUTO_INCREMENT for table `feedback_external`
--
ALTER TABLE `feedback_external`
  MODIFY `feedbackID` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `feedback_internal`
--
ALTER TABLE `feedback_internal`
  MODIFY `feedbackID` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `form_switch`
--
ALTER TABLE `form_switch`
  MODIFY `switchID` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `notificationID` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=312;

--
-- AUTO_INCREMENT for table `program_course`
--
ALTER TABLE `program_course`
  MODIFY `programID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `purposes`
--
ALTER TABLE `purposes`
  MODIFY `purposeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `purpose_inputs`
--
ALTER TABLE `purpose_inputs`
  MODIFY `inputID` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `purpose_selection`
--
ALTER TABLE `purpose_selection`
  MODIFY `selectionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `purpose_upload`
--
ALTER TABLE `purpose_upload`
  MODIFY `uploadID` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `requested_documents`
--
ALTER TABLE `requested_documents`
  MODIFY `documentID` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=186;

--
-- AUTO_INCREMENT for table `requested_document_file`
--
ALTER TABLE `requested_document_file`
  MODIFY `fileID` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `requested_document_input`
--
ALTER TABLE `requested_document_input`
  MODIFY `inputID` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT for table `requested_document_type`
--
ALTER TABLE `requested_document_type`
  MODIFY `typeID` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `year_graduated`
--
ALTER TABLE `year_graduated`
  MODIFY `yearGraduatedID` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

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
