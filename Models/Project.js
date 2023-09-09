const mongoose = require("mongoose");
const ProjectSchema = new mongoose.Schema({
  clientName: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  orgName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  domainName: {
    type: String,
    required: true,
    unique: true,
  },
  startDate: Date,
  renewalDate: Date,
  hostingType: String,
  domainCharge: Number,
  hostingCharge: Number,
  serviceCharge: Number,
  status: {
    type: String,
    default: "pending",
  },
});

module.exports = mongoose.model("Project", ProjectSchema);
