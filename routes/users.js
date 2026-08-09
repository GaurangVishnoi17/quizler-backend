require('dotenv').config();

const express = require("express");
const router = express();
const { queryDb } = require("../database/query.js");


/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get authenticated user's profile
 *     description: Returns the profile of the currently authenticated user.
 *     tags:
 *       - Authentication
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: User profile fetched successfully
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Invalid or expired token
 */
router.get('/profile', async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const rows = await queryDb(`SELECT id, firstname, lastname, email  FROM user_table  WHERE id = ? LIMIT 1`, [userId]);
        if (!rows.length) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        next(err);
    }
});

module.exports = router