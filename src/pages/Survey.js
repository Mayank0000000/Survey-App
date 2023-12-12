import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';

import {
  ChakraProvider,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Text
} from '@chakra-ui/react';


const Survey = () => {
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [questionValue, setQuestionValue] = useState('')

  const inputsTypes = ['input', 'checkbox', 'radio'];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const jsonDataRef = useRef({
    survey_block: {
      title: 'Dynamic Survey Generation',
      description: '',
      questions: [],
    },
  });


  console.log(questions)

  const handleAddOption = (questionIndex) => {
    questions[questionIndex].question = questionValue;
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options = [
      ...updatedQuestions[questionIndex].options,
      ''
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
          question: `Enter ${val} question`
        }
      ]);
    }
  };

  const onSubmit = (data) => {
    console.log(questions)
    const newDataArray = questions.map((question) => {
      return {
        id: question.id,
        title: data.title,
        description: data.description,
        type: question.type,
        question: question.question,
        options: question.options.map((option, index) => ({
          id: Date.now() + index,
          name: option
        }))
      };
    });

    jsonDataRef.current.survey_block.questions.push(...newDataArray);
    console.log(jsonDataRef.current);
    reset();
  };


  const trim = (value, error) => {
    return value.trim() !== "" || error;
  }



  return (
    <ChakraProvider>
      <Box p={5}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                {...register('title', {
                  required: 'Title is required',
                  validate: (value) => trim(value, 'Title is required')
                })}
                placeholder="Enter title"
              />
              {errors.title && (
                <Text color="red">{`*${errors.title.message}`}</Text>
              )}
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                {...register('description', {
                  required: 'Description is required',
                  validate: (value) => trim(value, 'Description is required')
                })}
                placeholder="Enter description"
              />
              {errors.description && (
                <Text color="red">{`*${errors.description.message}`}</Text>
              )}
            </FormControl>

            <FormControl isInvalid={errors.questionType}>
              <FormLabel>Select Question Type</FormLabel>
              <Stack direction="row">
                {inputsTypes.map((val, i) => (
                  <Button key={i} onClick={() => setQuestionTypeHandler(val)}>
                    {val}
                  </Button>
                ))}
              </Stack>
              {errors.questionType && (
                <Text color="red">{`*${errors.questionType.message}`}</Text>
              )}
            </FormControl>

            {questions.map((curr, questionIndex) => (
              <FormControl key={curr.id}>
                <Input
                  placeholder={`Enter ${curr.type} question`}
                  {...register(`questions[${questionIndex}].question`, {
                    required: 'Enter a valid question',
                    validate: (value) => trim(value, 'Enter a valid question')
                  })}
                  onChange={(e) => setQuestionValue(e.target.value)}
                />

                {errors.question && (
                  <Text color="red">{`*${errors.question.message}`}</Text>
                )}

                {['checkbox', 'radio'].includes(curr.type) && (
                  <>
                    {curr.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '10px'
                        }}
                      >
                        <Input
                          required
                          placeholder={`Option ${optionIndex + 1}`}
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(questionIndex, optionIndex, e.target.value)
                          }
                          marginRight="2"
                        />
                        <Button
                          colorScheme="red"
                          size="sm"
                          onClick={() => handleDeleteOption(questionIndex, optionIndex)}
                        >
                          Delete
                        </Button>
                      </div>
                    ))}
                    <Button onClick={() => handleAddOption(questionIndex)}>
                      Add Option
                    </Button>
                  </>
                )}
              </FormControl>
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