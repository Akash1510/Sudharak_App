/**
 * 🔐 Role Authorization Middleware
 *
 * Usage:
 *   authorizeRole("ADMIN")
 *   authorizeRole("CITIZEN")
 *   authorizeRole("ADMIN", "SUPER_ADMIN")
 */

const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      // =====================================
      // 1️⃣ Check if user exists (verifyToken must run before)
      // =====================================
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized. Please login first."
        });
      }

      const { role } = req.user;

      // =====================================
      // 2️⃣ Validate Role
      // =====================================
      if (!role || !allowedRoles.includes(role)) {
        return res.status(403).json({
          success: false,
          message: "Access denied. Insufficient permissions."
        });
      }

      // =====================================
      // 3️⃣ Role Authorized
      // =====================================
      next();

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Authorization failed."
      });
    }
  };
};

module.exports = authorizeRole;
