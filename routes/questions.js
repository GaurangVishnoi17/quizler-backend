const express = require("express");
const router = express();
const { queryDb } = require("../common.js")

router.get("/get", (req, res, next) => {
    queryDb('SELECT question, answer from question_table').then((rows) => {
        res.json(rows);
    }).catch((err) => {
        next(err);
        // res.status(500).json({ error: 'Server Error: Something went wrong on our end. Please try again after sometime.' });
    });
});


module.exports = router