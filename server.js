const express = require("express");
const app = express();
const connection = require("./db.js");


app.get("/", (req, res) => {
    connection.query('SELECT * from persons LIMIT 1', (err, rows) => {
        if (err) throw err;
        console.log('The data from users table are: \n', rows);
        res.json(rows)
        connection.end();
    });
});

app.listen(3000, () => {
    console.log('Server is running at port 3000');
});
