const { body, validationResult } = require("express-validator");
const AppError = require("../utils/AppError");

// Validation rules
const validateLogin = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
];

// Common validation handler
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(new AppError("Validation failed", 400, errors.array())
        );
    }

    next();
};

module.exports = {
    validateLogin,
    handleValidationErrors
};