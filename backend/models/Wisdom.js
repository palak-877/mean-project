const mongoose = require('mongoose');

const wisdomSchema = new mongoose.Schema({
  keyword: String,
  teaching: String
});

module.exports = mongoose.model('Wisdom', wisdomSchema , 'wisdom');