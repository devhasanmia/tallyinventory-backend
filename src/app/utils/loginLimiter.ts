import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 1 minute window
    max: 1, // limit each IP to 1 request per windowMs
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            message: "Please wait 2 minute before your next login attempt.",
        });
    },
});
