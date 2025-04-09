-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 09, 2025 at 02:44 PM
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
CREATE PROCEDURE `usp_agent_add` (IN `p_name` VARCHAR(255), IN `p_contact` VARCHAR(20), IN `p_address` VARCHAR(500), IN `p_area` VARCHAR(255), IN `p_image` VARCHAR(255), IN `p_description` TEXT)   BEGIN
    INSERT INTO agents (name, contact, address, area, description)
    VALUES (p_name, p_contact, p_address, p_area, p_description);
END$$

CREATE PROCEDURE `usp_agent_delete` (IN `p_id` INT)   BEGIN
    DELETE FROM agents WHERE id = p_id;
END$$

CREATE PROCEDURE `usp_agent_get_all` ()   BEGIN
    SELECT * FROM agents ORDER BY createdAt DESC;
END$$

CREATE PROCEDURE `usp_agent_get_by_id` (IN `p_id` INT)   BEGIN
    SELECT * FROM agents WHERE id = p_id;
END$$

CREATE PROCEDURE `usp_agent_update` (IN `p_id` INT, IN `p_name` VARCHAR(255), IN `p_contact` VARCHAR(20), IN `p_address` VARCHAR(500), IN `p_area` VARCHAR(255), IN `p_image` VARCHAR(255), IN `p_description` TEXT)   BEGIN
    UPDATE agents
    SET name = p_name,
        contact = p_contact,
        address = p_address,
        area = p_area,
        image = p_image,
        description = p_description
    WHERE id = p_id;
END$$

CREATE PROCEDURE `usp_client_add` (IN `p_name` VARCHAR(255), IN `p_contact` VARCHAR(20), IN `p_address` TEXT, IN `p_occupation` VARCHAR(255), IN `p_description` TEXT)   BEGIN
    INSERT INTO clients (name, contact, address, occupation, description)
    VALUES (p_name, p_contact, p_address, p_occupation, p_description);
END$$

CREATE PROCEDURE `usp_client_delete` (IN `p_id` INT)   BEGIN
    DELETE FROM clients WHERE id = p_id;
END$$

CREATE PROCEDURE `usp_client_get_all` ()   BEGIN
    SELECT * FROM clients ORDER BY createdAt DESC;
END$$

CREATE PROCEDURE `usp_client_get_by_id` (IN `p_id` INT)   BEGIN
    SELECT * FROM clients WHERE id = p_id;
END$$

CREATE PROCEDURE `usp_client_update` (IN `p_id` INT, IN `p_name` VARCHAR(255), IN `p_contact` VARCHAR(20), IN `p_address` TEXT, IN `p_occupation` VARCHAR(255), IN `p_description` TEXT)   BEGIN
    UPDATE clients
    SET name = p_name,
        contact = p_contact,
        address = p_address,
        occupation = p_occupation,
        description = p_description
    WHERE id = p_id;
END$$

CREATE PROCEDURE `usp_dashboard_getcounts` ()   BEGIN
    -- Fetch total properties
    SELECT 
        (SELECT COUNT(*) FROM properties) AS totalProperties,
        (SELECT COUNT(*) FROM requirements) AS totalRequirements,
        (SELECT COUNT(*) FROM clients) AS totalClients,
        (SELECT COUNT(*) FROM agents) AS totalAgents,
        (SELECT COUNT(*) FROM owners) AS totalOwners;
END$$

CREATE PROCEDURE `usp_expiredToken_add` (IN `p_token_hash` CHAR(64), IN `p_expires_at` INT(11))   BEGIN
    INSERT IGNORE INTO expiredtokens (tokenHash, expiresAt) 
    VALUES (p_token_hash, p_expires_at);
END$$

CREATE PROCEDURE `usp_expiredToken_delete` ()   BEGIN
    -- Disable safe update mode
    SET SQL_SAFE_UPDATES = 0;
    
    -- Delete expired tokens
    DELETE FROM expiredtokens WHERE FROM_UNIXTIME(expiresAt) < NOW();
    
    -- Re-enable safe update mode
    SET SQL_SAFE_UPDATES = 1;
END$$

CREATE PROCEDURE `usp_expiredToken_verify` (IN `p_token_hash` CHAR(64))   BEGIN
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

