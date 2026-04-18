const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  question: String,
  answer: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Message", MessageSchema);