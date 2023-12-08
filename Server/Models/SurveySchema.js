const mongoose = require('mongoose');
const { Schema } = mongoose;

const surveySchema = new Schema({
    title: {
      type: String,
      
    },
    description: {
      type: String,
    },
    questions: [
      {
        id: {
          type: Number,
          
        },
        type: {
          type: String,
          enum: ['radio', 'checkbox', 'input'],
          required: true,
        },
        question: {
          type: String,
          required: true,
        },
        options: [
          {
            name: {
              type: String,
              required: true,
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
