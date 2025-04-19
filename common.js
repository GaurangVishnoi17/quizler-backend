const connection = require('./db.js');

function queryDb(query) {
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                console.log('Query executed successfully:', query);
                resolve(rows);
            }
        });
    });
};
function logger(query) {
    console.log('---Query executed successfully:', query);
};


module.exports = { queryDb, logger };