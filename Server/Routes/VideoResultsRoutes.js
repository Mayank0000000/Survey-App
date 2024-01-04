const express = require('express');
const router = express.Router();

const VideoTesterData = require('../Models/VideoTesterSchema')

router.post('/test-videos', async(req, res) => {

    try {
         const { surveyId, response, start_time, end_time } = req.body;
    const newSurveyResponse = {
        surveyId,
        response,
        start_time, 
        end_time
    }

    const newResponse = new VideoTesterData(newSurveyResponse)
    const savedResponse = await newResponse.save();
    res.status(201).json({ message: 'Response submitted successfully', response: savedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
      }
   
});

router.get('/get-test-video/:id', async(req, res) => {
    try {
        const  surveyId  = req.params.id;
        const surveyResponses = await VideoTesterData.find({ surveyId });
        res.status(200).json({ surveyResponses });

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
})

module.exports = router;