CREATE PROCEDURE `usp_masters_getId_by_name` (IN `p_name` VARCHAR(255))   BEGIN
	SELECT fn_get_masters_id_by_name(p_name) as id;
END$$

CREATE PROCEDURE `usp_masters_get_all_by_type` (IN `masterTypeName` VARCHAR(255))   BEGIN
    DECLARE s_masterTypeId INT;

    -- Get the masterTypeId using the function
    SET s_masterTypeId = fn_get_mastertypes_id_by_name(masterTypeName);

    -- Return all records from the masters table with the retrieved masterTypeId
    SELECT id, name FROM masters WHERE masterTypeId = s_masterTypeId;
END$$

CREATE PROCEDURE `usp_owner_add` (IN `p_name` VARCHAR(255), IN `p_contact` VARCHAR(20), IN `p_email` VARCHAR(255), IN `p_address` VARCHAR(500), IN `p_description` TEXT)   BEGIN
    INSERT INTO `owners` (`name`, `contact`, `email`, `address`, `description`)
    VALUES (p_name, p_contact, p_email, p_address, p_description);
END$$

CREATE PROCEDURE `usp_owner_delete` (IN `p_id` INT)   BEGIN
    DELETE FROM `owners` WHERE `id` = p_id;
END$$

CREATE PROCEDURE `usp_owner_get_all` ()   BEGIN
    SELECT * FROM `owners`;
END$$

CREATE PROCEDURE `usp_owner_get_by_id` (IN `p_id` INT)   BEGIN
    SELECT * FROM `owners` WHERE `id` = p_id;
END$$

CREATE PROCEDURE `usp_owner_update` (IN `p_id` INT, IN `p_name` VARCHAR(255), IN `p_contact` VARCHAR(20), IN `p_email` VARCHAR(255), IN `p_address` VARCHAR(500), IN `p_mapDetails` VARCHAR(500), IN `p_description` TEXT)   BEGIN
    UPDATE `owners`
    SET `name` = p_name,
        `contact` = p_contact,
        `email` = p_email,
        `address` = p_address,
        `mapDetails` = p_mapDetails,
        `description` = p_description
    WHERE `id` = p_id;
END$$

CREATE PROCEDURE `usp_propertydocument_create` (IN `p_documentRelativePaths` TEXT, IN `p_propertyId` INT, IN `p_documentTypeId` INT, IN `p_uploadedBy` INT)   BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE docPath VARCHAR(500);
    DECLARE cur CURSOR FOR 
        SELECT TRIM(value) FROM (
            SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(p_documentRelativePaths, ',', numbers.n), ',', -1) AS value
            FROM (SELECT 1 n UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL 
                  SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL 
                  SELECT 9 UNION ALL SELECT 10) numbers
            WHERE CHAR_LENGTH(p_documentRelativePaths) - CHAR_LENGTH(REPLACE(p_documentRelativePaths, ',', '')) >= numbers.n - 1
        ) temp;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    OPEN cur;

    read_loop: LOOP
        FETCH cur INTO docPath;
        IF done THEN
            LEAVE read_loop;
        END IF;

        INSERT INTO propertydocuments (documentRelativePath, propertyId, documentTypeId, uploadedBy)
        VALUES (docPath, p_propertyId, p_documentTypeId, p_uploadedBy);
    END LOOP;

    CLOSE cur;
END$$

CREATE PROCEDURE `usp_propertydocument_delete` (IN `p_documentId` INT)   BEGIN
    DELETE FROM propertydocuments WHERE id = p_documentId;
END$$

CREATE PROCEDURE `usp_propertydocument_get_by_propertyId` (IN `p_propertyId` INT)   BEGIN
    SELECT id, documentRelativePath, fn_get_mastertype_name_by_id(documentTypeId) AS documentType
    FROM propertydocuments
    WHERE propertyId = p_propertyId;
END$$

