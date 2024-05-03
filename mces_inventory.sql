-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 03, 2024 at 04:42 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mces_inventory`
--

-- --------------------------------------------------------

--
-- Table structure for table `asset_type`
--

CREATE TABLE `asset_type` (
  `id` bigint(20) NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `asset_type`
--

INSERT INTO `asset_type` (`id`, `name`, `description`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Computer', 'Assets related to computer equipment', '2024-02-07 22:30:11', '2024-02-07 22:30:11', NULL),
(2, 'Laboratory Equipment', 'Assets used in laboratory experiments', '2024-02-07 22:30:11', '2024-02-07 22:30:11', NULL),
(3, 'Furniture', 'Assets such as desks, chairs, and tables', '2024-02-07 22:30:11', '2024-02-07 22:30:11', NULL),
(4, 'Audio-Visual Equipment', 'Assets like projectors and sound systems', '2024-02-07 22:30:11', '2024-02-07 22:30:11', NULL),
(8, 'sample', 'asdfasdfasdfasdfgasdgasdgasdfg', '2024-02-23 10:52:51', '2024-02-23 10:53:08', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `name`, `description`) VALUES
(1, 'CCS', 'College of Computer Studies'),
(2, 'COS', 'College of Science'),
(3, 'COE', 'College of Engineering'),
(4, 'CLA', 'College of Liberal Arts'),
(5, 'CBA', 'College of Business Administration'),
(6, 'CAAD', 'College of Architecture and Allied Disciplines'),
(8, 'CHS', 'College of Health Sciences'),
(9, 'CAS', 'College of Arts and Sciences'),
(10, 'CED', 'College of Education');

-- --------------------------------------------------------

--
-- Table structure for table `group`
--

CREATE TABLE `group` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `group`
--

INSERT INTO `group` (`id`, `name`, `description`) VALUES
(1, 'Administration', 'Administrative staff and management'),
(2, 'Faculty', 'Teaching staff'),
(4, 'asd asd asd', 'asdfasdf'),
(5, 'asdasd', 'asdasd');

-- --------------------------------------------------------

--
-- Table structure for table `log_book`
--

CREATE TABLE `log_book` (
  `log_id` int(11) NOT NULL,
  `qr_serial` varchar(255) DEFAULT NULL,
  `item_name` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `user_name` varchar(255) NOT NULL,
  `action_type` enum('borrow','return') NOT NULL,
  `log_date` datetime NOT NULL DEFAULT current_timestamp(),
  `due_date` datetime DEFAULT NULL,
  `status` enum('pending','approved','completed') NOT NULL DEFAULT 'pending',
  `admin_notif` tinyint(1) NOT NULL DEFAULT 0,
  `user_notif` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `log_book`
--

INSERT INTO `log_book` (`log_id`, `qr_serial`, `item_name`, `user_id`, `user_name`, `action_type`, `log_date`, `due_date`, `status`, `admin_notif`, `user_notif`) VALUES
(3, 'MCES20240031', 'Coke', 1, 'Joshua Jumamil Vicente', 'borrow', '2024-05-02 22:27:29', '2024-05-03 00:00:00', 'approved', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `request_log`
--

CREATE TABLE `request_log` (
  `log_id` bigint(20) NOT NULL,
  `borrower_id` int(255) NOT NULL,
  `borrower_name` varchar(255) NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `item_type` varchar(255) NOT NULL,
  `item_count` int(11) NOT NULL,
  `action` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `date_requested` date NOT NULL DEFAULT current_timestamp(),
  `date_approved` date DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `request_log`
--

INSERT INTO `request_log` (`log_id`, `borrower_id`, `borrower_name`, `item_name`, `item_type`, `item_count`, `action`, `location`, `date_requested`, `date_approved`, `status`) VALUES
(1, 1, 'Joshua Jumamil Vicente', 'Muncher', 'Computer', 1, 'borrow', 'Gym', '2024-03-19', '2024-04-02', 'approved');

-- --------------------------------------------------------

--
-- Table structure for table `school_asset`
--

CREATE TABLE `school_asset` (
  `asset_id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `number_of_items` int(11) DEFAULT NULL,
  `price_per_item` decimal(10,2) DEFAULT NULL,
  `total_price` decimal(12,2) DEFAULT NULL,
  `mode_of_procurement` varchar(100) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `acquired_at` datetime DEFAULT NULL,
  `edited_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `school_asset`
--

INSERT INTO `school_asset` (`asset_id`, `name`, `type`, `number_of_items`, `price_per_item`, `total_price`, `mode_of_procurement`, `location`, `acquired_at`, `edited_at`, `deleted_at`) VALUES
(2, 'Muncher', 'Computer', 3, 10.00, 30.00, 'asdfasdf', 'School', '2024-03-19 14:48:11', NULL, NULL),
(3, 'Coke', 'Laboratory Equipment', 2, 10.00, 20.00, 'asdasd', 'School', '2024-05-02 21:17:59', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `school_items`
--

CREATE TABLE `school_items` (
  `item_id` bigint(20) NOT NULL,
  `qr_serial` varchar(255) DEFAULT NULL,
  `item_name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `mode_of_procurement` varchar(100) DEFAULT NULL,
  `warranty_expiry_date` date DEFAULT NULL,
  `serial_number` varchar(100) DEFAULT NULL,
  `manufacturer` varchar(255) DEFAULT NULL,
  `lifespan` int(11) DEFAULT NULL,
  `expected_end_date` date DEFAULT NULL,
  `reason_for_disposal` text DEFAULT NULL,
  `acquired_at` datetime DEFAULT NULL,
  `edited_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `disposed_at` datetime DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `item_status` varchar(255) DEFAULT 'In Stock'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `school_items`
--

INSERT INTO `school_items` (`item_id`, `qr_serial`, `item_name`, `description`, `type`, `mode_of_procurement`, `warranty_expiry_date`, `serial_number`, `manufacturer`, `lifespan`, `expected_end_date`, `reason_for_disposal`, `acquired_at`, `edited_at`, `disposed_at`, `location`, `item_status`) VALUES
(22, 'MCES20240021', 'Muncher', 'asdfasdf', 'Computer', 'asdfasdf', '2024-03-30', '1111', 'asdasdasd', 2, '2026-03-19', NULL, '2024-03-19 14:48:11', '2024-04-01 07:22:26', NULL, 'asd', 'Borrowed'),
(23, 'MCES20240022', 'Muncher', 'asdfasdf', 'Computer', 'asdfasdf', '2024-03-30', NULL, 'asdasdasd', 2, '2026-03-19', NULL, '2024-03-19 14:48:11', NULL, NULL, 'School', 'In Stock'),
(24, 'MCES20240023', 'Muncher', 'asdfasdf', 'Computer', 'asdfasdf', '2024-03-30', NULL, 'asdasdasd', 2, '2026-03-19', NULL, '2024-03-19 14:48:11', NULL, NULL, 'School', 'In Stock'),
(25, 'MCES20240031', 'Coke', 'asdfasdfasdf', 'Laboratory Equipment', 'asdasd', '2024-05-30', NULL, 'asdf', 2, '2026-05-02', NULL, '2024-05-02 21:17:59', NULL, NULL, 'School', 'In Stock'),
(26, 'MCES20240032', 'Coke', 'asdfasdfasdf', 'Laboratory Equipment', 'asdasd', '2024-05-30', NULL, 'asdf', 2, '2026-05-02', NULL, '2024-05-02 21:17:59', NULL, NULL, 'School', 'In Stock');

-- --------------------------------------------------------

--
-- Table structure for table `stock_items`
--

CREATE TABLE `stock_items` (
  `log_id` bigint(20) NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `item_type` varchar(255) NOT NULL,
  `available_items` int(11) NOT NULL,
  `borrowed_items` int(11) NOT NULL DEFAULT 0,
  `disposed_items` int(11) NOT NULL DEFAULT 0,
  `location` varchar(255) NOT NULL,
  `date_added` date NOT NULL DEFAULT current_timestamp(),
  `date_updated` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stock_items`
