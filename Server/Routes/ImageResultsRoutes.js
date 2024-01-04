const express = require('express');
const router = express.Router();

const ImageTesterData = require('../Models/ImageTesterSchema');

router.get('/get-image-survey/:id', async(req, res) => {
    try {
        const  surveyId  = req.params.id;
        const surveyResponses = await ImageTesterData.find({ surveyId });
        console.log(surveyId)
    
        res.status(200).json({ surveyResponses });
    
    
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
})
router.post('/add-testImages', async(req, res) => {

    try {
          const { surveyId, response } = req.body;  
    const newSurveyResponse = {
        surveyId,
        response
    };

    const newResponse = new ImageTesterData(newSurveyResponse);
    const savedResponse = await newResponse.save();
    res.status(201).json({ message: 'Response submitted successfully', response: savedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
      }
  
})

module.exports = router;