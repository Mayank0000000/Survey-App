const mongoose = require('mongoose');
const { Schema } = mongoose;

const surveyResponseSchema = new Schema({
  surveyId: {
  type: String,
  required: true
 },
  response: {
    type: Array,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

const SurveyResponse = mongoose.model('SurveyResponse', surveyResponseSchema);

module.exports = SurveyResponse;
