require("dotenv").config();
const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({
            error: "Bearer token required"
        });
    }

    const token = authHeader.split(" ")[1];

    if (!token || token.trim() === "") {
        return res.status(401).json({
            error: "Bearer token missing"
        });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({
                    error: "Access token expired"
                });
            }

            return res.status(403).json({
                error: "Invalid token"
            });
        }

        req.user = decoded;
        next();
    });
}

module.exports = { authenticate };