const jwt = require('jsonwebtoken');
const commonFunction = require('../config/commonFunction.js');

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ error: "No token provided" });
    }

    const jwtToken = token.split(' ')[1];
    commonFunction.verifyJwtToken(jwtToken, (err, decoded) => {
        if (err) {
            return res.status(500).json({ error: "Failed to authenticate token" });
        }

        // If everything is good, save the decoded information to request object
        req.user = decoded;
        next();
    });
};

module.exports = verifyToken;
