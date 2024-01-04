
import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import TitleInput from '../components/Survey/TitleInput';
import QuestionTypeSelector from '../components/Survey/QuestionTypeSelector';
import SurveyQuestion from '../components/Survey/SurveyQuestion';
import DescriptionInput from '../components/Survey/DescriptionInput';
import axios from 'axios';

import {
  ChakraProvider,
  Box,
  Stack,
  Button,
} from '@chakra-ui/react';



const Survey = () => {
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [questions, setQuestions] = useState([]); 

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const jsonDataRef = useRef({
    survey_block: {
      title: '',
      description: '',
      questions: [],
    },
  });
  const handleAddOption = (questionIndex) => {   
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options = [
      ...updatedQuestions[questionIndex].options,
      '',
    ];
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleDeleteOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(updatedQuestions);
  };

  const setQuestionTypeHandler = (val) => {
    setTotalQuestions((prev) => prev + 1);
    if (totalQuestions < 5) {
      setQuestions((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: val,
          options: [],
          question: `Enter ${val} question`,
        },
      ]);
    }
  };
  const handleQuestionValueChange = (questionIndex, value) => {    
    questions[questionIndex].question = value;
  };
  console.log(questions)

  const onSubmit = (data) => {
    if(questions.length === 0) {
      alert('Enter Questions')
      return;
    }
    for(let i = 0; i<questions.length; i++) {
      console.log(questions[i])
      if(questions[i].options.length === 0 && questions[i].type !== 'input') {
        alert('Enter options')
        return;
      }
    }
    console.log('Form data:', data);
    jsonDataRef.current.survey_block.title = data.title;
    jsonDataRef.current.survey_block.description = data.description;
    const newDataArray = questions.map((question, index) => {
      return {
        type: question.type,
        question: question.question,
        options: question.options.map((option, optionIndex) => ({
          name: option,
        })),
      };
    });

    jsonDataRef.current.survey_block.questions.push(...newDataArray);
    console.log('Logged questions:', jsonDataRef.current.survey_block);

    
   axios.post('http://localhost:3001/add-question', jsonDataRef.current.survey_block)
  .then(response => {
    console.log('Server Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error.response);
  });

    reset();
    setQuestions([])
  };


  return (
    <ChakraProvider>
      <Box p={5}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <TitleInput register={register} errors={errors} />
            <DescriptionInput register={register} errors={errors} />
            <QuestionTypeSelector
              setQuestionTypeHandler={setQuestionTypeHandler}
              errors={errors}
            />

            {questions.map((curr, questionIndex) => (
              <SurveyQuestion
                key={curr.id}
                question={curr}
                questionIndex={questionIndex}
                register={register}
                errors={errors}
                handleAddOption={handleAddOption}
                handleOptionChange={handleOptionChange}
                handleDeleteOption={handleDeleteOption}
                onQuestionValueChange={handleQuestionValueChange}
              />
            ))}

            <Button colorScheme="teal" type="submit">
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </ChakraProvider>
  );
};

export default Survey;
