const db = require("../config/mySql");
const enums = require("../config/enums");
const commonFunction = require("../config/commonFunction");
const sendMail = require("../lib/nodemailer")
const path = require("path");

// Register a new user
exports.register = (req, res) => {
    const { firstName, lastName, email, username, password, providerId, providerUid, profilePicture, roleId } = req.body;

    const enProviderId = enums.providerType[providerId];
    const finalProviderUid = enProviderId === 1 ? null : providerUid;
    const finalProfilePicture = enProviderId === 1 ? null : profilePicture;
    const finalRoleId = enProviderId === 1 && !roleId ? 6 : roleId; // Default roleId to 6 (Client) if provider is Local
    const finalPassword = enProviderId === 1 ? null : profilePicture;

    db.query(
        "CALL usp_register_user(?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [firstName, lastName, email, username, finalPassword, enProviderId, finalProviderUid, finalProfilePicture, finalRoleId],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: "User registered successfully", userId: results[0][0].user_id });
        }
    );
};

// Login user
exports.login = (req, res) => {
    const { identifier, password } = req.body;

    db.query("CALL usp_login_user(?, ?)", [identifier, password], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (results[0].length === 0) {
            return res.status(401).json({ error: "Invalid email/username or password" });
        }

        const user = results[0][0];

        // Generate the JWT
        const token = commonFunction.generateJwtToken({
            userId: user.user_id,
            email: user.email,
            username: user.username,
            roleId: user.role_id
        });

        // Return the token and user details
        res.json({
            message: "Login successful",
            token: token,
            user: {
                id: user.user_id,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                username: user.username,
                roleId: user.role_id
            }
        });
    });
};


// Google/Facebook OAuth Login
exports.oauthLogin = (req, res) => {
    const { providerId, providerUid, firstName, lastName, email, profilePicture } = req.body;

    db.query(
        "CALL usp_oauth_login(?, ?, ?, ?, ?, ?)",
        [providerId, providerUid, firstName, lastName, email, profilePicture],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });

            res.json(results[0][0]); // Return user details
        }
    );
};

// Get user profile
exports.getProfile = (req, res) => {
    const userId = req.user.id;

    db.query("CALL usp_get_user_profile(?)", [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json(results[0][0]); // Return user profile
    });
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
