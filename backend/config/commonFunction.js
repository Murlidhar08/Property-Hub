const config = require("./config")
const jwt = require('jsonwebtoken');
const fs = require("fs");

// Generate the JWT TOKEN
module.exports.generateJwtToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, config.JWT_OPTIONS);
};

// Get File content as text
module.exports.getFileContent = (filePath, encoding = 'utf8') => {
    return fs.readFileSync(filePath, encoding);
};