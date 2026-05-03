const CitizenModel = require('../models/citizen.model');
const CitizenEntity = require('../entities/citizen.entity');

class CitizenRepository {

    static async findByMobileNumber(mobile_number) {
        const data = await CitizenModel.findOne({ mobile_number }).lean();
        return data ? new CitizenEntity(data) : null;
    }

    static async createOrUpdateForOTP({ name, mobile_number, otp, location, otp_expires_at }) {
        const data = await CitizenModel.findOneAndUpdate(
            { mobile_number },
            {
                name,
                mobile_number,
                otp,
                location,
                otp_expires_at,
                is_verified: false
            },
            {
                new: true,
                upsert: true
            }
   
        ).lean();

        return data ? new CitizenEntity(data) : null;
    }

    static async updateProfile(user_id, profileData) {
        const data = await CitizenModel.findByIdAndUpdate(
            user_id,
            { $set: profileData },
            {
                new: true,
                runValidators: true
            }
        ).lean();

        return data ? new CitizenEntity(data) : null;
    }

    static async findById(citizenId) {
        const data = await CitizenModel.findById(citizenId).lean();
        return data ? new CitizenEntity(data) : null;
    }

    static async markVerified(citizenId) {
        const data = await CitizenModel.findByIdAndUpdate(
            citizenId,
            {
                is_verified: true,
                otp: null,
                otp_expires_at: null
            },
            { new: true }
        ).lean();

        return data ? new CitizenEntity(data) : null;
    }
}

module.exports = CitizenRepository;