const accountService = require("../services/accountService");
const { moveFilesWithRename } = require("../config/fileOperations");

// Utility function for validating user data
const validateUserData = (data) => {
    const { firstName, lastName, username } = data;

    if (!firstName || firstName.length < 2) {
        return "First name must be at least 2 characters long.";
    }
    if (!lastName || lastName.length < 2) {
        return "Last name must be at least 2 characters long.";
    }
    if (!username || username.length < 3) {
        return "Username must be at least 3 characters long.";
    }
    return null;
};

// Update User Information
exports.updateUserInfo = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { firstName, lastName, username } = req.body;

        if (!userId || isNaN(userId)) {
            return res.status(400).json({ success: false, message: "Invalid user ID." });
        }

        // Validate input data
        const validationError = validateUserData(req.body);
        if (validationError) {
            return res.status(400).json({
                success: false,
                message: validationError
            });
        }

        let updated = await accountService.updateUserInfo({ userId, firstName, lastName, username });
        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "User not found or not updated."
            });
        }

        return res.json({
            success: true,
            message: "User information updated successfully."
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.sqlMessage || err.message,
        });
    }
};

// Update Profile iamge
exports.updateProfileImage = async (req, res) => {
    try {
        const userId = req.user.userId;
        const images = req.files ? `/temp/${req.files[0].filename}` : '';

        // Move file to users location
        let profilePicture = await moveFilesWithRename(images, '/profile/', userId);
        let status = await accountService.updateUserProfilePicture({
            userId,
            profilePicture
        })

        return res.json({
            success: !!status,
            message: "User profile updated successfully."
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.sqlMessage || err.message,
        });
    }
};
