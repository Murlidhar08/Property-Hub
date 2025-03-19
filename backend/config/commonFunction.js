const config = require("./config")
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

// Generate the JWT TOKEN
module.exports.generateJwtToken = (payload) => {
    return jwt.sign(payload, secretKey, config.JWT_OPTIONS);
};
