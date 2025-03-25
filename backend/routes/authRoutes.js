const express = require("express");
const authController = require("../controller/authController.js");
const validator = require("../validators/jwtValidator.js");

const router = express.Router();

// Login with email/password or OAuth token
router.post("/login", authController.login);

// Register a new user (Email & Password or OAuth)
router.post("/register", authController.register);

// Get user profile
router.get("/profile", validator, authController.getProfile);

// Logout user
// router.post("/logout", authController.logout);

// Reset password
// router.post("/reset-password", authController.resetPassword);

// Google OAuth Login
// router.get("/google", authController.googleAuth);

module.exports = router;

