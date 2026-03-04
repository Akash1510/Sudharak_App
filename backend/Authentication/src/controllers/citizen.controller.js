const CitizenService = require("../services/citizen.service");

class CitizenController {
  // Request OTP for Signup or login

  static async RequestOTP(req, res) {
    try {
      const { name, mobile_number ,location} = req.body;

      if (!mobile_number) {
        return res.status(400).json({
          STATUS: "Failed",
          MESSAGE: "Mobile Number is required",
        });
      }

      const response = await CitizenService.requestOTP({ name, mobile_number ,location});

      return res.status(200).json({
        STATUS: "Success",
        MESSAGE: response.message
      });
    } catch (error) {
      console.log("Error in Request OTP Citizen Controller:", error.message);
      return res.status(401).json({
        STATUS: "Failed",
        MESSAGE: error.message,
      });
    }
  }

  // Verify OTP for Login confirmation

  static async VerifyOTP(req, res) {
    try {
      const { mobile_number, otp } = req.body;

      if (!mobile_number || !otp) {
        return res.status(400).json({
          STATUS: "Failed",
          MESSAGE: "Mobile Number and OTP are required",
        });
      }

      const response = await CitizenService.verifyOTP({
        mobile_number,
        otp,
      });

      return res.status(200).json({
        STATUS: "Success",
        MESSAGE: response.message,
        TOKEN: response.token,
        CITIZEN_ID: response.citizen,
      });
    } catch (error) {
      console.log("Error in Verify OTP Citizen Controller:", error.message);
      return res.status(401).json({
        STATUS: "Failed",
        MESSAGE: error.message,
      });
    }
  }



// Update Profile

static async UpdateProfile(req,res){
  try {
     const user_id = req.user.id;
     const profileData = req.body;

     const result = await CitizenService.updateProfile(user_id,profileData);

     return res.status(200).json({
      success:true,
      message:"Profile updated Successfully",
      data:result
     });
  } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
  }
}
}

module.exports = CitizenController;
