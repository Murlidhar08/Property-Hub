const axios = require('axios');
const path = require("path");

const { oauth2Client } = require('../lib/googleClient');
const sendMail = require("../lib/nodemailer")
const commonFunction = require("../config/commonFunction");
const authService = require('../services/authService');
const config = require('../config/config')
const encryptionUtil = require('../config/encryptionUtil');

// services
const applicationService = require('../services/applicationService');

// Login user
exports.login = async (req, res) => {
    const { identifier, password } = req.body;

    try {
        let user = await authService.loginUser(identifier);

        // Verify Password
        let isMatched = await encryptionUtil.comparePassword(password, user.password)
        if (!isMatched)
            return res.status(401).json({
                success: false,
                message: "Invalid credentials. Please Try Again."
            });


        // Validate email verification
        if (!user.isVerified) {
            return res.json({
                success: false,
                message: 'pendingVerification',
                emailToken: generateUserToken({
                    email: user.email
                })
            });
        }

        // Validate for Approval
        let val = await applicationService.getMastersIdByName('pendingApproval');
        if (user.status == val) {
            return res.json({
                success: false,
                message: 'pendingApproval'
            });
        }

        // Generate the JWT
        const token = generateUserToken(user);

        // Return the token and user details
        res.json({
            success: true,
            message: "Login successful",
            token: token
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
        // Add token to Expired list
        await commonFunction.forceExpireToken(req.token);

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
        let finalPassword = await encryptionUtil.generatePasswordHash(password);

        // Add user to database
        await authService.registerUser({ firstName, lastName, username, email, finalPassword });

        // Send account verification mail
        await sendAccountVerificationMail(email);

        res.status(201).json({
            success: true,
            message: "User Registered successfully.",
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
        let token = req.token;

        // Validate email verification
        if (!user.isVerified) {
            return res.json({
                success: false,
                message: 'pendingVerification',
                token
            });
        }

        // Validate for Approval
        let val = await applicationService.getMastersIdByName('pendingApproval');
        if (user.status == val) {
            return res.json({
                success: false,
                message: 'pendingApproval'
            });
        }

        return res.json({
            success: true,
            user: getUserDetails(user)
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
        const token = generateUserToken(user);

        // Validate for Approval
        let val = await applicationService.getMastersIdByName('pendingApproval');
        if (user.status == val) {
            return res.json({
                success: false,
                message: 'pendingApproval'
            });
        }

        res.status(200).json({
            success: true,
            token,
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

        // Encrypt password
        let finalPassword = await encryptionUtil.generatePasswordHash(password);

        // Update password
        await authService.updatePassword(email, finalPassword);

        // Force expire token
        await commonFunction.forceExpireToken(token);

        return res.json({
            success: true,
            message: 'Password updated successfully.'
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Resend verification email
exports.resendVerification = async (req, res) => {
    try {
        const emailAddress = req.user.email;

        // Email Validate
        if (!emailAddress)
            return res.status(400).json({ error: "Email address is required" });

        // Validate email
        if (!commonFunction.isEmail(emailAddress)) {
            return res.status(400).json({ error: "Invalid Email" });
        }

        // send mail
        await sendAccountVerificationMail(emailAddress);

        // Force expire token
        await commonFunction.forceExpireToken(req.token);

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

// Send verify user email
exports.verifyAccount = async (req, res) => {
    try {
        const email = req.user.email;
        const verifyToken = req.token;

        // Email Validate
        if (!email)
            return res.status(400).json({ error: "Email address is required" });

        // Validate email
        if (!commonFunction.isEmail(email)) {
            return res.status(400).json({ error: "Invalid Email" });
        }

        // Update verification 
        await authService.updateVerifyStatus(email);

        // Force expire token
        await commonFunction.forceExpireToken(verifyToken);

        // Fetch user details
        let user = await authService.loginUser(email);
        let token = generateUserToken(user);

        res.json({
            success: true,
            message: 'Account verified',
            token
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.sqlMessage || err.message
        });
    }
};

// Verify Token
exports.verifyToken = async (req, res) => {
    res.json({ success: true });
};

// *****************
// HELPER FUNCTIONS
// *****************
// send Account verification mail
const sendAccountVerificationMail = async (emailAddress) => {
    const filePath = path.join(__dirname, "../templates", "verify_email.html");
    let template = commonFunction.getFileContent(filePath);

    // User details
    let userPayload = { email: emailAddress }
    let token = commonFunction.generateJwtToken(userPayload, config.JWT_VERIFY_EMAIL)
    let verifyUrl = `${process.env.BASE_URL}/verify-email?token=${token}`

    // Update template details
    template = template.replaceAll('[[url]]', verifyUrl)

    // send mail
    return await sendMail(emailAddress, "Verify Account", template);
}

// Generate user token
const generateUserToken = (user) => {
    return commonFunction.generateJwtToken({
        userId: user.userId,
        email: user.email,
        roleId: user.roleId,
        username: user.username,
        status: user.status
    });
}

// Get User details
const getUserDetails = (user) => {
    return {
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        roleId: user.roleId,
        roleName: user.roleName,
        status: user.status,
        profilePicture: user.profilePicture,
    };
}