const mongoose = require('mongoose');
const { Schema } = mongoose;

const ImageResponseSchema = new Schema({
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

const ImageResponse = mongoose.model('ImageResponse', ImageResponseSchema);

module.exports = ImageResponse;