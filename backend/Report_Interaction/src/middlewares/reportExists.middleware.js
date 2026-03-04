const ReportModel = require("../models/report.model");

/**
 * 📌 Report Exists Middleware
 *
 * - Validates reportId param
 * - Checks if report exists in DB
 * - Attaches report document to req.report
 */

const reportExists = async (req, res, next) => {
  try {
    const { reportId } = req.params;

    // =====================================
    // 1️⃣ Validate reportId
    // =====================================
    if (!reportId || typeof reportId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid report ID"
      });
    }

    // =====================================
    // 2️⃣ Find Report
    // =====================================
    const report = await ReportModel.findOne({ report_id: reportId });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found"
      });
    }

    // =====================================
    // 3️⃣ Attach to request
    // =====================================
    req.report = report;

    next();

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error checking report"
    });
  }
};

module.exports = reportExists;
