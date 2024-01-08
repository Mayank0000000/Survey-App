const express = require('express');
const router = express.Router();

const TesterSrvey = require('../Models/TesterSurveySchema')

router.get('/get-Survey/:id', async (req, res) => {
  try {
    const surveyId = req.params.id;
    const surveyResponses = await TesterSrvey.find({ surveyId });
    console.log(surveyId);

    res.status(200).json({ surveyResponses });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/add-Survey', async (req, res) => {
  try {
    const { surveyId, response } = req.body;
    const newSurveyResponse = {
      surveyId,
      response,
    };

    const newResponse = new TesterSrvey(newSurveyResponse);
    const savedResponse = await newResponse.save();

    res.status(201).json({ message: 'Response submitted successfully', response: savedResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