CREATE PROCEDURE `usp_property_add` (IN `p_title` VARCHAR(255), IN `p_propertyTypeId` INT, IN `p_address` VARCHAR(255), IN `p_pricePerUnit` DECIMAL(15,2), IN `p_priceTypeId` INT, IN `p_measurementValue` DECIMAL(10,2), IN `p_measurementTypeId` INT, IN `p_statusId` INT, IN `p_ownerId` INT, IN `p_mapDetails` VARCHAR(255), IN `p_description` TEXT)   BEGIN
    INSERT INTO properties (
        title, propertyTypeId, address, pricePerUnit, priceTypeId,
        measurementValue, measurementTypeId, statusId, ownerId, mapDetails, description
    ) VALUES (
        p_title, p_propertyTypeId, p_address, p_pricePerUnit, p_priceTypeId,
        p_measurementValue, p_measurementTypeId, p_statusId, p_ownerId, p_mapDetails, p_description
    );
    
    -- Get the last inserted ID and set it to the OUT parameter
    SELECT LAST_INSERT_ID() AS id;
END$$

CREATE PROCEDURE `usp_property_delete` (IN `p_id` INT)   BEGIN
    DELETE FROM properties WHERE id = p_id;
END$$

CREATE PROCEDURE `usp_property_get_all` ()   BEGIN
    SELECT 
        p.id,
        p.title,
        p.propertyTypeId,
        mp.name AS propertyType,
        p.address,
        p.pricePerUnit,
        p.priceTypeId,
        mpr.name AS priceType,
        p.measurementValue,
        mm.name AS measurementType,
        ms.name AS status,
        p.ownerId,
        o.name AS ownerName,
        p.description,
        pd.documentRelativePath AS image
    FROM properties p 
    LEFT JOIN masters mp ON p.propertyTypeId = mp.id
    LEFT JOIN masters mpr ON p.priceTypeId = mpr.id
    LEFT JOIN masters mm ON p.measurementTypeId = mm.id
    LEFT JOIN masters ms ON p.statusId = ms.id
    LEFT JOIN owners o ON p.ownerId = o.id
    LEFT JOIN (
        SELECT pd1.propertyId, pd1.documentRelativePath
        FROM propertydocuments pd1
        INNER JOIN (
            SELECT propertyId, MIN(id) AS min_id
            FROM propertydocuments
            GROUP BY propertyId
        ) pd2 ON pd1.propertyId = pd2.propertyId AND pd1.id = pd2.min_id
    ) pd ON pd.propertyId = p.id;
END$$

CREATE PROCEDURE `usp_property_get_by_id` (IN `p_id` INT)   BEGIN
    SELECT 
        p.id,
        p.title,
        p.propertyTypeId,
        mp.name AS propertyType,
        p.address,
        p.pricePerUnit,
        p.priceTypeId,
        mpr.name AS priceType,
        p.measurementValue,
        p.measurementTypeId,
        mm.name AS measurementType,
        p.statusId,
        ms.name AS status,
        p.ownerId,
        o.name AS ownerName,
        p.mapDetails,
        p.description,
        (
            SELECT 
                GROUP_CONCAT(pd.documentRelativePath SEPARATOR ',') 
            FROM 
                propertydocuments pd 
            WHERE 
                pd.propertyId = p.id
        ) AS images
    FROM 
        properties p 
    LEFT JOIN 
        masters mp ON p.propertyTypeId = mp.id
    LEFT JOIN 
        masters mpr ON p.priceTypeId = mpr.id
    LEFT JOIN 
        masters mm ON p.measurementTypeId = mm.id
    LEFT JOIN 
        masters ms ON p.statusId = ms.id
    LEFT JOIN 
        owners o ON p.ownerId = o.id
    WHERE 
        p.id = p_id;
END$$

CREATE PROCEDURE `usp_property_update` (IN `p_id` INT, IN `p_title` VARCHAR(255), IN `p_propertyTypeId` INT, IN `p_address` VARCHAR(255), IN `p_pricePerUnit` DECIMAL(15,2), IN `p_priceTypeId` INT, IN `p_measurementValue` DECIMAL(10,2), IN `p_measurementTypeId` INT, IN `p_statusId` INT, IN `p_ownerId` INT, IN `p_mapDetails` VARCHAR(255), IN `p_description` TEXT)   BEGIN
    UPDATE properties 
    SET 
        title = p_title,
        propertyTypeId = p_propertyTypeId,
        address = p_address,
        pricePerUnit = p_pricePerUnit,
        priceTypeId = p_priceTypeId,
        measurementValue = p_measurementValue,
        measurementTypeId = p_measurementTypeId,
        statusId = p_statusId,
        ownerId = p_ownerId,
        mapDetails = p_mapDetails,
        description = p_description
    WHERE id = p_id;
