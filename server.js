const app = require("./app.js");


// Start server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});


// Graceful Shutdown
process.on("SIGTERM", () => {
    console.log("Server is shutting down...");

    server.close(() => {
        console.log("Server closed successfully.");
        process.exit(0);
    });
});