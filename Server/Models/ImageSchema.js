const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({  
  title: {
    type: String,
    required: true,
  },
  survey_type: {
    type: String,
    enum: ['survey', 'image', 'video'], 
    default: 'image', 
  },
  test: {
    type: Boolean,
    default: false, 
  },
  description: {
    type: String,
    required: true,
  },  
  images: [
    {
      type: String 
      
    },
  ],
});

const ImageSurvey = mongoose.model('Image', ImageSchema);

module.exports = ImageSurvey;
