const mongoose = require("mongoose");




const AdminSchema = new mongoose.Schema({
    name: {
        type: String
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },


    department: {
        type: String,
        required: true,
        enum: ['GARBAGE', 'POTHOLE', 'WATER']

    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Admin", AdminSchema);