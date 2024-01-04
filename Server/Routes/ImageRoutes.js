const express = require('express');
const router = express.Router();

const ImageData = require('../Models/ImageSchema')

router.post('/add-images', async(req, res) => {

    try {
        const { title, description, images } = req.body;
        const newImageData = new ImageData({
            title,
            description,
            images,
          });

          const savedImageData = await newImageData.save();
          res.status(201).json(savedImageData);
      

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
      }
})

router.get('/get-images/:id', async(req, res) => {
  const imageId = req.params.id
  try {
    const result = await ImageData.findById(imageId)
    if (!result) {
      return res.status(404).json({ error: 'Images not found' });
    }
    res.json(result);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
})
router.get('/get-images', async (req, res) => {
  const  completeData = await ImageData.find();
  return res.json(completeData)
})

router.patch('/edit-image/:id', async(req,res) => {
  const imagesId = req.params.id;
  try {
    const updatedSurvey= await ImageData.findByIdAndUpdate(imagesId, req.body, {
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

module.exports = router;