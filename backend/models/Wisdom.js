const mongoose = require('mongoose');

const wisdomSchema = new mongoose.Schema({
  keyword: String,
  teaching: String
});

// 👇 FORCE collection name to "wisdoms"
module.exports = mongoose.model('Wisdom', wisdomSchema, 'wisdoms');