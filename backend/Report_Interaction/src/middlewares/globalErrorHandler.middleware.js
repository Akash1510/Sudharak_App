/**
 * 🌍 Global Error Handler Middleware
 *
 * Must be used at the END of app.js
 */

const globalErrorHandler = (err, req, res, next) => {

  console.error("🔥 Error:", err);

  // Multer file error
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      success: false,
      message: "File too large. Max size is 5MB."
    });
  }

  // Multer file type error
  if (err.message && err.message.includes("Only JPG")) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid token."
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Token expired."
    });
  }

  // Default
  return res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
};

module.exports = globalErrorHandler;
