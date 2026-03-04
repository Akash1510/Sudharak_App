/**
 * 👤 Citizen Only Middleware
 *
 * Ensures only users with role "CITIZEN" can access the route.
 * Must be used AFTER verifyToken middleware.
 */

const citizenOnly = (req, res, next) => {
  try {
    // =====================================
    // 1️⃣ Check Authentication
    // =====================================
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please login first."
      });
    }

    // =====================================
    // 2️⃣ Check Role
    // =====================================
    if (req.user.role !== "CITIZEN") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Citizen account required."
      });
    }

    // =====================================
    // 3️⃣ Access Granted
    // =====================================
    next();

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Authorization error."
    });
  }
};

module.exports = citizenOnly;
