const twilio = require('twilio');
const bcrypt = require('bcrypt')
const CitizenRepository = require('../repositories/citizen.repository');
const generateToken = require('../../utils/jwt');
require("dotenv").config()


const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
)

class CitizenService {


    // generate OTP of 6 digit

    static generateOTP() {
        return Math.floor(100000 + Math.random() * 900000).toString();

    }

    // Now Send OTP to (Signup + Login) Citizen Mobile Number
    static async requestOTP({ name, mobile_number, location }) {

        if (!mobile_number) {
            throw new Error("Mobile Number is required");
        }

        if (!/^\+91\d{10}$/.test(mobile_number)) {
            throw new Error("Invalid mobile number");
        }

        const otp = this.generateOTP();
        const hashedOtp = await bcrypt.hash(otp, 10);
        const expiry = new Date(Date.now() + 5 * 60 * 1000);

        const citizen = await CitizenRepository.createOrUpdateForOTP({
            name,
            mobile_number,
            location,
            otp: hashedOtp,
            otp_expires_at: expiry
        });

        if (!citizen) {
            throw new Error("Failed to create OTP request");
        }

        try {
            await client.messages.create({
                body: `Your Sudharak App OTP is ${otp}. Do not share it.`,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: mobile_number
            });
        } catch (error) {
            console.log(error);

            await CitizenRepository.updateProfile(citizen.id, {
                otp: null,
                otp_expires_at: null
            });

            throw new Error("Failed to send OTP");
        }

        return {
            message: "OTP sent successfully",
            citizen: citizen.id
        };
    }

    // Verify OTP for Login Confirmation



    static async verifyOTP({ mobile_number, otp }) {

        if (!mobile_number || !otp) {
            throw new Error("Mobile Number and OTP are required");
        }

        const citizen = await CitizenRepository.findByMobileNumber(mobile_number);

        if (!citizen) {
            throw new Error("Citizen Not Found");
        }

        if (!citizen.otp) {
            throw new Error("No OTP found. Please request again.");
        }

        if (!citizen.otp_expires_at || citizen.otp_expires_at < new Date()) {
            throw new Error("OTP expired");
        }

        const isValid = await bcrypt.compare(otp, citizen.otp);

        if (!isValid) {
            throw new Error("Invalid OTP");
        }

        await CitizenRepository.markVerified(citizen.id);

        const token = generateToken({
            id: citizen.id,
            role: "CITIZEN",
            location: citizen.location
        });

        return {
            message: "OTP verified successfully",
            token,
            citizen_id: citizen.id
        };
    }

    static async updateProfile(user_id, profileData) {
        if (!user_id) {
            throw new Error("User Id is Required");
        }

        if (profileData.age !== undefined && typeof profileData.age !== "number") {
            throw new Error("Age must be number");
        }

        const allowedFields = ["name", "age", "gender", "location"];
        const filterData = {};

        for (let key of allowedFields) {
            if (profileData[key] !== undefined) {
                filterData[key] = profileData[key];
            }
        }

        const updateUser = await CitizenRepository.updateProfile(user_id, filterData);

        if (!updateUser) {
            throw new Error("User Not found");
        }

        return updateUser;

    }


    static async getCitizenById(user_id) {
        if (!user_id) {
            throw new Error("User Id is Required");
        }

        const citizen = await CitizenRepository.findById(user_id);

        if (!citizen) {
            throw new Error("User Not Found");
        }

        return new citizen;
    }


}


module.exports = CitizenService;