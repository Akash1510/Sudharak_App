const twilio = require('twilio');
const bcrypt = require('bcrypt')
const CitizenRepository = require('../repositories/citizen.repository');
const generateToken = require('../../utils/jwt');
const CitizenEntity = require('../entities/citizen.entity');
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

    static async requestOTP({ name, mobile_number ,location}) {

        if (!mobile_number) {
            throw new Error('Mobile Number is required');
        }

        const otp = this.generateOTP();
        const hashedOtp = await bcrypt.hash(otp, 10);

        // const expiry = new Date(Date.now() + 5 * 60 * 1000);

        // store or update the Citizen with otp

        const Citizen = await CitizenRepository.CreateOrUpdateForOTP({
            name,
            mobile_number,
            location,
            otp: hashedOtp,
            otp_expires_at: 5
        });

        // send otp via Twilio SMS gateway
        try {
          
            await client.messages.create({
                body: `Your Sudharak App OTP is ${otp}. Do not share it with anyone. valid for 5 minutes only.`,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: mobile_number
                
            });
            
        } catch (error) {
            console.log(error)
            throw new Error('Failed to send OTP');
        }

        return {
            message: 'OTP sent successfully',
            citizen: Citizen.id
        }
    }


    // Verify OTP for Login Confirmation

  

static async verifyOTP({ mobile_number, otp }) {

    // 1️⃣ Basic validation first
    if (!mobile_number || !otp) {
        throw new Error("Mobile Number and OTP are required");
    }

    // 2️⃣ Find citizen
    const citizen = await CitizenRepository.findByMobileNumber(mobile_number);

    if (!citizen) {
        throw new Error("Citizen Not Found");
    

    }

    // // 3️⃣ Check OTP expiry
    // if (!citizen.otp_expires_at || citizen.otp_expires_at < new Date()) {
    //     throw new Error("OTP expired");
    // }

    // 4️⃣ Compare hashed OTP
    const isValid = await bcrypt.compare(otp, citizen.otp);

    if (!isValid) {
        throw new Error("Invalid OTP");
    }

    // 5️⃣ Clear OTP and mark verified
    await CitizenRepository.markVerified(citizen.id);

    // 6️⃣ Generate JWT
    const token = generateToken({
        id: citizen.id,
        role: "CITIZEN",
        location:citizen.location
    });

    return {
        message: "OTP verified successfully",
        token,
        citizen_id: citizen.id
    };



}


static async updateProfile(user_id,profileData){
    if(!user_id){
        throw new Error("User Id is Required");
    }

    const allowdfield = ["name","age","gender","location"];
    const filterData = {};

    for (let key of allowdfield){
      if(profileData[key] !== undefined){
        filterData[key] = profileData[key];
      }
    }

    const updateUser = await CitizenRepository.UpdateProfile(user_id,filterData);

    if(!updateUser){
        throw new Error("User Not found");
    }

    return new CitizenEntity(updateUser);


}





}


module.exports = CitizenService;