--

INSERT INTO `stock_items` (`log_id`, `item_name`, `item_type`, `available_items`, `borrowed_items`, `disposed_items`, `location`, `date_added`, `date_updated`) VALUES
(1, 'Muncher', 'Computer', 3, 0, 0, 'School', '2024-03-19', '2024-04-06'),
(4, 'Coke', 'Laboratory Equipment', 1, 1, 0, 'School', '2024-05-02', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_list`
--

CREATE TABLE `user_list` (
  `user_id` bigint(20) NOT NULL,
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `group` varchar(255) DEFAULT NULL,
  `department` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `full_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `u_role` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `contact_information` varchar(11) DEFAULT NULL,
  `u_description` text DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `deleted_on` datetime DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `verified` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_list`
--

INSERT INTO `user_list` (`user_id`, `username`, `email`, `group`, `department`, `full_name`, `u_role`, `contact_information`, `u_description`, `created_on`, `updated_on`, `deleted_on`, `password`, `verified`) VALUES
(1, 'user1', 'gamerotaku80085@yahoo.com', 'Administration', 'CAS', 'Joshua Jumamil Vicente', 'Teacher', 'asdfasdf', 'aasdfasdfasdf', '2024-03-19 03:32:42', '2024-03-19 03:33:04', NULL, '$2y$10$lhc0dQZng3a8Hg.EfEdI5OtSvsegDavZiPAzMbGh5xQAPOU28swBq', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `asset_type`
--
ALTER TABLE `asset_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `group`
--
ALTER TABLE `group`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `log_book`
--
ALTER TABLE `log_book`
  ADD PRIMARY KEY (`log_id`);

--
-- Indexes for table `request_log`
--
ALTER TABLE `request_log`
  ADD PRIMARY KEY (`log_id`);

--
-- Indexes for table `school_asset`
--
ALTER TABLE `school_asset`
  ADD PRIMARY KEY (`asset_id`);

--
-- Indexes for table `school_items`
--
ALTER TABLE `school_items`
  ADD PRIMARY KEY (`item_id`);

--
-- Indexes for table `stock_items`
--
ALTER TABLE `stock_items`
  ADD PRIMARY KEY (`log_id`);

--
-- Indexes for table `user_list`
--
ALTER TABLE `user_list`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `asset_type`
--
ALTER TABLE `asset_type`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `group`
--
ALTER TABLE `group`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `log_book`
--
ALTER TABLE `log_book`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `request_log`
--
ALTER TABLE `request_log`
  MODIFY `log_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `school_asset`
--
ALTER TABLE `school_asset`
  MODIFY `asset_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `school_items`
--
ALTER TABLE `school_items`
  MODIFY `item_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `stock_items`
--
ALTER TABLE `stock_items`
  MODIFY `log_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user_list`
--
ALTER TABLE `user_list`
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
