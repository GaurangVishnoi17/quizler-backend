const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

// CORS options
const corsOptions = require("./middlewares/corsOptions.js");
// Middleware for token authentication
const authmid = require("./middlewares/middleware.js");

app.use(express.urlencoded({ extended: true }));

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'apiRequest.log'), { flags: 'a' })

// Security middleware
app.use(helmet());

// Logging middleware
app.use(morgan("combined", { stream: accessLogStream })); // Log to file

// Enable CORS with specific origin
app.use(cors(corsOptions)); // corsOptions should be defined in a separate file

// Middleware
app.use(authmid);

// Routes
app.use("/api/questions", require("./routes/questions.js"));
app.use("/api/users", require("./routes/users.js"));

// Global error handler
app.use((err, req, res, next) => {
    fs.createWriteStream(path.join(__dirname, 'errorLogs.log'), { flags: 'a' }).write(`${new Date().toISOString()} - ${err.message}\n`);
    res.status(500).send({ error: "Something went wrong!" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
    console.log("Server is shutting down...");
    process.exit(0);
});