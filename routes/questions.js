const express = require("express");
const router = express();
const { getQuestions } = require("../controllers/questionController");

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
router.get("/get", getQuestions);


module.exports = router