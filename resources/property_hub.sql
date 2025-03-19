-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 19, 2025 at 09:22 AM
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_get_user_profile` (IN `p_user_id` INT)   BEGIN
    -- Retrieve user profile details
    SELECT id, first_name, last_name, email, username, provider_id, profile_picture, role_id, status, created_at, updated_at
    FROM users WHERE id = p_user_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_login_user` (IN `p_email` VARCHAR(255), IN `p_password` VARCHAR(500))   BEGIN
    DECLARE user_count INT;
    DECLARE user_id INT;
    DECLARE db_password VARCHAR(500);
    DECLARE user_role INT;
    DECLARE user_status INT;

    -- Check if user exists
    SELECT COUNT(*), id, password, role_id, status 
    INTO user_count, user_id, db_password, user_role, user_status
    FROM users WHERE email = p_email;

    IF user_count = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'User not found';
    END IF;

    -- Check if the password matches
    IF db_password <> p_password THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Invalid credentials';
    END IF;

    -- Check if the user is active
    IF user_status <> 1 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'User is not active';
    END IF;

    -- Return user details
    SELECT id, first_name, last_name, email, username, role_id, status FROM users WHERE id = user_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_oauth_login` (IN `p_email` VARCHAR(255), IN `p_firstName` VARCHAR(255), IN `p_lastName` VARCHAR(255), IN `p_provider` VARCHAR(50))   BEGIN
    DECLARE user_exists INT;
    
    -- Check if user exists
    SELECT COUNT(*) INTO user_exists FROM users WHERE email = p_email;
    
    IF user_exists = 0 THEN
        INSERT INTO users (firstName, lastName, email, username, password, role, status, created_at, updated_at)
        VALUES (p_firstName, p_lastName, p_email, p_email, '', 3, 1, NOW(), NOW()); -- Default role = Client
    END IF;
    
    -- Return user details
    SELECT id, firstName, lastName, email, username, role, status FROM users WHERE email = p_email;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_register_user` (IN `p_first_name` VARCHAR(255), IN `p_last_name` VARCHAR(255), IN `p_email` VARCHAR(255), IN `p_username` VARCHAR(255), IN `p_password` VARCHAR(500), IN `p_provider_id` INT, IN `p_provider_uid` VARCHAR(255), IN `p_profile_picture` VARCHAR(500), IN `p_role_id` INT)   BEGIN
    DECLARE v_role_id INT;

    -- If provider is Local (1), set provider_uid and profile_picture to NULL
    IF p_provider_id = 1 THEN
        SET p_provider_uid = NULL;
        SET p_profile_picture = NULL;

        -- Assign default role (Client role ID = 6) if role_id is NULL
        IF p_role_id IS NULL THEN
            SET v_role_id = 6;
        ELSE
            SET v_role_id = p_role_id;
        END IF;
    ELSE
        SET v_role_id = p_role_id;
    END IF;

    -- Insert user into the table
    INSERT INTO users (first_name, last_name, email, username, password, provider_id, provider_uid, profile_picture, role_id, status)
    VALUES (p_first_name, p_last_name, p_email, p_username, p_password, p_provider_id, p_provider_uid, p_profile_picture, v_role_id, 1);
    
    -- Return last inserted ID
    SELECT LAST_INSERT_ID() AS user_id;
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

--
-- Functions
--
CREATE DEFINER=`root`@`localhost` FUNCTION `fn_get_typename_by_id` (`p_id` INT(11)) RETURNS VARCHAR(255) CHARSET utf8mb4 COLLATE utf8mb4_general_ci DETERMINISTIC BEGIN
    DECLARE v_name varchar(255);

    -- Fetch the ID based on the provided value
    SELECT name INTO v_name FROM master_types WHERE id = p_id LIMIT 1;

    RETURN v_name;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `fn_get_type_id` (`p_value` VARCHAR(255)) RETURNS INT(11) DETERMINISTIC BEGIN
    DECLARE v_id INT;

    -- Fetch the ID based on the provided value
    SELECT id INTO v_id FROM master_types WHERE name = p_value LIMIT 1;

    RETURN v_id;
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
-- Table structure for table `masters`
--

