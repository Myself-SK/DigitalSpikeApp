const mongoose = require("mongoose");
const MarketScheme = new mongoose.Schema({
  project: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  credentials: [
    {
      platform: String,
      username: String,
      password: String,
    },
  ],
});
module.exports = mongoose.model("Market", MarketScheme);
