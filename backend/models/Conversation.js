const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  title: String,
  messages: [
    {
      question: String,
      answer: String
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Conversation', conversationSchema);