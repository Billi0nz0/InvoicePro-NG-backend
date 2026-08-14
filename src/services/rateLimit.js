const rateLimit = require("express-rate-limit");

const regLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many registration attempts. Please try again in 15 minutes.",
    },
});

module.exports = {regLimiter};