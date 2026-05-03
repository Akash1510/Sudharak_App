class CitizenEntity {
    constructor(data) {
        if (!data) return;

        this.id = data?._id || null;
        this.name = data?.name || null;
        this.age = data?.age || null;
        this.gender = data?.gender || null;
        this.location = data?.location || null;
        this.mobile_number = data?.mobile_number?.trim() || null;
        this.otp_expires_at = data?.otp_expires_at || null;
        this.is_verified = Boolean(data?.is_verified);

        this.created_at = data?.created_at || data?.createdAt
            ? new Date(data.created_at || data.createdAt)
            : null;

        this.updated_at = data?.updatedAt
            ? new Date(data.updatedAt)
            : null;

        Object.freeze(this); // 🔥 optional safety
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            age: this.age,
            gender: this.gender,
            location: this.location,
            mobile_number: this.mobile_number,
            is_verified: this.is_verified,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }
}

module.exports = CitizenEntity;