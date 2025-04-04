const db = require("../lib/mySql");

// Update user account details (firstName, lastName, username)
exports.updateUserInfo = async ({ userId, firstName, lastName, username }) => {
    return new Promise((resolve, reject) => {
        db.query("CALL usp_userinfo_update_profile(?, ?, ?, ?)",
            [userId, firstName, lastName, username],
            (err, results) => {
                if (err) return reject(err);

                resolve(results.affectedRows > 0);
            }
        );
    });
};

// Update user profile picture
exports.updateUserProfilePicture = async ({ userId, profilePicture }) => {
    return new Promise((resolve, reject) => {
        db.query("CALL usp_userinfo_update_profile_picture(?, ?)",
            [userId, profilePicture],
            (err, results) => {
                if (err) return reject(err);

                resolve(results.affectedRows > 0);
            }
        );
    });
};

