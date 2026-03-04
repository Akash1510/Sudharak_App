const rateLimit = require("express-rate-limit");

/**
 * 🚦 Rate Limit Middleware Factory
 *
 * Usage:
 *   const upvoteLimiter = createRateLimiter(20, 60);
 *   router.post("/upvote", upvoteLimiter, controller);
 */

const createRateLimiter = (maxRequests = 100, windowMinutes = 15) => {
  return rateLimit({
    windowMs: windowMinutes * 60 * 1000, // convert to ms
    max: maxRequests,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      return res.status(429).json({
        success: false,
        message: "Too many requests. Please try again later."
      });
    }
  });
};

module.exports = createRateLimiter;
