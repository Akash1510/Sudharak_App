const PostModel = require("../models/report.model");
const DashboardReportEntity = require("../entities/dashboardreport.entity");
const DashboardStatsEntity = require("../entities/dashboard-stats.entity");
const path = require("path");
const VALID_STATUS = ["Pending", "In_Progress", "Resolved", "Rejected"];

class DashboardRepository {

  // ========================================
  // GET REPORTS BY DEPARTMENT (WITH FILTER + PAGINATION)
  // ========================================
  static async getReportsByDepartment({
    department,
    status = null,
    page = 1,
    limit = 10
  }) {

    if (!department) {
      throw new Error("Department is required");
    }

    const query = { department };

    if (status) {
      if (status !== "ALL" && !VALID_STATUS.includes(status)) {
        throw new Error("Invalid status filter");
      }

      if (status !== "ALL") {
        query.status = status;
      }
    }

    const skip = (page - 1) * limit;

    const reports = await PostModel.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await PostModel.countDocuments(query);

    return {
      total,
      page,
      limit,
      data: reports.map(report => new DashboardReportEntity(report))
    };
  }

  // ========================================
  // GET SINGLE REPORT (ENTITY WRAPPED)
  // ========================================
  static async getReportById(report_id) {

    if (!report_id) {
      throw new Error("Report ID is required");
    }

    const report = await PostModel.findOne({ report_id });

    if (!report) {
      throw new Error("Report not found");
    }

    return new DashboardReportEntity(report);
  }

  // ========================================
  // UPDATE STATUS (ENTITY RETURN)
  // ========================================
  static async updateStatus(report, new_status) {

    if (!VALID_STATUS.includes(new_status)) {
      throw new Error("Invalid status value");
    }

    if (report.status === "Resolved") {
      throw new Error("Resolved report cannot be modified");
    }

    if (report.status === new_status) {
      return new DashboardReportEntity(report);
    }

    report.status = new_status;
    report.updatedAt = new Date();

    const updated = await report.save();

    return new DashboardReportEntity(updated);
  }

  // ========================================
  // RESOLVE REPORT (ENTITY RETURN)
  // ========================================
  static async resolveReport(report, resolved_image_url, admin_id) {

    if (!resolved_image_url) {
      throw new Error("Resolved image is required");
    }

    if (!admin_id) {
      throw new Error("Admin ID is required");
    }

    if (report.status === "Resolved") {
      throw new Error("Report already resolved");
    }

  


    report.status = "Resolved";
    report.resolved_image = resolved_image_url;
    report.resolved_by = admin_id;
    report.resolved_at = new Date();
    report.updatedAt = new Date();

    const updated = await report.save();

    return new DashboardReportEntity(updated);
  }

  // ========================================
  // DASHBOARD STATS (RETURN ENTITY)
  // ========================================
  static async getDashboardStats(department) {

    if (!department) {
      throw new Error("Department is required");
    }

    const stats = await PostModel.aggregate([
      { $match: { department } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    const formatted = {
      total: 0,
      pending: 0,
      in_progress: 0,
      resolved: 0,
      rejected: 0
    };

    stats.forEach(item => {
      formatted.total += item.count;

      switch (item._id) {
        case "Pending":
          formatted.pending = item.count;
          break;
        case "In_Progress":
          formatted.in_progress = item.count;
          break;
        case "Resolved":
          formatted.resolved = item.count;
          break;
        case "Rejected":
          formatted.rejected = item.count;
          break;
      }
    });

    return new DashboardStatsEntity(formatted);
  }

}

module.exports = DashboardRepository;
