const DashboardRepository = require("../repositories/dashboard.repository");

const VALID_STATUS = ["Pending", "In_Progress", "Resolved", "Rejected"];

class DashboardService {

  // ==========================================
  // GET REPORT LIST (WITH PAGINATION + FILTER)
  // ==========================================
  static async getReports({
    department,
    status,
    page = 1,
    limit = 10
  }) {

    if (!department) {
      throw new Error("Department is required");
    }

    return DashboardRepository.getReportsByDepartment({
      department,
      status,
      page,
      limit
    });
  }


  // ==========================================
  // GET SINGLE REPORT
  // (Department isolation handled in middleware)
  // ==========================================
  static async getReport(report_id) {

    if (!report_id) {
      throw new Error("Report ID is required");
    }

    return DashboardRepository.getReportById(report_id);
  }


  // ==========================================
  // UPDATE STATUS
  // (report document passed from middleware)
  // ==========================================
  static async updateStatus(report, new_status) {

    if (!new_status) {
      throw new Error("New status is required");
    }

    if (!VALID_STATUS.includes(new_status)) {
      throw new Error("Invalid status value");
    }

    if (new_status === "Resolved") {
      throw new Error("Use resolve API to mark as RESOLVED");
    }

    return DashboardRepository.updateStatus(report, new_status);
  }


  // ==========================================
  // RESOLVE REPORT
  // ==========================================
  static async resolveReport(report, resolved_image_url, admin_id) {

    if (!resolved_image_url) {
      throw new Error("Resolved image is required");
    }

    if (!admin_id) {
      throw new Error("Admin ID is required");
    }

    return DashboardRepository.resolveReport(
      report,
      resolved_image_url,
      admin_id
    );
  }


  // ==========================================
  // DASHBOARD STATS
  // ==========================================
  static async getDashboardStats(department) {

    if (!department) {
      throw new Error("Department is required");
    }

    return DashboardRepository.getDashboardStats(department);
  }

}

module.exports = DashboardService;
