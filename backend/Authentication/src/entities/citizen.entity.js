class CitizenEntity {
    constructor(data) {

        this.id = data._id;
        this.name = data.name || null;
        this.age = data.age || null;
        this.gender = data.gender || null;
        this.location = data.location || null;
        this.mobile_number = data.mobile_number || null;
        this.otp_expires_at = data.otp_expires_at || null;
        this.is_verified = Boolean(data.is_verified);

        // ✅ handle mongoose timestamps
        this.created_at = data.created_at || data.createdAt || null;
        this.updated_at = data.updatedAt || null;

        // ❌ DO NOT expose OTP
    }



}


module.exports = CitizenEntity;