const express = require("express");
const router = express.Router();

const ReportController = require("../controllers/report.controller");

// 🔐 Security Middlewares
const verifyToken = require("../middlewares/verifyToken.middleware");
const citizenOnly = require("../middlewares/citizenOnly.middleware");
const reportExists = require("../middlewares/reportExists.middleware");

// 🚦 Rate Limiter
const createRateLimiter = require("../middlewares/rateLimit.middleware");
const interactionLimiter = createRateLimiter(50, 10); // 50 req / 10 min


// ============================================
// PUBLIC ROUTE
// GET SINGLE REPORT INTERACTION DATA
// ============================================

router.get(
  "/:reportId",
  reportExists,
  ReportController.getPost
);

router.post("/interactions/bulk",ReportController.getBulkInteraction);

// ============================================
// PROTECTED ROUTES (Citizen Only)
// ============================================

// Apply auth + rate limit for below routes
router.use(verifyToken);
router.use(citizenOnly);
router.use(interactionLimiter);


// ============================================
// UPVOTE REPORT
// ============================================

router.post(
  "/:reportId/upvote",
  reportExists,
  ReportController.upvote
);


// ============================================
// REMOVE UPVOTE (Optional but Professional)
// ============================================

router.delete(
  "/:reportId/upvote",
  reportExists,
  ReportController.removeUpvote
);


// ============================================
// ADD COMMENT
// ============================================

router.post(
  "/:reportId/comment",
  reportExists,
  ReportController.addComment
);

// ============================================
// EDIT COMMENT
// ============================================

router.put(
  "/:reportId/comment/:commentId",
  reportExists,
  ReportController.EditComment
);


// ============================================
// DELETE COMMENT
// ============================================

router.delete(
  "/:reportId/comment/:commentId",
  reportExists,
  ReportController.DeleteComment
);


module.exports = router;
