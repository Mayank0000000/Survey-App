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
          id: {
            type: Number,
            required: true,
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
