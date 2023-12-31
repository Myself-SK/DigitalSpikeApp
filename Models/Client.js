const mongoose = require("mongoose");
var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
const ClientSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
  },
  clientPhone: {
    type: String,
    required: true,
    unique: true,
  },
  clientWhatsApp: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  address: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Client", ClientSchema);
