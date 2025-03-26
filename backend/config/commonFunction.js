const config = require("./config")
const jwt = require('jsonwebtoken');
const fs = require("fs");
const validator = require('validator');
const crypto = require('crypto');

// Generate the JWT TOKEN
module.exports.generateJwtToken = (payload, options = config.JWT_OPTIONS) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, options);
};

// Verify the JWT TOKEN
module.exports.verifyJwtToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) return reject(err);

            return resolve(decoded);
        });
    });
};

// Get File content as text
module.exports.getFileContent = (filePath, encoding = 'utf8') => {
    return fs.readFileSync(filePath, encoding);
};

// Check for email validation
module.exports.isEmail = (email) => {
    return validator.isEmail(email);
};

// Check for email validation
module.exports.generateHash = (obj) => {
    return crypto.createHash('sha256').update(obj).digest('hex');
};

// Get token expire timestamp by calling verifyJwtToken
module.exports.tokenExpireTimestamp = async (token) => {
    try {
        const decoded = await module.exports.verifyJwtToken(token); // Calling function inside function
        return decoded.iat ? decoded.iat * 1000 : null; // Convert to milliseconds
    } catch (err) {
        return null; // Invalid token
    }
};