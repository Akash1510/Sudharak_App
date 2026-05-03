const mongoose = require("mongoose");

const CitizenSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
      trim: true
    },
    age: {
      type: Number,
      default: null,
      min: 1,
      max: 120
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: null
    },
    location: {
      type: String,
      default: null,
      trim: true
    },
    mobile_number: {
      type: String,
      required: true,
      unique: true,
      index: true,
      match: [/^\+91\d{10}$/, "Invalid mobile number"]
    },
    otp: {
      type: String,
      default: null
    },
    is_verified: {
      type: Boolean,
      default: false
    },
    otp_expires_at: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Citizen", CitizenSchema);