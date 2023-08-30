const mongoose = require("mongoose");
const TeamScheme = new mongoose.Schema({
  teamName: {
    type: "string",
    required: true,
    unique: true,
  },
  teamLeader: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  employees: [mongoose.SchemaType.ObjectId],
  projects: [mongoose.SchemaType.ObjectId],
});
module.exports = mongoose.model("Team", TeamScheme);