END$$

CREATE PROCEDURE `usp_requirements_add` (IN `p_title` VARCHAR(255), IN `p_requirementTypeId` INT, IN `p_location` VARCHAR(255), IN `p_measurementTypeId` INT, IN `p_minMeasurement` DECIMAL(10,2), IN `p_maxMeasurement` DECIMAL(10,2), IN `p_priceTypeId` INT, IN `p_minPrice` DECIMAL(15,2), IN `p_maxPrice` DECIMAL(15,2), IN `p_propertyForTypeId` INT, IN `p_clientId` INT, IN `p_description` TEXT)   BEGIN
    INSERT INTO requirements (
        title, requirementTypeId, location, measurementTypeId, 
        minMeasurement, maxMeasurement, priceTypeId, minPrice, 
        maxPrice, propertyForTypeId, clientId, description
    ) 
    VALUES (
        p_title, p_requirementTypeId, p_location, p_measurementTypeId, 
        p_minMeasurement, p_maxMeasurement, p_priceTypeId, p_minPrice, 
        p_maxPrice, p_propertyForTypeId, p_clientId, p_description
    );
END$$

CREATE PROCEDURE `usp_requirements_delete` (IN `p_id` INT)   BEGIN
    DELETE FROM requirements WHERE id = p_id;
END$$

CREATE PROCEDURE `usp_requirements_get_all` ()   BEGIN
    SELECT 
        r.id,
        r.title,
        r.location,
        r.minPrice,
        r.maxPrice,
        r.minMeasurement,
        r.maxMeasurement,
        c.name AS clientName,
        m1.name AS measurementType,
        m2.name AS priceType,
        m3.name AS requirementType,
        r.description
    FROM requirements r
    LEFT JOIN masters m1 ON m1.id = r.measurementTypeId 
        AND m1.masterTypeId = fn_get_mastertypes_id_by_name('MeasurementType')
    LEFT JOIN masters m2 ON m2.id = r.priceTypeId 
        AND m2.masterTypeId = fn_get_mastertypes_id_by_name('PriceType')
    LEFT JOIN masters m3 ON m3.id = r.requirementTypeId 
        AND m3.masterTypeId = fn_get_mastertypes_id_by_name('PropertyType')
	LEFT JOIN clients c ON r.clientId = c.id
    ORDER BY r.createdAt DESC;
END$$

CREATE PROCEDURE `usp_requirements_get_by_id` (IN `p_id` INT)   BEGIN
   SELECT 
		    r.id,
        r.title,
        r.requirementTypeId,
        r.location,
        r.propertyForTypeId,
        r.measurementTypeId,
        r.minMeasurement,
        r.maxMeasurement,
        r.priceTypeId,
        r.minPrice,
        r.maxPrice,
        r.clientId,
        r.description,
        c.name AS clientName,
        m1.name AS measurementType,
        m2.name AS priceType,
        m3.name AS requirementType,
        m4.name AS propertyForType
    FROM requirements r
    LEFT JOIN masters m1 ON m1.id = r.measurementTypeId 
        AND m1.masterTypeId = fn_get_mastertypes_id_by_name('MeasurementType')
    LEFT JOIN masters m2 ON m2.id = r.priceTypeId 
        AND m2.masterTypeId = fn_get_mastertypes_id_by_name('PriceType')
    LEFT JOIN masters m3 ON m3.id = r.requirementTypeId 
        AND m3.masterTypeId = fn_get_mastertypes_id_by_name('PropertyType')
	LEFT JOIN clients c ON r.clientId = c.id
    LEFT JOIN masters m4 ON m4.id = r.propertyForTypeId 
        AND m4.masterTypeId = fn_get_mastertypes_id_by_name('PropertyFor')
    WHERE r.id = p_id;
END$$

