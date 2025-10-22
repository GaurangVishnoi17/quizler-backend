const allowedOrigins = ['http://localhost'];

const corsOptions = {
    origin: (origin, callback) => {
        console.log('CORS Origin:', origin);
        if (!origin || allowedOrigins.some(o => origin.includes(o))) {
            callback(null, true); // Allow request
        } else {
            callback(new Error('Not allowed by CORS')); // Block request
        }
    },
    credentials: true, // <- Very important if using cookies or auth headers
    optionsSuccessStatus: 200 // <- For legacy browsers (some old IE fail on 204)
};

module.exports = corsOptions;