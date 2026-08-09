const express = require("express");
const router = express();
const { queryDb } = require("../database/query.js");
const { authenticate } = require("../middlewares/middleware.js");


/**
 * @swagger
 * /api/questions/get:
 *   get:
 *     summary: Get all questions
 *     description: Returns a list of all available questions and their answers.
 *     tags:
 *       - Questions
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Questions fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Question'
 *       '401':
 *         description: Bearer token required or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/get", async (req, res, next) => {
    try {
        const rows = await queryDb("SELECT question, answer FROM question_table");
        return res.json(rows);
    } catch (err) {
        // Forward database errors to the global error handler.
        next(err);
    }
});


module.exports = router