CREATE PROCEDURE `usp_requirements_update` (IN `p_id` INT, IN `p_title` VARCHAR(255), IN `p_requirementTypeId` INT, IN `p_location` VARCHAR(255), IN `p_measurementTypeId` INT, IN `p_minMeasurement` DECIMAL(10,2), IN `p_maxMeasurement` DECIMAL(10,2), IN `p_priceTypeId` INT, IN `p_minPrice` DECIMAL(15,2), IN `p_maxPrice` DECIMAL(15,2), IN `p_clientId` INT, IN `p_description` TEXT, IN `p_propertyForTypeId` INT)   BEGIN
    UPDATE requirements 
    SET 
        title = p_title,
        requirementTypeId = p_requirementTypeId,
        location = p_location,
        measurementTypeId = p_measurementTypeId,
        minMeasurement = p_minMeasurement,
        maxMeasurement = p_maxMeasurement,
        priceTypeId = p_priceTypeId,
        minPrice = p_minPrice,
        maxPrice = p_maxPrice,
        clientId = p_clientId,
        description = p_description,
        propertyForTypeId = p_propertyForTypeId
    WHERE id = p_id;
END$$

CREATE PROCEDURE `usp_userinfo_google_auth` (IN `p_providerUid` VARCHAR(255), IN `p_firstName` VARCHAR(255), IN `p_lastName` VARCHAR(255), IN `p_email` VARCHAR(255), IN `p_profilePicture` VARCHAR(500))   BEGIN
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
	SELECT	
		u.userId, 
		u.firstName, 
		u.lastName, 
		u.email, 
		u.username, 
		u.password, 
		u.roleId, 
        m.name As roleName,
		u.status, 
		u.profilePicture, 
		u.isVerified
    FROM userinfo u
    LEFT JOIN masters m on u.roleId = m.id and m.masterTypeId = fn_get_mastertypes_id_by_name('Role')
	WHERE email = p_email;
END$$

CREATE PROCEDURE `usp_userinfo_login` (IN `p_identifier` VARCHAR(255))   BEGIN
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
    SELECT	
		u.userId, 
		u.firstName, 
		u.lastName, 
		u.email, 
		u.username, 
		u.password, 
		u.roleId, 
        m.name As roleName,
		u.status, 
		u.profilePicture, 
		u.isVerified
    FROM userinfo u
    LEFT JOIN masters m on u.roleId = m.id and m.masterTypeId = fn_get_mastertypes_id_by_name('Role')
    WHERE userId = varUserId;
END$$

CREATE PROCEDURE `usp_userinfo_register` (IN `p_firstName` VARCHAR(100), IN `p_lastName` VARCHAR(100), IN `p_username` VARCHAR(100), IN `p_email` VARCHAR(255), IN `p_password` VARCHAR(255))   BEGIN
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

CREATE PROCEDURE `usp_userinfo_update_password` (IN `p_email` VARCHAR(255), IN `p_password` VARCHAR(255))   BEGIN
    -- Update password
    UPDATE userinfo 
    SET password = p_password 
    WHERE email = p_email;
END$$

