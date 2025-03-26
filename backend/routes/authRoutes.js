const express = require("express");
const authController = require("../controller/authController.js");
const validator = require("../validators/jwtValidator.js");

const router = express.Router();

// Login with email/password or OAuth token
router.post("/login", authController.login);

// Logout user
router.post("/logout", validator, authController.logout);

// Register a new user (Email & Password or OAuth)
router.post("/register", authController.register);

// Get user profile
router.get("/profile", validator, authController.getProfile);

// Google OAuth Login
router.post("/googleLogin", authController.googleLogin);

// Forget password
router.post("/forget-password", authController.forgetPassword);

// Reset password
router.post("/reset-password", authController.resetPassword);

module.exports = router;

