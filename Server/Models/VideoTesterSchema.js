const mongoose = require('mongoose');
const { Schema } = mongoose;

const VideoResponseSchema = new Schema({
    surveyId: {
    type: String,
    required: true
   }, 
   response: {
    type: Array,
    required: true,
  },   
    start_time : {
        type: Number,
        required: true

    },
    end_time : {
        type: Number,
        required: true

    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  });

  const VideoResponse = mongoose.model('VideoResponse', VideoResponseSchema);
  module.exports = VideoResponse;