const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'gaurang',
  password : 'gv17',
  database : 'quizler'
});

connection.connect((err) => {
    if(err) throw err;
    console.log('Connected to MySQL Server!');
});

module.exports = connection;