const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { queryDb } = require("../database/query.js");

const login = async ({ email, password }) => {

    const rows = await queryDb(
        `SELECT id, firstname, lastname, email, password_hash
     FROM user_table
     WHERE email = ?
     LIMIT 1`,
        [email]
    );

    if (rows.length === 0) {
        throw new Error("Invalid email or password");
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
        throw new Error("Invalid email or password");
    }

    const accessToken = jwt.sign(
        { userId: user.id },
        process.env.ACCESS_TOKEN,
        { expiresIn: '15m' }
    );
    const refreshToken = jwt.sign(
        { userId: user.id },
        process.env.REFRESH_TOKEN,
        { expiresIn: '1d' }
    );

    return { accessToken, refreshToken };
};

module.exports = {
    login
};