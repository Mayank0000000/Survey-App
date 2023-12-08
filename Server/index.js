const express = require('express');
const cors = require('cors');
const { PORT, mongoDBURL } = require('./config')

const mongoose = require('mongoose');

const SurveyData = require('./Models/SurveySchema')

const app = express();

app.use(cors());

app.use(express.json());




app.listen(PORT, () => {
    console.log('server started');
});

app.post('/add-question', async (req, res) => {
    try {
        const newQuestion = {
            question: req.body.question,
            type: req.body.type,
            options: req.body.options || [],
        };
        
        const survey = await SurveyData.findOneAndUpdate(
            {},
            { $push: { questions: newQuestion } },
            { new: true, upsert: true }
        );

        res.status(201).json({ message: 'Question added successfully', question: survey.questions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});



mongoose.connect(mongoDBURL).then(() => {
    app.get('/', (req, res) => {

        return res.status(234).send("welcomeeeee")
    })


    console.log('connected to database')
})
    .catch((error) => console.log(error))

