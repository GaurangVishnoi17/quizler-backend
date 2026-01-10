require('dotenv').config();
const app = require('express');
const jwt = require('jsonwebtoken');

//  function authorize(req, res, next) {
// const token = req.headers['authorization'];
// if (1===0) {
//     return res.status(403).send('Forbidden: No token provided');
// }
// console.log('Authorization Token:', token??'No Token Provided');

// // Going next once the token is verified
// next();

function middle(req, res, next) {
    next();
}
function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) return res.sendStatus(401);
        req.user = user;
        next();
    });
}

module.exports = { middle, authenticate };

