const allowedOrigins = ['http://localhost'];
const AppError = require("../utils/AppError.js");


const corsOptions = {
    origin: (origin, callback) => {
        console.log("CORS Origin:", origin);
        if (!origin || allowedOrigins.some(o => origin.includes(o))) {
            callback(null, true);
        } else {
            callback(new AppError("CORS: Origin not allowed", 403));
        }
    },
    credentials: true, // <- Very important if using cookies or auth headers
    optionsSuccessStatus: 200 // <- For legacy browsers (some old IE fail on 204)
};

module.exports = corsOptions;