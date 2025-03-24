const db = require("../config/mySql");

exports.getUserByEmail = async (email) => {
    return new Promise((resolve, reject) => {
        db.query("CALL usp_get_user_by_email(?)", [email], (err, results) => {
            // Error handle
            if (err)
                return reject(err.message);

            // User details
            resolve(results[0][0]);
        });
    });
};

exports.googleOauthLogin = async (user) => {
    const { providerId, providerUid, firstName, lastName, email, profilePicture } = user;
    return new Promise((resolve, reject) => {
        db.query("CALL usp_oauth_login(?, ?, ?, ?, ?, ?)", [providerId, providerUid, firstName, lastName, email, profilePicture], (err, results) => {
            // Error handle
            if (err)
                return reject(err.message);

            // User details
            resolve(results[0][0]);
        });
    });
};