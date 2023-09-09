const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema({
  team: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  project: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  employee: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
  deadline: Date,
  description: String,
  statusDescription: String,
  status: {
    type: String,
    default: "pending",
  },
});

module.exports = mongoose.model("Task", TaskSchema);
