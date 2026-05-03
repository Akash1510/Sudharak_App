const CitizenService = require("../services/citizen.service");

class CitizenController {

  static async RequestOTP(req, res) {
    try {
      const { name, mobile_number, location } = req.body;

      if (!mobile_number) {
        return res.status(400).json({
          success: false,
          message: "Mobile Number is required",
        });
      }

      const response = await CitizenService.requestOTP({
        name,
        mobile_number,
        location,
      });

      return res.status(200).json({
        success: true,
        message: response.message,
      });
    } catch (error) {
      console.error("RequestOTP Error:", error.message);

      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async VerifyOTP(req, res) {
    try {
      const { mobile_number, otp } = req.body;

      if (!mobile_number || !otp) {
        return res.status(400).json({
          success: false,
          message: "Mobile Number and OTP are required",
        });
      }

      const response = await CitizenService.verifyOTP({
        mobile_number,
        otp,
      });

      return res.status(200).json({
        success: true,
        message: response.message,
        token: response.token,
        citizen_id: response.citizen_id,
      });
    } catch (error) {
      console.error("VerifyOTP Error:", error.message);

      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async UpdateProfile(req, res) {
    try {
      const user_id = req.user.id;
      const profileData = req.body;

      const result = await CitizenService.updateProfile(
        user_id,
        profileData
      );

      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: result,
      });
    } catch (error) {
      console.error("UpdateProfile Error:", error.message);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async GetProfile(req, res) {
    try {
      const user_id = req.user.id;

      const result = await CitizenService.getCitizenById(user_id);

      return res.status(200).json({
        success: true,
        data: result,
        message: "Profile fetched successfully",
      });
    } catch (error) {
      console.error("GetProfile Error:", error.message);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = CitizenController;