require('dotenv').config();

const express = require("express");
const router = express();
const { queryDb } = require("../common.js");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { authenticate } = require("../middlewares/middleware.js");


router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // 1. Validate input
        if (!email || !password) {
            return res.status(400).json({
                error: 'Email and password are required',
            });
        }

        // 2. Use parameterized query (prevents SQL injection)
        const query = `SELECT id, firstname, lastname, email, password_hash FROM user_table WHERE email = ?  LIMIT 1`;
        const rows = await queryDb(query, [email]);

        // 3. Check if user exists
        if (rows.length === 0) {
            return res.status(401).json({
                error: 'Invalid email or password',
            });
        }

        const user = rows[0];

        // 4. Compare password with hash
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({
                error: 'Invalid email or password',
            });
        }

        const accessToken = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ userId: user.id }, process.env.REFRESH_TOKEN, { expiresIn: '1d' });

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


router.get('/profile', authenticate, async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const rows = await queryDb(`SELECT id, firstname, lastname, email  FROM user_table  WHERE id = ? LIMIT 1`, [userId]
        );
        if (!rows.length) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        next(err);
    }
});

module.exports = router