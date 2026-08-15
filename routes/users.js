const express = require("express");
const router = express();
const { getUserProfile } = require("../controllers/userController");


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
router.get('/profile', getUserProfile);

module.exports = router