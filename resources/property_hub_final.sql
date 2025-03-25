-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 25, 2025 at 06:23 PM
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_google_auth_login` (
  IN `p_providerUid` VARCHAR(255), 
  IN `p_firstName` VARCHAR(255), 
  IN `p_lastName` VARCHAR(255), 
  IN `p_email` VARCHAR(255), 
  IN `p_profilePicture` VARCHAR(500)
)   
BEGIN
	  DECLARE varRole INT;
    DECLARE varStatus INT;
    DECLARE varProviderTypeId INT;

	  -- Get  provider Type ID
	  SET varProviderTypeId = fn_get_masters_id_by_name('Google');

    -- Check if the user exists based on providerUid (Google UID)
    IF EXISTS (SELECT 1 FROM userinfo WHERE email = p_email) THEN
        -- Update existing Google user
        UPDATE userinfo 
        SET 
            firstName = p_firstName,
            lastName = p_lastName,
            providerTypeId = varProviderTypeId,
            providerUid = p_providerUid,
            profilePicture = p_profilePicture
        WHERE email = p_email;
    ELSE
		    -- Get role and status, and provider ID
		    SET varRole = fn_get_masters_id_by_name('Client');
		    SET varStatus = fn_get_masters_id_by_name('PendingApproval');
    
        -- Insert new Google user with default values
        INSERT INTO userinfo (providerTypeId, providerUid, firstName, lastName, email, profilePicture, roleId, status) 
        VALUES (varProviderTypeId, p_providerUid, p_firstName, p_lastName, p_email, p_profilePicture, varRole, varStatus);
    END IF;

    -- Return updated or newly inserted user details
    SELECT userId, firstName, lastName, email, username, roleId, status, profilePicture
    FROM userinfo 
    WHERE email = p_email;

END$$

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

CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_update_password` (IN `p_email` VARCHAR(255), IN `p_password` VARCHAR(255))   BEGIN
    -- Update password
    UPDATE userinfo 
    SET password = p_password 
    WHERE email = p_email;
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
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT;

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
