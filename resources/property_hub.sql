-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 09, 2025 at 06:08 PM
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
-- Database: `property_hub`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_agent_add` (IN `p_name` VARCHAR(255), IN `p_contact` VARCHAR(20), IN `p_email` VARCHAR(255), IN `p_address` TEXT, IN `p_area` VARCHAR(255), IN `p_image` VARCHAR(255))   BEGIN
    INSERT INTO agents (name, contact, email, address, area, image, created_at)
    VALUES (p_name, p_contact, p_email, p_address, p_area, p_image, NOW());
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_agent_delete` (IN `p_id` INT)   BEGIN
    DELETE FROM agents WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_agent_select` (IN `p_id` INT)   BEGIN
    SELECT * FROM agents WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_agent_select_all` ()   BEGIN
    SELECT * FROM agents;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_agent_update` (IN `p_id` INT, IN `p_name` VARCHAR(255), IN `p_contact` VARCHAR(20), IN `p_email` VARCHAR(255), IN `p_address` TEXT, IN `p_area` VARCHAR(255), IN `p_image` VARCHAR(255))   BEGIN
    UPDATE agents 
    SET name = p_name,
        contact = p_contact,
        email = p_email,
        address = p_address,
        area = p_area,
        image = p_image
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_client_add` (IN `p_name` VARCHAR(255), IN `p_contact` VARCHAR(20), IN `p_email` VARCHAR(255), IN `p_address` TEXT, IN `p_occupation` VARCHAR(255))   BEGIN
    INSERT INTO clients (name, contact, email, address, occupation, created_at)
    VALUES (p_name, p_contact, p_email, p_address, p_occupation, NOW());
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_client_delete` (IN `p_id` INT)   BEGIN
    DELETE FROM clients WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_client_select` (IN `p_id` INT)   BEGIN
    SELECT * FROM clients WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_client_select_all` ()   BEGIN
    SELECT * FROM clients;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_client_update` (IN `p_id` INT, IN `p_name` VARCHAR(255), IN `p_contact` VARCHAR(20), IN `p_email` VARCHAR(255), IN `p_address` TEXT, IN `p_occupation` VARCHAR(255))   BEGIN
    UPDATE clients 
    SET name = p_name,
        contact = p_contact,
        email = p_email,
        address = p_address,
        occupation = p_occupation
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_req_add` (IN `p_client_id` INT, IN `p_type` ENUM('Residential','Commercial','Land','Other'), IN `p_location` VARCHAR(255), IN `p_measurement` FLOAT, IN `p_unit` VARCHAR(50), IN `p_price_range` VARCHAR(50))   BEGIN
    INSERT INTO requirements (client_id, type, location, measurement, unit, price_range, created_at)
    VALUES (p_client_id, p_type, p_location, p_measurement, p_unit, p_price_range, NOW());
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_req_delete` (IN `p_id` INT)   BEGIN
    DELETE FROM requirements WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_req_select` (IN `p_id` INT)   BEGIN
    SELECT * FROM requirements WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_req_select_all` ()   BEGIN
    SELECT * FROM requirements;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_req_update` (IN `p_id` INT, IN `p_client_id` INT, IN `p_type` ENUM('Residential','Commercial','Land','Other'), IN `p_location` VARCHAR(255), IN `p_measurement` FLOAT, IN `p_unit` VARCHAR(50), IN `p_price_range` VARCHAR(50))   BEGIN
    UPDATE requirements 
    SET client_id = p_client_id,
        type = p_type,
        location = p_location,
        measurement = p_measurement,
        unit = p_unit,
        price_range = p_price_range
    WHERE id = p_id;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `agents`
--

CREATE TABLE `agents` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `contact` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` text DEFAULT NULL,
  `area` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `contact` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` text DEFAULT NULL,
  `occupation` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `properties`
--

CREATE TABLE `properties` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `measurement` float NOT NULL,
  `unit` varchar(50) NOT NULL,
  `type` enum('Residential','Commercial','Land','Other') NOT NULL,
  `address` text NOT NULL,
  `price` decimal(15,2) NOT NULL,
  `description` text DEFAULT NULL,
  `added_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `property_audit`
--

CREATE TABLE `property_audit` (
  `id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `action` enum('Created','Updated','Deleted') NOT NULL,
  `performed_by` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `property_media`
--

CREATE TABLE `property_media` (
  `id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `file_type` enum('Image','Video') NOT NULL,
  `uploaded_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `requirements`
--

CREATE TABLE `requirements` (
  `id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `type` enum('Residential','Commercial','Land','Other') NOT NULL,
  `location` varchar(255) NOT NULL,
  `measurement` float NOT NULL,
  `unit` varchar(50) NOT NULL,
  `price_range` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `google_id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` enum('Admin','Agent','Client') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_access`
--

CREATE TABLE `user_access` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `can_view` tinyint(1) DEFAULT 1,
  `can_print` tinyint(1) DEFAULT 0,
  `granted_by` int(11) NOT NULL,
  `granted_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `agents`
--
ALTER TABLE `agents`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `properties`
--
ALTER TABLE `properties`
  ADD PRIMARY KEY (`id`),
  ADD KEY `added_by` (`added_by`);

--
-- Indexes for table `property_audit`
--
ALTER TABLE `property_audit`
  ADD PRIMARY KEY (`id`),
  ADD KEY `property_id` (`property_id`);

--
-- Indexes for table `property_media`
--
ALTER TABLE `property_media`
  ADD PRIMARY KEY (`id`),
  ADD KEY `property_id` (`property_id`);

--
-- Indexes for table `requirements`
--
ALTER TABLE `requirements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `client_id` (`client_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `google_id` (`google_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_access`
--
ALTER TABLE `user_access`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `property_id` (`property_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `agents`
--
ALTER TABLE `agents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `properties`
--
ALTER TABLE `properties`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `property_audit`
--
ALTER TABLE `property_audit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `property_media`
--
ALTER TABLE `property_media`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `requirements`
--
ALTER TABLE `requirements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_access`
--
ALTER TABLE `user_access`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `properties`
--
ALTER TABLE `properties`
  ADD CONSTRAINT `properties_ibfk_1` FOREIGN KEY (`added_by`) REFERENCES `agents` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `property_audit`
--
ALTER TABLE `property_audit`
  ADD CONSTRAINT `property_audit_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `property_media`
--
ALTER TABLE `property_media`
  ADD CONSTRAINT `property_media_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `requirements`
--
ALTER TABLE `requirements`
  ADD CONSTRAINT `requirements_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_access`
--
ALTER TABLE `user_access`
  ADD CONSTRAINT `user_access_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_access_ibfk_2` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
