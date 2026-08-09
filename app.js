const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const { swaggerUi, swaggerSpec } = require("./config/swagger");

// Create express app
const app = express();

// CORS options
const corsOptions = require("./middlewares/corsOptions.js");

// Middleware for token authentication
const { middle, authenticate } = require("./middlewares/middleware.js");

// Parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'apiRequest.log'), { flags: 'a' });

// Security middleware
app.use(helmet());

// Logging middleware
app.use(morgan("combined", { stream: accessLogStream })); // Log to file

// Enable CORS with specific origin
app.use(cors(corsOptions)); // corsOptions should be defined in a separate file

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Public routes
app.use("/api/auth", require("./routes/authController.js"));

// Authentication Middleware
app.use(authenticate);

// Protected Routes
app.use("/api/users", require("./routes/users.js"));
app.use("/api/questions", require("./routes/questions.js"));

// 404 Handler
app.use((req, res) => {
    return res.status(404).json({
        error: "Route not found",
    });
});

// Global error handler
app.use((err, req, res, next) => {
    fs.createWriteStream(path.join(__dirname, 'errorLogs.log'), { flags: 'a' }).write(`${new Date().toISOString()} - ${err.message}\n`);
    res.status(500).json({ error: "Something went wrong!" });
});

module.exports = app;