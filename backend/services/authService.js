const db = require("../lib/mySql");

// Login User
exports.loginUser = async (identifier) => {
    return new Promise((resolve, reject) => {
        db.query("CALL usp_userinfo_login(?)", [identifier], (err, results) => {
            if (err) return reject(err);

            resolve(results[0][0]);
        });
    });
}

// Register User
exports.registerUser = async ({ firstName, lastName, username, email, finalPassword }) => {
    return new Promise((resolve, reject) => {
        db.query("CALL usp_userinfo_register(?, ?, ?, ?, ?);",
            [firstName, lastName, username, email, finalPassword],
            (err, results) => {
                if (err) return reject(err);

                resolve(results[0][0]['userId']);
            });
    });
}

// Login with Google
exports.googleAuthLogin = async (user) => {
    const { providerUid, firstName, lastName, email, profilePicture } = user;
    return new Promise((resolve, reject) => {
        db.query("CALL usp_userinfo_google_auth(?, ?, ?, ?, ?)", [providerUid, firstName, lastName, email, profilePicture],
            (err, results) => {
                // Error handle
                if (err)
                    return reject(err);

                // User details
                resolve(results[0][0]);
            });
    });
};

// Update user password
exports.updatePassword = async (email, password) => {
    return new Promise((resolve, reject) => {
        db.query("CALL usp_userinfo_update_password(?, ?)",
            [email, password],
            (err, results) => {
                if (err) return reject(err);

                resolve(!!results.affectedRows);
            }
        );
    });
}

// TOKEN
// Add Expire Token
exports.addExpireToken = async (tokenHash, expiresAt) => {
    return new Promise((resolve, reject) => {
        db.query('CALL usp_expiredToken_add(?, ?)',
            [tokenHash, expiresAt],
            (err, results) => {
                if (err)
                    return reject(err)

                return resolve(results[0]);
            }
        );
    });
}

// verify expire token
exports.isTokenExpired = async (tokenHash) => {
    return new Promise((resolve, reject) => {
        db.query('CALL usp_expiredToken_verify(?)',
            [tokenHash],
            (err, results) => {
                if (err)
                    return reject(err);

                return resolve(!!results[0][0]['isExpired'])
            }
        );
    });
}

// Update verification 
exports.updateVerifyStatus = async (email) => {
    return new Promise((resolve, reject) => {
        db.query('CALL usp_userinfo_verify_user(?)',
            [email],
            (err, results) => {
                if (err)
                    return reject(err);

                return resolve(!!results.affectedRows)
            }
        );
    });
}