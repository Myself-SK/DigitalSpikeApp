const mongoose = require("mongoose");
const paymentDetails = new mongoose.Schema({
  student: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  course: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  amountPaid: Number,
  mode: String,
  paymentID: String,
  receivedDate: Date,
});

module.exports = mongoose.model("Payment", paymentDetails);
