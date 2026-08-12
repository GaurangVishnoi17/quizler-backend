const express = require("express");
const router = express.Router();

const { login } = require("../controllers/authController");
const { validateLogin, handleValidationErrors } = require("../middlewares/validation");
const jwt = require("jsonwebtoken");


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Authenticate a user
 *     description: Authenticates a user using email and password and returns JWT access and refresh tokens.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       '200':
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       '400':
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       '401':
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post(
    "/login",
    validateLogin,
    handleValidationErrors,
    login
);


router.post('/refresh', (req, res) => {
    const { refreshToken } = req.body;

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
        if (err) return res.sendStatus(403);
        const newAccessToken = jwt.sign(
            { userId: decoded.userId },
            process.env.ACCESS_TOKEN,
            { expiresIn: '15m' }
        );
        res.json({ accessToken: newAccessToken });
    });
});


module.exports = router