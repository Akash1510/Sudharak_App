

class CitizenEntity {

    constructor({
        _id,
        name,
        age,
        gender,
        location,
        mobile_number,
        otp,
        is_verified,
        created_at
    }) {
        this.id = _id || null;
        this.name = name || null;
        this.age = age || null;
        this.gender = gender || null;
        this.location = location || null;
        this.mobile_number = mobile_number || null;
        this.otp = otp || null;
        this.is_verified = Boolean(is_verified);
        this.created_at = created_at || null;
    }
}

module.exports = CitizenEntity;




