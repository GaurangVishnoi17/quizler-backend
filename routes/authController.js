require('dotenv').config();

const express = require("express");
const router = express();
const { queryDb } = require("../database/query.js");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { authenticate } = require("../middlewares/middleware.js");
const { validateLogin, handleValidationErrors } = require("../middlewares/validation");


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
router.post('/login', validateLogin, handleValidationErrors, async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // 1. Use parameterized query (prevents SQL injection)
        const query = `SELECT id, firstname, lastname, email, password_hash FROM user_table WHERE email = ?  LIMIT 1`;
        const rows = await queryDb(query, [email]);

        // 2. Check if user exists
        if (rows.length === 0) {
            return res.status(401).json({
                error: 'Invalid email or password',
            });
        }

        const user = rows[0];

        // 3. Compare password with hash
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({
                error: 'Invalid email or password',
            });
        }

        const accessToken = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ userId: user.id }, process.env.REFRESH_TOKEN, { expiresIn: '1d' });

        // Set refresh token in HTTP-only cookie. This should be done in web applications.
        // res.cookie('refreshToken', refreshToken, {
        //     httpOnly: true,
        //     // secure: true,        // true in production (HTTPS)
        //     sameSite: 'strict',  // or 'lax'
        //     path: '/refresh',    // VERY IMPORTANT
        //     maxAge: 24 * 60 * 60 * 1000 // 1 day
        // });

        // 4. Success response returns tokens
        return res.status(200).json({ accessToken, refreshToken });
    } catch (err) {
        console.log(err);
        next(err);
    }
});


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