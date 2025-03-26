const axios = require('axios');
const path = require("path");

const { oauth2Client } = require('../lib/googleClient');
const sendMail = require("../lib/nodemailer")
const commonFunction = require("../config/commonFunction");
const authService = require('../services/authService');
const config = require('../config/config')

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

// Logout User
exports.logout = async (req, res) => {
    try {
        let token = req.token;

        // Generate token hash
        let tokenHash = commonFunction.generateHash(token);
        let tokenExpireTimestamp = await commonFunction.tokenExpireTimestamp(token);

        // Add token to Expired list
        await authService.addExpireToken(tokenHash, tokenExpireTimestamp);

        return res.json({
            success: true,
            message: 'Successfully loged out.'
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
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

// Google authentication
exports.googleLogin = async (req, res, next) => {
    const { code } = req.body;

    try {
        const googleRes = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(googleRes.tokens);
        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        );
        const { id, given_name, family_name, email, picture } = userRes.data;

        const addUser = {
            providerUid: id,
            firstName: given_name,
            lastName: family_name,
            email,
            profilePicture: picture
        };

        // Add or Update user details
        let user = await authService.googleAuthLogin(addUser);

        const token = commonFunction.generateJwtToken({
            userId: user.userId,
            email: user.email,
            username: user.username,
            roleId: user.roleId,
            status: user.status
        });

        res.status(200).json({
            success: true,
            token,
            user,
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
};

// Forget password
exports.forgetPassword = async (req, res) => {
    try {
        const emailAddress = req.body.email;

        // Email Validate
        if (!emailAddress)
            return res.status(400).json({ error: "Email address is required" });

        // Validate email
        if (!commonFunction.isEmail(emailAddress)) {
            return res.status(400).json({ error: "Invalid Email" });
        }

        // Fetch user details
        let user = await authService.loginUser(emailAddress);
        if (!user) {
            return res.status(500).json({
                success: false,
                message: 'Invalid Email'
            });
        }

        // Send email
        const filePath = path.join(__dirname, "../templates", "reset_password.html");
        let template = commonFunction.getFileContent(filePath);

        // User details
        let userPayload = { email: user.email }
        let token = commonFunction.generateJwtToken(userPayload, config.JWT_RESET_PASSWORD)
        let resetUrl = `${process.env.BASE_URL}/reset-password?token=${token}`

        // Update template details
        template = template
            .replaceAll('[[user]]', user.firstName)
            .replaceAll('[[email]]', process.env.EMAILFROM)
            .replaceAll('[[url]]', resetUrl)

        // send mail
        const mailInfo = await sendMail(emailAddress, "Reset Password", template);

        res.json({
            success: true,
            message: 'Reset email sended.'
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.sqlMessage || err.message
        });
    }
};

// Reset password
exports.resetPassword = async (req, res) => {
    try {
        let { token, password } = req.body;
        let { email } = await commonFunction.verifyJwtToken(token);
        let status = await authService.updatePassword(email, password);

        return res.json({
            success: status,
            message: status ? 'Password updated successfully.' : 'Failed to updated password.'
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
