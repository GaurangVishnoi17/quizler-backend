const express = require("express");
const router = express();
const { queryDb } = require("../common.js")

router.get("/get", (req, res) => {
    queryDb('SELECT question, answer from question_table').then((rows) => {
        res.json(rows);
    }).catch((err) => {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Server Error: Something went wrong on our end. Please try again after sometime.' });
    });
});


module.exports = router