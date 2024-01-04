const mongoose = require('mongoose');


const VideoSchema = new mongoose.Schema({  
    title: {
      type: String,
      required: true,
    },
    survey_type: {
      type: String,
      enum: ['survey', 'images', 'video'], 
      default: 'video', 
    },
    test: {
      type: Boolean,
      default: false, 
    },
    description: {
      type: String,
      required: true,
    },  
    videos: [
      {
        type: String 
        
      },
    ],
  });

  const VideoSurvey = mongoose.model('Video', VideoSchema);

  module.exports = VideoSurvey;
  