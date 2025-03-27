const express = require("express");
const authController = require("../controller/authController.js");
const validator = require("../validators/jwtValidator.js");

const router = express.Router();

// Login with email/password or OAuth token
router.post("/login", authController.login);

// Google OAuth Login
router.post("/googleLogin", authController.googleLogin);

// Register a new user with Email & Password
router.post("/register", authController.register);

// Logout user
router.post("/logout", validator, authController.logout);

// Get user profile
router.get("/profile", validator, authController.getProfile);

// Forget password
router.post("/forget-password", authController.forgetPassword);

// Reset password
router.post("/reset-password", validator, authController.resetPassword);

// Send verification link
router.post("/resend-verification", validator, authController.resendVerification);

// Request to verify user account by validating header token
router.post("/verify-account", validator, authController.verifyAccount);

// Verify user account
router.post("/verify-token", validator, authController.verifyToken);

module.exports = router;

