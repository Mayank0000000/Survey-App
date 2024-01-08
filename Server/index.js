const express = require('express');
const cors = require('cors');
const { PORT, mongoDBURL } = require('./config');
const mongoose = require('mongoose');


// const SurveyData = require('./Models/SurveySchema');
// const TesterSrvey = require('./Models/TesterSurveySchema');

const ImageData = require('./Routes/ImageRoutes');
const VideoData = require('./Routes/VideoRoutes')
const ImageTestData = require('./Routes/ImageResultsRoutes');
const VideoTestData = require('./Routes/VideoResultsRoutes');
const SurveyData = require('./Routes/QuestionRoutes');
const TesterSrvey = require('./Routes/SurveyRoutes');

const app = express();

app.use(cors());

app.use(express.json());


app.listen(PORT, () => {
    console.log('server started');
});

// app.get('/get-Survey/:id', async(req, res) => {  
//   try {
//     const  surveyId  = req.params.id;
//     const surveyResponses = await TesterSrvey.find({ surveyId });
//     console.log(surveyId)

//     res.status(200).json({ surveyResponses });


//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// })

// app.post('/add-Survey', async (req, res) => {
//   try {
//     const { surveyId, response } = req.body;   
//     console.log(response)
//     console.log(surveyId)

//     const newSurveyResponse = {
//       surveyId,
//       response,
//     };

//     const newResponse = new TesterSrvey(newSurveyResponse);
//     const savedResponse = await newResponse.save();

//     res.status(201).json({ message: 'Response submitted successfully', response: savedResponse });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// });

// app.post('/add-question', async (req, res) => {
//   try {
//       const newSurveyData = {
//           title: req.body.title,
//           description: req.body.description,
//           questions: req.body.questions || [],
//       };

//       const newSurvey = new SurveyData(newSurveyData);
//       const savedSurvey = await newSurvey.save();

//       res.status(201).json({ message: 'Survey created successfully', survey: savedSurvey });
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: error.message });
//   }
// });



// app.get('/questions/:questionId', async (req, res) => {
//     const questionId = req.params.questionId;
//     console.log(questionId);    
  
//     try {
      
//       const result = await SurveyData.findById(questionId);  
     
//       const question = result ? result.questions : null;
//       console.log(result)
      
  
//       if (!question) {
//         return res.status(404).json({ error: 'Question not found' });
//       }
  
//       res.json(question);
//     } catch (error) {
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });

  // app.patch('/edit/:id', async (req, res) => {
  //   const dataId = req.params.id;
  //   console.log('dataid', dataId)

  //   try {
  //   const updatedSurvey= await SurveyData.findByIdAndUpdate(dataId, req.body, {
  //       new: true,
  //       runValidators: true
  //     })
      
  //   if (!updatedSurvey) {
  //     return res.status(404).send({ error: 'Survey not found' });
  //   }

  //   res.send(updatedSurvey);
      
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).send({ error: 'Internal Server Error' });
  //   }
  // })

  // app.get('/', async (req, res) => {
  //   const  completeData = await SurveyData.find();
  //   return res.json(completeData)
  // })

  //Survey 
  app.use('/survey', SurveyData)
  app.use('/survey-test', TesterSrvey)


  //Images
  app.use('/api', ImageData);
  app.use('/image-test', ImageTestData)

  //Videos
  app.use('/videos', VideoData);
  app.use('/video-test', VideoTestData)
  



mongoose.connect(mongoDBURL).then(() => {
    app.get('/', (req, res) => {

        return res.status(234).send("welcome")
    })


    console.log('connected to database');
})
    .catch((error) => console.log(error))

