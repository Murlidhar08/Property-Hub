-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 25, 2025 at 04:14 PM
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_login_user` (IN `p_identifier` VARCHAR(255))   BEGIN
    DECLARE varUserCount INT;
    DECLARE varUserId INT;

    -- Check if user exists with given email or username
    SELECT COUNT(*), userId
    INTO varUserCount, varUserId
    FROM userinfo 
    WHERE email = p_identifier OR username = p_identifier;

    -- If no user found
    IF varUserCount = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Invalid Credential. Please Try Again.';
    END IF;

    -- Return user details
    SELECT userId, firstName, lastName, email, username, password, roleId, status, profilePicture
    FROM userinfo 
    WHERE userId = varUserId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_register_user` (IN `p_firstName` VARCHAR(100), IN `p_lastName` VARCHAR(100), IN `p_username` VARCHAR(100), IN `p_email` VARCHAR(255), IN `p_password` VARCHAR(255))   BEGIN
    DECLARE varUserId INT;
    DECLARE varRole INT;
    DECLARE varStatus INT;
    DECLARE varProviderTypeId INT;

    -- Check if username already exists
    SELECT userId INTO varUserId FROM userinfo WHERE username = p_username LIMIT 1;
    IF varUserId IS NOT NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Username already exists. Please choose a different one.';
    END IF;

    -- Check if email already exists
    SELECT userId INTO varUserId FROM userinfo WHERE email = p_email LIMIT 1;
    IF varUserId IS NOT NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Email is already registered. Try to sign in.';
    END IF;

    -- Get role, status, and provider ID
    SET varRole = fn_get_masters_id_by_name('Client');
    SET varStatus = fn_get_masters_id_by_name('PendingApproval');
    SET varProviderTypeId = fn_get_masters_id_by_name('Local');

    -- Insert new user with providerId
    INSERT INTO userinfo (firstName, lastName, email, username, password, roleId, status, providerTypeId)
    VALUES (p_firstName, p_lastName, p_email, p_username, p_password, varRole, varStatus, varProviderTypeId);

    -- Return the new user ID
    SELECT LAST_INSERT_ID() AS userId;
END$$

--
-- Functions
--
CREATE DEFINER=`root`@`localhost` FUNCTION `fn_get_masters_id_by_name` (`p_Name` VARCHAR(255)) RETURNS INT(11)  BEGIN
	DECLARE v_id INT;

    -- Fetch the ID based on the provided value
    SELECT id INTO v_id FROM masters WHERE name = p_Name LIMIT 1;

    RETURN v_id;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `fn_get_masters_name_by_id` (`p_id` INT) RETURNS VARCHAR(255) CHARSET utf8mb4 COLLATE utf8mb4_general_ci  BEGIN
	DECLARE v_name VARCHAR(255);

    -- Fetch the ID based on the provided value
    SELECT name INTO v_name FROM masters WHERE id = p_id LIMIT 1;

    RETURN v_name;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `fn_get_typename_by_id` (`p_id` INT(11)) RETURNS VARCHAR(255) CHARSET utf8mb4 COLLATE utf8mb4_general_ci DETERMINISTIC BEGIN
    DECLARE v_name varchar(255);

    -- Fetch the ID based on the provided value
    SELECT name INTO v_name FROM master_types WHERE id = p_id LIMIT 1;

    RETURN v_name;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `fn_get_type_id_by_name` (`p_value` VARCHAR(255)) RETURNS INT(11) DETERMINISTIC BEGIN
    DECLARE v_id INT;

    -- Fetch the ID based on the provided value
    SELECT id INTO v_id FROM mastertypes WHERE name = p_value LIMIT 1;

    RETURN v_id;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `masters`
--

CREATE TABLE `masters` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `masterTypeId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `masters`
--

INSERT INTO `masters` (`id`, `name`, `description`, `masterTypeId`, `createdAt`, `updatedAt`) VALUES
(1, 'Local', 'Standard email/password authentication', 1, '2025-03-25 11:16:39', '2025-03-25 11:16:39'),
(2, 'Google', 'OAuth authentication via Google', 1, '2025-03-25 11:16:39', '2025-03-25 11:16:39'),
(3, 'Facebook', 'OAuth authentication via Facebook', 1, '2025-03-25 11:16:39', '2025-03-25 11:16:39'),
(4, 'Admin', 'Full access to application', 2, '2025-03-25 11:16:39', '2025-03-25 11:16:39'),
(5, 'Agent', 'Access to add, update, delete basic features', 2, '2025-03-25 11:16:39', '2025-03-25 11:16:39'),
(6, 'Client', 'Read-only view of the details', 2, '2025-03-25 11:16:39', '2025-03-25 11:16:39'),
(7, 'Verified', 'The user has been verified and has full access.', 3, '2025-03-25 11:16:39', '2025-03-25 11:16:39'),
(8, 'Unverified', 'The user has not completed the verification process.', 3, '2025-03-25 11:16:39', '2025-03-25 11:16:39'),
(9, 'PendingApproval', 'The user is awaiting approval from an administrator.', 3, '2025-03-25 11:16:39', '2025-03-25 12:26:10'),
(10, 'Suspended', 'The user account is temporarily disabled due to a violation or issue.', 3, '2025-03-25 11:16:39', '2025-03-25 11:16:39'),
(11, 'Deleted', 'The user account has been deleted and is no longer active.', 3, '2025-03-25 11:16:39', '2025-03-25 11:16:39'),
(12, 'Banned', 'The user has been permanently banned from the platform.', 3, '2025-03-25 11:16:39', '2025-03-25 11:16:39');

-- --------------------------------------------------------

--
-- Table structure for table `mastertypes`
--

CREATE TABLE `mastertypes` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mastertypes`
--

