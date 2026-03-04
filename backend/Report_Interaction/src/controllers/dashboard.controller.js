const { uploadResolvedImage } = require("../services/s3.service");
const DashboardService = require("../services/dashboard.service");

class DashboardController {

  // ==========================================
  // GET REPORT LIST (Pagination + Filter)
  // ==========================================
  static async getReports(req, res, next) {
    try {
      const { status, page = 1, limit = 10 } = req.query;

      const result = await DashboardService.getReports({
        department: req.user.department,
        status,
        page: parseInt(page),
        limit: parseInt(limit)
      });

      return res.status(200).json({
        success: true,
        total: result.total,
        page: result.page,
        limit: result.limit,
        data: result.data
      });

    } catch (error) {
      next(error);
    }
  }


  // ==========================================
  // GET SINGLE REPORT
  // ==========================================
  static async getReport(req, res, next) {
    try {

      // reportExists middleware already attached report to req.report
      return res.status(200).json({
        success: true,
        data: req.report
      });

    } catch (error) {
      next(error);
    }
  }


  // ==========================================
  // UPDATE STATUS (Not RESOLVE)
  // ==========================================
  static async updateStatus(req, res, next) {
    try {

      const { status } = req.body;

      if (!status) {
        return res.status(400).json({
          success: false,
          message: "Status is required"
        });
      }

      const updated = await DashboardService.updateStatus(
        req.report,
        status
      );

      return res.status(200).json({
        success: true,
        message: "Status updated successfully",
        data: updated
      });

    } catch (error) {
      next(error);
    }
  }


  // ==========================================
  // RESOLVE REPORT (With Image Upload)
  // ==========================================
  static async resolveReport(req, res, next) {
    try {

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Resolved image is required"
        });
      }
      
      const reportId = req.params.report_id;

      // Upload to s3 
      const imageUrl = await uploadResolvedImage(req.file.path,
        reportId , req.file.mimetype
      );

      //  call service with s3 url

      const updated = await DashboardService.resolveReport(
        req.report,
        imageUrl,
        req.user.id
      );

      return res.status(200).json({
        success: true,
        message: "Report resolved successfully",
        data: updated
      });

    } catch (error) {
      next(error);
    }
  }


  // ==========================================
  // GET DASHBOARD STATS
  // ==========================================
  static async getDashboardStats(req, res, next) {
    try {

      const stats =
        await DashboardService.getDashboardStats(req.user.department);

      return res.status(200).json({
        success: true,
        data: stats
      });

    } catch (error) {
      next(error);
    }
  }

}

module.exports = DashboardController;
