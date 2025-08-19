import rateLimit from "express-rate-limit";

export default rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5,
    message: "Trop de tentatives. Réessayez plus tard.",
});
