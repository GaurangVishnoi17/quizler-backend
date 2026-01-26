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
const { middle, authenticate } = require("./middlewares/middleware.js");

app.use(express.json());
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
app.use("/api/auth", require("./routes/authController.js"));
app.use(authenticate);

// Routes
app.use("/api/users", require("./routes/users.js"));
app.use("/api/questions", require("./routes/questions.js"));

// Route not found handler
app.use((req, res, next) => {
  const error = new Error('Route not found');
  error.status = 404;
  return res.status(404).send({ error: 'Route not found' });
});

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