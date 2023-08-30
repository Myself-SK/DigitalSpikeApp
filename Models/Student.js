const mongoose = require("mongoose");
const StudentSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  phone: {
    required: true,
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  IDName: String,
  IDNumber: String,
  IDProof: {
    data: Buffer,
    contentType: String,
  },
  course: {
    type: mongoose.SchemaTypes.ObjectId,
  },
});

module.exports = mongoose.model("Student", StudentSchema);
