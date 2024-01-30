-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 28, 2024 at 07:31 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

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
-- Table structure for table `log_book`
--

CREATE TABLE `log_book` (
  `log_id` int(11) NOT NULL,
  `serial_code` varchar(20) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `action_type` enum('borrow','return') NOT NULL,
  `log_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `num_items` int(11) NOT NULL,
  `status` enum('pending','approved','completed') NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `log_book`
--

INSERT INTO `log_book` (`log_id`, `serial_code`, `user_id`, `action_type`, `log_date`, `num_items`, `status`) VALUES
(2, 'S1002', 1, 'return', '2024-01-23 02:37:16', 2, 'completed'),
(3, 'S1003', 1, 'return', '2024-01-23 02:37:17', 12, 'completed'),
(4, 'S1004', 1, 'return', '2024-01-23 02:37:18', 11, 'completed'),
(5, 'S1005', 1, 'return', '2024-01-23 02:37:23', 6, 'completed'),
(6, 'S1006', 1, 'return', '2024-01-23 02:37:25', 5, 'completed'),
(7, 'S1007', 1, 'return', '2024-01-23 02:37:28', 6, 'completed'),
(8, 'S1008', 1, 'return', '2024-01-23 02:37:31', 8, 'completed'),
(9, 'S1009', 1, 'return', '2024-01-23 02:37:32', 5, 'completed'),
(10, 'S1010', 1, 'return', '2024-01-23 02:37:34', 2, 'completed'),
(11, 'S1006', 1, 'return', '2024-01-27 21:02:27', 2, 'completed'),
(12, 'S1006', 1, 'return', '2024-01-27 21:05:57', 5, 'completed');

-- --------------------------------------------------------

--
-- Table structure for table `school_items`
--

CREATE TABLE `school_items` (
  `serial_code` varchar(20) NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `total_items` int(11) NOT NULL,
  `items_borrowed` int(11) DEFAULT 0,
  `borrowable_items` int(11) DEFAULT 0,
  `item_added` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `school_items`
--

INSERT INTO `school_items` (`serial_code`, `item_name`, `total_items`, `items_borrowed`, `borrowable_items`, `item_added`) VALUES
('S1006', 'Whiteboard', 21, 7, 13, '2024-01-23 02:34:51'),
('S1007', 'Globe', 20, 5, 15, '2024-01-23 02:34:51'),
('S1008', 'Art Supplies', 25, 0, 25, '2024-01-23 02:34:51'),
('S1009', 'Headphones', 30, 0, 30, '2024-01-23 02:34:51'),
('S1010', 'Desk Chair', 15, 0, 15, '2024-01-23 02:34:51'),
('S1011', 'Scientific Calculator', 20, 0, 20, '2024-01-23 02:34:51'),
('S1012', 'Sports Equipment', 35, 0, 35, '2024-01-23 02:34:51'),
('S1013', 'Musical Instruments', 15, 0, 15, '2024-01-23 02:34:51'),
('S1014', 'Backpack', 40, 0, 40, '2024-01-23 02:34:51');

-- --------------------------------------------------------

--
-- Table structure for table `user_list`
--

CREATE TABLE `user_list` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL,
  `verified` enum('yes','no') DEFAULT 'no',
  `registration_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_list`
--

INSERT INTO `user_list` (`user_id`, `username`, `first_name`, `last_name`, `email`, `password`, `department`, `verified`, `registration_date`) VALUES
(1, 'user1', 'John', 'Doe', 'john.doe@example.com', 'password1', 'IT', 'yes', '2024-01-23 02:16:47'),
(2, 'user2', 'Jane', 'Smith', 'jane.smith@example.com', 'password2', 'HR', 'no', '2024-01-23 02:16:47'),
(3, 'user3', 'Bob', 'Johnson', 'bob.johnson@example.com', 'password3', 'Marketing', 'yes', '2024-01-23 02:16:47'),
(4, 'user4', 'Alice', 'Williams', 'alice.williams@example.com', 'password4', 'Finance', 'yes', '2024-01-23 02:16:47'),
(5, 'user5', 'Charlie', 'Brown', 'charlie.brown@example.com', 'password5', 'IT', 'yes', '2024-01-23 02:16:47'),
(6, 'user6', 'Emily', 'Davis', 'emily.davis@example.com', 'password6', 'Marketing', 'yes', '2024-01-23 02:16:47'),
(7, 'user7', 'Michael', 'Miller', 'michael.miller@example.com', 'password7', 'Finance', 'yes', '2024-01-23 02:16:47'),
(8, 'user8', 'Olivia', 'Taylor', 'olivia.taylor@example.com', 'password8', 'HR', 'no', '2024-01-23 02:16:47'),
(9, 'user9', 'Daniel', 'Clark', 'daniel.clark@example.com', 'password9', 'IT', 'yes', '2024-01-23 02:16:47'),
(11, 'user10', 'Joshua', 'Vicente', 'gamerotaku80085@yahoo.com', '$2y$10$CG4ygct6z.zOxuT3ylUeGO0Bpoz6RZ8D.y03bdJkkHVUxCRC0sCly', 'xxx', 'yes', '2024-01-27 04:03:31');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `log_book`
--
ALTER TABLE `log_book`
  ADD PRIMARY KEY (`log_id`);

--
-- Indexes for table `school_items`
--
ALTER TABLE `school_items`
  ADD PRIMARY KEY (`serial_code`);

--
-- Indexes for table `user_list`
--
ALTER TABLE `user_list`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `log_book`
--
ALTER TABLE `log_book`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `user_list`
--
ALTER TABLE `user_list`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
