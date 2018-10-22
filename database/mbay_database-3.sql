-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 30, 2018 at 11:10 PM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 7.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mbay_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `addons_walkin_tbl`
--

CREATE TABLE `addons_walkin_tbl` (
  `addons_walkin_id` int(11) NOT NULL,
  `amenity_id` int(11) DEFAULT NULL,
  `walkin_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `admin_tbl`
--

CREATE TABLE `admin_tbl` (
  `admin_id` int(11) NOT NULL,
  `admin_desc` varchar(45) DEFAULT NULL,
  `admin_username` varchar(45) DEFAULT NULL,
  `admin_password` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin_tbl`
--

INSERT INTO `admin_tbl` (`admin_id`, `admin_desc`, `admin_username`, `admin_password`) VALUES
(1, 'main_admin', 'admin', 'admin'),
(2, 'front_desk', 'admin', 'admin'),
(3, 'receptionist', 'admin', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `amenities_tbl`
--

CREATE TABLE `amenities_tbl` (
  `amenity_id` int(11) NOT NULL,
  `amenity_name` varchar(45) DEFAULT NULL,
  `amenity_rate` varchar(45) DEFAULT NULL,
  `amenity_availability` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `customer_tbl`
--

CREATE TABLE `customer_tbl` (
  `cust_id` int(11) NOT NULL,
  `cust_fname` varchar(80) DEFAULT NULL,
  `cust_mname` varchar(45) DEFAULT NULL,
  `cust_lname` varchar(45) DEFAULT NULL,
  `cust_gender` varchar(45) DEFAULT NULL,
  `cust_birthMonth` varchar(45) DEFAULT NULL,
  `cust_birthDate` varchar(45) DEFAULT NULL,
  `cust_birthYear` varchar(45) DEFAULT NULL,
  `cust_contact_no` varchar(11) DEFAULT NULL,
  `senior_citizen_id` varchar(80) DEFAULT NULL,
  `delete_stats` tinyint(4) DEFAULT NULL,
  `medical_history` varchar(1000) DEFAULT NULL,
  `cust_address` varchar(200) DEFAULT NULL,
  `cust_type` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer_tbl`
--

INSERT INTO `customer_tbl` (`cust_id`, `cust_fname`, `cust_mname`, `cust_lname`, `cust_gender`, `cust_birthMonth`, `cust_birthDate`, `cust_birthYear`, `cust_contact_no`, `senior_citizen_id`, `delete_stats`, `medical_history`, `cust_address`, `cust_type`) VALUES
(58, 'Crisaldo', 'Ibay', 'Santos', 'Male', '01', '22', '1999', '09132123123', NULL, 0, 'qewqewqe', '1811 Int. 36 Bo Sta Maria Pedro Gil Paco Manila', 1),
(79, 'Rachel', 'Cabuso', 'Flores', 'Female', '09', '02', '1999', '09123123123', NULL, 0, 'oiqeqwioe', 'oipqiweiopqw', 0),
(80, 'Rafhael', '', 'Pabustan', 'Male', '05', '07', '1999', '09237271821', NULL, 0, 'Sakit sa Ulo', 'Sa antipolo', 0),
(81, 'Yanie', 'Cacal', 'Exiomo', 'Female', '18', '05', '1999', '09123122312', NULL, 0, 'Sakit sdakitsakit', 'sa Pasig', 0),
(89, 'joshua', '', 'macaya', 'Male', '08', '15', '1995', '09123123213', NULL, 0, '', 'sa tondo', 1),
(90, 'Roberto', '', 'Zulueta', 'Male', '09', '17', '1997', '12458977985', NULL, 0, '', 'sa Bulacan', 1),
(91, 'Patrick', '', 'Garcia', 'Male', '05', '03', '1996', '12312312323', NULL, 0, '', 'Pasay', 0),
(92, 'qeqweqwe', '', 'qweqwe', 'Male', '08', '08', '1997', '12312312323', NULL, 1, 'asd', 'adasd', 0),
(93, 'adqe', 'qeqwe', 'qeqwe', 'Male', '02', '28', '1996', '23123123213', NULL, 1, '', 'qeqwewqew', 1);

-- --------------------------------------------------------

--
-- Table structure for table `freebies_package_tbl`
--

CREATE TABLE `freebies_package_tbl` (
  `freebies_package_id` int(11) NOT NULL,
  `package_id` int(11) DEFAULT NULL,
  `equivalent_points` int(11) DEFAULT NULL,
  `freebies_package_availability` tinyint(4) DEFAULT NULL,
  `delete_stats` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `freebies_package_tbl`
--

INSERT INTO `freebies_package_tbl` (`freebies_package_id`, `package_id`, `equivalent_points`, `freebies_package_availability`, `delete_stats`) VALUES
(1, 10, 110, 1, 0),
(6, 15, 110, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `freebies_promo_tbl`
--

CREATE TABLE `freebies_promo_tbl` (
  `freebies_promo_id` int(11) NOT NULL,
  `promobundle_id` int(11) DEFAULT NULL,
  `equivalent_points` int(11) DEFAULT NULL,
  `freebies_promo_availability` tinyint(4) DEFAULT NULL,
  `delete_stats` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `freebies_promo_tbl`
--

INSERT INTO `freebies_promo_tbl` (`freebies_promo_id`, `promobundle_id`, `equivalent_points`, `freebies_promo_availability`, `delete_stats`) VALUES
(2, 2, 110, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `freebies_tbl`
--

CREATE TABLE `freebies_tbl` (
  `freebies_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `equivalent_points` varchar(45) DEFAULT NULL,
  `freebies_availability` tinyint(4) DEFAULT NULL,
  `delete_stats` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `freebies_tbl`
--

INSERT INTO `freebies_tbl` (`freebies_id`, `service_id`, `equivalent_points`, `freebies_availability`, `delete_stats`) VALUES
(14, 43, '35', 0, 0),
(15, 44, '25', 0, 0),
(16, 45, '50', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `loyalty_tbl`
--

CREATE TABLE `loyalty_tbl` (
  `member_id` int(11) NOT NULL,
  `cust_id` int(11) DEFAULT NULL,
  `member_username` varchar(45) DEFAULT NULL,
  `member_password` varchar(45) DEFAULT NULL,
  `member_points` int(11) DEFAULT NULL,
  `membership_validity` varchar(45) DEFAULT NULL,
  `paid_status` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `loyalty_tbl`
--

INSERT INTO `loyalty_tbl` (`member_id`, `cust_id`, `member_username`, `member_password`, `member_points`, `membership_validity`, `paid_status`) VALUES
(1, 58, 'crissy', '1234', NULL, NULL, NULL),
(5, 89, 'rae', 'rae', 0, 'September 17, 2020', 1),
(6, 90, 'roberto', 'roberto', 0, 'September 22, 2020', 0),
(7, 93, 'hello', 'hello', 0, 'September 30, 2020', 0);

-- --------------------------------------------------------

--
-- Table structure for table `medical_history_tbl`
--

CREATE TABLE `medical_history_tbl` (
  `medhist_id` int(11) NOT NULL,
  `cust_id` int(11) DEFAULT NULL,
  `med_history` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `package_tbl`
--

CREATE TABLE `package_tbl` (
  `package_id` int(11) NOT NULL,
  `package_name` varchar(45) DEFAULT NULL,
  `package_price` int(11) DEFAULT NULL,
  `package_availability` tinyint(4) DEFAULT NULL,
  `delete_stats` tinyint(4) DEFAULT NULL,
  `package_duration` varchar(45) DEFAULT NULL,
  `package_points` int(11) DEFAULT NULL,
  `package_maxPerson` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `package_tbl`
--

INSERT INTO `package_tbl` (`package_id`, `package_name`, `package_price`, `package_availability`, `delete_stats`, `package_duration`, `package_points`, `package_maxPerson`) VALUES
(10, 'package#1', 2200, 0, 0, '210', 80, 1),
(15, 'package#1', 2200, 0, 0, '210', 80, 2);

-- --------------------------------------------------------

--
-- Table structure for table `payment_tbl`
--

CREATE TABLE `payment_tbl` (
  `payment_id` int(11) NOT NULL,
  `services_availed_id` int(11) DEFAULT NULL,
  `payment_type` varchar(45) DEFAULT NULL,
  `payment_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `promo_bundle_tbl`
--

CREATE TABLE `promo_bundle_tbl` (
  `promobundle_id` int(11) NOT NULL,
  `promobundle_name` varchar(45) DEFAULT NULL,
  `promobundle_price` int(11) DEFAULT NULL,
  `promobundle_valid_from` varchar(45) DEFAULT NULL,
  `promobundle_valid_until` varchar(45) DEFAULT NULL,
  `promobundle_availability` tinyint(4) DEFAULT NULL,
  `promobundle_maxPerson` int(11) DEFAULT NULL,
  `promobundle_duration` varchar(45) DEFAULT NULL,
  `delete_stats` tinyint(4) DEFAULT NULL,
  `promobundle_points` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `promo_bundle_tbl`
--

INSERT INTO `promo_bundle_tbl` (`promobundle_id`, `promobundle_name`, `promobundle_price`, `promobundle_valid_from`, `promobundle_valid_until`, `promobundle_availability`, `promobundle_maxPerson`, `promobundle_duration`, `delete_stats`, `promobundle_points`) VALUES
(2, 'promo#1', 2200, 'October 01, 2018', 'October 31, 2018', 0, 1, '210', 0, 79);

-- --------------------------------------------------------

--
-- Table structure for table `room_tbl`
--

CREATE TABLE `room_tbl` (
  `room_id` int(11) NOT NULL,
  `room_name` varchar(45) DEFAULT NULL,
  `room_type_id` int(11) DEFAULT NULL,
  `room_rate` varchar(45) DEFAULT NULL,
  `room_availability` tinyint(4) DEFAULT NULL,
  `delete_stats` varchar(45) DEFAULT NULL,
  `bed_qty` int(11) DEFAULT NULL,
  `room_gender` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `room_tbl`
--

INSERT INTO `room_tbl` (`room_id`, `room_name`, `room_type_id`, `room_rate`, `room_availability`, `delete_stats`, `bed_qty`, `room_gender`) VALUES
(8, 'Common Room for Girls', 2, '0', 0, '0', 17, 2),
(9, 'Common Room for Boys', 2, '0', 0, '0', 20, 1),
(10, 'Private Room for 2', 6, '150', 0, '0', 2, 3),
(11, 'Hexa Room', 6, '500', 0, '0', 6, 3),
(13, 'wew', 6, '23', 1, '1', 2323, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `room_type_tbl`
--

CREATE TABLE `room_type_tbl` (
  `room_type_id` int(11) NOT NULL,
  `room_type_desc` varchar(45) DEFAULT NULL,
  `delete_stats` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `room_type_tbl`
--

INSERT INTO `room_type_tbl` (`room_type_id`, `room_type_desc`, `delete_stats`) VALUES
(1, 'aa', 1),
(2, 'Common Room', 0),
(3, 'Deluxe Room', 1),
(4, 'Private Room', 1),
(5, 'aaa', 1),
(6, 'Private Room', 0),
(7, 'www', 1),
(8, 'aaa', 1),
(9, 'www', 1),
(10, 'ass', 1);

-- --------------------------------------------------------

--
-- Table structure for table `services_availed_tbl`
--

CREATE TABLE `services_availed_tbl` (
  `service_availed_id` int(11) NOT NULL,
  `transaction_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `services_tbl`
--

CREATE TABLE `services_tbl` (
  `service_id` int(11) NOT NULL,
  `service_name` varchar(200) DEFAULT NULL,
  `service_type_id` int(11) DEFAULT NULL,
  `service_duration_id` int(11) DEFAULT NULL,
  `service_price` int(11) DEFAULT NULL,
  `service_availability` tinyint(4) DEFAULT NULL,
  `delete_stats` tinyint(4) DEFAULT NULL,
  `service_points` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `services_tbl`
--

INSERT INTO `services_tbl` (`service_id`, `service_name`, `service_type_id`, `service_duration_id`, `service_price`, `service_availability`, `delete_stats`, `service_points`) VALUES
(43, 'Full Body Massage', 1, 10, 750, 0, 0, 25),
(44, 'Half Body Massage ', 1, 10, 500, 0, 0, 15),
(45, 'Body Scrub W/ Salt Glow', 15, 11, 1000, 0, 0, 30);

-- --------------------------------------------------------

--
-- Table structure for table `service_duration_tbl`
--

CREATE TABLE `service_duration_tbl` (
  `service_duration_id` int(11) NOT NULL,
  `service_duration_desc` varchar(45) DEFAULT NULL,
  `service_duration_availability` tinyint(4) DEFAULT NULL,
  `delete_stats` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `service_duration_tbl`
--

INSERT INTO `service_duration_tbl` (`service_duration_id`, `service_duration_desc`, `service_duration_availability`, `delete_stats`) VALUES
(9, '120 ', 1, 0),
(10, '60', 0, 0),
(11, '90', 0, 0),
(20, '30', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `service_in_package_tbl`
--

CREATE TABLE `service_in_package_tbl` (
  `service_in_package_id` int(11) NOT NULL,
  `service_id` int(11) DEFAULT NULL,
  `package_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `service_in_package_tbl`
--

INSERT INTO `service_in_package_tbl` (`service_in_package_id`, `service_id`, `package_id`) VALUES
(24, 43, 10),
(25, 44, 10),
(26, 45, 10),
(39, 43, 15),
(40, 44, 15),
(41, 45, 15);

-- --------------------------------------------------------

--
-- Table structure for table `service_in_promo_tbl`
--

CREATE TABLE `service_in_promo_tbl` (
  `service_in_promo_id` int(11) NOT NULL,
  `promobundle_id` int(11) DEFAULT NULL,
  `service_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `service_in_promo_tbl`
--

INSERT INTO `service_in_promo_tbl` (`service_in_promo_id`, `promobundle_id`, `service_id`) VALUES
(4, 2, 43),
(5, 2, 45),
(6, 2, 44);

-- --------------------------------------------------------

--
-- Table structure for table `service_type_tbl`
--

CREATE TABLE `service_type_tbl` (
  `service_type_id` int(11) NOT NULL,
  `service_type_desc` varchar(45) DEFAULT NULL,
  `service_type_availability` tinyint(4) DEFAULT NULL,
  `delete_stats` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `service_type_tbl`
--

INSERT INTO `service_type_tbl` (`service_type_id`, `service_type_desc`, `service_type_availability`, `delete_stats`) VALUES
(1, 'Body Massage', 0, 0),
(2, 'Body Scrub', 1, 1),
(3, 'Add-ons Massage', 1, 0),
(15, 'Body Scrub', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `specialty_tbl`
--

CREATE TABLE `specialty_tbl` (
  `specialty_id` int(11) NOT NULL,
  `specialty_desc` varchar(45) DEFAULT NULL,
  `delete_stats` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `specialty_tbl`
--

INSERT INTO `specialty_tbl` (`specialty_id`, `specialty_desc`, `delete_stats`) VALUES
(1, 'Foot Massage', 0),
(2, 'Foot Massage', 1),
(3, 'Body Massage', 0),
(4, 'Hand Massage', 0),
(12, 'wwww', 1),
(13, 'aaaa', 1),
(14, 'Ventosa', 1),
(15, 'as', 1),
(16, 'ventosa', 0),
(17, 'Swedish Massage', 0);

-- --------------------------------------------------------

--
-- Table structure for table `therapist_attendance_tbl`
--

CREATE TABLE `therapist_attendance_tbl` (
  `attendance_id` int(11) NOT NULL,
  `therapist_id` int(11) DEFAULT NULL,
  `therapist_datetime_in` varchar(45) DEFAULT NULL,
  `therapist_reserved` tinyint(4) DEFAULT NULL,
  `doneService_count` varchar(45) DEFAULT NULL,
  `availability` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `therapist_attendance_tbl`
--

INSERT INTO `therapist_attendance_tbl` (`attendance_id`, `therapist_id`, `therapist_datetime_in`, `therapist_reserved`, `doneService_count`, `availability`) VALUES
(4, 59, 'September 22, 2018 03:42 PM', NULL, '0', 1),
(5, 60, 'September 22, 2018 03:41 PM', NULL, '0', 1),
(6, 61, 'September 22, 2018 03:40 PM', NULL, '0', 1),
(7, 62, NULL, NULL, NULL, 0),
(8, 63, 'September 29, 2018 06:12 PM', NULL, '0', 3),
(9, 64, NULL, NULL, NULL, 0),
(10, 65, NULL, NULL, NULL, 0),
(11, 66, NULL, NULL, NULL, 0),
(12, 67, 'September 22, 2018 05:32 PM', NULL, '0', 1),
(13, 68, 'September 29, 2018 03:16 PM', NULL, '0', 1);

-- --------------------------------------------------------

--
-- Table structure for table `therapist_specialty_tbl`
--

CREATE TABLE `therapist_specialty_tbl` (
  `therapist_specialty_id` int(11) NOT NULL,
  `therapist_id` int(11) DEFAULT NULL,
  `specialty_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `therapist_specialty_tbl`
--

INSERT INTO `therapist_specialty_tbl` (`therapist_specialty_id`, `therapist_id`, `specialty_id`) VALUES
(185, 59, 1),
(186, 59, 3),
(187, 59, 4),
(188, 60, 1),
(189, 60, 3),
(190, 61, 1),
(191, 61, 4),
(192, 62, 3),
(193, 62, 1),
(194, 63, 1),
(195, 63, 3),
(196, 63, 16),
(197, 64, 3),
(198, 65, 3),
(199, 65, 4),
(200, 66, 3),
(201, 66, 4),
(202, 67, 1),
(203, 67, 3),
(204, 68, 1),
(205, 68, 3);

-- --------------------------------------------------------

--
-- Table structure for table `therapist_tbl`
--

CREATE TABLE `therapist_tbl` (
  `therapist_id` int(11) NOT NULL,
  `therapist_fname` varchar(45) DEFAULT NULL,
  `therapist_mname` varchar(45) DEFAULT NULL,
  `therapist_lname` varchar(45) DEFAULT NULL,
  `therapist_contact_no` varchar(20) DEFAULT NULL,
  `therapist_birthMonth` varchar(45) DEFAULT NULL,
  `therapist_gender` varchar(45) DEFAULT NULL,
  `therapist_address` varchar(200) DEFAULT NULL,
  `therapist_specialty_id` int(11) DEFAULT NULL,
  `therapist_availability` tinyint(4) DEFAULT NULL,
  `delete_stats` tinyint(4) DEFAULT NULL,
  `therapist_birthDate` varchar(45) DEFAULT NULL,
  `therapist_birthYear` varchar(45) DEFAULT NULL,
  `therapist_shift` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `therapist_tbl`
--

INSERT INTO `therapist_tbl` (`therapist_id`, `therapist_fname`, `therapist_mname`, `therapist_lname`, `therapist_contact_no`, `therapist_birthMonth`, `therapist_gender`, `therapist_address`, `therapist_specialty_id`, `therapist_availability`, `delete_stats`, `therapist_birthDate`, `therapist_birthYear`, `therapist_shift`) VALUES
(59, 'Rachel', '', 'Flores', '09131232232', '02', 'Female', '220 Int.60 Rodriguez St. Balut, Tondo Manila', NULL, 0, 0, '09', '1999', 'First'),
(60, 'Crisaldo', '', 'Santos', '12321321323', '02', 'Male', 'Sa Paco', NULL, 0, 0, '07', '1995', 'Second'),
(61, 'Rafhael', '', 'Pabustan', '12312323823', '07', 'Male', 'sa Antipolo', NULL, 0, 0, '05', '1995', 'First'),
(62, 'Patrick', '', 'Garcia', '12313213232', '08', 'Male', 'sa Pasay', NULL, 0, 0, '06', '1997', 'Second'),
(63, 'Joshua Rae', '', 'Macaya', '23213223223', '07', 'Male', 'sa Tondo', NULL, 0, 0, '11', '1996', 'First'),
(64, 'Roberto', '', 'Zulueta', '22232232232', '07', 'Male', 'sa Bulacan', NULL, 0, 0, '03', '1995', 'Second'),
(65, 'Gramar', '', 'Lacsina', '23123212312', '07', 'Male', 'Sa Punta', NULL, 0, 0, '04', '1996', 'Second'),
(66, 'Loven', '', 'Bunque', '45467984578', '07', 'Male', 'sa Marikina', NULL, 0, 0, '12', '1995', 'Second'),
(67, 'Jenhel', '', 'Santos', '45678524567', '02', 'Male', 'sa Quezon City', NULL, 0, 0, '08', '1995', 'Second'),
(68, 'Crisaldo', '', 'Santos', '54654787877', '07', 'Male', 'sa Paco', NULL, 0, 0, '18', '1995', 'First');

-- --------------------------------------------------------

--
-- Table structure for table `utilities_tbl`
--

CREATE TABLE `utilities_tbl` (
  `utilities_id` int(11) NOT NULL,
  `company_name` varchar(200) DEFAULT NULL,
  `company_logo` varchar(200) DEFAULT NULL,
  `opening_time` varchar(45) DEFAULT NULL,
  `closing_time` varchar(45) DEFAULT NULL,
  `max_guest` int(11) DEFAULT NULL,
  `membership_validity` varchar(45) DEFAULT NULL,
  `membership_fee` int(11) DEFAULT NULL,
  `entrance_fee` int(11) DEFAULT NULL,
  `reservation_forfeitTime` varchar(45) DEFAULT NULL,
  `firstShift_timeStart` varchar(45) DEFAULT NULL,
  `firstShift_timeEnd` varchar(45) DEFAULT NULL,
  `secondShift_timeStart` varchar(45) DEFAULT NULL,
  `secondShift_timeEnd` varchar(45) DEFAULT NULL,
  `reservation_timeAllowance` varchar(45) DEFAULT NULL,
  `therapist_commission` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='	';

--
-- Dumping data for table `utilities_tbl`
--

INSERT INTO `utilities_tbl` (`utilities_id`, `company_name`, `company_logo`, `opening_time`, `closing_time`, `max_guest`, `membership_validity`, `membership_fee`, `entrance_fee`, `reservation_forfeitTime`, `firstShift_timeStart`, `firstShift_timeEnd`, `secondShift_timeStart`, `secondShift_timeEnd`, `reservation_timeAllowance`, `therapist_commission`) VALUES
(1, 'Mbay Health Spa', 'company_logo-1538039640172.jpg', '01:00', '1:00 AM', 6, '24', 600, 750, '30', '1:00 PM', '6:00 PM', '6:00 PM', '1:00 AM', '30', '30');

-- --------------------------------------------------------

--
-- Table structure for table `walkin_queue_tbl`
--

CREATE TABLE `walkin_queue_tbl` (
  `walkin_id` int(11) NOT NULL,
  `cust_id` int(11) DEFAULT NULL,
  `walkin_start_time` varchar(45) DEFAULT NULL,
  `walkin_end_time` varchar(45) DEFAULT NULL,
  `walkin_status` tinyint(4) DEFAULT NULL,
  `walkin_total_amount` int(11) DEFAULT NULL,
  `walkin_lock_no` int(11) DEFAULT NULL,
  `walkin_date` varchar(45) DEFAULT NULL,
  `walkin_total_points` varchar(45) DEFAULT NULL,
  `walkin_payment_status` tinyint(4) DEFAULT NULL,
  `walkin_indicator` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `walkin_services_tbl`
--

CREATE TABLE `walkin_services_tbl` (
  `walkin_serv_id` int(11) NOT NULL,
  `walkin_id` int(11) DEFAULT NULL,
  `service_id` int(11) DEFAULT NULL,
  `promobundle_id` int(11) DEFAULT NULL,
  `therapist_id` int(11) DEFAULT NULL,
  `room_id` int(11) DEFAULT NULL,
  `bed_occupied` int(11) DEFAULT NULL,
  `service_total_quantity` int(11) DEFAULT NULL,
  `service_total_duration` varchar(45) DEFAULT NULL,
  `service_total_price` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addons_walkin_tbl`
--
ALTER TABLE `addons_walkin_tbl`
  ADD PRIMARY KEY (`addons_walkin_id`),
  ADD KEY `addons_walkin_amenity_id_idx` (`amenity_id`),
  ADD KEY `addons_walkin_id_idx` (`walkin_id`);

--
-- Indexes for table `admin_tbl`
--
ALTER TABLE `admin_tbl`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `amenities_tbl`
--
ALTER TABLE `amenities_tbl`
  ADD PRIMARY KEY (`amenity_id`);

--
-- Indexes for table `customer_tbl`
--
ALTER TABLE `customer_tbl`
  ADD PRIMARY KEY (`cust_id`);

--
-- Indexes for table `freebies_package_tbl`
--
ALTER TABLE `freebies_package_tbl`
  ADD PRIMARY KEY (`freebies_package_id`),
  ADD KEY `freebies_package_id_idx` (`package_id`);

--
-- Indexes for table `freebies_promo_tbl`
--
ALTER TABLE `freebies_promo_tbl`
  ADD PRIMARY KEY (`freebies_promo_id`),
  ADD KEY `promobundle_freebies_id_idx` (`promobundle_id`);

--
-- Indexes for table `freebies_tbl`
--
ALTER TABLE `freebies_tbl`
  ADD PRIMARY KEY (`freebies_id`),
  ADD KEY `service_id_idx` (`service_id`);

--
-- Indexes for table `loyalty_tbl`
--
ALTER TABLE `loyalty_tbl`
  ADD PRIMARY KEY (`member_id`),
  ADD KEY `cust_id_idx` (`cust_id`);

--
-- Indexes for table `medical_history_tbl`
--
ALTER TABLE `medical_history_tbl`
  ADD PRIMARY KEY (`medhist_id`),
  ADD KEY `cust_id_idx` (`cust_id`);

--
-- Indexes for table `package_tbl`
--
ALTER TABLE `package_tbl`
  ADD PRIMARY KEY (`package_id`);

--
-- Indexes for table `payment_tbl`
--
ALTER TABLE `payment_tbl`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `payment_services_availed_id_idx` (`services_availed_id`);

--
-- Indexes for table `promo_bundle_tbl`
--
ALTER TABLE `promo_bundle_tbl`
  ADD PRIMARY KEY (`promobundle_id`);

--
-- Indexes for table `room_tbl`
--
ALTER TABLE `room_tbl`
  ADD PRIMARY KEY (`room_id`),
  ADD KEY `room_type_id_idx` (`room_type_id`);

--
-- Indexes for table `room_type_tbl`
--
ALTER TABLE `room_type_tbl`
  ADD PRIMARY KEY (`room_type_id`);

--
-- Indexes for table `services_availed_tbl`
--
ALTER TABLE `services_availed_tbl`
  ADD PRIMARY KEY (`service_availed_id`),
  ADD KEY `service_availed_transaction_id_idx` (`transaction_id`);

--
-- Indexes for table `services_tbl`
--
ALTER TABLE `services_tbl`
  ADD PRIMARY KEY (`service_id`),
  ADD KEY `service_type_id_idx` (`service_type_id`),
  ADD KEY `service_duration_id_idx` (`service_duration_id`);

--
-- Indexes for table `service_duration_tbl`
--
ALTER TABLE `service_duration_tbl`
  ADD PRIMARY KEY (`service_duration_id`);

--
-- Indexes for table `service_in_package_tbl`
--
ALTER TABLE `service_in_package_tbl`
  ADD PRIMARY KEY (`service_in_package_id`),
  ADD KEY `service_id_idx` (`service_id`),
  ADD KEY `package_id_idx` (`package_id`);

--
-- Indexes for table `service_in_promo_tbl`
--
ALTER TABLE `service_in_promo_tbl`
  ADD PRIMARY KEY (`service_in_promo_id`),
  ADD KEY `service_id_idx` (`service_id`),
  ADD KEY `serv_in_promo_promobundle_id_idx` (`promobundle_id`);

--
-- Indexes for table `service_type_tbl`
--
ALTER TABLE `service_type_tbl`
  ADD PRIMARY KEY (`service_type_id`);

--
-- Indexes for table `specialty_tbl`
--
ALTER TABLE `specialty_tbl`
  ADD PRIMARY KEY (`specialty_id`);

--
-- Indexes for table `therapist_attendance_tbl`
--
ALTER TABLE `therapist_attendance_tbl`
  ADD PRIMARY KEY (`attendance_id`),
  ADD KEY `thera_id_idx` (`therapist_id`);

--
-- Indexes for table `therapist_specialty_tbl`
--
ALTER TABLE `therapist_specialty_tbl`
  ADD PRIMARY KEY (`therapist_specialty_id`),
  ADD KEY `therapist_id_idx` (`therapist_id`),
  ADD KEY `specialty_id_idx` (`specialty_id`);

--
-- Indexes for table `therapist_tbl`
--
ALTER TABLE `therapist_tbl`
  ADD PRIMARY KEY (`therapist_id`);

--
-- Indexes for table `utilities_tbl`
--
ALTER TABLE `utilities_tbl`
  ADD PRIMARY KEY (`utilities_id`);

--
-- Indexes for table `walkin_queue_tbl`
--
ALTER TABLE `walkin_queue_tbl`
  ADD PRIMARY KEY (`walkin_id`),
  ADD KEY `walkin_queue_cust_id_idx` (`cust_id`);

--
-- Indexes for table `walkin_services_tbl`
--
ALTER TABLE `walkin_services_tbl`
  ADD PRIMARY KEY (`walkin_serv_id`),
  ADD KEY `walkin_reserv_walkin_id_idx` (`walkin_id`),
  ADD KEY `walkin_reserv_service_id_idx` (`service_id`),
  ADD KEY `walkin_reserv_promobundle_id_idx` (`promobundle_id`),
  ADD KEY `walkin_reserv_therapist_id_idx` (`therapist_id`),
  ADD KEY `walkin_reserv_room_id_idx` (`room_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_tbl`
--
ALTER TABLE `admin_tbl`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `amenities_tbl`
--
ALTER TABLE `amenities_tbl`
  MODIFY `amenity_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer_tbl`
--
ALTER TABLE `customer_tbl`
  MODIFY `cust_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

--
-- AUTO_INCREMENT for table `freebies_package_tbl`
--
ALTER TABLE `freebies_package_tbl`
  MODIFY `freebies_package_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `freebies_promo_tbl`
--
ALTER TABLE `freebies_promo_tbl`
  MODIFY `freebies_promo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `freebies_tbl`
--
ALTER TABLE `freebies_tbl`
  MODIFY `freebies_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `loyalty_tbl`
--
ALTER TABLE `loyalty_tbl`
  MODIFY `member_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `medical_history_tbl`
--
ALTER TABLE `medical_history_tbl`
  MODIFY `medhist_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `package_tbl`
--
ALTER TABLE `package_tbl`
  MODIFY `package_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `promo_bundle_tbl`
--
ALTER TABLE `promo_bundle_tbl`
  MODIFY `promobundle_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `room_tbl`
--
ALTER TABLE `room_tbl`
  MODIFY `room_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `room_type_tbl`
--
ALTER TABLE `room_type_tbl`
  MODIFY `room_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `services_availed_tbl`
--
ALTER TABLE `services_availed_tbl`
  MODIFY `service_availed_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `services_tbl`
--
ALTER TABLE `services_tbl`
  MODIFY `service_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `service_duration_tbl`
--
ALTER TABLE `service_duration_tbl`
  MODIFY `service_duration_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `service_in_package_tbl`
--
ALTER TABLE `service_in_package_tbl`
  MODIFY `service_in_package_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `service_in_promo_tbl`
--
ALTER TABLE `service_in_promo_tbl`
  MODIFY `service_in_promo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `service_type_tbl`
--
ALTER TABLE `service_type_tbl`
  MODIFY `service_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `specialty_tbl`
--
ALTER TABLE `specialty_tbl`
  MODIFY `specialty_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `therapist_attendance_tbl`
--
ALTER TABLE `therapist_attendance_tbl`
  MODIFY `attendance_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `therapist_specialty_tbl`
--
ALTER TABLE `therapist_specialty_tbl`
  MODIFY `therapist_specialty_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=206;

--
-- AUTO_INCREMENT for table `therapist_tbl`
--
ALTER TABLE `therapist_tbl`
  MODIFY `therapist_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `walkin_queue_tbl`
--
ALTER TABLE `walkin_queue_tbl`
  MODIFY `walkin_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `walkin_services_tbl`
--
ALTER TABLE `walkin_services_tbl`
  MODIFY `walkin_serv_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `addons_walkin_tbl`
--
ALTER TABLE `addons_walkin_tbl`
  ADD CONSTRAINT `addons_walkin_amenity_id` FOREIGN KEY (`amenity_id`) REFERENCES `amenities_tbl` (`amenity_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `addons_walkin_id` FOREIGN KEY (`walkin_id`) REFERENCES `walkin_queue_tbl` (`walkin_id`) ON UPDATE CASCADE;

--
-- Constraints for table `freebies_package_tbl`
--
ALTER TABLE `freebies_package_tbl`
  ADD CONSTRAINT `freebies_package_id` FOREIGN KEY (`package_id`) REFERENCES `package_tbl` (`package_id`) ON UPDATE CASCADE;

--
-- Constraints for table `freebies_promo_tbl`
--
ALTER TABLE `freebies_promo_tbl`
  ADD CONSTRAINT `promobundle_freebies_id` FOREIGN KEY (`promobundle_id`) REFERENCES `promo_bundle_tbl` (`promobundle_id`) ON UPDATE CASCADE;

--
-- Constraints for table `freebies_tbl`
--
ALTER TABLE `freebies_tbl`
  ADD CONSTRAINT `service_id` FOREIGN KEY (`service_id`) REFERENCES `services_tbl` (`service_id`) ON UPDATE CASCADE;

--
-- Constraints for table `loyalty_tbl`
--
ALTER TABLE `loyalty_tbl`
  ADD CONSTRAINT `cust_id` FOREIGN KEY (`cust_id`) REFERENCES `customer_tbl` (`cust_id`) ON UPDATE CASCADE;

--
-- Constraints for table `medical_history_tbl`
--
ALTER TABLE `medical_history_tbl`
  ADD CONSTRAINT `medhist_cust_id` FOREIGN KEY (`cust_id`) REFERENCES `customer_tbl` (`cust_id`) ON UPDATE CASCADE;

--
-- Constraints for table `payment_tbl`
--
ALTER TABLE `payment_tbl`
  ADD CONSTRAINT `payment_services_availed_id` FOREIGN KEY (`services_availed_id`) REFERENCES `services_availed_tbl` (`service_availed_id`) ON UPDATE CASCADE;

--
-- Constraints for table `room_tbl`
--
ALTER TABLE `room_tbl`
  ADD CONSTRAINT `room_type_id` FOREIGN KEY (`room_type_id`) REFERENCES `room_type_tbl` (`room_type_id`) ON UPDATE CASCADE;

--
-- Constraints for table `services_availed_tbl`
--
ALTER TABLE `services_availed_tbl`
  ADD CONSTRAINT `service_availed_walkin_id` FOREIGN KEY (`transaction_id`) REFERENCES `walkin_queue_tbl` (`walkin_id`) ON UPDATE CASCADE;

--
-- Constraints for table `services_tbl`
--
ALTER TABLE `services_tbl`
  ADD CONSTRAINT `service_duration_id` FOREIGN KEY (`service_duration_id`) REFERENCES `service_duration_tbl` (`service_duration_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `service_type_id` FOREIGN KEY (`service_type_id`) REFERENCES `service_type_tbl` (`service_type_id`) ON UPDATE CASCADE;

--
-- Constraints for table `service_in_package_tbl`
--
ALTER TABLE `service_in_package_tbl`
  ADD CONSTRAINT `package_id` FOREIGN KEY (`package_id`) REFERENCES `package_tbl` (`package_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `service_in_package_id` FOREIGN KEY (`service_id`) REFERENCES `services_tbl` (`service_id`) ON UPDATE CASCADE;

--
-- Constraints for table `service_in_promo_tbl`
--
ALTER TABLE `service_in_promo_tbl`
  ADD CONSTRAINT `serv_in_promo_promobundle_id` FOREIGN KEY (`promobundle_id`) REFERENCES `promo_bundle_tbl` (`promobundle_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `serv_in_promo_service_id` FOREIGN KEY (`service_id`) REFERENCES `services_tbl` (`service_id`) ON UPDATE CASCADE;

--
-- Constraints for table `therapist_attendance_tbl`
--
ALTER TABLE `therapist_attendance_tbl`
  ADD CONSTRAINT `thera_id` FOREIGN KEY (`therapist_id`) REFERENCES `therapist_tbl` (`therapist_id`) ON UPDATE CASCADE;

--
-- Constraints for table `therapist_specialty_tbl`
--
ALTER TABLE `therapist_specialty_tbl`
  ADD CONSTRAINT `specialty_id` FOREIGN KEY (`specialty_id`) REFERENCES `specialty_tbl` (`specialty_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `therapist_id` FOREIGN KEY (`therapist_id`) REFERENCES `therapist_tbl` (`therapist_id`) ON UPDATE CASCADE;

--
-- Constraints for table `walkin_queue_tbl`
--
ALTER TABLE `walkin_queue_tbl`
  ADD CONSTRAINT `walkin_queue_cust_id` FOREIGN KEY (`cust_id`) REFERENCES `customer_tbl` (`cust_id`) ON UPDATE CASCADE;

--
-- Constraints for table `walkin_services_tbl`
--
ALTER TABLE `walkin_services_tbl`
  ADD CONSTRAINT `walkin_reserv_promobundle_id` FOREIGN KEY (`promobundle_id`) REFERENCES `promo_bundle_tbl` (`promobundle_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `walkin_reserv_room_id` FOREIGN KEY (`room_id`) REFERENCES `room_tbl` (`room_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `walkin_reserv_service_id` FOREIGN KEY (`service_id`) REFERENCES `services_tbl` (`service_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `walkin_reserv_therapist_id` FOREIGN KEY (`therapist_id`) REFERENCES `therapist_tbl` (`therapist_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `walkin_reserv_walkin_id` FOREIGN KEY (`walkin_id`) REFERENCES `walkin_queue_tbl` (`walkin_id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
