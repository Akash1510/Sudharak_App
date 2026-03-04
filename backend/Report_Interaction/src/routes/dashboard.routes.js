const express = require("express");
const router = express.Router();

const DashboardController = require("../controllers/dashboard.controller");

// 🔐 Security Middlewares
const verifyToken = require("../middlewares/verifyToken.middleware");
const adminOnly = require("../middlewares/adminOnly.middleware");
const reportExists = require("../middlewares/reportExists.middleware");
const departmentIsolation = require("../middlewares/departmentIsolation.middleware");

// 📁 File Upload Middleware
const upload = require("../middlewares/uploadValidation.middleware");

// 🚦 Rate Limiter
const createRateLimiter = require("../middlewares/rateLimit.middleware");
const dashboardLimiter = createRateLimiter(100, 15); // 100 req / 15 min

// ============================================
// APPLY GLOBAL MIDDLEWARES FOR DASHBOARD
// ============================================

router.use(verifyToken);     // JWT Verification
router.use(adminOnly);       // Only Admin Access
router.use(dashboardLimiter); // Rate limit protection


// ============================================
// GET ALL REPORTS
// Example:
// /dashboard?page=1&limit=10&status=PENDING
// ============================================

router.get("/reports", DashboardController.getReports);


// ============================================
// GET DASHBOARD STATS
// ============================================

router.get("/stats", DashboardController.getDashboardStats);


// ============================================
// GET SINGLE REPORT
// ============================================

router.get(
  "/:reportId",
  reportExists,
  departmentIsolation,
  DashboardController.getReport
);


// ============================================
// UPDATE STATUS (NOT RESOLVE)
// Body: { "status": "IN_PROGRESS" }
// ============================================

router.patch(
  "/:reportId/status",
  reportExists,
  departmentIsolation,
  DashboardController.updateStatus
);


// ============================================
// RESOLVE REPORT (WITH IMAGE)
// Form-data: resolved_image (file)
// ============================================

router.patch(
  "/:reportId/resolve",
  reportExists,
  departmentIsolation,
  // name of the file while upload the image
  upload.single("resolved_image"),
  DashboardController.resolveReport
);


module.exports = router;
