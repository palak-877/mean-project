const mongoose = require("mongoose");

// Schema defines structure of data
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

module.exports = mongoose.model("User", UserSchema);