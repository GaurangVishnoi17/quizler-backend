const connection = require('../config/db.js');

// Function to execute parameterized queries.
function queryDb(query, params = []) {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (err, rows) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                logger(query, params);
                resolve(rows);
            }
        });
    });
}

// Logger function to log executed queries.
function logger(query, params) {
    console.log('--- Query executed ---');
    console.log('SQL:', query);
    console.log('Params:', params);
};


module.exports = { queryDb, logger };