CREATE TABLE `masters` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `master_type_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `masters`
--

INSERT INTO `masters` (`id`, `name`, `description`, `master_type_id`, `created_at`, `updated_at`) VALUES
(1, 'Local', 'Standard email/password authentication', 2, '2025-03-18 08:06:09', '2025-03-18 08:06:09'),
(2, 'Google', 'OAuth authentication via Google', 2, '2025-03-18 08:06:09', '2025-03-18 08:06:09'),
(3, 'Facebook', 'OAuth authentication via Facebook', 2, '2025-03-18 08:06:09', '2025-03-18 08:06:09'),
(4, 'Admin', 'Full access to application', 1, '2025-03-18 08:13:18', '2025-03-18 08:13:18'),
(5, 'Agent', 'Access to add, update, delete basic features', 1, '2025-03-18 08:13:18', '2025-03-18 08:13:18'),
(6, 'Client', 'Read-only view of the details', 1, '2025-03-18 08:13:18', '2025-03-18 08:13:18'),
(7, 'Verified', 'The user has been verified and has full access.', 3, '2025-03-18 14:16:28', '2025-03-18 14:16:28'),
(8, 'Unverified', 'The user has not completed the verification process.', 3, '2025-03-18 14:16:28', '2025-03-18 14:16:28'),
(9, 'Pending Approval', 'The user is awaiting approval from an administrator.', 3, '2025-03-18 14:16:28', '2025-03-18 14:16:28'),
(10, 'Suspended', 'The user account is temporarily disabled due to a violation or issue.', 3, '2025-03-18 14:16:28', '2025-03-18 14:16:28'),
(11, 'Deleted', 'The user account has been deleted and is no longer active.', 3, '2025-03-18 14:16:28', '2025-03-18 14:16:28'),
(12, 'Banned', 'The user has been permanently banned from the platform.', 3, '2025-03-18 14:16:28', '2025-03-18 14:16:28');

-- --------------------------------------------------------

--
-- Table structure for table `master_types`
--

CREATE TABLE `master_types` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `master_types`
--

INSERT INTO `master_types` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Role', 'Defines user roles in the application', '2025-03-18 08:05:47', '2025-03-18 08:05:47'),
(2, 'Authentication Provider', 'Defines third-party login providers', '2025-03-18 08:05:47', '2025-03-18 08:05:47'),
(3, 'User Status', 'Defines different statuses for user accounts', '2025-03-18 14:15:11', '2025-03-18 14:15:11');

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
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(500) DEFAULT NULL,
  `provider_id` int(11) NOT NULL,
  `provider_uid` varchar(255) DEFAULT NULL,
  `profile_picture` varchar(500) DEFAULT NULL,
  `role_id` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
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
-- Indexes for table `masters`
--
ALTER TABLE `masters`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `master_type_id` (`master_type_id`);

--
-- Indexes for table `master_types`
--
ALTER TABLE `master_types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

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
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `provider_uid_unique` (`provider_id`,`provider_uid`),
  ADD KEY `fk_users_role` (`role_id`);

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
-- AUTO_INCREMENT for table `masters`
--
ALTER TABLE `masters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `master_types`
--
ALTER TABLE `master_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `masters`
--
ALTER TABLE `masters`
  ADD CONSTRAINT `masters_ibfk_1` FOREIGN KEY (`master_type_id`) REFERENCES `master_types` (`id`) ON DELETE CASCADE;

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
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_provider` FOREIGN KEY (`provider_id`) REFERENCES `masters` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_users_role` FOREIGN KEY (`role_id`) REFERENCES `masters` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `masters` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`provider_id`) REFERENCES `masters` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
