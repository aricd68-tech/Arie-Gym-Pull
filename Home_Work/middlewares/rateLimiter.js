import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // חלון זמן של 15 דקות
    max: 10, // מקסימום 10 בקשות לכתובת IP
    message: {
        error: "Too many requests from this IP, please try again after 15 minutes."
    },
    standardHeaders: true,
    legacyHeaders: false
});
