const db = require("../config/mySql");
const enums = require("../config/enums");
const commonFunction = require("../config/commonFunction");
const sendMail = require("../lib/nodemailer")
const { oauth2Client } = require('../lib/googleClient');
const path = require("path");
const authService = require('../services/authService');
const axios = require('axios');

// Login user
exports.login = async (req, res) => {
    const { identifier, password } = req.body;

    try {
        let user = await authService.loginUser(identifier);

        // Verify Password
        if (password != user.password)
            return res.status(401).json({
                success: false,
                message: "Invalid credentials. Please Try Again."
            });

        let userDetails = {
            userId: user.userId,
            email: user.email,
            username: user.username,
            roleId: user.roleId,
            status: user.status
        };

        // Generate the JWT
        const token = commonFunction.generateJwtToken(userDetails);

        // Return the token and user details
        res.json({
            success: true,
            message: "Login successful",
            token: token,
            user: {
                ...userDetails,
                firstName: user.firstName,
                lastName: user.lastName,
                profilePicture: user.profilePicture
            }
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.sqlMessage || err.message
        });
    }
};

// Register a new user
exports.register = async (req, res) => {
    const { firstName, lastName, email, username, password } = req.body;

    try {
        // Encrypt password 
        let finalPassword = password;

        // Add user to database
        let userId = await authService.registerUser({ firstName, lastName, username, email, finalPassword });

        res.status(201).json({
            success: true,
            message: "User Registered successfully.",
            userId: userId
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.sqlMessage
        })
    }
};

// Get user profile
exports.getProfile = async (req, res) => {
    const email = req.user.email;
    try {
        let user = await authService.loginUser(email);
        return res.json({
            success: true,
            user: {
                userId: user.userId,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                username: user.username,
                roleId: user.roleId,
                status: user.status,
                profilePicture: user.profilePicture
            }
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.sqlMessage || err.message
        });
    }
};

// Logout user
exports.logout = (req, res) => {
    res.json({ message: "Logged out successfully" });
};

// Reset password
exports.resetPassword = async (req, res) => {
    const emailAddress = req.body.email;

    // Email Validate
    if (!emailAddress)
        return res.status(400).json({ error: "Email address is required" });

    // Send email
    const filePath = path.join(__dirname, "../templates", "reset_password.html");
    const template = commonFunction.getFileContent(filePath);
    const mailInfo = await sendMail(emailAddress, "Reset Password", template);

    res.json({ ...mailInfo });
};

// Google authentication
exports.googleAuth = async (req, res, next) => {
    const code = req.query.code;

    try {
        const googleRes = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(googleRes.tokens);
        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        );
        const { id, given_name, family_name, email, name, picture } = userRes.data;
        // console.log(userRes);
        let user = await authService.getUserByEmail(email);

        if (!user) {
            // Add User
            const addUser = { providerId: 2, providerUid: id, firstName: given_name, lastName: family_name, email, profilePicture: picture };
            user = await authService.googleOauthLogin(addUser);
        }

        const token = commonFunction.generateJwtToken({
            userId: user.id,
            email: user.email,
            username: user.username,
            roleId: user.role_id
        });

        res.status(200).json({
            message: 'success',
            token,
            user,
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
};