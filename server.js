const express = require("express");
const app = express();

// Enable below line to enable CORS
const cors = require('cors');
app.use(cors());  

const question = require('./routes/questions.js');

app.use('/api/questions', question);

app.listen(3000, (err) => {
    if(err) throw err;
    console.log('Server is running at port 3000');
});
