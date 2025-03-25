const commonFunction = require('../config/commonFunction.js');

// Middleware to verify JWT
const verifyToken = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token)
        return res.status(403).json({ error: "No token provided" });

    try {
        const jwtToken = token.split(' ')[1];
        let decoded = await commonFunction.verifyJwtToken(jwtToken);

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(500).json({ error: "Failed to authenticate token" });
    }

};

module.exports = verifyToken;
