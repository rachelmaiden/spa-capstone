-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 19, 2018 at 04:05 PM
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
-- Table structure for table `amenities_reservation_tbl`
--

CREATE TABLE `amenities_reservation_tbl` (
  `amenity_reservation_id` int(11) NOT NULL,
  `cust_id` int(11) DEFAULT NULL,
  `number_ofGuest` int(11) DEFAULT NULL,
  `total_fee` float DEFAULT NULL,
  `paid_status` tinyint(4) DEFAULT NULL,
  `date` varchar(45) DEFAULT NULL,
  `date_only` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `amenities_reservation_tbl`
--

INSERT INTO `amenities_reservation_tbl` (`amenity_reservation_id`, `cust_id`, `number_ofGuest`, `total_fee`, `paid_status`, `date`, `date_only`) VALUES
(6, 96, 2, 1500, 1, 'October 11, 2018 04:22 AM', 'October 11, 2018'),
(7, 96, 1, 750, 1, 'October 11, 2018 04:23 AM', 'October 11, 2018'),
(8, 94, 3, 2250, 1, 'October 12, 2018 04:23 AM', 'October 12, 2018'),
(9, 99, 1, 750, 1, 'October 17, 2018 04:52 PM', 'October 17, 2018'),
(10, 99, 2, 1500, 2, 'October 21, 2018 01:38 PM', 'October 21, 2018');

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
(79, 'Rachel', 'Cabuso', 'Flores', 'Female', '09', '02', '1999', '09123123123', NULL, 0, 'oiqeqwioe', 'oipqiweiopqw', 1),
(80, 'Rafhael', '', 'Pabustan', 'Male', '05', '07', '1999', '09237271821', NULL, 0, 'Sakit sa Ulo', 'Sa antipolo', 1),
(81, 'Yanie', 'Cacal', 'Exiomo', 'Female', '18', '05', '1999', '09123122312', NULL, 0, 'Sakit sdakitsakit', 'sa Pasig', 1),
(89, 'joshua', '', 'macaya', 'Male', '08', '15', '1995', '09123123213', NULL, 0, '', 'sa tondo', 1),
(90, 'Roberto', '', 'Zulueta', 'Male', '09', '17', '1997', '12458977985', NULL, 0, '', 'sa Bulacan', 1),
(91, 'Patrick', '', 'Garcia', 'Male', '05', '03', '1996', '12312312323', NULL, 0, '', 'Pasay', 1),
(92, 'qeqweqwe', '', 'qweqwe', 'Male', '08', '08', '1997', '12312312323', NULL, 1, 'asd', 'adasd', 0),
(93, 'adqe', 'qeqwe', 'qeqwe', 'Male', '02', '28', '1996', '23123123213', NULL, 1, '', 'qeqwewqew', 1),
(94, 'Ariana', '', 'Grande', 'Female', '02', '06', '1996', '09475968564', NULL, 0, '', 'pasig', 1),
(95, 'Donn', '', 'Salvador', 'Male', '08', '07', '1996', '09545757575', NULL, 0, '', 'di ko alam', 1),
(96, 'Norme', '', 'Penaverde', 'Female', '07', '06', '1998', '01321654654', NULL, 0, '', 'sa Quezon Province', 0),
(97, 'kylie', '', 'jenner', 'Female', '04', '02', '1998', '09105385370', NULL, 0, '', 'manila', 1),
(98, 'harry', '', 'styles', 'Male', '02', '02', '1995', '09097229655', NULL, 0, '', 'punta, sta. ana', 0),
(99, 'ari', '', 'grande', 'Female', '02', '03', '1999', '09871234543', NULL, 0, '', 'paco', 0),
(100, 'eldrin', '', 'del rosario', 'Male', '04', '03', '1997', '09897689098', NULL, 0, '', 'valenzuela', 0),
(101, 'Emily', '', 'Fields', 'Female', '05', '06', '1999', '09142569874', NULL, 0, '', 'Punta, Sta. Ana', 0);

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

-- --------------------------------------------------------

--
-- Table structure for table `giftcertificate_tbl`
--

CREATE TABLE `giftcertificate_tbl` (
  `gc_id` int(11) NOT NULL,
  `gc_name` varchar(45) DEFAULT NULL,
  `gc_value` int(11) DEFAULT NULL,
  `gc_price` int(11) DEFAULT NULL,
  `gc_refCode` varchar(45) DEFAULT NULL,
  `release_stats` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `giftcertificate_tbl`
--

INSERT INTO `giftcertificate_tbl` (`gc_id`, `gc_name`, `gc_value`, `gc_price`, `gc_refCode`, `release_stats`) VALUES
(22, 'Gc#1', 750, 750, 'rpfgfe', 3),
(23, 'Gc#1', 750, 750, '8mmbk', 2),
(24, 'Gc#1', 750, 750, '0tn06v', 2),
(25, 'Gc#1', 750, 750, '0pubbm', 1),
(26, 'GC#2', 1000, 1000, 'x82a4j', 3),
(27, 'GC#2', 1000, 1000, 'by6b08', 4),
(28, 'GC#2', 1000, 1000, 'jwwvq', 1),
(29, 'GC#2', 1000, 1000, 'pbdh7n', 1),
(30, 'GC#2', 1000, 1000, '7kixmp', 1),
(31, 'gc#3', 1500, 1500, 'w8uq5b', 1),
(32, 'gc#3', 1500, 1500, 'w24bmq', 1),
(33, 'gc#3', 1500, 1500, 'o80f8', 0),
(34, 'gc#3', 1500, 1500, 'e6m8np', 0),
(35, 'gc#3', 1500, 1500, 'hmhdl', 0),
(36, 'gc#3', 1500, 1500, 'wh2u7y', 0),
(37, 'HELLO', 250, 250, 'ot3im4', 1),
(38, 'HELLO', 250, 250, 'mgc7if', 0),
(39, 'HELLO', 250, 250, 'o58ywf', 0),
(40, 'HELLO', 250, 250, 'necee', 0),
(41, 'HELLO', 250, 250, 'jlgyllf', 0),
(42, 'HELLO', 250, 250, 'ky8m6n', 0),
(43, 'HELLO', 250, 250, 'jhv8vg', 0),
(44, 'HELLO', 250, 250, 'qx73fp', 0),
(45, 'HELLO', 250, 250, '4vim7', 0),
(46, 'HELLO', 250, 250, 'wb6vm', 0),
(47, 'HELLO', 250, 250, 'e0t9s', 0),
(48, 'HELLO', 250, 250, 'l378s9', 0),
(49, 'HELLO', 250, 250, 'v7t457', 0),
(50, 'HELLO', 250, 250, '0brho', 0),
(51, 'HELLO', 250, 250, 'nvqba', 0),
(52, 'HELLO', 250, 250, 'cj2v3', 0),
(53, 'HELLO', 250, 250, '2sdvfs', 0),
(54, 'HELLO', 250, 250, 'bmi2rd', 0),
(55, 'HELLO', 250, 250, '97n38i', 0),
(56, 'HELLO', 250, 250, 'zam4sv', 0),
(57, 'HELLO', 250, 250, 'ls6ao', 0),
(58, 'HELLO', 250, 250, 'o4g3vt', 0),
(59, 'HELLO', 250, 250, 's7tdrb', 0),
(60, 'HELLO', 250, 250, 'db6oac', 0),
(61, 'HELLO', 250, 250, 'i8s5vl', 0),
(62, 'HELLO', 250, 250, 'gjr739', 0),
(63, 'HELLO', 250, 250, 'fjccj', 0),
(64, 'HELLO', 250, 250, 'v63o97', 0),
(65, 'HELLO', 250, 250, 'nrht7k', 0),
(66, 'HELLO', 250, 250, '1ey5en', 0),
(67, 'HELLO', 250, 250, '2dtyu4', 0),
(68, 'HELLO', 250, 250, 'vxxii', 0),
(69, 'HELLO', 250, 250, 'vnyw2dk', 0),
(70, 'HELLO', 250, 250, '8zlp4p', 0),
(71, 'HELLO', 250, 250, 'i6q8c', 0),
(72, 'HELLO', 250, 250, 'p9gtz8', 0),
(73, 'HELLO', 250, 250, '9hhocp', 0),
(74, 'HELLO', 250, 250, 'btipro', 0),
(75, 'HELLO', 250, 250, 'gyj4ml', 0),
(76, 'HELLO', 250, 250, '9nb5o9', 0),
(77, 'HELLO', 250, 250, '7d0kmb', 0),
(78, 'HELLO', 250, 250, 'a250pe', 0),
(79, 'HELLO', 250, 250, 'mnvc7p', 0),
(80, 'HELLO', 250, 250, '2od24t', 0),
(81, 'HELLO', 250, 250, 'y6krqo', 0),
(82, 'HELLO', 250, 250, 'nlzn2', 0),
(83, 'HELLO', 250, 250, '4oqcte', 0),
(84, 'HELLO', 250, 250, 'posa4a', 0),
(85, 'HELLO', 250, 250, 'pvxfl', 0),
(86, 'HELLO', 250, 250, 'rl5fls', 0);

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
(1, 58, 'crissy', '1234', 295, NULL, 1),
(5, 89, 'rae', 'rae', 0, 'September 17, 2020', 0),
(6, 90, 'roberto', 'roberto', 0, 'September 22, 2020', 0),
(7, 93, 'hello', 'hello', 0, 'September 30, 2020', 1),
(8, 91, 'patrick', 'pat', 25, 'October 06, 2020', 0),
(9, 95, 'Donn', 'donn', 0, 'undefined', 0),
(11, 79, 'rachel09', 'rachel09', 0, 'October 11, 2020', 1),
(14, 81, 'yaniie', 'yanie01', 0, 'October 11, 2020', 0),
(20, 80, 'rafh01', '0123456789', 0, 'undefined', 1),
(21, 94, 'arianagrande', 'arianagrande', 0, 'undefined', 1),
(22, 97, 'kylie', 'jenner', 0, 'October 17, 2018', 0);

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
  `package_price` float DEFAULT NULL,
  `package_availability` tinyint(4) DEFAULT NULL,
  `delete_stats` tinyint(4) DEFAULT NULL,
  `package_duration` varchar(45) DEFAULT NULL,
  `package_points` float DEFAULT NULL,
  `package_maxPerson` int(11) DEFAULT NULL,
  `package_equivalentPoints` float DEFAULT NULL,
  `package_roomIncluded` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `package_tbl`
--

INSERT INTO `package_tbl` (`package_id`, `package_name`, `package_price`, `package_availability`, `delete_stats`, `package_duration`, `package_points`, `package_maxPerson`, `package_equivalentPoints`, `package_roomIncluded`) VALUES
(18, 'Package#1', 1500, 0, 0, '180', 57, 2, 59, NULL),
(19, 'Package #2', 1500, 0, 0, '180', 55, 1, 57, NULL),
(20, 'package#3 with FREE ROOM', 1800, 0, 0, '180', 60, 2, 63, 10);

-- --------------------------------------------------------

--
-- Table structure for table `payment_loyalty_trans_tbl`
--

CREATE TABLE `payment_loyalty_trans_tbl` (
  `payment_loyalty_id` int(11) NOT NULL,
  `loyalty_id` int(11) DEFAULT NULL,
  `payment_date` varchar(45) DEFAULT NULL,
  `payment_amount` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `payment_tbl`
--

CREATE TABLE `payment_tbl` (
  `payment_id` int(11) NOT NULL,
  `services_availed_id` int(11) DEFAULT NULL,
  `payment_type` varchar(45) DEFAULT NULL,
  `payment_date` datetime DEFAULT NULL,
  `amount` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `promo_bundle_tbl`
--

CREATE TABLE `promo_bundle_tbl` (
  `promobundle_id` int(11) NOT NULL,
  `promobundle_name` varchar(45) DEFAULT NULL,
  `promobundle_price` float DEFAULT NULL,
  `promobundle_valid_from` varchar(45) DEFAULT NULL,
  `promobundle_valid_until` varchar(45) DEFAULT NULL,
  `promobundle_availability` tinyint(4) DEFAULT NULL,
  `promobundle_maxPerson` int(11) DEFAULT NULL,
  `promobundle_duration` varchar(45) DEFAULT NULL,
  `delete_stats` tinyint(4) DEFAULT NULL,
  `promobundle_points` float DEFAULT NULL,
  `promobundle_equivalentPoints` float DEFAULT NULL,
  `promobundle_roomIncluded` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `promo_bundle_tbl`
--

INSERT INTO `promo_bundle_tbl` (`promobundle_id`, `promobundle_name`, `promobundle_price`, `promobundle_valid_from`, `promobundle_valid_until`, `promobundle_availability`, `promobundle_maxPerson`, `promobundle_duration`, `delete_stats`, `promobundle_points`, `promobundle_equivalentPoints`, `promobundle_roomIncluded`) VALUES
(12, 'promo#1 without Room', 1500, '20181023', '20181031', 0, 2, '180', 0, 55, 57, NULL),
(13, 'promo#2 with room', 1800, '20181023', '20181031', 0, 2, '180', 0, 55, 57, 10);

-- --------------------------------------------------------

--
-- Table structure for table `room_tbl`
--

CREATE TABLE `room_tbl` (
  `room_id` int(11) NOT NULL,
  `room_name` varchar(45) DEFAULT NULL,
  `room_type_id` int(11) DEFAULT NULL,
  `room_rate` float DEFAULT NULL,
  `room_availability` tinyint(4) DEFAULT NULL,
  `delete_stats` varchar(45) DEFAULT NULL,
  `bed_qty` int(11) DEFAULT NULL,
  `room_gender` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `room_tbl`
--

INSERT INTO `room_tbl` (`room_id`, `room_name`, `room_type_id`, `room_rate`, `room_availability`, `delete_stats`, `bed_qty`, `room_gender`) VALUES
(8, 'Common Room for Girls', 2, 0, 0, '0', 17, 2),
(9, 'Common Room for Boys', 2, 0, 0, '0', 20, 1),
(10, 'Private Room for 2', 6, 150, 0, '0', 2, 3),
(11, 'Hexa Room', 6, 500, 0, '0', 6, 3),
(13, 'wew', 6, 23, 1, '1', 2323, NULL),
(14, 'sample', 2, 150.99, 1, '1', 20, NULL),
(15, 'wqe', 6, 123123, 1, '1', 232, 2);

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
  `service_price` float DEFAULT NULL,
  `service_availability` tinyint(4) DEFAULT NULL,
  `delete_stats` tinyint(4) DEFAULT NULL,
  `service_points` float DEFAULT NULL,
  `service_equivalentPoints` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `services_tbl`
--

INSERT INTO `services_tbl` (`service_id`, `service_name`, `service_type_id`, `service_duration_id`, `service_price`, `service_availability`, `delete_stats`, `service_points`, `service_equivalentPoints`) VALUES
(49, 'Body', 16, 22, 750, 0, 0, 24.5, 25.5),
(50, 'Foot massage ', 17, 21, 849.5, 0, 0, 30.5, 31.3);

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
(21, '60', 0, 0),
(22, '120', 0, 0),
(23, '90', 0, 0);

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
(46, 50, 18),
(47, 49, 18),
(48, 50, 19),
(49, 49, 19),
(50, 50, 20),
(51, 49, 20);

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
(17, 12, 50),
(18, 12, 49),
(19, 13, 50),
(20, 13, 49);

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
(16, 'Body Massage', 0, 0),
(17, 'Foot Massage', 0, 0),
(18, 'Hand Massage', 0, 0);

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
(1, '', 1),
(2, 'Foot Massage', 1),
(3, '', 1),
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
(15, 70, 'October 26, 2018 10:58 PM', NULL, '0', 1),
(16, 71, 'December 01, 2018 11:46 AM', NULL, '0', 1),
(17, 72, 'October 26, 2018 10:59 PM', NULL, '0', 1),
(18, 73, 'October 26, 2018 10:58 PM', NULL, '0', 1),
(19, 74, 'October 26, 2018 10:58 PM', NULL, '0', 1),
(20, 76, 'December 01, 2018 11:25 AM', NULL, '0', 1);

-- --------------------------------------------------------

--
-- Table structure for table `therapist_in_service_tbl`
--

CREATE TABLE `therapist_in_service_tbl` (
  `therapist_in_service_id` int(11) NOT NULL,
  `therapist_id` int(11) DEFAULT NULL,
  `walkin_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `therapist_in_service_tbl`
--

INSERT INTO `therapist_in_service_tbl` (`therapist_in_service_id`, `therapist_id`, `walkin_id`) VALUES
(9, 76, 9);

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
(226, 70, 17),
(227, 70, 4),
(228, 71, 4),
(229, 72, 17),
(230, 72, 4),
(231, 73, 4),
(232, 73, 16),
(233, 74, 4),
(234, 74, 17),
(235, 74, 16),
(236, 75, 4),
(237, 75, 17),
(238, 76, 16);

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
  `therapist_shift` varchar(45) DEFAULT NULL,
  `therapist_licenseExpiration` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `therapist_tbl`
--

INSERT INTO `therapist_tbl` (`therapist_id`, `therapist_fname`, `therapist_mname`, `therapist_lname`, `therapist_contact_no`, `therapist_birthMonth`, `therapist_gender`, `therapist_address`, `therapist_specialty_id`, `therapist_availability`, `delete_stats`, `therapist_birthDate`, `therapist_birthYear`, `therapist_shift`, `therapist_licenseExpiration`) VALUES
(70, 'Rachel', '', 'Flores', '09564752232', '02', 'Female', 'sa Tondo', NULL, 0, 0, '09', '1999', 'First', '2023-08-29'),
(71, 'Crisaldo', 'Ibay', 'Santos ', '09446782572', '01', 'Male', 'sa Paco', NULL, 0, 0, '22', '1999', 'First', '2019-11-27'),
(72, 'Joshua', '', 'Macaya', '09785459646', '03', 'Male', 'sa Tondo', NULL, 0, 0, '11', '1998', 'Second', '2024-08-06'),
(73, 'Gramar', '', 'Lacsina', '09784651564', '03', 'Female', 'sa Punta', NULL, 0, 0, '09', '1995', 'First', '2019-10-02'),
(74, 'Rafhael', '', 'Pabustan', '09785249545', '07', 'Male', 'sa Antipolo', NULL, 0, 0, '11', '1995', 'Second', '2015-09-17'),
(75, 'Ariana', '', 'Grande', '09105385366', '01', 'Female', 'Manila', NULL, 0, 0, '19', '1995', 'First', '2020-12-23'),
(76, 'Jona', '', 'Ebrada', '09098765748', '09', 'Female', 'Manila', NULL, 0, 0, '08', '1999', 'First', '2022-09-01');

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
  `membership_fee` float DEFAULT NULL,
  `entrance_fee` float DEFAULT NULL,
  `reservation_forfeitTime` varchar(45) DEFAULT NULL,
  `firstShift_timeStart` varchar(45) DEFAULT NULL,
  `firstShift_timeEnd` varchar(45) DEFAULT NULL,
  `secondShift_timeStart` varchar(45) DEFAULT NULL,
  `secondShift_timeEnd` varchar(45) DEFAULT NULL,
  `reservation_timeAllowance` varchar(45) DEFAULT NULL,
  `therapist_commission` varchar(45) DEFAULT NULL,
  `amenity_cancellation` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='	';

--
-- Dumping data for table `utilities_tbl`
--

INSERT INTO `utilities_tbl` (`utilities_id`, `company_name`, `company_logo`, `opening_time`, `closing_time`, `max_guest`, `membership_validity`, `membership_fee`, `entrance_fee`, `reservation_forfeitTime`, `firstShift_timeStart`, `firstShift_timeEnd`, `secondShift_timeStart`, `secondShift_timeEnd`, `reservation_timeAllowance`, `therapist_commission`, `amenity_cancellation`) VALUES
(1, 'Mbay Health Spa', 'company_logo-1539722174614.jpg', '13:00', '1:00 AM', 6, '24', 600, 750, '30', '1:00 PM', '6:00 PM', '6:00 PM', '1:00 AM', '30', '30', '30');

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
  `walkin_total_amount` float DEFAULT NULL,
  `walkin_lock_no` int(11) DEFAULT NULL,
  `walkin_date` date DEFAULT NULL,
  `walkin_total_points` varchar(45) DEFAULT NULL,
  `walkin_payment_status` tinyint(4) DEFAULT NULL,
  `walkin_indicator` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `walkin_queue_tbl`
--

INSERT INTO `walkin_queue_tbl` (`walkin_id`, `cust_id`, `walkin_start_time`, `walkin_end_time`, `walkin_status`, `walkin_total_amount`, `walkin_lock_no`, `walkin_date`, `walkin_total_points`, `walkin_payment_status`, `walkin_indicator`) VALUES
(9, 99, '05:05 PM', '06:05 PM', NULL, 249, NULL, '2018-12-01', '30', 2, 0),
(10, 58, '05:15 PM', '06:15 PM', NULL, 849.5, NULL, '2018-12-01', '30', 2, 0),
(11, 58, '05:15 PM', '08:15 PM', NULL, 1599.5, NULL, '2018-12-01', '54', 2, 0),
(12, 99, '05:20 PM', '07:50 PM', NULL, 1899, NULL, '2018-12-01', '54', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `walkin_services_tbl`
--

CREATE TABLE `walkin_services_tbl` (
  `walkin_serv_id` int(11) NOT NULL,
  `walkin_id` int(11) DEFAULT NULL,
  `service_id` int(11) DEFAULT NULL,
  `promobundle_id` int(11) DEFAULT NULL,
  `room_id` int(11) DEFAULT NULL,
  `bed_occupied` int(11) DEFAULT NULL,
  `service_total_quantity` int(11) DEFAULT NULL,
  `service_total_duration` varchar(45) DEFAULT NULL,
  `service_total_price` float DEFAULT NULL,
  `package_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `walkin_services_tbl`
--

INSERT INTO `walkin_services_tbl` (`walkin_serv_id`, `walkin_id`, `service_id`, `promobundle_id`, `room_id`, `bed_occupied`, `service_total_quantity`, `service_total_duration`, `service_total_price`, `package_id`) VALUES
(14, 9, 50, NULL, 8, 1, 1, '01:00', 849.5, NULL),
(20, 12, 49, NULL, 10, 0, 1, '120', 750, NULL),
(21, 12, 50, NULL, 10, 0, 1, '60', 849.5, NULL),
(22, 12, 49, NULL, 10, 0, 1, '120', 750, NULL),
(23, 12, 50, NULL, 10, 0, 1, '60', 849.5, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addons_walkin_tbl`
--
ALTER TABLE `addons_walkin_tbl`
  ADD PRIMARY KEY (`addons_walkin_id`),
  ADD KEY `addons_walkin_id_idx` (`walkin_id`);

--
-- Indexes for table `admin_tbl`
--
ALTER TABLE `admin_tbl`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `amenities_reservation_tbl`
--
ALTER TABLE `amenities_reservation_tbl`
  ADD PRIMARY KEY (`amenity_reservation_id`),
  ADD KEY `cust_id_amenity_idx` (`cust_id`);

--
-- Indexes for table `customer_tbl`
--
ALTER TABLE `customer_tbl`
  ADD PRIMARY KEY (`cust_id`);

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
-- Indexes for table `giftcertificate_tbl`
--
ALTER TABLE `giftcertificate_tbl`
  ADD PRIMARY KEY (`gc_id`);

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
  ADD PRIMARY KEY (`package_id`),
  ADD KEY `room_included_idx` (`package_roomIncluded`);

--
-- Indexes for table `payment_loyalty_trans_tbl`
--
ALTER TABLE `payment_loyalty_trans_tbl`
  ADD PRIMARY KEY (`payment_loyalty_id`),
  ADD KEY `loyalty_id_payment_idx` (`loyalty_id`);

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
  ADD PRIMARY KEY (`promobundle_id`),
  ADD KEY `room_included_in_promo_idx` (`promobundle_roomIncluded`);

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
-- Indexes for table `therapist_in_service_tbl`
--
ALTER TABLE `therapist_in_service_tbl`
  ADD PRIMARY KEY (`therapist_in_service_id`),
  ADD KEY `thera_id_idx` (`therapist_id`),
  ADD KEY `walkin_serv_id_in_idx` (`walkin_id`);

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
  ADD KEY `walkin_reserv_room_id_idx` (`room_id`),
  ADD KEY `walkin_reserv_package_id_idx` (`package_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_tbl`
--
ALTER TABLE `admin_tbl`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `amenities_reservation_tbl`
--
ALTER TABLE `amenities_reservation_tbl`
  MODIFY `amenity_reservation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `customer_tbl`
--
ALTER TABLE `customer_tbl`
  MODIFY `cust_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT for table `freebies_promo_tbl`
--
ALTER TABLE `freebies_promo_tbl`
  MODIFY `freebies_promo_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `freebies_tbl`
--
ALTER TABLE `freebies_tbl`
  MODIFY `freebies_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `giftcertificate_tbl`
--
ALTER TABLE `giftcertificate_tbl`
  MODIFY `gc_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT for table `loyalty_tbl`
--
ALTER TABLE `loyalty_tbl`
  MODIFY `member_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `medical_history_tbl`
--
ALTER TABLE `medical_history_tbl`
  MODIFY `medhist_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `package_tbl`
--
ALTER TABLE `package_tbl`
  MODIFY `package_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `payment_loyalty_trans_tbl`
--
ALTER TABLE `payment_loyalty_trans_tbl`
  MODIFY `payment_loyalty_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment_tbl`
--
ALTER TABLE `payment_tbl`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `promo_bundle_tbl`
--
ALTER TABLE `promo_bundle_tbl`
  MODIFY `promobundle_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `room_tbl`
--
ALTER TABLE `room_tbl`
  MODIFY `room_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

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
  MODIFY `service_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `service_duration_tbl`
--
ALTER TABLE `service_duration_tbl`
  MODIFY `service_duration_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `service_in_package_tbl`
--
ALTER TABLE `service_in_package_tbl`
  MODIFY `service_in_package_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `service_in_promo_tbl`
--
ALTER TABLE `service_in_promo_tbl`
  MODIFY `service_in_promo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `service_type_tbl`
--
ALTER TABLE `service_type_tbl`
  MODIFY `service_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `specialty_tbl`
--
ALTER TABLE `specialty_tbl`
  MODIFY `specialty_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `therapist_attendance_tbl`
--
ALTER TABLE `therapist_attendance_tbl`
  MODIFY `attendance_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `therapist_in_service_tbl`
--
ALTER TABLE `therapist_in_service_tbl`
  MODIFY `therapist_in_service_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `therapist_specialty_tbl`
--
ALTER TABLE `therapist_specialty_tbl`
  MODIFY `therapist_specialty_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=239;

--
-- AUTO_INCREMENT for table `therapist_tbl`
--
ALTER TABLE `therapist_tbl`
  MODIFY `therapist_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `walkin_queue_tbl`
--
ALTER TABLE `walkin_queue_tbl`
  MODIFY `walkin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `walkin_services_tbl`
--
ALTER TABLE `walkin_services_tbl`
  MODIFY `walkin_serv_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `addons_walkin_tbl`
--
ALTER TABLE `addons_walkin_tbl`
  ADD CONSTRAINT `addons_walkin_id` FOREIGN KEY (`walkin_id`) REFERENCES `walkin_queue_tbl` (`walkin_id`) ON UPDATE CASCADE;

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
-- Constraints for table `package_tbl`
--
ALTER TABLE `package_tbl`
  ADD CONSTRAINT `room_included` FOREIGN KEY (`package_roomIncluded`) REFERENCES `room_tbl` (`room_id`) ON UPDATE CASCADE;

--
-- Constraints for table `payment_loyalty_trans_tbl`
--
ALTER TABLE `payment_loyalty_trans_tbl`
  ADD CONSTRAINT `loyalty_id_payment` FOREIGN KEY (`loyalty_id`) REFERENCES `loyalty_tbl` (`member_id`) ON UPDATE CASCADE;

--
-- Constraints for table `payment_tbl`
--
ALTER TABLE `payment_tbl`
  ADD CONSTRAINT `payment_services_availed_id` FOREIGN KEY (`services_availed_id`) REFERENCES `services_availed_tbl` (`service_availed_id`) ON UPDATE CASCADE;

--
-- Constraints for table `promo_bundle_tbl`
--
ALTER TABLE `promo_bundle_tbl`
  ADD CONSTRAINT `room_included_in_promo` FOREIGN KEY (`promobundle_roomIncluded`) REFERENCES `room_tbl` (`room_id`) ON UPDATE CASCADE;

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
-- Constraints for table `therapist_in_service_tbl`
--
ALTER TABLE `therapist_in_service_tbl`
  ADD CONSTRAINT `thera_id_in` FOREIGN KEY (`therapist_id`) REFERENCES `therapist_tbl` (`therapist_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `walkin_serv_id_in` FOREIGN KEY (`walkin_id`) REFERENCES `walkin_queue_tbl` (`walkin_id`) ON UPDATE CASCADE;

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
  ADD CONSTRAINT `walkin_reserv_package_id` FOREIGN KEY (`package_id`) REFERENCES `package_tbl` (`package_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `walkin_reserv_promobundle_id` FOREIGN KEY (`promobundle_id`) REFERENCES `promo_bundle_tbl` (`promobundle_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `walkin_reserv_room_id` FOREIGN KEY (`room_id`) REFERENCES `room_tbl` (`room_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `walkin_reserv_service_id` FOREIGN KEY (`service_id`) REFERENCES `services_tbl` (`service_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `walkin_reserv_walkin_id` FOREIGN KEY (`walkin_id`) REFERENCES `walkin_queue_tbl` (`walkin_id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
