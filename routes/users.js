const express = require("express");
const router = express();
const { queryDb } = require("../common.js")


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
        const query = `SELECT id, firstname, lastname, email FROM user_table WHERE email = ? AND password_hash = ? LIMIT 1`;
        const rows = await queryDb(query, [email, password]);

        // 3. Check if user exists
        if (rows.length === 0) {
            return res.status(401).json({
                error: 'Invalid email or password',
            });
        }

        // 4. Success response
        return res.status(200).json({
            success: true,
            user: rows[0],
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router