-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 27, 2025 at 09:26 AM
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_agent_add` (IN `p_name` VARCHAR(255), IN `p_contact` VARCHAR(20), IN `p_address` VARCHAR(500), IN `p_area` VARCHAR(255), IN `p_image` VARCHAR(255), IN `p_description` TEXT)   BEGIN
    INSERT INTO agents (name, contact, address, area, image, description)
    VALUES (p_name, p_contact, p_address, p_area, p_image, p_description);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_agent_delete` (IN `p_id` INT)   BEGIN
    DELETE FROM agents WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_agent_get_all` ()   BEGIN
    SELECT * FROM agents ORDER BY createdAt DESC;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_agent_get_by_id` (IN `p_id` INT)   BEGIN
    SELECT * FROM agents WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_agent_update` (IN `p_id` INT, IN `p_name` VARCHAR(255), IN `p_contact` VARCHAR(20), IN `p_address` VARCHAR(500), IN `p_area` VARCHAR(255), IN `p_image` VARCHAR(255), IN `p_description` TEXT)   BEGIN
    UPDATE agents
    SET name = p_name,
        contact = p_contact,
        address = p_address,
        area = p_area,
        image = p_image,
        description = p_description
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_expiredToken_add` (IN `p_token_hash` CHAR(64), IN `p_expires_at` INT(11))   BEGIN
    INSERT IGNORE INTO expiredtokens (tokenHash, expiresAt) 
    VALUES (p_token_hash, p_expires_at);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_expiredToken_delete` ()   BEGIN
    -- Disable safe update mode
    SET SQL_SAFE_UPDATES = 0;
    
    -- Delete expired tokens
    DELETE FROM expiredtokens WHERE FROM_UNIXTIME(expiresAt) < NOW();
    
    -- Re-enable safe update mode
    SET SQL_SAFE_UPDATES = 1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_expiredToken_verify` (IN `p_token_hash` CHAR(64))   BEGIN
    DECLARE token_count INT;

    -- Check if token hash exists
    SELECT COUNT(*) 
    INTO token_count 
    FROM expiredtokens 
    WHERE tokenHash = p_token_hash
    LIMIT 1;

    -- Set output parameter (TRUE if exists, FALSE otherwise)
    SELECT token_count > 0 as isExpired;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_google_auth_login` (IN `p_providerUid` VARCHAR(255), IN `p_firstName` VARCHAR(255), IN `p_lastName` VARCHAR(255), IN `p_email` VARCHAR(255), IN `p_profilePicture` VARCHAR(500))   BEGIN
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
            isVerified = 1,
            providerUid = p_providerUid,
            profilePicture = p_profilePicture
        WHERE email = p_email;
    ELSE
		-- Get role and status, and provider ID
		SET varRole = fn_get_masters_id_by_name('Client');
		SET varStatus = fn_get_masters_id_by_name('PendingApproval');
    
        -- Insert new Google user with default values
        INSERT INTO userinfo (providerTypeId, isVerified, providerUid, firstName, lastName, email, profilePicture, roleId, status) 
        VALUES (varProviderTypeId, 1, p_providerUid, p_firstName, p_lastName, p_email, p_profilePicture, varRole, varStatus);
    END IF;

    -- Return updated or newly inserted user details
    SELECT userId, firstName, lastName, email, username, roleId, status, profilePicture, isVerified
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
        SET MESSAGE_TEXT = 'Invalid email address';
    END IF;

    -- Return user details
    SELECT userId, firstName, lastName, email, username, password, roleId, status, profilePicture, isVerified
    FROM userinfo 
    WHERE userId = varUserId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_masters_getId_by_name` (IN `p_name` VARCHAR(255))   BEGIN
	SELECT fn_get_masters_id_by_name(p_name) as id;
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_verify_user` (IN `p_email` VARCHAR(255))   BEGIN
	UPDATE userInfo
    SET isVerified = 1
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
-- Table structure for table `agents`
--

CREATE TABLE `agents` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `contact` varchar(20) NOT NULL,
  `address` varchar(500) NOT NULL,
  `area` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `expiredtokens`
--

CREATE TABLE `expiredtokens` (
  `id` int(11) NOT NULL,
  `tokenHash` char(64) NOT NULL,
  `expiresAt` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `isVerified` int(1) DEFAULT 0,
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
-- Indexes for table `agents`
--
ALTER TABLE `agents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `expiredtokens`
--
ALTER TABLE `expiredtokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tokenHash` (`tokenHash`);

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
-- AUTO_INCREMENT for table `agents`
--
ALTER TABLE `agents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `expiredtokens`
--
ALTER TABLE `expiredtokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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

DELIMITER $$
--
-- Events
--
CREATE DEFINER=`root`@`localhost` EVENT `delete_expired_tokens` ON SCHEDULE EVERY 1 DAY STARTS '2025-03-26 18:41:29' ON COMPLETION NOT PRESERVE ENABLE DO CALL usp_expiredToken_delete()$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
