const express = require("express");
const router = express();
const { queryDb } = require("../common.js")


router.post('/login', (req, res, next) => {
    console.log(req.body);
    res.json('true');
});

module.exports = router