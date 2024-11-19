const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  title: String,
  content: String,
  dateSubmitted: { type: Date, default: Date.now },
  mentorFeedback: String,
  mentorMarks: Number
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
