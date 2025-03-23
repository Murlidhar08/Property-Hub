const express = require("express");
const authController = require("../controller/authController.js");

const router = express.Router();

// Register a new user (Email & Password or OAuth)
router.post("/register", authController.register);

// Login with email/password or OAuth token
router.post("/login", authController.login);

// Logout user
router.post("/logout", authController.logout);

// Get user profile
router.get("/profile", authController.getProfile);

// Reset password
router.post("/reset-password", authController.resetPassword);

// Google OAuth Login
router.get("/google", authController.googleAuth);

module.exports = router;

