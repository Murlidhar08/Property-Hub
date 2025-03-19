const jwt = require('jsonwebtoken');

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ error: "No token provided" });
    }

    const secretKey = process.env.JWT_SECRET_KEY || 'your_secret_key';

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(500).json({ error: "Failed to authenticate token" });
        }

        // If everything is good, save the decoded information to request object
        req.user = decoded;
        next();
    });
};

module.exports = verifyToken;
