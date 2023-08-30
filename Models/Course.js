const mongoose = require("mongoose");
const CourseScheme = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  coOrdinator: {
    type: String,
  },
  totalFees: Number,
});

module.exports = mongoose.model("Course", CourseScheme);
