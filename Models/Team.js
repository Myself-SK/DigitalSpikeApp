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
  teamMembers: [mongoose.Schema.Types.ObjectId],
  projects: [mongoose.Schema.Types.ObjectId],
});

module.exports = mongoose.model("Team", TeamScheme);
