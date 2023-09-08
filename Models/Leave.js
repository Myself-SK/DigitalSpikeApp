const mongoose = require("mongoose");

const LeaveScheme = new mongoose.Schema({
  userID: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  fromDate: {
    type: Date,
    required: true,
  },
  toDate: {
    type: Date,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    default: "pending",
  },
});

module.exports = mongoose.model("Leave", LeaveScheme);
