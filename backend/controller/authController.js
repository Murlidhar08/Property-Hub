const db = require("../config/mySql");
const enums = require("../config/enums");

// Register a new user
exports.register = (req, res) => {
    const { firstName, lastName, email, username, password, providerId, providerUid, profilePicture, roleId } = req.body;

    const enProviderId = enums.providerType[providerId];
    const finalProviderUid = enProviderId === 1 ? null : providerUid;
    const finalProfilePicture = enProviderId === 1 ? null : profilePicture;
    const finalRoleId = enProviderId === 1 && !roleId ? 6 : roleId; // Default roleId to 6 (Client) if provider is Local

    db.query(
        "CALL usp_register_user(?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [firstName, lastName, email, username, password, enProviderId, finalProviderUid, finalProfilePicture, finalRoleId],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: "User registered successfully", userId: results[0][0].user_id });
        }
    );
};

// Login user
exports.login = (req, res) => {
    const { email, password } = req.body;

    db.query("CALL usp_login_user(?, ?)", [email, password], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results[0].length === 0) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        res.json(results[0][0]); // Return user details
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
