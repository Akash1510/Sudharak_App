const jwt = require("jsonwebtoken");

/**
 * 🔐 Verify JWT Token Middleware
 * 
 * - Extracts token from Authorization header
 * - Verifies token
 * - Attaches decoded user data to req.user
 * - Handles expired & invalid tokens
 */

const verifyToken = (req, res, next) => {
  try {
    // =====================================
    // 1️⃣ Extract Authorization Header
    // =====================================
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided."
      });
    }

    // =====================================
    // 2️⃣ Extract Token
    // =====================================
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format."
      });
    }

    // =====================================
    // 3️⃣ Verify Token
    // =====================================
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    /**
     * Expected Token Payload Structure:
     * {
     *   id: "citizen_or_admin_id",
     *   role: "CITIZEN" | "ADMIN",
     *   department?: "GARBAGE" (only for admin)
     * }
     */

    // =====================================
    // 4️⃣ Attach User to Request
    // =====================================
    req.user = {
      id: decoded.id,
      role: decoded.role,
      department: decoded.department || null
    };

    // =====================================
    // 5️⃣ Continue
    // =====================================
    next();

  } catch (error) {

    // =====================================
    // Token Expired
    // =====================================
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired. Please login again."
      });
    }

    // =====================================
    // Invalid Token
    // =====================================
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token."
      });
    }

    // =====================================
    // Unknown Error
    // =====================================
    return res.status(500).json({
      success: false,
      message: "Authentication failed."
    });
  }
};

module.exports = verifyToken;
