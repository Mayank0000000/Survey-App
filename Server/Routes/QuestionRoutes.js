
const express = require('express');
const router = express.Router();

const SurveyData = require('../Models/SurveySchema')

router.get('/questions/:questionId', async (req, res) => {
  const questionId = req.params.questionId;
  console.log(questionId);

  try {
    const result = await SurveyData.findById(questionId);
    const question = result ? result.questions : null;
    console.log(result);

    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    res.json(question);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.patch('/edit/:id', async (req, res) => {
  const dataId = req.params.id;
  console.log('dataid', dataId);

  try {
    const updatedSurvey = await SurveyData.findByIdAndUpdate(dataId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedSurvey) {
      return res.status(404).send({ error: 'Survey not found' });
    }

    res.send(updatedSurvey);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

router.post('/add-question', async (req, res) => {
  try {
    const newSurveyData = {
      title: req.body.title,
      description: req.body.description,
      questions: req.body.questions || [],
    };

    const newSurvey = new SurveyData(newSurveyData);
    const savedSurvey = await newSurvey.save();

    res.status(201).json({ message: 'Survey created successfully', survey: savedSurvey });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  const  completeData = await SurveyData.find();
  return res.json(completeData)
})



module.exports = router;
