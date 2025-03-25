const config = require("./config")
const jwt = require('jsonwebtoken');
const fs = require("fs");
const validator = require('validator');

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