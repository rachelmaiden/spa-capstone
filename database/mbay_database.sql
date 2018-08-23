-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 23, 2018 at 05:01 PM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 7.1.10

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
-- Table structure for table `addons_reservation_tbl`
--

CREATE TABLE `addons_reservation_tbl` (
  `addons_id` int(11) NOT NULL,
  `amenity_id` int(11) DEFAULT NULL,
  `reservation_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
(2, 'front_desk', 'admin', 'admin');

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
(58, 'Crisaldo', 'Ibay', 'Santos', 'Male', '22', '1999', '01', '09132123123', NULL, 0, 'qewqewqe', '1811 Int. 36 Bo Sta Maria Pedro Gil Paco Manila', 1),
(79, 'Rachel', 'Cabuso', 'Flores', 'Female', '09', '1999', '02', '09123123123', NULL, 0, 'oiqeqwioe', 'oipqiweiopqw', 0),
(80, 'Rafhael', '', 'Pabustan', 'Male', '05', '1999', '07', '09237271821', NULL, 0, 'Sakit sa Ulo', 'Sa antipolo', 0);

-- --------------------------------------------------------

--
-- Table structure for table `loyalty_tbl`
--

CREATE TABLE `loyalty_tbl` (
  `member_id` int(11) NOT NULL,
  `cust_id` int(11) DEFAULT NULL,
  `member_username` varchar(45) DEFAULT NULL,
  `member_password` varchar(45) DEFAULT NULL,
  `member_points` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `loyalty_tbl`
--

INSERT INTO `loyalty_tbl` (`member_id`, `cust_id`, `member_username`, `member_password`, `member_points`) VALUES
(1, 58, 'crissy', '1234', NULL);

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
  `promobundle_validity` varchar(45) DEFAULT NULL,
  `promobundle_availability` tinyint(4) DEFAULT NULL,
  `promobundle_duration` varchar(45) DEFAULT NULL,
  `promobundle_amenity_usage` varchar(45) DEFAULT NULL,
  `delete_stats` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `promo_bundle_tbl`
--

INSERT INTO `promo_bundle_tbl` (`promobundle_id`, `promobundle_name`, `promobundle_price`, `promobundle_validity`, `promobundle_availability`, `promobundle_duration`, `promobundle_amenity_usage`, `delete_stats`) VALUES
(35, 'Rainy Days Promo', 2000, '07/25/2018', 0, '60 minutes', '60 minutes', 0),
(36, 'Back to School Promo', 1500, '07/18/2018,', 0, '60 minutes', '60 minutes', 1),
(37, 'sample', 3131, '07/18/2018,', 0, '60 minutes', '60 minutes', 1),
(38, 'Sample', 1300, '08/29/2018,08/31/2018', 0, '60 minutes', '60 minutes', 0),
(39, 'qweqwe', 123123, '08/30/2018,08/27/2018', 0, '90 minutes', '90 minutes', 1),
(40, 'qweqw', 2323, '08/27/2018,08/20/2018', 0, '60 minutes', '60 minutes', 1),
(41, 'qweq', 123, '08/22/2018,08/21/2018', 0, '60 minutes', '60 minutes', 0),
(42, 'qwe', 23, '08/28/2018,08/20/2018', 0, '60 minutes', '60 minutes', 1),
(43, 'qeqwe', 2222, '08/28/2018,08/20/2018', 0, '60 minutes', '60 minutes', 0),
(44, 'we', 1213123, '10/05/2018,09/06/2018', 0, '60 minutes', '60 minutes', 0),
(45, 'www', 222, '08/27/2018,08/27/2018', 0, '60 minutes', '60 minutes', 1),
(46, 'shhgdhhgd', 600, '08/15/2018,08/24/2018', 0, '60 minutes', '60 minutes', 0);

-- --------------------------------------------------------

--
-- Table structure for table `reservation_appointments_tbl`
--

CREATE TABLE `reservation_appointments_tbl` (
  `reservation_id` int(11) NOT NULL,
  `cust_id` int(11) DEFAULT NULL,
  `reservation_start_time` datetime DEFAULT NULL,
  `reservation_end_time` datetime DEFAULT NULL,
  `reservation_status` tinyint(4) DEFAULT NULL,
  `reservation_total_amount` int(11) DEFAULT NULL,
  `reservation_locker_no` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `reservation_services_tbl`
--

CREATE TABLE `reservation_services_tbl` (
  `reserv_serv_id` int(11) NOT NULL,
  `reservation_id` int(11) DEFAULT NULL,
  `service_id` int(11) DEFAULT NULL,
  `promobundle_id` int(11) DEFAULT NULL,
  `therapist_id` int(11) DEFAULT NULL,
  `room_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `bed_qty` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `room_tbl`
--

INSERT INTO `room_tbl` (`room_id`, `room_name`, `room_type_id`, `room_rate`, `room_availability`, `delete_stats`, `bed_qty`) VALUES
(8, 'Common Room for Girls', 2, '0', 0, '0', 17),
(9, 'Common Room for Boys', 2, '0', 0, '0', 20),
(10, 'Private Room for 2', 6, '150', 0, '0', 2),
(11, 'Hexa Room', 6, '500', 0, '0', 6),
(12, 'hexaaa', 6, '122', 1, '1', 1);

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
(9, 'www', 1);

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
(20, 'Body Scrub With Gluta', 2, 11, 800, 0, 0, 3),
(21, 'Body Scrub (Salt Glow)', 2, 10, 1000, 0, 0, 2),
(22, 'Special Massage', 2, 9, 1300, 0, 0, 1),
(23, 'Therapeutic Massage( Meridian Parts of the Body)', 1, 11, 1200, 0, 0, 3),
(32, 'Foot Massage', 3, 10, 800, 0, 0, 2),
(33, 'Sample', 1, 10, 1300, 0, 0, 2),
(34, 'Hand Massage', 3, 10, 900, 0, 0, 2),
(35, 'Saample1', 1, 10, 800, 1, 1, 0),
(37, 'Sample 1', 1, 10, 200, 1, 1, 0),
(38, 'aaa', 1, 10, 232, 1, 1, 2),
(39, 'aa', 2, 10, 213, 1, 1, 23);

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
(8, '50', NULL, 1),
(9, '120 ', 0, 0),
(10, '60', 0, 0),
(11, '90', 0, 0),
(16, '2', NULL, 1),
(17, '2', NULL, 1),
(18, '150', 1, 0);

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
(75, 35, 20),
(76, 35, 21),
(77, 35, 23),
(78, 35, 22),
(93, 36, 20),
(94, 36, 22),
(96, 37, 20),
(97, 37, 21),
(98, 37, 22),
(99, 37, 23),
(100, 38, 20),
(101, 38, 21),
(102, 38, 22),
(103, 39, 20),
(104, 39, 22),
(105, 39, 21),
(112, 40, 20),
(115, 42, 20),
(116, 42, 21),
(121, 45, 21),
(122, 45, 20),
(123, 46, 20),
(124, 46, 21);

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
(2, 'Body Scrub', 0, 0),
(3, 'Add-ons Massage', 0, 0),
(4, '', 0, 1),
(5, 'aaa', 1, 1),
(6, 'qweqwe', 1, 1),
(7, 'qweqwe', 1, 1),
(8, 'qwewqe', 1, 1),
(9, 'aaa', 1, 1),
(10, '', 1, 1),
(11, 'Body Body', 1, 1),
(12, 'Body Therapy', 0, 0);

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
(14, 'Ventosa', 0);

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
(166, 49, 1),
(167, 49, 3),
(168, 50, 1),
(169, 51, 1),
(170, 51, 3),
(171, 51, 4),
(172, 52, 1),
(173, 52, 3),
(174, 52, 4),
(175, 53, 1),
(176, 53, 3),
(177, 54, 1),
(178, 54, 3);

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
  `therapist_birthYear` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `therapist_tbl`
--

INSERT INTO `therapist_tbl` (`therapist_id`, `therapist_fname`, `therapist_mname`, `therapist_lname`, `therapist_contact_no`, `therapist_birthMonth`, `therapist_gender`, `therapist_address`, `therapist_specialty_id`, `therapist_availability`, `delete_stats`, `therapist_birthDate`, `therapist_birthYear`) VALUES
(49, 'eqweqw', 'eqweqwe', 'qweqw', '21321321323', '01', 'Male', 'qwewqe', NULL, 1, 1, '02', '1995'),
(50, 'qweqwe', 'qweqweqwe', 'qweqwe', '23123123232', '12', 'Male', 'qweqwe', NULL, 1, 1, '27', '1999'),
(51, 'Rachel', 'Cabuso', 'Flores', '09123213232', '02', 'Female', 'sa Tondo', NULL, 1, 0, '09', '1999'),
(52, 'qweqwe', 'qweqwe', 'qweqwe', '12321312232', '01', 'Male', 'qweqwe', NULL, 1, 0, '09', '1995'),
(53, 'qeqweqweqw', 'qweqweqwe', 'weqweqw', '12312312232', '01', 'Male', '12qweqwe', NULL, 1, 0, '01', '2000'),
(54, 'eqwieuiqwuieo', 'qweqwei', 'jeqwqewiuo', '12312312322', '01', 'Male', 'qweo', NULL, 1, 0, '01', '2000');

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
  `walkin_total_points` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `walkin_queue_tbl`
--

INSERT INTO `walkin_queue_tbl` (`walkin_id`, `cust_id`, `walkin_start_time`, `walkin_end_time`, `walkin_status`, `walkin_total_amount`, `walkin_lock_no`, `walkin_date`, `walkin_total_points`) VALUES
(33, 58, '01:30 PM', '04:00 PM', NULL, 1, NULL, '08-24-2018', '5'),
(34, 58, '01:30 PM', '04:00 PM', NULL, 1, NULL, '08-24-2018', '5'),
(35, 79, '02:10 PM', '03:10 PM', NULL, 1, NULL, '08-23-2018', '2'),
(36, 80, '01:00 PM', '04:00 PM', NULL, 2, NULL, '08-23-2018', '6'),
(37, 79, '02:00 PM', '04:00 PM', NULL, 1, NULL, '08-23-2018', '4'),
(38, 79, '02:00 PM', '04:00 PM', NULL, 1, NULL, '08-23-2018', '4'),
(39, 79, '02:00 PM', '04:00 PM', NULL, 1, NULL, '08-23-2018', '4'),
(40, 79, '02:00 PM', '04:00 PM', NULL, 1, NULL, '08-23-2018', '4');

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
  `bed_occupied` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `walkin_services_tbl`
--

INSERT INTO `walkin_services_tbl` (`walkin_serv_id`, `walkin_id`, `service_id`, `promobundle_id`, `therapist_id`, `room_id`, `bed_occupied`) VALUES
(35, 33, 21, NULL, NULL, 9, NULL),
(36, 33, 20, NULL, NULL, 9, NULL),
(37, 34, 21, NULL, NULL, 9, NULL),
(38, 34, 20, NULL, NULL, 9, NULL),
(39, 35, 21, NULL, NULL, 8, NULL),
(40, 36, 32, NULL, NULL, 9, NULL),
(41, 36, 33, NULL, NULL, 9, NULL),
(42, 37, 32, NULL, NULL, 8, NULL),
(43, 38, 32, NULL, NULL, 8, NULL),
(44, 39, 32, NULL, NULL, 8, NULL),
(45, 40, 32, NULL, NULL, 8, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addons_reservation_tbl`
--
ALTER TABLE `addons_reservation_tbl`
  ADD PRIMARY KEY (`addons_id`),
  ADD KEY `addons_reserv_amenity_id_idx` (`amenity_id`),
  ADD KEY `addons_reserv_id_idx` (`reservation_id`);

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
-- Indexes for table `reservation_appointments_tbl`
--
ALTER TABLE `reservation_appointments_tbl`
  ADD PRIMARY KEY (`reservation_id`),
  ADD KEY `reserv_appointments_cust_id_idx` (`cust_id`);

--
-- Indexes for table `reservation_services_tbl`
--
ALTER TABLE `reservation_services_tbl`
  ADD PRIMARY KEY (`reserv_serv_id`),
  ADD KEY `reserv_services_reservation_id_idx` (`reservation_id`),
  ADD KEY `reserv_services_services_id_idx` (`service_id`),
  ADD KEY `reserv_services_promobundle_id_idx` (`promobundle_id`),
  ADD KEY `reserv_services_therapist_id_idx` (`therapist_id`),
  ADD KEY `reserv_services_room_id_idx` (`room_id`);

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
-- AUTO_INCREMENT for table `addons_reservation_tbl`
--
ALTER TABLE `addons_reservation_tbl`
  MODIFY `addons_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `admin_tbl`
--
ALTER TABLE `admin_tbl`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `amenities_tbl`
--
ALTER TABLE `amenities_tbl`
  MODIFY `amenity_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer_tbl`
--
ALTER TABLE `customer_tbl`
  MODIFY `cust_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `loyalty_tbl`
--
ALTER TABLE `loyalty_tbl`
  MODIFY `member_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `medical_history_tbl`
--
ALTER TABLE `medical_history_tbl`
  MODIFY `medhist_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `promo_bundle_tbl`
--
ALTER TABLE `promo_bundle_tbl`
  MODIFY `promobundle_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `reservation_appointments_tbl`
--
ALTER TABLE `reservation_appointments_tbl`
  MODIFY `reservation_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reservation_services_tbl`
--
ALTER TABLE `reservation_services_tbl`
  MODIFY `reserv_serv_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `room_tbl`
--
ALTER TABLE `room_tbl`
  MODIFY `room_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `room_type_tbl`
--
ALTER TABLE `room_type_tbl`
  MODIFY `room_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `services_availed_tbl`
--
ALTER TABLE `services_availed_tbl`
  MODIFY `service_availed_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `services_tbl`
--
ALTER TABLE `services_tbl`
  MODIFY `service_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `service_duration_tbl`
--
ALTER TABLE `service_duration_tbl`
  MODIFY `service_duration_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `service_in_promo_tbl`
--
ALTER TABLE `service_in_promo_tbl`
  MODIFY `service_in_promo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=125;

--
-- AUTO_INCREMENT for table `service_type_tbl`
--
ALTER TABLE `service_type_tbl`
  MODIFY `service_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `specialty_tbl`
--
ALTER TABLE `specialty_tbl`
  MODIFY `specialty_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `therapist_specialty_tbl`
--
ALTER TABLE `therapist_specialty_tbl`
  MODIFY `therapist_specialty_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=179;

--
-- AUTO_INCREMENT for table `therapist_tbl`
--
ALTER TABLE `therapist_tbl`
  MODIFY `therapist_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `walkin_queue_tbl`
--
ALTER TABLE `walkin_queue_tbl`
  MODIFY `walkin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `walkin_services_tbl`
--
ALTER TABLE `walkin_services_tbl`
  MODIFY `walkin_serv_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `addons_reservation_tbl`
--
ALTER TABLE `addons_reservation_tbl`
  ADD CONSTRAINT `addons_reserv_amenity_id` FOREIGN KEY (`amenity_id`) REFERENCES `amenities_tbl` (`amenity_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `addons_reserv_id` FOREIGN KEY (`reservation_id`) REFERENCES `reservation_appointments_tbl` (`reservation_id`) ON UPDATE CASCADE;

--
-- Constraints for table `addons_walkin_tbl`
--
ALTER TABLE `addons_walkin_tbl`
  ADD CONSTRAINT `addons_walkin_amenity_id` FOREIGN KEY (`amenity_id`) REFERENCES `amenities_tbl` (`amenity_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `addons_walkin_id` FOREIGN KEY (`walkin_id`) REFERENCES `walkin_queue_tbl` (`walkin_id`) ON UPDATE CASCADE;

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
-- Constraints for table `reservation_appointments_tbl`
--
ALTER TABLE `reservation_appointments_tbl`
  ADD CONSTRAINT `reserv_appointments_cust_id` FOREIGN KEY (`cust_id`) REFERENCES `customer_tbl` (`cust_id`) ON UPDATE CASCADE;

--
-- Constraints for table `reservation_services_tbl`
--
ALTER TABLE `reservation_services_tbl`
  ADD CONSTRAINT `reserv_services_promobundle_id` FOREIGN KEY (`promobundle_id`) REFERENCES `promo_bundle_tbl` (`promobundle_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reserv_services_reservation_id` FOREIGN KEY (`reservation_id`) REFERENCES `reservation_appointments_tbl` (`reservation_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reserv_services_room_id` FOREIGN KEY (`room_id`) REFERENCES `room_tbl` (`room_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reserv_services_services_id` FOREIGN KEY (`service_id`) REFERENCES `services_tbl` (`service_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reserv_services_therapist_id` FOREIGN KEY (`therapist_id`) REFERENCES `therapist_tbl` (`therapist_id`) ON UPDATE CASCADE;

--
-- Constraints for table `room_tbl`
--
ALTER TABLE `room_tbl`
  ADD CONSTRAINT `room_type_id` FOREIGN KEY (`room_type_id`) REFERENCES `room_type_tbl` (`room_type_id`) ON UPDATE CASCADE;

--
-- Constraints for table `services_availed_tbl`
--
ALTER TABLE `services_availed_tbl`
  ADD CONSTRAINT `service_availed_reservation_id` FOREIGN KEY (`transaction_id`) REFERENCES `reservation_appointments_tbl` (`reservation_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `service_availed_walkin_id` FOREIGN KEY (`transaction_id`) REFERENCES `walkin_queue_tbl` (`walkin_id`) ON UPDATE CASCADE;

--
-- Constraints for table `services_tbl`
--
ALTER TABLE `services_tbl`
  ADD CONSTRAINT `service_duration_id` FOREIGN KEY (`service_duration_id`) REFERENCES `service_duration_tbl` (`service_duration_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `service_type_id` FOREIGN KEY (`service_type_id`) REFERENCES `service_type_tbl` (`service_type_id`) ON UPDATE CASCADE;

--
-- Constraints for table `service_in_promo_tbl`
--
ALTER TABLE `service_in_promo_tbl`
  ADD CONSTRAINT `serv_in_promo_promobundle_id` FOREIGN KEY (`promobundle_id`) REFERENCES `promo_bundle_tbl` (`promobundle_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `serv_in_promo_service_id` FOREIGN KEY (`service_id`) REFERENCES `services_tbl` (`service_id`) ON UPDATE CASCADE;

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