INSERT INTO `mastertypes` (`id`, `name`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'AuthenticationProvider', 'Defines third-party login providers', '2025-03-25 11:16:39', '2025-03-25 11:16:39'),
(2, 'Role', 'Defines user roles in the application', '2025-03-25 11:16:39', '2025-03-25 11:16:39'),
(3, 'UserStatus', 'Defines different statuses for user accounts', '2025-03-25 11:16:39', '2025-03-25 11:16:39');

-- --------------------------------------------------------

--
-- Table structure for table `userinfo`
--

CREATE TABLE `userinfo` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(500) DEFAULT NULL,
  `providerTypeId` int(11) NOT NULL,
  `providerUid` varchar(255) DEFAULT NULL,
  `profilePicture` varchar(500) DEFAULT NULL,
  `roleId` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userinfo`
--

INSERT INTO `userinfo` (`userId`, `firstName`, `lastName`, `email`, `username`, `password`, `providerTypeId`, `providerUid`, `profilePicture`, `roleId`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Chavda', 'Mahesh', 'Chavdamahesh2772@gmail.com', 'Chavda2772', '1111', 1, NULL, NULL, 4, 7, '2025-03-25 11:19:34', '2025-03-25 11:55:08'),
(6, 'test', 'testLast', 'test@aa.com', 'test1', '111', 1, NULL, NULL, 6, 9, '2025-03-25 13:18:13', '2025-03-25 13:18:13'),
(7, 'aa', 'bb', 'aa@gmail.com', 'ab1', '11', 1, NULL, NULL, 6, 9, '2025-03-25 13:32:12', '2025-03-25 13:32:12'),
(8, 'as', 'ss', 'aa@aa.com', 'aa11', '11', 1, NULL, NULL, 6, 9, '2025-03-25 13:33:10', '2025-03-25 13:33:10'),
(9, 'qweQWE', 'qe', 'jj@gmail.com', 'ff11', '11', 1, NULL, NULL, 6, 9, '2025-03-25 13:36:17', '2025-03-25 13:36:17'),
(10, 'asfd', 'asdf', 'chavdamahsesh2772@gmail.com', 'ab1s', '111', 1, NULL, NULL, 6, 9, '2025-03-25 14:15:31', '2025-03-25 14:15:31'),
(11, 'sd', 'ds', 'asf@asdf.com', 'dd11', '111', 1, NULL, NULL, 6, 9, '2025-03-25 14:15:59', '2025-03-25 14:15:59'),
(12, 'ffd', 'sdf', 'asfd@asdf.com', 'jj11', '11', 1, NULL, NULL, 6, 9, '2025-03-25 14:18:01', '2025-03-25 14:18:01'),
(13, 'fd', 'asd', 'sdf@er.com', 'ff', '11', 1, NULL, NULL, 6, 9, '2025-03-25 14:18:54', '2025-03-25 14:18:54'),
(14, 'ss', 'ss', 'dd@ss.com', 'ss1', '11', 1, NULL, NULL, 6, 9, '2025-03-25 14:35:49', '2025-03-25 14:35:49'),
(15, 'dd', 'dd', 'df@asdf.com', 'ss1d', '11', 1, NULL, NULL, 6, 9, '2025-03-25 14:37:09', '2025-03-25 14:37:09'),
(16, 'sdf', 'asdf', 'asdf@d.com', 'ssfd1', '11', 1, NULL, NULL, 6, 9, '2025-03-25 14:37:34', '2025-03-25 14:37:34'),
(17, 'dd', 'dd', 'asd@sd.com', 'ff@adf.com', '11', 1, NULL, NULL, 6, 9, '2025-03-25 14:38:21', '2025-03-25 14:38:21'),
(18, 'dd', 'dd', 'asf@asf.com', 'ff1', '11', 1, NULL, NULL, 6, 9, '2025-03-25 14:41:19', '2025-03-25 14:41:19'),
(19, 'ss', 'sff', '11@asd.com', '1', '11', 1, NULL, NULL, 6, 9, '2025-03-25 15:13:06', '2025-03-25 15:13:06'),
(20, 'ss', 'sff', '11s@asd.com', '11', '11', 1, NULL, NULL, 6, 9, '2025-03-25 15:14:13', '2025-03-25 15:14:13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `masters`
--
ALTER TABLE `masters`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `mastertypes`
--
ALTER TABLE `mastertypes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `userinfo`
--
ALTER TABLE `userinfo`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `provider_uid_unique` (`providerTypeId`,`providerUid`),
  ADD KEY `users_ibfk_1` (`roleId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `masters`
--
ALTER TABLE `masters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `mastertypes`
--
ALTER TABLE `mastertypes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `userinfo`
--
ALTER TABLE `userinfo`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `userinfo`
--
ALTER TABLE `userinfo`
  ADD CONSTRAINT `fk_users_provider` FOREIGN KEY (`providerTypeId`) REFERENCES `masters` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_users_role` FOREIGN KEY (`roleId`) REFERENCES `masters` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
