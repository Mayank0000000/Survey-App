const express = require('express');
const router = express.Router();

const VideoData = require('../Models/VideoSchema');

router.post('/add-videos', async (req, res) => {
    try {
        const { title, description, videos } = req.body;
        const newVideoData = new VideoData({
            title,
            description,
            videos,
        });
        console.log(newVideoData);

        const savedVideoData = await newVideoData.save();
        res.status(201).json(savedVideoData);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.patch('/edit-video/:id', async(req, res) => {
    const videoId = req.params.id;
    try {
        const updatedSurvey= await VideoData.findByIdAndUpdate(videoId, req.body, {
          new: true,
          runValidators: true
        })
        if (!updatedSurvey) {
            return res.status(404).send({ error: 'Survey not found' });
          }
        
          res.send(updatedSurvey);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
      }
    
        
})

router.get('/get-video/:id', async(req, res) => {
    const videoId = req.params.id; 
    try {
        const result = await VideoData.findById(videoId)
        if (!result) {
          return res.status(404).json({ error: 'Images not found' });
        }
        res.json(result);
    
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
      }
})

router.get('/get-videos', async (req, res) => {
    const  completeData = await VideoData.find();
    return res.json(completeData)
  })

module.exports = router;