CREATE PROCEDURE `usp_userinfo_update_profile` (IN `p_userId` INT, IN `p_firstName` VARCHAR(100), IN `p_lastName` VARCHAR(100), IN `p_username` VARCHAR(100))   BEGIN
    -- Check if the username is already used by another user
    IF EXISTS (
        SELECT 1 FROM userinfo WHERE username = p_username AND userId != p_userId
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Username already exists.';
    ELSE
        -- Update user details
        UPDATE userinfo
        SET
            firstName = p_firstName,
            lastName = p_lastName,
            username = p_username
        WHERE userId = p_userId;
    END IF;
END$$

CREATE PROCEDURE `usp_userinfo_update_profile_picture` (IN `p_userId` INT, IN `p_profilePicture` VARCHAR(500))   BEGIN
    -- Update profile picture for the user
    UPDATE userinfo
    SET profilePicture = p_profilePicture
    WHERE userId = p_userId;
END$$

CREATE PROCEDURE `usp_userinfo_verify_user` (IN `p_email` VARCHAR(255))   BEGIN
	UPDATE userInfo
    SET isVerified = 1
    WHERE email = p_email;
END$$

--
-- Functions
--
CREATE FUNCTION `fn_get_masters_id_by_name` (`p_Name` VARCHAR(255)) RETURNS INT(11)  BEGIN
	DECLARE v_id INT;

    -- Fetch the ID based on the provided value
    SELECT id INTO v_id FROM masters WHERE name = p_Name LIMIT 1;

    RETURN v_id;
END$$

CREATE FUNCTION `fn_get_masters_name_by_id` (`p_id` INT) RETURNS VARCHAR(255) CHARSET utf8mb4 COLLATE utf8mb4_general_ci  BEGIN
	DECLARE v_name VARCHAR(255);

    -- Fetch the ID based on the provided value
    SELECT name INTO v_name FROM masters WHERE id = p_id LIMIT 1;

    RETURN v_name;
END$$

CREATE FUNCTION `fn_get_mastertypes_id_by_name` (`p_value` VARCHAR(255)) RETURNS INT(11) DETERMINISTIC BEGIN
    DECLARE v_id INT;

    -- Fetch the ID based on the provided value
    SELECT id INTO v_id FROM mastertypes WHERE name = p_value LIMIT 1;

    RETURN v_id;
END$$

CREATE FUNCTION `fn_get_mastertype_name_by_id` (`p_id` INT(11)) RETURNS VARCHAR(255) CHARSET utf8mb4 COLLATE utf8mb4_general_ci DETERMINISTIC BEGIN
    DECLARE v_name varchar(255);

    -- Fetch the ID based on the provided value
    SELECT name INTO v_name FROM mastertypes WHERE id = p_id LIMIT 1;

    RETURN v_name;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `agents`
--

CREATE TABLE IF NOT EXISTS `agents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `contact` varchar(20) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(500) NOT NULL,
  `area` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE IF NOT EXISTS `clients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `contact` varchar(20) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `occupation` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `expiredtokens`
--

CREATE TABLE IF NOT EXISTS `expiredtokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tokenHash` char(64) NOT NULL,
  `expiresAt` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tokenHash` (`tokenHash`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `masters`
--

CREATE TABLE IF NOT EXISTS `masters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `masterTypeId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `masters`
--

INSERT IGNORE INTO `masters` (`id`, `name`, `description`, `masterTypeId`, `createdAt`) VALUES
(1, 'Local', 'Standard email/password authentication', 1, '2025-03-25 11:16:39'),
(2, 'Google', 'OAuth authentication via Google', 1, '2025-03-25 11:16:39'),
(3, 'Facebook', 'OAuth authentication via Facebook', 1, '2025-03-25 11:16:39'),
(4, 'Admin', 'Full access to application', 2, '2025-03-25 11:16:39'),
(5, 'Agent', 'Access to add, update, delete basic features', 2, '2025-03-25 11:16:39'),
(6, 'Client', 'Read-only view of the details', 2, '2025-03-25 11:16:39'),
(7, 'Verified', 'The user has been verified and has full access.', 3, '2025-03-25 11:16:39'),
(8, 'Unverified', 'The user has not completed the verification process.', 3, '2025-03-25 11:16:39'),
(9, 'PendingApproval', 'The user is awaiting approval from an administrator.', 3, '2025-03-25 11:16:39'),
(10, 'Suspended', 'The user account is temporarily disabled due to a violation or issue.', 3, '2025-03-25 11:16:39'),
(11, 'Deleted', 'The user account has been deleted and is no longer active.', 3, '2025-03-25 11:16:39'),
(12, 'Banned', 'The user has been permanently banned from the platform.', 3, '2025-03-25 11:16:39'),
(13, 'Tenament', 'An independent residential unit', 4, '2025-03-29 07:40:29'),
(14, 'Flat', 'Appartment flat', 4, '2025-03-29 11:38:45'),
(15, 'Plot', 'A piece of land for construction', 4, '2025-03-29 07:40:29'),
(16, 'Agricultural Land', 'Land used for farming or cultivation', 4, '2025-03-29 07:40:29'),
(17, 'Non-Agricultural Land', 'Land for commercial or residential use', 4, '2025-03-29 07:40:29'),
(18, 'Sq Feet', 'Measurement unit in square feet', 5, '2025-03-29 07:48:57'),
(19, 'Acre', 'Measurement unit in acres', 5, '2025-03-29 07:48:57'),
(20, 'Bigha', 'Traditional land measurement unit', 5, '2025-03-29 07:48:57'),
(21, 'Rent', 'Property is available for rent', 6, '2025-03-29 08:17:01'),
(22, 'Rented', 'Property has been rented out', 6, '2025-03-29 08:17:01'),
(23, 'Selling', 'Property is available for sale', 6, '2025-03-29 08:17:01'),
(24, 'SoldOut', 'Property has been sold', 6, '2025-03-29 08:17:01'),
(25, 'Sell', 'Property is available for selling', 7, '2025-03-29 08:18:27'),
(26, 'Rent', 'Property is available for rent', 7, '2025-03-29 08:18:27'),
(27, 'Buy', 'Property is available for buy', 7, '2025-03-29 09:49:09'),
(28, 'Hundred', 'Measurement unit of money', 8, '2025-03-29 12:23:14'),
(29, 'Thousand', 'Measurement unit of money', 8, '2025-03-29 12:23:14'),
(30, 'Lakh', 'Measurement unit of money', 8, '2025-03-29 12:23:14'),
(31, 'Crore', 'Measurement unit of money', 8, '2025-03-29 12:23:14'),
(32, 'PropertyPreview', 'Type of property document', 9, '2025-04-03 00:57:31');

-- --------------------------------------------------------

--
-- Table structure for table `mastertypes`
--

CREATE TABLE IF NOT EXISTS `mastertypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mastertypes`
--

INSERT IGNORE INTO `mastertypes` (`id`, `name`, `description`) VALUES
(1, 'AuthenticationProvider', 'Defines third-party login providers'),
(2, 'Role', 'Defines user roles in the application'),
(3, 'UserStatus', 'Defines different statuses for user accounts'),
(4, 'PropertyType', 'Type of property'),
(5, 'MeasurementType', 'Type of measurement'),
(6, 'PropertyStatus', 'Defines the status of a property'),
(7, 'PropertyFor', 'Defines whether a property is for sale or rent'),
(8, 'PriceType', 'Type of price'),
(9, 'DocumentType', 'Type of document which is uploaded');

-- --------------------------------------------------------

--
-- Table structure for table `owners`
--

CREATE TABLE IF NOT EXISTS `owners` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `contact` varchar(20) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(500) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `properties`
--

CREATE TABLE IF NOT EXISTS `properties` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `propertyTypeId` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `pricePerUnit` decimal(15,2) NOT NULL,
  `priceTypeId` int(11) NOT NULL,
  `measurementValue` decimal(10,2) NOT NULL,
  `measurementTypeId` int(11) NOT NULL,
  `statusId` int(11) NOT NULL,
  `ownerId` int(11) DEFAULT NULL,
  `mapDetails` varchar(500) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `soldTo` int(11) DEFAULT NULL,
  `soldAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `propertydocuments`
--

CREATE TABLE IF NOT EXISTS `propertydocuments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `documentRelativePath` varchar(500) NOT NULL,
  `propertyId` int(11) NOT NULL,
  `documentTypeId` int(11) NOT NULL,
  `uploadedBy` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `requirements`
--

CREATE TABLE IF NOT EXISTS `requirements` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `requirementTypeId` int(11) NOT NULL,
  `location` varchar(255) NOT NULL,
  `measurementTypeId` int(11) NOT NULL,
  `minMeasurement` decimal(10,2) NOT NULL,
  `maxMeasurement` decimal(10,2) NOT NULL,
  `priceTypeId` int(11) NOT NULL,
  `minPrice` decimal(15,2) NOT NULL,
  `maxPrice` decimal(15,2) NOT NULL,
  `propertyForTypeId` int(11) NOT NULL,
  `clientId` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `userinfo`
--

CREATE TABLE IF NOT EXISTS `userinfo` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
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
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`userId`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `provider_uid_unique` (`providerTypeId`,`providerUid`),
  KEY `users_ibfk_1` (`roleId`),
  CONSTRAINT `fk_users_provider` FOREIGN KEY (`providerTypeId`) REFERENCES `masters` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_users_role` FOREIGN KEY (`roleId`) REFERENCES `masters` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
CREATE EVENT `delete_expired_tokens` ON SCHEDULE EVERY 1 DAY STARTS '2025-03-26 18:41:29' ON COMPLETION NOT PRESERVE ENABLE DO CALL usp_expiredToken_delete()$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
