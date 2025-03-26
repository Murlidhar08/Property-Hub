const commonFunction = require('../config/commonFunction.js');
const authService = require('../services/authService.js')

// Middleware to verify JWT
const verifyToken = async (req, res, next) => {
    const authorization = req.headers['authorization'];
    if (!authorization)
        return res.status(403).json({ error: "No token provided" });

    try {
        // Verify Token
        const token = authorization.split(' ')[1];
        let decoded = await commonFunction.verifyJwtToken(token);
        let tokenHash = await commonFunction.generateHash(token);

        // Check for token expired
        let isExpired = await authService.isTokenExpired(tokenHash);
        if (isExpired)
            return res.status(500).json({ success: false, message: "Token expired" });

        // Update request details
        req.user = decoded;
        req.token = token;
        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Invalid token"
        });
    }
};

module.exports = verifyToken;
