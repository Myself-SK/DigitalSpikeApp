const mongoose = require("mongoose");
const coursePurchase = new mongoose.Schema({
  student: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  course: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  type: String,
  balance: Number,
  pending: Number,
  dueDate: Date,
});

module.exports = mongoose.model("CoursePurchase", coursePurchase);
