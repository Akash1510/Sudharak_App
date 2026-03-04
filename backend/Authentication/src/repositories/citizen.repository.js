
const CitizenModel = require('../models/cititzen.model');
const CitizenEntity = require('../entities/citizen.entity');

class CitizenRepository {


    // find Citizen By Mobile Number

    static async findByMobileNumber(mobile_number) {
        const CitizenData = await CitizenModel.findOne({ mobile_number });
        return CitizenData ? new CitizenEntity(CitizenData) : null;
    }

    // create With Name mobile number and otp

    static async CreateOrUpdateForOTP({ name, mobile_number, otp,location }) {

        const CitizenData = await CitizenModel.findOneAndUpdate({
            mobile_number
        }, {
            name, mobile_number, otp,location,
            is_verified: false
        }, {
            new: true,
            upsert: true
        });

        return CitizenData ? new CitizenEntity(CitizenData) : null;
    }



   

    // Find By Id and Update the Citizen Profile

    static async UpdateProfile(user_id, profileData) {

        const CitizenData = await CitizenModel.findByIdAndUpdate(
            user_id,
            {
                $set: profileData
            }, {
            new: true
        }
        )
        return CitizenData ? new CitizenEntity(CitizenData) : null;
    }

    // find by Id

    static async findById(citizenId) {
        const CitizenData = await CitizenModel.findById(citizenId);
        return CitizenData ? new CitizenEntity(CitizenData) : null;
    }


    static async markVerified(citizenId) {

    return CitizenModel.findByIdAndUpdate(
        citizenId,
        {
            is_verified: true,
            otp: null,
            otp_expires_at: null
        },
        { new: true }
    );
}


}


module.exports = CitizenRepository;