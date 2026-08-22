require("dotenv").config();
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError.js");

function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        return next(new AppError("Unauthorized: Bearer token missing", 401));
    }

    const token = authHeader.split(" ")[1];

    if (!token || token.trim() === "") {
        return next(new AppError("Unauthorized: Bearer token missing", 401));
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                return next(new AppError("Unauthorized: Access token expired", 401));
            }
            return next(new AppError("Unauthorized: Invalid access token", 401));
        }

        req.user = decoded;
        next();
    });
}

module.exports = { authenticate };