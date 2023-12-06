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
  const [questionType, setQuestionType] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState([]);

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


  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const optionsTotal = options.map((ele) => {
    return {
      id: Date.now(),
      name: ele
    }
  })

  const handleDeleteOption = (index) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
  };

  const onSubmit = (data) => {

    if (!questionType || options.length === 0) {
      return;
    }

    console.log(data)
    const newData = {
      id: Date.now(),
      title: data.title,
      description: data.description,
      type: questionType,
      question: questionText,
      options: optionsTotal
    }

    jsonDataRef.current.survey_block.questions.push(newData);
    console.log(jsonDataRef.current)
    setOptions([]);
    setQuestionType('');
    reset();
  }

  return (
    <ChakraProvider>
      <Box p={5}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                {
                ...register('title', {
                  required: "Title is required",
                  validate: value => value.trim() !== "" || "Title is required"                 
                })
                }
                placeholder="Enter title"
                
              />
              {errors.title && (
                <Text color='red'>{`*${errors.title.message}`}</Text>
              )}
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                {
                ...register('description', {
                  required: "Description is required",
                  validate: value => value.trim() !== "" || "Description is required" 
                })
                }
                placeholder="Enter description"
              />
              {errors.description && (
                <Text color='red'>{`*${errors.description.message}`}</Text>
              )}

            </FormControl>

            <FormControl isInvalid={errors.questionType}>
              <FormLabel>Select Question Type</FormLabel>
              <Stack direction="row" >
                <Button onClick={() => setQuestionType('input')}>Input</Button>
                <Button onClick={() => setQuestionType('checkbox')}>
                  Checkbox
                </Button>
                <Button onClick={() => setQuestionType('radio')}>Radio</Button>
              </Stack>
              {errors.questionType && (
                <Text color='red'>{`*${errors.questionType.message}`}</Text>
              )}

            </FormControl>


            {questionType && (
              <FormControl>
                <Input
                  placeholder={`Enter ${questionType} question`}
                  {
                  ...register('question', {
                    required: "Enter a valid question",
                    validate: value => value.trim() !== "" || "Enter a valid question"                    
                    
                  })
                  }
                  
                />
                {errors.question && (
                  <Text color='red'>{`*${errors.question.message}`}</Text>
                )}
                {options.map((option, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <Input
                      required
                      placeholder={`Option ${index + 1}`}
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      marginRight="2"
                    />
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleDeleteOption(index)}
                    >
                      Delete
                    </Button>
                  </div>

                ))}
                <Button onClick={handleAddOption}>Add Option</Button>
              </FormControl>
            )}

            <Button colorScheme="teal" type='submit'>
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </ChakraProvider>
  );
};

export default Survey;