const mongoose = require("mongoose");

const CitizenSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default:null
    },
    age: {
      type: Number,
      default:null
    },
    gender: {
      type: String,
      default:null
    },
    location: {
      type: String,
      default:null
    },
    mobile_number: {
      type: String,
      required: true,
      unique: true,
    },
    otp: {
      type: String,
      default: null,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
  
    otp_expires_at:{
      type:Date,
      dafault:null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Citizen", CitizenSchema);
