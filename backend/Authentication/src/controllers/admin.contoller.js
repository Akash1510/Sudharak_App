const AdminService = require("../services/admin.service");

class AdminController {
  // Admin Login Controller

  static async AdminLogin(req, res) {
    try {
      const { username, password } = req.body;
      const result = await AdminService.AdminLogin({
        username,
        password
      });

      return res.status(200).json({
        success: true,
        message: "Admin Logged In Successfully",
        token : result.token,
        admin:result.admin
        
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Create Admin Controller

  static async CreateAdmin(req, res) {
    try {
      const { name, username, password, department } = req.body;
      const admin = await AdminService.CreateAdmin({
        name,
        username,
        password,
        department,
      });

      return res.status(200).json({
        success: true,
        message: "Admin Created Successfully",
        data: admin,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = AdminController;
