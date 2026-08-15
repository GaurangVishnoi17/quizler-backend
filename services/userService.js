const { queryDb } = require("../database/query.js");


const getUserProfile = async (userId) => {
        const rows = await queryDb(`SELECT id, firstname, lastname, email  FROM user_table  WHERE id = ? LIMIT 1`, [userId]);
        if (!rows.length) {
            throw new Error("User not found");
        }
        return rows[0];
}


module.exports = {
    getUserProfile
};