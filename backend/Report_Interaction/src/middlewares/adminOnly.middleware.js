/**
 * 🛡 Admin Only Middleware
 *
 * Ensures only users with role "ADMIN" can access the route.
 * Must be used AFTER verifyToken middleware.
 */

const adminOnly = (req, res, next) => {
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
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin privileges required."
      });
    }

    // =====================================
    // 3️⃣ Optional: Department Check (Future Safe)
    // =====================================
    if (!req.user.department) {
      return res.status(403).json({
        success: false,
        message: "Admin department not assigned."
      });
    }

    // =====================================
    // 4️⃣ Access Granted
    // =====================================
    next();

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Authorization error."
    });
  }
};

module.exports = adminOnly;
