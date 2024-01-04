const mongoose = require('mongoose');
const { Schema } = mongoose;

const surveySchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  survey_type: {
    type: String,
    enum: ['survey', 'images', 'videos'], 
    default: 'survey', 
  },
  test: {
    type: Boolean,
    default: false, 
  },
  answers: {
    type: Array, 
    default: [], 
  },
  questions: [    
      {
        type: {
          type: String,
          enum: ['radio', 'checkbox', 'input'],
          required: true,
          trim: true
        },
        question: {
          type: String,
          required: true,
          trim: true
        },
        options: [
          {
            name: {
              type: String,
              required: true,
              trim: true
            },
           
          },
        ],
      },
    
  ],
}, {
  timestamps: true,
});

const Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey;
