const express = require("express");
const router = express();
const { queryDb } = require("../common.js");
const bcrypt = require("bcrypt");


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

        // 3. Remove sensitive data
        delete user.password_hash;

        // 4. Success response
        return res.status(200).json({
            success: true,
            user: user,
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router