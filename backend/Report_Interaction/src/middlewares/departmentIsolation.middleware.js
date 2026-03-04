/**
 * 🏢 Department Isolation Middleware
 *
 * Ensures admin can only access reports
 * belonging to their assigned department.
 */

const departmentIsolation = (req, res, next) => {
  try {
    // =====================================
    // 1️⃣ Ensure user + report exist
    // =====================================
    if (!req.user || !req.report) {
      return res.status(500).json({
        success: false,
        message: "Middleware order incorrect"
      });
    }

    const adminDepartment = req.user.department;
    const reportDepartment = req.report.department;

    // =====================================
    // 2️⃣ Compare Departments
    // =====================================
    if (!adminDepartment || adminDepartment !== reportDepartment) {
      return res.status(403).json({
        success: false,
        message: "Access denied: Report belongs to another department"
      });
    }

    // =====================================
    // 3️⃣ Access Granted
    // =====================================
    next();

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Department validation failed"
    });
  }
};

module.exports = departmentIsolation;
