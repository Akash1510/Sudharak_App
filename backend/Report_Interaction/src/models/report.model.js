const mongoose = require("mongoose");

const ReportDashboardSchema = new mongoose.Schema({

  report_id: {
    type: String,
    required: true,
    unique: true,
    index: true
  },

  department: {
    type: String,
    required: true,
    index: true
  },

  status: {
    type: String,
    enum: ["Pending", "In_Progress", "Resolved", "Rejected"],
    default: "Pending",
    index: true
  },

  severity: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Low",
    index: true
  },

  upvote_count: {
    type: Number,
    default: 0
  },

  upvoted_by: [{
    type: String,
    index: true
  }],

  comments: [{
    user_id: String,
    text: String,
    created_at: {
      type: Date,
      default: Date.now
    }
  }],

  resolved_image: {
    type: String,
    default: null
  },

  resolved_by: {
    type: String,
    default: null
  },

  resolved_at: {
    type: Date,
    default: null
  }

}, { timestamps: true });

module.exports = mongoose.model("ReportDashboard", ReportDashboardSchema);
